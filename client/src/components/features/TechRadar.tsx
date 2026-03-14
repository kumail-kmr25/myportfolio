"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Hexagon, Zap, Shield, Globe, Cpu } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface TechItem {
    id: string;
    name: string;
    category: string;
    proficiency: number;
    years: number;
    color?: string;
}

const CategoryIcon = ({ cat }: { cat: string }) => {
    switch(cat) {
        case 'frontend': return <Globe size={20} />;
        case 'backend': return <Cpu size={20} />;
        case 'devops': return <Shield size={20} />;
        default: return <Zap size={20} />;
    }
};

export const TechRadar: React.FC = () => {
    const { data, error } = useSWR('/api/tech-radar', fetcher);
    const items: TechItem[] = data?.items || [];

    if (error || !items.length) return null;

    const categories = ['frontend', 'backend', 'devops'];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Technology <span className="text-blue-500">Spectrum</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    A comprehensive map of my technical arsenal, showcasing proficiency levels and deep-dive specializations developed over years of production engineering.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat, catIdx) => (
                    <div key={cat} className="space-y-6">
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <CategoryIcon cat={cat} />
                            </div>
                            <h3 className="text-lg font-bold text-white capitalize">{cat}</h3>
                        </div>

                        <div className="space-y-4">
                            {items.filter(item => item.category === cat).map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (catIdx * 0.2) + (idx * 0.1) }}
                                    className="p-5 bg-[#050505] border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white font-bold">{item.name}</span>
                                        <span className="text-[10px] text-gray-500 uppercase font-black">{item.years} Years</span>
                                    </div>
                                    
                                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.proficiency}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="absolute top-0 left-0 h-full rounded-full"
                                            style={{ backgroundColor: item.color || '#3b82f6' }}
                                        />
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <span className="text-[10px] text-gray-400 font-mono">{item.proficiency}%</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechRadar;
