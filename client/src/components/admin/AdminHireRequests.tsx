import React, { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    XCircle,
    Mail,
    ExternalLink,
    Calendar,
    Briefcase,
    IndianRupee,
    Trash2,
    Settings,
    ChevronRight,
    Square,
    CheckSquare,
    Zap,
    Target,
    BarChart3,
    ArrowUpRight,
    User,
    Building2,
    Activity,
    Shield,
    MessageSquare,
    Globe,
    Cpu,
    Radar,
    Terminal,
    ArrowRight,
    Layers,
    Scan,
    Hash
} from "lucide-react";
import { format } from "date-fns";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { m, AnimatePresence } from "framer-motion";

interface HireRequest {
    id: string;
    name: string;
    email: string;
    company: string | null;
    description: string;
    selectedService: string;
    budgetRange: string;
    timeline: string;
    projectType: string;
    referenceLink?: string | null;
    contactMethod?: string | null;
    status: string;
    source?: string;
    createdAt: string;
}

interface AdminHireRequestsProps {
    requests: HireRequest[];
    onUpdateStatus: (id: string, status: string) => void;
    onDelete?: (id: string) => void;
}

export default function AdminHireRequests({ requests, onUpdateStatus, onDelete }: AdminHireRequestsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<HireRequest | null>(null);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.selectedService.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (req.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        const matchesStatus = statusFilter === "all" || req.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)]";
            case "contacted": return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_-5px_rgba(245,158,11,0.5)]";
            case "closed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.5)]";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`CRITICAL: IRREVERSIBLE_PURGE. Are you sure you want to delete ${selectedIds.length} talent nodes?`)) {
            selectedIds.forEach(id => onDelete?.(id));
            clearSelection();
        }
    };

    const handleBulkStatusUpdate = (status: string) => {
        selectedIds.forEach(id => onUpdateStatus(id, status));
        clearSelection();
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Outreach Telemetry Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: "Active_Nodes", value: requests.length, icon: Target, color: "text-blue-400" },
                    { label: "New_Ingests", value: requests.filter(r => r.status === 'new').length, icon: Zap, color: "text-purple-400" },
                    { label: "Engaged_Units", value: requests.filter(r => r.status === 'contacted').length, icon: Activity, color: "text-emerald-400" },
                    { label: "Budget_Parity", value: `HIGH`, icon: BarChart3, color: "text-amber-400" }
                ].map((stat, idx) => (
                    <div key={idx} className="glass-effect p-10 rounded-[3.5rem] border border-white/5 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-white/[0.05] transition-colors">
                            <stat.icon size={80} />
                        </div>
                        <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center relative z-10 ${stat.color} border border-white/5 group-hover:border-current transition-colors shadow-2xl shadow-black/40`}>
                            <stat.icon size={26} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic tracking-tighter mt-2">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Operational matrix Controls */}
            <div className="flex flex-col xl:flex-row gap-8 justify-between items-center bg-white/[0.01] p-8 rounded-[3.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/controls">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                
                <div className="w-full xl:max-w-2xl relative group/input">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/input:text-blue-500 transition-colors" size={22} />
                    <input 
                        type="text" 
                        placeholder="SEARCH_TALENT_RESERVOIR_OR_LEAD_IDENTIFIER..."
                        className="w-full bg-black/40 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-black tracking-tighter placeholder:text-gray-800 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.4em] italic"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-6 w-full xl:w-auto">
                    <div className="relative flex-grow xl:flex-grow-0">
                        <select
                            className="w-full xl:w-72 appearance-none bg-black/40 border border-white/10 rounded-3xl px-8 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white outline-none focus:border-blue-500 transition-all italic"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#0a0a0a]">GLOBAL_PIPELINE</option>
                            <option value="new" className="bg-[#0a0a0a]">NEW_DEPLOYMENTS</option>
                            <option value="contacted" className="bg-[#0a0a0a]">ACTIVE_ENGAGEMENTS</option>
                            <option value="closed" className="bg-[#0a0a0a]">ARCHIVED_UNITS</option>
                        </select>
                        <Filter className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" size={18} />
                    </div>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredRequests.length) clearSelection();
                            else setSelection(filteredRequests.map(r => r.id));
                        }}
                        className="p-6 bg-white/5 border border-white/10 rounded-3xl text-gray-700 hover:text-white hover:border-blue-500/40 transition-all shadow-xl group/select"
                        title="TOGGLE_ALL_UNITS"
                    >
                        {selectedIds.length === filteredRequests.length ? <CheckSquare size={24} className="text-blue-500 animate-pulse" /> : <Square size={24} className="group-hover/select:scale-110 transition-transform" />}
                    </button>
                </div>
            </div>

            {/* Bulk Deployment Console */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <m.div 
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        className="flex items-center gap-6 p-6 bg-blue-600/[0.03] border border-blue-500/20 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden"
                    >
                        <div className="absolute inset-y-0 left-0 w-1 bg-blue-500" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 ml-4 italic">
                            {selectedIds.length} TALENT_NODES_LOCKED
                        </span>
                        <div className="h-8 w-px bg-blue-500/20 mx-4" />
                        <div className="flex gap-4">
                            {["new", "contacted", "closed"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleBulkStatusUpdate(status)}
                                    className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white shadow-lg transition-all italic"
                                >
                                    PHASE_TO_{status.toUpperCase()}
                                </button>
                            ))}
                            <button
                                onClick={handleBulkDelete}
                                className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-red-500/30 text-red-500 hover:bg-red-600 hover:text-white shadow-lg transition-all italic"
                            >
                                PURGE_NODES
                            </button>
                            <button
                                onClick={clearSelection}
                                className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-all italic underline underline-offset-4"
                            >
                                ABORT
                            </button>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Talent Deployment Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredRequests.length === 0 ? (
                    <div className="p-32 text-center glass-effect rounded-[4.5rem] border border-white/5 space-y-8">
                        <Scan className="w-20 h-20 text-gray-800 mx-auto animate-pulse" />
                        <div className="space-y-3">
                            <p className="text-gray-700 font-black uppercase tracking-[0.6em] text-base italic">NO_TALENT_FOUND</p>
                            <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em]">CRM stream currently synchronized but empty.</p>
                        </div>
                    </div>
                ) : (
                    filteredRequests.map((req, i) => (
                        <m.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            key={req.id}
                            className={`group relative flex items-center gap-8 p-8 glass-effect rounded-[3.5rem] border transition-all duration-500 hover:bg-white/[0.03] ${
                                isSelected(req.id) ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_40px_-20px_rgba(59,130,246,0.5)]" : "border-white/5"
                            }`}
                        >
                            {/* Multi-Select Hitbox */}
                             <div 
                                onClick={() => toggleSelection(req.id)}
                                className="shrink-0 p-4 cursor-pointer hover:bg-white/10 rounded-2xl transition-all"
                            >
                                {isSelected(req.id) ? (
                                    <CheckSquare size={30} className="text-blue-500" />
                                ) : (
                                    <Square size={30} className="text-gray-800 group-hover:text-gray-600 transition-colors" />
                                )}
                            </div>

                            {/* Main Unit Info */}
                            <div 
                                onClick={() => setSelectedRequest(req)}
                                className="flex-grow flex flex-col xl:flex-row xl:items-center gap-8 cursor-pointer relative"
                            >
                                <div className="flex items-center gap-8 xl:w-[400px]">
                                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-blue-500 border border-white/5 group-hover:border-blue-500/20 transition-all shadow-xl shadow-black/40">
                                        <Hash className="w-10 h-10" />
                                    </div>
                                    <div className="min-w-0 space-y-2">
                                        <h3 className="text-white font-black text-xl italic truncate tracking-tighter leading-tight uppercase">{req.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <Mail size={12} className="text-gray-700" />
                                            <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.2em] truncate">{req.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] italic">OPERATION</p>
                                        <div className="flex items-center gap-3">
                                            <Briefcase size={12} className="text-blue-500/50" />
                                            <p className="text-[11px] text-gray-400 font-black uppercase tracking-tight line-clamp-1 italic">{req.selectedService}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] italic">BUDGET_VECTOR</p>
                                        <div className="flex items-center gap-3">
                                            <IndianRupee size={12} className="text-emerald-500/50" />
                                            <p className="text-[11px] text-emerald-400 font-black italic tracking-tighter font-mono">{req.budgetRange}</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:block space-y-2">
                                        <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] italic">WINDOW</p>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Clock size={12} className="text-purple-500/50" />
                                            <p className="text-[11px] font-black uppercase italic">{req.timeline}</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:block space-y-2 text-right">
                                        <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] italic">SYNC_MARK</p>
                                        <p className="text-[11px] text-gray-600 font-black italic">{format(new Date(req.createdAt), 'dd_MM_yy')}</p>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center gap-8">
                                    <span className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border italic transition-all shadow-xl ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-2">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    ))
                )}
            </div>

            {/* Outreach Dossier Drawer */}
            <Drawer
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                title="LEAD_DOSSIER_RECON"
                subtitle="High-Intensity Talent Capture"
                footer={
                    <div className="flex gap-6">
                        <button
                            onClick={() => {
                                if (confirm("DANGER: CRITICAL_PURGE. Delete this intelligence file?")) {
                                    onDelete?.(selectedRequest!.id);
                                    setSelectedRequest(null);
                                }
                            }}
                            className="p-6 bg-red-500/10 text-red-500 rounded-[2rem] border border-red-500/10 hover:border-red-500/40 hover:bg-red-500 hover:text-white transition-all group"
                        >
                            <Trash2 size={26} className="group-hover:rotate-12 transition-transform" />
                        </button>
                        <a
                            href={`mailto:${selectedRequest?.email}?subject=Intelligence Engagement Sequence: ${selectedRequest?.selectedService}`}
                            className="flex-grow btn-primary py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/40 flex justify-center items-center gap-5 italic"
                        >
                            <Mail size={22} className="animate-bounce" />
                            INITIALIZE_ENGAGEMENT_PROTOCOL
                        </a>
                    </div>
                }
            >
                {selectedRequest && (
                    <div className="space-y-12">
                        {/* Profile Sync Matrix */}
                        <div className="flex flex-col md:flex-row items-center gap-10 p-10 bg-white/[0.02] border border-white/5 rounded-[4rem] relative overflow-hidden group/profile">
                            <div className="absolute top-0 right-0 p-12 text-white/[0.02] group-hover/profile:text-blue-500/[0.05] transition-colors pointer-events-none">
                                <Radar size={160} />
                            </div>
                            <div className="w-28 h-28 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_50px_-10px_rgba(37,99,235,0.6)] relative z-10 border-4 border-white/10">
                                <User size={52} />
                            </div>
                            <div className="text-center md:text-left space-y-4 relative z-10">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedRequest.name}</h2>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                    <div className="flex items-center gap-3">
                                        <Mail size={14} className="text-blue-500" />
                                        <p className="text-[12px] font-mono text-blue-400 font-bold tracking-tight italic">{selectedRequest.email}</p>
                                    </div>
                                    <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                                    <div className="flex items-center gap-3">
                                        <Building2 size={14} className="text-gray-700" />
                                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{selectedRequest.company || "INDEPENDENT_NODE"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analytic Data Stream */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                { label: "Project_Type", val: selectedRequest.selectedService || selectedRequest.projectType, icon: Briefcase, color: "text-blue-500" },
                                { label: "Budget_Apex", val: selectedRequest.budgetRange, icon: IndianRupee, color: "text-emerald-500" },
                                { label: "Window_Size", val: selectedRequest.timeline, icon: Clock, color: "text-purple-500" },
                                { label: "Ingest_Stamp", val: format(new Date(selectedRequest.createdAt), 'dd MMMM yyyy'), icon: Calendar, color: "text-cyan-500" },
                                { label: "Discovery_Vector", val: selectedRequest.contactMethod || "Web_Direct", icon: Shield, color: "text-indigo-500" },
                                { label: "Origin_Link", val: selectedRequest.source || "Organic_Trace", icon: Globe, color: "text-pink-500" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-white/[0.01] border border-white/5 rounded-[3rem] space-y-5 hover:bg-white/[0.04] transition-all group/card shadow-xl shadow-black/10">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover/card:scale-110 transition-transform shadow-lg border border-white/5`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] italic">{item.label}</p>
                                        <p className="text-[12px] text-white font-black uppercase tracking-tight truncate italic">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Semantic Context Terminal */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 ml-6">
                                <Terminal size={18} className="text-blue-500" />
                                <label className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] italic font-mono">Semantic_Briefing_Context</label>
                            </div>
                            <div className="p-12 bg-black/60 border border-white/5 rounded-[4rem] relative group/term overflow-hidden backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-10 text-white/[0.02] group-hover/term:text-blue-500/[0.03] transition-colors pointer-events-none">
                                    <MessageSquare size={140} />
                                </div>
                                <div className="absolute top-8 left-8 flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                                </div>
                                <p className="text-[17px] text-gray-400 leading-[1.7] italic font-medium relative z-10 pt-4">
                                    &ldquo;{selectedRequest.description}&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* Workflow Synchronization Unit */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 ml-6">
                                <Cpu size={18} className="text-emerald-500" />
                                <label className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] italic font-mono">Workflow_Phase_Synchronization</label>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                {["new", "contacted", "closed"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => onUpdateStatus(selectedRequest.id, status)}
                                        className={`py-10 rounded-[3.5rem] text-[11px] font-black uppercase tracking-[0.4em] border transition-all relative overflow-hidden group ${
                                            selectedRequest.status === status
                                                ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_50px_-5px_rgba(37,99,235,0.4)]"
                                                : "bg-[#0a0a0a] border-white/5 text-gray-800 hover:text-white hover:border-white/10"
                                        }`}
                                    >
                                        <div className="relative z-10 flex flex-col items-center gap-4">
                                            {status === 'new' && <Zap size={20} className={selectedRequest.status === status ? 'text-white' : 'text-blue-500/20'} />}
                                            {status === 'contacted' && <Activity size={20} className={selectedRequest.status === status ? 'text-white' : 'text-amber-500/20'} />}
                                            {status === 'closed' && <CheckCircle2 size={20} className={selectedRequest.status === status ? 'text-white' : 'text-emerald-500/20'} />}
                                            <span className="italic">{status}</span>
                                        </div>
                                        {selectedRequest.status === status && (
                                            <m.div 
                                                layoutId="status-glow"
                                                className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reference Node Handshake */}
                        {selectedRequest.referenceLink && (
                            <div className="p-10 bg-blue-600/5 border border-blue-600/10 rounded-[3.5rem] flex items-center justify-between group/link shadow-2xl shadow-black/20">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover/link:bg-blue-600 group-hover/link:text-white transition-all shadow-xl border border-blue-500/10">
                                        <ExternalLink size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white italic">REFERENCE_NODE_TRACE</p>
                                        <p className="text-[10px] text-blue-400 font-mono italic opacity-60">High-fidelity handshake established</p>
                                    </div>
                                </div>
                                <a 
                                    href={selectedRequest.referenceLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-blue-600 hover:scale-110 transition-all shadow-2xl flex items-center justify-center transform group-hover/link:rotate-12"
                                >
                                    <ArrowUpRight size={28} />
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </Drawer>
        </div>
    );
}
