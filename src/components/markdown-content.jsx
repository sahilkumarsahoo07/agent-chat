'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './code-block';
import { cn } from '@/lib/utils';

export default function MarkdownContent({ content, className }) {
    return (
        <div className={cn("markdown-container prose prose-sm dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <CodeBlock
                                language={match[1]}
                                value={String(children).replace(/\n$/, '')}
                                {...props}
                            />
                        ) : (
                            <code className={cn("bg-[var(--border)]/30 px-1.5 py-0.5 rounded text-[13px] font-mono", className)} {...props}>
                                {children}
                            </code>
                        );
                    },
                    p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed text-[15px]">{children}</p>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[var(--border)] pl-4 italic my-4 opacity-80">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6 rounded-xl border border-[var(--border)]">
                            <table className="w-full text-sm text-left">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => <thead className="bg-[var(--border)]/20 text-[var(--sidebar-foreground)]">{children}</thead>,
                    th: ({ children }) => <th className="px-4 py-3 font-semibold border-b border-[var(--border)]">{children}</th>,
                    td: ({ children }) => <td className="px-4 py-3 border-b border-[var(--border)]/50">{children}</td>,
                    hr: () => <hr className="my-8 border-t border-[var(--border)]/50" />,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline transition-all"
                        >
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
