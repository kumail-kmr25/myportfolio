import React, { useState } from "react";
import {
    CheckCircle2,
    XCircle,
    Trash2,
    Star,
    Clock,
    Building2,
    User2,
    BadgeCheck,
    Bookmark,
    Search,
    ChevronRight,
    Square,
    CheckSquare,
    Zap,
    Mail,
    Quote,
    Loader2,
    ShieldCheck,
    ArrowUpRight,
    MessageSquare,
    Filter,
    Layers,
    Activity,
    Lock,
    Fingerprint
} from "lucide-react";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { getApiUrl } from "@/lib/api";
import { m, AnimatePresence } from "framer-motion";

interface Testimonial {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    role?: string | null;
    relationshipType: string;
    interventionType: string;
    message: string;
    rating: number;
    aboutDeliveryLead: string;
    approved: boolean;
    featured: boolean;
    verified: boolean;
    createdAt: string;
}

interface AdminTestimonialsProps {
    testimonials: Testimonial[];
    onUpdate: () => Promise<void>;
}

export default function AdminTestimonials({ testimonials, onUpdate }: AdminTestimonialsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const [formData, setFormData] = useState<Partial<Testimonial>>({});

    const filteredTestimonials = (Array.isArray(testimonials) ? testimonials : []).filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             t.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (t.company || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || 
                             (filter === "pending" && !t.approved) || 
                             (filter === "featured" && t.featured) ||
                             (filter === "verified" && t.verified);
        return matchesSearch && matchesFilter;
    });

    const handleEdit = (testimonial: Testimonial) => {
        setFormData(testimonial);
        setSelectedTestimonial(testimonial);
        setIsEditing(true);
    };

    const handleSave = async (data: Partial<Testimonial>) => {
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/testimonials/${data.id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                await onUpdate();
                setIsEditing(false);
                setSelectedTestimonial(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This feedback unit will be permanently purged.")) return;
        try {
            const response = await fetch(getApiUrl(`/api/admin/testimonials/${id}`), { method: "DELETE" });
            if (response.ok) {
                await onUpdate();
                setIsEditing(false);
                setSelectedTestimonial(null);
            }
        } catch (err) { console.error(err); }
    };

    const handleBulkAction = async (action: 'approve' | 'feature' | 'verify' | 'delete') => {
        if (action === 'delete' && !confirm(`Purge ${selectedIds.length} testimonials?`)) return;
        
        await Promise.all(selectedIds.map(async (id) => {
            if (action === 'delete') {
                return fetch(getApiUrl(`/api/admin/testimonials/${id}`), { method: "DELETE" });
            }
            const t = testimonials.find(item => item.id === id);
            if (!t) return;
            
            let data = {};
            if (action === 'approve') data = { approved: !t.approved };
            if (action === 'feature') data = { featured: !t.featured };
            if (action === 'verify') data = { verified: !t.verified };

            return fetch(getApiUrl(`/api/admin/testimonials/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        }));

        await onUpdate();
        clearSelection();
    };

    return (
        <div className="space-y-12">
            {/* Control Matrix */}
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
                        placeholder="SEARCH_SENTIMENT_NODES..."
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
                            <option value="all" className="bg-[#050505]">ALL_FEEDBACK</option>
                            <option value="pending" className="bg-[#050505]">PENDING_AUDIT</option>
                            <option value="featured" className="bg-[#050505]">FEATURED_NODES</option>
                            <option value="verified" className="bg-[#050505]">VERIFIED_CLIENTS</option>
                        </select>
                    </div>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredTestimonials.length) clearSelection();
                            else setSelection(filteredTestimonials.map(t => t.id));
                        }}
                        className="p-5 bg-white/[0.05] border border-white/10 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        {selectedIds.length === filteredTestimonials.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </m.div>

            {/* Mass Operations Console */}
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
                                <Layers size={100} className="text-blue-500" />
                            </div>
                            
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500">
                                    <Activity size={24} className="animate-pulse" />
                                </div>
                                <div>
                                    <span className="text-lg font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                                        Batch_Target: {selectedIds.length} Nodes
                                    </span>
                                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em]">Mass modification sequence active</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-blue-500/20 hidden sm:block" />

                            <div className="flex flex-wrap gap-3 relative z-10">
                                {[
                                    { label: "Approve_All", action: 'approve', icon: ShieldCheck, color: "blue" },
                                    { label: "Feature_All", action: 'feature', icon: Bookmark, color: "blue" },
                                    { label: "Purge_Selected", action: 'delete', icon: Trash2, color: "red" }
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleBulkAction(btn.action as any)}
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

            {/* Endorsement Grid */}
            <div className="space-y-6">
                {filteredTestimonials.length === 0 ? (
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
                    >
                        <Quote size={64} className="text-white/5 mx-auto mb-10" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Sentiment_Aura_Void</h3>
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-3">No matching endorsement archives found in current parity</p>
                    </m.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredTestimonials.map((testimonial, i) => (
                            <m.div 
                                key={testimonial.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group relative flex flex-col lg:flex-row lg:items-center gap-8 p-10 glass-effect rounded-[3rem] border transition-all duration-500 ${
                                    isSelected(testimonial.id) 
                                    ? "bg-blue-600/[0.03] border-blue-500/40 shadow-2xl shadow-blue-500/10" 
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                                }`}
                            >
                                {/* Selection Hub */}
                                <div className="absolute top-10 left-10 lg:relative lg:top-0 lg:left-0">
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSelection(testimonial.id);
                                        }}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all border ${
                                            isSelected(testimonial.id)
                                            ? "bg-blue-600/20 border-blue-500/40 text-blue-500"
                                            : "bg-white/5 border-white/10 text-gray-700 group-hover:text-gray-400 group-hover:border-white/20"
                                        }`}
                                    >
                                        {isSelected(testimonial.id) ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </div>
                                </div>

                                {/* Profiling Unit */}
                                <div 
                                    onClick={() => handleEdit(testimonial)}
                                    className="flex-grow flex flex-col lg:flex-row lg:items-center gap-10 cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 lg:w-80 shrink-0">
                                        <div className="relative group/avatar">
                                            <div className="absolute inset-0 bg-blue-500 rounded-[2rem] blur opacity-0 group-hover/avatar:opacity-20 transition-opacity" />
                                            <div className="relative w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-600 border border-white/10 flex items-center justify-center text-3xl font-black text-white italic group-hover/avatar:scale-110 transition-transform">
                                                {testimonial.name[0]}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center ${testimonial.verified ? 'text-blue-500' : 'text-gray-800'}`}>
                                                <BadgeCheck size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{testimonial.name}</h3>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] truncate max-w-[200px]">{testimonial.company || "Independent_Identity"}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-6">
                                            <div className="flex gap-1">
                                                {[1,2,3,4,5].map(idx => (
                                                    <Star key={idx} size={14} className={idx <= testimonial.rating ? "text-blue-500 fill-blue-500" : "text-white/5"} />
                                                ))}
                                            </div>
                                            <div className="h-px w-12 bg-white/5" />
                                            <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">{testimonial.interventionType}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 italic font-medium group-hover:text-white transition-colors">
                                            &quot;{testimonial.message}&quot;
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 lg:ml-auto">
                                        {testimonial.featured && (
                                            <div className="px-4 py-2 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-3">
                                                <Bookmark size={14} className="text-amber-500" fill="currentColor" />
                                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Featured</span>
                                            </div>
                                        )}
                                        <div className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            testimonial.approved 
                                            ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                            : 'bg-red-500/5 text-red-500 border-red-500/20'
                                        }`}>
                                            {testimonial.approved ? 'Live_Sync' : 'Quarantined'}
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

            {/* Testimonial Intelligence Drawer */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedTestimonial(null);
                }}
                title="Sentiment_Dossier"
                subtitle="High-fidelity client endorsement forensic archive"
                footer={
                    <div className="flex gap-6 mt-12">
                        <m.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(formData.id!)}
                            className="p-6 bg-red-600/10 text-red-500 rounded-[2rem] hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
                        >
                            <Trash2 size={24} />
                        </m.button>
                        <m.button 
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSave(formData)}
                            disabled={isLoading}
                            className="flex-grow flex items-center justify-center gap-4 bg-blue-600 py-6 rounded-[2rem] text-sm font-black text-white uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin text-white/50" size={20} /> : <Zap size={20} className="text-white" />}
                            Commit_Parity_Changes
                        </m.button>
                    </div>
                }
            >
                <div className="space-y-12">
                    {/* Identity Matrix */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Fingerprint className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Identity_Parity</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Client_Name", key: "name", icon: User2 },
                                { label: "Security_Mail", key: "email", icon: Mail },
                                { label: "Corporate_Entity", key: "company", icon: Building2 },
                                { label: "Identity_Token", key: "role", icon: BadgeCheck }
                            ].map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-6">{field.label}</label>
                                    <div className="relative group">
                                        <field.icon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={16} />
                                        <input 
                                            type="text"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold"
                                            value={(formData as any)[field.key] || ""}
                                            onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Narrative Stream */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="text-blue-500" size={18} />
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Operational_Sentiment</h4>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                            <div className="space-y-2">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Public_Endorsement_Stream</label>
                                <textarea 
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[180px] italic font-medium leading-relaxed"
                                    value={formData.message || ""}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] ml-2">Internal_Telemetry (Non-Public)</label>
                                <textarea 
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[120px]"
                                    value={formData.aboutDeliveryLead || ""}
                                    onChange={e => setFormData({...formData, aboutDeliveryLead: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Authorization Matrix */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "SATISFACTION", val: formData.rating, color: "blue", type: "number" },
                            { label: "BROADCAST", val: formData.approved, color: "emerald", type: "toggle" },
                            { label: "VERIFIED", val: formData.verified, color: "blue", type: "toggle" },
                            { label: "FEATURED", val: formData.featured, color: "amber", type: "toggle" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-widest">{stat.label}</label>
                                {stat.type === 'number' ? (
                                    <div className="flex items-center justify-between">
                                        <input 
                                            type="number" min="1" max="5"
                                            className="bg-transparent text-3xl font-black text-white italic outline-none w-16"
                                            value={stat.val as number}
                                            onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                                        />
                                        <Star size={20} className="text-blue-500 fill-blue-500" />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                if (stat.label === "BROADCAST") setFormData({...formData, approved: !formData.approved});
                                                if (stat.label === "VERIFIED") setFormData({...formData, verified: !formData.verified});
                                                if (stat.label === "FEATURED") setFormData({...formData, featured: !formData.featured});
                                            }}
                                            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${stat.val ? `bg-${stat.color}-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]` : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-xl transition-all ${stat.val ? 'left-7' : 'left-1'}`} />
                                        </button>
                                        <span className={`text-[10px] font-black uppercase italic ${stat.val ? `text-${stat.color}-500` : 'text-gray-700'}`}>
                                            {stat.val ? 'ACTIVE' : 'OFF'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
