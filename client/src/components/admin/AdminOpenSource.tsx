import { useState } from "react";
import { Plus, Trash2, PenLine, Save, X, Globe, Link, Star, GitBranch, Loader2, Zap } from "lucide-react";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";

export default function AdminOpenSource({ contributions, onAdd, onUpdate, onDelete }: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        repoUrl: "",
        demoUrl: "",
        stars: 0,
        forks: 0,
        language: "",
        technologies: [],
        impact: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (formData.id) await onUpdate(formData.id, formData);
            else await onAdd(formData);
            setIsEditing(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Open Source Forge</h2>
                <button 
                    onClick={() => { setFormData({}); setIsEditing(true); }}
                    className="btn-primary py-4 px-6 flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">New Contribution</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contributions?.map((item: any) => (
                    <div key={item.id} className="glass-effect p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Globe size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setFormData(item); setIsEditing(true); }} className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all">
                                    <PenLine size={16} />
                                </button>
                                <button onClick={() => onDelete(item.id)} className="p-3 bg-red-500/5 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <span className="flex items-center gap-1.5"><Star size={12} className="text-yellow-500" /> {item.stars}</span>
                            <span className="flex items-center gap-1.5"><GitBranch size={12} className="text-blue-500" /> {item.forks}</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">{item.language}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Drawer
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                title={formData.id ? "Edit Contribution" : "Register Contribution"}
                subtitle="Open Source Impact Protocol"
                footer={
                    <button 
                        onClick={(e) => handleSubmit(e as any)}
                        disabled={isLoading}
                        className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest flex justify-center items-center gap-3"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                        {formData.id ? "Sync Data" : "Deploy Logic"}
                    </button>
                }
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Project Title</label>
                        <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Repo URL</label>
                        <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.repoUrl || ""} onChange={e => setFormData({...formData, repoUrl: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Language</label>
                            <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.language || ""} onChange={e => setFormData({...formData, language: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Stars</label>
                            <input type="number" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.stars || 0} onChange={e => setFormData({...formData, stars: parseInt(e.target.value)})} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
