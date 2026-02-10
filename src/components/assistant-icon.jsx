'use client';

import React from 'react';
import {
    Search,
    Lightbulb,
    Compass,
    Sparkles,
    User,
    LayoutGrid
} from 'lucide-react';

export default function AssistantIcon({ iconId, className = "w-5 h-5" }) {
    switch (iconId) {
        case 'search':
            return <Search className={className} />;
        case 'general':
            return <Lightbulb className={className} />;
        case 'art':
            return <Compass className={className} />;
        case 'sparkles':
            return <Sparkles className={className} />;
        case 'user':
            return <User className={className} />;
        default:
            return <LayoutGrid className={className} />;
    }
}
