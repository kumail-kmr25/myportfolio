"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Edit2,
    Save,
    X,
    Check,
    Loader2,
    Zap,
    ChevronUp,
    ChevronDown,
    Search,
    ShieldCheck,
    Code,
    Rocket
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { getApiUrl } from "@/lib/api";

interface ProcessStep {
    id: string;
    title: string;
    description: string;
    order: number;
    icon: string | null;
}

const iconMap: Record<string, React.ComponentType<any>> = {
    Search,
    ShieldCheck,
    Code,
    Zap,
    Rocket
};

export default function AdminProcess() {
    const [steps, setSteps] = useState<ProcessStep[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<ProcessStep>>({});

    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        try {
            const response = await fetch(getApiUrl("/api/admin/process"));
            if (response.ok) {
                const data = await response.json();
                setSteps(data);
            }
        } catch (err) {
            console.error("Failed to fetch process steps:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (id?: string) => {
        setIsLoading(true);
        const method = id ? "PATCH" : "POST";
        const url = id ? `/api/admin/process/${id}` : "/api/admin/process";

        try {
            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                await fetchSteps();
                setEditingId(null);
                setFormData({});
            }
        } catch (err) {
            console.error("Failed to save step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this process step?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/process/${id}`), { method: "DELETE" });
            if (response.ok) {
                await fetchSteps();
            }
        } catch (err) {
            console.error("Failed to delete step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && steps.length === 0) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Operational_Architecture</h2>
                <button
                    onClick={() => {
                        setEditingId("new");
                        setFormData({
                            title: "New Step",
                            description: "Step description...",
                            order: steps.length,
                            icon: "Zap"
                        });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all"
                >
                    <Plus size={16} /> Add_Step
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl"
                    >
                        {editingId === step.id ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase font-black">Step_Title</label>
                                        <input
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                            value={formData.title || ""}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase font-black">Icon_Matrix</label>
                                        <select
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                            value={formData.icon || "Zap"}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        >
                                            {Object.keys(iconMap).map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Process_Description</label>
                                    <textarea
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[80px]"
                                        value={formData.description || ""}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button onClick={() => setEditingId(null)} className="text-[10px] font-black uppercase text-gray-500 hover:text-white">Abort</button>
                                    <button onClick={() => handleSave(step.id)} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500">Commit</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500">
                                        {React.createElement(iconMap[step.icon || "Zap"] || Zap, { size: 24 })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white uppercase italic">{step.title}</h3>
                                        <p className="text-xs text-gray-500">{step.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => { setFormData(step); setEditingId(step.id); }} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(step.id)} className="p-3 bg-red-500/5 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
