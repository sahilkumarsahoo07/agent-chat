import { motion } from 'framer-motion';
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
                className="w-full max-w-[400px] z-10 relative"
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

                            <button 
                                onClick={() => window.location.href = '/api/auth/google'}
                                type="button"
                                className="w-full group/btn flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 rounded-[12px] py-2 transition-all duration-300 font-bold relative overflow-hidden shadow-[0_5px_15px_-5px_rgba(255,255,255,0.1)]"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    <path d="M1 1h22v22H1z" fill="none"/>
                                </svg>
                                <span className="text-[11px]">Continue with Google</span>
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


