import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

// PUT /api/messages/[id] - Update message content
// DELETE /api/messages/[id] - Delete message
export async function PUT(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();
        const { content } = body;

        // Verify ownership (via conversation)
        const message = await prisma.message.findUnique({
            where: { id },
            include: { conversation: true },
        });

        if (!message) return error('Message not found', 404);
        if (message.conversation.userId !== auth.userId) return error('Unauthorized', 403);

        const updated = await prisma.message.update({
            where: { id },
            data: { content },
        });

        return success(updated);
    } catch (err) {
        console.error('Update message error:', err);
        return error('Internal server error', 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        const message = await prisma.message.findUnique({
            where: { id },
            include: { conversation: true },
        });

        if (!message) return error('Message not found', 404);
        if (message.conversation.userId !== auth.userId) return error('Unauthorized', 403);

        await prisma.message.delete({ where: { id } });

        return success({ message: 'Message deleted' });
    } catch (err) {
        console.error('Delete message error:', err);
        return error('Internal server error', 500);
    }
}

export async function PATCH(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();
        const { rating } = body;

        console.log(`[API] PATCH /api/messages/${id}/rating - Rating: ${rating}`);

        // Fast UUID format check to prevent Prisma from throwing on malformed IDs
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.warn(`[API] PATCH /api/messages/${id}/rating - Invalid UUID format`);
            return error('Invalid message ID format', 400);
        }

        // Verify ownership
        let message;
        try {
            message = await prisma.message.findUnique({
                where: { id },
                include: { conversation: true },
            });
        } catch (prismaErr) {
            console.error('[API] Prisma error finding message:', prismaErr);
            return error('Database error looking up message', 500);
        }

        if (!message) {
            console.warn(`[API] PATCH /api/messages/${id}/rating - Message not found`);
            return error('Message not found', 404);
        }

        if (message.conversation.userId !== auth.userId) {
            console.warn(`[API] PATCH /api/messages/${id}/rating - Unauthorized: User ${auth.userId} does not own message`);
            return error('Unauthorized', 403);
        }

        try {
            const updated = await prisma.message.update({
                where: { id },
                data: { rating },
            });
            return success(updated);
        } catch (updateErr) {
            console.error('[API] Prisma error updating rating:', updateErr);
            return error('Failed to save rating to database', 500);
        }
    } catch (err) {
        console.error('Update message rating error:', err);
        return error('Internal server error', 500);
    }
}
