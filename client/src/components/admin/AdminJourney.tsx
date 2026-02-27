"use client";

import { useState } from "react";
import {
    Plus,
    Trash2,
    Edit2,
    Save,
    X,
    GripVertical,
    Brain,
    Code2,
    Cpu,
    Rocket,
    ShieldCheck,
    Layers,
    Globe,
    Database,
    Sparkles,
    Cloud
} from "lucide-react";
import { motion, Reorder } from "framer-motion";

const IconMap: { [key: string]: any } = {
    "Brain": Brain,
    "Code2": Code2,
    "Cpu": Cpu,
    "Rocket": Rocket,
    "ShieldCheck": ShieldCheck,
    "Layers": Layers,
    "Globe": Globe,
    "Database": Database,
    "Sparkles": Sparkles,
    "Cloud": Cloud,
};

interface JourneyPhase {
    id: string;
    phase: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    order: number;
}

interface AdminJourneyProps {
    phases: JourneyPhase[];
    onAdd: (data: any) => void;
    onUpdate: (id: string, data: any) => void;
    onDelete: (id: string) => void;
}

export default function AdminJourney({ phases, onAdd, onUpdate, onDelete }: AdminJourneyProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        phase: "",
        title: "",
        description: "",
        icon: "Code2",
        color: "from-blue-500/20 to-indigo-500/20",
        order: 0
    });

    const handleEdit = (phase: JourneyPhase) => {
        setEditingId(phase.id);
        setFormData(phase);
    };

    const handleSave = () => {
        if (editingId) {
            onUpdate(editingId, formData);
            setEditingId(null);
        } else {
            onAdd(formData);
            setIsAdding(false);
        }
        setFormData({
            phase: "",
            title: "",
            description: "",
            icon: "Code2",
            color: "from-blue-500/20 to-indigo-500/20",
            order: phases.length + 1
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({
            phase: "",
            title: "",
            description: "",
            icon: "Code2",
            color: "from-blue-500/20 to-indigo-500/20",
            order: 0
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Journey Phases</h2>
                    <p className="text-xs text-gray-500">Manage the steps of your professional evolution</p>
                </div>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={14} />
                        Add Phase
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <div className="card p-8 bg-white/5 border-white/10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">Internal Reference (e.g. Step 1)</label>
                            <input
                                type="text"
                                value={formData.phase}
                                onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                                placeholder="Phase 1"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">Display Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                                placeholder="Technological Foundation"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all h-24"
                                placeholder="Describe the focus of this phase..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">Icon</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                            >
                                {Object.keys(IconMap).map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">Order Index</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Save size={14} />
                            {editingId ? "Update Phase" : "Create Phase"}
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        className="group relative flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all"
                    >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            {(() => {
                                const Icon = IconMap[phase.icon] || Code2;
                                return <Icon className="w-6 h-6 text-blue-400" />;
                            })()}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest">{phase.phase}</span>
                                <span className="text-gray-600">•</span>
                                <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">{phase.description}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(phase)}
                                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(phase.id)}
                                className="p-3 rounded-xl bg-white/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/20 transition-all"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {phases.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                        <p className="text-gray-500 font-medium">No journey phases found. Start by adding one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
