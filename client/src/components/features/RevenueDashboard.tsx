"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    TrendingUp, 
    DollarSign, 
    ArrowUpRight, 
    Award, 
    ShieldCheck, 
    Globe, 
    Zap,
    Users,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

interface RevenueItem {
    id: string;
    clientName: string;
    industry: string;
    revenueBefore: number;
    revenueAfter: number;
    growth: string;
    currency: string;
}

interface RevenueData {
    stats: {
        totalGenerated: string;
        averageROI: string;
        clientRetention: string;
    };
    items: RevenueItem[];
}

export default function RevenueDashboard() {
    const { data, error, isLoading } = useSWR<RevenueData>("/api/revenue", fetcher);
    const [activeIndex, setActiveIndex] = useState(0);

    const formatCurrency = (val: number, currency = "INR") => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val);
    };

    if (isLoading) return (
        <div className="py-32 px-6 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );

    const stats = data?.stats || { totalGenerated: "0", averageROI: "0%", clientRetention: "0%" };
    const items = data?.items || [];
    const activeItem = items[activeIndex];

    return (
        <section id="revenue-dashboard" className="py-32 px-6 bg-[#030303] relative overflow-hidden">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/[0.03] blur-[150px] rounded-full -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/[0.03] blur-[150px] rounded-full -ml-40 -mb-40" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left: Narrative & Stats */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <m.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                <TrendingUp size={12} /> Impact_Metrics_v1.0
                            </m.div>
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
                                REVENUE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">MULTIPLIER.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed italic max-w-lg">
                                Real business results delivered through technical excellence. I don&apos;t just build features; I engineer growth engines.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Total Revenue Generated", value: stats.totalGenerated, icon: DollarSign, color: "text-emerald-500" },
                                { label: "Average Client ROI", value: stats.averageROI, icon: Zap, color: "text-blue-500" },
                                { label: "Client Retention Rate", value: stats.clientRetention, icon: ShieldCheck, color: "text-indigo-500" },
                                { label: "Global Deployments", value: "40+", icon: Globe, color: "text-purple-500" },
                            ].map((stat, i) => (
                                <m.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2 group hover:bg-white/[0.04] transition-all"
                                >
                                    <stat.icon size={18} className={`${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-white italic tracking-tighter">{stat.value}</p>
                                </m.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Case Highlights */}
                    <div className="lg:col-span-7">
                        <m.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="glass-effect rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl relative"
                        >
                            {/* Inner Glow */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                            
                            <div className="p-10 md:p-14 space-y-12">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Featured_Success</p>
                                            <h3 className="text-xl font-black text-white italic tracking-tight uppercase">{activeItem?.clientName}</h3>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                        {activeItem?.growth} Growth
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Initial_Run_Rate</p>
                                            <p className="text-3xl font-black text-gray-500 line-through opacity-40 italic tracking-tighter">
                                                {formatCurrency(activeItem?.revenueBefore || 0, activeItem?.currency)}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Optimized_Revenue</p>
                                            <p className="text-5xl font-black text-white italic tracking-tighter">
                                                {formatCurrency(activeItem?.revenueAfter || 0, activeItem?.currency)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 flex flex-col justify-end">
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Users size={14} className="text-blue-500" />
                                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Industry_Vertical</p>
                                            </div>
                                            <p className="text-sm text-gray-300 font-bold italic tracking-wide">{activeItem?.industry}</p>
                                        </div>
                                        <button className="w-full btn-primary py-5 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 group">
                                            View_Technical_Case
                                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3 pt-6 border-t border-white/5">
                                    {items.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveIndex(i)}
                                            className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-12 bg-blue-500' : 'w-4 bg-white/10 hover:bg-white/20'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </m.div>

                        <div className="mt-8 flex items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Real-time Data Verified</span>
                            </div>
                            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic opacity-40">
                                Confidential figures adjusted for public display
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
