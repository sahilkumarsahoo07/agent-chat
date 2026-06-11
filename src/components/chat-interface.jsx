'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import {
    PlusCircle,
    ArrowUp,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    Zap,
    FileText,
    Code,
    Image as ImageIcon,
    X,
    Archive,
    Lightbulb,
    User as UserIcon,
    Sparkles,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    AlertCircle,
    Share2,
    MoreVertical,
    FolderInput,
    Folder,
    Trash2,
    Square,
    Check,
    Pencil,
    BrainCircuit,
    Search,
    Globe,
    Command,
    MessageSquare,
    Terminal,
    Mail,
    ArrowDown,
    Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useChat } from '@/context/chat-context';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import CodeBlock from './code-block';
import MarkdownContent from './markdown-content';
import SourceCard from './source-card';
import SourcesSidebar from './sources-sidebar';
import ShareChatModal from './share-chat-modal';
import AssistantIcon from './assistant-icon';
import { STATIC_ASSISTANTS, MODELS } from '@/lib/assistants-config';

function checkReasoningCapability(msg, activeAssistant, activeModel) {
    // 1. If message already has reasoning, it's capable
    if (msg?.reasoning) return true;

    // 2. Check if the active assistant has reasoning action
    if (activeAssistant?.actions?.includes('reasoning')) return true;

    // 3. Check the message's specific model
    if (msg?.modelName) {
        const found = MODELS.find(m => m.name === msg.modelName || m.model === msg.modelName);
        if (found?.hasReasoning) return true;
    }

    // 4. Fallback to current selection if it's the latest generating message
    if (activeModel?.hasReasoning) return true;

    return false;
}

function cn(...inputs) {
    return twMerge(clsx(inputs));
}



