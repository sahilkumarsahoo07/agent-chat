import React from 'react';
import { X, Globe, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file, or inline cn function if needed. We'll use local cn for safety if unsure.



export default function SourcesSidebar({ isOpen, onClose, sources }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-y-0 right-0 w-80 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col"
                >
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">Sources</h2>
                            <span className="px-2 py-0.5 rounded-full bg-[var(--border)] text-xs font-medium text-[var(--sidebar-foreground)]">
                                {sources.length}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {sources.map((source, idx) => (
                            <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] hover:border-[var(--sidebar-foreground)]/30 transition-all group"
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2 text-xs text-[var(--sidebar-foreground)] font-medium">
                                        <div className="w-5 h-5 rounded-full bg-[var(--border)]/50 flex items-center justify-center text-[10px]">
                                            {idx + 1}
                                        </div>
                                        <span className="truncate max-w-[150px]">{new URL(source.url).hostname.replace('www.', '')}</span>
                                    </div>
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--sidebar-foreground)]" />
                                </div>
                                <h3 className="text-sm font-semibold mb-2 leading-snug group-hover:text-blue-500 transition-colors">
                                    {source.title}
                                </h3>
                                <p className="text-xs text-[var(--sidebar-foreground)] line-clamp-3 leading-relaxed opacity-80">
                                    {source.content}
                                </p>
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
