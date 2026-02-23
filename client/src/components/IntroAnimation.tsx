"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function IntroAnimation() {
    const [isVisible, setIsVisible] = useState(false); // Default to false for SSR
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Only run on client after mount
        setIsVisible(true);
        setShouldRender(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const words = "Welcome to my Portfolio".split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1] as any,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.21, 0.45, 0.32, 0.9] as any,
            },
        },
    };

    if (!shouldRender) return null; // Prevent hydration mismatch

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="intro"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505] cursor-wait"
                >
                    <div className="relative flex flex-col items-center">
                        <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full scale-150 animate-pulse" />

                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 relative z-10 px-6">
                            {words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={itemVariants}
                                    className={`text-4xl md:text-7xl font-display font-bold tracking-tight ${word === "Portfolio"
                                        ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6, ease: "circOut" }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-8 max-w-[200px] w-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
