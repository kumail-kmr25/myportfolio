"use client";

import { useState } from "react";
import {
    Briefcase,
    Plus,
    Trash2,
    CheckCircle2,
    XCircle,
    Settings,
    Calendar,
    Save,
    Clock
} from "lucide-react";
import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminCapacityManager() {
    const { data: projects, mutate: mutateProjects } = useSWR("/api/admin/active-projects", fetcher);
    const { data: config, mutate: mutateConfig } = useSWR("/api/admin/system-config", fetcher);

    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [newProject, setNewProject] = useState({
        clientName: "",
        projectTitle: "",
        status: "active",
        startDate: format(new Date(), "yyyy-MM-dd"),
        expectedEndDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
    });

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/active-projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject)
            });
            if (res.ok) {
                mutateProjects();
                setIsAdding(false);
                setNewProject({
                    clientName: "",
                    projectTitle: "",
                    status: "active",
                    startDate: format(new Date(), "yyyy-MM-dd"),
                    expectedEndDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        await fetch(`/api/admin/active-projects/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        mutateProjects();
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Remove this project from records?")) return;
        await fetch(`/api/admin/active-projects/${id}`, { method: "DELETE" });
        mutateProjects();
    };

    const handleUpdateConfig = async (updates: any) => {
        await fetch("/api/admin/system-config", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });
        mutateConfig();
    };

    return (
        <div className="space-y-8">
            {/* System Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-effect p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                <Settings className="text-blue-500 size-5 sm:size-6" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">Capacity Configuration</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">System Rules</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
                        <div className="space-y-4">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Max Simultaneous Projects</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    className="input-field !py-2 sm:!py-3 w-20 sm:w-24 text-center text-base sm:text-lg font-bold"
                                    value={config?.maxActiveProjects || 2}
                                    onChange={(e) => handleUpdateConfig({ maxActiveProjects: parseInt(e.target.value) })}
                                    min="1"
                                />
                                <p className="text-[11px] sm:text-sm text-gray-400">Determines when status switches to &apos;Limited&apos;.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Manual Override</label>
                            <div className="flex flex-wrap gap-2">
                                {["none", "available", "limited", "booked"].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => handleUpdateConfig({ manualOverride: mode === "none" ? null : mode })}
                                        className={`px-3 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-tighter border transition-all ${(config?.manualOverride === mode || (mode === "none" && !config?.manualOverride))
                                            ? "bg-white text-black border-white"
                                            : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {config?.manualOverride && (
                        <div className="space-y-2 pt-4 animate-in fade-in slide-in-from-top-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Override Message</label>
                            <input
                                className="input-field"
                                placeholder="e.g. Taking a short break until Monday"
                                value={config?.overrideMessage || ""}
                                onChange={(e) => handleUpdateConfig({ overrideMessage: e.target.value })}
                            />
                        </div>
                    )}
                </div>

                <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Live Status Preview</p>
                    <div className="text-4xl mb-4">
                        {config?.manualOverride === "booked" || (!config?.manualOverride && projects?.filter((p: any) => p.status === "active").length >= (config?.maxActiveProjects || 2)) ? "🔴" :
                            config?.manualOverride === "limited" || (!config?.manualOverride && projects?.filter((p: any) => p.status === "active").length > 0) ? "🟡" : "🟢"}
                    </div>
                    <h4 className="text-xl font-bold text-white capitalize">
                        {config?.manualOverride || (projects?.filter((p: any) => p.status === "active").length >= (config?.maxActiveProjects || 2) ? "Booked" : "Available")}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                        {projects?.filter((p: any) => p.status === "active").length} / {config?.maxActiveProjects || 2} active slots
                    </p>
                </div>
            </div>

            {/* Project List */}
            <div className="glass-effect rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">Active Projects</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage workload and timelines.</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn-primary py-3 px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <Plus size={16} /> New Project
                    </button>
                </div>

                <div className="p-0">
                    {projects?.length === 0 ? (
                        <div className="p-20 text-center text-gray-500 italic">No project history found.</div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {projects?.map((project: any) => (
                                <div key={project.id} className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex gap-6 items-start">
                                        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${project.status === "active" ? "bg-green-500/10 text-green-500" :
                                            project.status === "completed" ? "bg-blue-500/10 text-blue-500" :
                                                "bg-gray-500/10 text-gray-500"
                                            }`}>
                                            <Briefcase size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">{project.projectTitle}</h4>
                                            <p className="text-sm text-gray-500 truncate">{project.clientName}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Timeline</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar size={12} className="flex-shrink-0" />
                                                <span>{format(new Date(project.startDate), "MMM d")}</span>
                                                <span>→</span>
                                                <span className="text-white font-medium">{format(new Date(project.expectedEndDate), "MMM d, yyyy")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {project.status === "active" ? (
                                                <button
                                                    onClick={() => handleUpdateStatus(project.id, "completed")}
                                                    className="px-4 py-2 rounded-xl bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest border border-green-500/20 hover:bg-green-500 hover:text-white transition-all flex items-center gap-2"
                                                >
                                                    <CheckCircle2 size={12} /> Mark Done
                                                </button>
                                            ) : (
                                                <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${project.status === "completed" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            )}

                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="p-2 text-gray-600 hover:text-red-500 transition-colors ml-auto"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Project Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                    <div className="bg-[#080808] border border-white/10 rounded-[3rem] p-10 max-w-xl w-full shadow-2xl relative">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Register Active Project</h2>

                        <form onSubmit={handleAddProject} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Client Name</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={newProject.clientName}
                                        onChange={e => setNewProject({ ...newProject, clientName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Project Title</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={newProject.projectTitle}
                                        onChange={e => setNewProject({ ...newProject, projectTitle: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Start Date</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        required
                                        value={newProject.startDate}
                                        onChange={e => setNewProject({ ...newProject, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Exp. End Date</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        required
                                        value={newProject.expectedEndDate}
                                        onChange={e => setNewProject({ ...newProject, expectedEndDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="flex-1 px-8 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all uppercase text-[10px] tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-[2] btn-primary py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                                >
                                    {isSaving ? <Clock className="animate-spin" /> : <Save size={18} />}
                                    Commence Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
