"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Admin Route Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-[family-name:var(--font-outfit)]">
            <div className="max-w-md w-full glass-effect rounded-[2.5rem] p-10 border border-red-500/20 bg-red-500/[0.02] text-center space-y-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-red-500/20">
                    <AlertTriangle className="text-red-500" size={40} />
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em]">Critical Exception</p>
                    <h2 className="text-2xl font-black text-white tracking-tight">System Interruption</h2>
                    <p className="text-gray-500 text-xs leading-relaxed">
                        The admin portal encountered an unexpected runtime error. Security protocols have engaged to prevent further instability.
                    </p>
                </div>

                <div className="pt-4 space-y-3">
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-bold text-xs uppercase tracking-widest group"
                    >
                        <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                        Attempt Recovery
                    </button>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="w-full text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Return to Public Terminal
                    </button>
                </div>

                <div className="pt-8 border-t border-white/5 opacity-40">
                    <p className="text-[9px] font-mono text-gray-600">Error_Digest: {error.digest || "NULL_STUB"}</p>
                </div>
            </div>
        </div>
    );
}
