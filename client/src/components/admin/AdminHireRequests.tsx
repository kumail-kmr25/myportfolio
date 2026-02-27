"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    XCircle,
    Mail,
    ExternalLink,
    Calendar,
    Briefcase,
    IndianRupee,
    Trash2
} from "lucide-react";
import { format } from "date-fns";

interface HireRequest {
    id: string;
    name: string;
    email: string;
    company: string | null;
    description: string;
    selectedService: string;
    budgetRange: string;
    timeline: string;
    projectType: string;
    status: string;
    source?: string;
    createdAt: string;
}

interface AdminHireRequestsProps {
    requests: HireRequest[];
    onUpdateStatus: (id: string, status: string) => void;
    onDelete?: (id: string) => void;
}

export default function AdminHireRequests({ requests, onUpdateStatus, onDelete }: AdminHireRequestsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<HireRequest | null>(null);

    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.selectedService.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || req.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "contacted": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "closed": return "bg-green-500/10 text-green-500 border-green-500/20";
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or service..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] pl-12 pr-4 py-3 md:py-4 text-sm min-h-[48px] text-white outline-none focus:border-blue-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
                    <select
                        className="w-full md:w-auto bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] px-4 py-3 md:py-4 min-h-[48px] text-sm text-white outline-none focus:border-blue-500 transition-colors"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all" className="bg-[#0f0f0f]">All Status</option>
                        <option value="new" className="bg-[#0f0f0f]">New</option>
                        <option value="contacted" className="bg-[#0f0f0f]">Contacted</option>
                        <option value="closed" className="bg-[#0f0f0f]">Closed</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Request List */}
                <div className="lg:col-span-2 space-y-4">
                    {filteredRequests.length === 0 ? (
                        <div className="p-20 text-center glass-effect rounded-[2rem] border border-white/5">
                            <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No hire requests found</p>
                        </div>
                    ) : (
                        {
                            Array.isArray(filteredRequests) && filteredRequests.map((req) => (
                                <div
                                    key={req.id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={`p-4 sm:p-6 glass-effect rounded-[1.5rem] sm:rounded-[2rem] border transition-all cursor-pointer group ${selectedRequest?.id === req.id
                                        ? "border-blue-500 bg-blue-500/5"
                                        : "border-white/5 hover:border-white/10"
                                        }`}
                                >
                                    <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-white font-bold text-sm sm:text-base truncate">{req.name}</h3>
                                                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{req.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 sm:px-4 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest border shrink-0 ${getStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                                <IndianRupee size={12} />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">{req.budgetRange}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                                <Clock size={12} />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">{req.timeline}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                {req.selectedService}
                                            </span>
                                            {req.source && (
                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tight border ${req.source === 'diagnostic' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                                    {req.source}
                                                </span>
                                            )}
                                            {req.status === 'new' && (
                                                <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tight bg-green-500/10 text-green-500 border border-green-500/20">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-600 font-mono">
                                            {format(new Date(req.createdAt), 'MMM dd, yyyy')}
                                        </span>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Detail View */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-6">
                        {selectedRequest ? (
                            <div className="glass-effect rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 p-6 sm:p-8 shadow-2xl">
                                <div className="flex justify-between items-start mb-6 sm:mb-8">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Details</h2>
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">Project Proposal</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                if (confirm("Delete this request?")) {
                                                    onDelete?.(selectedRequest.id);
                                                    setSelectedRequest(null);
                                                }
                                            }}
                                            className="p-3 sm:p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all min-w-[48px] min-h-[48px] flex justify-center items-center"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                                                <IndianRupee size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Budget</p>
                                                <p className="text-sm text-white font-bold">{selectedRequest.budgetRange}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Timeline</p>
                                                <p className="text-sm text-white font-bold">{selectedRequest.timeline}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Type</p>
                                                <p className="text-sm text-white font-bold">{selectedRequest.projectType}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4">Project Description</p>
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                {selectedRequest.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Update Status</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {["new", "contacted", "closed"].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => onUpdateStatus(selectedRequest.id, status)}
                                                    className={`py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs min-h-[48px] font-black uppercase tracking-widest border transition-all ${selectedRequest.status === status
                                                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                                                        : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={`mailto:${selectedRequest.email}?subject=Regarding Your Hire Request: ${selectedRequest.selectedService}`}
                                        className="btn-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 flex justify-center items-center gap-3 min-h-[48px]"
                                    >
                                        <Mail size={18} />
                                        Contact Client
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center glass-effect rounded-[2.5rem] border border-white/5 opacity-50">
                                <Filter className="w-10 h-10 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Select a request to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
