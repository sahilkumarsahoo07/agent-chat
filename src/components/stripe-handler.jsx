'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function StripeSessionHandler({ setPaymentModal }) {
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
