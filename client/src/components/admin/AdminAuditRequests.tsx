"use client";

import { 
    Search, 
    Filter, 
    MoreVertical, 
    CheckCircle2, 
    XCircle, 
    Eye, 
    Trash2, 
    Mail, 
    ExternalLink,
    TrendingDown,
    TrendingUp,
    Shield,
    Zap,
    BarChart3,
    ArrowUpRight,
    Loader2,
    Square,
    CheckSquare,
    ChevronRight,
    Globe,
    Calendar,
    Settings,
    Clock,
    Database,
    Signal,
    Radar,
    Terminal,
    Cpu,
    ArrowRight,
    Activity
} from "lucide-react";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { m, AnimatePresence } from "framer-motion";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminAuditRequests() {
    const { data: response, error, isLoading } = useSWR("/api/admin/audit-requests", fetcher);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const requests = response?.data || [];
    const analytics = response?.analytics || { total: 0, pending: 0, avgScore: 0 };

    const filteredRequests = requests.filter((req: any) => {
        const matchesSearch = req.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (req.email && req.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filter === "all" || 
                             (filter === "pending" && !req.contacted) || 
                             (filter === "contacted" && req.contacted) ||
                             (filter === "hot" && (req.performance || 0) < 50);
        return matchesSearch && matchesFilter;
    });

    const handleUpdateAudit = async (id: string, updates: any) => {
        try {
            await fetch("/api/admin/audit-requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });
            mutate("/api/admin/audit-requests");
            if (selectedRequest?.id === id) {
                setSelectedRequest({ ...selectedRequest, ...updates });
            }
        } catch (err) {
            console.error("Failed to update record");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/admin/audit-requests?id=${id}`, {
                method: "DELETE",
            });
            mutate("/api/admin/audit-requests");
        } catch (err) {
            console.error("Failed to delete record");
        }
    };

    const handleBulkDelete = async () => {
        if (confirm(`Delete ${selectedIds.length} audit records?`)) {
            await Promise.all(selectedIds.map(id => 
                fetch(`/api/admin/audit-requests?id=${id}`, { method: "DELETE" })
            ));
            mutate("/api/admin/audit-requests");
            clearSelection();
        }
    };

    const handleBulkStatusUpdate = async (contacted: boolean) => {
        await Promise.all(selectedIds.map(id => 
            fetch("/api/admin/audit-requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, contacted }),
            })
        ));
        mutate("/api/admin/audit-requests");
        clearSelection();
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-400 bg-emerald-400/5 border-emerald-400/20";
        if (score >= 50) return "text-blue-400 bg-blue-400/5 border-blue-400/20";
        return "text-red-400 bg-red-400/5 border-red-500/20";
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-in fade-in duration-700">
            <div className="relative">
                <Loader2 className="animate-spin text-blue-500/40" size={60} />
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-800 italic">Synchronizing_Intelligence_Feed...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Header Module ID */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-10">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-2xl shadow-indigo-500/10">
                        <Radar size={32} className="animate-pulse" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] mb-2 italic">
                            M-17 // AUDIT_FEED_SYST_RECON
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Intelligence_Capture</h2>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4 px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] italic">SYNC_STATUS: EDGE_STABLE</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { label: "Total_Ingests", value: analytics.total, icon: Database, color: "text-blue-400" },
                    { label: "Pending_Syncs", value: analytics.pending, icon: Signal, color: "text-purple-400" },
                    { label: "Avg_Node_Parity", value: `${analytics.avgScore}%`, icon: Zap, color: "text-emerald-400" }
                ].map((stat, idx) => (
                    <div key={idx} className="glass-effect p-10 rounded-[3.5rem] border border-white/5 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-white/[0.05] transition-colors">
                            <stat.icon size={100} />
                        </div>
                        <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center relative z-10 ${stat.color} border border-white/5 group-hover:border-current transition-colors`}>
                            <stat.icon size={28} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic tracking-tighter mt-2">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Operational Controls */}
            <div className="flex flex-col xl:flex-row gap-8 justify-between items-center bg-white/[0.01] p-10 rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/controls">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                
                <div className="w-full xl:max-w-xl relative group/input">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/input:text-blue-500 transition-colors" size={24} />
                    <input 
                        type="text" 
                        placeholder="SEARCH_NODE_TRACE_OR_TARGET_IDENTIFIER..."
                        className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] py-8 pl-20 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-black tracking-tighter placeholder:text-gray-900 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.4em] italic"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-6 w-full xl:w-auto">
                    <div className="relative flex-grow xl:flex-grow-0">
                        <select
                            className="w-full xl:w-80 appearance-none bg-black/40 border border-white/10 rounded-[2.5rem] px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-white outline-none focus:border-blue-500 transition-all italic"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#0a0a0a]">GLOBAL_FEED</option>
                            <option value="pending" className="bg-[#0a0a0a]">PENDING_DISCOVERY</option>
                            <option value="contacted" className="bg-[#0a0a0a]">INGESTED_UNITS</option>
                            <option value="hot" className="bg-[#0a0a0a]">CRITICAL_VECTORS</option>
                        </select>
                        <Filter className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" size={20} />
                    </div>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredRequests.length) clearSelection();
                            else setSelection(filteredRequests.map((r: any) => r.id));
                        }}
                        className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-gray-700 hover:text-white hover:border-blue-500/40 transition-all shadow-xl group/select"
                        title="TOGGLE_ALL_UNITS"
                    >
                        {selectedIds.length === filteredRequests.length ? <CheckSquare size={28} className="text-blue-500 animate-pulse" /> : <Square size={28} className="group-hover/select:scale-110 transition-transform" />}
                    </button>
                </div>
            </div>

            {/* Bulk Operational Console */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <m.div 
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        className="flex items-center gap-6 p-8 bg-blue-600/[0.04] border border-blue-500/20 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] relative overflow-hidden"
                    >
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-blue-600" />
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-500 ml-6 italic">
                            {selectedIds.length} ACTIVE_INTELLIGENCE_UNITS_SECURED
                        </span>
                        <div className="h-10 w-px bg-blue-500/20 mx-6" />
                        <div className="flex gap-4">
                            {[
                                { label: "SET_HANDLED", action: () => handleBulkStatusUpdate(true), variant: "blue" },
                                { label: "PURGE_NODES", action: handleBulkDelete, variant: "red" },
                            ].map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={btn.action}
                                    className={`px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] border transition-all italic ${
                                        btn.variant === "blue" 
                                            ? "border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white shadow-lg" 
                                            : "border-red-500/30 text-red-500 hover:bg-red-600 hover:text-white shadow-lg"
                                    }`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                            <button
                                onClick={clearSelection}
                                className="px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-all italic underline underline-offset-4"
                            >
                                ABORT_OPERATION
                            </button>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Intelligence Stream */}
            <div className="grid grid-cols-1 gap-8">
                {filteredRequests.length === 0 ? (
                    <div className="p-40 text-center glass-effect rounded-[5rem] border border-white/5 space-y-10">
                        <Radar className="w-24 h-24 text-gray-900 mx-auto animate-pulse" />
                        <div className="space-y-4">
                            <p className="text-gray-800 font-black uppercase tracking-[0.8em] text-xl italic">NO_INTELLIGENCE_FOUND</p>
                            <p className="text-[11px] text-gray-900 font-black uppercase tracking-[0.5em]">System stream synchronized. Silence confirmed.</p>
                        </div>
                    </div>
                ) : (
                    filteredRequests.map((req: any) => (
                        <div 
                            key={req.id}
                            className={`group relative flex items-center gap-10 p-10 glass-effect rounded-[4rem] border transition-all duration-700 hover:bg-white/[0.04] ${
                                isSelected(req.id) ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_60px_-20px_rgba(59,130,246,0.5)]" : "border-white/5"
                            }`}
                        >
                             {/* Multi-Select Hitbox */}
                             <div 
                                onClick={() => toggleSelection(req.id)}
                                className="shrink-0 p-6 cursor-pointer hover:bg-white/10 rounded-[2rem] transition-all"
                            >
                                {isSelected(req.id) ? (
                                    <CheckSquare size={36} className="text-blue-500 animate-in zoom-in" />
                                ) : (
                                    <Square size={36} className="text-gray-900 group-hover:text-gray-700 transition-colors" />
                                )}
                            </div> 

                            {/* Main Trace Info */}
                            <div 
                                onClick={() => setSelectedRequest(req)}
                                className="flex-grow flex flex-col xl:flex-row xl:items-center gap-10 cursor-pointer relative"
                            >
                                <div className="flex items-center gap-10 xl:w-[500px]">
                                    <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-blue-500 border border-white/5 group-hover:border-blue-500/40 transition-all shadow-2xl relative overflow-hidden">
                                        <Globe className="w-12 h-12 relative z-10" />
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500/20" />
                                    </div>
                                    <div className="min-w-0 space-y-3">
                                        <h3 className="text-white font-black text-2xl italic truncate tracking-tighter leading-tight">{req.websiteUrl.replace(/^https?:\/\//, '')}</h3>
                                        <div className="flex items-center gap-4">
                                            <Mail size={14} className="text-gray-800" />
                                            <p className="text-[12px] text-gray-800 font-black uppercase tracking-[0.2em] truncate italic">{req.email || "ANONYMOUS_PROTOCOL"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden xl:flex flex-1 items-center gap-20">
                                    <div className="min-w-[150px]">
                                        <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] mb-4 italic">STABILITY_FACTOR</p>
                                        <div className={`px-6 py-3 rounded-2xl border text-[13px] font-black w-fit italic tracking-tighter shadow-xl ${getScoreColor(req.performance || 0)}`}>
                                            {req.performance || 0}%_HEALTH
                                        </div>
                                    </div>
                                    <div className="min-w-[200px]">
                                        <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] mb-4 italic">THREAT_INTENSITY</p>
                                        {(req.performance || 0) < 50 ? (
                                            <span className="flex items-center gap-5 text-[13px] font-black uppercase tracking-[0.3em] text-red-500 italic">
                                                <Activity size={18} className="animate-pulse" />
                                                URGENT_INTERVENTION
                                            </span>
                                        ) : (
                                            <span className="text-[13px] font-black uppercase tracking-[0.3em] text-gray-800 italic flex items-center gap-5">
                                                <CheckCircle2 size={18} className="text-emerald-500/40" />
                                                STABLE_NODE
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center gap-10">
                                    <span className={`px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] border italic transition-all shadow-2xl ${req.contacted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-900/10 text-gray-900 border-white/5'}`}>
                                        {req.contacted ? 'CAPTURED' : 'UNSECURED'}
                                    </span>
                                    <div className="w-14 h-14 rounded-[2rem] bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-3 shadow-xl">
                                        <ChevronRight size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Intelligence Detail Drawer */}
            <Drawer
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                title="NODE_RECON_MATRIX"
                subtitle="Deep Intelligence Analysis Unit"
                footer={
                    <div className="flex gap-8">
                        <button 
                            onClick={() => {
                                if (confirm("Terminate this intelligence record?")) {
                                    handleDelete(selectedRequest.id);
                                    setSelectedRequest(null);
                                }
                            }}
                            className="p-8 bg-black/40 text-red-500 rounded-[2.5rem] hover:bg-red-500/20 transition-all border border-white/5 hover:border-red-500/40 shadow-xl"
                        >
                            <Trash2 size={28} />
                        </button>
                        <a 
                            href={`mailto:${selectedRequest?.email || ''}?subject=Operational Audit Analysis: ${selectedRequest?.websiteUrl}`}
                            className="flex-grow py-8 rounded-[2.5rem] bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/40 flex justify-center items-center gap-6 italic hover:bg-blue-500 transition-all active:scale-95 group/dispatch relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                            <Mail size={24} className="animate-pulse" />
                            INITIATE_TACTICAL_OUTREACH
                        </a>
                    </div>
                }
            >
                {selectedRequest && (
                    <div className="space-y-16">
                         {/* Metrics Matrix */}
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: "Stab_Factor", val: `${selectedRequest.performance}%`, icon: Zap, color: "text-blue-400" },
                                { label: "SEO_Authority", val: `${selectedRequest.seo}%`, icon: BarChart3, color: "text-purple-400" },
                                { label: "Access_Affinity", val: `${selectedRequest.accessibility}%`, icon: Shield, color: "text-emerald-400" },
                                { label: "Latency_Profile", val: `${selectedRequest.loadTime?.toFixed(2)}s`, icon: Clock, color: "text-orange-400" },
                                { label: "Capture_Stamp", val: format(new Date(selectedRequest.createdAt), 'MMM dd, yyyy'), icon: Calendar, color: "text-cyan-400" },
                                { label: "Target_Vector", val: selectedRequest.websiteUrl.replace(/^https?:\/\//, ''), icon: Globe, color: "text-pink-400" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-8 bg-black/20 border border-white/5 rounded-[3rem] flex items-center gap-8 group/card hover:bg-white/[0.04] transition-all duration-700 shadow-xl">
                                    <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center ${item.color} border border-white/5 group-hover:scale-110 transition-transform shadow-2xl`}>
                                        <item.icon size={28} />
                                    </div>
                                    <div className="min-w-0 space-y-2">
                                        <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.3em] italic">{item.label}</p>
                                        <p className="text-[14px] text-white font-black truncate tracking-tighter italic">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Strategic Intelligence Console */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-5 ml-6">
                                <Terminal size={18} className="text-blue-500" />
                                <p className="text-[11px] text-gray-800 font-black uppercase tracking-[0.4em] italic">Tactical_Intelligence_Overlay</p>
                            </div>
                            <div className="relative group/notes">
                                <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover/notes:opacity-100 transition-opacity" />
                                <textarea 
                                    className="w-full bg-black/80 border border-white/10 rounded-[3rem] p-12 text-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 min-h-[250px] resize-none font-medium italic relative z-10 backdrop-blur-3xl transition-all shadow-2xl placeholder:text-gray-900"
                                    placeholder="INGEST_OBSERVATION_TELEMETRY..."
                                    defaultValue={selectedRequest.notes || ""}
                                    onBlur={(e) => handleUpdateAudit(selectedRequest.id, { notes: e.target.value })}
                                />
                            </div>
                        </div>

                         {/* Operational Workflow Status */}
                         <div className="space-y-8">
                            <div className="flex items-center gap-5 ml-6">
                                <Cpu size={18} className="text-emerald-500" />
                                <p className="text-[11px] text-gray-800 font-black uppercase tracking-[0.4em] italic">System_Integration_Protocol</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <button
                                    onClick={() => handleUpdateAudit(selectedRequest.id, { contacted: false })}
                                    className={`py-8 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] border transition-all italic shadow-2xl ${
                                        !selectedRequest.contacted
                                            ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/40"
                                            : "bg-white/[0.02] border-white/10 text-gray-800 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    STATUS: PENDING
                                </button>
                                <button
                                    onClick={() => handleUpdateAudit(selectedRequest.id, { contacted: true })}
                                    className={`py-8 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] border transition-all italic shadow-2xl ${
                                        selectedRequest.contacted
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-500/40"
                                            : "bg-white/[0.02] border-white/10 text-gray-800 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    STATUS: CAPTURED
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
}
