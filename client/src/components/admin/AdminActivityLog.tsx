import { useState } from "react";
import { 
    Clock, 
    Shield, 
    Globe, 
    User, 
    Terminal, 
    Search, 
    Activity, 
    Monitor, 
    ChevronRight,
    ArrowUpRight,
    Calendar,
    Zap,
    Cpu,
    Fingerprint,
    HardDrive,
    Lock,
    Eye,
    Hash,
    Command,
    Signal,
    Box,
    Layers,
    ArrowRight,
    Activity as Pulse
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import Drawer from "./Drawer";
import { m, AnimatePresence } from "framer-motion";

interface ActivityLog {
    id: string;
    action: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
    admin: {
        name: string;
        email: string;
    };
}

export default function AdminActivityLog({ logs = [] }: { logs: ActivityLog[], onUpdate: () => void }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

    const filteredLogs = (Array.isArray(logs) ? logs : []).filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const getActionType = (action: string) => {
        const a = action.toLowerCase();
        if (a.includes('delete') || a.includes('purge') || a.includes('remove')) return 'CRITICAL';
        if (a.includes('create') || a.includes('add') || a.includes('provision')) return 'PROVISION';
        if (a.includes('update') || a.includes('patch') || a.includes('sync')) return 'SYNCHRONIZE';
        return 'TRACE';
    };

    const getActionStyles = (type: string) => {
        switch (type) {
            case 'CRITICAL': return 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_20px_-5px_rgba(244,63,94,0.4)]';
            case 'PROVISION': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]';
            case 'SYNCHRONIZE': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Temporal Control Hub */}
            <div className="flex flex-col xl:flex-row gap-10 justify-between items-center bg-white/[0.01] p-10 rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/header">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent pointer-events-none" />
                
                <div className="space-y-4 relative z-10 w-full xl:w-auto text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-xl shadow-black/40">
                            <Terminal size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">TEMPORAL_SYNC_ENGINE</h2>
                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.6em] mt-2 italic flex items-center justify-center xl:justify-start gap-2">
                                <Fingerprint size={12} className="text-blue-500/40" />
                                Persistent_Kernel_Log_Established
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 w-full xl:w-auto relative z-10">
                    <div className="relative group/search w-full md:w-[400px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within/search:text-blue-500 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="TRACE_NODE_PATTERN_OR_IDENTIFIER..."
                            className="w-full bg-black/60 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-[11px] font-black uppercase tracking-[0.2em] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-mono italic placeholder:text-gray-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-4 px-8 py-5 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-3xl shadow-xl backdrop-blur-md group/pulse">
                        <div className="relative">
                            <m.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-emerald-500 rounded-full" 
                            />
                            <div className="w-3 h-3 rounded-full bg-emerald-500 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] block italic">ENGINE_LIVE</span>
                            <span className="text-[8px] text-gray-800 font-black uppercase tracking-widest block">Stream_Synchronized</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registry Trace Archive */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredLogs.length === 0 ? (
                        <m.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-48 border border-white/5 rounded-[5rem] bg-white/[0.01] space-y-8"
                        >
                            <Pulse size={80} className="text-gray-900 mx-auto animate-pulse" />
                            <div className="space-y-3">
                                <p className="text-gray-800 font-black uppercase tracking-[0.8em] text-lg italic">LOG_BUFFER_EMPTY</p>
                                <p className="text-[11px] text-gray-900 font-black uppercase tracking-[0.4em]">Zero operational traces identified in current search vector.</p>
                            </div>
                        </m.div>
                    ) : (
                        filteredLogs.map((log, i) => {
                            const actionType = getActionType(log.action);
                            return (
                                <m.div 
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    key={log.id}
                                    onClick={() => setSelectedLog(log)}
                                    className="group relative flex flex-col xl:flex-row xl:items-center gap-10 p-10 glass-effect rounded-[4rem] border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden shadow-xl shadow-black/10"
                                >
                                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Subject Matrix */}
                                    <div className="flex items-center gap-8 xl:w-[350px] shrink-0">
                                        <div className="relative w-20 h-20 shrink-0">
                                            <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] transform rotate-3 group-hover:rotate-12 group-hover:bg-blue-600 transition-all duration-500"></div>
                                            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-blue-400 group-hover:text-white transition-colors shadow-2xl">
                                                <User size={32} />
                                            </div>
                                        </div>
                                        <div className="min-w-0 space-y-2">
                                            <h3 className="text-white font-black text-xl italic tracking-tighter truncate group-hover:text-blue-400 transition-colors uppercase leading-tight">{log.admin.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-500 animate-pulse"></div>
                                                <p className="text-[12px] text-gray-700 font-mono italic truncate font-bold group-hover:text-gray-500 transition-colors">{log.admin.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Core */}
                                    <div className="flex-grow space-y-5">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border italic transition-all shadow-2xl ${getActionStyles(actionType)}`}>
                                                {log.action}
                                            </span>
                                            {log.details && (
                                                <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-2xl shadow-xl">
                                                    <Hash size={14} className="text-blue-500/60" />
                                                    <span className="text-[10px] text-gray-400 font-mono italic font-black uppercase tracking-widest">TRACE_NODE_{(log.id || "").slice(-8).toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                        {log.details && (
                                            <div className="flex items-center gap-4 text-[13px] text-gray-500 font-medium bg-black/40 p-5 rounded-[2rem] border border-white/[0.02] group-hover:border-blue-500/10 transition-colors">
                                                <Terminal size={14} className="text-blue-500/40 shrink-0" />
                                                <p className="truncate max-w-2xl font-mono leading-none tracking-tight italic">
                                                    {log.details}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Telemetry Grid */}
                                    <div className="hidden 2xl:flex items-center gap-16 shrink-0 border-l border-white/5 pl-16">
                                        <div className="space-y-2">
                                            <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] flex items-center gap-2 italic">
                                                <Globe size={12} className="text-cyan-500/50" /> NETWORK_IP
                                            </p>
                                            <p className="text-[12px] text-gray-400 font-mono font-black tracking-tighter italic">
                                                {(log.ipAddress || '127.0.0.1').replace('::ffff:', '')}
                                            </p>
                                        </div>
                                        <div className="text-right space-y-2">
                                            <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] flex items-center justify-end gap-2 italic">
                                                <Clock size={12} className="text-purple-500/50" /> TIMESTAMP
                                            </p>
                                            <p className="text-[12px] text-white font-black uppercase tracking-tight italic">
                                                {formatDistanceToNow(new Date(log.createdAt))} <span className="text-gray-800">ELAPSED</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Entry Handshake */}
                                    <div className="ml-auto w-16 h-16 rounded-[2rem] border border-white/5 flex items-center justify-center text-gray-800 group-hover:text-white group-hover:border-blue-500/40 group-hover:bg-blue-600 transition-all transform group-hover:translate-x-3 shadow-2xl">
                                        <ChevronRight size={28} />
                                    </div>
                                </m.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>

            {/* Trace Dossier Export */}
            <Drawer
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                title="TRACE_DOSSIER_RECON"
                subtitle="Deep-Scan of Kernel Operation"
                footer={
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="w-full btn-primary py-8 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.6em] shadow-2xl shadow-blue-500/40 italic transition-all active:scale-[0.98] group"
                    >
                        TERMINATE_RECON_SEQUENCE
                        <ArrowRight className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                }
            >
                {selectedLog && (
                    <div className="space-y-12">
                        {/* Operational Identity profile */}
                        <div className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group/profile shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 text-white/[0.01] group-hover/profile:text-blue-500/[0.05] transition-colors pointer-events-none">
                                <Shield size={200} />
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                <div className="w-32 h-32 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_50px_-10px_rgba(37,99,235,0.6)] border-4 border-white/10 group-hover/profile:scale-105 transition-transform duration-700">
                                    <User size={60} />
                                </div>
                                <div className="text-center md:text-left space-y-4">
                                    <h4 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedLog.admin.name}</h4>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                                            <p className="text-[14px] text-blue-400 font-mono font-bold italic">{selectedLog.admin.email}</p>
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                                        <div className="flex items-center gap-3 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                            <Lock size={12} className="text-blue-500" />
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">ROOT_ACCESS_AUTHORIZED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operational Command Data */}
                        <div className="space-y-8">
                             <div className="flex items-center gap-4 ml-8">
                                <Layers className="text-blue-500" size={20} />
                                <h5 className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-700 italic font-mono">EXECUTION_PAYLOAD_SCHEMA</h5>
                            </div>
                            <div className="p-12 rounded-[5rem] border border-white/5 bg-black/60 space-y-12 relative group/exec backdrop-blur-3xl shadow-2xl">
                                <div className="absolute top-0 right-0 p-12 text-white/[0.01] pointer-events-none group-hover/exec:text-blue-500/[0.03] transition-colors">
                                    <Zap size={140} />
                                </div>
                                
                                <div className="space-y-4">
                                    <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] italic">PROTOCOL_IDENTIFIER</p>
                                    <p className="text-4xl font-black text-white italic tracking-tight uppercase flex items-center gap-6">
                                        <span className={`w-4 h-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] ${getActionType(selectedLog.action) === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-blue-600'}`} />
                                        {selectedLog.action}
                                    </p>
                                </div>

                                {selectedLog.details && (
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-4">
                                            <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] italic">SEMANTIC_TRACE_DATA</p>
                                            <div className="h-px flex-grow bg-white/5" />
                                        </div>
                                        <div className="p-10 bg-black/40 rounded-[3rem] border border-white/5 font-mono text-[15px] text-gray-500 leading-relaxed italic relative overflow-hidden group/terminal shadow-inner">
                                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/20 group-hover/terminal:bg-blue-600 transition-all duration-500" />
                                            <div className="flex gap-4 mb-4 opacity-40">
                                                <div className="w-3 h-3 rounded-full bg-rose-500/20" />
                                                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                            </div>
                                            <span className="text-blue-500/40 mr-4 font-black">KERNEL_STREAM_{">>>"}</span>
                                            {selectedLog.details}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Registry Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[3.5rem] space-y-6 hover:bg-white/[0.03] transition-all group/card shadow-xl shadow-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 flex items-center justify-center text-cyan-500 border border-cyan-500/10 group-hover/card:bg-cyan-600 group-hover/card:text-white transition-all shadow-lg">
                                        <Globe size={24} />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 italic">NETWORK_ORIGIN_IP</p>
                                </div>
                                <p className="text-3xl font-black text-white font-mono tracking-tighter italic">
                                    {selectedLog.ipAddress || "INTERNAL_LOCAL_NODE"}
                                </p>
                            </div>
                            
                            <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[3.5rem] space-y-6 hover:bg-white/[0.03] transition-all group/card shadow-xl shadow-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/10 group-hover/card:bg-purple-600 group-hover/card:text-white transition-all shadow-lg">
                                        <Calendar size={24} />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 italic">TEMPORAL_REGISTRY_MARK</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-black text-white font-mono tracking-tighter uppercase italic">
                                        {format(new Date(selectedLog.createdAt), 'HH:mm:ss')}
                                    </p>
                                    <p className="text-[12px] text-gray-700 font-black uppercase tracking-[0.2em] italic">
                                        {format(new Date(selectedLog.createdAt), 'yyyy_MMMM_dd')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hardware Telemetry Trace */}
                        {selectedLog.userAgent && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 ml-8">
                                    <Monitor className="text-gray-800" size={20} />
                                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-800 italic">CLIENT_INTERFACE_TELEMETRY</p>
                                </div>
                                <div className="p-12 bg-black/40 rounded-[4rem] border border-white/5 relative group/monitor overflow-hidden backdrop-blur-3xl shadow-inner">
                                     <div className="absolute top-0 right-0 p-12 text-white/[0.01] pointer-events-none group-hover/monitor:text-blue-500/[0.03] transition-colors">
                                        <HardDrive size={160} />
                                    </div>
                                    <p className="text-[13px] text-gray-600 leading-relaxed font-mono italic relative z-10 font-medium">
                                        {selectedLog.userAgent}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-12 py-8 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default">
                                    <HardDrive size={32} />
                                    <Eye size={32} />
                                    <Lock size={32} />
                                    <ArrowUpRight size={32} />
                                    <Box size={32} />
                                    <Signal size={32} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Drawer>
        </div>
    );
}

