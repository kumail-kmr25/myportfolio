"use client";

import {
    Plus,
    X,
    Trash2,
    ExternalLink,
    Github,
    Image as ImageIcon,
    Loader2,
    PenLine
} from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectFormData } from "@portfolio/shared";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    summary?: string;
    description: string;
    status: "Production" | "Beta" | "Concept";
    role?: string;
    tags: string[];
    image: string;
    demo: string;
    github: string;

    // Case Study
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

    // Depth
    uiDepth: number;
    backendDepth: number;
    securityDepth: number;
    scalabilityDepth: number;

    // Compatibility
    beforeImageUrl?: string | null;
    afterImageUrl?: string | null;
    improvementDetails?: string | null;
    metrics?: string[];
    decisionLogs?: string[];
}

interface AdminProjectsProps {
    projects: Project[];
    onAdd: (data: ProjectFormData) => Promise<void>;
    onUpdate: (id: string, data: ProjectFormData) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function AdminProjects({ projects, onAdd, onUpdate, onDelete }: AdminProjectsProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<ProjectFormData>>({
        tags: [],
        demo: "#",
        github: "#",
        status: "Production",
        uiDepth: 0,
        backendDepth: 0,
        securityDepth: 0,
        scalabilityDepth: 0,
        metrics: [],
        decisionLogs: [],
    });
    const [tagInput, setTagInput] = useState("");
    const [rawArchitecture, setRawArchitecture] = useState("");
    const [jsonError, setJsonError] = useState<string | null>(null);

    useEffect(() => {
        const editId = searchParams?.get("edit");
        if (editId && projects.length > 0) {
            const projectToEdit = projects.find(p => p.id === editId);
            if (projectToEdit && !editingProject) {
                handleEdit(projectToEdit);

                // Optional: Clean up URL after loading edit state so it doesn't persist
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete("edit");
                router.replace(`/admin?${newParams.toString()}`);
            }
        }
    }, [searchParams, projects, editingProject, router]);

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            summary: project.summary || "",
            description: project.description,
            status: project.status,
            role: project.role || "",
            image: project.image,
            tags: project.tags,
            demo: project.demo,
            github: project.github,

            problem: project.problem || "",
            solution: project.solution || "",
            targetAudience: project.targetAudience || "",
            valueProp: project.valueProp || "",
            architecture: project.architecture || null,
            challenges: project.challenges || "",
            engineering: project.engineering || "",
            performance: project.performance || "",
            scalability: project.scalability || "",
            security: project.security || "",
            lessons: project.lessons || "",

            uiDepth: project.uiDepth || 0,
            backendDepth: project.backendDepth || 0,
            securityDepth: project.securityDepth || 0,
            scalabilityDepth: project.scalabilityDepth || 0,

            beforeImageUrl: project.beforeImageUrl || "",
            afterImageUrl: project.afterImageUrl || "",
            improvementDetails: project.improvementDetails || "",
            metrics: project.metrics || [],
            decisionLogs: project.decisionLogs || [],
        });
        setRawArchitecture(project.architecture ? JSON.stringify(project.architecture, null, 2) : "");
        setJsonError(null);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingProject) {
                await onUpdate(editingProject.id, formData as ProjectFormData);
            } else {
                await onAdd(formData as ProjectFormData);
            }
            setFormData({
                tags: [],
                demo: "#",
                github: "#",
                status: "Production",
                uiDepth: 0,
                backendDepth: 0,
                securityDepth: 0,
                scalabilityDepth: 0,
                metrics: [],
                decisionLogs: []
            });
            setRawArchitecture("");
            setJsonError(null);
            setIsAdding(false);
            setEditingProject(null);
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
            tags: [],
            demo: "#",
            github: "#",
            status: "Production",
            uiDepth: 0,
            backendDepth: 0,
            securityDepth: 0,
            scalabilityDepth: 0,
            metrics: [],
            decisionLogs: []
        });
        setRawArchitecture("");
        setJsonError(null);
    };

    const addTag = () => {
        if (tagInput.trim()) {
            setFormData({
                ...formData,
                tags: [...(formData.tags || []), tagInput.trim()],
            });
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...(formData.tags || [])];
        newTags.splice(index, 1);
        setFormData({ ...formData, tags: newTags });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">Project Showcase</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Manage your dynamic engineering portfolio</p>
                </div>
                <button
                    onClick={isAdding ? handleDiscard : () => setIsAdding(true)}
                    className="btn-primary flex items-center gap-2 py-3 px-6 text-[10px] font-black uppercase tracking-widest w-full sm:w-auto justify-center"
                >
                    {isAdding ? <X size={16} /> : <Plus size={16} />}
                    {isAdding ? "Cancel" : "Add Project"}
                </button>
            </div>

            {isAdding && (
                <div className="glass-effect rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-blue-500/20 bg-blue-500/[0.02] animate-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Project Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. AI SaaS Platform"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Status</label>
                                <select
                                    className="input-field"
                                    value={formData.status || "Production"}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                >
                                    <option value="Production">Production</option>
                                    <option value="Beta">Beta</option>
                                    <option value="Concept">Concept</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Featured Image URL</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="input-field pl-12"
                                        placeholder="https://..."
                                        value={formData.image || ""}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        required
                                    />
                                    <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Role</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Lead Architect / Full Stack"
                                    value={formData.role || ""}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">One-Line Summary</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Powerful product summary..."
                                    value={formData.summary || ""}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Description</label>
                            <textarea
                                className="input-field min-h-[120px] resize-none"
                                placeholder="Explain the project impact and technology..."
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 ml-4">Product Deep Dive</h4>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Problem</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="What problem does this solve?"
                                        value={formData.problem || ""}
                                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Solution</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="How was it solved?"
                                        value={formData.solution || ""}
                                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Target Audience</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Who is this for?"
                                        value={formData.targetAudience || ""}
                                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Value Prop</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Key benefit..."
                                        value={formData.valueProp || ""}
                                        onChange={(e) => setFormData({ ...formData, valueProp: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-4">Engineering & Systems</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Architecture (JSON)</label>
                                        {jsonError && <span className="text-[9px] text-red-500 font-bold uppercase">{jsonError}</span>}
                                    </div>
                                    <textarea
                                        className={`input-field min-h-[160px] font-mono text-[10px] ${jsonError ? 'border-red-500/50 bg-red-500/5' : ''}`}
                                        placeholder='{ "nodes": [...], "edges": [...] }'
                                        value={rawArchitecture}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setRawArchitecture(val);
                                            try {
                                                if (val.trim()) {
                                                    const parsed = JSON.parse(val);
                                                    setFormData({ ...formData, architecture: parsed });
                                                    setJsonError(null);
                                                } else {
                                                    setFormData({ ...formData, architecture: null });
                                                    setJsonError(null);
                                                }
                                            } catch (err) {
                                                setJsonError("Invalid JSON");
                                            }
                                        }}
                                    />
                                    <div className="text-[9px] text-gray-600 px-4 leading-relaxed">
                                        Must include `nodes` (id, label, sub, icon, color, x, y) and `edges` (from, to, label).
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Crucial Challenges</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Internal/System obstacles..."
                                        value={formData.challenges || ""}
                                        onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Engineering Approach</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Architecture decisions..."
                                        value={formData.engineering || ""}
                                        onChange={(e) => setFormData({ ...formData, engineering: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 ml-4">Operational Depth</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">UI Depth %</label>
                                        <input type="number" className="input-field" value={formData.uiDepth || 0} onChange={(e) => setFormData({ ...formData, uiDepth: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Backend %</label>
                                        <input type="number" className="input-field" value={formData.backendDepth || 0} onChange={(e) => setFormData({ ...formData, backendDepth: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Security %</label>
                                        <input type="number" className="input-field" value={formData.securityDepth || 0} onChange={(e) => setFormData({ ...formData, securityDepth: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Scalability %</label>
                                        <input type="number" className="input-field" value={formData.scalabilityDepth || 0} onChange={(e) => setFormData({ ...formData, scalabilityDepth: parseInt(e.target.value) })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Optimizations</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Performance tweaks..."
                                        value={formData.performance || ""}
                                        onChange={(e) => setFormData({ ...formData, performance: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Scalability Readiness</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Load handling..."
                                        value={formData.scalability || ""}
                                        onChange={(e) => setFormData({ ...formData, scalability: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Security Layer</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Data protection..."
                                        value={formData.security || ""}
                                        onChange={(e) => setFormData({ ...formData, security: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Core Insights / Lessons</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="What did you learn?"
                                        value={formData.lessons || ""}
                                        onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 ml-4">Legacy & Metrics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Before Image</label>
                                        <input type="text" className="input-field" value={formData.beforeImageUrl || ""} onChange={(e) => setFormData({ ...formData, beforeImageUrl: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">After Image</label>
                                        <input type="text" className="input-field" value={formData.afterImageUrl || ""} onChange={(e) => setFormData({ ...formData, afterImageUrl: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Improvement Details</label>
                                    <textarea
                                        className="input-field min-h-[80px] text-sm"
                                        placeholder="Describe the optimization process..."
                                        value={formData.improvementDetails || ""}
                                        onChange={(e) => setFormData({ ...formData, improvementDetails: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Metrics (comma separated)</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="90% Performance, 50% Less Memory..."
                                        value={formData.metrics?.join(", ") || ""}
                                        onChange={(e) => setFormData({ ...formData, metrics: e.target.value.split(",").map(m => m.trim()).filter(Boolean) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-4">Engineering Decisions (one per line)</label>
                                    <textarea
                                        className="input-field min-h-[100px] text-sm"
                                        placeholder="e.g. Optimized DB queries..."
                                        value={formData.decisionLogs?.join("\n") || ""}
                                        onChange={(e) => setFormData({ ...formData, decisionLogs: e.target.value.split("\n").filter(Boolean) })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4 block">Technology Stack</label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {formData.tags?.map((tag, i) => (
                                    <span key={i} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(i)} className="text-blue-500 hover:text-white transition-colors">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Add tech (e.g. Next.js, OpenAI)"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-6 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-bold text-xs uppercase tracking-widest"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                            ) : editingProject ? (
                                "Update Project"
                            ) : (
                                "Publish Project"
                            )}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.isArray(projects) && projects.map((project) => (
                    <div key={project.id} className="group relative glass-effect rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                        <div className="h-56 relative overflow-hidden">
                            <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80" />

                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-3 sm:p-3 bg-[#0a0a0a]/80 sm:bg-blue-500/20 text-white sm:text-blue-500 rounded-xl sm:rounded-2xl sm:hover:bg-blue-500 sm:hover:text-white transition-all backdrop-blur-xl border border-white/10 sm:border-blue-500/20 sm:opacity-0 group-hover:opacity-100 sm:scale-90 group-hover:scale-100 flex items-center justify-center min-w-[44px] min-h-[44px]"
                                    aria-label="Edit project"
                                >
                                    <PenLine size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(project.id)}
                                    className="p-3 sm:p-3 bg-[#0a0a0a]/80 sm:bg-red-500/20 text-red-500 sm:text-red-500 rounded-xl sm:rounded-2xl sm:hover:bg-red-500 sm:hover:text-white transition-all backdrop-blur-xl border border-white/10 sm:border-red-500/20 sm:opacity-0 group-hover:opacity-100 sm:scale-90 group-hover:scale-100 flex items-center justify-center min-w-[44px] min-h-[44px]"
                                    aria-label="Delete project"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-4 flex-grow relative -mt-10 sm:-mt-12">
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {Array.isArray(project.tags) && project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 text-gray-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-6 mt-auto border-t border-white/5 flex gap-4">
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                                    <ExternalLink size={12} />
                                    Live Demo
                                </a>
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                    <Github size={12} />
                                    Source
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
