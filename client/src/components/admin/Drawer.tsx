"use client";

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, subtitle, children, footer }: DrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]"
                    />

                    {/* Drawer Content */}
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#080808] border-l border-white/10 z-[160] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-start justify-between bg-black/20">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
                                {subtitle && (
                                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">{subtitle}</p>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all shadow-xl"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="p-8 border-t border-white/5 bg-black/20">
                                {footer}
                            </div>
                        )}
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
}
