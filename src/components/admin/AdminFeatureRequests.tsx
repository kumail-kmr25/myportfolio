"use client";

import { useState } from "react";
import { CheckSquare, Clock, Hammer, CheckCircle2, Mail, User, MessageCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
    const [loading, setLoading] = useState<string | null>(null);

    const updateStatus = async (id: string, status: string) => {
        setLoading(id);
        try {
            const res = await fetch(`/api/admin/feature-requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) onUpdate();
        } finally {
            setLoading(null);
        }
    };

    const statusColors: any = {
        pending: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
        building: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        completed: "text-green-500 bg-green-500/10 border-green-500/20"
    };

    const statusIcons: any = {
        pending: Clock,
        building: Hammer,
        completed: CheckCircle2
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                <h2 className="text-xl font-bold text-white">Community Feature Requests</h2>
                <p className="text-sm text-gray-500 mt-1">Track and manage suggestions from your visitors.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {requests.map((request) => {
                    const StatusIcon = statusIcons[request.status] || Clock;
                    return (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8"
                        >
                            <div className="flex-grow space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${statusColors[request.status]}`}>
                                        <StatusIcon size={12} />
                                        {request.status}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {request.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">&quot;{request.message}&quot;</h3>

                                <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    <div className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {request.name}</div>
                                    <div className="flex items-center gap-2"><Mail size={14} className="text-blue-500" /> {request.email}</div>
                                    <div className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> {new Date(request.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="flex gap-2 bg-black/40 p-2 rounded-2xl border border-white/5">
                                {["pending", "building", "completed"].map((status) => (
                                    <button
                                        key={status}
                                        disabled={loading === request.id}
                                        onClick={() => updateStatus(request.id, status)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${request.status === status ? statusColors[status] : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {loading === request.id && request.status !== status ? <Loader2 size={12} className="animate-spin" /> : status}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                {requests.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                        <MessageCircle className="mx-auto w-12 h-12 text-gray-600 mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No feature requests yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
