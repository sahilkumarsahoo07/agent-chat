// GET    /api/conversations/[id] — Get a single conversation with messages
// PUT    /api/conversations/[id] — Update conversation (title, pin, model, project)
// DELETE /api/conversations/[id] — Delete conversation and all its messages
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

async function syncProject(projectId, tx) {
    if (!projectId) return;

    // Fetch all conversations currently in this project
    const conversations = await tx.conversation.findMany({
        where: { projectId },
        select: {
            id: true,
            title: true,
            activePath: true,
            updatedAt: true
        }
    });

    const chatIds = conversations.map(c => c.id);
    const chatDetails = conversations.map(c => ({
        id: c.id,
        title: c.title || 'Untitled Chat',
        activePath: c.activePath || [],
        movedAt: c.updatedAt
    }));

    await tx.project.update({
        where: { id: projectId },
        data: { chatIds, chatDetails }
    });
}

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        const conversation = await prisma.conversation.findFirst({
            where: { id, userId: auth.userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
                project: {
                    select: { id: true, name: true, color: true },
                },
            },
        });

        if (conversation) {
            console.log(`[API] GET /conversations/${id} - Found. Messages: ${conversation.messages.length}`);

            // Construct the conversation object with only the active path messages
            // (or all messages if we want to support history rewinds in UI)
            // The UI (Context) currently expects `messages` to be the active ones.
            // And `allMessages` to be everything.

            const allMessages = conversation.messages;
            let activePath = conversation.activePath || [];

            // Auto-heal: If activePath is empty but we have messages, rebuild it sequentially?
            // Only if it's truly empty.
            if (activePath.length === 0 && allMessages.length > 0) {
                // Determine path by tracing back from the latest message
                // This handles branches better than just flattening everything
                const latestMsg = allMessages[allMessages.length - 1];
                const path = [latestMsg.id];
                let current = latestMsg;

                // Trace parents up to root
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

            // Return enriched object
            return success({
                ...conversation,
                messages: activeMessages,
                allMessages: allMessages,
                activePath: activePath
            });
        } else {
            console.log(`[API] GET /conversations/${id} - NOT FOUND for User ${auth.userId}`);
        }

        if (!conversation) {
            return error('Conversation not found', 404);
        }

        return success(conversation);
    } catch (err) {
        console.error('Get conversation error:', err);
        return error('Internal server error', 500);
    }
}

export async function PUT(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();

        // Verify ownership
        const existing = await prisma.conversation.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!existing) {
            return error('Conversation not found', 404);
        }

        const allowedFields = ['title', 'modelId', 'modelName', 'isPinned', 'assistantId', 'projectId', 'activePath'];
        const updateData = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        }

        const conversation = await prisma.$transaction(async (tx) => {
            const oldProjectId = existing.projectId;

            // Perform the update first to get the new state
            const updatedConv = await tx.conversation.update({
                where: { id },
                data: updateData,
                include: { project: true }
            });

            // Resync the project(s) affected
            if (oldProjectId) await syncProject(oldProjectId, tx);
            if (updatedConv.projectId && updatedConv.projectId !== oldProjectId) {
                await syncProject(updatedConv.projectId, tx);
            } else if (updatedConv.projectId) {
                // Even if project didn't change, details like title or path might have
                await syncProject(updatedConv.projectId, tx);
            }

            return updatedConv;
        });

        return success(conversation);
    } catch (err) {
        console.error('Update conversation error:', err);
        return error('Internal server error', 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        // Verify ownership
        const existing = await prisma.conversation.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!existing) {
            return error('Conversation not found', 404);
        }

        // Cascade delete handles messages and shares
        await prisma.$transaction(async (tx) => {
            const oldProjectId = existing.projectId;
            await tx.conversation.delete({ where: { id } });
            if (oldProjectId) await syncProject(oldProjectId, tx);
        });

        return success({ message: 'Conversation deleted successfully' });
    } catch (err) {
        console.error('Delete conversation error:', err);
        return error('Internal server error', 500);
    }
}
