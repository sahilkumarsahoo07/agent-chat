import { Suspense } from 'react';
import ChatInterface from "@/components/chat-interface";

export default function ChatPage() {
    return (
        <div className="flex-1 flex flex-col min-h-0 h-full">
            <Suspense fallback={<div className="flex-1 animate-pulse bg-zinc-900/50" />}>
                <ChatInterface />
            </Suspense>
        </div>
    );
}
