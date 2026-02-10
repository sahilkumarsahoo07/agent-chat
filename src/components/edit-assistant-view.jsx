'use client';

import React from 'react';
import {
    ArrowLeft,
    LayoutGrid,
    Camera,
    Sparkles,
    Check,
    ChevronDown,
    Trash2,
    Share2,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/chat-context';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DatePicker from './date-picker';
import AssistantIcon from './assistant-icon';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function EditAssistantView({ initialAssistant, onBack }) {
    const { addProjectAssistant, removeProjectAssistant, startAssistantChat } = useChat();
    const router = useRouter();
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [isKnowledgeEnabled, setIsKnowledgeEnabled] = useState(false);
    const [knowledgeCutoff, setKnowledgeCutoff] = useState('');
    const [overwriteSystemPrompt, setOverwriteSystemPrompt] = useState(false);
    const [reminders, setReminders] = useState('');

    const [name, setName] = useState(initialAssistant?.name || '');
    const [description, setDescription] = useState(initialAssistant?.description || '');
    const [instructions, setInstructions] = useState(initialAssistant?.instructions || '');
    const [model, setModel] = useState(initialAssistant?.model || 'user_default');
    const [selectedActions, setSelectedActions] = useState(initialAssistant?.actions || []);
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const modelDropdownRef = useRef(null);

    const models = [
        { name: 'User Default', iconId: 'sparkles', model: 'user_default' },
        { name: 'Grok 4.1 Fast', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-4.1-fast' },
        { name: 'DeepSeek V3.2', icon: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", model: 'deepseek/deepseek-v3.2' },
        { name: 'Solar Pro', icon: "https://www.google.com/s2/favicons?domain=upstage.ai&sz=128", model: 'upstage/solar-pro-3:free' },
        { name: 'GPT-5 Nano', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'gpt-5-nano' },
        { name: 'GPT-4o Mini', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o-mini' },
        { name: 'GPT-4o', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o' },
        { name: 'Trinity Large', icon: "https://www.google.com/s2/favicons?domain=arcee.ai&sz=128", model: 'arcee-ai/trinity-large-preview:free' },
        { name: 'DeepSeek Chimera', icon: "https://www.google.com/s2/favicons?domain=tngtech.com&sz=128", model: 'tngtech/deepseek-r1t-chimera:free' },
        { name: 'NVIDIA Nemotron', icon: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
        { name: 'Claude 3.5 Sonnet', icon: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", model: 'anthropic/claude-3.5-sonnet' },
    ];

    const selectedModelData = models.find(m => m.model === model) || models[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
                setIsModelDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleAction = (actionId) => {
        setSelectedActions(prev =>
            prev.includes(actionId)
                ? prev.filter(a => a !== actionId)
                : [...prev, actionId]
        );
    };

    const handleSave = () => {
        if (!name.trim()) return; // Basic validation

        const newAssistant = {
            ...initialAssistant,
            id: initialAssistant.id === 'new' ? Date.now().toString() : initialAssistant.id,
            name,
            description,
            instructions,
            model,
            actions: selectedActions,
            updatedAt: new Date().toISOString()
        };

        addProjectAssistant(newAssistant);
        onBack();
    };

    const handleDelete = () => {
        if (initialAssistant.id !== 'new') {
            removeProjectAssistant(initialAssistant.id);
        }
        onBack();
    };

    const handleStartChat = () => {
        if (initialAssistant.id !== 'new') {
            const id = startAssistantChat(initialAssistant);
            router.push(`/chat/${id}`);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 text-[var(--foreground)]">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-medium text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Back
            </button>

            <div className="max-w-xl mx-auto space-y-8 pb-12">
                <h1 className="text-xl font-bold">
                    Edit assistant <span className="text-[var(--foreground)] opacity-60 font-medium">{name}</span>
                </h1>
                {/* Icon Section */}
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Assistant Icon</label>
                    <p className="text-[11px] text-[var(--sidebar-foreground)] opacity-60">The icon that will visually represent your Assistant</p>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--card)] group cursor-pointer hover:border-[var(--sidebar-foreground)]/40 transition-colors">
                            <AssistantIcon iconId={initialAssistant?.iconId || 'general'} className="w-7 h-7 text-[var(--sidebar-foreground)] opacity-40 group-hover:opacity-70 transition-opacity" />
                        </div>
                        <div className="space-y-2">
                            <button className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)]/50 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                                <Camera size={14} />
                                Upload Image
                            </button>
                            <button className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)]/50 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                                <Sparkles size={14} />
                                Generate Icon
                            </button>
                        </div>
                    </div>
                </div>

                {/* Name & Description */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Assistant AI"
                            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors text-[var(--foreground)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="This assistant can search the internet"
                            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors text-[var(--foreground)]"
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Instructions</label>
                    <textarea
                        rows={6}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="You are a helpful assistant. You always run an Internet search unless the user request does not require additional knowledge."
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors resize-none text-[var(--foreground)]"
                    />
                </div>

                {/* Knowledge Section */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Knowledge</label>
                            <button
                                onClick={() => setIsKnowledgeEnabled(!isKnowledgeEnabled)}
                                className={cn(
                                    "w-9 h-5 rounded-full relative transition-colors duration-200 ease-in-out",
                                    isKnowledgeEnabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm",
                                    isKnowledgeEnabled ? "translate-x-4" : "translate-x-0"
                                )} />
                            </button>
                        </div>
                        <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-50">Attach additional unique knowledge to this assistant</p>
                    </div>

                    {isKnowledgeEnabled && (
                        <div className="pl-3 border-l-2 border-[var(--border)] space-y-4 ml-1 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div>
                                <h3 className="text-xs font-bold text-[var(--foreground)]">Document Sets</h3>
                                <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-60 mt-1 leading-relaxed">
                                    Select which <span className="text-[var(--foreground)] font-medium">Document Sets</span> this Assistant should use to inform its responses. If none are specified, the Assistant will reference all available documents.
                                </p>
                            </div>

                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-4 hover:border-[var(--sidebar-foreground)]/40 transition-colors cursor-pointer group">
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[var(--foreground)]">Engineering Docs</h4>
                                    <p className="text-[11px] text-[var(--sidebar-foreground)] opacity-70 mt-0.5">Engineering Public Facing Docs</p>
                                    <div className="mt-3 text-[var(--foreground)] opacity-80">
                                        <LayoutGrid className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="mt-1 w-5 h-5 rounded-[4px] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--sidebar-foreground)]/40 transition-colors bg-[var(--background)]">
                                    <Check size={14} className="text-transparent" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Actions</label>
                    <div className="space-y-4">
                        {[
                            { id: 'image_gen', name: 'Image Generation', desc: 'Generate and manipulate images using AI-powered tools' },
                            { id: 'search', name: 'Internet Search', desc: 'Access real-time information and search the web for up-to-date results' },
                            { id: 'reasoning', name: 'Reasoning', desc: 'Enable advanced reasoning and thinking patterns for the assistant' },
                            { id: 'my_api', name: 'My API', desc: 'A custom action for assistants created from the Admin Page' }
                        ].map((action) => (
                            <div
                                key={action.id}
                                onClick={() => toggleAction(action.id)}
                                className="flex items-start gap-3 group cursor-pointer"
                            >
                                <div className={cn(
                                    "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                                    selectedActions.includes(action.id)
                                        ? "bg-[var(--accent)] border-[var(--accent)]"
                                        : "border-[var(--border)] group-hover:border-[var(--sidebar-foreground)]/40"
                                )}>
                                    <Check size={12} className={selectedActions.includes(action.id) ? "text-[var(--accent-foreground)]" : "text-transparent"} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold">{action.name}</h4>
                                    <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-50">{action.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70">Default Model</label>
                    <div className="relative" ref={modelDropdownRef}>
                        <button
                            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            className="w-full flex items-center justify-between bg-[var(--card)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-all text-[var(--foreground)] group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex items-center justify-center rounded-md bg-[var(--border)]/30 overflow-hidden shadow-sm">
                                    {selectedModelData.iconId ? (
                                        <AssistantIcon iconId={selectedModelData.iconId} className="w-3.5 h-3.5 opacity-80" />
                                    ) : (
                                        <img src={selectedModelData.icon} className="w-3.5 h-3.5 object-contain model-icon" />
                                    )}
                                </div>
                                <span className="font-medium">{selectedModelData.name}</span>
                            </div>
                            <ChevronDown size={14} className={cn("text-[var(--sidebar-foreground)] opacity-50 transition-transform duration-300", isModelDropdownOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isModelDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 5, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full left-0 mb-2 w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-1.5 z-50 ring-1 ring-black/5 max-h-[300px] overflow-y-auto custom-scrollbar"
                                >
                                    <div className="px-3 py-2 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-wider opacity-60">Select Default Model</div>
                                    <div className="space-y-0.5">
                                        {models.map((m, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setModel(m.model);
                                                    setIsModelDropdownOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all group/item",
                                                    model === m.model
                                                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                                        : "hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[var(--border)]/30 overflow-hidden shadow-sm transition-transform group-hover/item:scale-110">
                                                        {m.iconId ? (
                                                            <AssistantIcon iconId={m.iconId} className="w-4 h-4 opacity-80" />
                                                        ) : (
                                                            <img src={m.icon} className="w-4 h-4 object-contain model-icon" />
                                                        )}
                                                    </div>
                                                    <span className="text-[13px] font-medium">{m.name}</span>
                                                </div>
                                                {model === m.model && (
                                                    <Check size={14} className="text-[var(--accent)]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>


                {/* Advanced Options */}
                <div className="border-t border-[var(--border)] pt-4">
                    <button
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        className="flex items-center gap-2 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <ChevronDown size={14} className={cn("transition-transform", isAdvancedOpen ? "" : "-rotate-90")} />
                        Advanced Options
                    </button>
                    <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-50 mt-1">Fine-tune agent prompts and knowledge.</p>

                    <AnimatePresence>
                        {isAdvancedOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-4 mt-6">
                                    {/* Share This Agent */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-[var(--foreground)]">Share This Agent</h3>
                                                <p className="text-[11px] text-[var(--sidebar-foreground)] opacity-60 mt-0.5">Share this agent with other users, groups, or everyone in your organization.</p>
                                            </div>
                                            <button className="flex items-center gap-1.5 bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)]/40 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ml-3 shrink-0">
                                                <Share2 size={14} />
                                                Share
                                            </button>
                                        </div>
                                    </div>


                                    {/* Knowledge Cutoff Date */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3">
                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--foreground)]">Knowledge Cutoff Date</h3>
                                            <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-60 mt-0.5">Set the knowledge cutoff date for this agent. The agent will only use information up to this date.</p>
                                        </div>
                                        <DatePicker
                                            value={knowledgeCutoff}
                                            onChange={setKnowledgeCutoff}
                                            placeholder="Select Date"
                                        />
                                    </div>

                                    {/* Overwrite System Prompt */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-[var(--foreground)]">Overwrite System Prompt</h3>
                                                <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-60 mt-0.5">Completely replace the base system prompt. This might affect response quality since it will also overwrite useful system instructions (e.g. "You [the LLM] can provide markdown and it will be rendered").</p>
                                            </div>
                                            <button
                                                onClick={() => setOverwriteSystemPrompt(!overwriteSystemPrompt)}
                                                className={cn(
                                                    "w-9 h-5 rounded-full relative transition-colors duration-200 ease-in-out ml-3 shrink-0",
                                                    overwriteSystemPrompt ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                                                )}
                                            >
                                                <div className={cn(
                                                    "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm",
                                                    overwriteSystemPrompt ? "translate-x-4" : "translate-x-0"
                                                )} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Reminders */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3">
                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--foreground)]">Reminders</h3>
                                            <p className="text-[10px] text-[var(--sidebar-foreground)] opacity-60 mt-0.5">Append a brief reminder to the prompt messages. Use this to remind the agent if you find that it tends to forget certain instructions as the chat progresses. This should be brief and not interfere with the user messages.</p>
                                        </div>
                                        <textarea
                                            rows={4}
                                            value={reminders}
                                            onChange={(e) => setReminders(e.target.value)}
                                            placeholder="Remember, I want you to always format your response as a numbered list."
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors resize-none text-[var(--foreground)]"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* Action Buttons */}
                <div className="pt-8 border-t border-[var(--border)] flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button
                            onClick={onBack}
                            className="flex-1 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-bold py-3 rounded-xl hover:bg-[var(--border)]/50 transition-colors active:scale-[0.99] text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.99] text-sm"
                        >
                            {initialAssistant.id === 'new' ? 'Create' : 'Update'}
                        </button>
                    </div>
                    {initialAssistant.id !== 'new' && (
                        <button
                            onClick={handleDelete}
                            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 font-bold py-3 rounded-xl hover:bg-red-500/20 transition-colors active:scale-[0.99] text-sm mt-4"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
