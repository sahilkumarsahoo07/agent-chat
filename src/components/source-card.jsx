import React from 'react';
import { Globe } from 'lucide-react';

export default function SourceCard({ source, index }) {
    return (
        <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)]/50 transition-all cursor-pointer group min-w-[160px] max-w-[160px] h-[100px]"
        >
            <div className="flex flex-col gap-2">
                <div className="text-[11px] text-[var(--sidebar-foreground)] font-medium truncate flex items-center gap-1.5 opacity-80">
                    <Globe size={10} />
                    <span>Source {index + 1}</span>
                </div>
                <h3 className="text-[12px] font-semibold leading-tight line-clamp-2 text-[var(--foreground)] group-hover:text-blue-500 transition-colors">
                    {source.title}
                </h3>
            </div>
            <div className="text-[10px] text-[var(--sidebar-foreground)] truncate opacity-60">
                {new URL(source.url).hostname.replace('www.', '')}
            </div>
        </a>
    );
}
