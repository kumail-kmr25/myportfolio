"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Check, ChevronUp, Globe2 } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
    const [lang, setLang] = useState('en');
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'fr', name: 'French', flag: '🇫🇷' }
    ];

    const currentLang = languages.find(l => l.code === lang);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 group"
            >
                <Languages size={20} />
                <span className="text-xs font-bold uppercase tracking-widest hidden md:block">{currentLang?.code}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-4 w-56 bg-[#0a0a0a] border border-white/10 rounded-3xl p-2 shadow-2xl z-50"
                    >
                        <div className="px-4 py-2 mb-2 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Select Language</span>
                            <Globe2 size={12} className="text-blue-500/50" />
                        </div>
                        
                        <div className="space-y-1">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => { setLang(l.code); setIsOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                        lang === l.code 
                                        ? 'bg-blue-600/10 text-blue-400' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg leading-none">{l.flag}</span>
                                        <span className="text-sm font-medium">{l.name}</span>
                                    </div>
                                    {lang === l.code && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-2 p-3 bg-white/5 rounded-2xl text-center">
                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.1em]">Configurable via Admin</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
