// POST   /api/projects/[id]/chats — Add a conversation to a project
// DELETE /api/projects/[id]/chats — Remove a conversation from a project
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();
        const { conversationId } = body;

        if (!conversationId) {
            return error('conversationId is required', 400);
        }

        // Verify project ownership
        const project = await prisma.project.findFirst({
            where: { id, userId: auth.userId },
        });
        if (!project) return error('Project not found', 404);

        // Verify conversation ownership
        const conversation = await prisma.conversation.findFirst({
            where: { id: conversationId, userId: auth.userId },
        });
        if (!conversation) return error('Conversation not found', 404);

        // Assign conversation to project
        const updated = await prisma.conversation.update({
            where: { id: conversationId },
            data: { projectId: id },
        });

        return success(updated);
    } catch (err) {
        console.error('Add chat to project error:', err);
        return error('Internal server error', 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const conversationId = searchParams.get('conversationId');

        if (!conversationId) {
            return error('conversationId query parameter is required', 400);
        }

        // Verify project ownership
        const project = await prisma.project.findFirst({
            where: { id, userId: auth.userId },
        });
        if (!project) return error('Project not found', 404);

        // Remove conversation from project
        const updated = await prisma.conversation.update({
            where: { id: conversationId },
            data: { projectId: null },
        });

        return success(updated);
    } catch (err) {
        console.error('Remove chat from project error:', err);
        return error('Internal server error', 500);
    }
}
