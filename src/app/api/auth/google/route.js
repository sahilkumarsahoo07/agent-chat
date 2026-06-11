import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    
    if (!clientId) {
        console.error("GOOGLE_CLIENT_ID is not configured.");
        return NextResponse.redirect(`${request.nextUrl.origin}/login?error=GoogleNotConfigured`);
    }

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile&access_type=online&prompt=consent`;
    
    return NextResponse.redirect(url);
}
