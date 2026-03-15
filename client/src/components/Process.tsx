"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Search, 
    Code, 
    Rocket, 
    ShieldCheck, 
    Zap,
    ChevronRight,
    ArrowDown
} from "lucide-react";

const steps = [
    {
        title: "Strategic Discovery",
        description: "In-depth audit of your current technical landscape and business objectives.",
        icon: Search,
        color: "blue"
    },
    {
        title: "Architectural Design",
        description: "Engineering a scalable, high-performance blueprint tailored to your needs.",
        icon: ShieldCheck,
        color: "indigo"
    },
    {
        title: "Agile Development",
        description: "Rapid, test-driven production with continuous integration and deployment.",
        icon: Code,
        color: "blue"
    },
    {
        title: "Quality Assurance",
        description: "Rigorous security audits and performance stress-testing before launch.",
        icon: Zap,
        color: "indigo"
    },
    {
        title: "Deployment & Scale",
        description: "Zero-downtime release followed by ongoing strategic optimization.",
        icon: Rocket,
        color: "blue"
    }
];

export default function Process() {
    return (
        <section id="process" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em]">Operational_Workflow</p>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Strategic_Lifecycle
                        </h2>
                    </div>
                    <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.3em] max-w-sm lg:text-right leading-relaxed">
                        A systematic engineering approach designed to transform complex problems into high-performance digital assets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent hidden md:block" />

                    {steps.map((step, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="flex flex-col items-center text-center space-y-8 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 group-hover:-translate-y-2">
                                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:text-white group-hover:bg-blue-600 transition-all duration-500">
                                    <step.icon size={32} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-[10px] font-black text-blue-500 font-mono">0{idx + 1}</span>
                                        <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">{step.title}</h3>
                                    </div>
                                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            
                            {idx < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050505] border border-white/10 items-center justify-center text-gray-700 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            )}

                            {/* Mobile Connector */}
                            {idx < steps.length - 1 && (
                                <div className="md:hidden flex justify-center py-4 text-white/5">
                                    <ArrowDown size={24} />
                                </div>
                            )}
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
