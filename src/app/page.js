'use client';

import { useEffect } from 'react';
import ChatInterface from "@/components/chat-interface";
import { useChat } from "@/context/chat-context";

export default function Home() {
  const { setActiveConversationId } = useChat();

  useEffect(() => {
    setActiveConversationId(null);
  }, [setActiveConversationId]);

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <ChatInterface />
    </div>
  );
}
