// GET /api/auth/me — Get the currently authenticated user profile
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) {
            return error('Invalid or expired token', 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: auth.userId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                plan: true,
                tokens: true,
                tokenResetDate: true,
                createdAt: true,
                _count: {
                    select: {
                        conversations: true,
                        assistants: true,
                        projects: true,
                    },
                },
            },
        });

        if (!user) {
            return error('User not found', 404);
        }

        return success(user);
    } catch (err) {
        console.error('Get me error:', err);
        return error('Internal server error', 500);
    }
}
