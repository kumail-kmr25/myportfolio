import { 
    Search, 
    Loader2, 
    Globe, 
    Shield, 
    Zap, 
    CheckCircle2, 
    XCircle, 
    Info, 
    BarChart3, 
    AlertTriangle,
    ShieldCheck,
    Cpu,
    Activity,
    Server,
    Layout,
    ArrowRight,
    Terminal,
    Microscope,
    Binary,
    Network,
    Lock,
    Eye,
    FastForward,
    Database,
    Signal,
    Radar,
    Box,
    Layers,
    ArrowUpRight
} from "lucide-react";
import React, { useState } from "react";
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
                setError(data.error || "ANALYSIS_FAILURE: UNABLE_TO_AUDIT_REMOTE_NODE");
            }
        } catch (err) {
            setError("NETWORK_EXCEPTION: CONNECTION_TIMEOUT_DURING_TRACE");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-400";
        if (score >= 50) return "text-blue-400";
        return "text-red-400";
    };

    const StatusIcon = ({ text }: { text: string }) => {
        if (text.includes("✅")) return <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />;
        if (text.includes("❌")) return <XCircle size={16} className="text-red-400 shrink-0" />;
        if (text.includes("⚠️")) return <AlertTriangle size={16} className="text-blue-400 shrink-0" />;
        return <Info size={16} className="text-blue-400 shrink-0" />;
    };

    return (
        <div className="space-y-16">
            {/* Spectral Scanner Interface */}
            <div className="max-w-6xl space-y-12 mx-auto">
                <div className="flex flex-col xl:flex-row items-center gap-12 justify-between p-12 glass-effect rounded-[4.5rem] border border-white/5 relative overflow-hidden group/scanner">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] to-purple-600/[0.03] opacity-0 group-hover/scanner:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="text-center xl:text-left relative z-10 shrink-0 space-y-6">
                        <div className="flex items-center gap-6 justify-center xl:justify-start">
                            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl border border-blue-600/20 text-blue-500 shadow-2xl flex items-center justify-center relative">
                                <Radar size={40} className="animate-spin-slow" />
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-50 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Spectral_Analyzer</h1>
                                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em] mt-3">High-Resolution Node Trace & Recon</p>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleAudit} className="w-full xl:max-w-2xl relative group/form">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-xl opacity-0 group-hover/form:opacity-100 transition-all duration-1000"></div>
                        <div className="relative flex items-center bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-3 backdrop-blur-3xl transition-all group-focus-within/form:border-blue-500/40 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-transparent pointer-events-none" />
                            <div className="flex items-center gap-6 flex-grow px-8 relative z-10">
                                <Globe className="text-gray-700 group-focus-within/form:text-blue-500 transition-colors" size={26} />
                                <input
                                    type="text"
                                    placeholder="SYNC_TARGET_URL..."
                                    className="w-full bg-transparent border-none py-6 text-xl text-white focus:ring-0 font-black tracking-tighter placeholder:text-gray-800 placeholder:uppercase placeholder:text-[11px] placeholder:tracking-[0.4em]"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative z-10 py-6 px-12 rounded-[2rem] bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-5 shadow-2xl shadow-blue-600/40 active:scale-95 group/btn overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <><FastForward size={22} className="group-hover:translate-x-1.5 transition-transform" /> START_PROBE</>}
                            </button>
                        </div>
                    </form>
                </div>

                {error && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-10 rounded-[3rem] bg-red-600/[0.03] border border-red-500/20 text-red-500 text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-8 justify-center italic backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] to-transparent" />
                        <AlertTriangle size={28} className="animate-pulse" />
                        CRITICAL_EXCEPTION: {error}
                    </m.div>
                )}

                <AnimatePresence mode="wait">
                    {result ? (
                        <m.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-12"
                        >
                            {/* Primary Vector Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="glass-effect p-12 rounded-[4.5rem] border border-white/5 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-500">
                                    <div className="absolute -top-10 -right-10 p-10 text-white/[0.01] group-hover:text-blue-500/5 transition-colors">
                                        <Globe size={180} />
                                    </div>
                                    <div className="relative z-10 space-y-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700 italic">Target_Handshake</p>
                                        <h4 className="text-3xl font-black text-white italic truncate tracking-tighter leading-tight">{result.url.replace(/^https?:\/\//, '')}</h4>
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-400/5 px-5 py-3 rounded-2xl border border-blue-400/10 w-fit shadow-lg shadow-blue-500/5">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_#3b82f6]" />
                                            ACTIVE_INGEST_SYNC
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-effect p-12 rounded-[4.5rem] border border-white/5 space-y-10 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-500">
                                    <div className="absolute -top-10 -right-10 p-10 text-white/[0.01] group-hover:text-purple-500/5 transition-colors">
                                        <Zap size={180} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700 italic">Temporal_Propagation</p>
                                        <div className="mt-8 flex items-baseline gap-5">
                                            <span className="text-5xl font-black text-white italic tracking-tighter leading-none">{result.loadTime}</span>
                                            <span className="text-[11px] text-gray-700 font-black uppercase tracking-[0.3em]">Latency_MS</span>
                                        </div>
                                        <div className="mt-10 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <m.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "85%" }}
                                                transition={{ duration: 2, ease: "circOut" }}
                                                className="h-full bg-gradient-to-r from-purple-600/40 to-blue-500/40"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-effect p-12 rounded-[4.5rem] border border-white/5 space-y-10 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-500">
                                    <div className="absolute -top-10 -right-10 p-10 text-white/[0.01] group-hover:text-emerald-500/5 transition-colors">
                                        <ShieldCheck size={180} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700 italic">Cipher_Handshake</p>
                                        <div className="mt-8 flex items-center gap-8">
                                            <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 group-hover:border-emerald-500/40 flex items-center justify-center text-emerald-400 transition-all shadow-2xl shadow-emerald-500/5">
                                                <StatusIcon text={result.ssl} />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">{result.ssl.replace(/✅|⚠️|❌/g, "").trim()}</h4>
                                                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">Encryption_Level</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lighthouse Intelligence Matrix */}
                            {result.performance && (
                                <div className="p-2 bg-white/[0.02] rounded-[5rem] border border-white/5 shadow-inner backdrop-blur-3xl">
                                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                                        {[
                                            { label: "EXECUTION_VELOCITY", score: result.performance.performance, color: "blue", icon: <Zap size={14} /> },
                                            { label: "UNIVERSAL_AFFINITY", score: result.performance.accessibility, color: "purple", icon: <Layers size={14} /> },
                                            { label: "LOGIC_HARDENING", score: result.performance.bestPractices, color: "indigo", icon: <Shield size={14} /> },
                                            { label: "INDEX_AUTHORITY", score: result.performance.seo, color: "emerald", icon: <Search size={14} /> },
                                        ].map((item, i) => (
                                            <m.div 
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={item.label} 
                                                className="p-16 rounded-[4.8rem] glass-effect border border-white/5 flex flex-col items-center justify-center text-center space-y-10 group/metric hover:bg-white/[0.02] transition-all duration-700"
                                            >
                                                <div className="relative">
                                                    <svg className="w-40 h-40 transform -rotate-90">
                                                        <circle className="text-white/[0.02]" strokeWidth="8" stroke="currentColor" fill="transparent" r="74" cx="80" cy="80" />
                                                        <m.circle 
                                                            initial={{ strokeDasharray: "0 465" }}
                                                            animate={{ strokeDasharray: `${(item.score / 100) * 465} 465` }}
                                                            transition={{ duration: 2.5, ease: "circOut", delay: 0.5 + i * 0.1 }}
                                                            className={getScoreColor(item.score).replace('text-', 'stroke-')} 
                                                            strokeWidth="8" 
                                                            strokeLinecap="round" 
                                                            stroke="currentColor" 
                                                            fill="transparent" 
                                                            r="74" cx="80" cy="80" 
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                                                        <span className={`text-5xl font-black ${getScoreColor(item.score)} italic tracking-tighter leading-none`}>{item.score}</span>
                                                        <span className="text-[11px] text-gray-800 font-bold uppercase tracking-[0.2em]">NODE_VAL</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 justify-center text-gray-700 group-hover/metric:text-white transition-colors">
                                                        {item.icon}
                                                        <p className="text-[11px] font-black uppercase tracking-[0.4em] italic">{item.label}</p>
                                                    </div>
                                                    <div className="h-1 w-10 bg-white/5 mx-auto rounded-full group-hover/metric:w-24 group-hover/metric:bg-blue-500/40 transition-all duration-700" />
                                                </div>
                                            </m.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Deep Heuristic Clusters */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                                {/* Semantic Logic Unit */}
                                <div className="glass-effect p-16 rounded-[5rem] border border-white/5 space-y-14 relative overflow-hidden bg-white/[0.01]">
                                    <div className="flex items-center gap-8 relative z-10">
                                        <div className="w-20 h-20 bg-blue-600/10 rounded-3xl border border-blue-600/20 text-blue-500 shadow-2xl flex items-center justify-center">
                                            <Database size={36} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Semantic_Substrate</h3>
                                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em] mt-3">Metadata Archetype & Crawler Parity</p>
                                        </div>
                                    </div>

                                    <div className="space-y-12 relative z-10">
                                        {[
                                            { label: "Core_Identifier (Title)", status: result.seo.title, content: result.seo.titleContent, icon: <Binary size={18} /> },
                                            { label: "Node_Description (Meta)", status: result.seo.description, content: result.seo.descriptionContent, icon: <Eye size={18} /> },
                                            { label: "Semantic_Apex (H1)", status: result.seo.h1, icon: <Network size={18} /> },
                                            { label: "Social_Vector (OG)", status: result.seo.ogTags, icon: <Globe size={18} /> },
                                        ].map((item, idx) => (
                                            <m.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2 + idx * 0.1 }}
                                                key={idx} 
                                                className="space-y-6 group/entry pb-12 border-b border-white/5 last:border-0 last:pb-0"
                                            >
                                                <div className="flex justify-between items-center bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 group-hover/entry:border-blue-500/20 group-hover/entry:bg-white/[0.04] transition-all duration-500">
                                                    <div className="flex items-center gap-5">
                                                        <span className="text-blue-500/40 group-hover/entry:text-blue-500 transition-colors">{item.icon}</span>
                                                        <span className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover/entry:text-gray-300 transition-colors italic">{item.label}</span>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div className="text-[9px] font-black uppercase tracking-[0.4em] bg-black/60 px-5 py-2.5 rounded-xl text-gray-700 font-mono italic">
                                                            SYNCHRONIZED
                                                        </div>
                                                        <StatusIcon text={item.status} />
                                                    </div>
                                                </div>
                                                {item.content && (
                                                    <div className="p-10 bg-black/40 rounded-[3rem] border border-white/5 group-hover/entry:border-blue-500/10 group-hover/entry:bg-black/80 transition-all duration-700 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/entry:opacity-10 transition-opacity">
                                                            <ArrowUpRight size={100} className="text-blue-500" />
                                                        </div>
                                                        <p className="text-base text-gray-500 font-medium leading-relaxed italic line-clamp-4 relative z-10 pr-12">
                                                            &ldquo;{item.content}&rdquo;
                                                        </p>
                                                    </div>
                                                )}
                                            </m.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience Cluster */}
                                <div className="glass-effect p-16 rounded-[5rem] border border-white/5 space-y-14 relative overflow-hidden bg-white/[0.01]">
                                    <div className="flex items-center gap-8 relative z-10">
                                        <div className="w-20 h-20 bg-purple-600/10 rounded-3xl border border-purple-600/20 text-purple-500 shadow-2xl flex items-center justify-center">
                                            <Cpu size={36} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Experience_Vitals</h3>
                                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em] mt-3">Rendering Latency & Node Cohesion</p>
                                        </div>
                                    </div>

                                    <div className="space-y-14 relative z-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {[
                                                { label: "RESPONSIVE_NODE", value: result.mobile.responsive, sub: "Adaptive Layer Integrity" },
                                                { label: "VIEWPORT_RATIO", value: result.mobile.viewport, sub: "High-Density Rasterization" },
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] space-y-8 text-center group/card hover:bg-white/[0.04] transition-all duration-500 shadow-xl">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-white/10 transition-all">
                                                            <StatusIcon text={item.value} />
                                                        </div>
                                                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{item.value.replace(/✅|❌/g, "").trim()}</h4>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white italic">{item.label}</p>
                                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-800">{item.sub}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {result.performance ? (
                                            <div className="space-y-12 pt-12 border-t border-white/5 px-6 font-mono">
                                                {[
                                                    { label: "First_Contentful_Paint (FCP)", value: result.performance.fcp, color: "from-blue-600/40" },
                                                    { label: "Largest_Contentful_Paint (LCP)", value: result.performance.lcp, color: "from-purple-600/40" },
                                                    { label: "Interactive_Threshold (TTI)", value: result.performance.tti, color: "from-indigo-600/40" },
                                                ].map((metric, i) => (
                                                    <div key={i} className="space-y-5 group/metric">
                                                        <div className="flex justify-between items-end">
                                                            <div className="space-y-2">
                                                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 group-hover/metric:text-blue-500 transition-colors italic">{metric.label}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="text-3xl font-black text-white italic tracking-tighter group-hover/metric:text-blue-500 transition-colors">{metric.value}</span>
                                                            </div>
                                                        </div>
                                                        <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                                                            <m.div 
                                                                initial={{ width: 0 }} 
                                                                animate={{ width: "100%" }} 
                                                                transition={{ duration: 2 + i * 0.4, ease: "circOut", delay: 1.5 }}
                                                                className={`h-full bg-gradient-to-r ${metric.color} to-transparent shadow-[0_0_20px_rgba(37,99,235,0.2)]`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-24 text-center text-gray-800 bg-white/[0.01] rounded-[4rem] border-2 border-dashed border-white/5">
                                                <Signal className="opacity-10 mb-10 animate-pulse text-gray-500" size={80} />
                                                <div className="space-y-4 px-12">
                                                    <p className="text-xl font-black uppercase tracking-[0.3em] text-white italic">Telemetry_Interrupted</p>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] max-w-[320px] leading-relaxed italic text-gray-700 mx-auto">
                                                        Lighthouse protocol failed to establish parity with remote endpoint.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    ) : (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-56 text-center space-y-12"
                        >
                            <div className="relative">
                                <Radar size={160} className="text-white/[0.02]" />
                                <m.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-2.5 h-2.5 bg-blue-500/40 rounded-full blur-[3px] transform translate-y-20 border border-blue-400/20" />
                                </m.div>
                                <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full" />
                            </div>
                            <div className="space-y-6">
                                <p className="text-xl font-black uppercase tracking-[0.6em] text-gray-800 italic">Core_Engine_Standby</p>
                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900">Awaiting target node synchronization protocols...</p>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}



