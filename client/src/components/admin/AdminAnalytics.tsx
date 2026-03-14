import { TrendingUp, Users, MousePointer2, Briefcase, Zap, Activity, Target, Rocket } from "lucide-react";
import { m } from "framer-motion";

interface AnalyticsProps {
    stats: {
        diagRuns: number;
        leadGenTotal: number;
        hireRequests: number;
        patternsMatched: number;
        auditCount: number;
        auditLeads: number;
    }
}

export default function AdminAnalytics({ stats }: AnalyticsProps) {
    const conversionRate = stats.diagRuns > 0 ? ((stats.leadGenTotal / stats.diagRuns) * 100).toFixed(1) : 0;
    const hireChannelMix = stats.hireRequests > 0 ? ((stats.leadGenTotal / stats.hireRequests) * 100).toFixed(1) : 0;

    const data = [
        { label: "Diagnostic Sync", value: `${conversionRate}%`, subtitle: "Run-to-Lead Ratio", icon: Zap, bg: "bg-blue-500/5", text: "text-blue-400", border: "border-blue-500/30", id: "AN-01", latency: "12ms" },
        { label: "Talent Efficiency", value: `${hireChannelMix}%`, subtitle: "Bridge Contribution", icon: Briefcase, bg: "bg-indigo-500/5", text: "text-indigo-400", border: "border-indigo-500/30", id: "AN-02", latency: "45ms" },
        { label: "Matched Issues", value: stats.patternsMatched, subtitle: "Total Knowledge Matches", icon: MousePointer2, bg: "bg-purple-500/5", text: "text-purple-400", border: "border-purple-500/30", id: "AN-03", latency: "08ms" },
        { label: "Bridge Leads", value: stats.leadGenTotal, subtitle: "Direct CTA Conversions", icon: Users, bg: "bg-green-500/5", text: "text-green-400", border: "border-green-500/30", id: "AN-04", latency: "112ms" },
        { label: "Site Audits", value: stats.auditCount, subtitle: "Total Analysis Cycles", icon: Activity, bg: "bg-emerald-500/5", text: "text-emerald-400", border: "border-emerald-500/30", id: "AN-05", latency: "230ms" },
        { label: "Audit Conversion", value: `${stats.auditCount > 0 ? ((stats.auditLeads / stats.auditCount) * 100).toFixed(1) : 0}%`, subtitle: "Conversion Efficiency", icon: Target, bg: "bg-orange-500/5", text: "text-orange-400", border: "border-orange-500/30", id: "AN-06", latency: "15ms" },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Intelligence Vector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item, i) => (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className={`group relative p-8 rounded-[2.5rem] border ${item.border} bg-[#080808] hover:bg-white/[0.01] transition-all duration-500 overflow-hidden`}
                    >
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${item.bg} blur-[60px] opacity-20 group-hover:opacity-60 transition-opacity duration-1000`} />
                        
                        <div className="flex items-start justify-between relative z-10 mb-10">
                            <div className="space-y-4">
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} border border-white/5 flex items-center justify-center ${item.text} group-hover:rotate-[360deg] transition-all duration-1000`}>
                                    <item.icon size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">{item.id} // ANALYTIC_NODE</span>
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none">{item.value}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-[7px] font-mono text-gray-800">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5">
                                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                                    SYNC
                                </div>
                                <span className="tracking-tighter italic">{item.latency}_LAT</span>
                            </div>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">{item.label}</p>
                                <div className="flex-grow h-[1px] bg-white/[0.05]" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] text-gray-700 font-bold uppercase tracking-widest">{item.subtitle}</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(j => (
                                        <div key={j} className={`w-1 h-3 rounded-full ${j <= 3 ? 'bg-blue-500/20' : 'bg-gray-900'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Strategic Intelligence Controller */}
            <div className="p-1 sm:p-1 md:p-16 rounded-[4rem] bg-[#050505] border border-white/5 relative overflow-hidden group/strategic">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] to-purple-600/[0.03]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16">
                    <div className="max-w-2xl space-y-10">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-blue-600 flex items-center justify-center rounded-[2rem] text-white shadow-2xl shadow-blue-600/40 relative overflow-hidden group-hover/strategic:scale-110 transition-transform duration-700">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/strategic:translate-y-0 transition-transform duration-700" />
                                <Rocket size={28} className="relative z-10" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Strategic_Control_Unit</h3>
                                <div className="flex items-center gap-3 mt-1.5 text-blue-500">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Integrated_Growth_Logic // v1.2</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg font-medium text-white/40 leading-relaxed italic border-l-2 border-blue-500/20 pl-8">
                                The diagnostic-to-lead bridge is operational at <strong className="text-white italic">{conversionRate}% efficiency</strong>. High-intent traffic from technical audits is successfully bypassing funnel friction, resulting in <strong className="text-white italic">{stats.leadGenTotal} verified conversion handshakes</strong>.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Funnel_Integrity", val: "ACTIVE", color: "text-emerald-500" },
                                    { label: "Lead_Resonance", val: "94.2%", color: "text-blue-400" },
                                    { label: "Bridge_Latency", val: "3.4ms", color: "text-gray-500" },
                                    { label: "Auth_Protocol", val: "ESTABLISHED", color: "text-blue-500" }
                                ].map((tag, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">{tag.label}</span>
                                        <span className={`text-[9px] font-mono font-black uppercase ${tag.color}`}>{tag.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full xl:w-80">
                        <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 text-center relative group/node hover:bg-white/[0.03] transition-all">
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[7px] font-black text-gray-800 uppercase tracking-widest">S-ENGAGEMENT</span>
                            <p className="text-6xl font-black text-white italic tracking-tighter">{stats.diagRuns.toString().padStart(3, '0')}</p>
                            <div className="mt-4 flex flex-col items-center gap-1">
                                <div className="w-12 h-[2px] bg-blue-500/20 rounded-full" />
                                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">Total_System_Runs</p>
                            </div>
                        </div>
                        
                        <div className="p-10 rounded-[3rem] bg-blue-600 text-white text-center relative group/node shadow-2xl shadow-blue-600/20 hover:scale-105 transition-all">
                            <m.div 
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-white"
                            />
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[7px] font-black text-blue-200 uppercase tracking-widest relative z-10">H-TARGETS</span>
                            <p className="text-6xl font-black text-white italic tracking-tighter relative z-10">{stats.leadGenTotal.toString().padStart(3, '0')}</p>
                            <div className="mt-4 flex flex-col items-center gap-1 relative z-10">
                                <div className="w-12 h-[2px] bg-white/30 rounded-full" />
                                <p className="text-[10px] text-blue-100 font-black uppercase tracking-[0.2em]">High_Intent_Leads</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 border border-blue-500/40 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        </div>
                        <span className="text-[8px] font-black text-gray-800 uppercase tracking-[0.4em]">Edge_Handshake_Active</span>
                    </div>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map(k => (
                            <div key={k} className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                                <m.div 
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: k * 0.5 }}
                                    className="h-full w-1/2 bg-blue-500/20"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

