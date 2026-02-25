"use client";

import { useState } from "react";
import useSWR from "swr";
import { Save, AlertCircle, Clock, Activity, RefreshCcw } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const STATUS_OPTIONS = [
    { value: "available", label: "🟢 Available" },
    { value: "deep_work", label: "🟡 In Deep Work" },
    { value: "active_project", label: "🔴 Active Project" },
    { value: "open_collaboration", label: "🔵 Open to Collaboration" },
];

export default function AdminDeveloperStatus() {
    const { data, mutate } = useSWR("/api/developer-status", fetcher);
    const [isSaving, setIsSaving] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await fetch("/api/admin/developer-status/sync");
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

    // Local state for optimistic UI updates
    const [formData, setFormData] = useState({
        status: "",
        capacityPercent: 0,
        nextAvailabilityDays: 0,
        currentFocus: "",
        customMessage: "",
    });

    // Populate form data once API data loads
    if (data && !formData.status) {
        setFormData({
            status: data.status || "available",
            capacityPercent: data.capacityPercent || 0,
            nextAvailabilityDays: data.nextAvailabilityDays || 0,
            currentFocus: data.currentFocus || "",
            customMessage: data.customMessage || "",
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/developer-status", {
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
                mutate(); // Refresh SWR cache
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!data) return (
        <div className="p-8 glass-effect rounded-[2.5rem] border border-white/5 flex items-center justify-center">
            <span className="text-gray-500 animate-pulse text-sm">Loading Developer Status...</span>
        </div>
    );

    return (
        <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Activity size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Live Engineering Status</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1">
                        Broadcasts to Navbar, Hero, and Hire Modal
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
                >
                    <RefreshCcw size={14} className={isSyncing ? "animate-spin" : ""} />
                    {isSyncing ? "Syncing..." : "Sync with Active Projects"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Status Dropdown */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Current Status Phase</label>
                        <select
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            {STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-[#0a0a0a] text-white">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Capacity Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center ml-2 mr-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Capacity Percentage</label>
                            <span className="text-sm font-bold text-blue-400">{formData.capacityPercent}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            value={formData.capacityPercent}
                            onChange={(e) => setFormData({ ...formData, capacityPercent: Number(e.target.value) })}
                        />
                        <div className="flex justify-between text-[9px] text-gray-600 uppercase font-black px-2 mt-1">
                            <span>0% (Empty)</span>
                            <span>100% (Full)</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Next Availability */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Next Availability (Days)</label>
                        <input
                            type="number"
                            min="0"
                            className="input-field min-h-[48px]"
                            placeholder="e.g. 14"
                            value={formData.nextAvailabilityDays}
                            onChange={(e) => setFormData({ ...formData, nextAvailabilityDays: Number(e.target.value) })}
                        />
                    </div>

                    {/* Current Focus */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Current Major Focus</label>
                        <input
                            type="text"
                            className="input-field min-h-[48px]"
                            placeholder="e.g. Full-Stack SaaS Build"
                            value={formData.currentFocus}
                            onChange={(e) => setFormData({ ...formData, currentFocus: e.target.value })}
                        />
                    </div>
                </div>

                {/* Optional Custom Message */}
                <div className="space-y-3 pt-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Custom Broadcast Message (Optional)</label>
                    <input
                        type="text"
                        className="input-field min-h-[48px]"
                        placeholder="e.g. Exploring Rust + WebAssembly right now."
                        value={formData.customMessage}
                        onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                    />
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <AlertCircle size={14} /> Updates are pushed to clients automatically via SWR.
                    </p>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn-primary py-4 px-8 text-xs font-black uppercase tracking-widest flex items-center gap-3"
                    >
                        {isSaving ? <Clock size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSaving ? "Broadcasting..." : "Broadcast Status"}
                    </button>
                </div>
            </form>
        </div>
    );
}
