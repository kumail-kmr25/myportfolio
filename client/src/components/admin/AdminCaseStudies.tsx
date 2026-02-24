"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Type, FileText, List, CheckCircle, Globe, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
    id: string;
    title: string;
    errorMessage: string;
    rootCause: string;
    steps: string[];
    solution: string;
    impact: string;
    techStack: string[];
    isPublished: boolean;
    created_at: string;
}

export default function AdminCaseStudies({ studies, onUpdate }: { studies: CaseStudy[], onUpdate: () => void }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        errorMessage: "",
        rootCause: "",
        steps: [] as string[],
        solution: "",
        impact: "",
        techStack: [] as string[],
        isPublished: false
    });

    const resetForm = () => {
        setFormData({
            title: "",
            errorMessage: "",
            rootCause: "",
            steps: [],
            solution: "",
            impact: "",
            techStack: [],
            isPublished: false
        });
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (study: CaseStudy) => {
        setFormData({
            title: study.title,
            errorMessage: study.errorMessage,
            rootCause: study.rootCause,
            steps: study.steps,
            solution: study.solution,
            impact: study.impact,
            techStack: study.techStack,
            isPublished: study.isPublished
        });
        setEditingId(study.id);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading("submit");
        try {
            const url = editingId ? `/api/admin/case-studies/${editingId}` : "/api/admin/case-studies";
            const method = editingId ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onUpdate();
                resetForm();
            }
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this case study?")) return;
        setLoading(id);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://kumailkmr-portfolio.onrender.com"}/api/admin/case-studies/${id}`, { method: "DELETE" });
            if (res.ok) onUpdate();
        } finally {
            setLoading(null);
        }
    };

    const togglePublish = async (id: string, current: boolean) => {
        setLoading(id);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://kumailkmr-portfolio.onrender.com"}/api/admin/case-studies/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublished: !current })
            });
            if (res.ok) onUpdate();
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 gap-6">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Engineering Case Studies</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage problem-solving breakdowns for your portfolio.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn-primary flex items-center gap-2 py-3 px-6 text-[10px] font-black uppercase tracking-widest w-full sm:w-auto justify-center"
                >
                    <Plus size={16} /> New Case Study
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studies.map((study) => (
                    <div key={study.id} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col gap-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block w-fit border ${study.isPublished ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                    {study.isPublished ? 'Published' : 'Draft'}
                                </span>
                                <h3 className="text-xl font-bold text-white">{study.title}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => togglePublish(study.id, study.isPublished)}
                                    className={`p-3 rounded-xl border transition-all ${study.isPublished ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}
                                    title={study.isPublished ? "Unpublish" : "Publish"}
                                >
                                    <Globe size={16} />
                                </button>
                                <button onClick={() => handleEdit(study)} className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                                    <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDelete(study.id)} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-6 italic">
                            &quot;{study.errorMessage}&quot;
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                            {study.techStack.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-white/5 rounded-md">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={resetForm}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-12 overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={resetForm}
                                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                                title="Cancel"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-10">
                                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mb-2">{editingId ? 'Updating' : 'Creating'} Asset</p>
                                <h2 className="text-3xl font-bold text-white tracking-tight">Case Study Details</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder="e.g. Solving High Database Latency"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Error Message</label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field"
                                            placeholder="Exact error encountered..."
                                            value={formData.errorMessage}
                                            onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Root Cause</label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field"
                                            placeholder="Why did it happen?"
                                            value={formData.rootCause}
                                            onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Steps Taken (Newline separated)</label>
                                    <textarea
                                        required
                                        className="input-field min-h-[100px] py-4"
                                        placeholder="Step 1: Analyzed logs...&#10;Step 2: Isolated module..."
                                        value={formData.steps.join("\n")}
                                        onChange={(e) => setFormData({ ...formData, steps: e.target.value.split("\n") })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Final Solution</label>
                                    <textarea
                                        required
                                        className="input-field py-4"
                                        placeholder="How was it fixed?"
                                        value={formData.solution}
                                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Business Impact</label>
                                    <textarea
                                        required
                                        className="input-field py-4"
                                        placeholder="What was the result?"
                                        value={formData.impact}
                                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder="React, Redis, AWS..."
                                        value={formData.techStack.join(", ")}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(",").map(t => t.trim()) })}
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <input
                                        type="checkbox"
                                        id="published"
                                        className="w-5 h-5 rounded border-white/10 bg-black text-blue-500"
                                        checked={formData.isPublished}
                                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    />
                                    <label htmlFor="published" className="text-sm font-bold text-gray-300">Publish immediately</label>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={!!loading}
                                        className="btn-primary flex-grow py-5 text-sm font-bold disabled:opacity-50"
                                    >
                                        {loading === "submit" ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : (editingId ? "Update Case Study" : "Create Case Study")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-8 py-5 rounded-3xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
