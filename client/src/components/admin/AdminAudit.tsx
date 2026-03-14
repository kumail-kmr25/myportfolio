"use client";

import { useState } from "react";
import { Search, Loader2, Globe, Shield, Zap, CheckCircle2, XCircle, Info, BarChart3, AlertTriangle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

interface AuditResult {
    url: string;
    loadTime: string;
    ssl: string;
    seo: {
        title: string;
        titleContent: string;
        description: string;
        descriptionContent: string;
        h1: string;
        ogTags: string;
    };
    mobile: {
        responsive: string;
        viewport: string;
    };
    performance: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
        fcp: string;
        lcp: string;
        tti: string;
    } | null;
}

export default function AdminAudit() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAudit = async (e: React.FormEvent) => {
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
            } else {
                setError(data.error || "Failed to audit the website");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-400";
        if (score >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    const StatusIcon = ({ text }: { text: string }) => {
        if (text.includes("✅")) return <CheckCircle2 size={14} className="text-green-400 shrink-0" />;
        if (text.includes("❌")) return <XCircle size={14} className="text-red-400 shrink-0" />;
        if (text.includes("⚠️")) return <AlertTriangle size={14} className="text-yellow-400 shrink-0" />;
        return <Info size={14} className="text-blue-400 shrink-0" />;
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-4xl space-y-8">
                <div className="bg-white/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white">Site Audit Engine</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Deep analysis of SEO, Performance, and Security.</p>
                    </div>
                    <Search className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10 opacity-20 shrink-0" />
                </div>

                <form onSubmit={handleAudit} className="relative">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <input
                            type="text"
                            placeholder="Enter URL to scan (e.g. google.com)"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 px-8 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-3 shadow-xl shadow-blue-600/20"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Run Scan"}
                        </button>
                    </div>
                </form>

                {error && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-3"
                    >
                        <XCircle size={16} />
                        {error}
                    </m.div>
                )}

                <AnimatePresence mode="wait">
                    {result && (
                        <m.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* High-level Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-effect p-6 rounded-[2rem] border border-white/5 space-y-4">
                                    <Globe className="text-blue-400 opacity-40" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Domain Under Review</p>
                                        <h4 className="text-white font-bold truncate text-sm mt-1">{result.url}</h4>
                                    </div>
                                </div>
                                <div className="glass-effect p-6 rounded-[2rem] border border-white/5 space-y-4">
                                    <Zap className="text-yellow-400 opacity-40" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Connection</p>
                                        <h4 className="text-white font-bold text-sm mt-1">{result.loadTime} Response</h4>
                                    </div>
                                </div>
                                <div className="glass-effect p-6 rounded-[2rem] border border-white/5 space-y-4">
                                    <Shield className="text-green-400 opacity-40" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">SSL Certificate</p>
                                        <h4 className="text-white font-bold text-sm mt-1 flex items-center gap-2">
                                            <StatusIcon text={result.ssl} />
                                            {result.ssl.replace(/✅|⚠️|❌/g, "").trim()}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* Lighthouse Scores */}
                            {result.performance && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Performance", score: result.performance.performance },
                                        { label: "Accessibility", score: result.performance.accessibility },
                                        { label: "Best Practices", score: result.performance.bestPractices },
                                        { label: "SEO", score: result.performance.seo },
                                    ].map((item) => (
                                        <div key={item.label} className="glass-effect p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                                            <div className={`text-4xl font-black ${getScoreColor(item.score)}`}>
                                                {item.score}
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Detailed Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* SEO Audit */}
                                <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                                            <BarChart3 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold">SEO Infrastructure</h3>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Metadata & Semantics</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { label: "Meta Title", status: result.seo.title, content: result.seo.titleContent },
                                            { label: "Meta Description", status: result.seo.description, content: result.seo.descriptionContent },
                                            { label: "H1 Hierarchy", status: result.seo.h1 },
                                            { label: "Open Graph Tags", status: result.seo.ogTags },
                                        ].map((item, idx) => (
                                            <div key={idx} className="space-y-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-bold text-gray-400">{item.label}</span>
                                                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                                        <StatusIcon text={item.status} />
                                                        {item.status.replace(/✅|❌/g, "").trim()}
                                                    </span>
                                                </div>
                                                {item.content && (
                                                    <p className="text-xs text-gray-500 italic mt-1 bg-black/20 p-3 rounded-xl border border-white/5 line-clamp-2">
                                                        "{item.content}"
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Core Web Vitals / Performance Details */}
                                <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold">Execution & UX</h3>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Speed & Responsiveness</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: "Mobile Responsive", value: result.mobile.responsive },
                                                { label: "Viewport Config", value: result.mobile.viewport },
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 text-center">
                                                    <div className="flex justify-center mb-1">
                                                        <StatusIcon text={item.value} />
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 underline decoration-white/10 underline-offset-4">{item.label}</p>
                                                    <p className="text-[11px] font-bold text-white">{item.value.replace(/✅|❌/g, "").trim()}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {result.performance && (
                                            <div className="space-y-4 pt-4 border-t border-white/5">
                                                <div className="flex justify-between items-center px-2">
                                                    <span className="text-[11px] font-bold text-gray-400">First Contentful Paint</span>
                                                    <span className="text-[11px] font-black text-white">{result.performance.fcp}</span>
                                                </div>
                                                <div className="flex justify-between items-center px-2">
                                                    <span className="text-[11px] font-bold text-gray-400">Largest Contentful Paint</span>
                                                    <span className="text-[11px] font-black text-white">{result.performance.lcp}</span>
                                                </div>
                                                <div className="flex justify-between items-center px-2">
                                                    <span className="text-[11px] font-bold text-gray-400">Time to Interactive</span>
                                                    <span className="text-[11px] font-black text-white">{result.performance.tti}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {!result.performance && (
                                            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                                                <AlertTriangle className="opacity-20 mb-3" size={32} />
                                                <p className="text-[11px] font-medium max-w-[200px]">Detailed performance data (Lighthouse) could not be retrieved for this domain.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

