'use client';

import { useRouter, useParams } from 'next/navigation';
import EditAssistantView from '@/components/edit-assistant-view';
import { useChat } from '@/context/chat-context';

export default function EditAssistantPage() {
    const router = useRouter();
    const params = useParams();
    const { customAssistants } = useChat();
    const id = params.id;

    // Resolve assistant data
    const assistant = id === 'new'
        ? { id: 'new', name: '', description: '', model: 'gpt-4o', actions: [] }
        : customAssistants.find(a => a.id === id) || { id, name: 'Unknown', description: '' };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-16 bg-[var(--background)]">
            <div className="max-w-4xl mx-auto">
                <EditAssistantView
                    initialAssistant={assistant}
                    onBack={() => router.back()}
                />
            </div>
        </div>
    );
}
