"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Briefcase, ShieldCheck } from "lucide-react";
import { useHireModal } from "@/context/HireModalContext";

const quickLinks = [
    { name: "Portfolio", href: "/portfolio", key: "P", isCTA: false },
    { name: "Testimonials", href: "/testimonials", key: "T", isCTA: false },
    { name: "Case Studies", href: "/#case-studies", key: "S", isCTA: false },
    { name: "Services", href: "/#services", key: "V", isCTA: false },
    { name: "Contact", href: "/#contact", key: "C", isCTA: false },
];

export default function QuickNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { openModal } = useHireModal();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && !isOpen) {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key.toLowerCase() === "h" && !isOpen) {
                e.preventDefault();
                openModal();
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const navigate = (link: any) => {
        setIsOpen(false);
        if (link.isCTA) {
            openModal();
            return;
        }
        if (link.isAdmin || !link.href.startsWith("#")) {
            window.location.href = link.href;
            return;
        }
        const element = document.getElementById(link.href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <m.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
                            <Command size={20} className="text-blue-500" />
                            <div className="flex-grow">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Quick Navigation</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Jump to any section instantly</p>
                            </div>
                            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500">
                                ESC to close
                            </div>
                        </div>

                        <div className="p-4">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => navigate(link)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg ${link.isCTA ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-gray-400'} flex items-center justify-center text-xs font-bold group-hover:bg-blue-500 group-hover:text-white transition-all`}>
                                            {link.key}
                                        </div>
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                            {link.name}
                                        </span>
                                    </div>
                                    <ArrowRight size={14} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
                                </button>
                            ))}
                        </div>

                        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">Crafted by Kumail KMR</p>
                            <div className="flex gap-2">
                                <Search size={12} className="text-gray-600" />
                            </div>
                        </div>
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}
