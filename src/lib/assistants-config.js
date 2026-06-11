export let MODELS = [];
if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_AI_MODELS) {
    try {
        MODELS = JSON.parse(process.env.NEXT_PUBLIC_AI_MODELS);
    } catch (e) {
        console.error("Failed to parse NEXT_PUBLIC_AI_MODELS environment variable.", e);
    }
}

const defaultModelId = MODELS.length > 0 ? MODELS[0].model : 'default-model';

export const STATIC_ASSISTANTS = [
    {
        id: 'search',
        name: 'Search',
        description: 'Assistant with access to documents and knowledge from Connected Sources.',
        iconId: 'search',
        author: 'Agent',
        actions: ['search'], // Unified format: array of action IDs
        visibility: 'Public',
        model: defaultModelId
    },
    {
        id: 'general',
        name: 'General',
        description: 'Assistant with no search functionalities. Chat directly with the Large Language Model.',
        iconId: 'general',
        author: 'Agent',
        actions: [],
        visibility: 'Public',
        model: defaultModelId
    },
    {
        id: 'art',
        name: 'Art',
        description: 'Assistant for generating images based on descriptions.',
        iconId: 'art',
        author: 'Agent',
        actions: ['image_gen'],
        visibility: 'Public',
        model: defaultModelId
    }
];

export const ASSISTANT_ICONS = {
    search: 'search',
    general: 'general',
    art: 'art',
    sparkles: 'sparkles',
    user: 'user'
};
