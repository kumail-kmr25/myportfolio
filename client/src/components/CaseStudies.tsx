"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, AlertCircle, CheckCircle2, Cpu, BarChart3, ChevronRight } from "lucide-react";

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

    if (error) return null;

    return (
        <section id="case-studies" className="py-12 bg-[#050505]">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="section-title !mb-2 text-left">How I Solve Real Problems</h2>
                        <p className="text-gray-400 max-w-2xl">
                            A deep dive into my debugging process and how I tackle complex engineering challenges.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Real-world case studies
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : !Array.isArray(caseStudies) || caseStudies.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-white/[0.02] rounded-3xl border border-white/5">
                        No case studies published yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedCase(study)}
                                className="group cursor-pointer p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Cpu className="w-12 h-12 text-blue-500" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {study.title}
                                </h3>

                                <div className="mb-6">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Error Message</p>
                                    <pre className="text-xs p-3 rounded-xl bg-black/50 border border-white/5 text-red-400 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {study.errorMessage}
                                    </pre>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {study.techStack.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                    {study.techStack.length > 3 && (
                                        <span className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-bold rounded-full border border-white/5">
                                            +{study.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                                    View full breakdown <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            The Error
                                        </h4>
                                        <div className="p-6 rounded-2xl bg-black border border-white/5 overflow-x-auto">
                                            <code className="text-red-400 text-sm whitespace-pre-wrap">{selectedCase.errorMessage}</code>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                            Root Cause Analysis
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed">{selectedCase.rootCause}</p>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            Debugging Steps
                                        </h4>
                                        <ul className="space-y-4">
                                            {selectedCase.steps.map((step, i) => (
                                                <li key={i} className="flex gap-4 group">
                                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-gray-400 leading-relaxed pt-1">{step}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Final Solution
                                        </h4>
                                        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 text-green-100 leading-relaxed">
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
