'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './auth-context';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from './toast-context';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const { token, user } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const params = useParams();

    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [activeAssistants, setActiveAssistants] = useState([]);
    const [customAssistants, setCustomAssistants] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [streamingIds, setStreamingIds] = useState([]);
    const [selectedAssistantId, setSelectedAssistantId] = useState(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const abortControllers = useRef({});

    const activeProject = projects.find(p => p.id === activeProjectId);

    // --- 1. Data Fetching ---

    const fetchData = useCallback(async () => {
        if (!token) return;
        try {
            const [convRes, projRes, asstRes] = await Promise.all([
                fetch('/api/conversations', { headers: { Authorization: `Bearer ${token}` } }),
                fetch('/api/projects', { headers: { Authorization: `Bearer ${token}` } }),
                fetch('/api/assistants', { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const convData = await convRes.json();
            const projData = await projRes.json();
            const asstData = await asstRes.json();

            if (convData.success) {
                setConversations(convData.data.map(c => ({
                    ...c,
                    messages: [],
                    allMessages: [],
                    lastActivityAt: c.messages?.[0]?.createdAt ? new Date(c.messages[0].createdAt) : new Date(c.updatedAt),
                    createdAt: new Date(c.createdAt),
                    updatedAt: new Date(c.updatedAt),
                    activePath: c.activePath || [],
                    isLoaded: false
                })));
            }
            if (projData.success) {
                setProjects(projData.data.map(p => {
                    // Normalize chatDetails JSON from API into richer JS objects
                    let chatDetails = [];
                    if (Array.isArray(p.chatDetails)) {
                        chatDetails = p.chatDetails.map(d => ({
                            ...d,
                            movedAt: d.movedAt ? new Date(d.movedAt) : null
                        }));
                    }

                    return {
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt),
                        chatDetails
                    };
                }));
            }
            if (asstData.success) {
                setCustomAssistants(asstData.data.map(a => ({
                    ...a,
                    createdAt: new Date(a.createdAt),
                    updatedAt: new Date(a.updatedAt)
                })));
            }
        } catch (err) {
            console.error('Failed to fetch initial data', err);
        } finally {
            setIsHydrated(true);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchData();
        else {
            setConversations([]);
            setProjects([]);
            setCustomAssistants([]);
            setIsHydrated(true);
        }
    }, [token, fetchData]);

    // Sync active conversation ID from URL params on mount/update
    useEffect(() => {
        if (params?.id && params.id !== 'new-chat') {
            setActiveConversationId(params.id);
        }
    }, [params?.id]);

    // Fetch active conversation details
    useEffect(() => {
        if (activeConversationId && activeConversationId !== 'new-chat' && token) {
            // Check if we already have this conversation loaded
            const existingIndex = conversations.findIndex(c => c.id === activeConversationId);
            const existing = existingIndex >= 0 ? conversations[existingIndex] : null;

            if (!existing || !existing.isLoaded) {
                fetch(`/api/conversations/${activeConversationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            const fullConv = data.data;

                            const processConv = (convData) => {
                                const allMessages = (convData.allMessages || convData.messages || []).map(m => ({
                                    ...m,
                                    timestamp: new Date(m.createdAt || m.timestamp || 0),
                                    isThinking: false
                                }));

                                const activePathIds = convData.activePath && convData.activePath.length > 0
                                    ? convData.activePath
                                    : (convData.messages || []).map(m => m.id);

                                const activeMessages = activePathIds.map(id => allMessages.find(m => m.id === id)).filter(Boolean);

                                return {
                                    ...convData,
                                    messages: activeMessages,
                                    allMessages: allMessages,
                                    activePath: activePathIds,
                                    isLoaded: true
                                };
                            };

                            const processed = processConv(fullConv);

                            setConversations(prev => {
                                const index = prev.findIndex(c => c.id === activeConversationId);
                                if (index >= 0) {
                                    const newConvs = [...prev];
                                    newConvs[index] = { ...newConvs[index], ...processed };
                                    return newConvs;
                                } else {
                                    // If not found, append it (handles direct link to unlisted chat)
                                    return [processed, ...prev];
                                }
                            });
                        }
                    })
                    .catch(err => console.error('Failed to fetch active conversation', err));
            }
        }
    }, [activeConversationId, token, conversations]);

    // LocalStorage for Active Assistants preference
    useEffect(() => {
        const saved = localStorage.getItem('agent_active_assistants');
        if (saved) {
            try { setActiveAssistants(JSON.parse(saved)); } catch (e) { }
        }
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('agent_active_assistants', JSON.stringify(activeAssistants));
        }
    }, [activeAssistants, isHydrated]);


    // --- 2. Core Actions ---

    const fetchOpenAIResponse = useCallback(async (conversationId, messages, modelId, modelName, projectInstructions, assistantId, targetMsgId) => {
        try {
            const controller = new AbortController();
            abortControllers.current[conversationId] = controller;
            setStreamingIds(prev => [...new Set([...prev, conversationId])]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ messages, model: modelId, projectInstructions, assistantId }),
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let fullContent = '';
            let reasoningContent = '';
            let isThinkingBlock = false;
            let jsonBuffer = '';
            let isJsonBlock = false;

            const updateAssistantMessage = (content, reasoning, sources = null) => {
                setConversations(prev => prev.map(conv => {
                    if (conv.id === conversationId) {
                        const msgs = [...(conv.messages || [])];
                        // If we have a target message ID, use that. Otherwise fallback to last message.
                        const targetIndex = targetMsgId
                            ? msgs.findIndex(m => m.id === targetMsgId)
                            : msgs.length - 1;

                        if (targetIndex !== -1) {
                            const lastMsg = msgs[targetIndex];
                            if (lastMsg.role === 'assistant') {
                                const newMsg = {
                                    ...lastMsg,
                                    content: content !== undefined ? content : lastMsg.content,
                                    reasoning: reasoning !== undefined ? reasoning : lastMsg.reasoning,
                                    isThinking: false,
                                    modelName: modelName
                                };
                                if (sources) newMsg.sources = sources;
                                msgs[targetIndex] = newMsg;

                                // Also update in allMessages
                                const allMsgs = [...(conv.allMessages || [])];
                                const allIndex = allMsgs.findIndex(m => m.id === lastMsg.id);
                                if (allIndex !== -1) allMsgs[allIndex] = newMsg;

                                return { ...conv, messages: msgs, allMessages: allMsgs };
                            }
                        }
                    }
                    return conv;
                }));
            };

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });

                // Stream Parsing Logic
                // ... (Same chunk parsing logic as before) ...
                if (chunk.includes('__JSON_START__')) {
                    const parts = chunk.split('__JSON_START__');
                    if (parts[0]) fullContent += parts[0];
                    jsonBuffer += parts[1] || '';
                    isJsonBlock = true;
                }

                if (isJsonBlock) {
                    if (chunk.includes('__JSON_END__')) {
                        const parts = (jsonBuffer + chunk).split('__JSON_END__');
                        try {
                            const data = JSON.parse(parts[0].replace('__JSON_START__', ''));
                            if (data.sources) updateAssistantMessage(undefined, undefined, data.sources);
                        } catch (e) { }
                        isJsonBlock = false;
                        if (parts[1]) {
                            if (parts[1].includes('__THINKING_START__')) {
                                isThinkingBlock = true;
                                reasoningContent += parts[1].replace('__THINKING_START__', '');
                            } else {
                                fullContent += parts[1];
                            }
                        }
                    } else {
                        jsonBuffer += chunk;
                    }
                    continue;
                }

                if (chunk.includes('__THINKING_START__')) {
                    isThinkingBlock = true;
                    const parts = chunk.split('__THINKING_START__');
                    fullContent += parts[0];
                    reasoningContent += parts[1] || '';
                    updateAssistantMessage(fullContent, reasoningContent);
                    continue;
                }

                if (chunk.includes('__THINKING_END__')) {
                    isThinkingBlock = false;
                    const parts = chunk.split('__THINKING_END__');
                    reasoningContent += parts[0];
                    fullContent += parts[1] || '';
                    updateAssistantMessage(fullContent, reasoningContent);
                    continue;
                }

                if (isThinkingBlock) {
                    reasoningContent += chunk;
                } else {
                    fullContent += chunk;
                }
                updateAssistantMessage(fullContent, reasoningContent);
            }

            // Save to DB (only creating a new one if not exists? No, we need to UPDATE the placeholder msg or CREATE new one)
            // Ideally we created a placeholder in DB via POST /messages before calling this.
            // But we didn't. We only created one in UI state.
            // So we must CREATE it now.

            // Wait, if we are regenerating, we might want to attach it to a parent.
            // We need the parent ID.
            // Let's get the conversation state to find the last user message ID.

            // This is async inside streaming, state might be stale in closure but we use setState updater which is fine.
            // But to save to DB we need the parent ID right now.
            // Easier way: The caller of fetchOpenAIResponse should ensure the USER message is saved.
            // And we find the last user message in the current conversation active path to use as parent.

            // Since we can't easily access updated state here without refs or careful logic,
            // let's assume we save it as a new message at the end of the conversation.
            // Or better: `addMessage` sends us the history. The last item is the user message (or system).
            const lastMsg = messages[messages.length - 1]; // This is the user message

            fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    conversationId,
                    role: 'assistant',
                    content: fullContent,
                    reasoning: reasoningContent,
                    modelName: modelName,
                    parentId: lastMsg.id // Link to user message
                })
            }).then(res => res.json()).then(data => {
                if (data.success && data.data.id) {
                    const realId = data.data.id;
                    const tempIdToReplace = targetMsgId;

                    // Update the placeholder ID in state with the real DB ID
                    setConversations(prev => prev.map(conv => {
                        if (conv.id === conversationId) {
                            // Find the message to replace. Prefer targetMsgId if it was a temp ID.
                            const msgs = conv.messages;
                            const msgToReplace = tempIdToReplace
                                ? msgs.find(m => m.id === tempIdToReplace)
                                : msgs[msgs.length - 1];

                            if (msgToReplace && msgToReplace.role === 'assistant') {
                                const actualTempId = msgToReplace.id;

                                const newMsgs = conv.messages.map(m => m.id === actualTempId ? { ...m, id: realId, createdAt: data.data.createdAt } : m);
                                const newAllMsgs = conv.allMessages.map(m => {
                                    if (m.id === actualTempId) {
                                        return { ...m, id: realId, createdAt: data.data.createdAt };
                                    }
                                    // Update sibling references to point to the real ID
                                    if (m.siblingIds && (m.siblingIds || []).includes(actualTempId)) {
                                        return {
                                            ...m,
                                            siblingIds: m.siblingIds.map(id => id === actualTempId ? realId : id)
                                        };
                                    }
                                    return m;
                                });
                                const newActivePath = (conv.activePath || []).map(id => id === actualTempId ? realId : id);

                                return { ...conv, messages: newMsgs, allMessages: newAllMsgs, activePath: newActivePath };
                            }
                        }
                        return conv;
                    }));
                }
            });

        } catch (error) {
            console.error(error);
            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    const msgs = conv.messages.map(m => m.isThinking ? { ...m, isThinking: false, content: `**Error:** ${error.message}` } : m);
                    return { ...conv, messages: msgs };
                }
                return conv;
            }));
        } finally {
            if (abortControllers.current[conversationId]) delete abortControllers.current[conversationId];
            setStreamingIds(prev => prev.filter(id => id !== conversationId));
        }
    }, [token]);


    const createConversation = useCallback(async (firstMessage, modelId = 'gpt-4o', modelName = 'GPT-4o', assistantId = null, fileAttachment = null) => {
        let messages = [];
        if (firstMessage || fileAttachment) {
            messages.push({ role: 'user', content: firstMessage || '' });
        }

        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    title: firstMessage
                        ? (firstMessage.length > 40 ? firstMessage.substring(0, 40).trim() + '...' : firstMessage)
                        : 'New Chat',
                    modelId,
                    modelName,
                    assistantId,
                    messages // API handles creating the first message
                })
            });
            const data = await res.json();

            if (data.success) {
                const newConv = data.data;

                // 1. Prepare base messages from Server
                let uiMessages = (newConv.messages || []).map(m => ({
                    ...m,
                    timestamp: new Date(m.createdAt),
                    isThinking: false
                }));

                let activePath = newConv.activePath && newConv.activePath.length > 0
                    ? newConv.activePath
                    : uiMessages.map(m => m.id);

                let aiPlaceholderId = null;

                // 2. Handle First Message & Optimistic AI Placeholder
                if (firstMessage) {
                    // Fallback: If server didn't return messages (rare/legacy), manually add User message
                    if (uiMessages.length === 0) {
                        const userMsgId = 'temp-' + Date.now();
                        const userMsg = { id: userMsgId, role: 'user', content: firstMessage, createdAt: new Date() };
                        uiMessages.push(userMsg);
                        activePath.push(userMsgId);
                    }

                    // Add Optimistic AI Placeholder
                    aiPlaceholderId = 'temp-ai-' + Date.now();
                    const aiPlaceholder = {
                        id: aiPlaceholderId,
                        role: 'assistant',
                        content: '',
                        isThinking: true,
                        createdAt: new Date()
                    };
                    uiMessages.push(aiPlaceholder);
                    activePath.push(aiPlaceholderId);
                }

                // 3. Construct the Full Conversation Object
                const fullConv = {
                    ...newConv,
                    messages: uiMessages,
                    allMessages: uiMessages, // Assuming linear start, allMessages == messages
                    activePath: activePath,
                    isLoaded: true,
                    createdAt: new Date(newConv.createdAt),
                    updatedAt: new Date(newConv.updatedAt)
                };

                // 4. Update State
                setConversations(prev => [fullConv, ...prev]);
                setActiveConversationId(newConv.id);

                // 5. Trigger Streaming if needed
                if (firstMessage && aiPlaceholderId) {
                    // Filter out the AI placeholder we just added to get the input history
                    const historyForAI = uiMessages.filter(m => m.id !== aiPlaceholderId);

                    fetchOpenAIResponse(
                        newConv.id,
                        historyForAI,
                        modelId,
                        modelName,
                        activeProject?.instructions,
                        assistantId,
                        aiPlaceholderId
                    );
                }

                return newConv.id;
            }
        } catch (e) { console.error(e); }
        return null; // Error
    }, [token, fetchOpenAIResponse, activeProject]);

    const continueChat = useCallback(async (title, messages, assistantId, allMessages = null, activePath = null) => {
        if (!token) return null;

        try {
            // Pick a model name/id from the last message or default to gpt-4o
            const sourceMessages = allMessages || messages;
            const lastAssistantMsg = [...sourceMessages].reverse().find(m => m.role === 'assistant');
            const modelId = lastAssistantMsg?.modelId || 'gpt-4o';
            const modelName = lastAssistantMsg?.modelName || 'GPT-4o';

            // Clean messages for import: only keep role and content to avoid ID/Circular conflicts
            const cleanMessages = !allMessages ? messages.map(m => ({
                role: m.role,
                content: m.content,
                modelName: m.modelName || modelName
            })) : undefined;

            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    title: title || 'Imported Chat',
                    modelId,
                    modelName,
                    assistantId,
                    messages: cleanMessages,
                    allMessages,
                    activePath
                })
            });

            const data = await res.json();
            if (data.success) {
                const newConv = {
                    ...data.data,
                    messages: (data.data.messages || []).map(m => ({ ...m, timestamp: new Date(m.createdAt), isThinking: false })),
                    allMessages: (data.data.allMessages || data.data.messages || []).map(m => ({ ...m, timestamp: new Date(m.createdAt), isThinking: false })),
                    createdAt: new Date(data.data.createdAt),
                    updatedAt: new Date(data.data.updatedAt),
                    isLoaded: true
                };

                setConversations(prev => [newConv, ...prev]);
                setActiveConversationId(newConv.id);
                showToast('Chat imported to your workspace!', 'success');
                return newConv.id;
            }
        } catch (err) {
            console.error('Failed to continue/import chat', err);
            showToast('Failed to import chat', 'error');
        }
        return null;
    }, [token, showToast]);

    const addMessage = useCallback(async (conversationId, content, role = 'user', modelId = 'arcee-ai/trinity-large-preview:free', modelName = 'Trinity Large', fileAttachment = null) => {
        if (!content && !fileAttachment) return;

        // Capture parent ID BEFORE updating state
        const currentConv = conversations.find(c => c.id === conversationId);
        const parentId = currentConv?.activePath?.length > 0
            ? currentConv.activePath[currentConv.activePath.length - 1]
            : null;

        const tempId = Date.now().toString();
        const userMsg = { id: tempId, role, content, timestamp: new Date(), attachment: fileAttachment, parentId };
        const aiMsg = { id: tempId + '-ai', role: 'assistant', content: '', isThinking: true, timestamp: new Date(), parentId: tempId };

        setConversations(prev => prev.map(c => {
            if (c.id === conversationId) {
                const newMsgs = [...(c.messages || []), userMsg, ...(role === 'user' ? [aiMsg] : [])];
                return {
                    ...c,
                    messages: newMsgs,
                    allMessages: [...(c.allMessages || []), userMsg, ...(role === 'user' ? [aiMsg] : [])],
                    activePath: [...(c.activePath || []), userMsg.id, ...(role === 'user' ? [aiMsg.id] : [])]
                };
            }
            return c;
        }));

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ conversationId, content, role, modelName, parentId })
            });

            const data = await res.json();

            // If saved, update ID in state (crucial for threading)
            if (data.success) {
                const realId = data.data.id;

                // Re-construct history for AI response
                const historyForAI = [...(currentConv?.messages || []), { ...userMsg, id: realId }];

                // UX Refinement: If this is an assistant chat with 'New Chat' title, update it
                const shouldUpdateTitle = currentConv?.title === 'New Chat' && role === 'user';
                const newTitle = shouldUpdateTitle
                    ? (content.length > 40 ? content.substring(0, 40).trim() + '...' : content)
                    : currentConv?.title;

                setConversations(prev => prev.map(c => {
                    if (c.id === conversationId) {
                        // Replace tempId with realId everywhere, including parentId references
                        const allMsgs = c.allMessages.map(m => {
                            if (m.id === tempId) return { ...m, id: realId, createdAt: data.data.createdAt };
                            if (m.parentId === tempId) return { ...m, parentId: realId }; // Fix AI placeholder's parentId
                            return m;
                        });
                        const activePath = c.activePath.map(id => id === tempId ? realId : id);
                        const msgs = c.messages.map(m => {
                            if (m.id === tempId) return { ...m, id: realId, createdAt: data.data.createdAt };
                            if (m.parentId === tempId) return { ...m, parentId: realId };
                            return m;
                        });

                        return {
                            ...c,
                            title: newTitle,
                            messages: msgs,
                            allMessages: allMsgs,
                            activePath
                        };
                    }
                    return c;
                }));

                if (shouldUpdateTitle && token) {
                    fetch(`/api/conversations/${conversationId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify({ title: newTitle })
                    }).catch(err => console.error('Failed to update conversation title', err));
                }

                if (role === 'user') {
                    fetchOpenAIResponse(conversationId, historyForAI, modelId, modelName, activeProject?.instructions, currentConv?.assistantId, tempId + '-ai');
                }
            }
        } catch (e) { console.error(e); }

    }, [token, conversations, fetchOpenAIResponse, activeProject]);

    // --- 3. Advanced Features (Versioning, Editing) ---

    const editMessage = useCallback(async (conversationId, messageId, newContent) => {
        // Optimistic
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: conv.messages.map(m => m.id === messageId ? { ...m, content: newContent } : m),
                    allMessages: conv.allMessages.map(m => m.id === messageId ? { ...m, content: newContent } : m)
                };
            }
            return conv;
        }));
        // API
        if (token) {
            fetch(`/api/messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ content: newContent })
            });
        }
    }, [token]);

    const resubmitMessage = useCallback(async (conversationId, originalMessageId, newContent, modelId, modelName) => {
        if (!token) return;

        const conv = conversations.find(c => c.id === conversationId);
        const originalMsg = conv?.allMessages.find(m => m.id === originalMessageId);
        if (!originalMsg) return;

        const parentId = originalMsg.parentId;

        try {
            // Create new message version
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    conversationId,
                    role: 'user',
                    content: newContent,
                    modelName,
                    parentId
                })
            });

            const data = await res.json();
            if (data.success) {
                const newMessage = data.data;
                const tempAiId = 'temp-resub-' + Date.now();

                // Update state
                setConversations(prev => prev.map(c => {
                    if (c.id === conversationId) {
                        // Calculate new path: up to parent + new message
                        let newPath = [];
                        if (parentId) {
                            const parentIndex = c.activePath.indexOf(parentId);
                            if (parentIndex !== -1) {
                                newPath = [...c.activePath.slice(0, parentIndex + 1), newMessage.id];
                            } else {
                                newPath = [...c.activePath, newMessage.id];
                            }
                        } else {
                            // If root message
                            newPath = [newMessage.id];
                        }

                        // Create temp AI placeholder
                        const aiPlaceholder = {
                            id: tempAiId,
                            role: 'assistant',
                            content: '',
                            isThinking: true,
                            timestamp: new Date(),
                            parentId: newMessage.id
                        };
                        newPath.push(tempAiId);

                        // Manually patch siblingIds for ALL siblings involved
                        // The new message (newMessage) might not have siblingIds populated from API if it was just created.
                        // We strictly know the siblings are: [originalMsg.id, ...originalMsg.siblingIds]
                        const existingSiblings = originalMsg.siblingIds || [];
                        const allSiblingIdsIncludingOld = [originalMsg.id, ...existingSiblings]; // These are the IDs that need to know about newMessage

                        // 1. Update the new message to know about all existing siblings
                        const newMessageWithSiblings = {
                            ...newMessage,
                            siblingIds: allSiblingIdsIncludingOld
                        };

                        const updatedAllMessages = [...c.allMessages, newMessageWithSiblings, aiPlaceholder].map(m => {
                            // 2. Update all existing siblings (and the original message) to know about the new message
                            if (allSiblingIdsIncludingOld.includes(m.id)) {
                                const currentSiblings = m.siblingIds || [];
                                // Add newMessage.id if not present
                                if (!currentSiblings.includes(newMessage.id)) {
                                    return { ...m, siblingIds: [...currentSiblings, newMessage.id] };
                                }
                                return m;
                            }
                            return m;
                        });

                        const activeMessages = newPath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);

                        return {
                            ...c,
                            allMessages: updatedAllMessages,
                            activePath: newPath,
                            messages: activeMessages
                        };
                    }
                    return c;
                }));

                // Re-construct history for AI response
                const conv = conversations.find(c => c.id === conversationId);
                let history = [];
                if (parentId) {
                    // We need to use the OLD conversation state's activePath because setConversations hasn't applied yet?
                    // actually we can use the `newPath` we just calculated locally if we need to.
                    // But history definition below seems to rely on `conv`...
                    // Let's rely on the logic that was there:
                    const parentIndex = conv.activePath.indexOf(parentId);
                    if (parentIndex !== -1) {
                        const pathIds = conv.activePath.slice(0, parentIndex + 1);
                        history = pathIds.map(id => conv.allMessages.find(m => m.id === id)).filter(Boolean);
                    }
                }
                history.push(newMessage);

                fetchOpenAIResponse(conversationId, history, modelId, modelName, activeProject?.instructions, conv?.assistantId, tempAiId);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token, conversations, fetchOpenAIResponse, activeProject]);

    const switchMessageVersion = useCallback(async (conversationId, messageId, targetVersionId) => {
        if (!token) return;

        const conv = conversations.find(c => c.id === conversationId);
        if (!conv) return;

        const targetMsg = conv.allMessages.find(m => m.id === targetVersionId);
        if (!targetMsg) return;

        // Build the complete path from root to target by walking parentId chain upward
        let newPath = [];
        let currentMsg = targetMsg;
        let loopGuard = 0;

        const reversePath = [];
        while (currentMsg && loopGuard < 100) {
            loopGuard++;
            reversePath.unshift(currentMsg.id);
            if (currentMsg.parentId) {
                currentMsg = conv.allMessages.find(m => m.id === currentMsg.parentId);
            } else {
                break;
            }
        }

        newPath = reversePath;

        // Now extend the path forward through the children of targetMsg.
        // IMPORTANT: Only follow direct children (parentId === lastMsg.id).
        // If the version has no children (newly regenerated), the path ends here.
        // If the version has children (original with subsequent Q&A), follow them.
        let lastMsg = targetMsg;
        loopGuard = 0;
        while (loopGuard < 100) {
            loopGuard++;
            // Find all direct children of this message
            const children = conv.allMessages.filter(m => m.parentId === lastMsg.id);
            if (children.length === 0) break;

            // Prefer children that are currently in the active path (i.e., the "selected" branch)
            // If none are in the current active path, pick the one with the most recent timestamp
            const activePathChild = children.find(c => conv.activePath.includes(c.id));
            const chosen = activePathChild || children.sort((a, b) =>
                new Date(a.createdAt || a.timestamp || 0) - new Date(b.createdAt || b.timestamp || 0)
            )[0];

            newPath.push(chosen.id);
            lastMsg = chosen;
        }

        // Force clear isThinking on all messages in the active path (safety guard for stale state)
        const activeMessages = newPath
            .map(id => conv.allMessages.find(m => m.id === id))
            .filter(Boolean)
            .map(m => m.isThinking ? { ...m, isThinking: false } : m);

        // Ensure we actually found messages
        if (activeMessages.length === 0 && newPath.length > 0) {
            console.error('switchMessageVersion: Failed to find messages for path', newPath);
            return;
        }

        setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, activePath: newPath, messages: activeMessages } : c));

        // Persist to API if the path changed
        if (JSON.stringify(newPath) !== JSON.stringify(conv.activePath)) {
            fetch(`/api/conversations/${conversationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ activePath: newPath })
            }).catch(err => console.error('Failed to update activePath:', err));
        }

    }, [token, conversations]);

    const regenerateResponse = useCallback(async (conversationId, modelId = 'arcee-ai/trinity-large-preview:free', modelName = 'Trinity Large', assistantId = null, targetMsgId = null) => {
        const conv = conversations.find(c => c.id === conversationId);
        if (!conv) return;

        // Determine which assistant message to branch from
        // If a targetMsgId is provided, truncate activePath at that message's position
        let newPath = [...(conv.activePath || [])];

        let targetIdx;
        if (targetMsgId) {
            targetIdx = newPath.indexOf(targetMsgId);
        } else {
            // Fall back to last message
            targetIdx = newPath.length - 1;
        }

        if (targetIdx === -1) return; // Target not in current path

        const targetMsgIdInPath = newPath[targetIdx];
        const targetMsg = conv.allMessages.find(m => m.id === targetMsgIdInPath);

        if (targetMsg?.role === 'assistant') {
            // Truncate path to just before the target message
            newPath = newPath.slice(0, targetIdx);

            // The last item is now the user message that triggered this response
            const userMsgId = newPath[newPath.length - 1];

            // Add new placeholder AI message
            const newAiId = 'temp-regen-' + Date.now();

            // Handle siblings: Link new message to the old message and its existing siblings
            const existingSiblings = targetMsg.siblingIds || [];
            const allSiblingIds = [targetMsg.id, ...existingSiblings];

            const aiMsg = {
                id: newAiId,
                role: 'assistant',
                content: '',
                isThinking: true,
                timestamp: new Date(),
                parentId: userMsgId,
                siblingIds: allSiblingIds
            };

            newPath.push(newAiId);

            // Update sibling IDs for all related existing messages
            const messagesWithUpdatedSiblings = conv.allMessages.map(m => {
                if (allSiblingIds.includes(m.id)) {
                    // Add new AI message to their sibling list
                    const updatedSiblings = [...new Set([...(m.siblingIds || []), newAiId])];
                    return { ...m, siblingIds: updatedSiblings };
                }
                return m;
            });

            const updatedAllMessages = [...messagesWithUpdatedSiblings, aiMsg];

            setConversations(prev => prev.map(c => {
                if (c.id === conversationId) {
                    return {
                        ...c,
                        activePath: newPath,
                        messages: newPath.map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean),
                        allMessages: updatedAllMessages
                    };
                }
                return c;
            }));

            // Trigger API with the history up to (but not including) the new placeholder
            const history = newPath.slice(0, -1).map(id => updatedAllMessages.find(m => m.id === id)).filter(Boolean);
            fetchOpenAIResponse(conversationId, history, modelId, modelName, activeProject?.instructions, assistantId || conv?.assistantId, newAiId);
        }
    }, [token, conversations, fetchOpenAIResponse, activeProject]);

    // --- 4. Projects & Helpers ---

    const createProject = useCallback(async (name) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            if (data.success) {
                setProjects(prev => [data.data, ...prev]);
                return data.data.id;
            }
        } catch (e) {
            console.error('Failed to create project', e);
        }
    }, [token]);

    const updateProject = useCallback(async (projectId, updates) => {
        // Optimistic local update
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));

        if (!token) return;

        try {
            await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(updates)
            });
        } catch (e) {
            console.error('Failed to update project', e);
        }
    }, [token]);

    const deleteProject = useCallback(async (projectId) => {
        // Optimistically remove project and detach chats
        setProjects(prev => prev.filter(p => p.id !== projectId));
        setConversations(prev => prev.map(c => c.projectId === projectId ? { ...c, projectId: null } : c));

        if (activeProjectId === projectId) {
            setActiveProjectId(null);
        }

        if (!token) return;

        try {
            await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (e) {
            console.error('Failed to delete project', e);
        }
    }, [token, activeProjectId]);

    const addChatToProject = useCallback(async (projectId, chatId) => {
        const conv = conversations.find(c => c.id === chatId);
        const previousProjectId = conv?.projectId || null;

        // Update UI: ensure chatIds and chatDetails stay in sync for both old and new projects
        setProjects(prev => prev.map(p => {
            // Remove from previous project if moving between projects
            if (previousProjectId && p.id === previousProjectId && previousProjectId !== projectId) {
                return {
                    ...p,
                    chatIds: (p.chatIds || []).filter(id => id !== chatId),
                    chatDetails: Array.isArray(p.chatDetails)
                        ? p.chatDetails.filter(d => d.id !== chatId)
                        : []
                };
            }

            if (p.id !== projectId) return p;

            const existingIds = new Set(p.chatIds || []);
            existingIds.add(chatId);

            const newDetail = {
                id: chatId,
                title: conv?.title || 'Untitled Chat',
                activePath: conv?.activePath || [],
                movedAt: new Date()
            };

            const remainingDetails = Array.isArray(p.chatDetails)
                ? p.chatDetails.filter(d => d.id !== chatId)
                : [];

            return {
                ...p,
                chatIds: Array.from(existingIds),
                chatDetails: [...remainingDetails, newDetail]
            };
        }));

        // Also update the conversation's projectId locally so UI stays consistent
        setConversations(prev => prev.map(c => c.id === chatId ? { ...c, projectId } : c));

        // API: use conversation update endpoint so that server also refreshes project.chatIds/chatDetails
        if (token) {
            fetch(`/api/conversations/${chatId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ projectId })
            });
        }
    }, [token, conversations]);

    const removeChatFromProject = useCallback(async (projectId, chatId) => {
        // Update UI
        setProjects(prev => prev.map(p => {
            if (p.id !== projectId) return p;

            return {
                ...p,
                chatIds: (p.chatIds || []).filter(id => id !== chatId),
                chatDetails: Array.isArray(p.chatDetails)
                    ? p.chatDetails.filter(d => d.id !== chatId)
                    : []
            };
        }));

        // Also clear projectId on the conversation locally
        setConversations(prev => prev.map(c => c.id === chatId ? { ...c, projectId: null } : c));

        // API
        if (token) {
            fetch(`/api/conversations/${chatId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ projectId: null })
            });
        }
    }, [token]);


    // Context Value
    const value = {
        conversations,
        activeConversationId,
        setActiveConversationId,
        createConversation,
        continueChat,
        addMessage,
        activeAssistants,
        setActiveAssistants,
        customAssistants,
        projects,
        activeProjectId,
        setActiveProjectId,
        createProject,
        updateProject,
        deleteProject,
        addProjectAssistant: async (assistant) => {
            if (!token) return;

            try {
                // If it's a new assistant (has temp ID or 'new')
                const isNew = assistant.id === 'new' || assistant.id.startsWith('temp-');

                if (isNew) {
                    const res = await fetch('/api/assistants', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify(assistant)
                    });
                    const data = await res.json();
                    if (data.success) {
                        setCustomAssistants(prev => [data.data, ...prev]);
                        // Auto-pin new assistant
                        setActiveAssistants(prev => [...prev, data.data]);
                        showToast(`Assistant "${data.data.name}" created and pinned!`, 'success');
                        return data.data;
                    }
                } else {
                    // Update existing
                    const res = await fetch(`/api/assistants/${assistant.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify(assistant)
                    });
                    const data = await res.json();
                    if (data.success) {
                        setCustomAssistants(prev => prev.map(a => a.id === assistant.id ? data.data : a));
                        // Update in active assistants if present
                        setActiveAssistants(prev => prev.map(a => a.id === assistant.id ? data.data : a));
                        showToast(`Assistant "${data.data.name}" updated!`, 'success');
                        return data.data;
                    }
                }
            } catch (e) {
                console.error('Failed to save assistant', e);
                showToast('Failed to save assistant', 'error');
            }
        },
        removeProjectAssistant: async (id) => {
            // Optimistic removal
            setCustomAssistants(p => p.filter(x => x.id !== id));

            // Also remove from active assistants if present
            setActiveAssistants(p => p.filter(x => x.id !== id));

            if (!token) return;

            try {
                await fetch(`/api/assistants/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (e) {
                console.error('Failed to delete assistant', e);
            }
        },
        activeProject,
        activeConversation: conversations.find(c => c.id === activeConversationId),

        startAssistantChat: (assistant) => createConversation(null, assistant.model, assistant.name, assistant.id),
        deleteConversation: async (id) => {
            const isActive = activeConversationId === id;

            // Remove from conversations list
            setConversations(p => p.filter(c => c.id !== id));

            // Remove this chat from any projects in local state
            setProjects(prev => prev.map(p => ({
                ...p,
                chatIds: (p.chatIds || []).filter(cid => cid !== id),
                chatDetails: Array.isArray(p.chatDetails)
                    ? p.chatDetails.filter(d => d.id !== id)
                    : []
            })));

            if (isActive) {
                setActiveConversationId(null);
                router.push('/chat/new-chat');
            }

            if (token) {
                fetch(`/api/conversations/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        },
        rateMessage: async (conversationId, messageId, rating) => {
            if (!messageId) return;

            // Optimistic update
            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    return {
                        ...conv,
                        messages: conv.messages.map(m => m.id === messageId ? { ...m, rating } : m),
                        allMessages: conv.allMessages.map(m => m.id === messageId ? { ...m, rating } : m)
                    };
                }
                return conv;
            }));

            // Don't call API for temporary IDs
            if (typeof messageId === 'string' && (messageId.includes('-ai') || !isNaN(messageId))) {
                console.warn('[Context] rateMessage - Skipping API call for temporary ID:', messageId);
                return;
            }

            if (token) {
                try {
                    const res = await fetch(`/api/messages/${messageId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ rating })
                    });

                    if (!res.ok) {
                        const status = res.status;
                        const text = await res.text();
                        console.error(`[Context] rateMessage - API Error (${status}) for ID "${messageId}":`, text);
                    }
                } catch (err) {
                    console.error(`[Context] rateMessage - Fetch Failed for ID "${messageId}":`, err);
                }
            } else {
                console.warn('[Context] rateMessage - No auth token found');
            }
        },
        stopResponse: (id) => {
            if (abortControllers.current[id]) abortControllers.current[id].abort();
            setStreamingIds(p => p.filter(x => x !== id));
        },
        streamingIds,
        isHydrated,
        editMessage,
        regenerateResponse,
        switchMessageVersion,
        addChatToProject,
        selectedAssistantId,
        setSelectedAssistantId,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,

        // Stubs for remaining checks
        removeActiveAssistant: (id) => setActiveAssistants(p => p.filter(x => x.id !== id)),
        resubmitMessage, // Use the implemented function

        removeChatFromProject,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within a ChatProvider');
    return context;
}
