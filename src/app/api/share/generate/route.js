import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { success, error } from '@/lib/api-helpers';
import { randomUUID } from 'crypto';

export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const body = await request.json();
        const { conversationId } = body;

        if (!conversationId) {
            return error('Conversation ID is required', 400);
        }

        const conversation = await prisma.conversation.findFirst({
            where: { id: conversationId, userId: auth.userId }
        });

        if (!conversation) {
            return error('Conversation not found', 404);
        }

        const shareToken = randomUUID();

        const share = await prisma.sharedChat.create({
            data: {
                shareToken: shareToken,
                conversationId: conversationId,
                creatorId: auth.userId,
                isPublic: true,
                isUsed: false,
                usedBy: null,
                expiresAt: null
            }
        });

        return success({ shareToken, id: share.id });
    } catch (err) {
        console.error('[API/Share/Generate] Error:', err);
        return error(`Internal server error: ${err.message}`, 500);
    }
}
