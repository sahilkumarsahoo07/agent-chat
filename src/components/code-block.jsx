'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function CodeBlock({ language, value }) {
    const [isCopied, setIsCopied] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = async () => {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div className={cn(
            "my-2 rounded-[12px] border group transition-colors duration-200",
            isDark ? "border-[#2f2f2f] bg-[#0d0d0d]" : "border-gray-200 bg-[#f9f9f9]"
        )}>
            <div className={cn(
                "flex items-center justify-between px-5 py-2.5 sticky top-[0px] z-10 transition-all duration-200 rounded-t-[11px]",
                isDark ? "bg-[#0d0d0d]/95 backdrop-blur-sm" : "bg-[#f9f9f9]/95 backdrop-blur-sm"
            )}>
                <span className={cn(
                    "text-[11px] font-bold uppercase tracking-wider",
                    isDark ? "text-gray-400" : "text-gray-500"
                )}>{language || 'text'}</span>
                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex items-center gap-1.5 text-[11px] font-medium transition-colors hover:opacity-80",
                        isDark ? "text-gray-400" : "text-gray-500"
                    )}
                >
                    {isCopied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-green-500 text-[10px]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span>Copy code</span>
                        </>
                    )}
                </button>
            </div>
            <div className="relative rounded-b-[11px] overflow-hidden">
                <SyntaxHighlighter
                    language={language || 'text'}
                    style={isDark ? vscDarkPlus : oneLight}
                    customStyle={{
                        margin: 0,
                        padding: '0.75rem 1.25rem',
                        background: 'transparent',
                        fontSize: '13.5px',
                        lineHeight: '1.6',
                        fontFamily: 'var(--font-mono), monospace',
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {value || ''}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
