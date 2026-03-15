"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { 
    Users, 
    Mail, 
    Calendar, 
    CheckCircle2, 
    XCircle, 
    Download, 
    Search,
    Filter,
    ChevronRight,
    MoreVertical,
    Check,
    X,
    Trash2,
    RefreshCw
} from "lucide-react";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(data => data.data || data);

export default function AdminSubscribers() {
    const { data: subscribers, mutate } = useSWR("/api/admin/subscribers", fetcher);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "confirmed" | "unsubscribed">("all");

    const filteredSubscribers = (Array.isArray(subscribers) ? subscribers : []).filter(sub => {
        const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filter === "all" || 
                             (filter === "confirmed" && sub.confirmed && !sub.unsubscribed) ||
                             (filter === "unsubscribed" && sub.unsubscribed);
        return matchesSearch && matchesFilter;
    });

    const toggleStatus = async (id: string, field: string, value: boolean) => {
        try {
            const res = await fetch(`/api/admin/subscribers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value })
            });
            if (res.ok) mutate();
        } catch (err) {
            console.error("Failed to update subscriber", err);
        }
    };

    const deleteSubscriber = async (id: string) => {
        if (!confirm("Are you sure you want to remove this subscriber?")) return;
        try {
            const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
            if (res.ok) mutate();
        } catch (err) {
            console.error("Failed to delete subscriber", err);
        }
    };

    const downloadCSV = () => {
        const headers = ["Email", "Name", "Confirmed", "Unsubscribed", "Joined"];
        const rows = filteredSubscribers.map(sub => [
            sub.email,
            sub.name || "",
            sub.confirmed ? "Yes" : "No",
            sub.unsubscribed ? "Yes" : "No",
            new Date(sub.createdAt).toLocaleDateString()
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," + 
            headers.join(",") + "\n" + 
            rows.map(e => e.join(",")).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-10">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Reach", value: subscribers?.length || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Confirmed", value: Array.isArray(subscribers) ? subscribers.filter((s:any) => s.confirmed && !s.unsubscribed).length : 0, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Unsubscribed", value: Array.isArray(subscribers) ? subscribers.filter((s:any) => s.unsubscribed).length : 0, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: "Growth Rate", value: "+12%", icon: RefreshCw, color: "text-indigo-500", bg: "bg-indigo-500/10" }
                ].map((stat, i) => (
                    <m.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-black text-white">{stat.value}</p>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH NODE_LIST..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-xs font-mono text-white focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex bg-white/[0.02] border border-white/5 rounded-2xl p-1">
                        {(['all', 'confirmed', 'unsubscribed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={downloadCSV}
                    className="flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/[0.05] transition-all group"
                >
                    <Download size={14} className="group-hover:-translate-y-1 transition-transform" />
                    EXPORT_CSV
                </button>
            </div>

            {/* Table */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Subscriber_Node</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Preferences</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Engagement</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredSubscribers.map((sub: any) => (
                            <m.tr 
                                key={sub.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group hover:bg-white/[0.01] transition-colors"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Mail size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{sub.email}</p>
                                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">JOINED: {new Date(sub.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    {sub.unsubscribed ? (
                                        <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">UNSUBSCRIBED</span>
                                    ) : sub.confirmed ? (
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">ACTIVE</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">PENDING</span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-gray-400 text-xs font-mono">
                                    {sub.newArticles && " ARTICLES "}
                                    {sub.newProjects && " PROJECTS "}
                                    {sub.availability && " AVAIL "}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div key={s} className="w-1 h-3 rounded-full bg-blue-500/20" />
                                        ))}
                                        <span className="text-[10px] text-gray-500 font-black ml-2">NODE_HEALTH_OK</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => toggleStatus(sub.id, "unsubscribed", !sub.unsubscribed)}
                                            className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                                            title={sub.unsubscribed ? "Resubscribe" : "Unsubscribe"}
                                        >
                                            <X size={16} />
                                        </button>
                                        <button 
                                            onClick={() => deleteSubscriber(sub.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                                            title="Delete Node"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </m.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
