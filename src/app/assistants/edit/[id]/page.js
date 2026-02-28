'use client';

import { useRouter, useParams } from 'next/navigation';
import EditAssistantView from '@/components/edit-assistant-view';
import { useChat } from '@/context/chat-context';

import { STATIC_ASSISTANTS } from '@/lib/assistants-config';

export const dynamic = 'force-dynamic';

export default function EditAssistantPage() {
    const router = useRouter();
    const params = useParams();
    const { customAssistants } = useChat();
    const id = params.id;

    // Resolve assistant data
    let assistant = null;
    let isStatic = false;

    if (id === 'new') {
        assistant = { id: 'new', name: '', description: '', model: 'gpt-4o', actions: [] };
    } else {
        // Check custom assistants first
        assistant = customAssistants.find(a => a.id === id);

        // Then static
        if (!assistant) {
            assistant = STATIC_ASSISTANTS.find(a => a.id === id);
            if (assistant) isStatic = true;
        }

        // Fallback
        if (!assistant) {
            assistant = { id, name: 'Unknown', description: '' };
        }
    }

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-16 bg-[var(--background)]">
            <div className="max-w-4xl mx-auto">
                <EditAssistantView
                    initialAssistant={assistant}
                    isStatic={isStatic}
                    onBack={() => router.back()}
                />
            </div>
        </div>
    );
}
