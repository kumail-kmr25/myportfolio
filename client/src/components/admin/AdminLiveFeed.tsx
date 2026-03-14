import { m, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Zap,
    Briefcase,
    Mail,
    Clock,
    ChevronRight,
    Activity,
    ShieldCheck,
    Cpu,
    Star,
    Search,
    Globe
} from "lucide-react";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/lib/api";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('auth-unauthorized'));
        throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
};

interface Activity {
    id: string;
    type: "hire" | "message" | "diagnostic" | "system" | "security" | "testimonial" | "audit";
    title: string;
    subtitle: string;
    timestamp: string;
    status: string;
    color: string;
}

const TYPE_CONFIG: Record<string, any> = {
    hire: { icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/20" },
    message: { icon: Mail, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-500/20" },
    diagnostic: { icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/20" },
    testimonial: { icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-500/20" },
    audit: { icon: Search, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/20" },
    system: { icon: Cpu, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-500/20" },
    security: { icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20" },
};

interface AdminLiveFeedProps {
    initialActivities?: Activity[];
}

export default function AdminLiveFeed({ initialActivities = [] }: AdminLiveFeedProps) {
    const [mounted, setMounted] = useState(false);
    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        setMounted(true);
        setSessionId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    const { data: activities, error, isLoading } = useSWR<Activity[]>("/api/admin/activity-feed", fetcher, {
        refreshInterval: 10000,
        fallbackData: initialActivities
    });

    return (
        <div className="glass-effect rounded-[3rem] border border-white/5 overflow-hidden flex flex-col h-[650px] bg-black/20 animate-in fade-in duration-700 shadow-2xl shadow-blue-500/[0.02]">
            {/* Terminal Header */}
            <div className="bg-white/[0.03] px-10 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20" />
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <Terminal size={16} className="text-gray-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Activity Telemetry Stream</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-500/80">Live Socket Active</span>
                    </div>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar space-y-4 font-mono">
                {isLoading && !activities && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40">
                        <div className="relative">
                            <Activity className="animate-spin text-blue-500/40" size={48} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Zap size={16} className="text-blue-400" />
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 animate-pulse">Establishing Telemetry Bridge...</p>
                    </div>
                )}

                {error && (
                    <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                        <Globe size={14} /> Critical: Activity stream synchronization failure. Retrying...
                    </div>
                )}


                <AnimatePresence initial={false}>
                    {Array.isArray(activities) && activities.map((activity: any) => {
                        const config = TYPE_CONFIG[activity.type] || TYPE_CONFIG.message;
                        return (
                            <m.div
                                key={`${activity.type}-${activity.id}`}
                                initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                className={`group flex items-start gap-6 p-5 rounded-2xl bg-white/[0.01] border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] transition-all cursor-default group/item`}
                            >
                                <div className={`mt-1 w-10 h-10 rounded-[1.2rem] ${config.bg} ${config.color} flex items-center justify-center shrink-0 border ${config.border} transition-transform group-hover/item:scale-110`}>
                                    <config.icon size={18} />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-[11px] font-black text-white truncate uppercase tracking-[0.1em]">{activity.title}</h4>
                                            {activity.status && (
                                                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-gray-500 uppercase">
                                                    {activity.status}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[9px] text-gray-600 shrink-0 flex items-center gap-2 font-black uppercase italic">
                                            <Clock size={12} className="opacity-40" />
                                            {mounted ? formatDistanceToNow(new Date(activity.timestamp)) : "Initial"} ago
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 truncate leading-relaxed font-medium">
                                        <span className="text-gray-700 mr-2 opacity-50">&gt;</span>
                                        {activity.subtitle}
                                    </p>
                                </div>
                                <div className="hidden group-hover/item:flex shrink-0 items-center justify-center w-8 h-8 rounded-xl bg-white/5 text-gray-600 transition-colors hover:text-white">
                                    <ChevronRight size={16} />
                                </div>
                            </m.div>
                        );
                    })}
                </AnimatePresence>

                {activities?.length === 0 && (
                    <div className="p-12 text-center text-[11px] text-gray-600 uppercase tracking-[0.4em] border border-dashed border-white/5 rounded-[3rem] font-black italic">
                        Void detected. Awaiting system triggers.
                    </div>
                )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-white/[0.02] px-10 py-5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                        Stream Buffer: 20 Events
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <p className="text-[9px] text-gray-800 font-mono tracking-tighter hidden sm:block">
                        ENV: PRODUCTION // KMR_ENGINE_VERSION: 2.0.4
                    </p>
                    <p className="text-[9px] text-blue-500/50 font-mono font-black uppercase tracking-widest">
                        SID: {sessionId || "HANDSHAKE..."}
                    </p>
                </div>
            </div>
        </div>
    );
}
