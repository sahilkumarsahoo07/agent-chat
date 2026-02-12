'use client';

import AuthCard from '@/components/auth-card';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <AuthCard type="login">
            <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                >
                    <label className="text-[11px] font-bold text-white/40 ml-1">Email Address</label>
                    <div className="relative group/input">
                        <input
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
                        <a href="#" className="text-[11px] text-white/20 hover:text-white transition-all font-bold">Forgot?</a>
                    </div>
                    <div className="relative group/input">
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.05] transition-all outline-none relative z-10 font-medium"
                            required
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
                                <span className="text-sm">Sign in to Dashboard</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </div>
                </motion.button>
            </form>
        </AuthCard>
    );
}
