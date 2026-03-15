import { useState } from "react";
import { Plus, Trash2, PenLine, Zap, Loader2, Layers, Code2, Monitor, Layout } from "lucide-react";
import Drawer from "./Drawer";

export default function AdminComponents({ showcase, onAdd, onUpdate, onDelete }: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        componentName: "",
        category: "UI",
        previewUrl: "",
        codeSnippet: "",
        technologies: []
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
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Showcase Library</h2>
                <button 
                    onClick={() => { setFormData({ category: "UI" }); setIsEditing(true); }}
                    className="btn-primary py-4 px-6 flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Component</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {showcase?.map((item: any) => (
                    <div key={item.id} className="glass-effect overflow-hidden rounded-[2.5rem] border border-white/5 group">
                        <div className="aspect-video bg-white/5 flex items-center justify-center border-b border-white/5">
                            <Monitor size={32} className="text-white/10" />
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[8px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{item.category}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setFormData(item); setIsEditing(true); }} className="text-gray-500 hover:text-white"><PenLine size={14} /></button>
                                    <button onClick={() => onDelete(item.id)} className="text-gray-800 hover:text-red-500"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-xs mb-6 truncate">{item.componentName}</p>
                            <div className="flex gap-2 flex-wrap">
                                {item.technologies?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="text-[8px] text-gray-400 border border-white/5 px-2 py-0.5 rounded-md uppercase">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Drawer
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                title={formData.id ? "Edit Component" : "Register Logic Component"}
                subtitle="Reusable Enterprise Pattern Protocol"
                footer={
                    <button 
                        onClick={(e) => handleSubmit(e as any)}
                        disabled={isLoading}
                        className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest flex justify-center items-center gap-3"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                        {formData.id ? "Sync Pattern" : "Deploy Blueprint"}
                    </button>
                }
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Display Title</label>
                            <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Technical Name</label>
                            <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.componentName || ""} onChange={e => setFormData({...formData, componentName: e.target.value})} placeholder="e.g. AnimatedGradientButton" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Blueprint Description</label>
                        <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-sm text-white resize-none" value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Logic Source (Snippet)</label>
                        <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 text-[10px] font-mono text-blue-200/50 min-h-[200px]" value={formData.codeSnippet || ""} onChange={e => setFormData({...formData, codeSnippet: e.target.value})} placeholder="Paste component code..." />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
