'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    Plus,
    Search,
    MessageSquare,
    Compass,
    History,
    ChevronLeft,
    ChevronDown,
    MoreHorizontal,
    User,
    Settings,
    Moon,
    Sun,
    Monitor,
    LogOut,
    Sparkles,
    Pin,
    Trash2,
    MoreVertical,
    Archive,
    FolderPlus,
    Folder,
    Pencil,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useChat } from '@/context/chat-context';
import ExploreModal from './explore-modal';
import AssistantIcon from './assistant-icon';
import { useRouter, useParams, usePathname } from 'next/navigation';


function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ProjectItem = ({
    project,
    pathname,
    isCollapsed,
    setIsCollapsed,
    editingProjectId,
    setEditingProjectId,
    editProjectName,
    setEditProjectName,
    updateProject,
    projectMenuOpenId,
    setProjectMenuOpenId,
    setProjectToDelete,
    menuRef
}) => {
    return (
        editingProjectId === project.id ? (
            <div className="px-2 py-1">
                <div className="flex items-center gap-2 bg-[var(--background)] rounded-lg px-2 py-1.5">
                    <Folder size={14} className="text-[var(--foreground)]" />
                    <input
                        autoFocus
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (editProjectName.trim()) {
                                    updateProject(project.id, { name: editProjectName.trim() });
                                }
                                setEditingProjectId(null);
                            } else if (e.key === 'Escape') {
                                setEditingProjectId(null);
                            }
                        }}
                        onBlur={() => {
                            if (editProjectName.trim()) {
                                updateProject(project.id, { name: editProjectName.trim() });
                            }
                            setEditingProjectId(null);
                        }}
                        className="flex-1 bg-transparent border-none outline-none text-[13px] text-[var(--foreground)] p-0 focus:ring-0 placeholder:text-[var(--sidebar-foreground)]"
                    />
                </div>
            </div>
        ) : (
            <>
                <Link
                    href={`/project/${project.id}`}
                    onClick={() => {
                        if (isCollapsed) setIsCollapsed(false);
                    }}
                    className={cn(
                        "w-full flex items-center gap-2.5 p-1.5 rounded-lg transition-colors group relative",
                        (pathname?.includes(`/project/${project.id}`)) ? "bg-[var(--border)] shadow-sm text-[var(--foreground)]" : "hover:bg-[var(--border)] text-[var(--sidebar-foreground)]",
                        isCollapsed ? "justify-center" : "px-2.5"
                    )}
                >
                    <Folder size={16} className={cn((pathname?.includes(`/project/${project.id}`)) ? "text-[var(--foreground)]" : "text-[var(--sidebar-foreground)]")} />
                    {!isCollapsed && <span className="text-[12px] xl:text-[13px] font-medium truncate flex-1 text-left">{project.name}</span>}
                </Link>

                {!isCollapsed && (
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setProjectMenuOpenId(projectMenuOpenId === project.id ? null : project.id);
                            }}
                            className="p-1 hover:bg-[var(--background)] rounded-md text-[var(--sidebar-foreground)]"
                        >
                            <MoreVertical size={14} />
                        </button>
                    </div>
                )}

                <AnimatePresence>
                    {projectMenuOpenId === project.id && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-[-8px] top-6 w-32 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl z-50 overflow-hidden"
                            ref={menuRef}
                        >
                            <div className="p-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingProjectId(project.id);
                                        setEditProjectName(project.name);
                                        setProjectMenuOpenId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] hover:bg-[var(--border)] rounded-md text-left text-[var(--foreground)]"
                                >
                                    <Pencil size={12} />
                                    Rename
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProjectToDelete(project);
                                        setProjectMenuOpenId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] hover:bg-red-500/10 text-red-500 rounded-md text-left"
                                >
                                    <Trash2 size={12} />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        )
    );
};

