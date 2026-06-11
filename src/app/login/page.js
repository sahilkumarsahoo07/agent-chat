'use client';

import AuthCard from '@/components/auth-card';
import { useAuth } from '@/context/auth-context';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password, callbackUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard type="login">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                >
                    <label className="text-[11px] font-bold text-white/40 ml-1">Email Address</label>
                    <div className="relative group/input">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            type="email"
                            placeholder="name@example.com"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all outline-none relative z-10 font-medium"
                            required
                        />
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors z-10" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                >
                    <div className="flex items-center justify-between ml-1">
                        <label className="text-[11px] font-bold text-white/40">Password</label>
                    </div>
                    <div className="relative group/input">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all outline-none relative z-10 font-medium"
                            required
                        />
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors z-10" />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors z-20"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group/btn mt-2 active:scale-[0.98] transition-all"
                >
                    <div className="relative flex items-center justify-center gap-2.5 bg-white text-black font-bold py-1.5 rounded-[16px] shadow-[0_10px_30px_-5px_rgba(255,255,255,0.15)] group-hover/btn:shadow-[0_15px_40px_-5px_rgba(255,255,255,0.25)] transition-all duration-300">
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-sm">Sign in to Dashboard</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </div>
                </motion.button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-xs text-white/40">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-white hover:text-white/80 font-bold transition-colors">
                        Sign up
                    </a>
                </p>
            </div>
        </AuthCard>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div />}>
            <LoginForm />
        </Suspense>
    );
}
