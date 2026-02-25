"use client";

import { useState } from "react";
import { Loader2, Save, Zap, Clock, BarChart3, MessageSquare } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

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
            await fetch("/api/admin/developer-status", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current),
            });
            await mutate();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            setForm(null);
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white/20 w-8 h-8" /></div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Zap size={20} className="text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Live Engineering Status</h2>
                    <p className="text-xs text-gray-500">Shown in Navbar, Hero, and Hire Me — updates in real time</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status selector */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                        <Zap size={12} /> Availability Status
                    </p>
                    <div className="space-y-2">
                        {STATUS_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => set("status", opt.value)}
                                className={`w-full text-left px-4 py-3 rounded-2xl border transition-all text-sm font-bold ${current?.status === opt.value
                                    ? "bg-blue-500/10 border-blue-500/40 text-white"
                                    : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-white/10"}`}
                            >
                                {opt.label}
                                <div className="text-[10px] font-normal text-gray-500 mt-0.5">{opt.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <BarChart3 size={12} /> Capacity Metrics
                        </p>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs text-gray-400 font-bold">Current Capacity</label>
                                <span className="text-xs font-black text-white">{current?.capacityPercent ?? 0}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={current?.capacityPercent ?? 0}
                                onChange={e => set("capacityPercent", Number(e.target.value))}
                                className="w-full accent-blue-500" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block flex items-center gap-2">
                                <Clock size={10} /> Next Availability (days)
                            </label>
                            <input type="number" min="0" max="365" value={current?.nextAvailabilityDays ?? 0}
                                onChange={e => set("nextAvailabilityDays", Number(e.target.value))}
                                className="input-field text-sm" />
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <MessageSquare size={12} /> Context
                        </p>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Current Focus</label>
                            <input className="input-field text-sm" value={current?.currentFocus ?? ""} onChange={e => set("currentFocus", e.target.value)} placeholder="Full-Stack SaaS Build" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Custom Message (optional)</label>
                            <input className="input-field text-sm" value={current?.customMessage ?? ""} onChange={e => set("customMessage", e.target.value)} placeholder="e.g., Accepting work from March 2025" />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleSave} disabled={saving}
                className="btn-primary flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-widest disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saved ? "✓ Saved!" : saving ? "Saving..." : "Update Live Status"}
            </button>
        </div>
    );
}
