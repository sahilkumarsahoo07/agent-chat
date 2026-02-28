'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import Sidebar from './sidebar';
import SubscriptionModal from './subscription-modal';
import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

function StripeSessionHandler({ setPaymentModal }) {
    const searchParams = useSearchParams();
    const { fetchUser, token } = useAuth();

    useEffect(() => {
        const success = searchParams.get('upgrade_success');
        const session_id = searchParams.get('session_id');
        const cancelled = searchParams.get('upgrade_cancelled');

        if (success === 'true') {
            const verifyAndFetch = async () => {
                if (session_id && token) {
                    try {
                        await fetch('/api/stripe/verify-session', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({ sessionId: session_id })
                        });
                    } catch (err) {
                        console.error('Session verify failed:', err);
                    }
                }

                if (token) await fetchUser(token);
                setPaymentModal({ isOpen: true, status: 'success' });

                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            };

            verifyAndFetch();
        } else if (cancelled === 'true') {
            setPaymentModal({ isOpen: true, status: 'cancelled' });

            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, [searchParams, fetchUser, token, setPaymentModal]);

    return null;
}

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();

    // Manage Payment Result Modal State
    const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: null });

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
            <Suspense fallback={null}>
                <StripeSessionHandler setPaymentModal={setPaymentModal} />
            </Suspense>
            {!isAuthPage && <Sidebar />}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative">
                {children}
            </main>
            {!isAuthPage && <SubscriptionModal />}

            {/* Payment Result Modal */}
            <AnimatePresence>
                {paymentModal.isOpen && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 flex flex-col items-center text-center">
                                <button
                                    onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                                    className="absolute top-4 right-4 p-2 hover:bg-[var(--border)] rounded-full transition-colors text-[var(--sidebar-foreground)]"
                                >
                                    <X size={16} />
                                </button>

                                {paymentModal.status === 'success' ? (
                                    <>
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">Upgrade Successful!</h3>
                                        <p className="text-[14px] text-[var(--muted-foreground)] mb-6">
                                            Your payment went through and your account has been upgraded. Enjoy your new features!
                                        </p>
                                        <button
                                            onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors"
                                        >
                                            Start Chatting
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                                            <XCircle className="w-8 h-8 text-rose-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">Upgrade Cancelled</h3>
                                        <p className="text-[14px] text-[var(--muted-foreground)] mb-6">
                                            Your checkout process was cancelled. You haven't been charged.
                                        </p>
                                        <button
                                            onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                                            className="w-full py-2.5 bg-[var(--border)] hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] rounded-xl font-bold transition-colors"
                                        >
                                            Close
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
