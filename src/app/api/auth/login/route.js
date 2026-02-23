// POST /api/auth/login — Authenticate user and return JWT
import prisma from '@/lib/prisma';
import { verifyPassword, signToken } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return error('Email and password are required', 400);
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            return error('Invalid email or password', 401);
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return error('Invalid email or password', 401);
        }

        // Generate JWT token
        const token = signToken({ userId: user.id, email: user.email });

        return success({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
            token,
        });
    } catch (err) {
        console.error('Login error:', err);
        return error('Internal server error', 500);
    }
}