export default function Sidebar() {
    const {
        conversations,
        activeConversationId,
        setActiveConversationId,
        activeAssistants,
        startAssistantChat,
        activeConversation,
        deleteConversation,
        togglePinConversation,
        removeActiveAssistant,
        projects,
        setActiveProjectId,
        activeProjectId,
        activeProject,
        createProject,
        updateProject,
        deleteProject,
        addChatToProject
    } = useChat();

    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();

    const [sections, setSections] = useState({
        today: true,
        projects: true,
        showAllProjects: false
    });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editProjectName, setEditProjectName] = useState("");
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [moveWarning, setMoveWarning] = useState({ open: false, chatId: null, projectId: null });
    const [projectMenuOpenId, setProjectMenuOpenId] = useState(null);
    const [isProjectSelectMode, setIsProjectSelectMode] = useState(false);
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const { theme, setTheme } = useTheme();
    const menuRef = useRef(null);
    const profileMenuRef = useRef(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpenId(null);
                setProjectMenuOpenId(null);
                setIsProjectSelectMode(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSection = (section) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const staticAssistants = [
        { id: 'general', name: 'General', iconId: 'general' },
        { id: 'search', name: 'Search', iconId: 'search' },
        { id: 'art', name: 'Art', iconId: 'art' },
    ];

    // Get IDs of all chats that belong to any project
    const allProjectChatIds = useMemo(() => {
        return new Set(projects.flatMap(p => p.chatIds || []));
    }, [projects]);

    // Group conversations - Only show those with user messages and NOT in any project
    const todayChats = conversations
        .filter(conv => conv.messages.some(m => m.role === 'user') && !allProjectChatIds.has(conv.id))
        .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            const aTime = a.messages[a.messages.length - 1]?.timestamp || a.updatedAt;
            const bTime = b.messages[b.messages.length - 1]?.timestamp || b.updatedAt;
            return new Date(bTime) - new Date(aTime);
        });

    return (
        <div
            onClick={() => isCollapsed && setIsCollapsed(false)}
            className={cn(
                "h-screen transition-all duration-300 ease-in-out flex flex-col border-r border-[var(--border)] bg-[var(--sidebar-bg)] relative",
                isCollapsed ? "w-16 cursor-pointer hover:bg-[var(--border)]/30" : "w-64"
            )}
        >
            {/* Header */}
            <div className={cn(
                "p-4 flex items-center",
                isCollapsed ? "justify-center" : "justify-between"
            )}>
                {!isCollapsed && (
                    <Link href="/" className="flex items-center gap-2 font-bold text-base xl:text-lg tracking-tight">
                        <div className="w-5 h-5 bg-[var(--accent)] rounded-sm flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-[var(--background)] rotate-45" />
                        </div>
                        <span className="text-[var(--foreground)] truncate">Agent Chat</span>
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        "p-1 hover:bg-[var(--border)] rounded-md transition-colors",
                        isCollapsed && "flex items-center justify-center h-8 w-8"
                    )}
                    aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
                >
                    <ChevronLeft
                        size={18}
                        className={cn(
                            "text-[var(--sidebar-foreground)] transition-transform duration-300",
                            isCollapsed && "rotate-180"
                        )}
                    />
                </button>
            </div>

            {/* New Chat Button */}
            <div className="px-3 md:px-4 py-4 md:py-6">
                <Link
                    href="/chat/new-chat"
                    onClick={() => setActiveProjectId(null)}
                    className={cn(
                        "w-full flex items-center gap-2.5 p-1.5 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-all group",
                        isCollapsed ? "justify-center px-0" : "px-2.5"
                    )}
                >
                    <Plus size={15} className="text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)]" />
                    {!isCollapsed && <span className="text-[12px] xl:text-[13px] font-medium">New Chat</span>}
                </Link>
            </div>

            {/* Assistants List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {!isCollapsed && (
                    <div className="px-3 py-2 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-50 flex items-center justify-between group">
                        Assistants
                    </div>
                )}
                {staticAssistants.map((assistant) => (
                    <button
                        key={assistant.id}
                        onClick={() => {
                            setActiveProjectId(null);
                            const id = startAssistantChat(assistant);
                            router.push(`/chat/${id}`);
                        }}
                        className={cn(
                            "w-full flex items-center gap-2.5 p-1.5 rounded-lg transition-colors group",
                            (activeConversation?.assistantId === assistant.id) ? "bg-[var(--background)] shadow-sm" : "hover:bg-[var(--border)]",
                            isCollapsed ? "justify-center" : "px-2.5"
                        )}
                    >
                        <AssistantIcon iconId={assistant.iconId} className="w-[18px] h-[18px]" />
                        {!isCollapsed && <span className="text-[12px] xl:text-[13px] text-[var(--sidebar-foreground)] font-medium">{assistant.name}</span>}
                    </button>
                ))}

                {/* Active Assistants */}
                {activeAssistants.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-[var(--border)]/30">
                        {!isCollapsed && (
                            <div className="px-3 py-2 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-50">
                                Active Assistants
                            </div>
                        )}
                        {activeAssistants.map((assistant) => (
                            <div key={assistant.id} className="relative group">
                                <button
                                    onClick={() => {
                                        setActiveProjectId(null);
                                        const id = startAssistantChat(assistant);
                                        router.push(`/chat/${id}`);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-2.5 p-1.5 rounded-lg transition-colors",
                                        activeConversation?.assistantId === assistant.id ? "bg-[var(--background)] shadow-sm" : "hover:bg-[var(--border)]",
                                        isCollapsed ? "justify-center" : "px-2.5"
                                    )}
                                >
                                    <AssistantIcon iconId={assistant.iconId} className="w-4 h-4 text-[var(--sidebar-foreground)]" />
                                    {!isCollapsed && <span className="text-[12px] xl:text-[13px] text-[var(--sidebar-foreground)] font-medium flex-1 text-left pr-6">{assistant.name}</span>}
                                </button>

                                {!isCollapsed && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeActiveAssistant(assistant.id);
                                        }}
                                        title="Unpin Agent"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-[var(--background)] hover:bg-[var(--border)] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <span className="text-xs text-[var(--sidebar-foreground)]">×</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setIsExploreOpen(true)}
                    className={cn(
                        "w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors group mt-1",
                        isCollapsed ? "justify-center" : "px-2.5"
                    )}
                >
                    <div className="w-4 h-4 rounded border border-[var(--border)] flex items-center justify-center opacity-60">
                        <Plus size={12} />
                    </div>
                    {!isCollapsed && <span className="text-[12px] xl:text-[13px] text-[var(--sidebar-foreground)]">Explore Assistants</span>}
                </button>



                {/* Projects Section */}
                <div className="pt-2 mt-2 border-t border-[var(--border)]/30 group/projects">
                    {!isCollapsed && (
                        <div className="px-3 py-2 text-[10px] font-bold text-[var(--sidebar-foreground)] uppercase tracking-widest opacity-50 flex items-center justify-between group/header">
                            Projects
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsCreateProjectOpen(true); }}
                                className="opacity-0 group-hover/projects:opacity-100 p-0.5 hover:bg-[var(--border)] rounded transition-all"
                            >
                                <FolderPlus size={14} />
                            </button>
                        </div>
                    )}

                    {/* New Project Item - Only show if no projects exist */}
                    {projects.length === 0 && (
                        <button
                            onClick={() => setIsCreateProjectOpen(true)}
                            className={cn(
                                "w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors group",
                                isCollapsed ? "justify-center" : "px-2.5"
                            )}
                        >
                            <FolderPlus size={18} className="text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)]" />
                            {!isCollapsed && <span className="text-[12px] xl:text-[13px] text-[var(--sidebar-foreground)] font-medium">New Project</span>}
                        </button>
                    )}

                    {/* Project List */}
                    <div className="space-y-0.5 mt-1">
                        {(projects.length > 4 && !sections.showAllProjects) ? (
                            <>
                                {projects.slice(0, 4).map((project) => (
                                    <div key={project.id} className="relative group">
                                        <ProjectItem
                                            project={project}
                                            pathname={pathname}
                                            isCollapsed={isCollapsed}
                                            setIsCollapsed={setIsCollapsed}
                                            editingProjectId={editingProjectId}
                                            setEditingProjectId={setEditingProjectId}
                                            editProjectName={editProjectName}
                                            setEditProjectName={setEditProjectName}
                                            updateProject={updateProject}
                                            projectMenuOpenId={projectMenuOpenId}
                                            setProjectMenuOpenId={setProjectMenuOpenId}
                                            setProjectToDelete={setProjectToDelete}
                                            menuRef={menuRef}
                                        />
                                    </div>
                                ))}
                                {!isCollapsed && (
                                    <button
                                        onClick={() => setSections(prev => ({ ...prev, showAllProjects: true }))}
                                        className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors text-[11px] font-bold uppercase tracking-wider pl-12"
                                    >
                                        <ChevronDown size={12} className="-rotate-90" />
                                        Show {projects.length - 4} more
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                {projects.map((project) => (
                                    <div key={project.id} className="relative group">
                                        <ProjectItem
                                            project={project}
                                            pathname={pathname}
                                            isCollapsed={isCollapsed}
                                            setIsCollapsed={setIsCollapsed}
                                            editingProjectId={editingProjectId}
                                            setEditingProjectId={setEditingProjectId}
                                            editProjectName={editProjectName}
                                            setEditProjectName={setEditProjectName}
                                            updateProject={updateProject}
                                            projectMenuOpenId={projectMenuOpenId}
                                            setProjectMenuOpenId={setProjectMenuOpenId}
                                            setProjectToDelete={setProjectToDelete}
                                            menuRef={menuRef}
                                        />
                                    </div>
                                ))}
                                {projects.length > 4 && !isCollapsed && (
                                    <button
                                        onClick={() => setSections(prev => ({ ...prev, showAllProjects: false }))}
                                        className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] transition-colors text-[11px] font-bold uppercase tracking-wider pl-12"
                                    >
                                        <ChevronDown size={12} />
                                        Collapse
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Recent Chats */}
                <div className="mt-8 space-y-4">
                    {/* Today Section */}
                    <div className="space-y-1">
                        {!isCollapsed && (
                            <button
                                onClick={() => {
                                    toggleSection('today');
                                    setActiveProjectId(null);
                                }}
                                className="w-full px-2 mb-1 text-[11px] font-medium text-[var(--sidebar-foreground)] flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors group"
                            >
                                <ChevronDown size={10} className={cn("transition-transform opacity-60", !sections.today && "-rotate-90")} />
                                <span>Your Chats</span>
                            </button>
                        )}

                        {!isCollapsed && sections.today && todayChats.map((chat) => (
                            <div key={chat.id} className="relative group">
                                <Link
                                    href={`/chat/${chat.id}`}
                                    onClick={() => setActiveProjectId(null)}
                                    className={cn(
                                        "w-full flex items-center gap-2.5 p-1.5 rounded-lg transition-all relative",
                                        isCollapsed ? "justify-center" : "px-2.5",
                                        activeConversationId === chat.id
                                            ? "bg-[var(--border)] text-[var(--foreground)]"
                                            : "hover:bg-[var(--border)]/50 text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    {!isCollapsed && (
                                        <div className="flex-1 min-w-0 pr-6">
                                            <span className="text-[12px] xl:text-[13px] truncate text-left w-full font-medium block">
                                                {chat.title}
                                            </span>
                                        </div>
                                    )}
                                    {chat.isPinned && !isCollapsed && (
                                        <Pin size={12} className="text-[var(--sidebar-foreground)] absolute right-2 top-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity" />
                                    )}
                                    {isCollapsed && <History size={16} className={cn(activeConversationId === chat.id ? "text-[var(--foreground)]" : "text-[var(--sidebar-foreground)]")} />}
                                </Link>

                                {/* Hover Menu Trigger */}
                                {!isCollapsed && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
                                            setIsProjectSelectMode(false);
                                        }}
                                        className={cn(
                                            "absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-all",
                                            menuOpenId === chat.id ? "opacity-100 bg-[var(--background)] shadow-sm" : "opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <MoreVertical size={14} />
                                    </button>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {menuOpenId === chat.id && !isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ duration: 0.1 }}
                                            className="absolute right-0 top-full mt-1 w-60 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden"
                                            ref={menuRef}
                                        >
                                            <div className="p-1">
                                                <div className="p-1">
                                                    {!isProjectSelectMode ? (
                                                        <>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    togglePinConversation(chat.id);
                                                                    setMenuOpenId(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-[13px] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-lg transition-colors text-left"
                                                            >
                                                                <Pin size={14} />
                                                                {chat.isPinned ? "Unpin chat" : "Pin chat"}
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setIsProjectSelectMode(true);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-[13px] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-lg transition-colors text-left"
                                                            >
                                                                <FolderPlus size={14} />
                                                                Move to Project
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    deleteConversation(chat.id);
                                                                    setMenuOpenId(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-[13px] text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                                            >
                                                                <Trash2 size={14} />
                                                                Delete
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="w-full">
                                                            <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[var(--border)]/50 mb-1">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        setIsProjectSelectMode(false);
                                                                        setProjectSearchQuery("");
                                                                    }}
                                                                    className="hover:bg-[var(--border)] rounded p-0.5"
                                                                >
                                                                    <ChevronLeft size={14} className="text-[var(--sidebar-foreground)]" />
                                                                </button>
                                                                <input
                                                                    autoFocus
                                                                    type="text"
                                                                    placeholder="Search Projects..."
                                                                    value={projectSearchQuery}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                    }}
                                                                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                                                                    className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[var(--foreground)] placeholder:text-[var(--sidebar-foreground)] p-0 focus:ring-0"
                                                                />
                                                            </div>
                                                            <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                                                                {projects.filter(p => p.name.toLowerCase().includes(projectSearchQuery.toLowerCase())).length > 0 ? (
                                                                    projects
                                                                        .filter(p => p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()))
                                                                        .map(project => (
                                                                            <button
                                                                                key={project.id}
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    if (chat.assistantId) {
                                                                                        setMoveWarning({ open: true, chatId: chat.id, projectId: project.id });
                                                                                    } else {
                                                                                        addChatToProject(project.id, chat.id);
                                                                                    }
                                                                                    setMenuOpenId(null);
                                                                                    setIsProjectSelectMode(false);
                                                                                    setProjectSearchQuery("");
                                                                                }}
                                                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-[13px] text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-lg transition-colors text-left"
                                                                            >
                                                                                <Folder size={14} />
                                                                                <span className="truncate">{project.name}</span>
                                                                            </button>
                                                                        ))
                                                                ) : (
                                                                    <div className="px-2 py-2 text-[12px] text-[var(--sidebar-foreground)] italic text-center">
                                                                        No projects found
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Move Warning Modal */}
            <AnimatePresence>
                {moveWarning.open && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)] mt-1">
                                        <div className="text-[var(--foreground)] font-bold px-2 py-0.5 border border-[var(--foreground)] rounded-full text-xs">!</div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-[var(--foreground)]">Move Custom Agent Chat</h2>
                                            <button
                                                onClick={() => setMoveWarning({ open: false, chatId: null, projectId: null })}
                                                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                            This chat uses a <span className="font-semibold text-[var(--foreground)]">custom agent</span> and moving it to a <span className="font-semibold text-[var(--foreground)]">project</span> will not override the agent's prompt or knowledge configurations. This should only be used for organization purposes.
                                        </p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input type="checkbox" id="dontShowAgain" className="rounded border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-0" />
                                            <label htmlFor="dontShowAgain" className="text-sm text-[var(--muted-foreground)] select-none cursor-pointer">Do not show this again</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        onClick={() => setMoveWarning({ open: false, chatId: null, projectId: null })}
                                        className="px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)] text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            addChatToProject(moveWarning.projectId, moveWarning.chatId);
                                            setMoveWarning({ open: false, chatId: null, projectId: null });
                                        }}
                                        className="px-4 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-sm font-medium transition-colors"
                                    >
                                        Confirm Move
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Profile Popup */}
            {
                showProfileMenu && (
                    <div
                        ref={profileMenuRef}
                        className={cn(
                            "absolute bottom-20 left-4 z-50 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-2 duration-200",
                            isCollapsed ? "w-48 left-16" : "w-56"
                        )}>
                        <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
                            <p className="text-xs font-semibold text-[var(--sidebar-foreground)] uppercase tracking-wider">Settings</p>
                        </div>

                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--border)] transition-colors group text-left">
                            <Settings size={16} className="text-[var(--sidebar-foreground)] group-hover:text-[var(--foreground)]" />
                            <span className="text-sm">Personal Settings</span>
                        </button>

                        <div className="px-3 py-2 border-t border-b border-[var(--border)] my-1">
                            <p className="text-xs font-semibold text-[var(--sidebar-foreground)] uppercase tracking-wider">Appearance</p>
                            <div className="flex items-center gap-2 mt-2 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={cn(
                                        "flex-1 flex justify-center p-1.5 rounded-md transition-all",
                                        theme === 'light' ? "bg-[var(--card)] shadow-sm text-[var(--foreground)]" : "text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <Sun size={14} />
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={cn(
                                        "flex-1 flex justify-center p-1.5 rounded-md transition-all",
                                        theme === 'dark' ? "bg-[var(--card)] shadow-sm text-[var(--foreground)]" : "text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <Moon size={14} />
                                </button>
                                <button
                                    onClick={() => setTheme('system')}
                                    className={cn(
                                        "flex-1 flex justify-center p-1.5 rounded-md transition-all",
                                        theme === 'system' ? "bg-[var(--card)] shadow-sm text-[var(--foreground)]" : "text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <Monitor size={14} />
                                </button>
                            </div>
                        </div>

                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-500/10 transition-colors group text-left text-red-500">
                            <LogOut size={16} />
                            <span className="text-sm font-medium">Log out</span>
                        </button>
                    </div>
                )
            }

            {/* Active Project Delete Modal */}
            <AnimatePresence>
                {projectToDelete && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                                        <Trash2 size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-[var(--foreground)]">Delete Project</h2>
                                    </div>
                                    <button
                                        onClick={() => setProjectToDelete(null)}
                                        className="ml-auto text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-4 bg-[var(--muted)]/50 rounded-lg">
                                    <p className="text-[var(--muted-foreground)] text-sm">
                                        Are you sure you want to delete <span className="text-[var(--foreground)] font-medium">{projectToDelete.name}</span>? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        onClick={() => setProjectToDelete(null)}
                                        className="px-4 py-2 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 text-[var(--secondary-foreground)] text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteProject(projectToDelete.id);
                                            setProjectToDelete(null);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer / User Profile */}
            <div className={cn("border-t border-[var(--border)]", isCollapsed ? "p-2" : "p-4")}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowProfileMenu(!showProfileMenu);
                    }}
                    className={cn(
                        "w-full flex items-center gap-3 rounded-xl transition-colors",
                        showProfileMenu ? "bg-[var(--border)]" : "hover:bg-[var(--border)]",
                        isCollapsed ? "justify-center p-1.5" : "p-2"
                    )}
                >
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center font-bold text-xs ring-1 ring-[var(--border)]">
                        SK
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[12px] xl:text-[13px] font-medium truncate">Sahil Kumar</p>
                            <p className="text-[10px] text-[var(--sidebar-foreground)] leading-tight">Pro Plan</p>
                        </div>
                    )}
                    {!isCollapsed && <MoreHorizontal size={14} className="text-[var(--sidebar-foreground)]" />}
                </button>
            </div>
            {/* Explore Modal */}
            <ExploreModal isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} />



            {/* Create Project Modal */}
            {
                isCreateProjectOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 border border-[var(--border)] rounded-lg text-[var(--foreground)]">
                                            <FolderPlus size={20} />
                                        </div>
                                        <h2 className="text-[20px] font-bold">Create New Project</h2>
                                    </div>
                                    <button onClick={() => setIsCreateProjectOpen(false)} className="p-1.5 hover:bg-[var(--border)] rounded-full text-[var(--sidebar-foreground)] transition-colors border border-[var(--border)]">
                                        <X size={20} />
                                    </button>
                                </div>

                                <p className="text-[14px] leading-relaxed text-[var(--sidebar-foreground)] mb-8 opacity-80">
                                    Use projects to organize your files and chats in one place, and add custom instructions for ongoing work.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[16px] font-bold mb-3 block">Project Name</label>
                                        <input
                                            autoFocus
                                            placeholder="What are you working on?"
                                            className="w-full bg-transparent border border-[var(--border)] rounded-2xl px-5 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] transition-all placeholder:text-[var(--sidebar-foreground)]/50"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    createProject(e.target.value.trim());
                                                    setIsCreateProjectOpen(false);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-6 pt-0">
                                <button
                                    onClick={() => setIsCreateProjectOpen(false)}
                                    className="px-6 py-2.5 text-[15px] font-medium hover:bg-[var(--border)] rounded-xl transition-colors border border-[var(--border)]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(e) => {
                                        const input = e.target.closest('.overflow-hidden').querySelector('input');
                                        if (input.value.trim()) {
                                            createProject(input.value.trim());
                                            setIsCreateProjectOpen(false);
                                        }
                                    }}
                                    className="px-6 py-2.5 text-[15px] font-bold bg-[#0a0a0a] text-white rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    Create Project
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )
            }
        </div >
    );
}
