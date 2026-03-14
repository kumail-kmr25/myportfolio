"use client";

import { useState } from "react";
import { 
    ToggleLeft, 
    ToggleRight, 
    Settings, 
    Zap, 
    ShieldCheck, 
    TrendingUp, 
    Bot, 
    User,
    Save,
    Search,
    Filter,
    AlertCircle,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

interface FeatureToggle {
    id: string;
    featureKey: string;
    name: string;
    description: string | null;
    enabled: boolean;
    config: any;
    category: string;
}

interface AdminFeatureManagerProps {
    features: FeatureToggle[];
    onUpdate: () => void;
}

export default function AdminFeatureManager({ features, onUpdate }: AdminFeatureManagerProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [editingConfig, setEditingConfig] = useState<{id: string, config: string} | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const categories = ["all", "engagement", "trust", "monetization", "automation", "personality"];

    const filteredFeatures = features.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             f.featureKey.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || f.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleToggle = async (id: string, currentStatus: boolean) => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/features", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, enabled: !currentStatus })
            });
            if (res.ok) {
                onUpdate();
                setMessage({ type: 'success', text: "Feature state synchronized." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Failed to propagate state change." });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleSaveConfig = async () => {
        if (!editingConfig) return;
        setIsSaving(true);
        try {
            let parsedConfig;
            try {
                parsedConfig = JSON.parse(editingConfig.config);
            } catch (e) {
                setMessage({ type: 'error', text: "Invalid JSON configuration." });
                setIsSaving(false);
                return;
            }

            const res = await fetch("/api/admin/features", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingConfig.id, config: parsedConfig })
            });
            if (res.ok) {
                onUpdate();
                setEditingConfig(null);
                setMessage({ type: 'success', text: "Configuration matrix updated." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Failed to update configuration." });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'engagement': return <Zap size={14} className="text-blue-400" />;
            case 'trust': return <ShieldCheck size={14} className="text-emerald-400" />;
            case 'monetization': return <TrendingUp size={14} className="text-amber-400" />;
            case 'automation': return <Bot size={14} className="text-purple-400" />;
            case 'personality': return <User size={14} className="text-pink-400" />;
            default: return <Settings size={14} className="text-gray-400" />;
        }
    };

    return (
        <div className="space-y-10">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                activeCategory === cat 
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
                                : "bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-hover:text-blue-400" size={16} />
                    <input
                        type="text"
                        placeholder="SEARCH_FEATURE_REGISTRY..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-3.5 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 w-full md:w-80 transition-all font-mono italic"
                    />
                </div>
            </div>

            {/* Notification Bar */}
            <AnimatePresence>
                {message && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 border ${
                            message.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-red-500/5 border-red-500/20 text-red-400'
                        }`}
                    >
                        {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFeatures.map(feature => (
                    <m.div
                        layout
                        key={feature.id}
                        className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6 group hover:border-white/10 transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            {getCategoryIcon(feature.category)}
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-tighter italic">{feature.category}_PROT</span>
                                    <div className="w-1 h-1 rounded-full bg-white/10" />
                                    <span className="text-[8px] font-mono text-gray-700">{feature.featureKey}</span>
                                </div>
                                <h3 className="text-lg font-black text-white italic tracking-tight">{feature.name}</h3>
                            </div>
                            <button
                                onClick={() => handleToggle(feature.id, feature.enabled)}
                                disabled={isSaving}
                                className={`transition-all ${feature.enabled ? 'text-blue-500' : 'text-gray-800'}`}
                            >
                                {feature.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                            {feature.description || "No tactical description provided for this module."}
                        </p>

                        <div className="pt-4 flex items-center justify-between border-t border-white/5">
                            <button
                                onClick={() => setEditingConfig({ id: feature.id, config: JSON.stringify(feature.config, null, 2) })}
                                className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-all"
                            >
                                <Settings size={14} />
                                CONFIG_MATRIX
                            </button>
                            <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${feature.enabled ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse' : 'bg-gray-800'}`} />
                                <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest">{feature.enabled ? 'OPERATIONAL' : 'STANDBY'}</span>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Config Modal */}
            <AnimatePresence>
                {editingConfig && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingConfig(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <m.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#080808] border border-white/10 rounded-[3rem] p-10 w-full max-w-2xl relative z-10 shadow-2xl space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Config_Optimization</h2>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Update feature parameters in JSON format</p>
                                </div>
                                <button
                                    onClick={() => setEditingConfig(null)}
                                    className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden group focus-within:border-blue-500/30 transition-all">
                                <textarea
                                    value={editingConfig.config}
                                    onChange={(e) => setEditingConfig({ ...editingConfig, config: e.target.value })}
                                    className="w-full h-80 bg-transparent p-8 text-xs font-mono text-blue-100/80 focus:outline-none resize-none scrollbar-none"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <button
                                    onClick={() => setEditingConfig(null)}
                                    className="px-8 py-4 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-all"
                                >
                                    Abeyance
                                </button>
                                <button
                                    onClick={handleSaveConfig}
                                    disabled={isSaving}
                                    className="flex items-center gap-3 px-10 py-4 bg-blue-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    COMMIT_CHANGES
                                </button>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

const X = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
