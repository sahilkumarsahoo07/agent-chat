import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

// POST /api/messages
// Save a new message to a conversation
export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) {
            return error('Unauthorized', 401);
        }

        const { userId } = auth;
        const body = await request.json();
        const { conversationId, content, role, modelName, parentId, siblingIds, reasoning, sources, attachmentName, attachmentType, attachmentContent, isStreaming } = body;

        if (!conversationId || !role) {
            return error('Missing required fields', 400);
        }

        // Verify conversation ownership and get current activePath
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                userId: userId,
            },
            select: {
                id: true,
                activePath: true,
            }
        });

        if (!conversation) {
            return error('Conversation not found', 404);
        }

        // Use transaction to ensure message creation and path update are atomic
        const result = await prisma.$transaction(async (tx) => {
            // 1. Fetch existing siblings to sync siblingIds
            let siblingIds = [];
            // Find messages with the same parentId (including null for root messages)
            const existingSiblings = await tx.message.findMany({
                where: {
                    conversationId,
                    parentId: parentId || null
                },
                select: { id: true }
            });
            siblingIds = existingSiblings.map(s => s.id);

            // 2. Create the new message
            const message = await tx.message.create({
                data: {
                    conversationId,
                    role,
                    content: content || '',
                    modelName,
                    parentId,
                    siblingIds, // Point to existing siblings
                    reasoning,
                    sources,
                    attachmentName,
                    attachmentType,
                    attachmentContent,
                    isStreaming: isStreaming || false,
                },
            });

            // 3. Update existing siblings to point to this new message
            // Prisma's updateMany doesn't support 'push' directly on arrays in PostgreSQL easily via the high-level API for all drivers
            // The most reliable way is to iterate or use raw SQL. For small sibling counts, individual updates are safe in a transaction.
            for (const siblingId of siblingIds) {
                await tx.message.update({
                    where: { id: siblingId },
                    data: {
                        siblingIds: {
                            push: message.id
                        }
                    }
                });
            }

            // 4. Update activePath
            let newPath = [...(conversation.activePath || [])];

            if (parentId) {
                const parentIndex = newPath.indexOf(parentId);
                if (parentIndex !== -1) {
                    // Branching: Keep path up to parent, then add new message
                    newPath = [...newPath.slice(0, parentIndex + 1), message.id];
                } else {
                    // Fallback: Append if parent not found in active path (shouldn't happen often)
                    newPath.push(message.id);
                }
            } else {
                // Root message (no parent). This implies a new branch starting from root.
                // We should reset the path to start with this message.
                newPath = [message.id];
            }

            // Ensure uniqueness
            newPath = [...new Set(newPath)];

            await tx.conversation.update({
                where: { id: conversationId },
                data: { activePath: newPath }
            });

            return message;
        });

        return success(result, 201);

    } catch (err) {
        console.error('Error saving message:', err);
        return error('Internal Server Error', 500);
    }
}
