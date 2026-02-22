"use client";

import { useState } from "react";
import {
    Activity,
    Plus,
    Trash2,
    Edit,
    History,
    BookOpen,
    ChevronRight,
    Save,
    X
} from "lucide-react";
import useSWR from "swr";

export default function AdminDiagnostics({ patterns, logs, onUpdate }: { patterns: any[], logs: any[], onUpdate: () => void }) {
    const [subTab, setSubTab] = useState<"patterns" | "logs">("patterns");
    const [editingPattern, setEditingPattern] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleDeletePattern = async (id: string) => {
        if (!confirm("Delete this pattern?")) return;
        const res = await fetch(`/api/admin/diagnostic-patterns/${id}`, { method: "DELETE" });
        if (res.ok) onUpdate();
    };

    return (
        <div className="space-y-8">
            <div className="flex gap-4 p-1 bg-white/5 rounded-2xl w-fit">
                <button
                    onClick={() => setSubTab("patterns")}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subTab === "patterns" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-white"
                        }`}
                >
                    Knowledge Base
                </button>
                <button
                    onClick={() => setSubTab("logs")}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subTab === "logs" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-white"
                        }`}
                >
                    Analysis Logs
                </button>
            </div>

            {subTab === "patterns" ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white/5 p-8 rounded-[2rem] border border-white/5">
                        <div>
                            <h2 className="text-xl font-bold text-white">Diagnostic Patterns</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage the keywords and solutions for the smart diagnostic tool.</p>
                        </div>
                        <button
                            onClick={() => { setIsAdding(true); setEditingPattern(null); }}
                            className="btn-primary py-3 px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        >
                            <Plus size={16} /> Add New Pattern
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {patterns.map((pattern) => (
                            <div key={pattern.id} className="glass-effect p-8 rounded-[2rem] border border-white/5 space-y-4 hover:border-white/10 transition-all group">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap gap-2">
                                        {pattern.keywords.map((kw: string) => (
                                            <span key={kw} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase rounded-lg border border-blue-500/20">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingPattern(pattern)} className="p-2 bg-white/5 text-gray-500 hover:text-white transition-colors"><Edit size={14} /></button>
                                        <button onClick={() => handleDeletePattern(pattern.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{pattern.recommendedService}</h3>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-black">{pattern.complexity} Complexity</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-400 font-black uppercase">Causes:</p>
                                    <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                                        {pattern.possibleCauses.slice(0, 2).map((c: string, i: number) => <li key={i}>{c}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                        <h2 className="text-xl font-bold text-white">Diagnostic Activity</h2>
                        <p className="text-sm text-gray-500 mt-1">Review the technical problems visitors are describing.</p>
                    </div>

                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.04] transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400 font-medium line-clamp-2">{log.description}</p>
                                        <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-gray-600">
                                            <span>{log.environment}</span>
                                            {log.techStack && <span>• {log.techStack}</span>}
                                            <span>• {new Date(log.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {log.matchedPatternId ? (
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase rounded-full">Match Found</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-gray-500/10 text-gray-500 border border-gray-500/20 text-[9px] font-black uppercase rounded-full">No Pattern</span>
                                    )}
                                </div>
                                {log.errorMessage && (
                                    <pre className="p-4 bg-black/40 rounded-2xl border border-white/5 text-[10px] text-red-400 font-mono overflow-x-auto">
                                        {log.errorMessage}
                                    </pre>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pattern Edit/Add Modal */}
            {(editingPattern || isAdding) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
                    <div className="bg-[#080808] border border-white/10 rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => { setEditingPattern(null); setIsAdding(false); }}
                            className="absolute top-8 right-8 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">
                            {isAdding ? "Add New Pattern" : "Edit Pattern"}
                        </h2>

                        <PatternForm
                            pattern={editingPattern}
                            onClose={() => { setEditingPattern(null); setIsAdding(false); }}
                            onUpdate={onUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function PatternForm({ pattern, onClose, onUpdate }: { pattern?: any, onClose: () => void, onUpdate: () => void }) {
    const [formData, setFormData] = useState({
        keywords: pattern ? pattern.keywords.join(", ") : "",
        possibleCauses: pattern ? pattern.possibleCauses.join("\n") : "",
        debugSteps: pattern ? pattern.debugSteps.join("\n") : "",
        complexity: pattern ? pattern.complexity : "Medium",
        recommendedService: pattern ? pattern.recommendedService : "Bug Fixing"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            keywords: formData.keywords.split(",").map((k: string) => k.trim()),
            possibleCauses: formData.possibleCauses.split("\n").filter((c: string) => c.trim()),
            debugSteps: formData.debugSteps.split("\n").filter((s: string) => s.trim())
        };

        const url = pattern ? `/api/admin/diagnostic-patterns/${pattern.id}` : "/api/admin/diagnostic-patterns";
        const method = pattern ? "PATCH" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            onUpdate();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Keywords (Comma Separated)</label>
                <input
                    className="input-field"
                    value={formData.keywords}
                    onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g. cors, 403, unauthorized"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Complexity</label>
                    <select
                        className="input-field cursor-pointer"
                        value={formData.complexity}
                        onChange={e => setFormData({ ...formData, complexity: e.target.value })}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Recommended Service</label>
                    <input
                        className="input-field"
                        value={formData.recommendedService}
                        onChange={e => setFormData({ ...formData, recommendedService: e.target.value })}
                        placeholder="e.g. Backend Debugging"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Possible Causes (One Per Line)</label>
                <textarea
                    className="input-field min-h-[100px] resize-none"
                    value={formData.possibleCauses}
                    onChange={e => setFormData({ ...formData, possibleCauses: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Debug Steps (One Per Line)</label>
                <textarea
                    className="input-field min-h-[100px] resize-none"
                    value={formData.debugSteps}
                    onChange={e => setFormData({ ...formData, debugSteps: e.target.value })}
                    required
                />
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                <Save size={18} /> Save Knowledge Pattern
            </button>
        </form>
    );
}
