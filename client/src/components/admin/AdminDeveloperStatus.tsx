import { useState, useEffect } from "react";
import useSWR from "swr";
import { Save, AlertCircle, Clock, Activity, RefreshCcw, Zap, Target, Gauge, MessageSquare } from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { m } from "framer-motion";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    const json = await res.json();
    if (!res.ok || json.success === false) throw new Error(json.error || "Fetch failed");
    return json.success ? json.data : json;
};

const STATUS_OPTIONS = [
    { value: "available", label: "🟢 Available", description: "Open for new engagements" },
    { value: "deep_work", label: "🟡 In Deep Work", description: "Focused engineering phase" },
    { value: "active_project", label: "🔴 Active Project", description: "Fully booked / execution mode" },
    { value: "open_collaboration", label: "🔵 Open to Collaboration", description: "Strategic partnerships" },
];

export default function AdminDeveloperStatus() {
    const { data, mutate } = useSWR("/api/developer-status", fetcher);
    const [isSaving, setIsSaving] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const [formData, setFormData] = useState({
        status: "",
        capacityPercent: 0,
        nextAvailabilityDays: 0,
        currentFocus: "",
        customMessage: "",
    });

    useEffect(() => {
        if (data && !formData.status) {
            setFormData({
                status: data.status || "available",
                capacityPercent: data.capacityPercent || 0,
                nextAvailabilityDays: data.nextAvailabilityDays || 0,
                currentFocus: data.currentFocus || "",
                customMessage: data.customMessage || "",
            });
        }
    }, [data, formData.status]);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await fetch(getApiUrl("/api/admin/developer-status/sync"));
            const syncData = await res.json();
            if (res.ok) {
                setFormData(prev => ({
                    ...prev,
                    status: syncData.status,
                    capacityPercent: syncData.capacityPercent,
                    nextAvailabilityDays: syncData.nextAvailabilityDays,
                    currentFocus: syncData.currentFocus,
                }));
            }
        } finally {
            setIsSyncing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch(getApiUrl("/api/developer-status"), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: formData.status,
                    capacityPercent: Number(formData.capacityPercent),
                    nextAvailabilityDays: Number(formData.nextAvailabilityDays),
                    currentFocus: formData.currentFocus,
                    customMessage: formData.customMessage,
                })
            });
            if (res.ok) {
                mutate();
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!data) return (
        <div className="p-20 glass-effect rounded-[3rem] border border-white/5 flex items-center justify-center">
            <RefreshCcw className="text-blue-500/20 animate-spin mr-3" size={24} />
            <span className="text-gray-600 font-black uppercase tracking-widest text-xs">Initializing Telemetry...</span>
        </div>
    );

    return (
        <div className="glass-effect p-12 rounded-[4.5rem] border border-white/5 space-y-12 bg-gradient-to-br from-blue-500/[0.03] to-transparent animate-in fade-in duration-1000 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-purple-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 border-b border-white/5 pb-10 relative z-10">
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-2xl shadow-blue-500/10 group-hover:scale-110 transition-transform">
                        <Activity size={36} className="animate-pulse" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-3 shadow-sm italic">
                            M-15 // SYSTEM_STATUS_BROADCASTER
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Global_Telemetry</h2>
                        <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3 italic">
                           Sync Status across Navigation, Hero, & CRM Nodes
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-4 p-5 px-10 rounded-[2rem] bg-white/[0.03] border border-white/10 text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 group/sync italic shadow-xl"
                >
                    <RefreshCcw size={18} className={`${isSyncing ? "animate-spin" : "group-hover/sync:rotate-180 transition-transform duration-700"}`} />
                    {isSyncing ? "SYNC_IN_PROGRESS" : "SYNC_WITH_CAPACITY_MATRIX"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Status Vector Selection */}
                    <div className="space-y-8">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                            <Zap size={16} className="text-blue-500 animate-pulse" /> Availability_Phase_Vector
                        </label>
                        <div className="grid grid-cols-1 gap-4">
                            {STATUS_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status: opt.value })}
                                    className={`flex items-center justify-between p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group/opt ${formData.status === opt.value
                                        ? "bg-blue-600/10 border-blue-500/40 text-white shadow-2xl shadow-blue-500/10"
                                        : "bg-white/[0.01] border-white/5 text-gray-700 hover:border-white/20 hover:bg-white/[0.03]"
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-blue-500/[0.02] transform translate-y-full group-hover/opt:translate-y-0 transition-transform" />
                                    <div className="text-left relative z-10">
                                        <div className="text-sm font-black uppercase tracking-widest italic">{opt.label}</div>
                                        <div className="text-[10px] text-gray-800 font-black uppercase tracking-[0.2em] mt-2 italic opacity-60 group-hover/opt:opacity-100 transition-opacity">
                                           {opt.description.toUpperCase()}
                                        </div>
                                    </div>
                                    {formData.status === opt.value && (
                                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping relative z-10" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <div className="flex justify-between items-center ml-4 mr-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic flex items-center gap-3">
                                    <Gauge size={16} className="text-blue-500" /> Operational_Load_Factor
                                </label>
                                <span className="text-2xl font-black text-blue-400 italic tracking-tighter">{formData.capacityPercent}%</span>
                            </div>
                            <div className="relative pt-4 px-4 bg-black/20 p-8 rounded-[3rem] border border-white/5">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                                    value={formData.capacityPercent}
                                    onChange={(e) => setFormData({ ...formData, capacityPercent: Number(e.target.value) })}
                                />
                                <div className="flex justify-between text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] mt-8 italic px-2">
                                    <span className={formData.capacityPercent < 30 ? "text-blue-500" : ""}>STANDBY_MODE</span>
                                    <span className={formData.capacityPercent >= 30 && formData.capacityPercent < 80 ? "text-indigo-500" : ""}>OPTIMAL_SYNC</span>
                                    <span className={formData.capacityPercent >= 80 ? "text-red-500" : ""}>SATURATION_POINT</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                                    <Clock size={16} className="text-blue-500" /> Temporal_Window
                                </label>
                                <div className="relative group/input">
                                   <input
                                       type="number"
                                       min="0"
                                       className="w-full bg-black/40 border border-white/10 rounded-[2rem] px-8 py-6 text-white font-black text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all italic tracking-tighter"
                                       value={formData.nextAvailabilityDays}
                                       onChange={(e) => setFormData({ ...formData, nextAvailabilityDays: Number(e.target.value) })}
                                   />
                                   <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-800 uppercase tracking-widest italic group-focus-within/input:text-blue-500 transition-colors">DAYS</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                                    <Target size={16} className="text-blue-500" /> Strategic_Focus
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-[2rem] px-8 py-7 text-white font-black text-[12px] uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-gray-800 italic"
                                        placeholder="INITIALIZING_GOAL..."
                                        value={formData.currentFocus}
                                        onChange={(e) => setFormData({ ...formData, currentFocus: e.target.value })}
                                    />
                                    <Zap size={14} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Broadcast Override */}
                <div className="space-y-6 pt-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                        <MessageSquare size={16} className="text-blue-500" /> Global_Broadcast_Override (Optional)
                    </label>
                    <div className="relative group/text">
                        <div className="absolute inset-0 bg-blue-500/[0.01] blur-3xl opacity-0 group-hover/text:opacity-100 transition-opacity" />
                        <textarea
                            className="w-full bg-black/40 border border-white/10 rounded-[3rem] px-10 py-8 text-sm text-white font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all min-h-[140px] leading-relaxed italic placeholder:text-gray-900 relative z-10"
                            placeholder="DEFINE_CUSTOM_TRANSMISSION_PROTOCOL..."
                            value={formData.customMessage}
                            onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col xl:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] flex items-center gap-3 italic">
                           Transmission_Channel: ENCRYPTED // Protocol: SWR_SYNC
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full xl:w-auto py-8 px-20 rounded-[2.5rem] bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/40 active:scale-95 group/submit italic relative overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20 transform translate-y-full group-hover/submit:translate-y-0 transition-transform" />
                        {isSaving ? <RefreshCcw className="animate-spin" size={20} /> : <Target size={22} className="group-hover/submit:scale-125 transition-transform" />}
                        {isSaving ? "SYNCHRONIZING..." : "EXECUTE_GLOBAL_BROADCAST"}
                    </button>
                </div>
            </form>
        </div>
    );
}
