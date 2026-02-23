'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PanelRight,
    Mic2,
    Video,
    Network,
    FileText,
    BookOpen,
    HelpCircle,
    BarChart2,
    Monitor,
    Table2,
    X,
    Wand2,
    Plus,
} from 'lucide-react';

const STUDIO_ITEMS = [
    { icon: Mic2, label: 'Audio Overview' },
    { icon: Video, label: 'Video Overview' },
    { icon: Network, label: 'Mind Map' },
    { icon: FileText, label: 'Reports' },
    { icon: BookOpen, label: 'Flashcards' },
    { icon: HelpCircle, label: 'Quiz' },
    { icon: BarChart2, label: 'Infographic' },
    { icon: Monitor, label: 'Slide Deck' },
    { icon: Table2, label: 'Data Table' },
];

export default function StudioPanel() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={false}
            animate={{ width: isOpen ? 340 : 52 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-screen sticky top-0 right-0 flex-shrink-0 z-20 border-l overflow-hidden"
            style={{
                background: isOpen ? 'var(--background)' : 'var(--sidebar-bg)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="relative h-full w-full">
                <AnimatePresence initial={false}>
                    {!isOpen ? (
                        /* Collapsed icon strip */
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center py-3 gap-1.5 w-[52px]"
                        >
                            {/* Toggle button */}
                            <button
                                onClick={() => setIsOpen(true)}
                                title="Open Studio"
                                className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors mb-1 hover:bg-[var(--border)]"
                                style={{ color: 'var(--sidebar-foreground)' }}
                            >
                                <PanelRight size={18} />
                            </button>

                            <div className="w-6 h-px mb-1" style={{ background: 'var(--border)' }} />

                            {STUDIO_ITEMS.map(({ icon: Icon, label }) => (
                                <button
                                    key={label}
                                    title={label}
                                    className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors group hover:bg-[var(--border)]"
                                    style={{ color: 'var(--sidebar-foreground)' }}
                                    onClick={() => setIsOpen(true)}
                                >
                                    <Icon size={16} />
                                    <span
                                        className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full flex items-center justify-center text-[7px] font-bold leading-none"
                                        style={{ background: 'var(--border)', color: 'var(--sidebar-foreground)' }}
                                    >
                                        <Plus size={7} strokeWidth={3} />
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        /* Expanded panel */
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 h-full flex flex-col w-[340px]"
                        >
                            <div
                                className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <span className="text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
                                    Studio
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--border)] hover:text-[var(--foreground)]"
                                    style={{ color: 'var(--sidebar-foreground)' }}
                                    title="Collapse Studio"
                                >
                                    <PanelRight size={16} />
                                </button>
                            </div>

                            <div className="p-3 grid grid-cols-3 gap-2 flex-shrink-0">
                                {STUDIO_ITEMS.map(({ icon: Icon, label }) => (
                                    <button
                                        key={label}
                                        className="flex flex-col items-start gap-2 p-3 rounded-xl border transition-all text-left bg-[var(--card)] hover:border-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                        style={{
                                            borderColor: 'var(--border)',
                                            color: 'var(--sidebar-foreground)',
                                        }}
                                    >
                                        <Icon size={16} />
                                        <span className="text-[10.5px] font-medium leading-tight text-[var(--foreground)]">
                                            {label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center text-[var(--sidebar-foreground)]">
                                <Wand2 size={28} className="mb-3 opacity-30" />
                                <p className="text-[12px] font-medium opacity-60 leading-relaxed">
                                    Studio output will be saved here.
                                </p>
                                <p className="text-[11px] opacity-40 mt-1 leading-relaxed">
                                    After adding sources, click to add Audio Overview, Study Guide, Mind Map, and more!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
