import { useState } from "react";
import { 
    CheckSquare, 
    Clock, 
    Hammer, 
    CheckCircle2, 
    Mail, 
    User, 
    MessageCircle, 
    Loader2, 
    Search, 
    ChevronRight, 
    Square, 
    Trash2, 
    Zap,
    Tag,
    Filter
} from "lucide-react";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";
import { getApiUrl } from "@/lib/api";

interface FeatureRequest {
    id: string;
    name: string;
    email: string;
    message: string;
    category: string;
    status: string;
    created_at: string;
}

export default function AdminFeatureRequests({ requests, onUpdate }: { requests: FeatureRequest[], onUpdate: () => void }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<FeatureRequest | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const [formData, setFormData] = useState<Partial<FeatureRequest>>({});

    const filteredRequests = (Array.isArray(requests) ? requests : []).filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             r.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             r.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || r.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleEdit = (request: FeatureRequest) => {
        setFormData(request);
        setSelectedRequest(request);
        setIsEditing(true);
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/feature-requests/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (response.ok) onUpdate();
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this suggestion permanently?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl(`/api/admin/feature-requests/${id}`), { method: "DELETE" });
            if (response.ok) {
                onUpdate();
                setIsEditing(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkAction = async (action: 'pending' | 'building' | 'completed' | 'delete') => {
        if (action === 'delete' && !confirm(`Purge ${selectedIds.length} requests?`)) return;
        
        await Promise.all(selectedIds.map(async (id) => {
            if (action === 'delete') {
                return fetch(getApiUrl(`/api/admin/feature-requests/${id}`), { method: "DELETE" });
            }
            return fetch(getApiUrl(`/api/admin/feature-requests/${id}`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: action })
            });
        }));

        onUpdate();
        clearSelection();
    };

    const statusColors: any = {
        pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        building: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        completed: "text-green-500 bg-green-500/10 border-green-500/20"
    };

    const statusIcons: any = {
        pending: Clock,
        building: Hammer,
        completed: CheckCircle2
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="w-full md:max-w-md space-y-4">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search feature community nodes..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-sm text-white outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#0f0f0f]">All Suggestions</option>
                            <option value="pending" className="bg-[#0f0f0f]">Pending Review</option>
                            <option value="building" className="bg-[#0f0f0f]">In Construction</option>
                            <option value="completed" className="bg-[#0f0f0f]">Shipped / Live</option>
                        </select>
                    </div>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredRequests.length) clearSelection();
                            else setSelection(filteredRequests.map(r => r.id));
                        }}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                    >
                        {selectedIds.length === filteredRequests.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </div>

            {/* Bulk Actions Menu */}
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-2">
                        {selectedIds.length} Requests Selected
                    </span>
                    <div className="h-4 w-px bg-blue-500/20 mx-2" />
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleBulkAction('building')}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                        >
                            Mark: Construction
                        </button>
                        <button
                            onClick={() => handleBulkAction('completed')}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white transition-all"
                        >
                            Mark: Shipped
                        </button>
                        <button
                            onClick={() => handleBulkAction('delete')}
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
                {filteredRequests.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                        <MessageCircle size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No community suggestion archives found</p>
                    </div>
                ) : (
                    filteredRequests.map((request) => {
                        const StatusIcon = statusIcons[request.status] || Clock;
                        return (
                            <div 
                                key={request.id}
                                className={`group relative flex items-center gap-4 p-6 glass-effect rounded-[2rem] border transition-all hover:bg-white/[0.02] ${
                                    isSelected(request.id) ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]" : "border-white/5"
                                }`}
                            >
                                {/* Multi-Select Hitbox */}
                                <div 
                                    onClick={() => toggleSelection(request.id)}
                                    className="shrink-0 p-2 cursor-pointer hover:bg-white/10 rounded-xl transition-all"
                                >
                                    {isSelected(request.id) ? (
                                        <CheckSquare size={22} className="text-blue-500" />
                                    ) : (
                                        <Square size={22} className="text-gray-600 group-hover:text-gray-400" />
                                    )}
                                </div>

                                {/* Main Info */}
                                <div 
                                    onClick={() => handleEdit(request)}
                                    className="flex-grow flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 md:w-80">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white shrink-0 border border-white/10">
                                            <Tag size={20} className="text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-white font-bold text-sm truncate">&quot;{request.message}&quot;</h3>
                                            <p className="text-[10px] text-gray-500 truncate">{request.category}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-1 items-center gap-12">
                                        <div className="min-w-[120px]">
                                            <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Requester</p>
                                            <div className="flex items-center gap-2 text-[10px] text-white font-bold truncate">
                                                <User size={12} className="text-blue-500/50" />
                                                {request.name}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Timestamp</p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                <Clock size={12} />
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ml-auto flex items-center gap-4">
                                        <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border flex items-center gap-2 transition-all ${statusColors[request.status] || 'bg-white/5 border-white/10 text-gray-500'}`}>
                                            <StatusIcon size={12} />
                                            {request.status}
                                        </span>
                                        <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Details Drawer */}
            <Drawer
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedRequest(null);
                }}
                title="Suggestion Intelligence"
                subtitle="Community Feature Management & Roadmap Optimization"
                footer={
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleDelete(formData.id!)}
                            className="p-5 bg-red-500/10 text-red-500 rounded-3xl hover:bg-red-500/20 transition-all border border-red-500/10"
                        >
                            <Trash2 size={24} />
                        </button>
                        <div className="flex-grow grid grid-cols-3 gap-2">
                            {["pending", "building", "completed"].map((st) => (
                                <button
                                    key={st}
                                    onClick={() => handleUpdateStatus(formData.id!, st)}
                                    disabled={isLoading}
                                    className={`py-5 text-[10px] font-black uppercase tracking-widest rounded-3xl border transition-all ${
                                        formData.status === st ? statusColors[st] : 'bg-[#0a0a0a] border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                                    }`}
                                >
                                    {isLoading && formData.status === st ? <Loader2 size={16} className="animate-spin mx-auto" /> : st}
                                </button>
                            ))}
                        </div>
                    </div>
                }
            >
                <div className="space-y-10">
                    {/* Narrative Group */}
                    <div className="space-y-4">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Community Voice</p>
                        <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 min-h-[160px] flex flex-col justify-center">
                            <p className="text-xl sm:text-2xl font-black text-white leading-tight italic">
                                &quot;{formData.message}&quot;
                            </p>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                                    <User size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Originator</p>
                                    <p className="text-sm text-white font-bold">{formData.name}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                                    <Mail size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Contact Mesh</p>
                                    <p className="text-sm text-white font-bold truncate">{formData.email}</p>
                                </div>
                             </div>
                        </div>

                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                                    <Tag size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Classification</p>
                                    <p className="text-sm text-white font-bold">{formData.category}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Received On</p>
                                    <p className="text-sm text-white font-bold">{new Date(formData.created_at || '').toLocaleDateString()}</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Operational Status */}
                    <div className="space-y-4">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Roadmap Integration</p>
                        <div className="p-8 bg-blue-500/[0.02] border border-blue-500/10 rounded-[2.5rem] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center border shadow-xl ${statusColors[formData.status || 'pending']}`}>
                                    {formData.status === 'pending' && <Clock size={32} />}
                                    {formData.status === 'building' && <Hammer size={32} />}
                                    {formData.status === 'completed' && <CheckCircle2 size={32} />}
                                </div>
                                <div>
                                    <p className="text-lg font-black text-white uppercase tracking-tight">Status: {formData.status}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Current position in build pipeline</p>
                                </div>
                            </div>
                            <Zap className="text-blue-500/20" size={48} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

