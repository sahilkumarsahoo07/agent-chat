import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Agent-Chat",
    }
});

export const runtime = 'edge';

export async function POST(req) {
    let modelId = 'unknown';
    try {
        const { messages, model, assistantId, projectInstructions } = await req.json();
        modelId = model;

        // Determine which client to use and refine the model ID
        let finalModel = model || 'gpt-5-nano';

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
                try {
                    // Send sources first if available
                    if (sources.length > 0) {
                        const sourceData = JSON.stringify({ sources });
                        controller.enqueue(encoder.encode(`__JSON_START__${sourceData}__JSON_END__`));
                    }

                    let isThinking = false;
                    for await (const chunk of response) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        const reasoning = chunk.choices[0]?.delta?.reasoning || chunk.choices[0]?.delta?.reasoning_content || '';

                        if (reasoning) {
                            if (!isThinking) {
                                controller.enqueue(encoder.encode('__THINKING_START__'));
                                isThinking = true;
                            }
                            controller.enqueue(encoder.encode(reasoning));
                        } else if (isThinking) {
                            controller.enqueue(encoder.encode('__THINKING_END__'));
                            isThinking = false;
                        }

                        if (content) {
                            controller.enqueue(encoder.encode(content));
                        }
                    }
                    if (isThinking) {
                        controller.enqueue(encoder.encode('__THINKING_END__'));
                    }
                } catch (err) {
                    console.error('Streaming error details:', err);
                    controller.error(err);
                } finally {
                    controller.close();
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
        return new Response(JSON.stringify({
            error: error.message,
            status: error.status
        }), {
            status: error.status || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
