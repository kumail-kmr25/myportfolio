"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Zap, 
    Search, 
    TrendingUp, 
    Award, 
    CheckCircle2, 
    Clock, 
    Milestone,
    Flag
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

interface MilestoneItem {
    id: string;
    date: string;
    title: string;
    description: string;
    icon?: string;
}

interface MilestoneData {
    milestones: MilestoneItem[];
}

const iconMap: Record<string, any> = {
    "Search": Search,
    "Zap": Zap,
    "TrendingUp": TrendingUp,
    "Award": Award,
    "CheckCircle2": CheckCircle2,
};

export default function MilestoneTracker() {
    const { data, isLoading } = useSWR<MilestoneData>("/api/milestones", fetcher);

    if (isLoading) return null;

    const milestones = data?.milestones || [];

    return (
        <section id="milestones" className="py-32 px-6 bg-[#030303] relative overflow-hidden">
             {/* Background elements */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-24 space-y-6">
                    <m.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <Clock size={12} /> Execution_Velocity_v4.0
                    </m.div>
                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">
                        PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">BEAT.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-500 text-lg font-medium leading-relaxed italic">
                        Visualizing the lifecycle of a high-growth project, from clinical audit to global scale.
                    </p>
                </div>

                <div className="space-y-12 relative">
                    {milestones.map((milestone, i) => {
                        const Icon = iconMap[milestone.icon || ""] || Flag;
                        const isEven = i % 2 === 0;

                        return (
                            <m.div 
                                key={milestone.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Date / Label */}
                                <div className={`flex-1 text-center ${isEven ? 'md:text-right' : 'md:text-left'} space-y-2`}>
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">{milestone.date}</p>
                                    <h3 className="text-2xl font-black text-white italic tracking-tight">{milestone.title}</h3>
                                </div>

                                {/* Center Icon */}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-blue-400 shadow-2xl relative">
                                        <div className="absolute -inset-2 bg-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Icon size={24} />
                                    </div>
                                    {i < milestones.length - 1 && (
                                        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-white/10 hidden md:block" />
                                    )}
                                </div>

                                {/* Description */}
                                <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed italic max-w-sm mx-auto md:mx-0">
                                        {milestone.description}
                                    </p>
                                </div>
                            </m.div>
                        );
                    })}
                </div>

                <div className="mt-24 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Status: Operational</p>
                            <h4 className="text-xl font-black text-white italic">Continuous Delivery Protocols Active</h4>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center gap-3">
                        DISCUSS_YOUR_PROJECT <ArrowRight size={14} />
                    </button>
                    
                    {/* Background Glow for Card */}
                    <div className="absolute inset-0 bg-blue-600/[0.01] pointer-events-none rounded-[3rem] group-hover:bg-blue-600/[0.03] transition-all" />
                </div>
            </div>
        </section>
    );
}

function ArrowRight(props: any) {
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
