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
    EyeOff,
    Pencil,
    Search,
    ChevronRight,
    Square,
    CheckSquare,
    Layers,
    Target,
    Zap,
    Globe,
    Cpu,
    Database,
    Boxes,
    Shield,
    Activity,
    ArrowUpRight,
    MessageSquare,
    Filter,
    Layout,
    Lock,
    Terminal
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { getApiUrl } from "@/lib/api";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { m, AnimatePresence } from "framer-motion";

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
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();
    
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

    const filteredProjects = (Array.isArray(projects) ? projects : []).filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (p.summary || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                             p.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || 
                             (filter === "featured" && p.isFeatured) || 
                             (filter === "hidden" && !p.isVisible);
        return matchesSearch && matchesFilter;
    });

    const handleEdit = (project: Project) => {
        setFormData(project);
        setSelectedProject(project);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
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
        setSelectedProject(null);
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const isUpdate = formData.id;
            const method = isUpdate ? "PATCH" : "POST";
            const url = isUpdate ? `/api/projects/${formData.id}` : "/api/projects";
            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                await onUpdate();
                setIsEditing(false);
                setSelectedProject(null);
            } else {
                alert(`Error: ${data.error || "Failed to save project"}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will permanently delete this case study unit.")) return;
        try {
            const response = await fetch(getApiUrl(`/api/projects/${id}`), { method: "DELETE" });
            const data = await response.json();
            if (response.ok && data.success) {
                await onUpdate();
                setIsEditing(false);
                setSelectedProject(null);
            }
        } catch (err) { console.error(err); }
    };

    const handleBulkVisibility = async (isVisible: boolean) => {
        await Promise.all(selectedIds.map(id => 
            fetch(getApiUrl(`/api/projects/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isVisible }),
            })
        ));
        await onUpdate();
        clearSelection();
    };

    return (
        <div className="space-y-12">
            {/* Deployment Matrix Controls */}
            <m.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="w-full lg:max-w-xl relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="SEARCH_ENGINEERING_REPOS..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[11px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-black uppercase tracking-[0.2em]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-grow lg:flex-grow-0 min-w-[200px]">
                        <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                        <select
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] text-white font-black uppercase tracking-widest outline-none focus:border-blue-500 appearance-none cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#050505]">ALL_EXPERTISE</option>
                            <option value="featured" className="bg-[#050505]">FEATURED_SHOWCASE</option>
                            <option value="hidden" className="bg-[#050505]">ARCHIVED_UNITS</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleCreateNew}
                        className="flex items-center gap-4 bg-blue-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={18} />
                        NEW_UNIT
                    </button>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredProjects.length) clearSelection();
                            else setSelection(filteredProjects.map(p => p.id));
                        }}
                        className="p-5 bg-white/[0.05] border border-white/10 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        {selectedIds.length === filteredProjects.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </m.div>

            {/* Bulk Deployment Console */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <m.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] relative group/bulk">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/bulk:opacity-20 transition-opacity">
                                <Boxes size={100} className="text-blue-500" />
                            </div>
                            
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500">
                                    <Activity size={24} className="animate-pulse" />
                                </div>
                                <div>
                                    <span className="text-lg font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                                        Batch_Target: {selectedIds.length} Nodes
                                    </span>
                                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em]">Mass deployment configuration active</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-blue-500/20 hidden sm:block" />

                            <div className="flex flex-wrap gap-3 relative z-10">
                                {[
                                    { label: "Public_Sync", action: 'visible', icon: Eye, color: "blue" },
                                    { label: "Archive_Set", action: 'hidden', icon: EyeOff, color: "red" }
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleBulkVisibility(btn.action === 'visible')}
                                        className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                                            btn.color === 'red' 
                                            ? 'bg-red-600/10 border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white' 
                                            : 'bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white'
                                        }`}
                                    >
                                        <btn.icon size={14} />
                                        {btn.label}
                                    </button>
                                ))}
                                <button
                                    onClick={clearSelection}
                                    className="px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                                >
                                    ABORT_SEQUENCE
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Engineering Repository Grid */}
            <div className="space-y-6">
                {filteredProjects.length === 0 ? (
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
                    >
                        <FolderPlus size={64} className="text-white/5 mx-auto mb-10" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Repository_Empty</h3>
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">No matching engineering archives found in current parity</p>
                    </m.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredProjects.map((project, i) => (
                            <m.div 
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group relative flex flex-col lg:flex-row lg:items-center gap-8 p-10 glass-effect rounded-[3rem] border transition-all duration-500 ${
                                    isSelected(project.id) 
                                    ? "bg-blue-600/[0.03] border-blue-500/40 shadow-2xl shadow-blue-500/10" 
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                                }`}
                            >
                                {/* Selection Hub */}
                                <div className="absolute top-10 left-10 lg:relative lg:top-0 lg:left-0">
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSelection(project.id);
                                        }}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all border ${
                                            isSelected(project.id)
                                            ? "bg-blue-600/20 border-blue-500/40 text-blue-500"
                                            : "bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-400 group-hover:border-white/20"
                                        }`}
                                    >
                                        {isSelected(project.id) ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </div>
                                </div>

                                {/* Profiling Unit */}
                                <div 
                                    onClick={() => handleEdit(project)}
                                    className="flex-grow flex flex-col lg:flex-row lg:items-center gap-10 cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 lg:w-96 shrink-0">
                                        <div className="relative group/avatar">
                                            <div className="absolute inset-0 bg-blue-500 rounded-[2rem] blur opacity-0 group-hover/avatar:opacity-20 transition-opacity" />
                                            <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden border border-white/10 group-hover/avatar:scale-110 transition-transform duration-500">
                                                {project.image ? (
                                                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-blue-500">
                                                        <Terminal size={32} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center ${project.isVisible ? 'text-blue-500' : 'text-red-500'}`}>
                                                {project.isVisible ? <Globe size={18} /> : <EyeOff size={18} />}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{project.title}</h3>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] truncate">{project.category || "General_Engineering"}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-1 items-center gap-16">
                                        <div className="min-w-[120px] space-y-3">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Telemetry</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Logic</span>
                                                    <span className="text-[9px] text-blue-500 font-black">{project.backendDepth}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <m.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.backendDepth}%` }}
                                                        className="h-full bg-blue-500" 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-2">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Deployment_Summary</p>
                                            <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 italic font-medium group-hover:text-white transition-colors">
                                                {project.summary || project.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 lg:ml-auto">
                                        {project.isFeatured && (
                                            <div className="px-5 py-2.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-3">
                                                <Star size={14} className="text-amber-500" fill="currentColor" />
                                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Showcase</span>
                                            </div>
                                        )}
                                        <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            project.isVisible 
                                            ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                            : 'bg-red-500/5 text-red-500 border-red-500/20'
                                        }`}>
                                            {project.isVisible ? 'Public_Sync' : 'Archived'}
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl text-gray-700 group-hover:text-white group-hover:bg-white/10 transition-all">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Engineering Unit Dossier */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedProject(null);
                }}
                title={formData.id ? "Repository_Update" : "New_Init_Sequence"}
                subtitle="High-fidelity engineering documentation archive"
                footer={
                    <div className="flex gap-6 mt-12">
                        {formData.id && (
                            <m.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(formData.id!)}
                                className="p-6 bg-red-600/10 text-red-500 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
                            >
                                <Trash2 size={24} />
                            </m.button>
                        )}
                        <m.button 
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={isLoading}
                            className="flex-grow flex items-center justify-center gap-4 bg-blue-600 py-6 rounded-[2rem] text-sm font-black text-white uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin text-white/50" size={20} /> : <Zap size={20} className="text-white" />}
                            {formData.id ? "Commit_Parity_Changes" : "Initialize_New_Repository"}
                        </m.button>
                    </div>
                }
            >
                <div className="space-y-12 pb-12">
                    {/* Identity Matrix */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Cpu className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Technical_Identity</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Project_Title", key: "title", icon: Terminal, placeholder: "QUANTUM_ENGINE..." },
                                { label: "Tech_Category", key: "category", icon: Layers, placeholder: "FINTECH_SAAS..." },
                                { label: "Public_Endpoint", key: "demo", icon: ExternalLink, placeholder: "https://..." },
                                { label: "Source_Control", key: "github", icon: Github, placeholder: "github.com/..." }
                            ].map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">{field.label}</label>
                                    <div className="relative group">
                                        <field.icon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={16} />
                                        <input 
                                            type="text"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold placeholder:text-gray-800"
                                            value={(formData as any)[field.key] || ""}
                                            onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Media Interface */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Layout className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Media_Interface</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">Hero_Media_Reference</label>
                            <div className="relative group">
                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={16} />
                                <input 
                                    type="text"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold"
                                    value={formData.image || ""}
                                    onChange={e => setFormData({...formData, image: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Narrative Stream */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Operational_Narratives</h4>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                            <div className="space-y-2">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Showcase_Summary</label>
                                <textarea 
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[100px] italic font-medium leading-relaxed"
                                    value={formData.summary || ""}
                                    onChange={e => setFormData({...formData, summary: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Engineering_Deep_Dive</label>
                                <textarea 
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[200px]"
                                    value={formData.engineering || ""}
                                    onChange={e => setFormData({...formData, engineering: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Performance Telemetry */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Activity className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Performance_Telemetry</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "UX_DEPTH", key: "uiDepth", icon: Layout },
                                { label: "CORE_LOGIC", key: "backendDepth", icon: Cpu },
                                { label: "SEC_PARITY", key: "securityDepth", icon: Shield },
                                { label: "SCALE_VEC", key: "scalabilityDepth", icon: Database }
                            ].map((metric) => (
                                <div key={metric.key} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-6 group/metric">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[9px] text-gray-700 font-black uppercase tracking-widest">{metric.label}</label>
                                        <metric.icon size={14} className="text-gray-800 group-hover/metric:text-blue-500 transition-colors" />
                                    </div>
                                    <div className="space-y-4">
                                        <input 
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="bg-transparent text-3xl font-black text-white italic outline-none w-full"
                                            value={formData[metric.key as keyof Project] as number}
                                            onChange={e => setFormData({...formData, [metric.key]: parseInt(e.target.value) || 0})}
                                        />
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <m.div 
                                                className="h-full bg-blue-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${formData[metric.key as keyof Project]}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deployment Toggles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-blue-600/5 rounded-[3rem] border border-blue-500/10">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}
                            className={`flex items-center justify-center gap-6 p-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${
                                formData.isFeatured 
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]" 
                                : "bg-white/[0.02] border-white/5 text-gray-700 hover:text-gray-500"
                            }`}
                        >
                            <Star size={20} fill={formData.isFeatured ? "currentColor" : "none"} />
                            Showcase_Visibility
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, isVisible: !formData.isVisible})}
                            className={`flex items-center justify-center gap-6 p-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${
                                formData.isVisible 
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                                : "bg-red-500/10 text-red-500 border-red-500/30"
                            }`}
                        >
                            {formData.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                            {formData.isVisible ? "Public_Deployment" : "Repository_Archived"}
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}


