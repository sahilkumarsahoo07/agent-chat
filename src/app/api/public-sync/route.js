import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('Starting project sync via public API...');
        const projects = await prisma.project.findMany();

        let syncedCount = 0;

        for (const project of projects) {
            const conversations = await prisma.conversation.findMany({
                where: { projectId: project.id },
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

            await prisma.project.update({
                where: { id: project.id },
                data: { chatIds, chatDetails }
            });
            syncedCount++;
            console.log(`Synced Project: ${project.name} (${project.id}) - ${chatIds.length} chats`);
        }

        return NextResponse.json({ success: true, message: `Synced ${syncedCount} projects.` });
    } catch (error) {
        console.error('Sync failed:', error);
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 200 });
    }
}
