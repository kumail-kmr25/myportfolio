"use client";

import { useState } from "react";
import { Loader2, Save, Zap, Clock, BarChart3, MessageSquare } from "lucide-react";
import useSWR from "swr";

import { getApiUrl } from "@/lib/api";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    const json = await res.json();
    if (!res.ok || json.success === false) throw new Error(json.error || "Fetch failed");
    return json.success ? json.data : json;
};

const STATUS_OPTIONS = [
    { value: "available", label: "🟢 Available", desc: "Open to new projects" },
    { value: "deep_work", label: "🟡 In Deep Work", desc: "Focused, limited availability" },
    { value: "active_project", label: "🔴 Working on Active Project", desc: "Booked, not taking new work" },
    { value: "open_collaboration", label: "🔵 Open to Strategic Collaboration", desc: "Selective opportunities only" },
];

interface StatusData {
    id?: string;
    status: string;
    capacityPercent: number;
    nextAvailabilityDays: number;
    currentFocus: string;
    customMessage?: string;
}

export default function AdminLiveStatus() {
    const { data, mutate, isLoading } = useSWR<StatusData>("/api/developer-status", fetcher);
    const [form, setForm] = useState<StatusData | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const current = form ?? data;
    const set = (key: keyof StatusData, val: any) =>
        setForm(p => ({ ...(p ?? data ?? {} as StatusData), [key]: val }));

    const handleSave = async () => {
        if (!current) return;
        setSaving(true);
        try {
            const response = await fetch(getApiUrl("/api/admin/developer-status"), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                await mutate();
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
                setForm(null);
            } else {
                console.error("Save failed:", data.error);
            }
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white/20 w-8 h-8" /></div>;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 bg-white/[0.02] p-12 rounded-[4rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-2xl shadow-blue-500/10 group-hover:scale-110 transition-transform">
                        <Zap size={32} className="text-blue-400 animate-pulse" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-2 italic">
                           M-16 // LIVE_ENGINEERING_VECTOR
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Engineering_Broadcaster</h2>
                        <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3 italic">Broadcast Operational Reality to Client-Facing Nodes</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 relative z-10">
                    <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-800 italic">TRANSMISSION_PROTOCOL</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic mt-1">SWR_DENSE_SYNC_V4</p>
                    </div>
                    <div className="w-px h-12 bg-white/5 hidden sm:block" />
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="group/btn relative py-6 px-12 rounded-[2rem] bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/40 active:scale-95 flex items-center gap-5 overflow-hidden italic"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                        {saving ? <Loader2 size={20} className="animate-spin" /> : saved ? "COMMIT_VERIFIED_✓" : "EXECUTE_UPDATE"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Status selector */}
                <div className="lg:col-span-5 p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-10 relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    <div className="flex items-center gap-4 relative z-10">
                       <Zap size={18} className="text-blue-500" />
                       <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white italic">Availability_Phase_Matrix</h3>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {STATUS_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => set("status", opt.value)}
                                className={`w-full text-left px-8 py-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group/opt ${current?.status === opt.value
                                    ? "bg-blue-600/10 border-blue-500/40 text-white shadow-2xl shadow-blue-500/10"
                                    : "bg-white/[0.02] border-white/5 text-gray-700 hover:text-white hover:border-white/10 hover:bg-white/[0.04]"}`}
                            >
                                <div className="absolute inset-0 bg-blue-500/[0.02] transform translate-y-full group-hover/opt:translate-y-0 transition-transform" />
                                <div className="flex items-center justify-between relative z-10">
                                   <div>
                                       <div className="text-sm font-black uppercase tracking-widest italic">{opt.label.toUpperCase()}</div>
                                       <div className="text-[10px] font-black text-gray-800 mt-2 uppercase tracking-[0.2em] italic group-hover/opt:text-gray-600 transition-colors">{opt.desc.toUpperCase()}</div>
                                   </div>
                                   {current?.status === opt.value && (
                                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                                   )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="p-12 rounded-[4.5rem] bg-black/40 border border-white/5 space-y-10 relative overflow-hidden group">
                        <div className="flex items-center gap-4">
                           <BarChart3 size={18} className="text-indigo-400" />
                           <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white italic">Capacity_Intelligence_Telemetry</h3>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <div className="flex justify-between items-center mb-6 ml-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">Operational_Saturation</label>
                                    <span className="text-2xl font-black text-blue-400 italic tracking-tighter">{current?.capacityPercent ?? 0}%</span>
                                </div>
                                <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5">
                                   <input type="range" min="0" max="100" value={current?.capacityPercent ?? 0}
                                       onChange={e => set("capacityPercent", Number(e.target.value))}
                                       className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400" />
                                   <div className="flex justify-between text-[8px] font-black text-gray-800 uppercase tracking-[0.4em] mt-6 italic px-2">
                                      <span>IDLE_CORE</span>
                                      <span>PEAK_EFFICIENCY</span>
                                      <span>LOAD_LOCK</span>
                                   </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                                        <Clock size={16} className="text-indigo-400" /> Temporal_Drift (Days)
                                    </label>
                                    <input type="number" min="0" max="365" value={current?.nextAvailabilityDays ?? 0}
                                        onChange={e => set("nextAvailabilityDays", Number(e.target.value))}
                                        className="w-full bg-black/40 border border-white/10 rounded-[2rem] px-8 py-6 text-white font-black text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all italic tracking-tighter" />
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                                        <Zap size={16} className="text-indigo-400" /> Current_Focus_Node
                                    </label>
                                    <input className="w-full bg-black/40 border border-white/10 rounded-[2rem] px-8 py-6 text-[12px] font-black text-white uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-gray-900 italic" value={current?.currentFocus ?? ""} onChange={e => set("currentFocus", e.target.value)} placeholder="INITIALIZING_GOAL..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-12 rounded-[4.5rem] bg-indigo-600/[0.02] border border-white/5 space-y-8 relative overflow-hidden group shadow-2xl backdrop-blur-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] to-transparent" />
                        <div className="flex items-center gap-4 relative z-10">
                            <MessageSquare size={18} className="text-indigo-400" />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white italic">Global_Context_Broadcast</h3>
                        </div>
                        <div className="relative z-10">
                           <input 
                              className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] px-10 py-8 text-[13px] text-white font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all placeholder:text-gray-900 italic" 
                              value={current?.customMessage ?? ""} 
                              onChange={e => set("customMessage", e.target.value)} 
                              placeholder="DEFINE_CUSTOM_TRANSMISSION_PROTOCOL..." 
                           />
                           <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                              <span className="text-[8px] font-black text-gray-800 tracking-[0.3em] italic">READY_SIGNAL</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
