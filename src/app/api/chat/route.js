import { OpenAI } from 'openai';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { checkAndDeductTokens } from '@/lib/token-utils';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'https://agent-chat.app', // Optional, for OpenRouter rankings
        'X-Title': 'Agent Chat', // Optional, for OpenRouter rankings
    },
});

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    let modelId = 'unknown';
    try {
        const auth = getAuthUser(req);
        if (!auth) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate API keys exist
        if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
            console.error('Missing API Keys: Neither OPENAI_API_KEY nor OPENROUTER_API_KEY is set.');
            return new Response(JSON.stringify({
                error: 'AI service configuration is missing. Please check your environment variables.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const tokenCheck = await checkAndDeductTokens(auth.userId);
        if (!tokenCheck.allowed) {
            return new Response(JSON.stringify({
                error: tokenCheck.error,
                resetTime: tokenCheck.resetTime
            }), {
                status: 402,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const body = await req.json();
        const { messages, model, assistantId, projectInstructions } = body;

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Messages must be an array' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        modelId = model;

        // Determine which client to use and refine the model ID
        let finalModel = model || 'arcee-ai/trinity-large-preview:free';
        const isOpenRouterKey = process.env.OPENAI_API_KEY?.startsWith('sk-or-');
        let client = openrouter;

        if (finalModel === 'gpt-5-nano') {
            client = isOpenRouterKey ? openrouter : openai;
        } else if (finalModel.startsWith('openai/')) {
            if (!isOpenRouterKey && (process.env.OPENROUTER_API_KEY || !process.env.OPENAI_API_KEY)) {
                client = openrouter;
            } else if (!isOpenRouterKey) {
                client = openai;
                finalModel = finalModel.replace('openai/', '');
            } else {
                client = openrouter;
            }
        }

        const isReasoningModel = finalModel.startsWith('o');
        const isVisionModel = (model) => {
            const m = model.toLowerCase();
            return m.includes('gpt-4') || m.includes('claude-3') || m.includes('gemini-1.5') || m.includes('pixtral') || m.includes('vision');
        };

        let searchContext = '';
        let sources = [];

        if (assistantId === 'search') {
            const query = messages[messages.length - 1].content;
            try {
                const searchResponse = await fetch('https://api.tavily.com/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        api_key: process.env.TAVILY_API_KEY,
                        query: query,
                        max_results: 5
                    })
                });
                const searchData = await searchResponse.json();
                sources = searchData.results || [];
                if (sources.length > 0) {
                    searchContext = `\n\nSearch Results:\n${sources.map((s, i) => `[${i + 1}] ${s.title}: ${s.content}`).join('\n')}\n\nUser Question: ${query}`;
                }
            } catch (error) {
                console.error('Search failed:', error);
            }
        }

        const response = await client.chat.completions.create({
            model: finalModel,
            messages: [
                {
                    role: isReasoningModel ? 'developer' : 'system',
                    content: `You are a helpful AI assistant. Always provide comprehensive, detailed answers. If you are writing code, explain the logic. ${projectInstructions ? `\n\nProject Context:\n${projectInstructions}` : ''}${searchContext ? `\n\nSearch Results:\n${searchContext}` : ''}`
                },
                ...messages.map(m => ({
                    role: m.role,
                    content: m.content || (m.attachment ? `[Attached File: ${m.attachment.name}]` : '')
                }))
            ],
            stream: true,
            max_tokens: 8192,
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let isStreamClosed = false;

                const safeEnqueue = (text) => {
                    if (isStreamClosed) return;
                    try {
                        controller.enqueue(encoder.encode(text));
                    } catch (e) {
                        isStreamClosed = true;
                    }
                };

                try {
                    if (sources.length > 0) {
                        safeEnqueue(`__JSON_START__${JSON.stringify({ sources })}__JSON_END__`);
                    }

                    let isThinking = false;
                    for await (const chunk of response) {
                        if (isStreamClosed) break;

                        const content = chunk.choices[0]?.delta?.content || '';
                        const reasoning = chunk.choices[0]?.delta?.reasoning || chunk.choices[0]?.delta?.reasoning_content || '';

                        if (reasoning) {
                            if (!isThinking) {
                                safeEnqueue('__THINKING_START__');
                                isThinking = true;
                            }
                            safeEnqueue(reasoning);
                        } else if (isThinking && content) {
                            // Only end thinking if content actually starts
                            safeEnqueue('__THINKING_END__');
                            isThinking = false;
                        }

                        if (content) {
                            safeEnqueue(content);
                        }
                    }
                    if (isThinking && !isStreamClosed) {
                        safeEnqueue('__THINKING_END__');
                    }
                } catch (err) {
                    console.error('Stream processing error:', err);
                    if (!isStreamClosed) try { controller.error(err); } catch (_) { }
                } finally {
                    if (!isStreamClosed) try { controller.close(); } catch (_) { }
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        const isDbError = error.code?.startsWith('P20') || error.message?.includes('Server selection timeout');
        const isAuthError = error.message?.includes('API key');

        return new Response(JSON.stringify({
            error: isDbError
                ? 'Database connection error. Please check your Atlas IP whitelist.'
                : isAuthError
                    ? 'AI Service Authentication error. Please check your API keys.'
                    : error.message,
            status: error.status || 500
        }), {
            status: error.status || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
