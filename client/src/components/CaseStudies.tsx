"use client";

import { useState } from "react";
import useSWR from "swr";
import { m, AnimatePresence, Variants } from "framer-motion";
import { Loader2, X, AlertCircle, CheckCircle2, Cpu, BarChart3, ChevronRight, Terminal, Zap } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CaseStudy {
    id: string;
    title: string;
    errorMessage: string;
    rootCause: string;
    steps: string[];
    solution: string;
    impact: string;
    techStack: string[];
    architecture?: any;
}

import { useHireModal } from "@/context/HireModalContext";

export default function CaseStudies() {
    const { openModal } = useHireModal();
    const { data: caseStudies, error, isLoading } = useSWR<CaseStudy[]>("/api/case-studies", fetcher);
    const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    if (error) return null;

    return (
        <section id="case-studies" className="py-24 lg:py-16 bg-[#050505] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <div className="section-container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-12 gap-8">
                    <div className="max-w-2xl">
                        <m.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                        >
                            Engineering Methodology
                        </m.span>
                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                        >
                            How I Solve <span className="text-gray-500 italic">Real Problems</span>
                        </m.h2>
                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg leading-relaxed"
                        >
                            A forensic deep dive into my debugging process and how I transform critical failures into high-performance architectural solutions.
                        </m.p>
                    </div>
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400 font-black uppercase tracking-widest backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        Production Case Archive
                    </m.div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : !Array.isArray(caseStudies) || caseStudies.length === 0 ? (
                    <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center py-24 text-gray-500 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-sm"
                    >
                        <Cpu size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="font-mono text-sm tracking-widest uppercase">No cases archived in current node.</p>
                    </m.div>
                ) : (
                    <m.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {caseStudies.map((study) => (
                            <m.div
                                key={study.id}
                                variants={itemVariants}
                                onClick={() => setSelectedCase(study)}
                                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.04)" }}
                                className="group cursor-pointer p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700">
                                    <Cpu className="w-16 h-16 text-blue-500" />
                                </div>

                                <m.h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors leading-tight">
                                    {study.title}
                                </m.h3>

                                <div className="mb-8">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-3">Interception Message</p>
                                    <div className="font-mono text-xs p-4 rounded-2xl bg-black/60 border border-white/5 text-red-500/90 overflow-hidden text-ellipsis whitespace-nowrap shadow-inner">
                                        {study.errorMessage}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {study.techStack.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-white/5 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-white/5 group-hover:border-blue-500/20 group-hover:text-blue-300 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                    {study.techStack.length > 3 && (
                                        <span className="px-3 py-1 bg-white/5 text-gray-600 text-[9px] font-black rounded-full border border-white/5">
                                            +{study.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-blue-400 transition-colors">
                                    Decrypt Case Breakdown <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </m.div>
                        ))}
                    </m.div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCase(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <m.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12 custom-scrollbar"
                        >
                            <button
                                onClick={() => setSelectedCase(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-12">
                                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">
                                    <AlertCircle className="w-4 h-4" />
                                    Project Case Study
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{selectedCase.title}</h2>
                                <p className="mt-4 text-gray-500 font-medium italic">Detailed technical breakdown and impact analysis.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-12">
                                    {/* 1. Problem */}
                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            01. The Problem
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed text-lg">
                                            {selectedCase.rootCause || "Identifying and defining the core challenges faced by users."}
                                        </p>
                                    </section>

                                    {/* 2. Solution */}
                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            02. The Solution
                                        </h4>
                                        <div className="p-8 rounded-[2rem] bg-green-500/5 border border-green-500/10 text-green-100/90 leading-relaxed text-lg backdrop-blur-sm">
                                            {selectedCase.solution}
                                        </div>
                                    </section>

                                    {/* 3. Key Features */}
                                    <section>
                                        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            03. Key Features
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedCase.steps.map((feature: string, i: number) => (
                                                <li key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                                                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{feature}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* 4. Architecture */}
                                    <section>
                                        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                            04. System Architecture
                                        </h4>
                                        {selectedCase.architecture ? (
                                            <ArchitectureDiagram architecture={selectedCase.architecture} />
                                        ) : (
                                            <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 relative overflow-hidden group">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                                            <Cpu size={20} />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-black text-white uppercase tracking-widest">Stack Logic</div>
                                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Frontend → API → Database</div>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                                        Verifed Production
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                            <m.div 
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: "100%" }}
                                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" 
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-500 text-xs leading-relaxed italic">
                                                        "Engineered for maximum throughput with a decoupled micro-frontend architecture and a highly optimized data persistence layer."
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                </div>

                                <div className="space-y-10">
                                    {/* 5. Impact */}
                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4 text-emerald-400" />
                                            05. Business Impact
                                        </h4>
                                        <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-200 text-lg leading-relaxed italic relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Zap className="w-12 h-12" />
                                            </div>
                                            &quot;{selectedCase.impact}&quot;
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <Cpu className="w-4 h-4 text-blue-400" />
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCase.techStack.map(tech => (
                                                <span key={tech} className="px-4 py-2 bg-white/5 text-gray-300 text-xs font-medium rounded-xl border border-white/10 group-hover:border-blue-500/30 transition-all">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    <button
                                        onClick={() => openModal({ service: "Performance Optimization", description: `Interested in scaling based on the "${selectedCase.title}" pattern.` })}
                                        className="w-full text-left p-8 rounded-[2.5rem] bg-blue-600 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98]"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-16 h-16" />
                                        </div>
                                        <h5 className="text-xl font-black mb-2 relative z-10">Ready for Scale</h5>
                                        <p className="text-sm opacity-90 relative z-10 font-medium whitespace-normal">This architectural pattern is proven in production and ready for enterprise-grade deployment. Click to initialize setup.</p>
                                    </button>
                                </div>
                            </div>

                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
