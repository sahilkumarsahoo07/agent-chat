'use client';

import React from 'react';
import {
    X,
    Search,
    Plus,
    Search as SearchIcon,
    MessageSquare,
    Compass,
    Lightbulb,
    PenLine,
    Pin,
    MoreHorizontal,
    ArrowLeft,
    Trash2,
    BarChart2,
    Settings,
    History,
    Sparkles,
    Upload,
    Check,
    Globe,
    Lock,
    LayoutGrid,
    Sliders,
    Monitor,
    User
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/chat-context';
import AssistantIcon from './assistant-icon';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ExploreModal({ isOpen, onClose }) {
    const router = useRouter();
    const { startAssistantChat, customAssistants, removeProjectAssistant, activeAssistants, setActiveAssistants } = useChat();
    const [showMenuId, setShowMenuId] = useState(null);
    const [activeTab, setActiveTab] = useState('Public');
    const menuRef = useRef(null);

    const toggleAssistantPin = (assistant) => {
        if (activeAssistants.some(a => a.id === assistant.id)) {
            setActiveAssistants(prev => prev.filter(a => a.id !== assistant.id));
        } else {
            setActiveAssistants(prev => [...prev, assistant]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const featuredAssistants = [
        {
            id: 'search',
            name: 'Search',
            description: 'Assistant with access to documents and knowledge from Connected Sources.',
            iconId: 'search',
            author: 'Agent',
            actions: '1 Action',
            visibility: 'Public'
        },
        {
            id: 'general',
            name: 'General',
            description: 'Assistant with no search functionalities. Chat directly with the Large Language Model.',
            iconId: 'general',
            author: 'Agent',
            actions: 'No Actions',
            visibility: 'Public'
        },
        {
            id: 'art',
            name: 'Art',
            description: 'Assistant for generating images based on descriptions.',
            iconId: 'art',
            author: 'Agent',
            actions: '1 Action',
            visibility: 'Public'
        }
    ];

    const filters = [
        { name: 'Public', icon: <Globe className="w-3.5 h-3.5" /> },
        { name: 'Pinned', icon: <Pin className="w-3.5 h-3.5" /> },
        { name: 'Mine', icon: <User className="w-3.5 h-3.5" /> },
        { name: 'Private', icon: <Lock className="w-3.5 h-3.5" /> }
    ];

    const getFilteredAssistants = () => {
        switch (activeTab) {
            case 'Pinned':
                return activeAssistants;
            case 'Mine':
                return customAssistants;
            case 'Private':
                // Assuming all custom assistants are private for now
                return customAssistants;
            case 'Public':
                return featuredAssistants;
            default:
                return [];
        }
    };

    const displayAssistants = getFilteredAssistants();

    const renderAssistantCard = (assistant) => (
        <div
            key={assistant.id}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--sidebar-foreground)]/40 transition-all group relative"
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] shrink-0 group-hover:bg-[var(--border)]/20 transition-colors leading-none">
                    <AssistantIcon iconId={assistant.iconId} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-sm mb-0.5 truncate uppercase tracking-tight">{assistant.name}</h3>
                    <p className="text-[11px] text-[var(--sidebar-foreground)] opacity-70 leading-relaxed line-clamp-2 min-h-[2.5em]">{assistant.description}</p>
                </div>

                {/* Menu for custom assistants only */}
                {!featuredAssistants.some(f => f.id === assistant.id) && (
                    <div className="absolute top-4 right-4 group">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenuId(showMenuId === assistant.id ? null : assistant.id);
                            }}
                            className="p-1.5 hover:bg-[var(--border)] rounded-lg transition-colors text-[var(--sidebar-foreground)] active:scale-95"
                        >
                            <MoreHorizontal size={18} />
                        </button>

                        {showMenuId === assistant.id && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 mt-1 w-32 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                            >
                                <button
                                    onClick={() => {
                                        router.push(`/assistants/edit/${assistant.id}`);
                                        setShowMenuId(null);
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                                >
                                    <PenLine size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        removeProjectAssistant(assistant.id);
                                        setShowMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium text-red-500 hover:bg-[var(--border)] transition-colors"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--sidebar-foreground)] opacity-50 mb-4 whitespace-nowrap overflow-hidden">
                <span className="truncate">By {assistant.author || 'You'}</span>
                <span className="opacity-30">•</span>
                <span className="shrink-0">{typeof assistant.actions === 'string' ? assistant.actions : `${assistant.actions?.length || 0} Actions`}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        startAssistantChat(assistant);
                        onClose();
                        router.push('/');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)]/40 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98]"
                >
                    <PenLine size={12} />
                    Start Chat
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleAssistantPin(assistant);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)]/40 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98]"
                >
                    <Pin size={12} className={activeAssistants.some(a => a.id === assistant.id) ? "fill-current" : ""} />
                    {activeAssistants.some(a => a.id === assistant.id) ? "Unpin" : "Pin"}
                </button>
            </div>
        </div>
    );



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-3xl bg-[var(--background)] border border-[var(--border)] rounded-[20px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[var(--foreground)]"
                >
                    {/* Header with Search */}
                    <div className="p-6 pb-0">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-1 max-w-2xl relative mr-4">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--sidebar-foreground)] opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search assistants..."
                                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        router.push('/assistants/edit/new');
                                        onClose();
                                    }}
                                    className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 px-4 py-2 rounded-lg font-bold text-xs transition-colors flex-shrink-0"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-[var(--border)] rounded-full transition-colors text-[var(--sidebar-foreground)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-2 mb-8 border-b border-[var(--border)] pb-6">
                            <div className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors mr-2 cursor-pointer">
                                <Sliders className="w-4 h-4 text-[var(--sidebar-foreground)] opacity-60" />
                            </div>
                            {filters.map((filter) => (
                                <button
                                    key={filter.name}
                                    onClick={() => setActiveTab(filter.name)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 border transition-all",
                                        activeTab === filter.name
                                            ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--accent-foreground)]"
                                            : "border-[var(--border)] text-[var(--sidebar-foreground)] hover:border-[var(--sidebar-foreground)]/40"
                                    )}
                                >
                                    {filter.icon}
                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0">
                        {activeTab === 'Public' ? (
                            <>
                                {/* Featured Assistants */}
                                <div className="space-y-4 mb-8">
                                    <h2 className="text-base font-bold tracking-tight text-[var(--foreground)] border-none">Featured Assistants</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {featuredAssistants.map(renderAssistantCard)}
                                    </div>
                                </div>

                                {/* All Assistants */}
                                <div className="space-y-4">
                                    <h2 className="text-base font-bold tracking-tight text-[var(--foreground)] border-none">All Assistants</h2>
                                    {customAssistants.length === 0 ? (
                                        <div className="text-center py-8 text-[var(--sidebar-foreground)] opacity-60 text-xs">
                                            No custom assistants yet. Create one to get started!
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {customAssistants.map(renderAssistantCard)}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-base font-bold tracking-tight text-[var(--foreground)] border-none">
                                    {activeTab === 'Pinned' ? 'Pinned Assistants' :
                                        activeTab === 'Mine' ? 'My Assistants' :
                                            activeTab === 'Private' ? 'Private Assistants' : 'Featured Assistants'}
                                </h2>

                                {displayAssistants.length === 0 ? (
                                    <div className="text-center py-8 text-[var(--sidebar-foreground)] opacity-60 text-xs">
                                        No assistants found in this section.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {displayAssistants.map(renderAssistantCard)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
