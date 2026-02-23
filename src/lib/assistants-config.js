export const STATIC_ASSISTANTS = [
    {
        id: 'search',
        name: 'Search',
        description: 'Assistant with access to documents and knowledge from Connected Sources.',
        iconId: 'search',
        author: 'Agent',
        actions: ['search'], // Unified format: array of action IDs
        visibility: 'Public',
        model: 'gpt-4o'
    },
    {
        id: 'general',
        name: 'General',
        description: 'Assistant with no search functionalities. Chat directly with the Large Language Model.',
        iconId: 'general',
        author: 'Agent',
        actions: [],
        visibility: 'Public',
        model: 'gpt-4o'
    },
    {
        id: 'art',
        name: 'Art',
        description: 'Assistant for generating images based on descriptions.',
        iconId: 'art',
        author: 'Agent',
        actions: ['image_gen'],
        visibility: 'Public',
        model: 'gpt-4o'
    }
];

export const ASSISTANT_ICONS = {
    search: 'search',
    general: 'general',
    art: 'art',
    sparkles: 'sparkles',
    user: 'user'
};

export const MODELS = [
    { name: 'Default Model', iconId: 'sparkles', model: 'user_default' },
    { name: 'Grok 4.1 Fast', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-4.1-fast' },
    { name: 'Grok 4.1 Code', icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=128", model: 'x-ai/grok-code-fast-1' },
    { name: 'DeepSeek V3.2', icon: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=128", model: 'deepseek/deepseek-v3.2' },
    { name: 'Solar Pro', icon: "https://www.google.com/s2/favicons?domain=upstage.ai&sz=128", model: 'upstage/solar-pro-3:free' },
    { name: 'GPT-5 Nano', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'gpt-5-nano', hasReasoning: true },
    { name: 'GPT-4o Mini', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o-mini' },
    { name: 'GPT-4o', icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", model: 'openai/gpt-4o' },
    { name: 'Trinity Large', icon: "https://www.google.com/s2/favicons?domain=arcee.ai&sz=128", model: 'arcee-ai/trinity-large-preview:free' },
    { name: 'DeepSeek Chimera', icon: "https://www.google.com/s2/favicons?domain=tngtech.com&sz=128", model: 'tngtech/deepseek-r1t-chimera:free', hasReasoning: true },
    { name: 'NVIDIA Nemotron', icon: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
    { name: 'Claude 3.5 Sonnet', icon: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", model: 'anthropic/claude-3.5-sonnet' },
    { name: 'Llama 3.1 8B', icon: "https://www.google.com/s2/favicons?domain=meta.com&sz=128", model: 'meta-llama/llama-3.1-8b-instruct' },
];
