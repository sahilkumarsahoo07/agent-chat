'use client';

import React, { useState } from 'react';
import { X, Share2, ChevronRight, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ShareChatModal({ isOpen, onClose, conversationId }) {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [seedLink, setSeedLink] = useState('');

    const generateShareLink = () => {
        // Mock implementation - generate actual share link
        const link = `${window.location.origin}/share/${conversationId}`;
        setShareLink(link);
        navigator.clipboard.writeText(link);
        // Show success toast or notification
    };

    const generateSeedLink = () => {
        // Mock implementation - generate actual seed link
        const link = `${window.location.origin}/seed/${conversationId}`;
        setSeedLink(link);
        navigator.clipboard.writeText(link);
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
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--background)] flex items-center justify-center border border-[var(--border)]">
                                <Share2 size={16} className="text-[var(--foreground)]" />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--foreground)]">Share Chat</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg hover:bg-[var(--border)] flex items-center justify-center transition-colors"
                        >
                            <X size={18} className="text-[var(--sidebar-foreground)]" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {/* Warning */}
                        <div className="border-2 border-orange-500/50 bg-orange-500/10 rounded-xl p-4">
                            <div className="flex gap-3">
                                <AlertTriangle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">Warning</h3>
                                    <p className="text-sm text-[var(--sidebar-foreground)] leading-relaxed">
                                        Please make sure that all content in this chat is safe to share with the whole team.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Generate Share Link */}
                        <button
                            onClick={generateShareLink}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors group text-left"
                        >
                            <LinkIcon size={16} className="text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)]" />
                            <span className="text-sm font-medium text-[var(--foreground)]">Generate and Copy Share Link</span>
                        </button>

                        {/* Divider */}
                        <div className="border-t border-[var(--border)]" />

                        {/* Advanced Options */}
                        <div>
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="w-full flex items-center justify-between p-2 hover:bg-[var(--border)] rounded-lg transition-colors"
                            >
                                <span className="text-sm font-medium text-[var(--sidebar-foreground)]">Advanced Options</span>
                                <ChevronRight
                                    size={16}
                                    className={cn(
                                        "text-[var(--sidebar-foreground)] transition-transform",
                                        showAdvanced && "rotate-90"
                                    )}
                                />
                            </button>

                            <AnimatePresence>
                                {showAdvanced && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 space-y-4">
                                            {/* Seed New Chat */}
                                            <div className="border-2 border-blue-500/50 bg-blue-500/10 rounded-xl p-4">
                                                <h3 className="font-bold text-sm text-[var(--foreground)] mb-2">Seed New Chat</h3>
                                                <p className="text-sm text-[var(--sidebar-foreground)] leading-relaxed mb-3">
                                                    Generate a link to a new chat session with the same settings as this chat (including the assistant and model).
                                                </p>
                                                <button
                                                    onClick={generateSeedLink}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors group text-left"
                                                >
                                                    <LinkIcon size={16} className="text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)]" />
                                                    <span className="text-sm font-medium text-[var(--foreground)]">Generate and Copy Seed Link</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-6 border-t border-[var(--border)]">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors font-medium text-sm text-[var(--foreground)]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                generateShareLink();
                                onClose();
                            }}
                            className="flex-1 py-3 px-4 rounded-xl bg-white text-black hover:opacity-90 transition-opacity font-medium text-sm"
                        >
                            Share
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
