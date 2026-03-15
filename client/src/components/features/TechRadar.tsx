"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Terminal, 
    Cpu, 
    Layers, 
    Globe, 
    Zap, 
    Shield, 
    Code2, 
    Database, 
    Cloud, 
    Sparkles
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

interface TechCategory {
    category: string;
    skills: string[];
}

interface TechData {
    categories: TechCategory[];
}

const iconMap: Record<string, any> = {
    "Frontend": Globe,
    "Backend": Database,
    "DevOps": Cloud,
    "AI/ML": Sparkles,
    "Tools": Terminal,
    "Languages": Code2,
};

export default function TechRadar() {
    const { data, isLoading } = useSWR<TechData>("/api/tech-radar", fetcher);

    if (isLoading) return null;

    const categories = data?.categories || [];

    return (
        <section id="tech-radar" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background Narrative */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/[0.02] blur-[120px] rounded-full" />
                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24 space-y-6">
                    <m.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <Cpu size={12} /> Technical_Stack_Evaluation_v2.5
                    </m.div>
                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase">
                        TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">RADAR.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium leading-relaxed italic">
                        A multidimensional visualization of my current production stack, architectural capabilities, and experimental frontier.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, i) => {
                        const Icon = iconMap[cat.category] || Layers;
                        return (
                            <m.div 
                                key={cat.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-10 rounded-[2.5rem] bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-3xl hover:border-indigo-500/20 transition-all space-y-8 h-full">
                                    <div className="flex items-center justify-between">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all">
                                            <Icon size={28} />
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-500/20 animate-pulse" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{cat.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((skill) => (
                                                <span 
                                                    key={skill}
                                                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] font-bold text-gray-400 group-hover:text-white group-hover:border-indigo-500/20 transition-all uppercase tracking-widest"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="pt-4 border-t border-white/5 mt-auto">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">Competency_Index</span>
                                            <span className="text-[10px] font-black text-indigo-500 italic">95%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <m.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '95%' }}
                                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                                className="h-full bg-gradient-to-r from-indigo-600 to-purple-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        );
                    })}
                </div>

                <div className="mt-20 p-8 border border-white/5 rounded-[3rem] bg-black/40 text-center">
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Mastery_Protocol_Active</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        {/* Placeholder for tool logos if needed, otherwise just text stats */}
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-white tracking-tighter">150+</span>
                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Git Commits / Mo</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-white tracking-tighter">10k+</span>
                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Build Hours</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-white tracking-tighter">Perfect</span>
                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Lighthouse Scores</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
