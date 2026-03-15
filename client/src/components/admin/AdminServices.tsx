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
    Terminal,
    Rocket,
    Server,
    Globe,
    Code,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { getApiUrl } from "@/lib/api";

interface ServiceTier {
    id: string;
    name: string;
    price: string;
    description: string | null;
    features: string[];
    icon: string | null;
    delay: number;
    featured: boolean;
    isVisible: boolean;
    order: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
    Terminal,
    Rocket,
    Server,
    Globe,
    Code
};

export default function AdminServices() {
    const [services, setServices] = useState<ServiceTier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<ServiceTier>>({});

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(getApiUrl("/api/admin/service-tiers"));
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (err) {
            console.error("Failed to fetch services:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (id?: string) => {
        setIsLoading(true);
        const method = id ? "PATCH" : "POST";
        const url = id ? `/api/admin/service-tiers/${id}` : "/api/admin/service-tiers";

        try {
            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                await fetchServices();
                setEditingId(null);
                setFormData({});
            }
        } catch (err) {
            console.error("Failed to save service:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this service tier?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/service-tiers/${id}`), { method: "DELETE" });
            if (response.ok) {
                await fetchServices();
            }
        } catch (err) {
            console.error("Failed to delete service:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFeature = async (id: string, field: 'featured' | 'isVisible') => {
        const service = services.find(s => s.id === id);
        if (!service) return;
        
        try {
            const response = await fetch(getApiUrl(`/api/admin/service-tiers/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: !service[field] }),
            });
            if (response.ok) {
                await fetchServices();
            }
        } catch (err) {
            console.error(`Failed to toggle ${field}:`, err);
        }
    };

    if (isLoading && services.length === 0) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Service_Architecture</h2>
                <button
                    onClick={() => {
                        setEditingId("new");
                        setFormData({
                            name: "New Tier",
                            price: "From $0",
                            features: [],
                            icon: "Code",
                            isVisible: true,
                            order: services.length
                        });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus size={16} /> Add_Tier
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                    <m.div
                        key={service.id}
                        layout
                        className={`p-6 bg-white/[0.02] border border-white/5 rounded-3xl transition-all ${
                            editingId === service.id ? "ring-2 ring-blue-500/50 bg-white/[0.04]" : ""
                        }`}
                    >
                        {editingId === service.id ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase font-black">Tier_Name</label>
                                        <input
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                            value={formData.name || ""}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase font-black">Price_Value</label>
                                        <input
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                            value={formData.price || ""}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase font-black">Icon_Map</label>
                                        <select
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                            value={formData.icon || "Code"}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        >
                                            {Object.keys(iconMap).map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Narrative_Description</label>
                                    <textarea
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[80px]"
                                        value={formData.description || ""}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Feature_Matrix (Split by newline)</label>
                                    <textarea
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[120px]"
                                        value={formData.features?.join("\n") || ""}
                                        onChange={e => setFormData({ ...formData, features: e.target.value.split("\n").filter(f => f.trim()) })}
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={() => handleSave(service.id)}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                                    >
                                        Commit_Data
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500">
                                        {React.createElement(iconMap[service.icon || "Code"] || Code, { size: 24 })}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-white">{service.name}</h3>
                                            {service.featured && (
                                                <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md">Featured</span>
                                            )}
                                            {!service.isVisible && (
                                                <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md italic">Hidden</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-blue-400 font-mono font-bold">{service.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleFeature(service.id, 'isVisible')}
                                        className={`p-3 rounded-xl border transition-all ${
                                            service.isVisible ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" : "bg-red-500/5 border-red-500/20 text-red-500"
                                        }`}
                                    >
                                        {service.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFormData(service);
                                            setEditingId(service.id);
                                        }}
                                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </m.div>
                ))}

                {editingId === "new" && (
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-3xl"
                    >
                        {/* Recursive form for "new" tier, similar to the editing block above */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em]">Initialize_New_Service_Tier</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Tier_Name</label>
                                    <input
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                        value={formData.name || ""}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Enterprise Power"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Price_Value</label>
                                    <input
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                        value={formData.price || ""}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="e.g. From $9,999"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase font-black">Icon_Map</label>
                                    <select
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                                        value={formData.icon || "Code"}
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                    >
                                        {Object.keys(iconMap).map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-black">Narrative_Description</label>
                                <textarea
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[80px]"
                                    value={formData.description || ""}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-black">Feature_Matrix</label>
                                <textarea
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[120px]"
                                    value={formData.features?.join("\n") || ""}
                                    onChange={e => setFormData({ ...formData, features: e.target.value.split("\n").filter(f => f.trim()) })}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={() => handleSave()}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                                >
                                    Initialize_Tier
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </div>
        </div>
    );
}
