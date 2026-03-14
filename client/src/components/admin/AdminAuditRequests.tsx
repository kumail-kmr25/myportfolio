"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
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
    Loader2
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminAuditRequests() {
    const { data: response, error, isLoading } = useSWR("/api/admin/audit-requests", fetcher);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

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
        } catch (err) {
            console.error("Failed to update record");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return;
        try {
            await fetch(`/api/admin/audit-requests?id=${id}`, {
                method: "DELETE",
            });
            mutate("/api/admin/audit-requests");
            setSelectedRequest(null);
        } catch (err) {
            console.error("Failed to delete record");
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-400 bg-green-400/10 border-green-400/20";
        if (score >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
        return "text-red-400 bg-red-400/10 border-red-400/20";
    };

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Analytics Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Audits", value: analytics.total, icon: BarChart3, color: "text-blue-400" },
                    { label: "Pending Leads", value: analytics.pending, icon: Mail, color: "text-yellow-400" },
                    { label: "Avg Site Score", value: `${analytics.avgScore}%`, icon: Zap, color: "text-green-400" }
                ].map((stat, idx) => (
                    <div key={idx} className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-3">
                        <div className={`p-3 bg-white/5 rounded-2xl w-fit ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search URL or email..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setFilter("all")}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter("pending")}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'pending' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        Pending
                    </button>
                    <button 
                        onClick={() => setFilter("hot")}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'hot' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        🔥 Hot
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="glass-effect rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Website URL</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Score</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Lead Quality</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Status</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filteredRequests.map((req: any) => (
                                <tr key={req.id} className="group hover:bg-white/[0.01] transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-white truncate max-w-xs">{req.websiteUrl}</span>
                                            <span className="text-[11px] text-gray-500 font-medium">{new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className={`px-4 py-1.5 rounded-full border text-[11px] font-black w-fit ${getScoreColor(req.performance || 0)}`}>
                                            {req.performance || 0}%
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        {(req.performance || 0) < 50 ? (
                                            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                                                🔥 Hot Lead
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                🟡 Warm
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-10 py-8">
                                        <button 
                                            onClick={() => handleUpdateAudit(req.id, { contacted: !req.contacted })}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${req.contacted ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-white/5'}`}
                                        >
                                            {req.contacted ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 border-2 border-current rounded-full" />}
                                            {req.contacted ? 'Contacted' : 'Pending'}
                                        </button>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => setSelectedRequest(req)}
                                                className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-lg"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(req.id)}
                                                className="p-3 bg-red-500/5 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all shadow-lg"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRequest(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <m.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[3.5rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                            
                            <div className="space-y-10">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-white tracking-tighter">Audit Breakdown</h3>
                                        <p className="text-xs font-medium text-gray-500 truncate max-w-sm">{selectedRequest.websiteUrl}</p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedRequest(null)}
                                        className="p-3 rounded-2xl bg-white/5 text-gray-500 hover:text-white transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Performance", value: selectedRequest.performance, icon: Zap },
                                        { label: "SEO Score", value: selectedRequest.seo, icon: BarChart3 },
                                        { label: "Accessibility", value: selectedRequest.accessibility, icon: Shield },
                                        { label: "Connect Speed", value: `${selectedRequest.loadTime?.toFixed(2)}s`, icon: Filter }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-2">
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <item.icon size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            <p className="text-xl font-black text-white">{item.value ?? 'N/A'}{typeof item.value === 'number' ? '%' : ''}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Internal Notes</label>
                                    <textarea 
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[120px] resize-none font-medium"
                                        placeholder="Add notes about this lead..."
                                        defaultValue={selectedRequest.notes || ""}
                                        onBlur={(e) => handleUpdateAudit(selectedRequest.id, { notes: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <a 
                                        href={`mailto:${selectedRequest.email || ''}?subject=Website Audit Follow-up&body=Hi, I noticed your website at ${selectedRequest.websiteUrl} has some performance issues...`}
                                        className="flex-grow flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
                                    >
                                        <Mail size={16} />
                                        Follow-up Email
                                    </a>
                                    <button 
                                        onClick={() => handleUpdateAudit(selectedRequest.id, { contacted: !selectedRequest.contacted })}
                                        className={`px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedRequest.contacted ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                                    >
                                        {selectedRequest.contacted ? 'Contacted' : 'Mark Done'}
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
