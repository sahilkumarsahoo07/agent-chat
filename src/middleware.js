// Next.js Middleware — JWT Auth Guard
// Protects API routes that require authentication

import { NextResponse } from 'next/server';

// Routes that do NOT require authentication
const PUBLIC_ROUTES = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/google',
    '/api/auth/google/callback',
    '/api/docs',
    '/api/chat',
    '/api/public-sync',
];

// Routes with dynamic segments that are public
const PUBLIC_DYNAMIC_PREFIXES = [
    '/api/share/',
];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only apply to /api routes
    if (!pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Allow public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Allow public dynamic routes (e.g., /api/share/[token])
    for (const prefix of PUBLIC_DYNAMIC_PREFIXES) {
        if (pathname.startsWith(prefix)) {
            return NextResponse.next();
        }
    }

    // Check for Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { success: false, error: 'Authentication required. Please provide a valid Bearer token.' },
            { status: 401 }
        );
    }

    // Token validation is done at the route level using getAuthUser()
    // Middleware just ensures the header exists
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
