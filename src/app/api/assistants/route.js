// GET  /api/assistants — List all assistants for the user
// POST /api/assistants — Create a new assistant
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const assistants = await prisma.assistant.findMany({
            where: { userId: auth.userId },
            orderBy: { createdAt: 'desc' },
        });

        return success(assistants);
    } catch (err) {
        console.error('List assistants error:', err);
        return error('Internal server error', 500);
    }
}

export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const body = await request.json();
        const { name, description, instructions, model, temperature, icon, color, actions, models } = body;

        if (!name) {
            return error('Assistant name is required', 400);
        }

        const assistant = await prisma.assistant.create({
            data: {
                name: name.trim(),
                description: description || null,
                instructions: instructions || null,
                model: model || 'gpt-4o',
                temperature: temperature ?? 0.7,
                icon: icon || null,
                color: color || null,
                actions: actions || [],
                models: models || [],
                userId: auth.userId,
            },
        });

        return success(assistant, 201);
    } catch (err) {
        console.error('Create assistant error:', err);
        return error('Internal server error', 500);
    }
}
