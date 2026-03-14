"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Trophy, Star, Shield, Zap, Target, Medal } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    targetValue: number;
    currentValue: number;
    unlocked: boolean;
}

export const AchievementGallery: React.FC = () => {
    const { data, error } = useSWR('/api/achievements', fetcher);
    const achievements: Achievement[] = data?.achievements || [];

    if (error || !achievements.length) return null;

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="text-center mb-20 space-y-4">
                <div className="inline-flex items-center gap-3 text-amber-500 bg-amber-500/10 px-5 py-2.5 rounded-full border border-amber-500/20 text-xs font-black uppercase tracking-[0.2em] mb-4">
                    <Trophy size={16} />
                    Career Milestones
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Proof of <span className="text-amber-500 uppercase">Excellence</span></h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Quantified achievements across performance engineering, delivery speed, and complex system architecting.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((ach, idx) => (
                    <motion.div
                        key={ach.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                        
                        <div className="relative bg-[#111]/50 backdrop-blur-3xl border border-white/5 rounded-[32px] p-8 h-full flex flex-col justify-between hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
                            <div>
                                <div className="flex justify-between items-start mb-10">
                                    <div className="text-5xl">{ach.icon}</div>
                                    <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-[9px] font-black uppercase tracking-widest">
                                        {ach.category}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{ach.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                                    {ach.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Progress</div>
                                    <div className="text-xs font-black text-amber-500">{ach.currentValue} / {ach.targetValue}</div>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-2 text-[9px] text-emerald-500/80 font-bold uppercase tracking-[0.15em]">
                                    <Shield size={12} /> Verified Achievement
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-20 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500">
                        <Medal size={32} />
                    </div>
                    <div>
                        <div className="text-white font-bold text-xl leading-none mb-2">Technical Authority</div>
                        <div className="text-gray-500 text-sm">Recognized as a leading engineer in high-performance Web Systems.</div>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-amber-500 hover:text-white transition-all whitespace-nowrap">
                    DOWNLOAD PDF PACK
                </button>
            </div>
        </section>
    );
};

export default AchievementGallery;
