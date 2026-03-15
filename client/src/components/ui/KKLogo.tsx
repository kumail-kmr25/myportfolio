"use client";

import Link from "next/link";
import { m } from "framer-motion";

interface KKLogoProps {
    className?: string;
    showText?: boolean;
}

export default function KKLogo({ className = "", showText = true }: KKLogoProps) {
    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <Link 
            href="/" 
            className={`flex items-center gap-3 group select-none ${className}`}
            aria-label="Kumail KMR Home"
        >
            <div className="relative">
                {/* stylized KK Monogram */}
                <m.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4, ease: premiumEase as any }}
                    className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-xl group-hover:border-blue-500/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="relative z-10 text-xl lg:text-2xl font-black tracking-tighter flex items-center">
                        <span className="text-white">K</span>
                        <span className="text-blue-500 italic -ml-0.5">K</span>
                    </span>

                    {/* Animated Shine Effect */}
                    <m.div
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "100%", opacity: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                </m.div>

                {/* Status Dot (Online) */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className="text-sm lg:text-base font-black text-white tracking-widest uppercase transition-colors group-hover:text-blue-500">
                        Kumail <span className="text-blue-500 italic font-display">KMR</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] -mt-0.5">
                        Full-Stack Engineer
                    </span>
                </div>
            )}
        </Link>
    );
}
