import prisma from '@/lib/prisma';
// Trigger rebuild after schema update
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export async function PUT(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        // Verify ID format (UUID)
        if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
            return error('Invalid ID format', 400);
        }

        const body = await request.json();
        const { name, description, instructions, model, temperature, icon, color, actions, models } = body;

        // Verify ownership
        const existing = await prisma.assistant.findUnique({ where: { id } });
        if (!existing || existing.userId !== auth.userId) {
            return error('Assistant not found or unauthorized', 404);
        }

        const assistant = await prisma.assistant.update({
            where: { id },
            data: {
                name: name ? name.trim() : undefined,
                description: description !== undefined ? description : undefined,
                instructions: instructions !== undefined ? instructions : undefined,
                model: model !== undefined ? model : undefined,
                temperature: temperature !== undefined ? temperature : undefined,
                icon: icon !== undefined ? icon : undefined,
                color: color !== undefined ? color : undefined,
                actions: actions !== undefined ? actions : undefined,
                models: models !== undefined ? models : undefined,
            },
        });

        return success(assistant);
    } catch (err) {
        console.error('Update assistant error:', err);
        return error('Internal server error', 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        // Clean up legacy/invalid IDs (idempotent delete)
        if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
            return success({ message: 'Assistant removed (invalid format)' });
        }

        // Verify ownership
        const existing = await prisma.assistant.findUnique({ where: { id } });

        // If not found, treat as already deleted
        if (!existing) {
            return success({ message: 'Assistant removed (not found)' });
        }

        // Only block if found but wrong user
        if (existing.userId !== auth.userId) {
            return error('Unauthorized', 403);
        }

        await prisma.assistant.delete({
            where: { id },
        });

        return success({ message: 'Assistant deleted' });
    } catch (err) {
        console.error('Delete assistant error:', err);
        return error('Internal server error', 500);
    }
}
