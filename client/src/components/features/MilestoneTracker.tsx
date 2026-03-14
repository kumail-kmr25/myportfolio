"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Clock, Building2, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Milestone {
    id: string;
    displayName: string;
    industry: string;
    phase: string;
    progress: number;
    startDate: string;
    launchDate: string | null;
}

export const MilestoneTracker: React.FC = () => {
    const { data, error } = useSWR('/api/milestones', fetcher);
    const milestones: Milestone[] = data?.milestones || [];

    const getPhaseColor = (phase: string) => {
        switch (phase) {
            case 'launched': return 'bg-emerald-500';
            case 'development': return 'bg-blue-500';
            case 'testing': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    };

    if (error || !milestones.length) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Project <span className="text-blue-500">Milestones</span></h2>
                <p className="text-gray-500 max-w-2xl px-1">Transparent progress tracking for active enterprise engagements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {milestones.map((ms, idx) => (
                    <motion.div
                        key={ms.id}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative group p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600/10 transition-colors">
                                    <Building2 size={24} className="text-gray-400 group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{ms.displayName}</h3>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-2 py-0.5 bg-white/5 rounded">
                                        {ms.industry}
                                    </span>
                                </div>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getPhaseColor(ms.phase)}/10 border ${getPhaseColor(ms.phase)}/30 text-white`}>
                                {ms.phase}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-gray-500">Completion</span>
                                    <span className="text-white">{ms.progress}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${ms.progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full ${getPhaseColor(ms.phase)}`}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <Calendar size={16} className="text-gray-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Started</div>
                                        <div className="text-xs text-white font-medium">{format(new Date(ms.startDate), "MMM yyyy")}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-gray-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Delivery</div>
                                        <div className="text-xs text-white font-medium">
                                            {ms.launchDate ? format(new Date(ms.launchDate), "MMM yyyy") : "In Progress"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MilestoneTracker;
