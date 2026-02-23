'use client';

import React, { useState } from 'react';
import { X, Share2, ChevronRight, Link as LinkIcon, AlertTriangle, Upload, Copy, Check, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useChat } from '@/context/chat-context';
import { useAuth } from '@/context/auth-context';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ShareChatModal({ isOpen, onClose, conversationId, activeModel }) {
    const { activeConversation, activeAssistants } = useChat();
    const { token } = useAuth();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [isShared, setIsShared] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateError, setGenerateError] = useState('');
    const [seedLink, setSeedLink] = useState('');
    const [isSeedCopied, setIsSeedCopied] = useState(false);

    // ── Generate a DB-backed one-time share link ──────────────────────────────
    const generateShareLink = async () => {
        if (!activeConversation || !conversationId) return;
        setIsGenerating(true);
        setGenerateError('');

        try {
            const res = await fetch('/api/share/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ conversationId })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to generate share link');
            }

            const link = `${window.location.origin}/share/${data.data.shareToken}`;
            setShareLink(link);
            navigator.clipboard.writeText(link).catch(() => { });
            setIsShared(true);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to generate share link:', error);
            setGenerateError(error.message || 'Failed to generate share link. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // ── Generate a seed link (no DB, just encodes assistant/model config) ─────
    const generateSeedLink = () => {
        if (!activeConversation) return;

        const assistant = activeAssistants.find(a => a.id === activeConversation.assistantId);

        var apiActiveModel = activeModel;
        if (!apiActiveModel && activeConversation?.modelId) {
            const MODELS = [
                { name: 'Grok 4.1 Fast', model: 'x-ai/grok-4.1-fast' },
                { name: 'Grok 4.1 Code', model: 'x-ai/grok-code-fast-1' },
                { name: 'DeepSeek V3.2', model: 'deepseek/deepseek-v3.2' },
                { name: 'Solar Pro', model: 'upstage/solar-pro-3:free' },
                { name: 'GPT-5 Nano', model: 'gpt-5-nano' },
                { name: 'GPT-4o Mini', model: 'openai/gpt-4o-mini' },
                { name: 'GPT-4o', model: 'openai/gpt-4o' },
                { name: 'Trinity Large', model: 'arcee-ai/trinity-large-preview:free' },
                { name: 'DeepSeek Chimera', model: 'tngtech/deepseek-r1t-chimera:free' },
                { name: 'NVIDIA Nemotron', model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
                { name: 'Claude 3.5 Sonnet', model: 'anthropic/claude-3.5-sonnet' },
                { name: 'Llama 3.1 8B', model: 'meta-llama/llama-3.1-8b-instruct' },
            ];
            apiActiveModel = MODELS.find(m => m.model === activeConversation.modelId);
        }

        const seedData = {
            assistantId: activeConversation.assistantId,
            modelId: apiActiveModel?.model || 'gpt-4o',
            modelName: apiActiveModel?.name || 'GPT-4o',
            assistantName: assistant?.name,
            assistantIconId: assistant?.iconId
        };

        try {
            const jsonString = JSON.stringify(seedData);
            const encodedData = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            }));

            const link = `${window.location.origin}/share#seed=${encodedData}`;
            setSeedLink(link);
            navigator.clipboard.writeText(link).catch(() => { });
            setIsSeedCopied(true);
            setTimeout(() => setIsSeedCopied(false), 2000);
        } catch (error) {
            console.error('Failed to generate seed link:', error);
        }
    };

    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink).catch(() => { });
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-[480px] bg-[var(--card)] rounded-3xl shadow-2xl border border-[var(--border)] flex flex-col max-h-[85vh] overflow-hidden ring-1 ring-white/10"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border)]/50 bg-[var(--background)]/50 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)]">
                                <Share2 size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[var(--foreground)] leading-none mb-1">Share Chat</h2>
                                <p className="text-xs text-[var(--sidebar-foreground)] font-medium">One-time secure link</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full hover:bg-[var(--border)] flex items-center justify-center transition-colors text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-[var(--background)]/30">
                        {isShared ? (
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
                                >
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-green-600 mb-1">Link Generated & Saved!</h3>
                                            <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed">
                                                This is a <span className="font-bold text-[var(--foreground)]">one-time link</span> — it expires after the recipient views it once.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* One-time badge */}
                                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/5 border border-orange-500/15">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                    <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">Single-use · Expires after first view</span>
                                </div>

                                {/* Link Box */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider ml-1">Share Link</label>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] group hover:border-[var(--foreground)]/30 transition-colors shadow-sm">
                                        <div className="flex-1 min-w-0 font-mono text-[13px] text-[var(--foreground)] truncate px-2">
                                            {shareLink}
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className={cn(
                                                "p-2 rounded-lg transition-all font-medium text-xs flex items-center gap-2",
                                                isCopied
                                                    ? "bg-green-500 text-white shadow-sm"
                                                    : "hover:bg-[var(--border)] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                            )}
                                        >
                                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={() => { setIsShared(false); setShareLink(''); setGenerateError(''); }}
                                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-all flex items-center gap-1.5"
                                    >
                                        <Trash2 size={12} />
                                        Generate New Link
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Info Box */}
                                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex gap-4">
                                    <AlertTriangle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-[13px] font-bold text-orange-600/90 mb-1">One-Time Secure Link</h4>
                                        <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed">
                                            This chat is viewable only to logged-in users via the shared link. The link expires after the first view and the content is stored in the database, so avoid sharing sensitive information.
                                        </p>
                                    </div>
                                </div>

                                {/* Error */}
                                {generateError && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                                        {generateError}
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={generateShareLink}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-between p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/20 transition-all shadow-sm group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--border)] group-hover:scale-110 transition-transform duration-300">
                                            {isGenerating
                                                ? <Loader2 size={20} className="text-[var(--foreground)] animate-spin" />
                                                : <LinkIcon size={20} className="text-[var(--foreground)]" />
                                            }
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[15px] font-bold text-[var(--foreground)] mb-0.5">
                                                {isGenerating ? 'Generating...' : 'Create Share Link'}
                                            </p>
                                            <p className="text-xs text-[var(--sidebar-foreground)] font-medium">Saved to database · One-time use</p>
                                        </div>
                                    </div>
                                    {!isGenerating && (
                                        <div className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all">
                                            <ChevronRight size={16} />
                                        </div>
                                    )}
                                </motion.button>
                            </div>
                        )}

                        {/* Advanced Options — Seed Link */}
                        <div className="space-y-4 pt-2">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="w-full flex items-center gap-3 p-2 group"
                            >
                                <div className={cn(
                                    "p-1 rounded-md transition-colors bg-[var(--border)]/50 text-[var(--sidebar-foreground)]",
                                    showAdvanced && "bg-[var(--foreground)] text-[var(--background)]"
                                )}>
                                    <ChevronRight
                                        size={14}
                                        className={cn("transition-transform duration-300", showAdvanced && "rotate-90")}
                                    />
                                </div>
                                <div className="h-[1px] flex-1 bg-[var(--border)]" />
                                <span className="text-[11px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider group-hover:text-[var(--foreground)] transition-colors">Advanced Options</span>
                                <div className="h-[1px] flex-1 bg-[var(--border)]" />
                            </button>

                            <AnimatePresence>
                                {showAdvanced && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-2 pb-2">
                                            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-500/5 via-[var(--card)] to-[var(--card)] p-5 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                                            <Upload size={14} />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-[var(--foreground)]">Seed New Chat</h3>
                                                    </div>
                                                    <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed mb-5 pl-1">
                                                        Create a URL that starts a fresh conversation with the same AI Assistant and Model settings.
                                                    </p>
                                                    <button
                                                        onClick={generateSeedLink}
                                                        className={cn(
                                                            "w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border transition-all text-sm font-bold shadow-sm",
                                                            isSeedCopied
                                                                ? "bg-green-500 border-green-500 text-white"
                                                                : "bg-[var(--background)] border-[var(--border)] hover:border-blue-500/30 hover:bg-blue-500/5 text-[var(--foreground)]"
                                                        )}
                                                    >
                                                        {isSeedCopied ? <Check size={16} /> : <Copy size={16} className={isSeedCopied ? "text-white" : "text-[var(--sidebar-foreground)]"} />}
                                                        <span>{isSeedCopied ? 'Link Copied!' : 'Generate Seed Link'}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-8 py-5 bg-[var(--background)]/80 backdrop-blur-xl border-t border-[var(--border)]">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={isShared ? onClose : generateShareLink}
                            disabled={isGenerating}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                                "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                            )}
                        >
                            {isShared ? 'Done' : isGenerating ? 'Generating...' : 'Create Link'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
