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

        const tokenCheck = await checkAndDeductTokens(auth.userId);
        if (!tokenCheck.allowed) {
            return new Response(JSON.stringify({ error: tokenCheck.error }), {
                status: 402, // 402 Payment Required
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { messages, model, assistantId, projectInstructions } = await req.json();
        modelId = model;

        // Determine which client to use and refine the model ID
        let finalModel = model || 'arcee-ai/trinity-large-preview:free';

        // Detect if the providing key is an OpenRouter key
        const isOpenRouterKey = process.env.OPENAI_API_KEY?.startsWith('sk-or-');
        let client = openrouter;

        if (finalModel === 'gpt-5-nano') {
            // If it's the custom nano model, use openrouter if the key is OR, 
            // otherwise use openai if it's a real openai key
            client = isOpenRouterKey ? openrouter : openai;
        } else if (finalModel.startsWith('openai/')) {
            // For OpenAI models, decide based on which key is available/provided
            if (!isOpenRouterKey && (process.env.OPENROUTER_API_KEY || !process.env.OPENAI_API_KEY)) {
                client = openrouter;
            } else if (!isOpenRouterKey) {
                client = openai;
                finalModel = finalModel.replace('openai/', '');
            } else {
                // It's an OpenRouter key, so use openrouter client
                client = openrouter;
            }
        }

        const isReasoningModel = finalModel.startsWith('o');
        const isVisionModel = (model) => {
            const m = model.toLowerCase();
            return m.includes('gpt-4') ||
                m.includes('claude-3') ||
                m.includes('gemini-1.5') ||
                m.includes('pixtral') ||
                m.includes('vision') ||
                m.includes('llama-3.2-90b-vision') ||
                m.includes('llama-3.2-11b-vision');
        };

        let searchContext = '';
        let sources = [];

        // Search Logic
        if (assistantId === 'search') {
            const query = messages[messages.length - 1].content;
            console.log('Searching for:', query);

            try {
                const searchResponse = await fetch('https://api.tavily.com/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        api_key: process.env.TAVILY_API_KEY,
                        query: query,
                        search_depth: "basic",
                        include_answer: true,
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
                    content: `You are a helpful AI assistant. Always format code using markdown code blocks. Specify the programming language after the first set of backticks for proper syntax highlighting.${projectInstructions ? `\n\nProject Context:\n${projectInstructions}` : ''}${searchContext ? `\n\nYou have access to the following real-time search results to answer the user's question.Base your answer primarily on these results and cite them using [1], [2] etc. \n${searchContext}` : ''}`
                },
                ...messages.map(m => {
                    if (m.attachment) {
                        if (m.attachment.type.startsWith('image/')) {
                            if (isVisionModel(finalModel)) {
                                return {
                                    role: m.role,
                                    content: [
                                        { type: "text", text: m.content || "Image description request" },
                                        {
                                            type: "image_url",
                                            image_url: {
                                                "url": m.attachment.content,
                                            },
                                        },
                                    ],
                                };
                            } else {
                                return {
                                    role: m.role,
                                    content: `[Attached Image: ${m.attachment.name}]\n(Note: The selected model "${finalModel}" might not support direct image analysis. Here is the image metadata.)\n\nUser Message: ${m.content || 'Please analyze the attached image.'}`,
                                };
                            }
                        } else if (m.attachment.type === 'application/pdf') {
                            return {
                                role: m.role,
                                content: `[Attached PDF: ${m.attachment.name}]\n(Binary Content provided in Data URL format: ${m.attachment.content.substring(0, 100)}...)\n\nUser Message: ${m.content || 'Please analyze the attached PDF.'}`,
                            };
                        } else {
                            return {
                                role: m.role,
                                content: `[Attached File: ${m.attachment.name}]\n\nContent:\n${m.attachment.content}\n\nUser Message: ${m.content || 'Please analyze the attached file.'}`,
                            };
                        }
                    }
                    return {
                        role: m.role,
                        content: m.content,
                    };
                })
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
                        isStreamClosed = true; // Client disconnected
                    }
                };

                try {
                    // Send sources first if available
                    if (sources.length > 0) {
                        const sourceData = JSON.stringify({ sources });
                        safeEnqueue(`__JSON_START__${sourceData}__JSON_END__`);
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
                        } else if (isThinking) {
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
                    if (!isStreamClosed && err.code !== 'ERR_INVALID_STATE') {
                        console.error('Streaming error details:', err);
                        try { controller.error(err); } catch (_) { }
                    }
                } finally {
                    if (!isStreamClosed) {
                        try { controller.close(); } catch (_) { }
                    }
                }
            },
        });

        return new Response(stream);
    } catch (error) {
        console.error('Detailed API Error:', {
            message: error.message,
            status: error.status,
            name: error.name,
            model: modelId
        });
        const isDbError = error.code?.startsWith('P20') || error.message?.includes('Server selection timeout');

        return new Response(JSON.stringify({
            error: isDbError
                ? 'Database connection error. Please check your Atlas IP whitelist and DATABASE_URL.'
                : error.message,
            status: error.status
        }), {
            status: error.status || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
