"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Zap,
    Briefcase,
    Mail,
    Clock,
    ChevronRight,
    Activity,
    ShieldCheck,
    Cpu
} from "lucide-react";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const TYPE_CONFIG: any = {
    hire: { icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/20" },
    message: { icon: Mail, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-500/20" },
    diagnostic: { icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/20" },
    system: { icon: Cpu, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-500/20" },
    security: { icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20" },
};

export default function AdminLiveFeed() {
    const { data: activities, error, isLoading } = useSWR("/api/admin/activity-feed", fetcher, {
        refreshInterval: 10000 // Poll every 10 seconds
    });

    return (
        <div className="glass-effect rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col h-[600px]">
            {/* Terminal Header */}
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-gray-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Live Activity Command Center</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500/70">Live Feed</span>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-3 font-mono">
                {isLoading && !activities && (
                    <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                        <Activity className="animate-spin text-blue-500" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Initializing Terminal...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 text-xs">
                        Error fetching activity stream.
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {activities?.map((activity: any) => {
                        const config = TYPE_CONFIG[activity.type] || TYPE_CONFIG.message;
                        return (
                            <motion.div
                                key={`${activity.type}-${activity.id}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-transparent hover:border-white/5 hover:bg-white/[0.04] transition-all cursor-default`}
                            >
                                <div className={`mt-1 w-8 h-8 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0 border ${config.border}`}>
                                    <config.icon size={14} />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center justify-between gap-4 mb-0.5">
                                        <h4 className="text-[11px] font-bold text-white truncate uppercase tracking-tight">{activity.title}</h4>
                                        <span className="text-[9px] text-gray-600 shrink-0 flex items-center gap-1.5">
                                            <Clock size={10} />
                                            {formatDistanceToNow(new Date(activity.timestamp))} ago
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 truncate leading-relaxed">{activity.subtitle}</p>
                                </div>
                                <div className="hidden group-hover:flex shrink-0 items-center justify-center w-6 h-6 rounded-lg bg-white/5 text-gray-400">
                                    <ChevronRight size={14} />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {activities?.length === 0 && (
                    <div className="p-8 text-center text-[10px] text-gray-600 uppercase tracking-widest border border-dashed border-white/5 rounded-3xl">
                        No recent activity detected.
                    </div>
                )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-white/[0.02] px-8 py-3 border-t border-white/5 flex items-center justify-between">
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    Showing last 20 system interactions
                </p>
                <p className="text-[9px] text-gray-700 font-mono">
                    Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </p>
            </div>
        </div>
    );
}
