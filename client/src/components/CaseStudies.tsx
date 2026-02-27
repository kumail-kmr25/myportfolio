"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, X, AlertCircle, CheckCircle2, Cpu, BarChart3, ChevronRight, Terminal } from "lucide-react";

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
}

export default function CaseStudies() {
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
        <section id="case-studies" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <div className="section-container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                        >
                            Engineering Methodology
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                        >
                            How I Solve <span className="text-gray-500 italic">Real Problems</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg leading-relaxed"
                        >
                            A forensic deep dive into my debugging process and how I transform critical failures into high-performance architectural solutions.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400 font-black uppercase tracking-widest backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        Production Case Archive
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : !Array.isArray(caseStudies) || caseStudies.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center py-24 text-gray-500 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-sm"
                    >
                        <Cpu size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="font-mono text-sm tracking-widest uppercase">No cases archived in current node.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {caseStudies.map((study) => (
                            <motion.div
                                key={study.id}
                                variants={itemVariants}
                                onClick={() => setSelectedCase(study)}
                                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.04)" }}
                                className="group cursor-pointer p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700">
                                    <Cpu className="w-16 h-16 text-blue-500" />
                                </div>

                                <motion.h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors leading-tight">
                                    {study.title}
                                </motion.h3>

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
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCase(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
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
                                    Problem Breakdown
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white">{selectedCase.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-10">
                                    <section>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-4 flex items-center gap-3">
                                            <Terminal size={14} />
                                            System Interception
                                        </h4>
                                        <div className="p-8 rounded-[2rem] bg-black/60 border border-white/5 overflow-x-auto shadow-inner group/code">
                                            <code className="text-red-400 text-sm font-mono leading-relaxed block">{selectedCase.errorMessage}</code>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                            Root Cause Analysis
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed text-lg">{selectedCase.rootCause}</p>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            Debugging Steps
                                        </h4>
                                        <ul className="space-y-6">
                                            {selectedCase.steps.map((step: string, i: number) => (
                                                <li key={i} className="flex gap-6 group">
                                                    <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                                                        0{i + 1}
                                                    </span>
                                                    <p className="text-gray-400 leading-relaxed pt-2 group-hover:text-gray-300 transition-colors">{step}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Final Solution
                                        </h4>
                                        <div className="p-8 rounded-[2rem] bg-green-500/5 border border-green-500/10 text-green-100/90 leading-relaxed text-lg backdrop-blur-sm">
                                            {selectedCase.solution}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-10">
                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4 text-purple-400" />
                                            Impact
                                        </h4>
                                        <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-purple-200 text-sm leading-relaxed italic">
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
                                                <span key={tech} className="px-4 py-2 bg-white/5 text-gray-300 text-xs font-medium rounded-xl border border-white/10">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    <div className="p-6 rounded-3xl bg-blue-500 text-white">
                                        <CheckCircle2 className="w-10 h-10 mb-4 opacity-50" />
                                        <h5 className="font-bold mb-2">Resolution Verified</h5>
                                        <p className="text-sm opacity-90">This problem was successfully resolved and the fix was deployed to production.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
