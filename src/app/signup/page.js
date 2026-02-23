'use client';

import AuthCard from '@/components/auth-card';
import { useAuth } from '@/context/auth-context';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignupPage() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(email, name, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard type="signup">
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
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                >
                    <label className="text-[11px] font-bold text-white/40 ml-1">Full Name</label>
                    <div className="relative group/input">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all outline-none relative z-10 font-medium"
                            required
                        />
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors z-10" />
                    </div>
                </motion.div>

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
                            onChange={(e) => setEmail(e.target.value)}
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
                    <label className="text-[11px] font-bold text-white/40 ml-1">Password</label>
                    <div className="relative group/input">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all outline-none relative z-10 font-medium"
                            required
                            minLength={6}
                        />
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-white transition-colors z-10" />
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
                                <span className="text-sm">Create Account</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </div>
                </motion.button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-xs text-white/40">
                    Already have an account?{' '}
                    <a href="/login" className="text-white hover:text-white/80 font-bold transition-colors">
                        Sign in
                    </a>
                </p>
            </div>
        </AuthCard>
    );
}
