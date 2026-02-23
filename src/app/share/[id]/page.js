'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
    MessageSquare,
    Sparkles,
    Globe,
    Command,
    ArrowDown,
    AlertTriangle,
    Lock,
    ChevronLeft,
    ChevronRight,
    Copy,
    Check,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MarkdownContent from '@/components/markdown-content';
import AssistantIcon from '@/components/assistant-icon';
import SourceCard from '@/components/source-card';
import { useChat } from '@/context/chat-context';
import { useAuth } from '@/context/auth-context';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

function CollapsibleReasoning({ content }) {
    const [isOpen, setIsOpen] = useState(false);
    if (!content) return null;

    return (
        <div className="mb-4 border-l-2 border-[var(--border)] ml-1 pl-4 space-y-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider hover:text-[var(--foreground)] transition-colors py-1.5 group"
            >
                <div className="flex items-center gap-2">
                    <span className="tracking-[0.1em] text-[#3b82f6]">REASONING</span>
                    {!isOpen && <span className="opacity-40 lowercase font-normal italic text-[10px] transform translate-y-[0.5px]">(click to expand)</span>}
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
                            <MarkdownContent content={content} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SharedChatPage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const { continueChat } = useChat();
    const { token, loading: authLoading } = useAuth();
    const router = useRouter();
    const [chatData, setChatData] = useState(null);
    const [error, setError] = useState(null);
    const [errorCode, setErrorCode] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollContainerRef = React.useRef(null);
    const messagesEndRef = React.useRef(null);
    const hasFetchedRef = React.useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
    };

    useEffect(() => {
        if (authLoading) return;

        // If not logged in, redirect to login with callbackUrl
        if (!token) {
            const callbackUrl = encodeURIComponent(window.location.pathname);
            router.replace(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        hasFetchedRef.current = true;

        const fetchChat = async () => {
            setIsFetching(true);
            try {
                const res = await fetch(`/api/share/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();

                if (!res.ok) {
                    setErrorCode(res.status);
                    throw new Error(data.error || 'Failed to load chat');
                }

                if (data.success) {
                    setChatData(data.data);
                    if (data.data.title) {
                        document.title = `${data.data.title} | Shared Chat`;
                    }
                }
            } catch (err) {
                console.error('[SharedPage] Fetch Error:', err);
                hasFetchedRef.current = false;
                setError(err.message);
            } finally {
                setIsFetching(false);
            }
        };

        if (id) fetchChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, authLoading, token]);

    const handleContinue = async () => {
        if (chatData) {
            try {
                const newId = await continueChat(
                    chatData.title,
                    chatData.messages,
                    chatData.assistantId,
                    chatData.allMessages,
                    chatData.activePath
                );
                if (newId) router.push(`/chat/${newId}`);
            } catch {
                alert('Failed to import chat. Please try again.');
            }
        }
    };

    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (content, id) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const switchVersion = (messageId, targetVersionId) => {
        if (!chatData || !chatData.allMessages) return;

        const { allMessages } = chatData;
        const targetMsg = allMessages.find(m => m.id === targetVersionId);
        if (!targetMsg) return;

        // Build the complete path from root to target
        let newPath = [];
        let currentMsg = targetMsg;
        let loopGuard = 0;

        // Backwards to root
        const reversePath = [];
        while (currentMsg && loopGuard < 100) {
            loopGuard++;
            reversePath.unshift(currentMsg.id);
            if (currentMsg.parentId) {
                currentMsg = allMessages.find(m => m.id === currentMsg.parentId);
            } else {
                break;
            }
        }
        newPath = reversePath;

        // Forwards to latest leaf
        let lastMsg = targetMsg;
        loopGuard = 0;
        while (loopGuard < 100) {
            loopGuard++;
            const children = allMessages.filter(m => m.parentId === lastMsg.id);
            if (children.length > 0) {
                children.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                const latestChild = children[0];
                newPath.push(latestChild.id);
                lastMsg = latestChild;
            } else {
                break;
            }
        }

        const activeMessages = newPath.map(id => allMessages.find(m => m.id === id)).filter(Boolean);
        setChatData({
            ...chatData,
            activePath: newPath,
            messages: activeMessages
        });
    };

    // ── Loading: auth resolving ───────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin opacity-50" />
                    <p className="text-xs font-medium text-[var(--sidebar-foreground)] animate-pulse">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    // ── Loading: fetching chat data ───────────────────────────────────────────
    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin opacity-50" />
                    <p className="text-xs font-medium text-[var(--sidebar-foreground)] animate-pulse">
                        Verifying secure link...
                    </p>
                </div>
            </div>
        );
    }

    // ── Error states ──────────────────────────────────────────────────────────
    if (error) {
        const isExpired = errorCode === 410;
        const isNotFound = errorCode === 404;

        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[var(--background)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border",
                        isExpired
                            ? "bg-orange-500/10 border-orange-500/20"
                            : "bg-red-500/10 border-red-500/20"
                    )}>
                        {isExpired ? (
                            <AlertTriangle size={36} className="text-orange-500" />
                        ) : isNotFound ? (
                            <Command size={36} className="text-red-500" />
                        ) : (
                            <Lock size={36} className="text-red-500" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
                        {isExpired ? 'Link Expired' : isNotFound ? 'Not Found' : 'Access Denied'}
                    </h1>

                    {isExpired && (
                        <div className="mb-4 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 inline-flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">One-time link · Already used</span>
                        </div>
                    )}

                    <p className="text-[var(--sidebar-foreground)] max-w-sm leading-relaxed mb-8">
                        {isExpired
                            ? "This share link is single-use only. It was already opened by someone and has now expired. Ask the sender to generate a new link."
                            : isNotFound
                                ? "This share link doesn't exist or may have been deleted."
                                : error
                        }
                    </p>

                    <a
                        href="/"
                        className="px-8 py-3 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Back to Home
                    </a>
                </motion.div>
            </div>
        );
    }

    // ── Loading: fetching chat data ───────────────────────────────────────────
    if (!chatData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin opacity-50" />
                    <p className="text-xs font-medium text-[var(--sidebar-foreground)] animate-pulse">Verifying secure link...</p>
                </div>
            </div>
        );
    }

    // ── Chat view ─────────────────────────────────────────────────────────────
    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 flex flex-col min-h-screen bg-[var(--background)] overflow-y-auto custom-scrollbar"
        >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] px-4 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center bg-[var(--card)] shadow-sm">
                            <Sparkles size={20} className="text-[var(--foreground)]" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-[var(--foreground)] line-clamp-1">{chatData.title || 'Shared Chat'}</h1>
                            <p className="text-xs text-[var(--sidebar-foreground)] font-medium">
                                {chatData.isCreator ? 'Your shared chat · Shared by you' : 'One-time Secure View'}
                            </p>
                        </div>
                    </div>
                    <a href="/" className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--border)] transition-colors text-xs font-bold text-[var(--foreground)]">
                        New Chat
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
                {/* Banner */}
                {!chatData.isCreator && (
                    <div className="mb-10 pb-10 border-b border-[var(--border)] flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-4 shadow-sm">
                            <MessageSquare size={24} className="text-[var(--foreground)]" />
                        </div>
                        <div className="mb-3 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 inline-flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Single-use link · Expires after this view</span>
                        </div>
                        <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Secure One-Time Shared Chat</h2>
                        <p className="text-sm text-[var(--sidebar-foreground)] max-w-sm mb-6">
                            Shared by <span className="font-bold text-[var(--foreground)]">{chatData.creatorName}</span>.
                            This link will expire after you leave this page. Import to your workspace to save it.                       </p>
                        <button
                            onClick={handleContinue}
                            className="px-8 py-3 rounded-2xl bg-black text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Import to Workspace
                        </button>
                    </div>
                )}

                <div className="flex flex-col gap-8 pb-20">
                    {chatData.messages.map((msg, idx) => (
                        <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn("max-w-[90%] flex gap-4", msg.role === 'user' && "flex-row-reverse")}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 rounded-full border border-[var(--border)] bg-[var(--card)]">
                                        <AssistantIcon iconId={chatData.assistantId || 'general'} className="w-4 h-4 text-[var(--foreground)]" />
                                    </div>
                                )}

                                <div className="flex flex-col min-w-0">
                                    <div className={cn("flex items-center gap-2 mb-1", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        <span className="text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider opacity-60">
                                            {msg.role === 'user' ? (chatData.creatorName || 'User') : 'AI Assistant'}
                                        </span>
                                    </div>

                                    {msg.reasoning && <CollapsibleReasoning content={msg.reasoning} />}

                                    <div className={cn(
                                        "rounded-2xl text-[14px] md:text-[15px] leading-relaxed break-words relative",
                                        msg.role === 'user'
                                            ? "bg-[var(--border)]/40 text-[var(--foreground)] px-4 py-2.5 rounded-tr-none font-medium mb-4"
                                            : "text-[var(--foreground)] py-1 mb-4"
                                    )}>
                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="flex flex-col gap-2 mb-4">
                                                <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--sidebar-foreground)] uppercase tracking-wider opacity-70">
                                                    <Globe size={10} />
                                                    <span>Searched the internet</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {msg.sources.slice(0, 3).map((source, idx) => (
                                                        <SourceCard key={idx} source={source} index={idx} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {msg.role === 'user' ? (
                                            <div className="whitespace-pre-wrap">{msg.content}</div>
                                        ) : (
                                            <MarkdownContent content={msg.content} />
                                        )}

                                        {msg.attachmentName && (
                                            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]/50">
                                                <Globe size={18} className="text-[var(--sidebar-foreground)]" />
                                                <span className="text-xs font-bold truncate">{msg.attachmentName}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination & Actions */}
                                    <div className={cn(
                                        "flex items-center gap-3 mt-2",
                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                    )}>
                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleCopy(msg.content, msg.id)}
                                                className="p-1.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors"
                                                title="Copy message"
                                            >
                                                {copiedId === msg.id ? (
                                                    <Check size={14} className="text-green-500" />
                                                ) : (
                                                    <Copy size={14} />
                                                )}
                                            </button>
                                            {msg.role === 'assistant' && (
                                                <>
                                                    <button className="p-1.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors" title="Good response">
                                                        <ThumbsUp size={14} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] transition-colors" title="Bad response">
                                                        <ThumbsDown size={14} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {msg.siblingIds && msg.siblingIds.length > 0 && (
                                            <div className="flex items-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-lg px-1 py-0.5 shadow-sm">
                                                <button
                                                    onClick={() => {
                                                        const siblings = [msg.id, ...msg.siblingIds].sort((a, b) => {
                                                            const ma = chatData.allMessages.find(m => m.id === a);
                                                            const mb = chatData.allMessages.find(m => m.id === b);
                                                            return new Date(ma.createdAt) - new Date(mb.createdAt);
                                                        });
                                                        const currentIndex = siblings.indexOf(msg.id);
                                                        if (currentIndex > 0) switchVersion(msg.id, siblings[currentIndex - 1]);
                                                    }}
                                                    className="p-1 hover:bg-[var(--border)] rounded-md transition-colors disabled:opacity-30"
                                                    disabled={[msg.id, ...msg.siblingIds].sort((a, b) => {
                                                        const ma = chatData.allMessages.find(m => m.id === a);
                                                        const mb = chatData.allMessages.find(m => m.id === b);
                                                        return new Date(ma.createdAt) - new Date(mb.createdAt);
                                                    }).indexOf(msg.id) === 0}
                                                >
                                                    <ChevronLeft size={12} className="text-[var(--foreground)]" />
                                                </button>
                                                <span className="text-[10px] font-bold min-w-[32px] text-center text-[var(--sidebar-foreground)]">
                                                    {(() => {
                                                        const siblings = [msg.id, ...msg.siblingIds].sort((a, b) => {
                                                            const ma = chatData.allMessages.find(m => m.id === a);
                                                            const mb = chatData.allMessages.find(m => m.id === b);
                                                            return new Date(ma.createdAt) - new Date(mb.createdAt);
                                                        });
                                                        return siblings.indexOf(msg.id) + 1;
                                                    })()} / {msg.siblingIds.length + 1}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        const siblings = [msg.id, ...msg.siblingIds].sort((a, b) => {
                                                            const ma = chatData.allMessages.find(m => m.id === a);
                                                            const mb = chatData.allMessages.find(m => m.id === b);
                                                            return new Date(ma.createdAt) - new Date(mb.createdAt);
                                                        });
                                                        const currentIndex = siblings.indexOf(msg.id);
                                                        if (currentIndex < siblings.length - 1) switchVersion(msg.id, siblings[currentIndex + 1]);
                                                    }}
                                                    className="p-1 hover:bg-[var(--border)] rounded-md transition-colors disabled:opacity-30"
                                                    disabled={[msg.id, ...msg.siblingIds].sort((a, b) => {
                                                        const ma = chatData.allMessages.find(m => m.id === a);
                                                        const mb = chatData.allMessages.find(m => m.id === b);
                                                        return new Date(ma.createdAt) - new Date(mb.createdAt);
                                                    }).indexOf(msg.id) === msg.siblingIds.length}
                                                >
                                                    <ChevronRight size={12} className="text-[var(--foreground)]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <AnimatePresence>
                {showScrollButton && (
                    <motion.button
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        onClick={scrollToBottom}
                        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-[var(--border)]/10"
                    >
                        <ArrowDown size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div >
    );
}
