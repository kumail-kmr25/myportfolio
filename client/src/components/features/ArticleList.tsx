"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUpRight, Clock, Hash, Search, Filter, Rocket, Brain } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readingTime: number;
    publishedAt: string;
}

export const ArticleList: React.FC = () => {
    const { data, error } = useSWR('/api/articles', fetcher);
    const articles: Article[] = data?.articles || [];
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'general', 'startup', 'technical'];

    const filtered = selectedCategory === 'all' 
        ? (articles || [])
        : (articles || []).filter(a => a.category === selectedCategory);

    if (error) return null;

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-xs font-bold uppercase tracking-widest w-fit">
                        <Brain size={16} />
                        Technical Insights
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Enterprise <span className="text-emerald-500">Insights</span></h2>
                    <p className="text-gray-500 max-w-xl text-lg">Condensed technical and business strategies for modern scaling founders.</p>
                </div>

                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                selectedCategory === cat 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.map((art, idx) => (
                    <motion.div
                        key={art.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-[#050505] border border-white/5 rounded-[40px] p-8 md:p-12 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                            <ArrowUpRight size={32} />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><Clock size={12} /> {art.readingTime} MIN READ</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="flex items-center gap-2 text-emerald-500/80"><Hash size={12} /> {art.category}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                                {art.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed text-sm md:text-base line-clamp-3">
                                {art.excerpt}
                            </p>

                            <div className="pt-4 flex items-center gap-4 text-xs font-bold text-white group-hover:gap-6 transition-all">
                                READ ARTICLE <div className="h-px flex-1 bg-white/5 group-hover:bg-emerald-500/30 transition-all" />
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
                        <BookOpen size={48} className="mx-auto text-gray-700 mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No articles in this category yet</p>
                    </div>
                )}
            </div>
            
            <div className="mt-20 flex justify-center">
                <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all flex items-center gap-3 group">
                    View Knowledge Base <Rocket size={18} className="group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default ArticleList;
