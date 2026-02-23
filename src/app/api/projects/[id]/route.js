// GET    /api/projects/[id] — Get a single project with its conversations
// PUT    /api/projects/[id] — Update a project
// DELETE /api/projects/[id] — Delete a project
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export async function GET(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        const project = await prisma.project.findFirst({
            where: { id, userId: auth.userId },
            include: {
                conversations: {
                    orderBy: { updatedAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        modelId: true,
                        modelName: true,
                        isPinned: true,
                        updatedAt: true,
                        _count: { select: { messages: true } },
                    },
                },
            },
        });

        if (!project) {
            return error('Project not found', 404);
        }

        return success(project);
    } catch (err) {
        console.error('Get project error:', err);
        return error('Internal server error', 500);
    }
}

export async function PUT(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;
        const body = await request.json();

        const existing = await prisma.project.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!existing) {
            return error('Project not found', 404);
        }

        const allowedFields = ['name', 'instructions', 'color', 'icon'];
        const updateData = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        }

        const project = await prisma.project.update({
            where: { id },
            data: updateData,
        });

        return success(project);
    } catch (err) {
        console.error('Update project error:', err);
        return error('Internal server error', 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const { id } = await params;

        const existing = await prisma.project.findFirst({
            where: { id, userId: auth.userId },
        });

        if (!existing) {
            return error('Project not found', 404);
        }

        await prisma.project.delete({ where: { id } });

        return success({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error('Delete project error:', err);
        return error('Internal server error', 500);
    }
}
