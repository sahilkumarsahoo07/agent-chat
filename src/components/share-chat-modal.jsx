'use client';

import React, { useState } from 'react';
import { X, Share2, ChevronRight, Link as LinkIcon, AlertTriangle, Upload, Copy, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useChat } from '@/context/chat-context';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ShareChatModal({ isOpen, onClose, conversationId, activeModel }) {
    const { activeConversation, activeAssistants } = useChat();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [isShared, setIsShared] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [seedLink, setSeedLink] = useState('');
    const [isSeedCopied, setIsSeedCopied] = useState(false);

    const generateShareLink = () => {
        if (!activeConversation) return;

        // Find the active assistant for this conversation
        const assistant = activeAssistants.find(a => a.id === activeConversation.assistantId);

        // Prepare data to share
        const shareData = {
            title: activeConversation.title,
            messages: activeConversation.messages.map(m => ({
                role: m.role,
                content: m.content,
                reasoning: m.reasoning,
                attachment: m.attachment,
                modelName: m.modelName,
                timestamp: m.timestamp
            })),
            assistant: assistant ? {
                name: assistant.name,
                iconId: assistant.iconId,
                description: assistant.description,
                id: assistant.id
            } : null
        };

        try {
            // Encode data to Base64 (using UTF-8 safe method)
            const jsonString = JSON.stringify(shareData);
            const encodedData = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            }));

            const link = `${window.location.origin}/share#data=${encodedData}`;
            setShareLink(link);
            navigator.clipboard.writeText(link);
            setIsShared(true);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to generate share link:', error);
            alert('Failed to generate share link. The chat may be too large.');
        }
    };

    const generateSeedLink = () => {
        if (!activeConversation) return;

        const assistant = activeAssistants.find(a => a.id === activeConversation.assistantId);

        const seedData = {
            assistantId: activeConversation.assistantId,
            modelId: apiActiveModel?.model || 'gpt-4o', // Use the resolved active model
            modelName: apiActiveModel?.name || 'GPT-4o',
            assistantName: assistant?.name,
            assistantIconId: assistant?.iconId
        };

        // Helper to resolve active model - duplicated logic for now to ensure consistency inside modal
        var apiActiveModel = activeModel;
        if (!apiActiveModel && activeConversation?.modelId) {
            const MODELS = [
                { name: 'Grok 4.1 Fast', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-4.1-fast' },
                { name: 'Grok 4.1 Code', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-code-fast-1' },
                { name: 'DeepSeek V3.2', icon: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", model: 'deepseek/deepseek-v3.2' },
                { name: 'Solar Pro', icon: "https://www.google.com/s2/favicons?domain=upstage.ai&sz=128", model: 'upstage/solar-pro-3:free' },
                { name: 'GPT-5 Nano', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'gpt-5-nano', hasReasoning: true },
                { name: 'GPT-4o Mini', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o-mini' },
                { name: 'GPT-4o', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o' },
                { name: 'Trinity Large', icon: "https://www.google.com/s2/favicons?domain=arcee.ai&sz=128", model: 'arcee-ai/trinity-large-preview:free' },
                { name: 'DeepSeek Chimera', icon: "https://www.google.com/s2/favicons?domain=tngtech.com&sz=128", model: 'tngtech/deepseek-r1t-chimera:free', hasReasoning: true },
                { name: 'NVIDIA Nemotron', icon: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
                { name: 'Claude 3.5 Sonnet', icon: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", model: 'anthropic/claude-3.5-sonnet' },
                { name: 'Llama 3.1 8B', icon: "https://www.google.com/s2/favicons?domain=meta.com&sz=128", model: 'meta-llama/llama-3.1-8b-instruct' },
            ];
            apiActiveModel = MODELS.find(m => m.model === activeConversation.modelId);
        }

        if (apiActiveModel) {
            seedData.modelId = apiActiveModel.model;
            seedData.modelName = apiActiveModel.name;
        }


        try {
            const jsonString = JSON.stringify(seedData);
            const encodedData = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            }));

            const link = `${window.location.origin}/share#seed=${encodedData}`;
            setSeedLink(link);
            navigator.clipboard.writeText(link);
            setIsSeedCopied(true);
            setTimeout(() => setIsSeedCopied(false), 2000);
        } catch (error) {
            console.error('Failed to generate seed link:', error);
        }
    };

    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Overlay with glassmorphism */}
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
                                <p className="text-xs text-[var(--sidebar-foreground)] font-medium">Collaborate with your team</p>
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
                                            <h3 className="text-sm font-bold text-green-600 mb-1">Link Generated!</h3>
                                            <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed">
                                                Anyone with this link can view this chat session.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

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
                                        onClick={() => setIsShared(false)}
                                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-all flex items-center gap-1.5"
                                    >
                                        <Trash2 size={12} />
                                        Delete Share Link
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Info Box */}
                                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex gap-4">
                                    <AlertTriangle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-[13px] font-bold text-orange-600/90 mb-1">Privacy Notice</h4>
                                        <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed">
                                            Everything in this chat will be visible to whoever has the link. Please ensure no sensitive data is included.
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={generateShareLink}
                                    className="w-full flex items-center justify-between p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/20 transition-all shadow-sm group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--border)] group-hover:scale-110 transition-transform duration-300">
                                            <LinkIcon size={20} className="text-[var(--foreground)]" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[15px] font-bold text-[var(--foreground)] mb-0.5">Create Share Link</p>
                                            <p className="text-xs text-[var(--sidebar-foreground)] font-medium">Generate a public view-only link</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </motion.button>
                            </div>
                        )}

                        {/* Advanced Options */}
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
                                        className={cn(
                                            "transition-transform duration-300",
                                            showAdvanced && "rotate-90"
                                        )}
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
                                                {/* Decorative background element */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                                            <Upload size={14} />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-[var(--foreground)]">Seed New Chat</h3>
                                                    </div>

                                                    <p className="text-[13px] text-[var(--sidebar-foreground)] leading-relaxed mb-5 pl-1">
                                                        Create a URL that, when clicked, instantly starts a fresh, empty conversation but with the exact same AI Assistant and Model settings you were using.
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
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all",
                                isShared
                                    ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                                    : "bg-[var(--foreground)] text-[var(--background)]"
                            )}
                        >
                            {isShared ? 'Done' : 'Create Link'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
