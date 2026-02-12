'use client';

import Sidebar from './sidebar';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    return (
        <div className="flex h-screen w-full bg-[var(--background)] overflow-hidden">
            {!isAuthPage && <Sidebar />}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative">
                {children}
            </main>
        </div>
    );
}
