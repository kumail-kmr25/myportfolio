"use client";

import { motion } from "framer-motion";
import {
    AlertCircle,
    Search,
    Zap,
    Briefcase,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

interface DiagnosticResultProps {
    result: {
        possibleCauses: string[];
        debugSteps: string[];
        complexity: string;
        recommendedService: string;
        isMatch: boolean;
    };
}

export default function DiagnosticResult({ result }: DiagnosticResultProps) {
    const handleServiceClick = (service: string) => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            // Dispatch a custom event to pre-fill the contact form
            const event = new CustomEvent("prefill-contact", {
                detail: {
                    service,
                    diagnostic: `Matched Pattern: ${result.recommendedService}\nComplexity: ${result.complexity}\nSuggested fix path: ${result.debugSteps.join(", ")}`
                }
            });
            window.dispatchEvent(event);

            // Slight delay before scrolling to ensure the form is updated
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    const services = [
        "Fix Bug",
        "Backend Debugging",
        "Deployment Issue",
        "Performance Optimization"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
        >
            <div className="bg-white/[0.03] rounded-[2.5rem] p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden h-full backdrop-blur-xl group/diag">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="diag-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#diag-grid)" />
                    </svg>
                </div>

                <div className="absolute top-0 right-0 p-8">
                    {result.isMatch ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/10"
                        >
                            <CheckCircle2 size={12} /> Pattern Matched
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2 text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10"
                        >
                            <Zap size={12} /> General Analysis
                        </motion.div>
                    )}
                </div>

                <div className="relative z-10 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Causes */}
                        <section className="space-y-6">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                <AlertCircle size={14} className="text-red-500" /> Possible Causes
                            </h4>
                            <div className="space-y-3">
                                {result.possibleCauses.map((cause, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className="flex items-start gap-4 text-sm text-gray-300 bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-all"
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-mono text-gray-500">
                                            {i + 1}
                                        </div>
                                        {cause}
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Steps */}
                        <section className="space-y-6">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                <Search size={14} className="text-blue-500" /> Debugging Steps
                            </h4>
                            <div className="space-y-3">
                                {result.debugSteps.map((step, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        key={i}
                                        className="text-sm text-gray-400 pl-6 border-l-2 border-white/[0.08] py-2 hover:border-blue-500/50 transition-colors"
                                    >
                                        {step}
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05]">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Complexity Level</p>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border-2 ${result.complexity === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                    result.complexity === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                        'bg-green-500/10 text-green-500 border-green-500/20'
                                    }`}>
                                    {result.complexity}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05]">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Recommended Service</p>
                            <div className="flex items-center gap-3">
                                <Briefcase size={16} className="text-blue-500" />
                                <span className="text-white text-sm font-bold tracking-tight">{result.recommendedService}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/[0.05]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 text-center">Ready to resolve this? Select a service:</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    onClick={() => handleServiceClick(service)}
                                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${service === result.recommendedService
                                        ? "bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/20 scale-105"
                                        : "bg-white/[0.03] text-gray-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
