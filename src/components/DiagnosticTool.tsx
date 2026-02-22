"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Bug, Terminal, Globe, ChevronRight, Activity } from "lucide-react";
import DiagnosticResult from "./DiagnosticResult";

export default function DiagnosticTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [formData, setFormData] = useState({
        description: "",
        techStack: "",
        errorMessage: "",
        environment: "Both"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/diagnose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("DIAGNOSE_FRONTEND_ERROR:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="diagnose" className="py-32 relative overflow-hidden bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <Activity size={14} className="animate-pulse" /> Diagnostic Engine v1.0
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
                        Got a Bug? <span className="text-blue-500">Let’s Break It Down.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        Describe your technical issue and I’ll provide a structured engineering analysis with causes, steps, and recommendations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-effect rounded-[3rem] p-10 border border-white/10 relative group"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Issue Description*</label>
                                <textarea
                                    className="input-field min-h-[150px] resize-none"
                                    placeholder="Describe the behavior, what you've tried, and what's failing..."
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                        <Terminal size={12} /> Tech Stack
                                    </label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="e.g. Next.js, Node, MongoDB"
                                        value={formData.techStack}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                        <Globe size={12} /> Environment
                                    </label>
                                    <select
                                        className="input-field appearance-none cursor-pointer"
                                        value={formData.environment}
                                        onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                                    >
                                        <option value="Local">Local Development</option>
                                        <option value="Production">Production / Live</option>
                                        <option value="Both">Both Environments</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                    <Bug size={12} /> Error Message
                                </label>
                                <input
                                    type="text"
                                    className="input-field font-mono text-xs"
                                    placeholder="Paste the error code or log here..."
                                    value={formData.errorMessage}
                                    onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !formData.description}
                                className="btn-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Analyze Problem <ChevronRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Result Side */}
                    <div className="min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {!result && !isLoading && (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[3rem] bg-white/[0.02] border border-dashed border-white/10"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <Activity className="text-white/20 w-8 h-8" />
                                    </div>
                                    <h3 className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Awaiting Input</h3>
                                    <p className="text-white/20 text-xs mt-2">Analysis will appear here after submission</p>
                                </motion.div>
                            )}

                            {isLoading && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12"
                                >
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full border-t-2 border-blue-500 animate-spin" />
                                        <Activity className="absolute inset-0 m-auto text-blue-500 w-8 h-8 animate-pulse" />
                                    </div>
                                    <h3 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mt-8">Analyzing Pattern</h3>
                                    <p className="text-gray-500 text-xs mt-2">Matching against knowledge base...</p>
                                </motion.div>
                            )}

                            {result && (
                                <DiagnosticResult key="result" result={result} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
