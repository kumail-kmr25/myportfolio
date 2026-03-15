import { useState } from "react";
import {
    Plus,
    Trash2,
    PenLine,
    Save,
    X,
    GripVertical,
    Brain,
    Code2,
    Cpu,
    Rocket,
    ShieldCheck,
    Layers,
    Globe,
    Database,
    Sparkles,
    Cloud,
    Search,
    ChevronRight,
    Square,
    CheckSquare,
    Zap,
    Map,
    Loader2
} from "lucide-react";
import { m, Reorder } from "framer-motion";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";

const IconMap: { [key: string]: any } = {
    "Brain": Brain,
    "Code2": Code2,
    "Cpu": Cpu,
    "Rocket": Rocket,
    "ShieldCheck": ShieldCheck,
    "Layers": Layers,
    "Globe": Globe,
    "Database": Database,
    "Sparkles": Sparkles,
    "Cloud": Cloud,
};

interface JourneyPhase {
    id: string;
    phase: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    ecoIcon: string;
    ecoStage: string;
    technologies: string[];
    order: number;
}

interface AdminJourneyProps {
    phases: JourneyPhase[];
    onAdd: (data: any) => void;
    onUpdate: (id: string, data: any) => void;
    onDelete: (id: string) => void;
}

export default function AdminJourney({ phases, onAdd, onUpdate, onDelete }: AdminJourneyProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | null>(null);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const [formData, setFormData] = useState<Partial<JourneyPhase>>({
        phase: "",
        title: "",
        description: "",
        icon: "Code2",
        ecoIcon: "🌱",
        ecoStage: "Seed",
        color: "from-blue-500/20 to-indigo-500/20",
        order: (phases?.length || 0) + 1,
        technologies: []
    });

    const filteredPhases = (Array.isArray(phases) ? phases : []).filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phase.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.order - b.order);

    const handleEdit = (phase: JourneyPhase) => {
        setFormData(phase);
        setSelectedPhase(phase);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setFormData({
            phase: "",
            title: "",
            description: "",
            icon: "Code2",
            color: "from-blue-500/20 to-indigo-500/20",
            order: (phases?.length || 0) + 1
        });
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
            setSelectedPhase(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Purge ${selectedIds.length} milestones permanently?`)) return;
        await Promise.all(selectedIds.map(id => onDelete(id)));
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
                        placeholder="Search evolution milestones..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={handleCreateNew}
                        className="btn-primary py-4 px-6 flex items-center justify-center gap-2 !from-blue-600 !to-indigo-600 shadow-xl shadow-blue-500/20"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Add Milestone</span>
                    </button>
                    
                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredPhases.length) clearSelection();
                            else setSelection(filteredPhases.map(p => p.id));
                        }}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                    >
                        {selectedIds.length === filteredPhases.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </div>

            {/* Bulk Actions Menu */}
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-2">
                        {selectedIds.length} Milestones Selected
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
                {filteredPhases.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                        <Map size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No roadmap milestones documented</p>
                    </div>
                ) : (
                    filteredPhases.map((phase) => {
                        const Icon = IconMap[phase.icon] || Code2;
                        return (
                            <div 
                                key={phase.id}
                                className={`group relative flex items-center gap-4 p-6 glass-effect rounded-[2rem] border transition-all hover:bg-white/[0.02] ${
                                    isSelected(phase.id) ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]" : "border-white/5"
                                }`}
                            >
                                {/* Multi-Select Hitbox */}
                                <div 
                                    onClick={() => toggleSelection(phase.id)}
                                    className="shrink-0 p-2 cursor-pointer hover:bg-white/10 rounded-xl transition-all"
                                >
                                    {isSelected(phase.id) ? (
                                        <CheckSquare size={22} className="text-blue-500" />
                                    ) : (
                                        <Square size={22} className="text-gray-600 group-hover:text-gray-400" />
                                    )}
                                </div>

                                {/* Main Info */}
                                <div 
                                    onClick={() => handleEdit(phase)}
                                    className="flex-grow flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 md:w-80">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-blue-400">
                                            <Icon size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-white font-bold text-sm truncate">{phase.title}</h3>
                                            <p className="text-[10px] text-gray-500 truncate">{phase.phase}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-1 items-center gap-12">
                                        <div className="min-w-[80px]">
                                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Timeline Pos</p>
                                            <div className="text-[10px] text-white font-bold">
                                                Order #{phase.order}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Narrative Summary</p>
                                            <p className="text-[10px] text-gray-400 truncate max-w-xs">{phase.description}</p>
                                        </div>
                                    </div>

                                    <div className="ml-auto flex items-center gap-4">
                                        <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Editor Drawer */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedPhase(null);
                }}
                title={formData.id ? "Edit Narrative" : "Deploy Milestone"}
                subtitle="Professional Evolution Roadmap Protocol"
                footer={
                    <div className="flex gap-4">
                        {formData.id && (
                            <button 
                                onClick={() => { if(confirm("Purge?")) onDelete(formData.id!); setIsEditing(false); }}
                                className="p-5 bg-red-500/10 text-red-500 rounded-3xl hover:bg-red-500/20 transition-all border border-red-500/10"
                            >
                                <Trash2 size={24} />
                            </button>
                        )}
                        <button 
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={isLoading}
                            className="flex-grow btn-primary py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 flex justify-center items-center gap-3 !from-blue-600 !to-indigo-600 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                            {formData.id ? "Sync Milestone" : "Deploy Insight Archive"}
                        </button>
                    </div>
                }
            >
                <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Eco Icon (Emoji)</label>
                            <input 
                                type="text"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={formData.ecoIcon}
                                onChange={e => setFormData({...formData, ecoIcon: e.target.value})}
                                placeholder="🌱"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Growth Stage</label>
                            <select 
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                value={formData.ecoStage}
                                onChange={e => setFormData({...formData, ecoStage: e.target.value})}
                            >
                                <option value="Seed">Seed</option>
                                <option value="Sprout">Sprout</option>
                                <option value="Sapling">Sapling</option>
                                <option value="Tree">Tree</option>
                                <option value="Fruit">Fruit</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Internal Phase Key</label>
                            <input 
                                type="text"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={formData.phase}
                                onChange={e => setFormData({...formData, phase: e.target.value})}
                                placeholder="Year 2 / Phase 1"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Public Milestone Title</label>
                            <input 
                                type="text"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                placeholder="Technological Singularity"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Detailed Narrative Description</label>
                        <textarea 
                            className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[160px] resize-none leading-relaxed"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            placeholder="Describe the technical evolution..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Icon Symbology</label>
                            <select 
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                value={formData.icon}
                                onChange={e => setFormData({...formData, icon: e.target.value})}
                            >
                                {Object.keys(IconMap).map(icon => (
                                    <option key={icon} value={icon} className="bg-[#0f0f0f]">{icon}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Temporal Sequence (Order)</label>
                            <input 
                                type="number"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                value={formData.order}
                                onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

