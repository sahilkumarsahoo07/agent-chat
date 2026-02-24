// POST /api/auth/register — Create a new user account
import prisma from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        // Validate required fields
        if (!email || !name || !password) {
            return error('Email, name, and password are required', 400);
        }

        if (password.length < 6) {
            return error('Password must be at least 6 characters', 400);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return error('An account with this email already exists', 409);
        }

        // Create user with hashed password
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase().trim(),
                name: name.trim(),
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                plan: true,
                tokens: true,
                tokenResetDate: true,
                createdAt: true,
            },
        });

        // Generate JWT token
        const token = signToken({ userId: user.id, email: user.email });

        return success({ user, token }, 201);
    } catch (err) {
        console.error('Register error:', err);
        return error('Internal server error', 500);
    }
}
