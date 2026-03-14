"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Settings2, Palette } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme') as any;
        if (saved) setTheme(saved);
    }, []);

    const updateTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 group"
            >
                {theme === 'light' && <Sun size={20} />}
                {theme === 'dark' && <Moon size={20} />}
                {theme === 'system' && <Monitor size={20} />}
                <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Theme</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-3xl p-2 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="px-4 py-2 mb-2 border-b border-white/5">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Appearance</span>
                        </div>
                        
                        <div className="space-y-1">
                            {[
                                { id: 'light', icon: Sun, label: 'Light' },
                                { id: 'dark', icon: Moon, label: 'Dark' },
                                { id: 'system', icon: Monitor, label: 'System' }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => updateTheme(opt.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        theme === opt.id 
                                        ? 'bg-blue-600/10 text-blue-400' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <opt.icon size={16} />
                                    <span className="text-sm font-medium">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-2 p-3 bg-blue-600/5 rounded-2xl flex items-center gap-3 border border-blue-500/10">
                            <Palette size={14} className="text-blue-500" />
                            <span className="text-[10px] text-blue-500/80 font-bold uppercase tracking-widest">Auto-Optimize</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSwitcher;
