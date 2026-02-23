// GET  /api/projects — List all projects for the user
// POST /api/projects — Create a new project
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export async function GET(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const projects = await prisma.project.findMany({
            where: { userId: auth.userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { conversations: true } },
            },
        });

        return success(projects);
    } catch (err) {
        console.error('List projects error:', err);
        return error('Internal server error', 500);
    }
}

export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) return error('Unauthorized', 401);

        const body = await request.json();
        const { name, instructions, color, icon } = body;

        if (!name) {
            return error('Project name is required', 400);
        }

        const project = await prisma.project.create({
            data: {
                name: name.trim(),
                instructions: instructions || null,
                color: color || null,
                icon: icon || null,
                userId: auth.userId,
            },
        });

        return success(project, 201);
    } catch (err) {
        console.error('Create project error:', err);
        return error('Internal server error', 500);
    }
}
