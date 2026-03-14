import {
    Activity,
    Plus,
    Trash2,
    History,
    BookOpen,
    ChevronRight,
    CheckCircle2,
    Save,
    X,
    Search,
    Filter,
    Terminal,
    Zap,
    AlertCircle,
    Info,
    Square,
    CheckSquare,
    Cpu,
    Loader2,
    Microscope,
    Database,
    Binary,
    Network,
    Shield,
    Boxes,
    Layers,
    Server,
    Layout,
    ArrowUpRight,
    Flame,
    Signal,
    BarChart3
} from "lucide-react";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { getApiUrl } from "@/lib/api";

interface DiagnosticPattern {
    id: string;
    keywords: string[];
    possibleCauses: string[];
    debugSteps: string[];
    complexity: string;
    recommendedService: string;
}

interface DiagnosticLog {
    id: string;
    description: string;
    environment: string;
    techStack: string;
    errorMessage?: string;
    matchedPatternId?: string;
    createdAt: string;
}

export default function AdminDiagnostics({ patterns = [], logs = [], onUpdate }: { patterns: DiagnosticPattern[], logs: DiagnosticLog[], onUpdate: () => void }) {
    const [subTab, setSubTab] = useState<"patterns" | "logs">("patterns");
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPattern, setSelectedPattern] = useState<DiagnosticPattern | null>(null);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const [formData, setFormData] = useState<Partial<DiagnosticPattern>>({
        keywords: [],
        possibleCauses: [],
        debugSteps: [],
        complexity: "Medium",
        recommendedService: "Bug Fixing"
    });

    const filteredPatterns = (Array.isArray(patterns) ? patterns : []).filter(p => 
        p.recommendedService.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredLogs = (Array.isArray(logs) ? logs : []).filter(l => 
        l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.techStack.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.environment.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const handleEditPattern = (pattern: DiagnosticPattern) => {
        setFormData(pattern);
        setSelectedPattern(pattern);
        setIsEditing(true);
    };

    const handleCreatePattern = () => {
        setFormData({
            keywords: [],
            possibleCauses: [],
            debugSteps: [],
            complexity: "Medium",
            recommendedService: "Bug Fixing"
        });
        setSelectedPattern(null);
        setIsEditing(true);
    };

    const handleSubmitPattern = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = formData.id ? `/api/admin/diagnostic-patterns/${formData.id}` : "/api/admin/diagnostic-patterns";
            const method = formData.id ? "PATCH" : "POST";
            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                onUpdate();
                setIsEditing(false);
                setSelectedPattern(null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePattern = async (id: string) => {
        if (!confirm("Purge this knowledge pattern permanently?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/diagnostic-patterns/${id}`), { method: "DELETE" });
            if (response.ok) {
                onUpdate();
                setIsEditing(false);
                setSelectedPattern(null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDeletePatterns = async () => {
        if (!confirm(`Purge ${selectedIds.length} knowledge nodes? This action is irreversible.`)) return;
        await Promise.all(selectedIds.map(id => fetch(getApiUrl(`/api/admin/diagnostic-patterns/${id}`), { method: "DELETE" })));
        onUpdate();
        clearSelection();
    };

    return (
        <div className="space-y-12">
            {/* Engine Telemetry Nav */}
            <div className="flex flex-col xl:flex-row gap-8 justify-between items-center">
                <div className="flex bg-white/[0.02] p-2 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-3xl relative overflow-hidden group/nav">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.05] to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                    <button
                        onClick={() => { setSubTab("patterns"); clearSelection(); setSearchTerm(""); }}
                        className={`relative z-10 flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${subTab === "patterns" ? "bg-blue-600 text-white shadow-2xl shadow-blue-500/40" : "text-gray-500 hover:text-white"}`}
                    >
                        <Binary size={18} className={subTab === 'patterns' ? 'animate-pulse' : ''} />
                        HEURISTIC_CORE
                    </button>
                    <button
                        onClick={() => { setSubTab("logs"); clearSelection(); setSearchTerm(""); }}
                        className={`relative z-10 flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${subTab === "logs" ? "bg-purple-600 text-white shadow-2xl shadow-purple-500/40" : "text-gray-500 hover:text-white"}`}
                    >
                        <Network size={18} className={subTab === 'logs' ? 'animate-pulse' : ''} />
                        RUNTIME_TRACE
                    </button>
                </div>

                <div className="w-full xl:max-w-2xl relative group/search">
                    <Search className={`absolute left-8 top-1/2 -translate-y-1/2 transition-colors duration-500 ${subTab === 'patterns' ? 'group-focus-within/search:text-blue-500' : 'group-focus-within/search:text-purple-500'} text-gray-700`} size={22} />
                    <input 
                        type="text" 
                        placeholder={subTab === 'patterns' ? "QUERY_ESTABLISHED_HEURISTICS..." : "MONITOR_ACTIVE_TRACE_STREAM..."}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] py-6 pl-20 pr-10 text-[11px] text-white focus:outline-none focus:ring-2 focus:ring-white/5 transition-all font-black uppercase tracking-[0.2em] placeholder:text-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 w-full xl:w-auto">
                    {subTab === 'patterns' && (
                        <button 
                            onClick={handleCreatePattern}
                            className="flex-grow xl:flex-none py-6 px-10 rounded-[2rem] bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
                        >
                            <Plus size={20} /> DEPLOY_NODE
                        </button>
                    )}
                    <button 
                        onClick={() => {
                            const items = subTab === 'patterns' ? filteredPatterns : filteredLogs;
                            if (selectedIds.length === items.length) clearSelection();
                            else setSelection(items.map(i => i.id));
                        }}
                        className="p-6 bg-white/[0.05] border border-white/10 rounded-[2rem] text-gray-500 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                    >
                        {selectedIds.length > 0 && selectedIds.length === (subTab === 'patterns' ? filteredPatterns : filteredLogs).length ? 
                            <CheckSquare size={24} className={subTab === 'patterns' ? "text-blue-500" : "text-purple-500"} /> : <Square size={24} />
                        }
                    </button>
                </div>
            </div>

            {/* Bulk Actions Console */}
            <AnimatePresence>
                {subTab === 'patterns' && selectedIds.length > 0 && (
                    <m.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] relative group/bulk">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/bulk:opacity-20 transition-opacity">
                                <Shield size={100} className="text-blue-500" />
                            </div>
                            
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500">
                                    <Activity size={28} className="animate-pulse" />
                                </div>
                                <div>
                                    <span className="text-xl font-black text-white italic tracking-tighter uppercase">
                                        BATCH_OPERATION: {selectedIds.length} NODES
                                    </span>
                                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em]">Mass heuristic modification active</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-blue-500/20 hidden md:block" />

                            <div className="flex flex-wrap gap-4 relative z-10">
                                <button
                                    onClick={handleBulkDeletePatterns}
                                    className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-600/10 border border-red-500/20 text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                >
                                    PURGE_PERMANENTLY
                                </button>
                                <button
                                    onClick={clearSelection}
                                    className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                                >
                                    ABORT_SEQUENCE
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Engine Matrix Grid */}
            <div className="grid grid-cols-1 gap-6">
                {subTab === 'patterns' ? (
                    filteredPatterns.length === 0 ? (
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-48 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
                        >
                            <Binary size={80} className="text-white/5 mx-auto mb-10" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Library_Offline</h3>
                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">No matching heuristic nodes found in current parity</p>
                        </m.div>
                    ) : (
                        filteredPatterns.map((pattern, i) => (
                            <m.div 
                                key={pattern.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group relative flex flex-col lg:flex-row lg:items-center gap-10 p-10 glass-effect rounded-[3.5rem] border transition-all duration-500 ${
                                    isSelected(pattern.id) 
                                    ? "bg-blue-600/[0.03] border-blue-500/40 shadow-2xl shadow-blue-500/10" 
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                }`}
                            >
                                {/* Selection Hub */}
                                <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSelection(pattern.id);
                                    }}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all border ${
                                        isSelected(pattern.id)
                                        ? "bg-blue-600/20 border-blue-500/40 text-blue-500"
                                        : "bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-400"
                                    }`}
                                >
                                    {isSelected(pattern.id) ? <CheckSquare size={28} /> : <Square size={28} />}
                                </div>

                                {/* Profiling Unit */}
                                <div onClick={() => handleEditPattern(pattern)} className="flex-grow flex flex-col lg:flex-row lg:items-center gap-12 cursor-pointer">
                                    <div className="lg:w-96 space-y-6">
                                        <div className="flex flex-wrap gap-2">
                                            {pattern.keywords.map((kw, idx) => (
                                                <span key={idx} className="px-4 py-1.5 bg-blue-500/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border border-blue-500/10">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{pattern.recommendedService}</h3>
                                    </div>

                                    <div className="hidden lg:flex flex-grow items-center gap-16">
                                        <div className="min-w-[140px] space-y-3">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Complexity_Mark</p>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${pattern.complexity === 'High' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : pattern.complexity === 'Medium' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'}`} />
                                                <span className={`text-[11px] font-black uppercase tracking-widest ${pattern.complexity === 'High' ? 'text-red-400' : pattern.complexity === 'Medium' ? 'text-blue-400' : 'text-emerald-400'}`}>
                                                    {pattern.complexity.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-3">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Primary_Etiology</p>
                                            <p className="text-gray-400 text-[11px] font-medium italic line-clamp-1 group-hover:text-white transition-colors">
                                                &quot;{pattern.possibleCauses[0] || 'UNMAPPED_ORIGIN'}&quot;
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white/5 rounded-3xl text-gray-700 group-hover:text-white group-hover:bg-white/10 transition-all">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>
                            </m.div>
                        ))
                    )
                ) : (
                    filteredLogs.length === 0 ? (
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-48 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
                        >
                            <Terminal size={80} className="text-white/5 mx-auto mb-10" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Trace_Stream_Empty</h3>
                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">No active runtime traces detected in current parity</p>
                        </m.div>
                    ) : (
                        filteredLogs.map((log, i) => (
                            <m.div 
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative flex flex-col p-10 glass-effect rounded-[3.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex flex-col lg:flex-row lg:items-center gap-10 relative z-10">
                                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border transition-all duration-500 ${log.matchedPatternId ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-purple-500/5 text-purple-400 border-purple-500/20 animate-pulse-slow'}`}>
                                        {log.matchedPatternId ? <CheckCircle2 size={36} /> : <Activity size={36} />}
                                    </div>
                                    
                                    <div className="flex-grow min-w-0 space-y-4">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-3">
                                                <Server size={14} className="text-purple-500/60" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{log.environment}</span>
                                            </div>
                                            <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                            <div className="flex items-center gap-3">
                                                <Layers size={14} className="text-blue-500/60" />
                                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">{log.techStack}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-purple-400 transition-colors leading-tight">
                                            {log.description}
                                        </h3>
                                    </div>

                                    <div className="hidden xl:flex flex-col items-end shrink-0 gap-2">
                                        <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em]">Temporal_Mark</p>
                                        <div className="flex items-center gap-3 px-6 py-2.5 bg-white/[0.03] rounded-xl border border-white/5">
                                            <History size={14} className="text-gray-600" />
                                            <span className="text-[12px] text-white font-mono font-black italic">
                                                {new Date(log.createdAt).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">
                                        {!log.matchedPatternId ? (
                                            <button 
                                                onClick={() => {
                                                    setFormData({
                                                        keywords: log.techStack ? [log.techStack] : [],
                                                        possibleCauses: [log.description],
                                                        debugSteps: [],
                                                        complexity: "Medium",
                                                        recommendedService: "Bug Fixing"
                                                    });
                                                    setSelectedPattern(null);
                                                    setIsEditing(true);
                                                }}
                                                className="group/btn flex items-center gap-4 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-500/10 active:scale-95"
                                            >
                                                <Zap size={16} className="group-hover/btn:fill-current" />
                                                REGISTER_LOGIC
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-4 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <CheckCircle2 size={16} />
                                                SYNCED_MARK
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {log.errorMessage && (
                                    <m.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="mt-10 p-10 bg-black/60 rounded-[2.5rem] border border-red-500/10 font-mono text-[11px] text-red-400/80 leading-relaxed overflow-x-auto relative"
                                    >
                                        <div className="flex items-center gap-4 mb-6 text-red-500/40">
                                            <AlertCircle size={14} />
                                            <span className="uppercase tracking-[0.4em] font-black text-[10px]">Critical_Stacktrace_Dump</span>
                                        </div>
                                        <div className="whitespace-pre">
                                            {log.errorMessage}
                                        </div>
                                    </m.div>
                                )}
                            </m.div>
                        ))
                    )
                )}
            </div>

            {/* Matrix Editor Dossier */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedPattern(null);
                }}
                title={formData.id ? "Knowledge_Evolution" : "Heuristic_Initialization"}
                subtitle="High-fidelity technical intelligence mapping"
                footer={
                    <div className="flex gap-6 mt-12">
                        {formData.id && (
                            <m.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeletePattern(formData.id!)}
                                className="p-6 bg-red-600/10 text-red-500 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all border border-red-600/20 group/del"
                            >
                                <Trash2 size={24} className="group-hover/del:rotate-12 transition-transform" />
                            </m.button>
                        )}
                        <m.button 
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => handleSubmitPattern(e as any)}
                            disabled={isLoading}
                            className="flex-grow flex items-center justify-center gap-4 bg-blue-600 py-6 rounded-[2rem] text-sm font-black text-white uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin text-white/50" size={20} /> : <Save size={20} className="text-white" />}
                            COMMIT_HEURISTIC_PARITY
                        </m.button>
                    </div>
                }
            >
                <div className="space-y-12 pb-12">
                    {/* Identity Matrix */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Cpu className="text-blue-500" size={20} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Causal_Identity</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">Complexity_Protocol</label>
                                <div className="relative group">
                                    <BarChart3 className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <select
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none font-bold uppercase tracking-widest cursor-pointer"
                                        value={formData.complexity}
                                        onChange={e => setFormData({ ...formData, complexity: e.target.value })}
                                    >
                                        <option className="bg-[#050505] text-emerald-400">Low</option>
                                        <option className="bg-[#050505] text-blue-400">Medium</option>
                                        <option className="bg-[#050505] text-red-500">High</option>
                                    </select>
                                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-700 pointer-events-none" size={16} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">Resolution_Directive</label>
                                <div className="relative group">
                                    <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-bold uppercase tracking-widest placeholder:text-gray-800"
                                        value={formData.recommendedService}
                                        onChange={e => setFormData({ ...formData, recommendedService: e.target.value })}
                                        placeholder="E.G. CRITICAL_PATCH_DEPLOY"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vector Stream */}
                    <div className="space-y-4">
                        <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">Semantic_Keywords (VECTOR_ARRAY)</label>
                        <div className="relative group">
                            <Binary className="absolute left-8 top-8 text-blue-500/40" size={20} />
                            <textarea
                                className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] pt-8 pb-8 pl-20 pr-8 text-sm text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[100px] font-mono tracking-tighter"
                                value={formData.keywords?.join(", ")}
                                onChange={e => setFormData({ ...formData, keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) })}
                                placeholder="CORS, PRISMA, EDGE_RUNTIME..."
                            />
                        </div>
                    </div>

                    {/* Causal Analysis */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Microscope size={18} className="text-blue-500" />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Causal_Telemetry_Vectors</h4>
                        </div>
                        <textarea
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[180px] resize-none font-medium leading-relaxed italic placeholder:text-gray-800"
                            value={formData.possibleCauses?.join("\n")}
                            onChange={e => setFormData({ ...formData, possibleCauses: e.target.value.split("\n").filter(Boolean) })}
                            placeholder="Map causal vectors (one per line)..."
                        />
                    </div>

                    {/* Logic Protocol */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Terminal size={18} className="text-purple-500" />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Execution_Resolution_Protocol</h4>
                        </div>
                        <div className="relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Flame size={100} className="text-purple-500" />
                            </div>
                            <textarea
                                className="w-full bg-black/40 border border-white/5 rounded-[3rem] p-10 text-[11px] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 min-h-[250px] resize-none font-mono leading-relaxed"
                                value={formData.debugSteps?.join("\n")}
                                onChange={e => setFormData({ ...formData, debugSteps: e.target.value.split("\n").filter(Boolean) })}
                                placeholder="Define logic steps (recursive protocol)..."
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}


