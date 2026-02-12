import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { ShaderAnimation } from './ui/shader-animation';

export default function AuthCard({ type, children }) {
    const isLogin = type === 'login';

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#030303]">
            {/* Dynamic Shader Background */}
            <div className="fixed inset-0 opacity-50">
                <ShaderAnimation />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[320px] z-10 relative"
            >
                {/* Clean Glow Backdrop */}
                <div className="absolute -inset-10 bg-blue-600/5 blur-[100px] opacity-30 pointer-events-none" />

                <div className="relative group">
                    <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-white/10 via-white/5 to-white/10 opacity-20" />

                    <div className="relative flex flex-col bg-white/[0.01] backdrop-blur-[40px] border border-white/5 p-6 rounded-[24px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden">

                        <div className="mb-6 flex flex-col items-center relative z-10">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-2xl font-black tracking-tighter text-white/90 bg-clip-text"
                            >
                                <motion.span
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="bg-gradient-to-r from-white via-blue-200 to-white bg-[length:200%_auto] text-transparent bg-clip-text"
                                >
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </motion.span>
                            </motion.h2>

                            <p className="text-white/30 font-medium text-[9px] mt-1.5 leading-relaxed text-center">
                                {isLogin
                                    ? 'Welcome back to the future of interaction.'
                                    : 'Join the next generation of creative Agent.'}
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="relative z-10"
                        >
                            {children}
                        </motion.div>

                        <div className="mt-6 relative z-10">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[7px] items-center uppercase tracking-[0.2em] font-bold">
                                    <span className="bg-[#030303]/50 backdrop-blur-sm px-3 text-white/20">
                                        Quick Auth
                                    </span>
                                </div>
                            </div>

                            <button className="w-full group/btn flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 rounded-[12px] py-2 transition-all duration-300 font-bold relative overflow-hidden shadow-[0_5px_15px_-5px_rgba(255,255,255,0.1)]">
                                <Github className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Connect with GitHub</span>
                            </button>
                        </div>

                        <div className="mt-5 text-center text-[11px] font-medium relative z-10">
                            {isLogin ? (
                                <span className="text-white/20">
                                    New?{' '}
                                    <Link href="/signup" className="text-white/60 hover:text-white transition-all font-bold ml-1">
                                        Create profile
                                    </Link>
                                </span>
                            ) : (
                                <span className="text-white/20">
                                    Member?{' '}
                                    <Link href="/login" className="text-white/60 hover:text-white transition-all font-bold ml-1">
                                        Log in
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


