export const STATIC_ASSISTANTS = [
    {
        id: 'search',
        name: 'Search',
        description: 'Assistant with access to documents and knowledge from Connected Sources.',
        iconId: 'search',
        author: 'Agent',
        actions: ['search'], // Unified format: array of action IDs
        visibility: 'Public',
        model: 'arcee-ai/trinity-large-preview:free'
    },
    {
        id: 'general',
        name: 'General',
        description: 'Assistant with no search functionalities. Chat directly with the Large Language Model.',
        iconId: 'general',
        author: 'Agent',
        actions: [],
        visibility: 'Public',
        model: 'arcee-ai/trinity-large-preview:free'
    },
    {
        id: 'art',
        name: 'Art',
        description: 'Assistant for generating images based on descriptions.',
        iconId: 'art',
        author: 'Agent',
        actions: ['image_gen'],
        visibility: 'Public',
        model: 'arcee-ai/trinity-large-preview:free'
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
    { name: 'Solar Pro', icon: "https://www.google.com/s2/favicons?domain=upstage.ai&sz=128", model: 'upstage/solar-pro-3:free' },
    { name: 'Trinity Large', icon: "https://www.google.com/s2/favicons?domain=arcee.ai&sz=128", model: 'arcee-ai/trinity-large-preview:free' },
    { name: 'NVIDIA Nemotron', icon: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
    { name: 'Step 3.5 Flash', icon: "https://www.google.com/s2/favicons?domain=stepfun.com&sz=128", model: 'stepfun/step-3.5-flash:free' },
    { name: 'DeepSeek Chimera', icon: "https://www.google.com/s2/favicons?domain=tngtech.com&sz=128", model: 'tngtech/deepseek-r1t-chimera:free', hasReasoning: true },
];


