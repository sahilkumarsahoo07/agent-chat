import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;

    if (!code) {
        return NextResponse.redirect(`${request.nextUrl.origin}/login?error=GoogleAuthCanceled`);
    }

    try {
        // 1. Exchange code for token
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            })
        });
        
        const tokenData = await tokenRes.json();
        
        if (!tokenData.id_token) {
            console.error('Failed to get id_token from Google:', tokenData);
            return NextResponse.redirect(`${request.nextUrl.origin}/login?error=GoogleAuthFailed`);
        }

        // 2. Decode id_token to get user info
        const base64Url = tokenData.id_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
        const payload = JSON.parse(jsonPayload);

        const email = payload.email.toLowerCase();
        const name = payload.name;
        const avatar = payload.picture;

        // 3. Find or create user
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Create user with a random dummy password since they use Google
            const dummyPassword = await bcrypt.hash(Math.random().toString(36).slice(-10), 10);
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    avatar,
                    password: dummyPassword
                }
            });
        } else if (!user.avatar && avatar) {
            // Optional: update avatar if they didn't have one
            user = await prisma.user.update({
                where: { email },
                data: { avatar }
            });
        }

        // 4. Generate our custom JWT token
        const token = signToken({ userId: user.id, email: user.email });

        // 5. Redirect back to frontend, passing the token
        return NextResponse.redirect(`${request.nextUrl.origin}/auth/sync?token=${token}`);
        
    } catch (err) {
        console.error('Google callback error:', err);
        return NextResponse.redirect(`${request.nextUrl.origin}/login?error=GoogleCallbackError`);
    }
}
