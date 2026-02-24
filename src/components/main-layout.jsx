'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import Sidebar from './sidebar';
import SubscriptionModal from './subscription-modal';
import { useEffect } from 'react';

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    useEffect(() => {
        if (loading) return;

        if (!user && !isAuthPage) {
            // Not logged in and not on auth page -> redirect to login with callback
            const callbackUrl = encodeURIComponent(pathname);
            router.push(`/login?callbackUrl=${callbackUrl}`);
        } else if (user && isAuthPage) {
            // Logged in but still on auth page -> only redirect to / if NO callback is present.
            // If a callback is present, we assume the login page is handling the specific redirect.
            const hasCallback = typeof window !== 'undefined' && window.location.search.includes('callbackUrl');
            if (!hasCallback) {
                router.push('/');
            }
        }
    }, [user, loading, isAuthPage, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[var(--background)] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user && !isAuthPage) return null; // Prevent flash of content

    return (
        <div className="flex h-screen w-full bg-[var(--background)] overflow-hidden">
            {!isAuthPage && <Sidebar />}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative">
                {children}
            </main>
            {!isAuthPage && <SubscriptionModal />}
        </div>
    );
}
