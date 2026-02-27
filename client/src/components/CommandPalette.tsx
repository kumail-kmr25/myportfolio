"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    X,
    Layout,
    Briefcase,
    FileText,
    Settings,
    User,
    Mail,
    Home,
    Terminal,
    Trophy,
    ArrowRight,
    Star
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useHireModal } from "@/context/HireModalContext";

const navItems = [
    { name: "Back to Home", icon: Home, href: "#home", category: "Navigation" },
    { name: "About Me", icon: User, href: "#about", category: "Navigation" },
    { name: "My Projects", icon: Layout, href: "#projects", category: "Navigation" },
    { name: "Case Studies", icon: Terminal, href: "#case-studies", category: "Navigation" },
    { name: "My Services", icon: Settings, href: "#services", category: "Navigation" },
    { name: "Client Feedback", icon: Star, href: "#testimonials", category: "Navigation" },
    { name: "Get in Touch", icon: Mail, href: "#contact", category: "Navigation" },
];

const actions = [
    { name: "Hire Me Now", icon: Briefcase, action: "hire", category: "Quick Actions" },
    { name: "Suggest a Feature", icon: Trophy, href: "#suggest-feature", category: "Quick Actions" },
    { name: "Run Diagnostics", icon: Activity, href: "#diagnose", category: "Quick Actions" },
];

function Activity(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { openModal } = useHireModal();
    const inputRef = useRef<HTMLInputElement>(null);

    const allItems = [...navItems, ...actions];
    const filteredItems = query === ""
        ? allItems
        : allItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

    const toggle = useCallback(() => setIsOpen(open => !open), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggle();
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggle]);

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    const handleSelect = (item: any) => {
        setIsOpen(false);
        if (item.action === "hire") {
            openModal();
        } else if (item.href) {
            router.push(item.href);
            // If it's an anchor, smooth scroll manually as next/navigation doesn't always trigger it
            if (item.href.startsWith("#")) {
                const el = document.getElementById(item.href.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(i => (i + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredItems[selectedIndex]) handleSelect(filteredItems[selectedIndex]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20, filter: "blur(10px)" }}
                        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ scale: 0.95, opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl bg-black/40 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-3xl"
                    >
                        <div className="flex items-center p-8 border-b border-white/5 relative">
                            <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
                            <Search className="w-5 h-5 text-blue-500 mr-4" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full bg-transparent text-white text-lg placeholder:text-gray-600 focus:outline-none font-medium"
                                placeholder="Search commands, sections, or actions..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onKeyDown}
                            />
                            <div className="flex items-center gap-1.5 ml-4">
                                <kbd className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black tracking-widest text-gray-400 font-sans">ESC</kbd>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                            {filteredItems.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <p>No results found for &quot;{query}&quot;</p>
                                </div>
                            ) : (
                                <div className="space-y-4 py-2">
                                    {["Navigation", "Quick Actions"].map((category) => {
                                        const categoryItems = filteredItems.filter(i => i.category === category);
                                        if (categoryItems.length === 0) return null;

                                        return (
                                            <div key={category}>
                                                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">{category}</div>
                                                <div className="space-y-1">
                                                    {categoryItems.map((item) => {
                                                        const globalIndex = filteredItems.indexOf(item);
                                                        const isActive = selectedIndex === globalIndex;

                                                        return (
                                                            <button
                                                                key={item.name}
                                                                onClick={() => handleSelect(item)}
                                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                                                                        <item.icon size={18} />
                                                                    </div>
                                                                    <span className="text-sm font-bold tracking-tight">{item.name}</span>
                                                                </div>
                                                                {isActive && (
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Enter</span>
                                                                        <ArrowRight size={14} />
                                                                    </div>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px] text-gray-500 font-sans">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px] text-gray-500 font-sans">↓</kbd>
                                    </div>
                                    <span className="text-[10px] text-gray-600 font-medium">Navigate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px] text-gray-500 font-sans">↵</kbd>
                                    <span className="text-[10px] text-gray-600 font-medium">Select</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2">
                                <Command size={10} /> kumail-kmr.dev
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
