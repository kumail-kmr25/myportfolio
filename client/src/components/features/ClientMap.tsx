"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Globe, 
    MapPin, 
    Zap, 
    Users,
    Navigation,
    ArrowUpRight
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

export default function ClientMap() {
    const { data, isLoading } = useSWR("/api/client-map", fetcher);

    if (isLoading) return null;

    const locations = data?.locations || [];

    return (
        <section id="client-map" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background Narrative */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left: Map Visualization */}
                    <div className="lg:col-span-7 relative group">
                        <div className="absolute -inset-10 bg-blue-600/5 blur-[100px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                        
                        <m.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative aspect-[16/10] bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            {/* Simple SVG World Map (Stylized) */}
                            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20 fill-gray-500">
                                <path d="M150,100 Q200,80 250,100 T350,120 T450,100 T550,130 T650,110 T750,140 T850,120 T950,150 V350 Q900,380 850,350 T750,330 T650,360 T550,340 T450,370 T350,350 T250,380 T150,350 V100" />
                                {/* More stylized continents can be added or just use dots */}
                            </svg>

                            {/* Pulsing Dots */}
                            {locations.map((loc: any, i: number) => (
                                <m.div
                                    key={loc.city}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="absolute"
                                    style={{ 
                                        left: `${((loc.coords[1] + 180) / 360) * 100}%`, 
                                        top: `${((90 - loc.coords[0]) / 180) * 100}%` 
                                    }}
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-blue-500/40 blur-lg rounded-full animate-pulse" />
                                        <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-xl relative z-10" />
                                        <m.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            whileHover={{ opacity: 1, y: -10 }}
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-white text-black text-[9px] font-black uppercase tracking-widest whitespace-nowrap z-20 shadow-2xl pointer-events-none"
                                        >
                                            {loc.city} ({loc.count} Projects)
                                        </m.div>
                                    </div>
                                </m.div>
                            ))}
                        </m.div>

                        <div className="mt-8 flex items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Live Global Network Active</span>
                            </div>
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-gray-800" />
                                ))}
                                <div className="w-6 h-6 rounded-full border-2 border-[#050505] bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">+20</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <m.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                <Globe size={12} /> Global_Propagation_v1.0
                            </m.div>
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
                                GLOBAL <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">FOOTPRINT.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed italic max-w-lg">
                                Deploying high-performance systems for clients across 4 continents. Distance is irrelevant when architecture is borderless.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Nodes Active", value: "24 Cities", icon: Navigation },
                                { label: "Total Reach", value: "1M+ Users", icon: Users },
                                { label: "Uptime Protocol", value: "99.99%", icon: Zap },
                            ].map((item, i) => (
                                <m.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <item.icon size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{item.label}</p>
                                            <h4 className="text-lg font-black text-white italic tracking-tight">{item.value}</h4>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={16} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                                </m.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
