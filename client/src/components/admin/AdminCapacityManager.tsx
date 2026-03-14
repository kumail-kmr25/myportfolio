import { useState } from "react";
import {
    Briefcase,
    Plus,
    Trash2,
    CheckCircle2,
    Settings,
    Calendar,
    Save,
    Clock,
    X,
    Layout,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import useSWR from "swr";
import { format } from "date-fns";
import { getApiUrl } from "@/lib/api";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
};

export default function AdminCapacityManager() {
    const { data: projects, mutate: mutateProjects } = useSWR("/api/admin/active-projects", fetcher);
    const { data: config, mutate: mutateConfig } = useSWR("/api/admin/system-config", fetcher);
    const { selectedIds, toggleSelection, clearSelection } = useSelection();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
            const res = await fetch(getApiUrl("/api/admin/active-projects"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject)
            });
            if (res.ok) {
                mutateProjects();
                setIsDrawerOpen(false);
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
        await fetch(getApiUrl(`/api/admin/active-projects/${id}`), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        mutateProjects();
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Remove this project from records?")) return;
        await fetch(getApiUrl(`/api/admin/active-projects/${id}`), { method: "DELETE" });
        mutateProjects();
    };

    const handleUpdateConfig = async (updates: any) => {
        await fetch(getApiUrl("/api/admin/system-config"), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });
        mutateConfig();
    };

    const activeCount = Array.isArray(projects) ? projects.filter((p: any) => p.status === "active").length : 0;
    const maxCapacity = config?.maxActiveProjects || 2;
    const isOverCapacity = activeCount >= maxCapacity;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* System Intelligence Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 glass-effect p-12 rounded-[4rem] border border-white/5 bg-gradient-to-br from-blue-500/[0.03] to-indigo-500/[0.03] space-y-12 relative overflow-hidden group">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                    
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="p-5 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-400 shadow-2xl shadow-blue-500/10 group-hover:scale-110 transition-transform">
                            <Settings size={32} className="animate-spin-slow" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] mb-3 italic">
                               M-13 // CAPACITY_LOGIC_CORE
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Engineering_Ceiling</h2>
                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">Operational Constraints & Logic Rules</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                               Concurrent_Limit
                            </label>
                            <div className="flex items-center gap-8 p-3 bg-black/40 rounded-[2rem] border border-white/10 group/input focus-within:border-blue-500/40 transition-all">
                                <input
                                    type="number"
                                    className="bg-transparent border-none text-4xl font-black text-white w-24 text-center focus:ring-0 italic tracking-tighter"
                                    value={config?.maxActiveProjects || 2}
                                    onChange={(e) => handleUpdateConfig({ maxActiveProjects: parseInt(e.target.value) })}
                                    min="1"
                                />
                                <div className="h-12 w-px bg-white/10" />
                                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] italic leading-relaxed">
                                    Defines high-intensity threshold for automation.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                               Operational_Override
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {["none", "available", "limited", "booked"].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => handleUpdateConfig({ manualOverride: mode === "none" ? null : mode })}
                                        className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] border transition-all duration-500 italic ${
                                            (config?.manualOverride === mode || (mode === "none" && !config?.manualOverride))
                                                ? "bg-white text-black border-white shadow-2xl shadow-white/20 scale-105"
                                                : "bg-white/5 text-gray-700 border-white/5 hover:border-white/20 hover:text-white"
                                        }`}
                                    >
                                        {mode.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-white/5 relative z-10">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-4 italic">Global_Availability_Telemetry</label>
                        <div className="relative group/msg">
                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover/msg:opacity-100 transition-opacity" />
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-[2rem] px-8 py-6 text-sm text-white placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-black tracking-tighter italic relative z-10"
                                placeholder="SYNC_OVERRIDE_SIGNAL_MESSAGE..."
                                value={config?.overrideMessage || ""}
                                onChange={(e) => handleUpdateConfig({ overrideMessage: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="glass-effect p-12 rounded-[4.5rem] border border-white/5 bg-black/20 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-white/[0.02] transition-all duration-700 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
                    
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-800 mb-10 italic">Live_Availability_Vector</p>
                    
                    <div className="relative mb-10">
                        <div className={`absolute -inset-12 blur-[80px] opacity-20 animate-pulse transition-colors duration-1000 ${isOverCapacity ? 'bg-red-500' : activeCount > 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                        <div className="relative text-7xl group-hover:scale-110 transition-transform duration-700">
                            {config?.manualOverride === "booked" || (!config?.manualOverride && isOverCapacity) ? "🔒" : config?.manualOverride === "limited" || (!config?.manualOverride && activeCount > 0) ? "⚡" : "🟢"}
                        </div>
                    </div>

                    <h4 className="text-5xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-blue-500 transition-colors">
                        {(config?.manualOverride || (isOverCapacity ? "Booked" : "Available")).toUpperCase()}
                    </h4>
                    
                    <div className="mt-10 flex items-center gap-6 bg-white/5 p-3 px-10 rounded-full border border-white/10 shadow-xl">
                        <span className="text-2xl font-black text-white italic">{activeCount}</span>
                        <div className="h-6 w-px bg-white/10" />
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 italic">{maxCapacity} NODES</span>
                    </div>
                </div>
            </div>

            {/* Management Matrix */}
            <div className="glass-effect rounded-[3.5rem] border border-white/5 overflow-hidden bg-white/[0.01]">
                <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Active Matrix</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Workload & Pipeline Management</p>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="p-4 px-10 rounded-[1.5rem] bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 active:scale-95"
                    >
                        <Plus size={18} /> Register Engagement
                    </button>
                </div>

                <div className="p-0">
                    {!Array.isArray(projects) || projects.length === 0 ? (
                        <div className="p-24 text-center">
                            <Briefcase className="mx-auto text-gray-800 mb-6" size={48} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 italic">No active engagements detected in system logs.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/[0.03]">
                            {projects.map((project: any) => (
                                <div key={project.id} className="p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex gap-8 items-center">
                                        <div className={`w-16 h-16 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center border transition-colors ${project.status === "active" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                            project.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                "bg-gray-500/10 text-gray-500 border-gray-500/10"
                                            }`}>
                                            <Layout size={24} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{project.projectTitle}</h4>
                                                {project.status === 'active' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">{project.clientName}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-10">
                                        <div className="space-y-3">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 italic">Deployment Timeline</p>
                                            <div className="flex items-center gap-4 text-[11px] font-black text-gray-400 bg-white/[0.02] p-2 px-4 rounded-xl border border-white/5">
                                                <Calendar size={14} className="text-blue-500" />
                                                <span>{format(new Date(project.startDate), "MMM dd")}</span>
                                                <ArrowRight size={12} className="text-gray-700" />
                                                <span className="text-white">{format(new Date(project.expectedEndDate), "MMM dd, yyyy")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {project.status === "active" ? (
                                                <button
                                                    onClick={() => handleUpdateStatus(project.id, "completed")}
                                                    className="p-3 px-6 rounded-xl bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] border border-green-500/20 hover:bg-green-500 hover:text-white transition-all flex items-center gap-3"
                                                >
                                                    <CheckCircle2 size={14} /> Close Project
                                                </button>
                                            ) : (
                                                <div className={`p-3 px-6 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${project.status === "completed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-white/5 text-gray-500 border-white/5"
                                                    }`}>
                                                    {project.status} Archive
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="p-3 rounded-xl border border-white/5 text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="System Engagement Register"
                subtitle="Initialize a new active workload profile"
            >
                <form onSubmit={handleAddProject} className="space-y-8 p-4">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Engagement Identity</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                                placeholder="Client / Entity Name"
                                required
                                value={newProject.clientName}
                                onChange={e => setNewProject({ ...newProject, clientName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Operational Title</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                                placeholder="e.g. Infrastructure Modernization"
                                required
                                value={newProject.projectTitle}
                                onChange={e => setNewProject({ ...newProject, projectTitle: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Phase Start</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-xs appearance-none"
                                required
                                value={newProject.startDate}
                                onChange={e => setNewProject({ ...newProject, startDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Est. Handover</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-xs appearance-none"
                                required
                                value={newProject.expectedEndDate}
                                onChange={e => setNewProject({ ...newProject, expectedEndDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full p-6 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                        >
                            {isSaving ? <Clock className="animate-spin" /> : <Save size={20} />}
                            Initialize Protocol
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            className="w-full p-6 rounded-2xl bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            Abort Configuration
                        </button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
}

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);
