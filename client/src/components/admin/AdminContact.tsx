import React, { useState } from "react";
import {
    Mail,
    Trash2,
    CheckCircle2,
    User,
    Briefcase,
    Calendar,
    ExternalLink,
    Search,
    Filter,
    ChevronRight,
    Square,
    CheckSquare,
    Settings,
    Clock,
    Layout
} from "lucide-react";
import { format } from "date-fns";
import Drawer from "./Drawer";
import { useSelection } from "@/context/SelectionContext";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    inquiryType: string;
    serviceRequired: string;
    budgetRange?: string | null;
    timeline?: string | null;
    message: string;
    replied: boolean;
    created_at: string;
}

interface AdminContactProps {
    messages: ContactMessage[];
    onToggleReplied: (id: string, current: boolean) => void;
    onDelete: (id: string) => void;
}

export default function AdminContact({ messages, onToggleReplied, onDelete }: AdminContactProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const { selectedIds, toggleSelection, clearSelection, isSelected, setSelection } = useSelection();

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = 
            msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.message.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filter === "all" || 
                             (filter === "new" && !msg.replied) || 
                             (filter === "replied" && msg.replied);
        
        return matchesSearch && matchesFilter;
    });

    const handleBulkDelete = () => {
        if (confirm(`Delete ${selectedIds.length} messages?`)) {
            selectedIds.forEach(id => onDelete(id));
            clearSelection();
        }
    };

    const handleBulkStatusUpdate = (replied: boolean) => {
        selectedIds.forEach(id => {
            const msg = messages.find(m => m.id === id);
            if (msg && msg.replied !== replied) {
                onToggleReplied(id, !replied);
            }
        });
        clearSelection();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="w-full md:max-w-md space-y-4">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search incoming transmission..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all" className="bg-[#0f0f0f]">All Inquiries</option>
                        <option value="new" className="bg-[#0f0f0f]">New Transmissions</option>
                        <option value="replied" className="bg-[#0f0f0f]">Handled / Replied</option>
                    </select>

                    <button 
                        onClick={() => {
                            if (selectedIds.length === filteredMessages.length) clearSelection();
                            else setSelection(filteredMessages.map(m => m.id));
                        }}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                        title="Select All"
                    >
                        {selectedIds.length === filteredMessages.length ? <CheckSquare size={20} className="text-blue-500" /> : <Square size={20} />}
                    </button>
                </div>
            </div>

            {/* Bulk Actions Menu */}
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-2">
                        {selectedIds.length} Selected Units
                    </span>
                    <div className="h-4 w-px bg-blue-500/20 mx-2" />
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleBulkStatusUpdate(true)}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                        >
                            Mark Handled
                        </button>
                        <button
                            onClick={() => handleBulkStatusUpdate(false)}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                        >
                            Mark Unhandled
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Purge Comms
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
                {filteredMessages.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3.5rem] bg-white/[0.01]">
                        <Mail size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No comms intelligence found</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div 
                            key={msg.id}
                            className={`group relative flex items-center gap-4 p-6 glass-effect rounded-[2rem] border transition-all hover:bg-white/[0.02] ${
                                isSelected(msg.id) ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]" : "border-white/5"
                            }`}
                        >
                             {/* Multi-Select Hitbox */}
                             <div 
                                onClick={() => toggleSelection(msg.id)}
                                className="shrink-0 p-2 cursor-pointer hover:bg-white/10 rounded-xl transition-all"
                            >
                                {isSelected(msg.id) ? (
                                    <CheckSquare size={22} className="text-blue-500" />
                                ) : (
                                    <Square size={22} className="text-gray-600 group-hover:text-gray-400" />
                                )}
                            </div>

                            {/* Main Info */}
                            <div 
                                onClick={() => setSelectedMessage(msg)}
                                className="flex-grow flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                            >
                                <div className="flex items-center gap-4 md:w-80">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-white font-bold text-sm truncate">{msg.name}</h3>
                                        <p className="text-[10px] text-gray-500 truncate">{msg.email}</p>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-1 items-center gap-12">
                                    <div className="min-w-[120px]">
                                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Inquiry Unit</p>
                                        <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black w-fit text-gray-400">
                                            {msg.inquiryType}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Preview</p>
                                        <p className="text-[10px] text-gray-400 truncate max-w-sm italic">"{msg.message}"</p>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${msg.replied ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_-5px_#3b82f6]'}`}>
                                        {msg.replied ? 'Handled' : 'Unread Unit'}
                                    </span>
                                    <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Details Drawer */}
            <Drawer
                isOpen={!!selectedMessage}
                onClose={() => setSelectedMessage(null)}
                title="Comms Intelligence"
                subtitle="Inbound Discovery Unit"
                footer={
                    <div className="flex gap-4">
                        <button 
                            onClick={() => {
                                if (confirm("Delete this transmission?")) {
                                    onDelete(selectedMessage!.id);
                                    setSelectedMessage(null);
                                }
                            }}
                            className="p-5 bg-red-500/10 text-red-500 rounded-3xl hover:bg-red-500/20 transition-all"
                        >
                            <Trash2 size={24} />
                        </button>
                        <a 
                            href={`mailto:${selectedMessage?.email}?subject=Project Discussion: ${selectedMessage?.serviceRequired}`}
                            className="flex-grow btn-primary py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 flex justify-center items-center gap-3"
                        >
                            <Mail size={18} />
                            Deploy Response to {selectedMessage?.name.split(' ')[0]}
                        </a>
                    </div>
                }
            >
                {selectedMessage && (
                    <div className="space-y-10">
                         {/* Meta Grid */}
                         <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Organization", val: selectedMessage.company || "Independent", icon: Settings, color: "text-blue-400" },
                                { label: "Target Service", val: selectedMessage.serviceRequired, icon: Briefcase, color: "text-purple-400" },
                                { label: "Budget Range", val: selectedMessage.budgetRange || "Not Specified", icon: IndianRupee, color: "text-emerald-400" },
                                { label: "Exp. Timeline", val: selectedMessage.timeline || "TBD", icon: Clock, color: "text-orange-400" },
                                { label: "Ingest Type", val: selectedMessage.inquiryType, icon: Filter, color: "text-pink-400" },
                                { label: "Reception At", val: format(new Date(selectedMessage.created_at), 'MMM dd, yyyy'), icon: Calendar, color: "text-cyan-400" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-4">
                                    <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center ${item.color}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{item.label}</p>
                                        <p className="text-[10px] text-white font-bold truncate">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Raw Message */}
                        <div className="space-y-4">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Raw Transmission Content</p>
                            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap relative z-10 font-medium italic">
                                    "{selectedMessage.message}"
                                </p>
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Mail size={120} />
                                </div>
                            </div>
                        </div>

                         {/* Workflow Status */}
                         <div className="space-y-4">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Operational Workflow</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => onToggleReplied(selectedMessage.id, true)}
                                    className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-lg ${
                                        !selectedMessage.replied
                                            ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20"
                                            : "bg-white/5 border-white/10 text-gray-500 hover:text-white shadow-none"
                                    }`}
                                >
                                    Mark for Response
                                </button>
                                <button
                                    onClick={() => onToggleReplied(selectedMessage.id, false)}
                                    className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                        selectedMessage.replied
                                            ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/20"
                                            : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                                    }`}
                                >
                                    Record Handled
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
}

// Helper to include IndianRupee which was used in Hire requests but might be needed here too
function IndianRupee({ size }: { size: number }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M6 3h12" />
            <path d="M6 8h12" />
            <path d="m6 13 8.5 8" />
            <path d="M6 13h3" />
            <path d="M9 13c6.667 0 6.667-10 0-10" />
        </svg>
    );
}
