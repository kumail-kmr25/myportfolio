import {
    Plus,
    X,
    Trash2,
    PenLine,
    Loader2,
    Calendar,
    Clock,
    Hash,
    Search,
    ChevronRight,
    Square,
    CheckSquare,
    Zap,
    Eye,
    EyeOff,
    FileText,
    BookOpen,
    Terminal,
    Layout,
    Cpu,
    Database,
    Boxes,
    Shield,
    Activity,
    ArrowUpRight,
    MessageSquare,
    Filter,
    Globe,
    Layers
} from "lucide-react";
import React, { useState } from "react";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { m, AnimatePresence } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    published: boolean;
    created_at: string;
}

interface AdminBlogProps {
    posts: BlogPost[];
    onAdd: (data: any) => Promise<void>;
    onUpdate: (id: string, data: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function AdminBlog({ posts, onAdd, onUpdate, onDelete }: AdminBlogProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: "",
        excerpt: "",
        content: "",
        category: "Development",
        readTime: "5 min read",
        published: true
    });

    const filteredPosts = (Array.isArray(posts) ? posts : []).filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || 
                             (filter === "published" && p.published) || 
                             (filter === "draft" && !p.published);
        return matchesSearch && matchesFilter;
    });

    const handleEdit = (post: BlogPost) => {
        setFormData(post);
        setSelectedPost(post);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setFormData({
            title: "",
            excerpt: "",
            content: "",
            category: "Development",
            readTime: "5 min read",
            published: true
        });
        setSelectedPost(null);
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (formData.id) {
                await onUpdate(formData.id, formData);
            } else {
                await onAdd(formData);
            }
            setIsEditing(false);
            setSelectedPost(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkVisibility = async (published: boolean) => {
        await Promise.all(selectedIds.map(id => onUpdate(id, { published })));
        clearSelection();
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Purge ${selectedIds.length} articles permanently?`)) return;
        await Promise.all(selectedIds.map(id => onDelete(id)));
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="w-full lg:max-w-xl relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-purple-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="SEARCH_INSIGHT_ARCHIVES..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[11px] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-black uppercase tracking-[0.2em]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-grow lg:flex-grow-0 min-w-[200px]">
                        <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                        <select
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] text-white font-black uppercase tracking-widest outline-none focus:border-purple-500 appearance-none cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#050505]">ALL_INTEL</option>
                            <option value="published" className="bg-[#050505]">LIVE_UNITS</option>
                            <option value="draft" className="bg-[#050505]">STAGING_DRAFTS</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleCreateNew}
                        className="flex items-center gap-4 bg-purple-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                    >
                        <Plus size={18} />
                        NEW_ARCHIVE
                    </button>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredPosts.length) clearSelection();
                            else setSelection(filteredPosts.map(p => p.id));
                        }}
                        className="p-5 bg-white/[0.05] border border-white/10 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        {selectedIds.length === filteredPosts.length ? <CheckSquare size={20} className="text-purple-500" /> : <Square size={20} />}
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
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-purple-600/10 border border-purple-500/20 rounded-[2.5rem] relative group/bulk">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/bulk:opacity-20 transition-opacity">
                                <Boxes size={100} className="text-purple-500" />
                            </div>
                            
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-purple-500">
                                    <Activity size={24} className="animate-pulse" />
                                </div>
                                <div>
                                    <span className="text-lg font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                                        Batch_Target: {selectedIds.length} Nodes
                                    </span>
                                    <p className="text-[9px] text-purple-400 font-black uppercase tracking-[0.3em]">Mass deployment configuration active</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-purple-500/20 hidden sm:block" />

                            <div className="flex flex-wrap gap-3 relative z-10">
                                {[
                                    { label: "Public_Sync", action: 'visible', icon: Eye, color: "purple" },
                                    { label: "Draft_Revert", action: 'hidden', icon: EyeOff, color: "yellow" },
                                    { label: "Purge_Data", action: 'delete', icon: Trash2, color: "red" }
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => btn.action === 'delete' ? handleBulkDelete() : handleBulkVisibility(btn.action === 'visible')}
                                        className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                                            btn.color === 'red' 
                                            ? 'bg-red-600/10 border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white' 
                                            : btn.color === 'yellow'
                                            ? 'bg-yellow-600/10 border-yellow-500/20 text-yellow-500 hover:bg-yellow-600 hover:text-white'
                                            : 'bg-purple-600/10 border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white'
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

            {/* Insight Repository Grid */}
            <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
                    >
                        <BookOpen size={64} className="text-white/5 mx-auto mb-10" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Library_Offline</h3>
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">No matching insight archives found in current parity</p>
                    </m.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredPosts.map((post, i) => (
                            <m.div 
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group relative flex flex-col lg:flex-row lg:items-center gap-8 p-10 glass-effect rounded-[3rem] border transition-all duration-500 ${
                                    isSelected(post.id) 
                                    ? "bg-purple-600/[0.03] border-purple-500/40 shadow-2xl shadow-purple-500/10" 
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                                }`}
                            >
                                {/* Selection Hub */}
                                <div className="absolute top-10 left-10 lg:relative lg:top-0 lg:left-0">
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSelection(post.id);
                                        }}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all border ${
                                            isSelected(post.id)
                                            ? "bg-purple-600/20 border-purple-500/40 text-purple-500"
                                            : "bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-400 group-hover:border-white/20"
                                        }`}
                                    >
                                        {isSelected(post.id) ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </div>
                                </div>

                                {/* Profiling Unit */}
                                <div 
                                    onClick={() => handleEdit(post)}
                                    className="flex-grow flex flex-col lg:flex-row lg:items-center gap-10 cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 lg:w-96 shrink-0">
                                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border transition-all ${post.published ? 'bg-purple-500/5 text-purple-400 border-purple-500/20' : 'bg-white/5 text-gray-700 border-white/10'}`}>
                                            <FileText size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{post.title}</h3>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] truncate">{post.category} • {post.readTime}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-1 items-center gap-16">
                                        <div className="min-w-[140px] space-y-2">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Chronology_Mark</p>
                                            <div className="flex items-center gap-3">
                                                <Calendar size={14} className="text-purple-500" />
                                                <span className="text-[11px] text-white font-bold">{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-2">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Insight_Lead</p>
                                            <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 italic font-medium group-hover:text-white transition-colors">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 lg:ml-auto">
                                        <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            post.published 
                                            ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                            : 'bg-yellow-500/5 text-yellow-500 border-yellow-500/20 font-italic'
                                        }`}>
                                            {post.published ? 'Live_Sync' : 'Staging_Draft'}
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

            {/* Insight Archive Dossier */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedPost(null);
                }}
                title={formData.id ? "Archive_Update" : "New_Init_Sequence"}
                subtitle="High-fidelity technical documentation archive"
                footer={
                    <div className="flex gap-6 mt-12">
                        {formData.id && (
                            <m.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { if(confirm("Purge?")) onDelete(formData.id!); setIsEditing(false); }}
                                className="p-6 bg-red-600/10 text-red-500 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
                            >
                                <Trash2 size={24} />
                            </m.button>
                        )}
                        <m.button 
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={isLoading}
                            className="flex-grow flex items-center justify-center gap-4 bg-purple-600 py-6 rounded-[2rem] text-sm font-black text-white uppercase tracking-[0.3em] shadow-2xl shadow-purple-500/20 hover:bg-purple-500 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin text-white/50" size={20} /> : <Zap size={20} className="text-white" />}
                            {formData.id ? "Commit_Parity_Changes" : "Initialize_New_Archive"}
                        </m.button>
                    </div>
                }
            >
                <div className="space-y-12 pb-12">
                    {/* Identity Matrix */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Cpu className="text-purple-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Technical_Identity</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Article_Title", key: "title", icon: Terminal, placeholder: "QUANTUM_ENGINEERING..." },
                                { label: "Insight_Domain", key: "category", icon: Layers, placeholder: "AI_OPS..." },
                                { label: "Visual_Temporal", key: "readTime", icon: Clock, placeholder: "5 min read..." },
                            ].map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">{field.label}</label>
                                    <div className="relative group">
                                        <field.icon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-purple-500 transition-colors" size={16} />
                                        <input 
                                            type="text"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold placeholder:text-gray-800"
                                            value={(formData as any)[field.key] || ""}
                                            onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meta Stream */}
                    <div className="space-y-4">
                        <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">Insight_Lead_Excerpt</label>
                        <textarea 
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 min-h-[100px] italic font-medium leading-relaxed"
                            value={formData.excerpt || ""}
                            onChange={e => setFormData({...formData, excerpt: e.target.value})}
                        />
                    </div>

                    {/* Content Studio */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <MessageSquare className="text-purple-500" size={18} />
                                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Resolution_Deep_Dive</h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewMode(!previewMode)}
                                className={`px-6 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${previewMode ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20' : 'bg-white/[0.05] border-white/10 text-gray-500 hover:text-white'}`}
                            >
                                {previewMode ? "Source_Stream" : "Studio_Preview"}
                            </button>
                        </div>
                        
                        <div className="p-1 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                            {previewMode ? (
                                <div className="w-full bg-white/[0.01] rounded-[2.8rem] p-12 min-h-[500px]">
                                    <article className="prose prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-medium prose-strong:text-purple-400">
                                        <h1 className="text-4xl italic mb-4">{formData.title || "Untitled_Project"}</h1>
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-purple-500 mb-12">
                                            <span>{formData.category}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                                            <span>{formData.readTime}</span>
                                        </div>
                                        <div className="whitespace-pre-wrap">
                                            {formData.content || <span className="opacity-20 italic">Awaiting technical stream input...</span>}
                                        </div>
                                    </article>
                                </div>
                            ) : (
                                <textarea 
                                    className="w-full bg-transparent border-none rounded-[2.8rem] p-12 text-sm text-gray-300 focus:outline-none min-h-[500px] font-mono leading-relaxed placeholder:text-gray-800"
                                    placeholder="INITIATE_CONTENT_STREAM_MARKDOWN_ENABLED..."
                                    value={formData.content}
                                    onChange={e => setFormData({...formData, content: e.target.value})}
                                />
                            )}
                        </div>
                    </div>

                    {/* Deployment Matrix */}
                    <div className="p-8 bg-purple-600/5 rounded-[3rem] border border-purple-500/10">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, published: !formData.published})}
                            className={`w-full flex items-center justify-center gap-6 p-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${
                                formData.published 
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                            }`}
                        >
                            {formData.published ? <Globe size={20} /> : <EyeOff size={20} />}
                            {formData.published ? "Public_Deployment_Active" : "Staging_Draft_Mode"}
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

