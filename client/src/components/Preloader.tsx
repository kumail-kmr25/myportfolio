"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Reduced timeout for snappiness, matching herwebstudios' fast reveal
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center pointer-events-none"
                >
                    <div className="relative">
                        {/* Subtle technical pulse indicator */}
                        <m.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="h-[1px] w-32 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        />
                        <m.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500 mt-4 text-center"
                        >
                            Initializing Interface
                        </m.p>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
