"use client";

import { TrendingUp, Users, MousePointer2, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsProps {
    stats: {
        diagRuns: number;
        leadGenTotal: number;
        hireRequests: number;
        patternsMatched: number;
    }
}

export default function AdminAnalytics({ stats }: AnalyticsProps) {
    const conversionRate = stats.diagRuns > 0 ? ((stats.leadGenTotal / stats.diagRuns) * 100).toFixed(1) : 0;
    const hireChannelMix = stats.hireRequests > 0 ? ((stats.leadGenTotal / stats.hireRequests) * 100).toFixed(1) : 0;

    const data = [
        { label: "Diagnostic Conversion", value: `${conversionRate}%`, subtitle: "Runs to Contact Prefills", icon: Zap, bg: "bg-blue-500/10", text: "text-blue-400" },
        { label: "Hire Efficiency", value: `${hireChannelMix}%`, subtitle: "Bridge Contribution to Hires", icon: Briefcase, bg: "bg-indigo-500/10", text: "text-indigo-400" },
        { label: "Knowledge Depth", value: stats.patternsMatched, subtitle: "Total Matched Issues", icon: MousePointer2, bg: "bg-purple-500/10", text: "text-purple-400" },
        { label: "Network Growth", value: stats.leadGenTotal, subtitle: "Bridge-generated Leads", icon: Users, bg: "bg-green-500/10", text: "text-green-400" },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {data.map((item, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            boxShadow: "0 20px 40px -20px rgba(59, 130, 246, 0.2)"
                        }}
                        transition={{
                            opacity: { delay: i * 0.1 },
                            y: { duration: 0.3 }
                        }}
                        key={i}
                        className="glass-effect p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                            <item.icon className={item.text} size={18} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 relative z-10">{item.value}</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest relative z-10">{item.label}</p>
                        <p className="text-[9px] text-gray-600 mt-2 font-medium italic relative z-10">{item.subtitle}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-effect p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
                <div className="space-y-4 max-w-md text-center md:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
                        <TrendingUp className="text-green-500" size={24} />
                        System Performance
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        The diagnostic-to-hire bridge is currently converting <strong>{conversionRate}%</strong> of technical inquiries into qualified project leads. Providing immediate technical value remains your strongest lead magnet.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-4 sm:px-8 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 border border-white/5 text-center">
                        <p className="text-2xl sm:text-3xl font-black text-white">{stats.diagRuns}</p>
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">Global Runs</p>
                    </div>
                    <div className="px-6 py-4 sm:px-8 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] bg-blue-500/10 border border-blue-500/10 text-center">
                        <p className="text-2xl sm:text-3xl font-black text-blue-400">{stats.leadGenTotal}</p>
                        <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest mt-1">Hot Leads</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
