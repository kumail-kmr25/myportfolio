import {
    Users,
    MessageSquare,
    Mail,
    FolderPlus,
    TrendingUp,
    Clock,
    Zap,
    Briefcase,
    Activity,
    ShieldCheck,
    Cpu,
    Globe,
    Lock,
    Command,
    Fingerprint,
    Database,
    ZapOff,
    ArrowUpRight,
    Server,
    Network,
    Gift,
    Target
} from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import AdminLiveFeed from "./AdminLiveFeed";

interface OverviewProps {
    stats: {
        projects: number;
        testimonials: number;
        messages: number;
        hireRequests: number;
        blogPosts: number;
        referrals: number;
        leadMagnets: number;
        playgroundSessions: number;
    };
    recentActivity: any[];
    availabilityStatus: string;
    onUpdateAvailability: (status: string) => Promise<void>;
}

export default function DashboardOverview({ stats, recentActivity, availabilityStatus, onUpdateAvailability }: OverviewProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = async () => {
        setIsUpdating(true);
        const nextStatus = availabilityStatus === "Available" ? "Busy" : "Available";
        try {
            await onUpdateAvailability(nextStatus);
        } finally {
            setIsUpdating(false);
        }
    };

    const cards = [
        { label: "Engineering_Repository", value: stats.projects, icon: FolderPlus, id: "C-01", buffer: "92%", load: "L-LOW", text: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/5" },
        { label: "Viral_Propagation", value: stats.referrals, icon: Gift, id: "C-02", buffer: "88%", load: "L-MED", text: "text-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
        { label: "Lead_Velocity", value: stats.leadMagnets, icon: Target, id: "C-03", buffer: "95%", load: "L-OPT", text: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/5" },
        { label: "Playground_Instance", value: stats.playgroundSessions, icon: Cpu, id: "C-04", buffer: "99%", load: "L-HIGH", text: "text-indigo-500", border: "border-indigo-500/30", bg: "bg-indigo-500/5" },
    ];

    return (
        <div className="space-y-16">
            {/* Conversion Pulse Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, i) => (
                    <m.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative p-8 rounded-[2.5rem] border ${card.border} bg-[#080808] overflow-hidden hover:scale-[1.02] transition-all duration-700`}
                    >
                        <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${card.bg} blur-[100px] opacity-20 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none`} />
                        
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className="flex flex-col gap-1">
                                <span className={`text-[8px] font-mono font-black ${card.text} opacity-60 tracking-widest`}>{card.id} {/* TELEMETRY */}</span>
                                <div className={`w-12 h-12 rounded-2xl ${card.bg} border border-white/5 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000`}>
                                    <card.icon className={card.text} size={20} />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <TrendingUp size={10} className="text-emerald-500" />
                                    <span className="text-[9px] font-black text-white/50 tracking-widest uppercase">+{Math.floor(Math.random() * 20)+10}%</span>
                                </div>
                                <span className="text-[7px] font-black text-gray-800 uppercase tracking-[0.3em]">SECURE_HANDSHAKE</span>
                            </div>
                        </div>
                        
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">{card.value.toString().padStart(2, '0')}</h3>
                                <span className="text-[10px] text-gray-800 font-mono">UNITS</span>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <p className="text-white/80 text-[9px] font-black uppercase tracking-[0.4em]">{card.label}</p>
                                    <div className="flex-grow h-[1px] bg-white/[0.05]" />
                                </div>
                                
                                <div className="flex items-center justify-between text-[7px] font-mono text-gray-700">
                                    <span className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-gray-900 group-hover:bg-blue-500 transition-colors" />
                                        BUFFER {/* // {card.buffer} */} {card.buffer}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        LOAD // {card.load}
                                        <div className="w-1 h-3 bg-gray-900 group-hover:bg-blue-500/50" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Main Operational Flow */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Primary Telemetry Stream */}
                <m.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="xl:col-span-8 space-y-10"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-8 py-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                <Activity size={24} className="animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Hyper-Trace_Feed</h2>
                                <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] mt-0.5">Real-time cross-module operational telemetry</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-white/5 flex items-center justify-center text-[10px] text-gray-500 font-black">M{i}</div>
                                ))}
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-[ping_1.5s_infinite]" />
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Buffer_Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/10 to-transparent rounded-[4rem] blur opacity-50 pointer-events-none" />
                        <AdminLiveFeed initialActivities={recentActivity} />
                    </div>
                </m.div>

                {/* Tactical Sidebar */}
                <m.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="xl:col-span-4 space-y-12"
                >
                    {/* Identity Matrix */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 px-6">
                            <Fingerprint className="text-purple-500" size={20} />
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Identity_Vector</h2>
                        </div>
                        <div className="p-10 rounded-[3.5rem] bg-indigo-600/[0.02] border border-white/5 relative overflow-hidden group/id">
                            <div className="absolute top-0 right-0 p-10 text-white/[0.02] group-hover:text-indigo-500/10 transition-all pointer-events-none">
                                <Lock size={120} />
                            </div>
                            
                            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-600 border border-white/10 flex items-center justify-center text-4xl font-black text-white italic group-hover:scale-110 transition-transform">
                                        K
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center text-green-500">
                                        <ShieldCheck size={18} />
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">Kumail_KMR</h4>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Root_Authorized</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4 relative z-10">
                                {[
                                    { label: "Temporal_Auth", val: "ESTABLISHED", icon: Database },
                                    { label: "Authority_Level", val: "SUPER_USER", icon: ShieldCheck, color: "text-emerald-500" },
                                    { label: "Deployment_Node", val: "V_EDGE_01", icon: Globe, color: "text-blue-500" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl group/item hover:bg-white/[0.04] transition-all">
                                        <div className="flex items-center gap-3 text-[10px]">
                                            <item.icon size={14} className="text-gray-700 group-hover/item:text-indigo-500 transition-colors" />
                                            <span className="text-gray-600 font-black uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className={`text-[10px] font-mono font-black uppercase ${item.color || 'text-white'}`}>{item.val}</span>
                                    </div>
                                ))}
                                
                                <div className="pt-6">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">Availability_Matrix</p>
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${availabilityStatus === "Available" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}>
                                            {availabilityStatus}
                                        </span>
                                    </div>
                                    <m.button 
                                        onClick={handleToggle}
                                        whileTap={{ scale: 0.96 }}
                                        className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden group/btn ${availabilityStatus === "Available" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}
                                    >
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${availabilityStatus === "Available" ? "bg-emerald-500" : "bg-red-500"} shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse`} />
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Toggle_Broadcast</span>
                                        </div>
                                        <div className="relative z-10">
                                            {isUpdating ? <Loader2 size={16} className="animate-spin text-white/50" /> : <Zap size={16} className="text-white/30 group-hover/btn:text-white transition-all group-hover/btn:rotate-12" />}
                                        </div>
                                    </m.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Kernel Health */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 px-6">
                            <Cpu className="text-emerald-500" size={20} />
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Kernel_Integrity</h2>
                        </div>
                        <div className="p-10 bg-emerald-500/[0.01] border border-white/5 rounded-[3.5rem] space-y-8 relative overflow-hidden group/kernel">
                            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/kernel:opacity-100 transition-opacity duration-1000" />

                            {[
                                { label: "DB_SYNC_LATENCY", val: "38ms", progress: 92, color: "emerald" },
                                { label: "EDGE_RUNTIME_LOAD", val: "14%", progress: 85, color: "blue" },
                                { label: "SECURITY_AUTH_TLS", val: "ACTIVE", progress: 100, color: "purple" }
                            ].map((stat, idx) => (
                                <div key={idx} className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">{stat.label}</span>
                                        <span className={`text-[10px] text-${stat.color}-500 font-mono font-black italic`}>{stat.val}</span>
                                    </div>
                                    <div className="h-[3px] bg-white/[0.03] rounded-full overflow-hidden">
                                        <m.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${stat.progress}%` }}
                                            transition={{ duration: 2, ease: "circOut", delay: idx * 0.2 }}
                                            className={`h-full bg-gradient-to-r from-transparent to-${stat.color}-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]`}
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            <div className="pt-4 relative z-10">
                                <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover/kernel:bg-white/5 transition-all">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 group-hover/kernel:rotate-[360deg] transition-all duration-1000">
                                        <Server size={18} className="text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Global_Grid_Status</p>
                                        <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em]">Operational // Locked</p>
                                    </div>
                                    <ArrowUpRight size={18} className="ml-auto text-gray-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
