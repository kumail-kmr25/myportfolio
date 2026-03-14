"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Snippet {
    id: string;
    title: string;
    description: string;
    code: string;
    language: string;
    tags: string[];
}

export const CodeSnippets: React.FC = () => {
    const { data, error } = useSWR('/api/snippets', fetcher);
    const snippets: Snippet[] = data?.snippets || [];
    const [activeId, setActiveId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        if (!activeId && snippets.length > 0) {
            setActiveId(snippets[0].id);
        }
    }, [snippets, activeId]);

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (error || !snippets.length) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Code <span className="text-blue-500">Playground</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl">
                        A collection of re-usable logic, architectural patterns, and performance optimizations I use across my enterprise projects.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-gray-500 font-mono text-sm">
                    <Terminal size={16} />
                    <span>lib/patterns/*.ts</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Snippet List */}
                <div className="space-y-4">
                    {snippets.map((snip) => (
                        <div
                            key={snip.id}
                            onClick={() => setActiveId(snip.id)}
                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                activeId === snip.id 
                                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                                : 'bg-[#050505] border-white/5 hover:border-white/20'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className={`font-bold transition-colors ${activeId === snip.id ? 'text-blue-400' : 'text-white'}`}>
                                    {snip.title}
                                </h3>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-2 py-0.5 bg-white/5 rounded">
                                    {snip.language}
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{snip.description}</p>
                        </div>
                    ))}
                </div>

                {/* Code Viewer */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {snippets.map(snip => snip.id === activeId && (
                            <motion.div
                                key={snip.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="h-full"
                            >
                                <div className="h-full bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                                    <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(snip.code, snip.id)}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            {copiedId === snip.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                    <div className="p-6 overflow-auto font-mono text-sm leading-relaxed scrollbar-hide flex-1">
                                        <pre className="text-blue-300">
                                            <code>{snip.code}</code>
                                        </pre>
                                    </div>
                                    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex gap-2">
                                        {snip.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-gray-500 px-2 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CodeSnippets;
