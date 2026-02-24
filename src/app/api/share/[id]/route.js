
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const auth = getAuthUser(request);

        // 1. Require authentication — share links are not public
        if (!auth) {
            return error('Unauthorized', 401);
        }

        const { id } = await params; // This is the shareToken

        // 2. Fetch the shared chat record
        const sharedChat = await prisma.sharedChat.findUnique({
            where: { shareToken: id },
            include: {
                creator: {
                    select: { name: true }
                },
                conversation: {
                    include: {
                        messages: {
                            orderBy: { createdAt: 'asc' }
                        },
                        project: {
                            select: { id: true, name: true, color: true }
                        }
                    }
                }
            }
        });

        if (!sharedChat) {
            return error('Shared chat not found', 404);
        }

        // 3. Check if already used — creator and the original recipient can view
        const isCreator = auth.userId === sharedChat.creatorId;
        const isRecipient = auth.userId === sharedChat.usedBy;

        if (sharedChat.isUsed && !isCreator && !isRecipient) {
            return error('This link has already been used and is no longer valid.', 410); // 410 Gone
        }

        // 4. Mark as USED on first access by a non-creator
        if (!sharedChat.isUsed && !isCreator) {
            const now = new Date();
            await prisma.sharedChat.update({
                where: { id: sharedChat.id },
                data: {
                    isUsed: true,
                    usedBy: auth.userId,
                    expiresAt: now
                }
            });
        }

        // 5. Return enriched conversation data with all message versions and active path
        const allMessages = sharedChat.conversation.messages;
        let activePath = sharedChat.conversation.activePath || [];

        // Auto-heal activePath if empty
        if (activePath.length === 0 && allMessages.length > 0) {
            const latestMsg = allMessages[allMessages.length - 1];
            const path = [latestMsg.id];
            let current = latestMsg;
            while (current.parentId) {
                const parent = allMessages.find(m => m.id === current.parentId);
                if (parent) {
                    path.unshift(parent.id);
                    current = parent;
                } else {
                    break;
                }
            }
            activePath = path;
        }

        const activeMessages = activePath.map(msgId => allMessages.find(m => m.id === msgId)).filter(Boolean);

        return success({
            ...sharedChat.conversation,
            messages: activeMessages,
            allMessages: allMessages,
            activePath: activePath,
            creatorName: sharedChat.creator?.name || 'User',
            sharedAt: sharedChat.createdAt,
            isCreator
        });

    } catch (err) {
        console.error('[API/Share/GET] Error:', err);
        return error('Internal server error', 500);
    }
}
