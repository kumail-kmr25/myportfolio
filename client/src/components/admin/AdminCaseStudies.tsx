import { useState, useMemo } from "react";
import { 
    Plus, 
    Trash2, 
    Edit3, 
    Globe, 
    Loader2, 
    Search, 
    Filter, 
    Layout, 
    Code2, 
    Zap, 
    CheckCircle2, 
    Layers, 
    Target,
    BookOpen
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { getApiUrl } from "@/lib/api";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";

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
    const { selectedIds, toggleSelection, clearSelection } = useSelection();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'draft'>('all');

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
        setIsDrawerOpen(false);
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
        setIsDrawerOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading("submit");
        try {
            const url = editingId ? `/api/admin/case-studies/${editingId}` : "/api/admin/case-studies";
            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(getApiUrl(url), {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                onUpdate();
                resetForm();
            }
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm Case Study Deletion?")) return;
        setLoading(id);
        try {
            const response = await fetch(getApiUrl(`/api/admin/case-studies/${id}`), { method: "DELETE" });
            const data = await response.json();
            if (response.ok && data.success) onUpdate();
        } finally {
            setLoading(null);
        }
    };

    const togglePublish = async (id: string, current: boolean) => {
        setLoading(id);
        try {
            const response = await fetch(getApiUrl(`/api/admin/case-studies/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublished: !current })
            });
            const data = await response.json();
            if (response.ok && data.success) onUpdate();
        } finally {
            setLoading(null);
        }
    };

    const filteredStudies = useMemo(() => {
        return studies.filter(study => {
            const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               study.errorMessage.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'all' || 
                                (activeFilter === 'published' && study.isPublished) || 
                                (activeFilter === 'draft' && !study.isPublished);
            return matchesSearch && matchesFilter;
        });
    }, [studies, searchQuery, activeFilter]);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Asset Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 bg-white/[0.02] p-12 rounded-[4.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] shadow-sm italic">
                       <BookOpen size={16} className="animate-pulse" /> M-14 // ENGINEERING_ARCHIVES
                    </div>
                    <div>
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic leading-none mb-3">Knowledge_Repo</h2>
                        <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] max-w-md italic leading-relaxed">Problem-Solving Case Studies & Technical Debriefs for scalable architectures.</p>
                    </div>
                </div>
                
                <button
                    onClick={() => { resetForm(); setIsDrawerOpen(true); }}
                    className="group/btn relative z-10 py-6 px-12 rounded-[2rem] bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/40 active:scale-95 flex items-center gap-5 overflow-hidden italic"
                >
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                    <Plus size={22} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                    COMMIT_NEW_PROTOCOL
                </button>
            </div>

            {/* Filter Matrix */}
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-grow relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search archives by title or error trace..."
                        className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] pl-16 pr-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 p-1.5 bg-black/40 border border-white/5 rounded-[1.5rem]">
                    {(['all', 'published', 'draft'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === filter ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredStudies.map((study) => (
                    <m.div
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={study.id}
                        onClick={() => toggleSelection(study.id)}
                        className={`group relative p-10 rounded-[3rem] border transition-all cursor-pointer ${selectedIds.includes(study.id)
                            ? 'bg-blue-600/[0.05] border-blue-500/30'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                        }`}
                    >
                        {/* Selection Checkbox Overlay */}
                        <div className={`absolute top-8 left-8 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedIds.includes(study.id) ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/20' : 'border-white/10 opacity-0 group-hover:opacity-100'}`}>
                            {selectedIds.includes(study.id) && <CheckCircle2 size={14} className="text-white" />}
                        </div>

                        <div className="flex justify-between items-start mb-8 pl-8">
                            <div className="space-y-3">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${study.isPublished ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                    {study.isPublished ? 'Live Archive' : 'Draft Protocol'}
                                </span>
                                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase">{study.title}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePublish(study.id, study.isPublished); }}
                                    className={`p-3 rounded-xl border transition-all ${study.isPublished ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}
                                >
                                    <Globe size={18} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleEdit(study); }} className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-white hover:text-black hover:border-white transition-all">
                                    <Edit3 size={18} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(study.id); }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-8 pl-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-3 italic">Trace Error Message</p>
                            <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 font-mono text-xs text-red-400/80 italic leading-relaxed">
                                &ldquo;{study.errorMessage}&rdquo;
                            </div>
                        </div>

                        <div className="pl-8 flex flex-wrap gap-2">
                            {study.techStack.map(tech => (
                                <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </m.div>
                ))}
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={resetForm}
                title={editingId ? "Edit Architecture Debrief" : "Archive New Engineering Feat"}
                subtitle="Document technical challenges and resolution metrics"
            >
                <form onSubmit={handleSubmit} className="space-y-8 p-4">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Case Title</label>
                        <input
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                            placeholder="e.g. Scaling WebSocket Buffer Latency"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Trace Error</label>
                            <input
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                                placeholder="Exact log or error string"
                                value={formData.errorMessage}
                                onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Root Cause</label>
                            <input
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                                placeholder="Why did the system fail?"
                                value={formData.rootCause}
                                onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Diagnostic Steps (Newline separated)</label>
                        <textarea
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm min-h-[120px] leading-relaxed"
                            placeholder="1. Analyzed memory dumps...&#10;2. Instrumented socket layer..."
                            value={formData.steps.join("\n")}
                            onChange={(e) => setFormData({ ...formData, steps: e.target.value.split("\n") })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Final Resolution</label>
                            <textarea
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm min-h-[100px]"
                                placeholder="How was the fix implemented?"
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Strategic Impact</label>
                            <textarea
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm min-h-[100px]"
                                placeholder="Performance gain or business value..."
                                value={formData.impact}
                                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Tech Stack Matrix (Comma separated)</label>
                        <input
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                            placeholder="React, Redis, AWS Lambda, Node.js"
                            value={formData.techStack.join(", ")}
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(",").map(t => t.trim()) })}
                        />
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-white/[0.02] rounded-[1.5rem] border border-white/5">
                        <input
                            type="checkbox"
                            id="published"
                            className="w-6 h-6 rounded-lg border-white/10 bg-black text-blue-500 focus:ring-blue-500/30"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        />
                        <label htmlFor="published" className="text-xs font-black uppercase tracking-widest text-gray-400 cursor-pointer">Synchronize with Public Portfolio</label>
                    </div>

                    <div className="pt-8 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={!!loading}
                            className="w-full p-6 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                        >
                            {loading === "submit" ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId ? "Update Archive Node" : "Commit to Archives")}
                        </button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
}

