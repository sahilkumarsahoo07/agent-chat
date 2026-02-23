'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
    MessageSquare,
    Sparkles,
    Globe,
    Command,
    Clock,
    User as UserIcon,
    ArrowDown,
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

function SharedChatContent() {
    const { continueChat, createConversation } = useChat();
    const { token } = useAuth();
    const router = useRouter();
    const [chatData, setChatData] = useState(null);
    const [seedData, setSeedData] = useState(null);
    const [error, setError] = useState(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollContainerRef = React.useRef(null);
    const messagesEndRef = React.useRef(null);

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
        const handleDecode = () => {
            const hash = window.location.hash;
            if (hash && hash.startsWith('#data=')) {
                const data = hash.substring(6); // Remove '#data='
                try {
                    // Decode from Base64 (UTF-8 safe)
                    const decodedJson = decodeURIComponent(atob(data).split('').map((c) => {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const parsed = JSON.parse(decodedJson);
                    setChatData(parsed);
                    setSeedData(null);

                    // Set page title
                    if (parsed.title) {
                        document.title = `${parsed.title} | Shared Chat`;
                    }
                } catch (err) {
                    console.error('Failed to decode chat data:', err);
                    setError('Invalid or corrupted share link.');
                }
            } else if (hash && hash.startsWith('#seed=')) {
                const data = hash.substring(6); // Remove '#seed='
                try {
                    const decodedJson = decodeURIComponent(atob(data).split('').map((c) => {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const parsed = JSON.parse(decodedJson);
                    setSeedData(parsed);
                    setChatData(null);
                    document.title = 'Start New Chat';
                } catch (err) {
                    console.error('Failed to decode seed data:', err);
                    setError('Invalid or corrupted seed link.');
                }
            } else {
                setError('No chat data provided in the URL fragment.');
            }
        };

        handleDecode();

        // Also listen for hash changes if user pastes a new one while on the same page
        window.addEventListener('hashchange', handleDecode);
        return () => window.removeEventListener('hashchange', handleDecode);
    }, []);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                    <Command size={32} className="text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Oops!</h1>
                <p className="text-[var(--sidebar-foreground)]">{error}</p>
                <a href="/" className="mt-8 px-6 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm">
                    Back to Home
                </a>
            </div>
        );
    }

    if (seedData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[var(--background)] relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-lg"
                >
                    <div className="w-24 h-24 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mx-auto mb-10 shadow-2xl ring-1 ring-white/10 group hover:scale-105 transition-transform duration-500">
                        <AssistantIcon iconId={seedData.assistantIconId || 'general'} className="w-12 h-12 text-[var(--foreground)]" />
                    </div>

                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <Sparkles size={12} className="text-blue-500" />
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.15em]">Seed Link • Fresh Session</span>
                    </div>

                    <h1 className="text-4xl font-black text-[var(--foreground)] mb-4 tracking-tight">Start a New Chat</h1>
                    <p className="text-base text-[var(--sidebar-foreground)] max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                        Initiate a fresh conversation with <span className="text-[var(--foreground)] font-bold">{seedData.assistantName || 'AI Assistant'}</span> powered by <span className="text-[var(--foreground)] font-bold">{seedData.modelName}</span>.
                    </p>

                    <div className="grid gap-4 w-full max-w-[340px] mx-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={async () => {
                                if (!token) {
                                    const callbackUrl = encodeURIComponent(window.location.hash);
                                    router.push(`/login?callbackUrl=/share${callbackUrl}`);
                                    return;
                                }
                                const newId = await createConversation('', seedData.modelId, seedData.modelName, seedData.assistantId);
                                if (newId) router.push(`/chat/${newId}`);
                            }}
                            className="w-full py-4.5 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:opacity-95 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                        >
                            <MessageSquare size={18} strokeWidth={2.5} />
                            <span>Start Conversation</span>
                        </motion.button>
                        <a
                            href="/"
                            className="w-full py-4 rounded-2xl border border-[var(--border)] font-bold text-sm hover:bg-[var(--border)]/50 transition-all text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                        >
                            Cancel
                        </a>
                    </div>

                    <p className="mt-12 text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-40">
                        Settings are pre-configured for this invitation
                    </p>
                </motion.div>
            </div>
        );
    }

    if (!chatData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin opacity-50" />
            </div>
        );
    }

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 flex flex-col min-h-0 bg-[var(--background)] overflow-y-auto custom-scrollbar"
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
                            <p className="text-xs text-[var(--sidebar-foreground)] font-medium">Shared archive • View only</p>
                        </div>
                    </div>
                    <a href="/" className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--border)] transition-colors text-xs font-bold text-[var(--foreground)]">
                        New Chat
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
                <div className="flex flex-col gap-8">
                    {chatData.messages.map((msg, idx) => (
                        <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn("max-w-[90%] flex gap-4", msg.role === 'user' && "flex-row-reverse")}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 rounded-full border border-[var(--border)] bg-[var(--card)]">
                                        <AssistantIcon iconId={chatData.assistant?.iconId || 'general'} className="w-4 h-4 text-[var(--foreground)]" />
                                    </div>
                                )}

                                <div className="flex flex-col min-w-0">
                                    <div className={cn("flex items-center gap-2 mb-1", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        <span className="text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider opacity-60">
                                            {msg.role === 'user' ? 'You' : (chatData.assistant?.name || 'AI Assistant')}
                                        </span>
                                        {msg.modelName && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--border)]/30 text-[var(--sidebar-foreground)] font-medium">
                                                {msg.modelName}
                                            </span>
                                        )}
                                    </div>

                                    {msg.reasoning && <CollapsibleReasoning content={msg.reasoning} />}

                                    <div className={cn(
                                        "rounded-2xl text-[14px] md:text-[15px] leading-relaxed break-words relative",
                                        msg.role === 'user'
                                            ? "bg-[var(--border)]/40 text-[var(--foreground)] px-4 py-2.5 rounded-tr-none font-medium mb-4"
                                            : "text-[var(--foreground)] py-1 mb-4"
                                    )}>
                                        {/* Sources Display */}
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

                                        {msg.attachment && (
                                            <div className="mt-4">
                                                {msg.attachment.type.startsWith('image/') ? (
                                                    <div className="max-w-[300px] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)]/50">
                                                        <img src={msg.attachment.content} alt="Attachment" className="w-full h-auto" />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]/50">
                                                        <Globe size={18} className="text-[var(--sidebar-foreground)]" />
                                                        <span className="text-xs font-bold truncate">{msg.attachment.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col items-center text-center pb-20">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-4 shadow-sm">
                        <MessageSquare size={24} className="text-[var(--foreground)]" />
                    </div>
                    <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Want to continue this conversation?</h2>
                    <p className="text-sm text-[var(--sidebar-foreground)] max-w-sm mb-6">
                        Import this chat into your workspace and continue where it left off with our powerful AI assistants.
                    </p>
                    <button
                        onClick={async () => {
                            if (chatData) {
                                const newId = await continueChat(
                                    chatData.title,
                                    chatData.messages,
                                    chatData.assistant?.id,
                                    chatData.allMessages,
                                    chatData.activePath
                                );
                                if (newId) router.push(`/chat/${newId}`);
                            }
                        }}
                        className="px-8 py-3 rounded-2xl bg-black text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Continue this Chat
                    </button>
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
        </div>
    );
}

export default function SharePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[var(--background)]">Loading...</div>}>
            <SharedChatContent />
        </Suspense>
    );
}
