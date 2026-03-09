import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-[family-name:var(--font-outfit)]">
            <div className="text-center space-y-8 max-w-md">
                <div className="space-y-2">
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">Error 404</p>
                    <h1 className="text-6xl font-black tracking-tighter">Not Found</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        The page you are looking for does not exist or has been moved.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-600 transition-all"
                >
                    Return Home
                </Link>
            </div>
        </main>
    );
}
