'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/context/toast-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const PLANS = [
    {
        id: 'FREE',
        name: 'Free',
        price: '₹0',
        period: '/month',
        tokens: 10,
        features: [
            'Basic AI models',
            '10 daily tokens',
            'Standard support',
            'Community access'
        ],
        buttonText: 'Current Plan',
        isPopular: false
    },
    {
        id: 'PLUS',
        name: 'Plus',
        price: '₹499',
        period: '/month',
        tokens: 500,
        features: [
            'Advanced AI models (GPT-4o, Claude 3.5)',
            '500 daily tokens',
            'Priority support',
            'Custom integrations',
            'Create custom assistants'
        ],
        buttonText: 'Upgrade to Plus',
        isPopular: true
    },
    {
        id: 'PRO',
        name: 'Pro',
        price: '₹1499',
        period: '/month',
        tokens: 2000,
        features: [
            'All Plus features',
            '2000 daily tokens',
            '24/7 Priority support',
            'Custom onboarding',
            'Advanced data analytics',
            'Early access to new features'
        ],
        buttonText: 'Upgrade to Pro',
        isPopular: false
    }
];

export default function SubscriptionModal() {
    const { user, token, fetchUser } = useAuth();
    const { showToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(null); // stores the id of the plan being upgraded to

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-subscription-modal', handleOpen);
        return () => window.removeEventListener('open-subscription-modal', handleOpen);
    }, []);

    const handleUpgrade = async (planId) => {
        if (!token) return;
        setIsLoading(planId);

        try {
            // Mocking payment delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ plan: planId })
            });

            const data = await res.json();

            if (data.success) {
                showToast(`Successfully upgraded to ${planId} plan!`, 'success');
                fetchUser(); // Refresh user data to get new token balance
                setIsOpen(false);
            } else {
                showToast(data.error || 'Upgrade failed', 'error');
            }
        } catch (error) {
            console.error('Upgrade error:', error);
            showToast('An error occurred during upgrade', 'error');
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !isLoading && setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/90 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">Upgrade Your Plan</h2>
                                    <p className="text-sm text-[var(--muted-foreground)]">Get more tokens and unlock powerful AI models.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => !isLoading && setIsOpen(false)}
                                className="p-2 hover:bg-[var(--border)] rounded-full transition-colors text-[var(--sidebar-foreground)]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 overflow-y-auto w-full custom-scrollbar flex-1 bg-[var(--sidebar-bg)]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {PLANS.map((plan) => {
                                    const isCurrentPlan = user?.plan === plan.id || (!user?.plan && plan.id === 'FREE');
                                    return (
                                        <div
                                            key={plan.id}
                                            className={cn(
                                                "relative flex flex-col p-6 rounded-2xl border transition-all duration-300",
                                                plan.isPopular
                                                    ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-[var(--card)] md:-mt-4 md:mb-4"
                                                    : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)]",
                                                isCurrentPlan && "ring-2 ring-[var(--foreground)]"
                                            )}
                                        >
                                            {plan.isPopular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                                    Most Popular
                                                </div>
                                            )}

                                            <div className="mb-6">
                                                <h3 className="text-lg font-bold text-[var(--foreground)]">{plan.name}</h3>
                                                <div className="mt-2 flex items-baseline gap-1">
                                                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                                                    <span className="text-sm text-[var(--muted-foreground)] font-medium">{plan.period}</span>
                                                </div>
                                                <p className="mt-2 text-sm text-[var(--muted-foreground)] font-medium">
                                                    {plan.tokens} tokens / day
                                                </p>
                                            </div>

                                            <ul className="flex-1 space-y-3 mb-8">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="p-0.5 rounded-full bg-green-500/10 text-green-500 shrink-0 mt-0.5">
                                                            <Check size={14} strokeWidth={3} />
                                                        </div>
                                                        <span className="text-sm text-[var(--foreground)]">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <button
                                                disabled={isCurrentPlan || isLoading !== null}
                                                onClick={() => handleUpgrade(plan.id)}
                                                className={cn(
                                                    "w-full py-3 px-4 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--background)] flex items-center justify-center min-h-[48px]",
                                                    isCurrentPlan
                                                        ? "bg-[var(--border)] text-[var(--sidebar-foreground)] cursor-default"
                                                        : plan.isPopular
                                                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                                                            : "bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-[var(--background)]",
                                                    isLoading === plan.id && "bg-[var(--foreground)]/80 cursor-not-allowed"
                                                )}
                                            >
                                                {isLoading === plan.id ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : isCurrentPlan ? (
                                                    'Current Plan'
                                                ) : (
                                                    plan.buttonText
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 text-center text-xs text-[var(--muted-foreground)] opacity-70">
                                Tokens automatically reset every 24 hours based on your plan tier.
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
