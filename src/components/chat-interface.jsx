'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useChat } from '@/context/chat-context';
import { useParams, useRouter } from 'next/navigation';
import CodeBlock from './code-block';
import MarkdownContent from './markdown-content';
import SourceCard from './source-card';
import SourcesSidebar from './sources-sidebar';
import ShareChatModal from './share-chat-modal';
import AssistantIcon from './assistant-icon';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}


function CollapsibleReasoning({ content, isThinking }) {
    const [isOpen, setIsOpen] = useState(false);
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
                        <BrainCircuit size={15} className={cn("text-[#3b82f6] transition-all", isThinking && "animate-pulse scale-110")} />
                        {isThinking && <div className="absolute inset-0 bg-[#3b82f6]/40 rounded-full blur-sm animate-ping scale-150" />}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="tracking-[0.1em]">Reasoning</span>
                    {!isOpen && !isThinking && <span className="opacity-40 lowercase font-normal italic text-[10px] transform translate-y-[0.5px]">(click to expand)</span>}
                    {isThinking && (
                        <div className="flex items-center gap-1 ml-1">
                            <span className="w-1 h-1 bg-[#3b82f6] rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1 h-1 bg-[#3b82f6] rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1 h-1 bg-[#3b82f6] rounded-full animate-bounce" />
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
                            <MarkdownContent content={content || '_Thinking..._'} />
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
        projects
    } = useChat();

    const isGenerating = streamingIds.includes(activeConversationId);

    const activeAssistant = activeAssistants.find(a => a.id === activeConversation?.assistantId);

    const params = useParams();
    const router = useRouter();

    const [message, setMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [moveWarning, setMoveWarning] = useState({ open: false, chatId: null, projectId: null });
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('agent_selected_model');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.name) return parsed;
                } catch (e) {
                    console.error('Failed to parse saved model:', e);
                }
            }
        }
        return {
            name: 'Grok 4.1 Fast',
            icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128",
            model: 'x-ai/grok-4.1-fast'
        };
    });
    const [isMounted, setIsMounted] = useState(false);

    const models = [
        { name: 'Grok 4.1 Fast', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-4.1-fast' },
        { name: 'Grok 4.1 Code', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-code-fast-1' },
        { name: 'DeepSeek V3.2', icon: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", model: 'deepseek/deepseek-v3.2' },
        { name: 'Solar Pro', icon: "https://www.google.com/s2/favicons?domain=upstage.ai&sz=128", model: 'upstage/solar-pro-3:free' },
        { name: 'GPT-5 Nano', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'gpt-5-nano' },
        { name: 'GPT-4o Mini', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o-mini' },
        { name: 'GPT-4o', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o' },
        { name: 'Trinity Large', icon: "https://www.google.com/s2/favicons?domain=arcee.ai&sz=128", model: 'arcee-ai/trinity-large-preview:free' },
        { name: 'DeepSeek Chimera', icon: "https://www.google.com/s2/favicons?domain=tngtech.com&sz=128", model: 'tngtech/deepseek-r1t-chimera:free' },
        { name: 'NVIDIA Nemotron', icon: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
        { name: 'Claude 3.5 Sonnet', icon: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", model: 'anthropic/claude-3.5-sonnet' },
        { name: 'Llama 3.1 8B', icon: "https://www.google.com/s2/favicons?domain=meta.com&sz=128", model: 'meta-llama/llama-3.1-8b-instruct' },
    ];

    const activeModel = useMemo(() => {
        if (activeAssistant?.model && activeAssistant.model !== 'user_default') {
            return models.find(m => m.model === activeAssistant.model) || selectedModel;
        }
        return selectedModel;
    }, [activeAssistant, selectedModel]);

    const isModelLocked = activeAssistant?.model && activeAssistant.model !== 'user_default';

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isModelLocked) {
            localStorage.setItem('agent_selected_model', JSON.stringify(selectedModel));
        }
    }, [selectedModel, isMounted, isModelLocked]);
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

    const dropdownRef = useRef(null);
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
        }
    }, [params?.id, setActiveConversationId]);

    const scrollToBottom = (instant = true) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: instant ? "auto" : "smooth"
            });
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
        }
    };

    useEffect(() => {
        // Small timeout to ensure DOM is updated
        const timer = setTimeout(() => scrollToBottom(), 0);
        return () => clearTimeout(timer);
    }, [activeConversation?.messages?.length, activeConversationId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
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
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const { scrollTop, scrollHeight, clientHeight } = container;
                    const isAtBottom = scrollHeight - scrollTop - clientHeight < 300;
                    setShowScrollButton(!isAtBottom);
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

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
            const newId = createConversation(message, activeModel.model, activeModel.name, activeAssistant?.id, fileData);
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

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[var(--background)] overflow-hidden">
            {/* Header - only show when conversation exists */}
            {activeConversation && activeConversation.messages.length > 0 && (
                <div className="sticky top-0 z-10 bg-[var(--background)] px-4 md:px-6 py-3">
                    <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2">
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
                                                                router.push('/');
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
                className="flex-1 overflow-y-auto custom-scrollbar min-h-0"
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
                                className="flex flex-col items-center h-full"
                            >
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
                                                    onClick={() => {
                                                        const isVirtualId = activeConversationId === 'new-chat' || (activeAssistant && !activeConversation);
                                                        if (!activeConversationId || isVirtualId) {
                                                            const newId = createConversation(item.title, activeModel.model, activeModel.name, activeAssistant?.id);
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
                                className="flex flex-col gap-6 pt-4 max-w-3xl mx-auto w-full"
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
                                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 rounded-full border border-[var(--border)]">
                                                    <AssistantIcon iconId={activeAssistant?.iconId || 'general'} className="w-4 h-4 text-[var(--foreground)]" />
                                                </div>
                                            )}

                                            <div className="flex flex-col min-w-0">
                                                {(msg.reasoning || (msg.isThinking && activeAssistant?.actions?.includes('reasoning'))) && (
                                                    <CollapsibleReasoning
                                                        content={msg.reasoning}
                                                        isThinking={msg.isThinking || (isGenerating && msg.id === activeConversation?.messages[activeConversation?.messages.length - 1]?.id && activeAssistant?.actions?.includes('reasoning'))}
                                                    />
                                                )}
                                                {msg.isThinking && !msg.reasoning && !activeAssistant?.actions?.includes('reasoning') && (
                                                    <div className="flex items-center gap-2.5 text-[14px] text-[var(--sidebar-foreground)] animate-pulse py-2 px-1">
                                                        <span className="font-semibold tracking-tight">Thinking...</span>
                                                    </div>
                                                )}
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
                                                                ? "bg-[var(--border)]/30 px-4 py-2.5 text-[var(--foreground)] rounded-tr-none font-medium mb-8"
                                                                : msg.content.startsWith('**Error:**')
                                                                    ? "bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3"
                                                                    : "text-[var(--foreground)] py-1.5"
                                                        )}>
                                                            {msg.role === 'user' && !editingId && (
                                                                <div className="absolute top-full mt-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4 text-[var(--sidebar-foreground)]">
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

                                                                    {msg.siblingIds && msg.siblingIds.length > 0 && (
                                                                        <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg bg-[var(--border)]/20 text-[12px] font-bold">
                                                                            <button
                                                                                onClick={() => {
                                                                                    const siblings = [msg.id, ...msg.siblingIds].sort();
                                                                                    const currentIndex = siblings.indexOf(msg.id);
                                                                                    const targetId = siblings[(currentIndex - 1 + siblings.length) % siblings.length];
                                                                                    switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                }}
                                                                                className="hover:text-[var(--foreground)] transition-colors"
                                                                            >
                                                                                <ChevronLeft size={14} />
                                                                            </button>
                                                                            <span className="min-w-[20px] text-center">
                                                                                {[msg.id, ...msg.siblingIds].sort().indexOf(msg.id) + 1}/{msg.siblingIds.length + 1}
                                                                            </span>
                                                                            <button
                                                                                onClick={() => {
                                                                                    const siblings = [msg.id, ...msg.siblingIds].sort();
                                                                                    const currentIndex = siblings.indexOf(msg.id);
                                                                                    const targetId = siblings[(currentIndex + 1) % siblings.length];
                                                                                    switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                                }}
                                                                                className="hover:text-[var(--foreground)] transition-colors"
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
                                                                                            selectedModel.name
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
                                                                        <MarkdownContent content={msg.content.startsWith('**Error:**') ? msg.content.replace('**Error:**', '').trim() : msg.content} />
                                                                    </div>
                                                                )}
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
                                                            <button className="p-2 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors" title="Good response">
                                                                <ThumbsUp size={16} />
                                                            </button>
                                                            <button className="p-2 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors" title="Bad response">
                                                                <ThumbsDown size={16} />
                                                            </button>
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => setRegenerateId(regenerateId === msg.id ? null : msg.id)}
                                                                    className={cn(
                                                                        "p-1.5 pr-2.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors flex items-center gap-1.5",
                                                                        regenerateId === msg.id && "bg-[var(--border)] text-[var(--foreground)]"
                                                                    )}
                                                                    title="Regenerate"
                                                                >
                                                                    <RefreshCw size={15} />
                                                                    <span className="text-xs font-medium">{msg.modelName || 'o4-mini'}</span>
                                                                </button>

                                                                {/* Regenerate Dropdown */}
                                                                {regenerateId === msg.id && (
                                                                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl p-1.5 z-50 regenerate-menu">
                                                                        <div className="px-3 py-2 text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase opacity-50">Regenerate with</div>
                                                                        {models.map((model, mIdx) => (
                                                                            <button
                                                                                key={mIdx}
                                                                                onClick={() => {
                                                                                    setSelectedModel(model);
                                                                                    setRegenerateId(null);
                                                                                    regenerateResponse(activeConversationId, model.model, model.name);
                                                                                }}
                                                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--foreground)] transition-all text-left group/item"
                                                                            >
                                                                                <div className="w-5 h-5 flex items-center justify-center rounded-md bg-[var(--border)]/30 overflow-hidden">
                                                                                    <img src={model.icon} className="w-3.5 h-3.5 object-contain model-icon" />
                                                                                </div>
                                                                                <span className="text-[14px] font-medium">{model.name}</span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {msg.siblingIds && msg.siblingIds.length > 0 && (
                                                            <div className="flex items-center gap-2 px-2 py-0.5 mt-2 rounded-lg bg-[var(--border)]/20 text-[11px] font-bold text-[var(--sidebar-foreground)]">
                                                                <button
                                                                    onClick={() => {
                                                                        const siblings = [msg.id, ...msg.siblingIds].sort();
                                                                        const currentIndex = siblings.indexOf(msg.id);
                                                                        const targetId = siblings[(currentIndex - 1 + siblings.length) % siblings.length];
                                                                        switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                    }}
                                                                    className="hover:text-[var(--foreground)] transition-colors"
                                                                >
                                                                    <ChevronLeft size={13} />
                                                                </button>
                                                                <span className="min-w-[18px] text-center">
                                                                    {[msg.id, ...msg.siblingIds].sort().indexOf(msg.id) + 1}/{msg.siblingIds.length + 1}
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        const siblings = [msg.id, ...msg.siblingIds].sort();
                                                                        const currentIndex = siblings.indexOf(msg.id);
                                                                        const targetId = siblings[(currentIndex + 1) % siblings.length];
                                                                        switchMessageVersion(activeConversationId, msg.id, targetId);
                                                                    }}
                                                                    className="hover:text-[var(--foreground)] transition-colors"
                                                                >
                                                                    <ChevronRight size={13} />
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

            <SourcesSidebar
                isOpen={isSourcesOpen}
                onClose={() => setIsSourcesOpen(false)}
                sources={currentSources}
            />

            {/* Input Area */}
            <div className="shrink-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent pt-4 pb-8 px-4 flex justify-center">
                <div className="w-full max-w-3xl">
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
                            placeholder={`Message ${activeAssistant?.name || 'General'} assistant...`}
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
                                                className="absolute bottom-full left-0 mb-2 w-56 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-1.5 z-50"
                                            >
                                                {models.map((model, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setSelectedModel(model); setIsDropdownOpen(false); }}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[var(--sidebar-foreground)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)] transition-all text-left"
                                                    >
                                                        <img src={model.icon} className="w-3.5 h-3.5 model-icon" />
                                                        <span className="font-medium">{model.name}</span>
                                                    </button>
                                                ))}
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
            />

            <SourcesSidebar
                isOpen={isSourcesOpen}
                onClose={() => setIsSourcesOpen(false)}
                sources={currentSources}
            />

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
                {showScrollButton && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-32 right-8 z-30"
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
        </div >
    );
}
