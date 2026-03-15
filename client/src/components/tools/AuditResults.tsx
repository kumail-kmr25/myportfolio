"use client";

import { CheckCircle2, XCircle, AlertTriangle, Info, Globe, Shield, Zap, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { m, Variants } from "framer-motion";
import Link from "next/link";

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

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function AuditResults({ result }: { result: AuditResult }) {
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
        <m.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* Connection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Globe, label: "Domain Under Review", value: result.url, color: "text-blue-400" },
                    { icon: Zap, label: "Total Connection", value: `${result.loadTime} Response`, color: "text-yellow-400" },
                    { icon: Shield, label: "SSL Certificate", value: result.ssl.replace(/✅|⚠️|❌/g, "").trim(), color: "text-green-400", status: result.ssl },
                ].map((stat, idx) => (
                    <m.div key={idx} variants={item} className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-4 relative overflow-hidden group">
                        <div className={`p-3 bg-white/5 rounded-2xl w-fit ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
                            <h4 className="text-white font-bold truncate text-sm flex items-center gap-2">
                                {stat.status && <StatusIcon text={stat.status} />}
                                {stat.value}
                            </h4>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Performance Scores */}
            {result.performance && (
                <m.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Performance", score: result.performance.performance },
                        { label: "Accessibility", score: result.performance.accessibility },
                        { label: "Best Practices", score: result.performance.bestPractices },
                        { label: "SEO", score: result.performance.seo },
                    ].map((score) => (
                        <div key={score.label} className="glass-effect p-8 rounded-[2.5rem] border border-white/5 text-center space-y-3 relative group">
                            <div className="absolute inset-0 bg-white/[0.01] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className={`text-5xl font-black tracking-tighter ${getScoreColor(score.score)}`}>
                                {score.score}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{score.label}</p>
                        </div>
                    ))}
                </m.div>
            )}

            {/* Detailed Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* SEO Card */}
                <m.div variants={item} className="glass-effect p-10 rounded-[3rem] border border-white/5 space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 shadow-xl shadow-blue-500/10">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">SEO Infrastructure</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Metadata & Semantics</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {[
                            { label: "Meta Title", status: result.seo.title, content: result.seo.titleContent },
                            { label: "Meta Description", status: result.seo.description, content: result.seo.descriptionContent },
                            { label: "H1 Hierarchy", status: result.seo.h1 },
                            { label: "Open Graph Tags", status: result.seo.ogTags },
                        ].map((detail, idx) => (
                            <div key={idx} className="space-y-3 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400">{detail.label}</span>
                                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                        <StatusIcon text={detail.status || "ℹ️"} />
                                        {(detail.status || "").replace(/✅|❌/g, "").trim() || "N/A"}
                                    </span>
                                </div>
                                {detail.content && (
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mt-2">
                                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium line-clamp-2 italic">
                                            &quot;{detail.content}&quot;
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </m.div>

                {/* Performance Card */}
                <m.div variants={item} className="glass-effect p-10 rounded-[3rem] border border-white/5 space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 shadow-xl shadow-yellow-500/10">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Execution & UX</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Speed & Core Web Vitals</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Mobile Responsive", value: result.mobile.responsive },
                                { label: "Viewport Config", value: result.mobile.viewport },
                            ].map((stat, idx) => (
                                <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] text-center space-y-3 cursor-default hover:bg-white/[0.04] transition-colors">
                                    <div className="flex justify-center">
                                        <StatusIcon text={stat.value} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 underline underline-offset-4 decoration-white/10">{stat.label}</p>
                                    <p className="text-xs font-bold text-white">{(stat.value || "").replace(/✅|❌/g, "").trim() || "N/A"}</p>
                                </div>
                            ))}
                        </div>

                        {result.performance && (
                            <div className="space-y-5 pt-4 border-t border-white/5">
                                {[
                                    { label: "First Contentful Paint", value: result.performance.fcp },
                                    { label: "Largest Contentful Paint", value: result.performance.lcp },
                                    { label: "Time to Interactive", value: result.performance.tti },
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex justify-between items-center px-4">
                                        <span className="text-xs font-bold text-gray-400">{stat.label}</span>
                                        <span className="text-sm font-black text-white">{stat.value || "N/A"}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </m.div>
            </div>

            {/* Conversion CTA */}
            <m.div 
                variants={item}
                className="relative mt-20"
            >
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] -z-10" />
                <div className="glass-effect rounded-[3.5rem] border border-blue-500/10 p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles size={120} className="text-blue-500" />
                    </div>
                    
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <Sparkles size={14} />
                            Strategic Optimization Required
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                            Ready to <span className="text-blue-500 italic">Optimize</span> Your Deployment?
                        </h3>
                        
                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                            {result.performance && result.performance.performance < 70 
                                ? "Significant performance bottlenecks were detected. Let's engineer a solution to boost your metrics and user experience."
                                : "Your site has a solid foundation. Let's take it to the next level with precision engineering and advanced optimizations."}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <Link 
                            href={`/hire?service=Bug%20Fix%20/%20Optimization&source=audit_tool&website=${encodeURIComponent(result.url)}`}
                            className="w-full sm:w-auto px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em] group shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all"
                        >
                            Execute Optimization
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link 
                            href="/"
                            className="text-gray-500 hover:text-white text-[11px] font-black uppercase tracking-[0.3em] transition-colors"
                        >
                            Return to Dashboard
                        </Link>
                    </div>

                    {/* Technical Footnote */}
                    <div className="pt-8 flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-gray-600 border-t border-white/5">
                        <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-blue-500" /> Lead Sync Active</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-blue-500" /> Technical Data Attached</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-blue-500" /> 24h Response SLA</span>
                    </div>
                </div>
            </m.div>
        </m.div>
    );
}
