"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function IntroAnimation() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        setShouldRender(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1300); // Strictly under 1.5s
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            scale: 1.02,
            filter: "blur(10px)",
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1] as any,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.21, 0.45, 0.32, 0.9] as any,
            },
        },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 0.5,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as any,
            },
        },
    };

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="intro"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505] cursor-none overflow-hidden"
                >
                    {/* Technical Grid Accent */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="intro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#intro-grid)" />
                        </svg>
                    </div>

                    <div className="relative flex flex-col items-center gap-6">
                        {/* Core Light Hub */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full scale-150 animate-pulse" />

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.h1
                                variants={titleVariants}
                                className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2"
                            >
                                Kumail KMR
                            </motion.h1>

                            <motion.div
                                variants={subtitleVariants}
                                className="flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400"
                            >
                                <span>Full-Stack Engineer</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span>System Builder</span>
                            </motion.div>
                        </div>

                        {/* Scanner Line Effect */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full max-w-[300px]"
                        />
                    </div>

                    {/* Terminal Stub */}
                    <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
                        <p className="text-[10px] font-mono text-white tracking-widest uppercase">
                            Status: INITIALIZING_CORE_SYSTEM
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
