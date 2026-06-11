'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

function SyncHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('auth_token', token);
            // Fetch user to update AuthContext state with the new token
            fetchUser(token).then(() => {
                router.push('/');
            });
        } else {
            router.push('/login');
        }
    }, [searchParams, router, fetchUser]);

    return (
        <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-sm font-medium text-white/60 tracking-wider">Syncing your account...</p>
            </div>
        </div>
    );
}

export default function AuthSyncPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
            <SyncHandler />
        </Suspense>
    );
}
