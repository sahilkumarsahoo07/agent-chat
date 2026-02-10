'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    FileText,
    Plus,
    ChevronRight,
    Pencil,
    X,
    Check,
    Upload,
    File,
    Trash2,
    Search as SearchIcon,
    BrainCircuit,
    ArrowUp,
    Folder,
    Sliders,
    Clock,
    Sparkles,
    ChevronDown,
    PlusCircle,
    Archive,
    Command,
    Terminal,
    Mail,
    Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/context/chat-context';
import MarkdownContent from './markdown-content';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

import { useRouter } from 'next/navigation';

export default function ProjectView({ projectId }) {
    const router = useRouter();

    const {
        updateProject,
        projects,
        conversations,
        createConversation,
        addChatToProject,
        setActiveProjectId,
        setActiveConversationId,
    } = useChat();

    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [isEditingInstructions, setIsEditingInstructions] = useState(false);
    const [instructionsInput, setInstructionsInput] = useState("");
    const [newChatInput, setNewChatInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Chat states
    const [message, setMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

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
    ];

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
        return models[0];
    });


    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = async () => {
        if (!message.trim() && !uploadedFile) return;

        let fileData = null;
        if (uploadedFile) {
            if (uploadedFile.size > 10 * 1024 * 1024) {
                alert("File is too large. Please upload files smaller than 10MB.");
                return;
            }

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

        const newId = createConversation(message, selectedModel.model, selectedModel.name, null, fileData);
        addChatToProject(projectId, newId);
        router.push(`/chat/${newId}`);

        setMessage('');
        setUploadedFile(null);
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

    // Find the active project based on the ID from URL
    const project = projects.find(p => p.id === projectId);

    // Sync active project ID in context
    useEffect(() => {
        if (projectId) {
            setActiveProjectId(projectId);
            setActiveConversationId(null);
        }
    }, [projectId, setActiveProjectId, setActiveConversationId]);

    // Redirect if project not found
    useEffect(() => {
        if (!project && projects.length > 0) {
            router.push('/');
        }
    }, [project, projects, router]);

    const handleRename = () => {
        if (nameInput.trim() && nameInput !== project.name) {
            updateProject(projectId, { name: nameInput.trim() });
        }
        setIsEditingName(false);
    };

    if (!project) return null;

    const handleSaveInstructions = () => {
        updateProject(project.id, { instructions: instructionsInput });
        setIsEditingInstructions(false);
    };

    const handleAddFile = () => {
        const fileName = prompt("Enter file name (mock):");
        if (fileName) {
            updateProject(project.id, {
                files: [...(project.files || []), { id: Date.now().toString(), name: fileName, size: '0 KB' }]
            });
        }
    };

    const removeFile = (fileId) => {
        updateProject(project.id, {
            files: project.files.filter(f => f.id !== fileId)
        });
    };

    const handleCreateProjectChat = async (e) => {
        e.preventDefault();
        if (!newChatInput.trim() || isSubmitting) return;
        setIsSubmitting(true);

        try {
            // Create a new conversation
            const newChatId = createConversation(newChatInput);

            // Link it to the project
            addChatToProject(project.id, newChatId);

            // Navigate to the chat
            router.push(`/chat/${newChatId}`);

            // Clear input
            setNewChatInput('');
        } catch (error) {
            console.error("Failed to create project chat:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Filter chats belonging to this project and sort by recent
    const projectChats = (project.chatIds || [])
        .map(id => conversations.find(c => c.id === id))
        .filter(Boolean)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return (
        <div className="flex-1 flex flex-col h-screen bg-[var(--background)] overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-10 space-y-10">

                    {/* Project Header */}
                    <div className="space-y-6 group/header">
                        <div className="flex items-center gap-4">
                            <Folder size={32} className="text-[var(--foreground)] opacity-80" />
                            {isEditingName ? (
                                <div className="flex items-center w-full max-w-2xl">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        onBlur={handleRename}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleRename();
                                            if (e.key === 'Escape') setIsEditingName(false);
                                        }}
                                        className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] bg-transparent border-0 border-b border-[var(--border)] focus:ring-0 focus:border-[var(--emphasized-border)] p-0 w-full outline-none"
                                    />
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setNameInput(project.name);
                                        setIsEditingName(true);
                                    }}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                                        {project.name}
                                    </h1>
                                    <Pencil
                                        size={18}
                                        className="text-[var(--sidebar-foreground)] opacity-0 group-hover/header:opacity-40 hover:!opacity-100 transition-all ml-1 translate-y-0.5"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-px bg-[var(--border)]" />

                    {/* Instructions Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Instructions</h2>
                                <p className="text-[14px] text-[var(--sidebar-foreground)] opacity-70">
                                    {project.instructions ? "Custom instructions are active for this project." : "Tailor how the AI responds in this project."}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsEditingInstructions(true);
                                    setInstructionsInput(project.instructions || '');
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card)] transition-all border border-transparent hover:border-[var(--border)]"
                            >
                                <Sliders size={18} />
                                Set Instructions
                            </button>
                        </div>

                        <p className="text-[14px] text-[var(--sidebar-foreground)] opacity-70 leading-relaxed italic border-l-2 border-[var(--border)] pl-4">
                            {project.instructions || "Add instructions to tailor the response in this project."}
                        </p>
                    </div>

                    {/* Files Section */}
                    {/* <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Files</h2>
                            <p className="text-[14px] text-[var(--sidebar-foreground)] opacity-70">Chats in this project can access these files.</p>
                        </div>
                        <button
                            onClick={handleAddFile}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card)] transition-all border border-transparent hover:border-[var(--border)]"
                        >
                            <PlusCircle size={18} />
                            Add Files
                        </button>
                    </div>

                    {project.files && project.files.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                            {project.files.map(file => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-3 bg-[var(--card)]/30 border border-[var(--border)] rounded-xl group hover:border-[var(--sidebar-foreground)]/40 transition-all"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--sidebar-foreground)]">
                                            <File size={16} />
                                        </div>
                                        <span className="text-[13px] font-medium truncate">{file.name}</span>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        onClick={handleAddFile}
                        className="border border-dashed border-[var(--border)]/80 rounded-2xl p-6 md:p-8 xl:p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--card)]/20 transition-all bg-[var(--card)]/5 group/dropzone"
                    >
                        <p className="text-[14px] text-[var(--sidebar-foreground)] opacity-60 group-hover/dropzone:opacity-90 transition-opacity text-center font-medium">
                            Add documents, texts, or images to use in the project. Drag & drop supported.
                        </p>
                    </div>
                </div> */}


                    {/* Recent Chats List */}
                    <div className="space-y-4 pb-32">
                        <h3 className="text-[13px] font-medium text-[var(--sidebar-foreground)] uppercase tracking-wider">Recent Chats</h3>
                        <div className="space-y-1">
                            {projectChats.length > 0 ? (
                                projectChats.map(chat => (
                                    <button
                                        key={chat.id}
                                        onClick={() => router.push(`/chat/${chat.id}`)}
                                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--card)]/50 transition-all text-left group"
                                    >
                                        <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0">
                                            <BrainCircuit size={18} className="text-[var(--sidebar-foreground)]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-[14px] text-[var(--foreground)] truncate">{chat.title || 'Untitled Chat'}</div>
                                            <div className="text-[12px] text-[var(--sidebar-foreground)] truncate">
                                                Last message {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="text-[13px] text-[var(--sidebar-foreground)] italic opacity-60 pl-2">
                                    No recent chats in this project.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Input Area */}
            <div className="shrink-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent pt-4 pb-8 px-4 flex justify-center z-20">
                <div className="w-full max-w-3xl">
                    <div className="relative bg-[var(--input-bg)] rounded-[24px] shadow-lg transition-all p-2 md:p-2.5 xl:p-3.5 border border-[var(--border)]/60 focus-within:border-[var(--sidebar-foreground)]/40 backdrop-blur-md">
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
                            placeholder={`Message in ${project.name}...`}
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
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[12px] xl:text-[13px] font-medium text-[var(--sidebar-foreground)] transition-all group hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                                        )}
                                    >
                                        <div className="w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                                            <img src={selectedModel.icon} className="w-full h-full object-contain model-icon" />
                                        </div>
                                        <span className="truncate max-w-[100px]">{selectedModel.name}</span>
                                        <ChevronDown size={12} className={cn("opacity-40 transition-all", isDropdownOpen && "rotate-180")} />
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
                                onClick={handleSend}
                                disabled={!message.trim() && !uploadedFile}
                                className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                                    (message.trim() || uploadedFile)
                                        ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                                        : "bg-[var(--foreground)]/10 text-[var(--sidebar-foreground)]/50 cursor-not-allowed"
                                )}
                            >
                                <ArrowUp size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instructions Modal */}
                <AnimatePresence>
                    {isEditingInstructions && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsEditingInstructions(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-lg bg-[var(--background)] border border-[var(--border)] rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
                            >
                                {/* Modal Header */}
                                <div className="p-5 pb-4 flex items-start justify-between">
                                    <div className="space-y-4">
                                        <Sliders size={26} className="text-[var(--foreground)]" strokeWidth={1.5} />
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Set Project Instructions</h2>
                                            <p className="text-[14px] text-[var(--sidebar-foreground)] opacity-60 leading-relaxed">
                                                Instruct specific behaviors, focus, tones, or formats for the response in this project.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsEditingInstructions(false)}
                                        className="text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] opacity-40 hover:opacity-100 transition-all p-1"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Textarea Area */}
                                <div className="bg-[var(--sidebar-bg)] p-5 py-6">
                                    <div className="relative group">
                                        <textarea
                                            autoFocus
                                            value={instructionsInput}
                                            onChange={(e) => setInstructionsInput(e.target.value)}
                                            placeholder="Add specific instructions for this project..."
                                            className="w-full h-24 min-h-[80px] bg-[var(--background)] border border-[var(--border)] rounded-[20px] p-5 text-[15px] leading-relaxed text-[var(--foreground)] placeholder-[var(--sidebar-foreground)]/40 focus:outline-none focus:border-[var(--foreground)]/20 transition-all resize-y custom-scrollbar shadow-sm"
                                        />
                                        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
                                            <Sparkles size={16} className="text-[var(--foreground)]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-5 py-5 flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => setIsEditingInstructions(false)}
                                        className="px-6 py-2.5 rounded-[14px] text-sm font-medium text-[var(--sidebar-foreground)] border border-[var(--border)] hover:bg-[var(--sidebar-bg)] transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveInstructions}
                                        className="px-7 py-2.5 rounded-[14px] bg-[var(--foreground)] text-[var(--background)] text-sm font-bold hover:opacity-90 transition-all shadow-md"
                                    >
                                        Save Instructions
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
