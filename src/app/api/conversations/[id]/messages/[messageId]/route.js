import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id: conversationId, messageId } = await params;
        const body = await request.json();
        const { content, reasoning } = body;

        // Verify conversation ownership
        const conversation = await prisma.conversation.findFirst({
            where: { id: conversationId, userId: auth.userId },
        });

        if (!conversation) {
            return error('Conversation not found', 404);
        }

        // Update the message
        const updatedMessage = await prisma.message.update({
            where: {
                id: messageId,
                conversationId: conversationId // Extra safety
            },
            data: {
                content: content !== undefined ? content : undefined,
                reasoning: reasoning !== undefined ? reasoning : undefined,
            },
        });

        // Update conversation's updatedAt timestamp
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
        });

        return success(updatedMessage);
    } catch (err) {
        console.error('Update message error:', err);
        return error('Internal server error', 500);
    }
}
