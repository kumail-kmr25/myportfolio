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
    CheckCircle2,
    Search,
    ChevronRight,
    Square,
    CheckSquare,
    Zap,
    Download
} from "lucide-react";
import useSWR from "swr";
import { format } from "date-fns";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { getApiUrl } from "@/lib/api";

interface Resume {
    id: string;
    url: string;
    visible: boolean;
    createdAt: string;
}

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    const json = await res.json();
    if (!res.ok || json.success === false) throw new Error(json.error || "Fetch failed");
    return json.success ? json.data : json;
};

export default function AdminResume() {
    const { data: resumes, mutate } = useSWR<Resume[]>("/api/admin/resume", fetcher);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();
    
    const [newResume, setNewResume] = useState({ url: "" });

    const filteredResumes = (Array.isArray(resumes) ? resumes : []).filter(r => 
        r.url.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
        try {
            const res = await fetch(getApiUrl("/api/admin/resume"), {
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
            const res = await fetch(getApiUrl("/api/admin/resume"), {
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

    const handleBulkDelete = async () => {
        if (!confirm(`Purge ${selectedIds.length} resources?`)) return;
        // Assuming there's a delete endpoint or we loop
        await Promise.all(selectedIds.map(id => fetch(getApiUrl("/api/admin/resume"), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })));
        mutate();
        clearSelection();
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="w-full md:max-w-md relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search resource archives..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="btn-primary py-4 px-6 flex items-center justify-center gap-2 !from-blue-600 !to-indigo-600 shadow-xl shadow-blue-500/20"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Hydrate Resource</span>
                    </button>
                    
                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredResumes.length) clearSelection();
                            else setSelection(filteredResumes.map(r => r.id));
                        }}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                    >
                        {selectedIds.length > 0 && selectedIds.length === filteredResumes.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </div>

            {/* Bulk Actions Menu */}
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-2">
                        {selectedIds.length} Resources Selected
                    </span>
                    <div className="h-4 w-px bg-blue-500/20 mx-2" />
                    <div className="flex gap-2">
                         <button
                            onClick={handleBulkDelete}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Purge
                        </button>
                        <button
                            onClick={clearSelection}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight text-gray-500 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredResumes.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                        <FileText size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No resume archives found</p>
                    </div>
                ) : (
                    filteredResumes.map((resume) => (
                        <div 
                            key={resume.id}
                            className={`group relative flex items-center gap-4 p-6 glass-effect rounded-[2rem] border transition-all hover:bg-white/[0.02] ${
                                isSelected(resume.id) ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]" : "border-white/5"
                            }`}
                        >
                            <div 
                                onClick={() => toggleSelection(resume.id)}
                                className="shrink-0 p-2 cursor-pointer hover:bg-white/10 rounded-xl transition-all"
                            >
                                {isSelected(resume.id) ? <CheckSquare size={22} className="text-blue-500" /> : <Square size={22} className="text-gray-600 group-hover:text-gray-400" />}
                            </div>

                            <div className="flex-grow flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex items-center gap-4 md:w-80">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${resume.visible ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-gray-600 border-white/10'}`}>
                                        <FileText size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-white font-bold text-sm truncate">{resume.url.split('/').pop()}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-gray-500 font-mono">{format(new Date(resume.createdAt), 'MMM dd, yyyy')}</span>
                                            {resume.visible && (
                                                <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">
                                                    <CheckCircle2 size={8} /> Sync Active
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-grow items-center gap-12">
                                    <div className="flex-grow">
                                        <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Source Endpoint</p>
                                        <p className="text-[10px] text-gray-400 truncate max-w-xs font-mono">{resume.url}</p>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center gap-3">
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
                                        className={`p-3 rounded-xl transition-all border ${resume.visible ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-500 border-white/5 hover:text-white hover:bg-white/10'}`}
                                        title={resume.visible ? "Hide from Navbar" : "Show in Navbar"}
                                    >
                                        {resume.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Addition Drawer */}
            <Drawer
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                title="Hydrate Resource"
                subtitle="Public Asset Deployment Protocol"
                footer={
                    <button 
                        onClick={(e) => handleAddResume(e as any)}
                        disabled={isLoading}
                        className="w-full btn-primary py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 flex justify-center items-center gap-3 !from-blue-600 !to-indigo-600 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                        Confirm Deployment
                    </button>
                }
            >
                <div className="space-y-10">
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Resource Endpoint (URL)</label>
                        <div className="relative group">
                            <Download className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="text"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
                                value={newResume.url}
                                onChange={e => setNewResume({ url: e.target.value })}
                                placeholder="https://storage.googleapis.com/..."
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 ml-4 italic px-2">
                            Deployment Tip: Ensure the resource is publicly accessible and hosted on a stable CDN for optimal performance.
                        </p>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-blue-500" size={20} />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Validation Protocol</h4>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Adding a new resource will automatically set it as &quot;Active&quot; in the public navbar registry unless manually toggled after hydration.
                        </p>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