// Live countdown timer shown inside the token-limit error message
function CountdownTimer({ resetTime }) {
    const calcRemaining = () => {
        if (!resetTime) return null;
        const diff = new Date(resetTime).getTime() - Date.now();
        return diff > 0 ? diff : 0;
    };

    const [remaining, setRemaining] = useState(calcRemaining);

    useEffect(() => {
        if (!resetTime) return;
        const timer = setInterval(() => {
            const diff = new Date(resetTime).getTime() - Date.now();
            setRemaining(diff > 0 ? diff : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, [resetTime]);

    if (remaining === null) return null;

    if (remaining === 0) {
        return (
            <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold">
                ✅ Tokens reset! Refresh the page to continue.
            </span>
        );
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');

    return (
        <span className="font-mono font-bold tabular-nums text-amber-400">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
    );
}

function CollapsibleReasoning({ content, isThinking }) {
    const [isOpen, setIsOpen] = useState(isThinking);

    useEffect(() => {
        if (isThinking) {
            setIsOpen(true);
        } else if (content) {
            // Auto collapse when thinking finishes and we have content
            setIsOpen(false);
        }
    }, [isThinking, content]);

    if (!content && !isThinking) return null;

    return (
        <div className="mb-4 border-l-2 border-[var(--border)] ml-1 pl-4 space-y-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider hover:text-[var(--foreground)] transition-colors py-1.5 group"
            >
                <div className="flex items-center gap-2">
                    {isOpen ? <ChevronDown size={14} className="opacity-50" /> : <ChevronRight size={14} className="opacity-50" />}
                    <div className="relative">
                        <div className={cn(
                            "p-1 rounded-full transition-all duration-500",
                            isThinking && "bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/30"
                        )}>
                            <BrainCircuit
                                size={15}
                                className={cn(
                                    "text-[#3b82f6] transition-all duration-700",
                                    isThinking && "scale-110 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"
                                )}
                            />
                        </div>
                        {isThinking && (
                            <>
                                <div className="absolute inset-0 bg-[#3b82f6]/40 rounded-full blur-sm animate-ping scale-150 opacity-30" />
                                <div className="absolute inset-0 bg-[#3b82f6]/20 rounded-full blur-md animate-pulse scale-125 opacity-50" />
                            </>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="tracking-[0.1em] text-[#3b82f6]">REASONING</span>
                    {!isOpen && !isThinking && <span className="opacity-40 lowercase font-normal italic text-[10px] transform translate-y-[0.5px]">(click to expand)</span>}
                    {isThinking && (
                        <div className="flex items-center gap-1.5 ml-1">
                            <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_#3b82f6]" />
                            <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_#3b82f6]" />
                            <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-bounce shadow-[0_0_8px_#3b82f6]" />
                        </div>
                    )}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="text-[13.5px] text-[var(--sidebar-foreground)] opacity-75 leading-relaxed pb-3 pr-4 border-b border-[var(--border)]/30 mb-2">
                            <MarkdownContent content={content || (isThinking ? '_Reasoning... (loading)_' : '')} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ChatInterface() {
    const {
        activeConversation,
        createConversation,
        addMessage,
        regenerateResponse,
        activeConversationId,
        setActiveConversationId,
        activeAssistants,
        deleteConversation,
        editMessage,
        resubmitMessage,
        switchMessageVersion,
        stopResponse,
        streamingIds,
        isHydrated,
        addChatToProject,
        projects,
        selectedAssistantId,
        setSelectedAssistantId,
        setActiveProjectId,
        rateMessage,
        customAssistants,
        setIsMobileDrawerOpen
    } = useChat();
    const isGenerating = streamingIds.includes(activeConversationId);

    const [disabledModels, setDisabledModels] = useState({});

    useEffect(() => {
        const updateDisabledModels = () => {
            try {
                const stored = JSON.parse(localStorage.getItem('disabled_models') || '{}');
                const now = Date.now();
                const valid = {};
                let changed = false;
                for (const [mId, expiry] of Object.entries(stored)) {
                    if (expiry > now) {
                        valid[mId] = expiry;
                    } else {
                        changed = true;
                    }
                }
                if (changed) {
                    localStorage.setItem('disabled_models', JSON.stringify(valid));
                }
                setDisabledModels(valid);
            } catch (e) { }
        };

        updateDisabledModels();
        window.addEventListener('disabled-models-updated', updateDisabledModels);
        return () => window.removeEventListener('disabled-models-updated', updateDisabledModels);
    }, []);

    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isConvLocked = activeConversation?.isLocked || searchParams.get('locked') === 'true';
    const isConvMappingCorrect = activeConversation?.id === params?.id;

    const findAssistant = useCallback((id) => {
        return activeAssistants.find(a => a.id === id) ||
            customAssistants.find(a => a.id === id) ||
            STATIC_ASSISTANTS.find(a => a.id === id);
    }, [activeAssistants, customAssistants]);

    const activeAssistant = useMemo(() => {
        const urlId = searchParams.get('assistantId');
        const convId = isConvMappingCorrect ? activeConversation?.assistantId : null;
        const isNewView = !params?.id || params.id === 'new-chat';

        // 1. If user manually selected an agent in this session, that takes priority for current input
        if (selectedAssistantId) return findAssistant(selectedAssistantId);

        // 2. If we're starting a NEW chat, URL intent is priority
        if (isNewView) {
            if (urlId) return findAssistant(urlId);
            return null; // General
        }

        // 3. For an EXISTING conversation:
        if (isConvMappingCorrect) {
            if (convId) return findAssistant(convId);
        }

        return null;
    }, [activeConversation?.id, activeConversation?.assistantId, searchParams, selectedAssistantId, params?.id, isConvLocked, isConvMappingCorrect, findAssistant]);

    const [message, setMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false);
    const [hasUserSelectedModel, setHasUserSelectedModel] = useState(false);

    const [moveWarning, setMoveWarning] = useState({ open: false, chatId: null, projectId: null });
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('agent_selected_model');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse saved model', e);
                }
            }
        }
        return MODELS.find(m => m.model === 'arcee-ai/trinity-large-preview:free') || MODELS[0];
    });

    const [isMounted, setIsMounted] = useState(false);

    const models = useMemo(() => {
        if (activeAssistant?.models && activeAssistant.models.length > 0) {
            return MODELS.filter(m => activeAssistant.models.includes(m.model));
        }
        return MODELS;
    }, [activeAssistant]);

    const activeModel = useMemo(() => {
        const actualConv = isConvMappingCorrect ? activeConversation : null;

        // 1. If an assistant is active and has multiple models, selectedModel takes priority
        if (activeAssistant?.models && activeAssistant.models.length > 0) {
            const isSelectedInList = activeAssistant.models.includes(selectedModel.model);
            if (isSelectedInList) return selectedModel;
            // Fallback to the first model in assistant's list
            return MODELS.find(m => m.model === activeAssistant.models[0]) || MODELS[6];
        }

        // 2. If user explicitly picked a model this session, honour it
        if (hasUserSelectedModel) return selectedModel;

        // 3. If conversation has a specific model saved, use that for display/logic
        if (actualConv?.modelId) {
            const found = MODELS.find(m => m.model === actualConv.modelId);
            if (found) return found;
        }

        // 4. Backward compatibility: if assistant has a single specific model
        if (activeAssistant?.model && activeAssistant.model !== 'user_default') {
            return MODELS.find(m => m.model === activeAssistant.model) || selectedModel;
        }
        return selectedModel;
    }, [activeAssistant, selectedModel, hasUserSelectedModel, isConvMappingCorrect, activeConversation?.id, activeConversation?.modelId]);

    const isModelLocked = (() => {
        if (isConvLocked) return true;

        // If it's an assistant and has only one model specified (the old way or a new way with 1 model)
        if (activeAssistant) {
            if (activeAssistant.models && activeAssistant.models.length > 1) return false;
            if (activeAssistant.models && activeAssistant.models.length === 1) return true;
            if (activeAssistant.model && activeAssistant.model !== 'user_default') return true;
        }

        return false;
    })();

    const availableAgents = useMemo(() => {
        const pinnedIds = new Set(activeAssistants.map(a => a.id));
        const staticAgents = STATIC_ASSISTANTS;
        const pinnedAssistants = activeAssistants;
        return [...staticAgents, ...pinnedAssistants];
    }, [activeAssistants]);



    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isModelLocked) {
            localStorage.setItem('agent_selected_model', JSON.stringify(selectedModel));
        }
    }, [selectedModel, isMounted, isModelLocked]);

    // Auto-reset model when switching assistants
    useEffect(() => {
        if (activeAssistant?.models && activeAssistant.models.length > 0) {
            const isCurrentModelValid = activeAssistant.models.includes(selectedModel?.model);
            if (!isCurrentModelValid) {
                const firstModel = MODELS.find(m => m.model === activeAssistant.models[0]);
                if (firstModel) setSelectedModel(firstModel);
            }
        }
        // Reset user selection flag when assistant changes
        setHasUserSelectedModel(false);
    }, [activeAssistant?.id]);

    // Reset user model selection when switching conversations
    useEffect(() => {
        setHasUserSelectedModel(false);
    }, [activeConversation?.id]);

    const [copiedId, setCopiedId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [regenerateId, setRegenerateId] = useState(null);
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);
    const [currentSources, setCurrentSources] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isProjectSelectMode, setIsProjectSelectMode] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({});

    const dropdownRef = useRef(null);
    const agentDropdownRef = useRef(null);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const menuRef = useRef(null);

    const suggestions = [
        { title: 'Write a Python script to automate my spreadsheets', icon: <Terminal size={18} className="text-blue-500" /> },
        { title: 'Summarize this long research paper into 5 bullet points', icon: <FileText size={18} className="text-emerald-500" /> },
        { title: 'Draft a professional email to request a project extension', icon: <Mail size={18} className="text-amber-500" /> },
        { title: 'Explain quantum entanglement like I am five years old', icon: <BrainCircuit size={18} className="text-purple-500" /> },
    ];

    useEffect(() => {
        if (params?.id) {
            setActiveConversationId(params.id);

            // Aggressively clear global selection state when entering an existing chat
            // to prevent the "seed agent" leakage reported in UI.
            if (params.id !== 'new-chat') {
                setSelectedAssistantId(null);
                setActiveProjectId(null);
            }
        }
    }, [params?.id, setActiveConversationId, setSelectedAssistantId, setActiveProjectId]);

    const scrollToBottom = (instant = false) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: instant ? "auto" : "smooth"
            });
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
        }
    };

    useLayoutEffect(() => {
        // Small timeout to ensure DOM is updated
        const timer = setTimeout(() => scrollToBottom(true), 50);
        return () => clearTimeout(timer);
    }, [activeConversation?.messages?.length, activeConversationId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target)) {
                setIsAgentDropdownOpen(false);
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
                setIsProjectSelectMode(false);
            }
            if (!event.target.closest('.regenerate-menu')) {
                setRegenerateId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let ticking = false;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const distanceToBottom = scrollHeight - scrollTop - clientHeight;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isAtBottom = distanceToBottom < 100; // Reduced threshold to 100px
                    // console.log('Scroll Debug:', { scrollTop, scrollHeight, clientHeight, distanceToBottom, isAtBottom });
                    setShowScrollButton(!isAtBottom);
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once to set initial state
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeConversationId, activeConversation?.messages?.length]); // Re-attach when conversation changes

    const handleSend = async () => {
        if (!message.trim() && !uploadedFile) return;

        let fileData = null;
        if (uploadedFile) {
            // Check file size (10MB limit)
            if (uploadedFile.size > 10 * 1024 * 1024) {
                alert("File is too large. Please upload files smaller than 10MB.");
                return;
            }

            // Read file content
            try {
                fileData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve({
                        name: uploadedFile.name,
                        type: uploadedFile.type,
                        content: e.target.result
                    });
                    reader.onerror = (e) => reject(new Error("Failed to read file"));

                    if (uploadedFile.type.startsWith('image/') || uploadedFile.type === 'application/pdf') {
                        reader.readAsDataURL(uploadedFile);
                    } else {
                        reader.readAsText(uploadedFile);
                    }
                });
            } catch (err) {
                console.error("File read error:", err);
                alert("Error reading file. Please try again.");
                return;
            }
        }

        const isVirtualId = activeConversationId === 'new-chat' || (activeAssistant && !activeConversation);

        if (!activeConversationId || isVirtualId) {
            const newId = await createConversation(message, activeModel.model, activeModel.name, activeAssistant?.id, fileData);
            router.push(`/chat/${newId}`);
        } else {
            addMessage(activeConversationId, message, 'user', activeModel.model, activeModel.name, fileData);
        }

        setMessage('');
        setUploadedFile(null);
    };

    const stopGeneration = () => {
        if (activeConversationId) {
            stopResponse(activeConversationId);
        }
    };



    // Save selected model to localStorage whenever it changes
    useEffect(() => {
        if (selectedModel) {
            localStorage.setItem('agent_selected_model', JSON.stringify(selectedModel));
        }
    }, [selectedModel]);

    const handleCopy = (content, id) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const isNewChatView = !params?.id || params.id === 'new-chat';
    const isLoadingChat = isHydrated && !isNewChatView && activeConversation && !activeConversation.isLoaded;

    return (
        <div className="flex-1 flex flex-row min-h-0 bg-[var(--background)] overflow-hidden">
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {isLoadingChat ? (
                    <div className="flex-1 flex flex-col h-full items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin opacity-50" />
                        <p className="mt-4 text-sm text-[var(--sidebar-foreground)] animate-pulse">Loading conversation...</p>
                    </div>
                ) : (
                    <>
                        {/* Header - only show when conversation exists */}
                        {activeConversation && activeConversation.messages.length > 0 && (
                            <div className="sticky top-0 z-10 bg-[var(--background)] px-4 md:px-6 py-3">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => setIsMobileDrawerOpen(true)}
                                        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--border)] transition-colors text-[var(--sidebar-foreground)]"
                                    >
                                        <Menu size={20} />
                                    </button>
                                    <div className="flex items-center gap-2 ml-auto">
                                        {/* Share Chat Button */}
                                        <button
                                            onClick={() => setShowShareModal(true)}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[var(--border)] transition-colors text-sm font-medium text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                        >
                                            <Share2 size={16} />
                                            <span>Share Chat</span>
                                        </button>

                                        {/* Three-dot Menu */}
                                        <div className="relative" ref={menuRef}>
                                            <button
                                                onClick={() => setShowMenu(!showMenu)}
                                                className="w-8 h-8 rounded-lg hover:bg-[var(--border)] flex items-center justify-center transition-colors"
                                            >
                                                <MoreVertical size={18} className="text-[var(--sidebar-foreground)]" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <AnimatePresence>
                                                {showMenu && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                        className="absolute right-0 mt-2 w-60 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl py-2 z-50"
                                                    >
                                                        {!isProjectSelectMode ? (
                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        setIsProjectSelectMode(true);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--border)] transition-colors text-left"
                                                                >
                                                                    <FolderInput size={16} className="text-[var(--sidebar-foreground)]" />
                                                                    <span className="text-sm font-medium text-[var(--foreground)]">Move to Project</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowMenu(false);
                                                                        if (activeConversationId) {
                                                                            deleteConversation(activeConversationId);
                                                                            router.push('/chat/new-chat');
                                                                        }
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 transition-colors text-left text-red-500"
                                                                >
                                                                    <Trash2 size={16} />
                                                                    <span className="text-sm font-medium">Delete</span>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="w-full">
                                                                <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)]/50 mb-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            setIsProjectSelectMode(false);
                                                                            setProjectSearchQuery("");
                                                                        }}
                                                                        className="hover:bg-[var(--border)] rounded p-1"
                                                                    >
                                                                        <ChevronLeft size={14} className="text-[var(--sidebar-foreground)]" />
                                                                    </button>
                                                                    <input
                                                                        autoFocus
                                                                        type="text"
                                                                        placeholder="Search Projects..."
                                                                        value={projectSearchQuery}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                        onChange={(e) => setProjectSearchQuery(e.target.value)}
                                                                        className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-[var(--foreground)] placeholder:text-[var(--sidebar-foreground)] p-0 focus:ring-0"
                                                                    />
                                                                </div>
                                                                <div className="max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                                                                    {projects.filter(p => p.name.toLowerCase().includes(projectSearchQuery.toLowerCase())).length > 0 ? (
                                                                        projects
                                                                            .filter(p => p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()))
                                                                            .map(project => (
                                                                                <button
                                                                                    key={project.id}
                                                                                    onClick={() => {
                                                                                        if (activeConversationId) {
                                                                                            if (activeConversation?.assistantId) {
                                                                                                setMoveWarning({ open: true, chatId: activeConversationId, projectId: project.id });
                                                                                            } else {
                                                                                                addChatToProject(project.id, activeConversationId);
                                                                                            }
                                                                                            setShowMenu(false);
                                                                                            setIsProjectSelectMode(false);
                                                                                            setProjectSearchQuery("");
                                                                                        }
                                                                                    }}
                                                                                    className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-lg transition-colors text-left"
                                                                                >
                                                                                    <Folder size={14} />
                                                                                    <span className="truncate">{project.name}</span>
                                                                                </button>
                                                                            ))
                                                                    ) : (
                                                                        <div className="px-2 py-3 text-xs text-[var(--sidebar-foreground)] italic text-center">
                                                                            No projects found
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Main Content Area */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto custom-scrollbar min-h-0 relative"
                        >
                            <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-8">
                                <AnimatePresence mode="wait">
                                    {/* Show initial view only if hydrated and (no conversation ID exists OR conversation is loaded and has no messages) AND we're not currently navigating to a specific conversation id */}
                                    {isHydrated && (!activeConversation || !activeConversation.messages || activeConversation.messages.length === 0) && (!params?.id || params.id === 'new-chat' || activeConversationId === params.id) ? (
                                        /* Initial View or Project View */
                                        <motion.div
                                            key="initial"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex flex-col items-center h-full relative"
                                        >
                                            {/* Mobile Menu Button for New Chat View */}
                                            <button
                                                onClick={() => setIsMobileDrawerOpen(true)}
                                                className="absolute top-4 left-4 md:hidden p-2 rounded-lg hover:bg-[var(--border)] transition-colors text-[var(--sidebar-foreground)] z-10"
                                            >
                                                <Menu size={20} />
                                            </button>

                                            <div className="flex flex-col items-center pt-16 md:pt-32 w-full">
                                                <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 text-center md:text-left w-full">
                                                    <div className="w-14 h-14 rounded-2xl border border-[var(--border)] flex items-center justify-center flex-shrink-0 bg-[var(--card)] shadow-sm">
                                                        {activeAssistant ? (
                                                            <Sparkles size={32} className="text-[var(--foreground)]" />
                                                        ) : (
                                                            <Command size={32} strokeWidth={1.5} className="text-[var(--foreground)]" />
                                                        )}
                                                    </div>
                                                    <h1 className="text-2xl md:text-3xl xl:text-[36px] font-bold tracking-tight text-[var(--foreground)]">
                                                        {activeAssistant ? activeAssistant.name : "How can I help you today?"}
                                                    </h1>
                                                </div>
                                                <p className="text-[var(--sidebar-foreground)] max-w-2xl text-[14px] md:text-[16px] px-4 opacity-70 mt-6 md:mt-8 text-center font-medium leading-relaxed">
                                                    {activeAssistant
                                                        ? activeAssistant.description || "This assistant is ready to help you with your tasks."
                                                        : "Explore the power of AI. Choose a shortcut below or start a new conversation."}
                                                </p>

                                                {!activeAssistant && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-10 md:mt-16 max-w-4xl px-4">
                                                        {suggestions.map((item, idx) => (
                                                            <motion.button
                                                                key={idx}
                                                                whileHover={{ scale: 1.01, backgroundColor: 'rgba(var(--foreground-rgb), 0.03)' }}
                                                                onClick={async () => {
                                                                    const isVirtualId = activeConversationId === 'new-chat' || (activeAssistant && !activeConversation);
                                                                    if (!activeConversationId || isVirtualId) {
                                                                        const newId = await createConversation(item.title, activeModel.model, activeModel.name, activeAssistant?.id);
                                                                        router.push(`/chat/${newId}`);
                                                                    } else {
                                                                        addMessage(activeConversationId, item.title, 'user', activeModel.model, activeModel.name);
                                                                    }
                                                                }}
                                                                className="flex flex-col p-4 md:p-4 xl:p-5 border border-[var(--border)] rounded-xl text-left transition-all hover:border-[var(--sidebar-foreground)]/30 bg-[var(--card)]/30 min-h-[100px] md:min-h-[120px] xl:min-h-[140px] justify-between group/card"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center mb-3 group-hover/card:border-[var(--sidebar-foreground)]/30 transition-colors">
                                                                    {item.icon}
                                                                </div>
                                                                <span className="text-[13px] md:text-[13px] xl:text-[14px] font-medium leading-[1.4] text-[var(--foreground)] opacity-90">{item.title}</span>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* Thread View */
                                        <motion.div
                                            key="thread"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col gap-6 pt-4 max-w-5xl mx-auto w-full"
                                        >
                                            {activeConversation?.messages?.map((msg, idx) => (
                                                <div
                                                    key={msg.id}
                                                    className={cn(
                                                        "flex w-full mb-6 group",
                                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "max-w-[85%] flex gap-4",
                                                        msg.role === 'user' && "flex-row-reverse"
                                                    )}>
                                                        {msg.role === 'assistant' && (
                                                            <div className="w-9.5 h-9.5 flex items-center justify-center flex-shrink-0 mt-1 rounded-full border border-[var(--border)] overflow-hidden p-1">
                                                                <AssistantIcon
                                                                    iconId={(() => {
                                                                        const agent = findAssistant(msg.assistantId);
                                                                        return agent?.iconId || (msg.assistantId === activeConversation?.assistantId ? activeAssistant?.iconId : 'general');
                                                                    })()}
                                                                    className="w-full h-full text-[var(--foreground)]"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="flex flex-col min-w-0">
                                                            {(() => {
                                                                const isThinking = msg.isThinking || (isGenerating && msg.id === activeConversation?.messages[activeConversation?.messages.length - 1]?.id && !msg.content);

                                                                // 1. Show thinking first if we have no reasoning content yet
                                                                if (isThinking && !msg.reasoning) {
                                                                    return (
                                                                        <div className="flex items-center gap-2.5 text-[14px] text-[var(--sidebar-foreground)] animate-pulse py-2 px-1">
                                                                            <span className="font-semibold tracking-tight opacity-70">Thinking...</span>
                                                                        </div>
                                                                    );
                                                                }

                                                                // 2. Show Reasoning component if we have reasoning content
                                                                if (msg.reasoning) {
                                                                    return (
                                                                        <CollapsibleReasoning
                                                                            content={msg.reasoning}
                                                                            isThinking={isThinking}
                                                                        />
                                                                    );
                                                                }

                                                                return null;
                                                            })()}

                                                            {!msg.isThinking && !msg.content && !msg.reasoning && (
                                                                <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin my-3 opacity-50" />
                                                            )}
                                                            {(msg.content || (msg.isThinking && msg.reasoning)) && (
                                                                <div className="flex flex-col gap-3">
                                                                    {/* Sources Display */}
                                                                    {msg.sources && msg.sources.length > 0 && (
                                                                        <div className="flex flex-col gap-2 mb-2">
                                                                            <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--sidebar-foreground)] uppercase tracking-wider opacity-70">
                                                                                <Globe size={12} />
                                                                                <span>Searched the internet</span>
                                                                            </div>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {msg.sources.slice(0, 3).map((source, idx) => (
                                                                                    <SourceCard key={idx} source={source} index={idx} />
                                                                                ))}
                                                                                {msg.sources.length > 3 && (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setCurrentSources(msg.sources);
                                                                                            setIsSourcesOpen(true);
                                                                                        }}
                                                                                        className="flex items-center justify-center px-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors h-[100px] text-[12px] font-medium text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                                                                    >
                                                                                        View {msg.sources.length - 3} more
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <div className={cn(
                                                                        "rounded-2xl text-[14px] md:text-[15px] leading-relaxed break-words relative group",
                                                                        msg.role === 'user'
                                                                            ? "bg-[var(--border)]/30 px-4 py-2.5 text-[var(--foreground)] rounded-tr-none font-medium mb-1"
                                                                            : msg.content.startsWith('**Error:**')
                                                                                ? "bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3"
                                                                                : "text-[var(--foreground)] py-1.5"
                                                                    )}>
                                                                        {msg.role === 'user' && !editingId && (
                                                                            <div className="absolute top-full mt-2 right-0 opacity-100 flex items-center gap-4 text-[var(--sidebar-foreground)]">
                                                                                <div className="flex items-center gap-1">
                                                                                    <button
                                                                                        onClick={() => handleCopy(msg.content, msg.id)}
                                                                                        className="p-1 hover:text-[var(--foreground)] transition-colors"
                                                                                        title="Copy"
                                                                                    >
                                                                                        {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={16} />}
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setEditingId(msg.id);
                                                                                            setEditingContent(msg.content);
                                                                                        }}
                                                                                        className="p-1 hover:text-[var(--foreground)] transition-colors"
                                                                                        title="Edit"
                                                                                    >
                                                                                        <Pencil size={16} />
                                                                                    </button>
                                                                                </div>

                                                                                {msg.siblingIds && msg.siblingIds.length > 0 && !editingId && (
                                                                                    <div className="flex items-center gap-1 select-none opacity-100 transition-opacity">
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                const siblings = (activeConversation.allMessages || [])
                                                                                                    .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                                    .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                                const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                                if (currentIndex > 0) {
                                                                                                    const targetId = siblings[currentIndex - 1].id;
                                                                                                    console.log('Navigation Click Prev:', { msgId: msg.id, targetId, siblingCount: siblings.length });
                                                                                                    switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                                    // Scroll to bottom after switching versions
                                                                                                    setTimeout(() => scrollToBottom(false), 100);
                                                                                                }
                                                                                            }}
                                                                                            disabled={(() => {
                                                                                                const siblings = (activeConversation.allMessages || [])
                                                                                                    .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                                    .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                                const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                                return currentIndex === 0;
                                                                                            })()}
                                                                                            className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                                                        >
                                                                                            <ChevronLeft size={14} />
                                                                                        </button>
                                                                                        <span className="text-xs font-semibold text-[var(--foreground)] min-w-[24px] text-center">
                                                                                            {(() => {
                                                                                                const siblings = (activeConversation.allMessages || [])
                                                                                                    .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                                    .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                                const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                                return currentIndex + 1;
                                                                                            })()}/{(msg.siblingIds?.length || 0) + 1}
                                                                                        </span>
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                const siblings = (activeConversation.allMessages || [])
                                                                                                    .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                                    .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                                const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                                if (currentIndex < siblings.length - 1) {
                                                                                                    const targetId = siblings[currentIndex + 1].id;
                                                                                                    console.log('Navigation Click Next:', { msgId: msg.id, targetId, siblingCount: siblings.length });
                                                                                                    switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                                    // Scroll to bottom after switching versions
                                                                                                    setTimeout(() => scrollToBottom(false), 100);
                                                                                                }
                                                                                            }}
                                                                                            disabled={(() => {
                                                                                                const siblings = (activeConversation.allMessages || [])
                                                                                                    .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                                    .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                                const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                                return currentIndex === siblings.length - 1;
                                                                                            })()}
                                                                                            className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                                                        >
                                                                                            <ChevronRight size={14} />
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        {msg.content.startsWith('**Error:**') && (
                                                                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                                                        )}
                                                                        <div className="flex-1">
                                                                            {editingId === msg.id ? (
                                                                                <div className="flex flex-col gap-3 mt-1 min-w-[300px] md:min-w-[450px]">
                                                                                    <textarea
                                                                                        value={editingContent}
                                                                                        onChange={(e) => setEditingContent(e.target.value)}
                                                                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] min-h-[100px] resize-none"
                                                                                        autoFocus
                                                                                    />
                                                                                    <div className="flex items-center justify-end gap-2">
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                if (editingContent.trim()) {
                                                                                                    resubmitMessage(
                                                                                                        activeConversationId,
                                                                                                        msg.id,
                                                                                                        editingContent,
                                                                                                        selectedModel.model,
                                                                                                        selectedModel.name,
                                                                                                        activeAssistant?.id
                                                                                                    );
                                                                                                }
                                                                                                setEditingId(null);
                                                                                            }}
                                                                                            className="px-3 py-1.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-all"
                                                                                        >
                                                                                            Submit
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={() => setEditingId(null)}
                                                                                            className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-xs font-semibold hover:bg-[var(--border)]/50 transition-all"
                                                                                        >
                                                                                            Cancel
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex flex-col gap-3">
                                                                                    {msg.attachment && (
                                                                                        <div className="mb-2">
                                                                                            {msg.attachment.type.startsWith('image/') ? (
                                                                                                <div className="relative group/img max-w-[240px] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm cursor-zoom-in">
                                                                                                    <img
                                                                                                        src={msg.attachment.content}
                                                                                                        className="w-full h-auto object-cover max-h-[300px] hover:scale-[1.02] transition-transform duration-300"
                                                                                                        alt="Attached image"
                                                                                                    />
                                                                                                </div>
                                                                                            ) : (
                                                                                                <div className="inline-flex items-center gap-3 p-2.5 pr-4 bg-[var(--background)]/40 hover:bg-[var(--background)]/60 rounded-xl border border-[var(--border)] transition-all duration-200 group/file">
                                                                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/80 to-blue-500/80 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-sm group-hover/file:scale-105 transition-transform">
                                                                                                        {msg.attachment.type === 'application/pdf' ? <FileText size={20} /> : <Archive size={20} />}
                                                                                                    </div>
                                                                                                    <div className="flex flex-col min-w-0">
                                                                                                        <span className="text-[13px] font-bold text-[var(--foreground)] truncate max-w-[220px]">{msg.attachment.name}</span>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                            <span className="text-[10px] text-[var(--sidebar-foreground)] uppercase tracking-wider font-bold opacity-60">
                                                                                                                {msg.attachment.type === 'application/pdf' ? 'PDF Document' : 'Attached File'}
                                                                                                            </span>
                                                                                                            <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                                                                                                            <span className="text-[10px] text-[var(--sidebar-foreground)] font-medium">
                                                                                                                {msg.attachment.content?.length > 1000 ? `${(msg.attachment.content.length / 1024 / 1.33).toFixed(1)} KB` : 'Small File'}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="flex flex-col gap-2">
                                                                                        <MarkdownContent content={msg.content.startsWith('**Error:**') ? msg.content.replace('**Error:**', '').trim() : msg.content} />
                                                                                        {msg.tokenResetTime && (
                                                                                            <div className="flex items-center gap-1.5 text-[12px] text-[var(--sidebar-foreground)] opacity-60 mt-1">
                                                                                                <span>⏱ Tokens reset in:</span>
                                                                                                <CountdownTimer resetTime={msg.tokenResetTime} />
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className={cn(
                                                                            "flex items-center gap-2 px-1",
                                                                            msg.role === 'user' ? "justify-end" : "justify-start"
                                                                        )}>
                                                                            {/* <span className="text-[10px] text-[var(--sidebar-foreground)] opacity-40 font-medium tracking-tight">
                                                                            {(() => {
                                                                                const d = new Date(msg.createdAt || msg.timestamp);
                                                                                return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                                                                            })()}
                                                                        </span> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Action Icons */}
                                                            {msg.role === 'assistant' && !msg.isThinking && (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-1 mt-2">
                                                                        <button
                                                                            onClick={() => handleCopy(msg.content, msg.id)}
                                                                            className="p-2 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors"
                                                                            title="Copy response"
                                                                        >
                                                                            {copiedId === msg.id ? (
                                                                                <Check size={16} className="text-green-500" />
                                                                            ) : (
                                                                                <Copy size={16} />
                                                                            )}
                                                                        </button>
                                                                        {(!msg.rating || msg.rating === 'like') && (
                                                                            <button
                                                                                onClick={() => rateMessage(activeConversationId, msg.id, msg.rating === 'like' ? null : 'like')}
                                                                                className={cn(
                                                                                    "p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
                                                                                    msg.rating === 'like'
                                                                                        ? "bg-[var(--rating-like-bg)] text-[var(--rating-like-text)] shadow-sm"
                                                                                        : "text-[var(--sidebar-foreground)] hover:bg-[var(--border)]/50"
                                                                                )}
                                                                                title="Good response"
                                                                            >
                                                                                <ThumbsUp size={16} fill={msg.rating === 'like' ? "currentColor" : "none"} />
                                                                            </button>
                                                                        )}
                                                                        {(!msg.rating || msg.rating === 'dislike') && (
                                                                            <button
                                                                                onClick={() => rateMessage(activeConversationId, msg.id, msg.rating === 'dislike' ? null : 'dislike')}
                                                                                className={cn(
                                                                                    "p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
                                                                                    msg.rating === 'dislike'
                                                                                        ? "bg-[var(--rating-dislike-bg)] text-[var(--rating-dislike-text)] shadow-sm"
                                                                                        : "text-[var(--sidebar-foreground)] hover:bg-[var(--border)]/50"
                                                                                )}
                                                                                title="Bad response"
                                                                            >
                                                                                <ThumbsDown size={16} fill={msg.rating === 'dislike' ? "currentColor" : "none"} />
                                                                            </button>
                                                                        )}
                                                                        <div className="relative regenerate-menu">
                                                                            <button
                                                                                ref={(el) => {
                                                                                    if (el && regenerateId === msg.id && !dropdownPosition[msg.id]) {
                                                                                        const rect = el.getBoundingClientRect();
                                                                                        const spaceBelow = window.innerHeight - rect.bottom;
                                                                                        const spaceAbove = rect.top;
                                                                                        const dropdownHeight = 300; // approximate max height
                                                                                        setDropdownPosition(prev => ({
                                                                                            ...prev,
                                                                                            [msg.id]: spaceBelow >= dropdownHeight || spaceBelow > spaceAbove ? 'below' : 'above'
                                                                                        }));
                                                                                    }
                                                                                }}
                                                                                onClick={() => {
                                                                                    if (regenerateId === msg.id) {
                                                                                        setRegenerateId(null);
                                                                                        setDropdownPosition(prev => {
                                                                                            const newPos = { ...prev };
                                                                                            delete newPos[msg.id];
                                                                                            return newPos;
                                                                                        });
                                                                                    } else {
                                                                                        setRegenerateId(msg.id);
                                                                                    }
                                                                                }}
                                                                                className={cn(
                                                                                    "p-1.5 pr-2.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors flex items-center gap-1.5",
                                                                                    regenerateId === msg.id && "bg-[var(--border)] text-[var(--foreground)]"
                                                                                )}
                                                                                title="Regenerate"
                                                                            >
                                                                                <RefreshCw size={15} />
                                                                                <span className="text-xs font-medium">
                                                                                    {(() => {
                                                                                        const model = MODELS.find(m => m.model === msg.modelName || m.name === msg.modelName);
                                                                                        return model?.name || msg.modelName || 'Solar Pro';
                                                                                    })()}
                                                                                </span>
                                                                            </button>

                                                                            {regenerateId === msg.id && (
                                                                                <div className={cn(
                                                                                    "absolute left-0 w-[340px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl p-1 z-[100] max-h-[280px] overflow-y-auto custom-scrollbar",
                                                                                    dropdownPosition[msg.id] === 'below' ? "top-full mt-2" : "bottom-full mb-2"
                                                                                )}>

                                                                                    <div className="px-3 py-1.5 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase opacity-50">Regenerate with</div>
                                                                                    {models.map((model, mIdx) => {
                                                                                        const isDisabled = disabledModels[model.model];
                                                                                        return (
                                                                                        <button
                                                                                            key={mIdx}
                                                                                            onClick={(e) => {
                                                                                                if (isDisabled) {
                                                                                                    e.preventDefault();
                                                                                                    return;
                                                                                                }
                                                                                                setSelectedModel(model);
                                                                                                setRegenerateId(null);
                                                                                                regenerateResponse(activeConversationId, model.model, model.name, activeAssistant?.id, msg.id);
                                                                                            }}
                                                                                            className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group/item", isDisabled ? "opacity-40 cursor-not-allowed bg-[var(--border)]/10" : "hover:bg-[var(--border)]/50 text-[var(--foreground)]")}
                                                                                        >
                                                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                                                <div className="w-4 h-4 flex items-center justify-center rounded-md bg-[var(--border)]/30 overflow-hidden shrink-0">
                                                                                                    <img src={model.icon} className={cn("w-3 h-3 object-contain model-icon", isDisabled && "grayscale")} />
                                                                                                </div>
                                                                                                <span className="text-[13px] font-semibold truncate leading-tight">{model.name}</span>
                                                                                            </div>
                                                                                            
                                                                                            {isDisabled ? (
                                                                                                <div className="flex items-center justify-end overflow-hidden max-w-0 opacity-0 group-hover/item:max-w-[200px] group-hover/item:opacity-100 transition-all duration-300 ease-out shrink-0">
                                                                                                    <div className="flex items-center gap-1.5 pl-2">
                                                                                                        <span className="text-[10px] font-medium px-2 py-[1px] rounded-full border border-red-500/40 bg-red-500/10 text-red-500 whitespace-nowrap">
                                                                                                            Upstream Error
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ) : (
                                                                                                model.tags && model.tags.length > 0 && (
                                                                                                    <div className="flex items-center justify-end overflow-hidden max-w-0 opacity-0 group-hover/item:max-w-[250px] group-hover/item:opacity-100 transition-all duration-300 ease-out shrink-0">
                                                                                                        <div className="flex items-center gap-1.5 pl-2">
                                                                                                            {model.tags.map((tag, tIdx) => (
                                                                                                                <span key={tIdx} className="text-[10px] font-medium px-2 py-[1px] rounded-full border border-solid whitespace-nowrap" style={{ color: tag.color || '#888', borderColor: tag.color ? `${tag.color}40` : '#88888840', backgroundColor: tag.color ? `${tag.color}10` : 'transparent' }}>
                                                                                                                    {tag.label}
                                                                                                                </span>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </button>
                                                                                    )})}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* Assistant Response Pagination UI */}
                                                                    {msg.siblingIds && msg.siblingIds.length > 0 && !editingId && (
                                                                        <div className="flex items-center gap-1 select-none opacity-100 transition-opacity">
                                                                            <button
                                                                                onClick={() => {
                                                                                    const siblings = (activeConversation.allMessages || [])
                                                                                        .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                        .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                    const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                    if (currentIndex > 0) {
                                                                                        const targetId = siblings[currentIndex - 1].id;
                                                                                        console.log('Assistant Navigation Click Prev:', { msgId: msg.id, targetId, siblingCount: siblings.length });
                                                                                        switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                        // Scroll to bottom after switching versions
                                                                                        setTimeout(() => scrollToBottom(false), 100);
                                                                                    }
                                                                                }}
                                                                                disabled={(() => {
                                                                                    const siblings = (activeConversation.allMessages || [])
                                                                                        .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                        .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                    const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                    return currentIndex === 0;
                                                                                })()}
                                                                                className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                                            >
                                                                                <ChevronLeft size={14} />
                                                                            </button>
                                                                            <span className="text-xs font-semibold text-[var(--foreground)] min-w-[24px] text-center">
                                                                                {(() => {
                                                                                    const siblings = (activeConversation.allMessages || [])
                                                                                        .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                        .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                    const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                    return currentIndex + 1;
                                                                                })()}/{(msg.siblingIds ? msg.siblingIds.length : 0) + 1}
                                                                            </span>
                                                                            <button
                                                                                onClick={() => {
                                                                                    const siblings = (activeConversation.allMessages || [])
                                                                                        .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                        .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                    const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                    if (currentIndex < siblings.length - 1) {
                                                                                        const targetId = siblings[currentIndex + 1].id;
                                                                                        console.log('Assistant Navigation Click Next:', { msgId: msg.id, targetId, siblingCount: siblings.length });
                                                                                        switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                        // Scroll to bottom after switching versions
                                                                                        setTimeout(() => scrollToBottom(false), 100);
                                                                                    }
                                                                                }}
                                                                                disabled={(() => {
                                                                                    const siblings = (activeConversation.allMessages || [])
                                                                                        .filter(m => m.id === msg.id || (msg.siblingIds || []).includes(m.id))
                                                                                        .sort((a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp));
                                                                                    const currentIndex = siblings.findIndex(s => s.id === msg.id);
                                                                                    return currentIndex === siblings.length - 1;
                                                                                })()}
                                                                                className="p-1 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                                            >
                                                                                <ChevronRight size={14} />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>



                        {/* Input Area */}
                        <div className="shrink-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent pt-4 pb-8 px-4 flex justify-center">
                            <div className="w-full max-w-5xl">
                                <div className="relative bg-[var(--input-bg)] rounded-[24px] shadow-sm transition-all p-2 md:p-2.5 [@media(min-width:1100px)_and_(max-width:1340px)]:p-[8px_0px] xl:p-3.5 border border-[var(--border)]/60 focus-within:border-[var(--sidebar-foreground)]/40">
                                    {uploadedFile && (
                                        <div className="px-2 pt-1 pb-1">
                                            <div className="inline-flex items-center gap-2.5 p-2 pr-3 bg-[var(--border)]/10 rounded-xl border border-[var(--border)]/30 group relative max-w-full overflow-hidden">
                                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                                                    <Archive size={16} />
                                                </div>
                                                <span className="text-[12px] font-medium text-[var(--foreground)] truncate max-w-[150px]">{uploadedFile.name}</span>
                                                <button onClick={() => setUploadedFile(null)} className="ml-1 opacity-60 hover:opacity-100"><X size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                        placeholder={activeAssistant ? `Ask ${activeAssistant.name}...` : "Ask Anything..."}
                                        rows={1}
                                        className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none resize-none px-4 xl:px-5 py-3 xl:py-4 text-[14px] xl:text-[15px] text-[var(--foreground)] placeholder-[var(--sidebar-foreground)]/60 opacity-90 max-h-[200px]"
                                    />

                                    <div className="flex items-center justify-between px-2 pb-1">
                                        <div className="flex items-center gap-1.5">
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                            <button
                                                onClick={handleFileClick}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[12px] xl:text-[13px] font-medium text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all"
                                            >
                                                <PlusCircle className={cn("w-4 h-4", uploadedFile ? "text-blue-500" : "opacity-70")} />
                                                <span>File</span>
                                            </button>


                                            <div className="relative" ref={dropdownRef}>
                                                <button
                                                    onClick={() => !isModelLocked && setIsDropdownOpen(!isDropdownOpen)}
                                                    className={cn(
                                                        "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[12px] xl:text-[13px] font-medium text-[var(--sidebar-foreground)] transition-all group",
                                                        isModelLocked ? "cursor-default opacity-80" : "hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                                                    )}
                                                    suppressHydrationWarning
                                                >
                                                    <div className="w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                                                        <img src={activeModel.icon} className="w-full h-full object-contain model-icon" suppressHydrationWarning />
                                                    </div>
                                                    <span className="truncate max-w-[100px]" suppressHydrationWarning>{activeModel.name}</span>
                                                    {!isModelLocked && (
                                                        <ChevronDown size={12} className={cn("opacity-40 transition-all", isDropdownOpen && "rotate-180")} />
                                                    )}
                                                </button>

                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: -10 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="absolute bottom-full left-0 mb-2 w-[340px] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-1.5 z-50 max-h-[300px] overflow-y-auto custom-scrollbar"
                                                        >
                                                            {models.filter(m => m.model !== 'user_default').map((model, idx) => {
                                                                const isDisabled = disabledModels[model.model];
                                                                return (
                                                                <button
                                                                    key={idx}
                                                                    onClick={(e) => {
                                                                        if (isDisabled) {
                                                                            e.preventDefault();
                                                                            return;
                                                                        }
                                                                        setSelectedModel(model); setHasUserSelectedModel(true); setIsDropdownOpen(false); 
                                                                    }}
                                                                    className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group/item", isDisabled ? "opacity-40 cursor-not-allowed bg-[var(--border)]/10" : "text-[var(--sidebar-foreground)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)]")}
                                                                >
                                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                                                            <img src={model.icon} className={cn("w-full h-full object-contain model-icon", isDisabled && "grayscale")} />
                                                                        </div>
                                                                        <span className={cn("text-[13px] font-semibold truncate leading-tight", !isDisabled && "text-[var(--foreground)]")}>{model.name}</span>
                                                                    </div>
                                                                    
                                                                    {isDisabled ? (
                                                                        <div className="flex items-center justify-end overflow-hidden max-w-0 opacity-0 group-hover/item:max-w-[200px] group-hover/item:opacity-100 transition-all duration-300 ease-out shrink-0">
                                                                            <div className="flex items-center gap-1.5 pl-2">
                                                                                <span className="text-[10px] font-medium px-2 py-[1px] rounded-full border border-red-500/40 bg-red-500/10 text-red-500 whitespace-nowrap">
                                                                                    Upstream Error
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        model.tags && model.tags.length > 0 && (
                                                                            <div className="flex items-center justify-end overflow-hidden max-w-0 opacity-0 group-hover/item:max-w-[250px] group-hover/item:opacity-100 transition-all duration-300 ease-out shrink-0">
                                                                                <div className="flex items-center gap-1.5 pl-2">
                                                                                    {model.tags.map((tag, tIdx) => (
                                                                                        <span key={tIdx} className="text-[10px] font-medium px-2 py-[1px] rounded-full border border-solid whitespace-nowrap" style={{ color: tag.color || '#888', borderColor: tag.color ? `${tag.color}40` : '#88888840', backgroundColor: tag.color ? `${tag.color}10` : 'transparent' }}>
                                                                                            {tag.label}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </button>
                                                            )})}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <button
                                            onClick={isGenerating ? stopGeneration : handleSend}
                                            disabled={!isGenerating && !message.trim() && !uploadedFile}
                                            className={cn(
                                                "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                                                isGenerating
                                                    ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                                                    : (message.trim() || uploadedFile)
                                                        ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                                                        : "bg-[var(--foreground)]/10 text-[var(--sidebar-foreground)]/50 cursor-not-allowed"
                                            )}
                                        >
                                            {isGenerating ? (
                                                <Square size={14} strokeWidth={2.5} fill="currentColor" />
                                            ) : (
                                                <ArrowUp size={16} strokeWidth={2.5} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modals */}
                        <AnimatePresence>
                            {moveWarning.open && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)] mt-1">
                                                    <div className="text-[var(--foreground)] font-bold px-2 py-0.5 border border-[var(--foreground)] rounded-full text-xs">!</div>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-lg font-semibold text-[var(--foreground)]">Move Custom Agent Chat</h2>
                                                        <button
                                                            onClick={() => setMoveWarning({ open: false, chatId: null, projectId: null })}
                                                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                                        This chat uses a <span className="font-semibold text-[var(--foreground)]">custom agent</span> and moving it to a <span className="font-semibold text-[var(--foreground)]">project</span> will not override the agent's prompt or knowledge configurations. This should only be used for organization purposes.
                                                    </p>
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <input type="checkbox" id="dontShowAgainChat" className="rounded border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-0" />
                                                        <label htmlFor="dontShowAgainChat" className="text-sm text-[var(--muted-foreground)] select-none cursor-pointer">Do not show this again</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-3 pt-2">
                                                <button
                                                    onClick={() => setMoveWarning({ open: false, chatId: null, projectId: null })}
                                                    className="px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)] text-sm font-medium transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        addChatToProject(moveWarning.projectId, moveWarning.chatId);
                                                        setMoveWarning({ open: false, chatId: null, projectId: null });
                                                    }}
                                                    className="px-4 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-sm font-medium transition-colors"
                                                >
                                                    Confirm Move
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        <ShareChatModal
                            isOpen={showShareModal}
                            onClose={() => setShowShareModal(false)}
                            conversationId={activeConversationId}
                            activeModel={activeModel}
                        />

                        <SourcesSidebar
                            isOpen={isSourcesOpen}
                            onClose={() => setIsSourcesOpen(false)}
                            sources={currentSources}
                        />

                        {/* Scroll to Bottom Button */}
                    </>
                )}

                {/* Scroll to Bottom Button - Moved outside conditional rendering */}
                <AnimatePresence>
                    {showScrollButton && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bottom-32 right-8 z-50"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {/* Battery/Energy Pulse Aura */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.05, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 rounded-full bg-[var(--sidebar-foreground)] blur-md pointer-events-none"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToBottom(false)}
                                className="relative w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-xl flex items-center justify-center text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors group overflow-hidden"
                                title="Scroll to bottom"
                            >
                                {/* Inner Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sidebar-foreground)]/5 to-transparent pointer-events-none" />
                                <ArrowDown size={20} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
