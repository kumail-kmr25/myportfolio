"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import AuditResults from "@/components/tools/AuditResults";
import LeadCaptureCTA from "@/components/tools/LeadCaptureCTA";

export default function WebsiteAuditPage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
                // Scroll to results
                setTimeout(() => {
                    document.getElementById('audit-results')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                setError(data.error || "Failed to analyze the website.");
            }
        } catch (err) {
            setError("Analysis failed. Please check the URL and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#030303] selection:bg-blue-500/30">
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50 blur-[120px]" />
                
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Sparkles size={12} />
                            Professional Site Engine
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                            Free Website Audit Tool
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Get an instant analysis of your website's performance, SEO, mobile-friendliness, and security in under 60 seconds.
                        </p>
                    </m.div>

                    <m.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        onSubmit={handleSubmit}
                        className="relative max-w-2xl mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <div className="relative flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter your website URL (e.g. example.com)"
                                    className="flex-grow bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-5 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/40 shrink-0"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze My Website
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <m.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-xs font-semibold mt-6 flex items-center justify-center gap-2"
                            >
                                <AlertTriangle size={14} className="" />
                                {error}
                            </m.p>
                        )}
                    </m.form>

                    {/* Quick Features */}
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex flex-wrap items-center justify-center gap-10 pt-8"
                    >
                        {[
                            { icon: Zap, label: "Lighthouse Performance" },
                            { icon: Globe, label: "SEO & Meta Analysis" },
                            { icon: ShieldCheck, label: "Security & SSL Check" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-500">
                                <item.icon size={16} className="text-blue-500/50" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </m.div>
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <section id="audit-results" className="py-20 px-6">
                        <div className="max-w-6xl mx-auto">
                            <AuditResults result={result} />
                            <LeadCaptureCTA />
                        </div>
                    </section>
                )}
            </AnimatePresence>

        </main>
    );
}

// Minimal placeholder sub-components for illustrative purposes if they don't exist
function AlertTriangle({ size, className }: { size: number, className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
        </svg>
    );
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
