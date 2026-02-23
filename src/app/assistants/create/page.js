'use client';

import { useRouter } from 'next/navigation';
import EditAssistantView from '@/components/edit-assistant-view';

export default function CreateAssistantPage() {
    const router = useRouter();

    // Default empty assistant for creation
    const newAssistant = {
        id: 'new',
        name: '',
        description: '',
        model: 'user_default', // Default to flexible model
        actions: []
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-16 bg-[var(--background)]">
            <div className="max-w-4xl mx-auto">
                <EditAssistantView
                    initialAssistant={newAssistant}
                    onBack={() => router.back()}
                />
            </div>
        </div>
    );
}
