"use client";

import React, { useState } from "react";
import {
    FileText,
    Upload,
    Eye,
    EyeOff,
    Trash2,
    ExternalLink,
    Loader2,
    Plus,
    X,
    CheckCircle2
} from "lucide-react";
import useSWR from "swr";
import { format } from "date-fns";

interface Resume {
    id: string;
    url: string;
    visible: boolean;
    createdAt: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminResume() {
    const { data: resumes, mutate } = useSWR<Resume[]>("/api/admin/resume", fetcher);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newResume, setNewResume] = useState({ url: "" });

    const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
        try {
            const res = await fetch("/api/admin/resume", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, visible: !currentVisible }),
            });
            if (res.ok) mutate();
        } catch (error) {
            console.error("Failed to toggle visibility", error);
        }
    };

    const handleAddResume = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Support for manual URL entry for better compatibility
            const res = await fetch("/api/admin/resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: newResume.url, visible: true }),
            });
            if (res.ok) {
                mutate();
                setIsAdding(false);
                setNewResume({ url: "" });
            }
        } catch (error) {
            console.error("Failed to add resume", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Resume Management</h2>
                    <p className="text-xs text-gray-500 font-medium tracking-wide">Manage your public CV and resource visibility</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary gap-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? "Discard" : "Add Resume"}
                </button>
            </div>

            {isAdding && (
                <div className="glass-effect rounded-[2rem] p-8 border border-blue-500/20 bg-blue-500/[0.02] animate-in zoom-in duration-300">
                    <form onSubmit={handleAddResume} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Resume URL (Cloud Storage or Public Path)</label>
                            <div className="relative">
                                <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    className="input-field pl-12"
                                    placeholder="https://storage.googleapis.com/..."
                                    value={newResume.url}
                                    onChange={(e) => setNewResume({ url: e.target.value })}
                                    required
                                />
                            </div>
                            <p className="text-[9px] text-gray-600 ml-4 italic">Tip: Use a stable Cloudinary or S3 URL for production resilience.</p>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Hydrate Resource"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {resumes?.map((resume) => (
                    <div key={resume.id} className={`glass-effect rounded-[1.5rem] p-6 border transition-all flex items-center justify-between group ${resume.visible ? 'border-blue-500/30' : 'border-white/5'}`}>
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${resume.visible ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-white/5 text-gray-600 border-white/5'}`}>
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white truncate max-w-[200px] md:max-w-md">{resume.url.split('/').pop()}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] text-gray-500 font-mono">
                                        {format(new Date(resume.createdAt), 'MMM dd, yyyy')}
                                    </span>
                                    {resume.visible && (
                                        <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">
                                            <CheckCircle2 size={8} />
                                            Active Public
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href={resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 text-gray-400 rounded-xl hover:text-white hover:bg-white/10 transition-all border border-white/5"
                            >
                                <ExternalLink size={18} />
                            </a>
                            <button
                                onClick={() => handleToggleVisibility(resume.id, resume.visible)}
                                className={`p-3 rounded-xl transition-all border ${resume.visible ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/5 text-gray-500 border-white/5 hover:text-white'}`}
                                title={resume.visible ? "Hide from Navbar" : "Show in Navbar"}
                            >
                                {resume.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>
                ))}

                {(!resumes || resumes.length === 0) && !isAdding && (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                        <FileText size={40} className="text-white/10 mx-auto mb-4" />
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No resumes found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
