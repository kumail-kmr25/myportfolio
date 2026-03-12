"use client";

import {
    Plus,
    X,
    Trash2,
    FolderPlus,
    Loader2,
    Calendar,
    Code,
    ExternalLink,
    Github,
    Star,
    Eye,
    EyeOff
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    summary?: string;
    description: string;
    status: string;
    role?: string;
    tags: string[];
    image: string;
    demo?: string;
    github?: string;
    problem?: string;
    solution?: string;
    targetAudience?: string;
    valueProp?: string;
    architecture?: any;
    challenges?: string;
    engineering?: string;
    performance?: string;
    scalability?: string;
    security?: string;
    lessons?: string;
    uiDepth: number;
    backendDepth: number;
    securityDepth: number;
    scalabilityDepth: number;
    timeline?: any;
    gallery: string[];
    results?: string;
    metrics: string[];
    category?: string;
    isFeatured: boolean;
    isVisible: boolean;
    created_at: string;
    updated_at: string;
}

interface AdminProjectsProps {
    projects: Project[];
    onUpdate: () => Promise<void>;
}

export default function AdminProjects({ projects, onUpdate }: AdminProjectsProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        summary: "",
        description: "",
        status: "Completed",
        role: "Lead Developer",
        tags: [],
        image: "",
        demo: "",
        github: "",
        problem: "",
        solution: "",
        engineering: "",
        uiDepth: 80,
        backendDepth: 80,
        securityDepth: 80,
        scalabilityDepth: 80,
        timeline: [],
        gallery: [],
        metrics: [],
        category: "Full Stack",
        isFeatured: false,
        isVisible: true
    });

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData(project);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const method = editingProject ? "PATCH" : "POST";
            const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            if (res.ok) {
                await onUpdate();
                handleDiscard();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to save project"}\n${errorData.message || ""}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (res.ok) {
                await onUpdate();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to delete project"}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDiscard = () => {
        setIsAdding(false);
        setEditingProject(null);
        setFormData({
            title: "",
            summary: "",
            description: "",
            status: "Completed",
            role: "Lead Developer",
            tags: [],
            image: "",
            demo: "",
            github: "",
            problem: "",
            solution: "",
            engineering: "",
            uiDepth: 80,
            backendDepth: 80,
            securityDepth: 80,
            scalabilityDepth: 80,
            timeline: [],
            gallery: [],
            metrics: [],
            category: "Full Stack",
            isFeatured: false,
            isVisible: true
        });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Product Case Studies</h2>
                    <p className="text-xs text-gray-500">Manage high-impact engineering projects</p>
                </div>
                <button
                    onClick={isAdding ? handleDiscard : () => setIsAdding(true)}
                    className="btn-primary gap-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? "Cancel" : "New Case Study"}
                </button>
            </div>

            {isAdding && (
                <div className="glass-effect rounded-[2rem] p-6 sm:p-10 border border-blue-500/20 bg-blue-500/[0.02] animate-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Project Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="EduNova AI"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Category</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Full Stack / AI / DevOps"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Summary (1-line impact)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="AI powered learning platform for students."
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Hero Image URL</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Live Demo URL</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.demo}
                                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">GitHub URL</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Deep Dive Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">The Problem</label>
                                <textarea
                                    className="input-field min-h-[120px]"
                                    value={formData.problem}
                                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">The Solution</label>
                                <textarea
                                    className="input-field min-h-[120px]"
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Engineering Depth / Technical Highlights</label>
                            <textarea
                                className="input-field min-h-[120px]"
                                value={formData.engineering}
                                onChange={(e) => setFormData({ ...formData, engineering: e.target.value })}
                            />
                        </div>

                        {/* Metrics & Features */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {(['uiDepth', 'backendDepth', 'securityDepth', 'scalabilityDepth'] as const).map(key => (
                                <div key={key} className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">{key.replace('Depth', ' Depth')}</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        min="0"
                                        max="100"
                                        value={formData[key]}
                                        onChange={(e) => setFormData({ ...formData, [key]: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Visibility & Toggles */}
                        <div className="flex items-center gap-12 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                />
                                <div className={`w-10 h-6 rounded-full relative transition-colors ${formData.isFeatured ? 'bg-blue-600' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-5' : 'left-1'}`} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Featured Project</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.isVisible}
                                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                                />
                                <div className={`w-10 h-6 rounded-full relative transition-colors ${formData.isVisible ? 'bg-green-600' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isVisible ? 'left-5' : 'left-1'}`} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Publicly Visible</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : editingProject ? "Update Case Study" : "Create Case Study"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group glass-effect rounded-[2rem] p-6 sm:p-8 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-24 h-24 rounded-2xl bg-white/5 overflow-hidden relative shrink-0 border border-white/10">
                            {project.image ? (
                                <Image src={project.image} alt={project.title} fill className="object-cover" />
                            ) : (
                                <FolderPlus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10" size={32} />
                            )}
                        </div>

                        <div className="flex-grow space-y-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                {project.isFeatured && (
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-500/30 flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> Featured
                                    </span>
                                )}
                                <span className={`px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1 ${project.isVisible ? 'text-green-400' : 'text-red-400'}`}>
                                    {project.isVisible ? <Eye size={10} /> : <EyeOff size={10} />}
                                    {project.isVisible ? 'Visible' : 'Hidden'}
                                </span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{project.category}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-1">{project.summary || project.description}</p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-8">
                             <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/10"
                                >
                                    <Code size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && !isAdding && (
                    <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <FolderPlus size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-medium">No projects found. Time to showcase your best work!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

