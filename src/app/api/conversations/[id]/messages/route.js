// GET  /api/conversations/[id]/messages — List all messages for a conversation
// POST /api/conversations/[id]/messages — Create a new message in a conversation
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        if (!id) {
            console.error('Missing conversation ID in request');
            return error('Conversation ID is required', 400);
        }

        console.log(`[API] GET /conversations/${id}/messages - User ${auth.userId}`);

        // Verify conversation ownership
        const conversation = await prisma.conversation.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!conversation) {
            console.error(`Conversation not found: ${id}`);
            return error('Conversation not found', 404);
        }

        const messages = await prisma.message.findMany({
            where: { conversationId: id },
            orderBy: { createdAt: 'asc' },
        });

        console.log(`Found ${messages.length} messages for conversation ${id}`);
        return success(messages);
    } catch (err) {
        console.error('List messages error:', err);
        return error('Internal server error', 500);
    }
}

export async function POST(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();
        console.log(`[API] POST /conversations/${id}/messages - User ${auth.userId} - Body:`, JSON.stringify(body));
        const { role, content, reasoning, modelName, parentId, siblingIds, attachmentName, attachmentType, sources } = body;

        // Validate required fields
        if (!role || content === undefined) {
            return error('Role and content are required', 400);
        }

        // Verify conversation ownership
        const conversation = await prisma.conversation.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!conversation) {
            return error('Conversation not found', 404);
        }

        // Automatic Sibling Linking
        let linkedSiblingIds = siblingIds || [];
        if (parentId) {
            // Find existing siblings
            const siblings = await prisma.message.findMany({
                where: { conversationId: id, parentId },
                select: { id: true, siblingIds: true }
            });

            if (siblings.length > 0) {
                const existingSiblingIds = siblings.map(s => s.id);
                linkedSiblingIds = [...existingSiblingIds];

                // Sibling linking will be handled in the transaction below
            }
        }

        const message = await prisma.$transaction(async (tx) => {
            const newMessage = await tx.message.create({
                data: {
                    role,
                    content,
                    reasoning: reasoning || null,
                    modelName: modelName || null,
                    parentId: parentId || null,
                    siblingIds: linkedSiblingIds,
                    attachmentName: attachmentName || null,
                    attachmentType: attachmentType || null,
                    sources: sources || undefined,
                    conversationId: id,
                },
            });

            if (parentId && linkedSiblingIds.length > 0) {
                // Update each sibling to include the new message ID in their array
                for (const sibId of linkedSiblingIds) {
                    const sib = await tx.message.findUnique({ where: { id: sibId }, select: { siblingIds: true } });
                    const updatedSibs = Array.from(new Set([...(sib.siblingIds || []), newMessage.id]));
                    await tx.message.update({
                        where: { id: sibId },
                        data: { siblingIds: updatedSibs }
                    });
                }
            }
            return newMessage;
        });

        // Update conversation's updatedAt timestamp
        await prisma.conversation.update({
            where: { id },
            data: { updatedAt: new Date() },
        });

        return success(message, 201);
    } catch (err) {
        process.stdout.write(`[DEBUG] Message creation error: ${err.message}\n`);
        const fs = require('fs');
        fs.appendFileSync('api-debug.log', `[${new Date().toISOString()}] POST messages id=${id} error=${err.message}\n${err.stack}\n`);
        console.error('Create message error:', err);
        return error('Internal server error', 500);
    }
}
