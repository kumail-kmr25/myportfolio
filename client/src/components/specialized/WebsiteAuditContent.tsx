"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowRight, ShieldCheck, Zap, Globe, Sparkles, AlertTriangle } from "lucide-react";
import AuditResults from "@/components/tools/AuditResults";
import LeadCaptureCTA from "@/components/tools/LeadCaptureCTA";
import AuditForm from "@/components/tools/AuditForm";

export default function WebsiteAuditContent() {
    const [result, setResult] = useState<any>(null);

    const handleSuccess = (data: any) => {
        setResult(data);
        setTimeout(() => {
            document.getElementById('audit-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <main className="min-h-screen bg-[#030303] selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6">
                {/* Background Textures */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none" />
                <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <m.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md"
                        >
                            <Sparkles size={14} className="animate-pulse" />
                            Elite Growth Intelligence
                        </m.div>
                        
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                            Engineered To <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Dominate</span>
                        </h1>
                        
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Stop guessing. Our AI-powered engine performs a deep-core scan of your performance, SEO, and UX to reveal the exact bottlenecks holding your business back.
                        </p>
                    </m.div>

                    <AuditForm 
                        onSuccess={handleSuccess} 
                        onError={() => {}} 
                        onStart={() => setResult(null)} 
                    />

                    {/* Meta Signals */}
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex flex-wrap items-center justify-center gap-12 pt-8"
                    >
                        {[
                            { icon: Zap, label: "Core Web Vitals" },
                            { icon: Globe, label: "Semantic SEO" },
                            { icon: ShieldCheck, label: "SSL Integrity" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-blue-500/40 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-400 transition-colors">{item.label}</span>
                            </div>
                        ))}
                    </m.div>
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <section id="audit-results" className="relative py-32 px-6 scroll-mt-20">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                        <div className="max-w-6xl mx-auto space-y-32">
                            <AuditResults result={result} />
                            <LeadCaptureCTA />
                        </div>
                    </section>
                )}
            </AnimatePresence>

            <footer className="py-20 px-6 text-center border-t border-white/5 bg-white/[0.01]">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                    &copy; {new Date().getFullYear()} KK ENGINE &bull; ALL RIGHTS RESERVED
                </p>
            </footer>

        </main>
    );
}
