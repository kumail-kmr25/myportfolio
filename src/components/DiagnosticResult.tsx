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
            className="h-full space-y-6"
        >
            <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8">
                    {result.isMatch ? (
                        <div className="flex items-center gap-2 text-green-500/50 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} /> Pattern Matched
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-blue-500/50 text-[10px] font-black uppercase tracking-widest">
                            <Zap size={14} /> General Analysis
                        </div>
                    )}
                </div>

                <div className="space-y-10">
                    {/* Causes */}
                    <section className="space-y-4">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                            <AlertCircle size={14} className="text-red-500" /> Possible Causes
                        </h4>
                        <ul className="space-y-3">
                            {result.possibleCauses.map((cause, i) => (
                                <motion.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-gray-300 bg-white/5 p-4 rounded-2xl border border-white/5"
                                >
                                    <span className="text-white/20 font-mono mt-0.5">{i + 1}.</span>
                                    {cause}
                                </motion.li>
                            ))}
                        </ul>
                    </section>

                    {/* Steps */}
                    <section className="space-y-4">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                            <Search size={14} className="text-blue-500" /> Debugging Steps
                        </h4>
                        <div className="space-y-3">
                            {result.debugSteps.map((step, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    key={i}
                                    className="text-sm text-gray-400 pl-4 border-l-2 border-white/10 py-1"
                                >
                                    {step}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Complexity Level</p>
                            <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${result.complexity === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                result.complexity === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                    'bg-green-500/10 text-green-500 border-green-500/20'
                                }`}>
                                {result.complexity}
                            </span>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Recommended Service</p>
                            <span className="text-blue-400 text-xs font-bold">{result.recommendedService}</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 text-center">Ready to resolve this? Select a service:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    onClick={() => handleServiceClick(service)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${service === result.recommendedService
                                        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                                        : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
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
