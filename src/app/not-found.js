import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#09090b] text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <span className="text-2xl font-bold text-white">404</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">Page Not Found</h1>
            <p className="text-white/40 mb-8 max-w-sm">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}
