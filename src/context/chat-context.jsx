'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [activeAssistants, setActiveAssistants] = useState([]);
    const [customAssistants, setCustomAssistants] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [streamingIds, setStreamingIds] = useState([]);
    const abortControllers = useRef({});

    // Initial load from localStorage
    useEffect(() => {
        const savedConversations = localStorage.getItem('agent_conversations');
        const savedActiveId = localStorage.getItem('agent_active_id');
        const savedActiveAssistants = localStorage.getItem('agent_active_assistants');
        const savedCustomAssistants = localStorage.getItem('agent_custom_assistants');
        const savedProjects = localStorage.getItem('agent_projects');
        const savedActiveProjectId = localStorage.getItem('agent_active_project_id');

        if (savedConversations) {
            try {
                // Parse and restore Date objects
                const parsed = JSON.parse(savedConversations);
                const restored = parsed.map(conv => ({
                    ...conv,
                    updatedAt: conv.updatedAt ? new Date(conv.updatedAt) : null,
                    messages: (conv.activePath || []).map(id => {
                        const m = (conv.allMessages || conv.messages || []).find(msg => msg.id === id);
                        return m ? { ...m, timestamp: new Date(m.timestamp) } : null;
                    }).filter(Boolean),
                    allMessages: (conv.allMessages || conv.messages || []).map(msg => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp),
                        // Ensure no messages are stuck in thinking state after refresh
                        isThinking: false
                    })),
                    activePath: conv.activePath || (conv.messages || []).map(m => m.id)
                }));
                setConversations(restored);
            } catch (e) {
                console.error('Failed to parse saved conversations', e);
            }
        }

        if (savedActiveId) {
            setActiveConversationId(savedActiveId);
        }

        if (savedActiveAssistants) {
            try {
                setActiveAssistants(JSON.parse(savedActiveAssistants));
            } catch (e) {
                console.error('Failed to parse active assistants', e);
            }
        }

        if (savedCustomAssistants) {
            try {
                setCustomAssistants(JSON.parse(savedCustomAssistants));
            } catch (e) {
                console.error('Failed to parse custom assistants', e);
            }
        }

        if (savedProjects) {
            try {
                setProjects(JSON.parse(savedProjects));
            } catch (e) {
                console.error('Failed to parse projects', e);
            }
        }

        if (savedActiveProjectId) {
            setActiveProjectId(savedActiveProjectId);
        }

        setIsHydrated(true);
    }, []);

    // Save to localStorage whenever conversations change
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem('agent_conversations', JSON.stringify(conversations));
            } catch (error) {
                console.error('Failed to save conversations:', error.message);
            }
        }
    }, [conversations, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('agent_active_id', activeConversationId || '');
        }
    }, [activeConversationId, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem('agent_active_assistants', JSON.stringify(activeAssistants));
            } catch (error) {
                console.error('Failed to save active assistants:', error.message);
            }
        }
    }, [activeAssistants, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem('agent_custom_assistants', JSON.stringify(customAssistants));
            } catch (error) {
                console.error('Failed to save custom assistants:', error.message);
            }
        }
    }, [customAssistants, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem('agent_projects', JSON.stringify(projects));
            } catch (error) {
                console.error('Failed to save projects:', error.message);
            }
        }
    }, [projects, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('agent_active_project_id', activeProjectId || '');
        }
    }, [activeProjectId, isHydrated]);

    const activeProject = projects.find(p => p.id === activeProjectId) || null;
    const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

    const fetchOpenAIResponse = useCallback(async (conversationId, messages, model, projectInstructions) => {
        try {
            const controller = new AbortController();
            abortControllers.current[conversationId] = controller;
            setStreamingIds(prev => [...new Set([...prev, conversationId])]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages, model, projectInstructions }),
                signal: controller.signal
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `API request failed with status ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            // Transition from thinking to empty content
            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    const updatedAllMessages = (conv.allMessages || []).map(msg =>
                        msg.isThinking ? { ...msg, isThinking: false, content: '' } : msg
                    );
                    const visibleMessages = (conv.activePath || []).map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);
                    return {
                        ...conv,
                        allMessages: updatedAllMessages,
                        messages: visibleMessages
                    };
                }
                return conv;
            }));

            let isJsonBlock = false;
            let isThinkingBlock = false;
            let jsonBuffer = '';
            let reasoningContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // Check for JSON start
                if (chunk.includes('__JSON_START__')) {
                    isJsonBlock = true;
                    const parts = chunk.split('__JSON_START__');
                    if (parts[0]) {
                        if (isThinkingBlock) reasoningContent += parts[0];
                        else fullContent += parts[0];
                    }
                    jsonBuffer += parts[1];
                }

                if (isJsonBlock) {
                    if (chunk.includes('__JSON_END__')) {
                        const parts = (jsonBuffer + chunk).split('__JSON_END__');
                        const jsonString = parts[0].replace('__JSON_START__', '');
                        try {
                            const data = JSON.parse(jsonString);
                            if (data.sources) {
                                setConversations(prev => prev.map(conv => {
                                    if (conv.id === conversationId) {
                                        const lastMsgId = conv.activePath[conv.activePath.length - 1];
                                        const updatedAllMessages = (conv.allMessages || []).map(msg =>
                                            msg.id === lastMsgId ? { ...msg, sources: data.sources } : msg
                                        );
                                        const visibleMessages = conv.activePath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);
                                        return {
                                            ...conv,
                                            allMessages: updatedAllMessages,
                                            messages: visibleMessages
                                        };
                                    }
                                    return conv;
                                }));
                            }
                        } catch (e) {
                            console.error('Failed to parse source JSON', e);
                        }
                        isJsonBlock = false;
                        if (parts[1]) {
                            if (parts[1].includes('__THINKING_START__')) {
                                isThinkingBlock = true;
                                reasoningContent += parts[1].replace('__THINKING_START__', '');
                            } else if (parts[1].includes('__THINKING_END__')) {
                                isThinkingBlock = false;
                                fullContent += parts[1].replace('__THINKING_END__', '');
                            } else {
                                if (isThinkingBlock) reasoningContent += parts[1];
                                else fullContent += parts[1];
                            }
                        }
                    } else {
                        jsonBuffer += chunk;
                    }
                    continue;
                }

                // Handle Thinking Markers
                let cleanChunk = chunk;
                if (chunk.includes('__THINKING_START__')) {
                    isThinkingBlock = true;
                    const parts = chunk.split('__THINKING_START__');
                    fullContent += parts[0];
                    reasoningContent += parts[1] || '';
                    continue;
                } else if (chunk.includes('__THINKING_END__')) {
                    isThinkingBlock = false;
                    const parts = chunk.split('__THINKING_END__');
                    reasoningContent += parts[0];
                    fullContent += parts[1] || '';
                    continue;
                }

                if (isThinkingBlock) {
                    reasoningContent += chunk;
                } else {
                    fullContent += chunk;
                }

                setConversations(prev => prev.map(conv => {
                    if (conv.id === conversationId) {
                        const lastMsgId = conv.activePath[conv.activePath.length - 1];
                        const updatedAllMessages = (conv.allMessages || []).map(msg =>
                            msg.id === lastMsgId ? {
                                ...msg,
                                content: fullContent,
                                reasoning: reasoningContent
                            } : msg
                        );
                        const visibleMessages = conv.activePath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

                        return {
                            ...conv,
                            allMessages: updatedAllMessages,
                            messages: visibleMessages
                        };
                    }
                    return conv;
                }));
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
                setConversations(prev => prev.map(conv => {
                    if (conv.id === conversationId) {
                        const lastMsgId = conv.activePath[conv.activePath.length - 1];
                        const updatedAllMessages = (conv.allMessages || []).map(msg =>
                            msg.isThinking && msg.id === lastMsgId ? { ...msg, isThinking: false } : msg
                        );
                        const visibleMessages = conv.activePath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

                        return {
                            ...conv,
                            allMessages: updatedAllMessages,
                            messages: visibleMessages
                        };
                    }
                    return conv;
                }));
            } else {
                console.error('Streaming error:', error);
                setConversations(prev => prev.map(conv => {
                    if (conv.id === conversationId) {
                        const lastMsgId = conv.activePath[conv.activePath.length - 1];
                        const updatedAllMessages = (conv.allMessages || []).map(msg =>
                            msg.isThinking && msg.id === lastMsgId ? {
                                ...msg,
                                isThinking: false,
                                content: `**Error:** ${error.message || 'An unexpected error occurred. Please try again later.'}`
                            } : msg
                        );
                        const visibleMessages = conv.activePath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

                        return {
                            ...conv,
                            allMessages: updatedAllMessages,
                            messages: visibleMessages
                        };
                    }
                    return conv;
                }));
            }
        } finally {
            delete abortControllers.current[conversationId];
            setStreamingIds(prev => prev.filter(id => id !== conversationId));
        }
    }, []);

    const createConversation = useCallback((firstMessage, modelId = 'gpt-4o', modelName = 'GPT-4o', assistantId = null, fileAttachment = null) => {
        const newId = Date.now().toString();

        // Check if we have an initial message or attachment
        const hasInitialContent = (firstMessage && firstMessage.trim().length > 0) || fileAttachment;

        let messages = [];
        let allMessages = [];
        let activePath = [];

        if (hasInitialContent) {
            const userMsg = {
                id: '1',
                role: 'user',
                content: firstMessage,
                timestamp: new Date(),
                attachment: fileAttachment,
                parentId: null,
                siblingIds: []
            };
            const assistantMsg = {
                id: '2',
                role: 'assistant',
                content: '',
                isThinking: true,
                timestamp: new Date(),
                modelName: modelName,
                parentId: '1',
                siblingIds: []
            };
            messages = [userMsg, assistantMsg];
            allMessages = [userMsg, assistantMsg];
            activePath = ['1', '2'];
        }

        const newConversation = {
            id: newId,
            title: hasInitialContent ? (firstMessage ? (firstMessage.substring(0, 30) + (firstMessage.length > 30 ? '...' : '')) : (fileAttachment?.name || 'New Chat')) : 'New Chat',
            messages: messages,
            allMessages: allMessages, // Stores all versions/branches
            activePath: activePath, // IDs of messages in the current path
            assistantId: assistantId,
            modelId: modelId,
            modelName: modelName
        };

        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newId);

        // Fetch real response only if we have content
        if (hasInitialContent) {
            fetchOpenAIResponse(newId, [messages[0]], modelId, activeProject?.instructions);
        }

        return newId;
    }, [fetchOpenAIResponse, activeProject]);

    const startAssistantChat = useCallback((assistant) => {
        // Add to active assistants if not already there
        setActiveAssistants(prev => {
            const index = prev.findIndex(a => a.id === assistant.id);
            if (index >= 0) {
                const newAssistants = [...prev];
                newAssistants[index] = assistant; // Always update with latest data
                return newAssistants;
            }
            return [...prev, assistant];
        });

        const slug = assistant.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const newId = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
        const newConversation = {
            id: newId,
            title: assistant.name,
            assistantId: assistant.id,
            messages: [],
            allMessages: [],
            activePath: []
        };

        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newId);

        return newId;
    }, []);

    const continueChat = useCallback((title, messages, assistantId) => {
        const newId = Date.now().toString();
        // Map shared messages to internal format with unique IDs and proper timestamps
        const restoredMessages = messages.map((m, idx) => ({
            ...m,
            id: (idx + 1).toString(),
            timestamp: new Date(m.timestamp || Date.now()),
            parentId: idx > 0 ? (idx).toString() : null,
            siblingIds: []
        }));

        const newConversation = {
            id: newId,
            title: title || 'Continued Chat',
            messages: restoredMessages,
            allMessages: restoredMessages,
            activePath: restoredMessages.map(m => m.id),
            assistantId: assistantId
        };

        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newId);
        return newId;
    }, []);

    const addMessage = useCallback((conversationId, content, role = 'user', modelId = 'gpt-4o', modelName = 'GPT-4o', fileAttachment = null) => {
        const conversation = conversations.find(c => c.id === conversationId);
        if (!conversation) return;

        const lastMsgId = conversation.activePath[conversation.activePath.length - 1] || null;
        const userMsgId = Date.now().toString();
        const userMsg = {
            id: userMsgId,
            role,
            content,
            timestamp: new Date(),
            attachment: fileAttachment,
            parentId: lastMsgId,
            siblingIds: []
        };

        const isFirstUserMessage = conversation.messages.length === 0;

        if (role === 'user') {
            const assistantMsgId = (Date.now() + 1).toString();
            const assistantMsg = {
                id: assistantMsgId,
                role: 'assistant',
                content: '',
                isThinking: true,
                timestamp: new Date(),
                modelName: modelName,
                parentId: userMsgId,
                siblingIds: []
            };

            const updatedAllMessages = [...(conversation.allMessages || []), userMsg, assistantMsg];
            const updatedPath = [...conversation.activePath, userMsgId, assistantMsgId];
            const visibleMessages = updatedPath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    return {
                        ...conv,
                        messages: visibleMessages,
                        allMessages: updatedAllMessages,
                        activePath: updatedPath,
                        title: isFirstUserMessage ? content.substring(0, 30) + (content.length > 30 ? '...' : '') : conv.title
                    };
                }
                return conv;
            }));

            // History for API should only include messages in the active path up to now
            const historyForApi = visibleMessages.filter(m => !m.isThinking);

            // Trigger API once
            setTimeout(() => {
                fetchOpenAIResponse(conversationId, historyForApi, modelId, activeProject?.instructions);
            }, 0);
        } else {
            const updatedAllMessages = [...(conversation.allMessages || []), userMsg];
            const updatedPath = [...conversation.activePath, userMsgId];
            const visibleMessages = updatedPath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    return {
                        ...conv,
                        messages: visibleMessages,
                        allMessages: updatedAllMessages,
                        activePath: updatedPath,
                        title: (isFirstUserMessage && role === 'user') ? content.substring(0, 30) + (content.length > 30 ? '...' : '') : conv.title
                    };
                }
                return conv;
            }));
        }

    }, [conversations, fetchOpenAIResponse, activeProject]);

    const regenerateResponse = useCallback((conversationId, modelId = 'gpt-4o', modelName = 'GPT-4o') => {
        const conversation = conversations.find(c => c.id === conversationId);
        if (!conversation) return;

        const lastActiveMsgId = conversation.activePath[conversation.activePath.length - 1];
        const lastActiveMsg = (conversation.allMessages || conversation.messages).find(m => m.id === lastActiveMsgId);

        let currentPath = [...conversation.activePath];
        let allMessages = [...(conversation.allMessages || conversation.messages)];

        if (lastActiveMsg?.role === 'assistant') {
            // Remove the last assistant message from path and allMessages if we want to "overwrite" regenerate
            // However, typical behavior is to replace it. For versioning, maybe we want siblings for assistant too?
            // Actually, let's just replace the assistant message content for now to keep it simple, or create a sibling.
            // Branching on assistant is rarer but helpful. Let's create a sibling for the assistant message.

            const newAssistantMsgId = Date.now().toString();
            const originalAssistantMsg = lastActiveMsg;
            const parentId = originalAssistantMsg.parentId;

            const newAssistantMsg = {
                ...originalAssistantMsg,
                id: newAssistantMsgId,
                content: '',
                isThinking: true,
                timestamp: new Date(),
                modelName: modelName,
                siblingIds: [...(originalAssistantMsg.siblingIds || []), originalAssistantMsg.id]
            };

            // Update original siblingIds
            allMessages = allMessages.map(m =>
                (m.id === originalAssistantMsg.id || (originalAssistantMsg.siblingIds || []).includes(m.id))
                    ? { ...m, siblingIds: [...(m.siblingIds || []), newAssistantMsgId] }
                    : m
            );

            allMessages.push(newAssistantMsg);
            currentPath[currentPath.length - 1] = newAssistantMsgId;
        } else {
            // Just add a new assistant message
            const assistantMsgId = Date.now().toString();
            const assistantMsg = {
                id: assistantMsgId,
                role: 'assistant',
                content: '',
                isThinking: true,
                timestamp: new Date(),
                modelName: modelName,
                parentId: lastActiveMsgId,
                siblingIds: []
            };
            allMessages.push(assistantMsg);
            currentPath.push(assistantMsgId);
        }

        const visibleMessages = currentPath.map(id => allMessages.find(m => m.id === id)).filter(Boolean);
        const historyForApi = visibleMessages.filter(m => !m.isThinking);

        setConversations(prev => prev.map(conv =>
            conv.id === conversationId ? {
                ...conv,
                messages: visibleMessages,
                allMessages: allMessages,
                activePath: currentPath
            } : conv
        ));

        // Trigger API
        setTimeout(() => {
            fetchOpenAIResponse(conversationId, historyForApi, modelId, activeProject?.instructions);
        }, 0);
    }, [conversations, fetchOpenAIResponse, activeProject]);

    const deleteConversation = useCallback((id) => {
        setConversations(prev => prev.filter(c => c.id !== id));
        if (activeConversationId === id) {
            setActiveConversationId(null);
        }
    }, [activeConversationId]);

    const togglePinConversation = useCallback((id) => {
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, isPinned: !c.isPinned } : c
        ));
    }, []);

    const addProjectAssistant = useCallback((assistant) => {
        setCustomAssistants(prev => {
            const index = prev.findIndex(a => a.id === assistant.id);
            if (index >= 0) {
                const newAssistants = [...prev];
                newAssistants[index] = assistant;
                return newAssistants;
            }
            return [...prev, assistant];
        });

        // Also update active assistants if this assistant is currently active
        setActiveAssistants(prev => {
            const index = prev.findIndex(a => a.id === assistant.id);
            if (index >= 0) {
                const newActive = [...prev];
                newActive[index] = assistant;
                return newActive;
            }
            return prev;
        });
    }, []);

    const removeProjectAssistant = useCallback((id) => {
        setCustomAssistants(prev => prev.filter(a => a.id !== id));
    }, []);

    const removeActiveAssistant = useCallback((id) => {
        setActiveAssistants(prev => prev.filter(a => a.id !== id));
    }, []);

    const createProject = useCallback((name) => {
        const newProject = {
            id: Date.now().toString(),
            name,
            instructions: '',
            files: [],
            chatIds: [],
            timestamp: new Date()
        };
        setProjects(prev => [newProject, ...prev]);
        setActiveProjectId(newProject.id);
        setActiveConversationId(null); // Deselect any active chat when entering project view
        return newProject.id;
    }, []);

    const updateProject = useCallback((id, updates) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }, []);

    const deleteProject = useCallback((id) => {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (activeProjectId === id) {
            setActiveProjectId(null);
        }
    }, [activeProjectId]);

    const addChatToProject = useCallback((projectId, chatId) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const chatIds = p.chatIds || [];
                if (!chatIds.includes(chatId)) {
                    return { ...p, chatIds: [...chatIds, chatId] };
                }
            }
            return p;
        }));
    }, []);

    const removeChatFromProject = useCallback((projectId, chatId) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const chatIds = p.chatIds || [];
                return { ...p, chatIds: chatIds.filter(id => id !== chatId) };
            }
            return p;
        }));
    }, []);

    const editMessage = useCallback((conversationId, messageId, newContent) => {
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: conv.messages.map(m =>
                        m.id === messageId ? { ...m, content: newContent, timestamp: new Date() } : m
                    )
                };
            }
            return conv;
        }));
    }, []);

    const stopResponse = useCallback((conversationId) => {
        if (abortControllers.current[conversationId]) {
            abortControllers.current[conversationId].abort();
            delete abortControllers.current[conversationId];
            setStreamingIds(prev => prev.filter(id => id !== conversationId));

            // Also clear isThinking for any messages in this conversation
            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    const updatedAllMessages = (conv.allMessages || []).map(msg =>
                        msg.isThinking ? { ...msg, isThinking: false } : msg
                    );
                    const visibleMessages = (conv.activePath || []).map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

                    return {
                        ...conv,
                        allMessages: updatedAllMessages,
                        messages: visibleMessages
                    };
                }
                return conv;
            }));
        }
    }, []);

    const switchMessageVersion = useCallback((conversationId, messageId, targetVersionId) => {
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                const allMessages = conv.allMessages || conv.messages;
                const activePath = conv.activePath || [];

                // 1. Find the index where the branch starts
                const branchIndex = activePath.indexOf(messageId);
                if (branchIndex === -1) return conv;

                // 2. Truncate path up (but not including) the branch point
                const newPath = activePath.slice(0, branchIndex);

                // 3. Reconstruct path from the target version downwards
                // We need to follow the "default" child for each level or just pick the target version's first descendants
                let currentId = targetVersionId;
                const fullPath = [...newPath];

                while (currentId) {
                    fullPath.push(currentId);
                    // Find children of this message
                    const children = allMessages.filter(m => m.parentId === currentId);
                    if (children.length > 0) {
                        // For simplicity, take the newest child or the one that was previously in a path?
                        // Let's just take the first one for now.
                        currentId = children[children.length - 1].id;
                    } else {
                        currentId = null;
                    }
                }

                const visibleMessages = fullPath.map(id => allMessages.find(m => m.id === id)).filter(Boolean);

                return {
                    ...conv,
                    messages: visibleMessages,
                    activePath: fullPath
                };
            }
            return conv;
        }));
    }, []);

    const resubmitMessage = useCallback((conversationId, messageId, newContent, modelId = 'gpt-4o', modelName = 'GPT-4o') => {
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                const allMessages = [...(conv.allMessages || conv.messages)];
                const originalMsg = allMessages.find(m => m.id === messageId);
                if (!originalMsg) return conv;

                // 1. Create the new version of the user message (sibling)
                const newUserMsgId = Date.now().toString();
                const newUserMsg = {
                    ...originalMsg,
                    id: newUserMsgId,
                    content: newContent,
                    timestamp: new Date(),
                    siblingIds: [...(originalMsg.siblingIds || []), originalMsg.id]
                };

                // 2. Update original and other siblings' siblingIds
                const updatedAllMessages = allMessages.map(m =>
                    (m.id === originalMsg.id || (originalMsg.siblingIds || []).includes(m.id))
                        ? { ...m, siblingIds: [...(m.siblingIds || []), newUserMsgId] }
                        : m
                );

                // 3. Add the new message to allMessages
                updatedAllMessages.push(newUserMsg);

                // 4. Truncate activePath at the parent and add new user message
                const branchIndex = (conv.activePath || []).indexOf(messageId);
                const newPath = (conv.activePath || []).slice(0, branchIndex);
                newPath.push(newUserMsgId);

                // 5. Add thinking assistant message as child of the NEW user message
                const assistantMsgId = (Date.now() + 1).toString();
                const assistantMsg = {
                    id: assistantMsgId,
                    role: 'assistant',
                    content: '',
                    isThinking: true,
                    timestamp: new Date(),
                    modelName: modelName,
                    parentId: newUserMsgId,
                    siblingIds: []
                };
                updatedAllMessages.push(assistantMsg);
                newPath.push(assistantMsgId);

                const visibleMessages = newPath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);
                const historyForApi = visibleMessages.filter(m => !m.isThinking);

                // Trigger API
                setTimeout(() => {
                    fetchOpenAIResponse(conversationId, historyForApi, modelId, activeProject?.instructions);
                }, 0);

                return {
                    ...conv,
                    allMessages: updatedAllMessages,
                    activePath: newPath,
                    messages: visibleMessages
                };
            }
            return conv;
        }));
    }, [fetchOpenAIResponse, activeProject]);

    const value = {
        conversations,
        activeConversationId,
        setActiveConversationId,
        createConversation,
        startAssistantChat,
        continueChat,
        activeAssistants,
        setActiveAssistants,
        removeActiveAssistant,
        customAssistants,
        addProjectAssistant,
        removeProjectAssistant,
        addMessage,
        regenerateResponse,
        editMessage,
        resubmitMessage,
        switchMessageVersion,
        deleteConversation,
        stopResponse,
        streamingIds,
        togglePinConversation,
        isHydrated,
        projects,
        activeProjectId,
        setActiveProjectId,
        createProject,
        updateProject,
        deleteProject,
        addChatToProject,
        removeChatFromProject,
        activeProject,
        activeConversation
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
