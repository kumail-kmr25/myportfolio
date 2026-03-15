import { useState } from "react";
import { Plus, Trash2, PenLine, Zap, Loader2, ShieldCheck, FileText, ChevronRight, Hash } from "lucide-react";
import Drawer from "./Drawer";

export default function AdminADRs({ adrs, onAdd, onUpdate, onDelete }: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: "",
        status: "Proposed",
        context: "",
        decision: "",
        consequences: "",
        tags: []
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
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Architecture Logs (ADRs)</h2>
                <button 
                    onClick={() => { setFormData({ status: "Proposed" }); setIsEditing(true); }}
                    className="btn-primary py-4 px-6 flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">New Decision</span>
                </button>
            </div>

            <div className="space-y-4">
                {adrs?.map((item: any) => (
                    <div key={item.id} className="glass-effect p-8 rounded-[2rem] border border-white/5 flex items-center gap-6 group hover:bg-white/[0.02] transition-all">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                            <Hash size={20} />
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-4 mb-1">
                                <h3 className="text-white font-bold">{item.title}</h3>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                    item.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' : 
                                    item.status === 'Superceded' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setFormData(item); setIsEditing(true); }} className="p-3 text-gray-600 hover:text-white"><PenLine size={18} /></button>
                            <button onClick={() => onDelete(item.id)} className="p-3 text-gray-800 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <Drawer
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                title={formData.id ? "Sync Decision" : "Record Architectural Logic"}
                subtitle="Systemic Evolution Governance Protocol"
                footer={
                    <button 
                        onClick={(e) => handleSubmit(e as any)}
                        disabled={isLoading}
                        className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest flex justify-center items-center gap-3"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                        {formData.id ? "Commit Change" : "Initialize Pattern"}
                    </button>
                }
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Decision Title</label>
                            <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Current Status</label>
                            <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white appearance-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Proposed">Proposed</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Superceded">Superceded</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Heuristic Context</label>
                        <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-sm text-white min-h-[100px]" value={formData.context || ""} onChange={e => setFormData({...formData, context: e.target.value})} placeholder="What is the problem being solved?" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">The Decision</label>
                        <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-sm text-white min-h-[100px]" value={formData.decision || ""} onChange={e => setFormData({...formData, decision: e.target.value})} placeholder="The specific architectural path chosen..." />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Future Consequences</label>
                        <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-sm text-white min-h-[100px]" value={formData.consequences || ""} onChange={e => setFormData({...formData, consequences: e.target.value})} placeholder="What are the trade-offs?" />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
