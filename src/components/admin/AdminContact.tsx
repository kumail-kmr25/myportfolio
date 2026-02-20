"use client";

import {
    Mail,
    Trash2,
    CheckCircle2,
    User,
    Briefcase,
    Calendar,
    ExternalLink
} from "lucide-react";

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
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Client Inquiries</h2>
                    <p className="text-xs text-gray-500">Manage leads and project requests</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Total: {messages.length}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`group relative glass-effect rounded-[2.5rem] p-8 border transition-all ${msg.replied ? 'border-white/5 bg-white/[0.02] opacity-70' : 'border-blue-500/20 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5'}`}>
                        {/* Status Label */}
                        <div className={`absolute top-8 right-32 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${msg.replied
                            ? 'bg-white/5 text-gray-500 border-white/10'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                            {msg.replied ? 'Replied' : 'New Inquiry'}
                        </div>

                        {/* Actions */}
                        <div className="absolute top-8 right-8 flex gap-3 z-10">
                            <button
                                onClick={() => onToggleReplied(msg.id, msg.replied)}
                                className={`p-3 rounded-xl transition-all shadow-xl cursor-pointer ${msg.replied
                                    ? "bg-white/10 text-white/40 hover:bg-white/20"
                                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20"
                                    }`}
                                title={msg.replied ? "Mark as New" : "Mark as Replied"}
                            >
                                <CheckCircle2 size={18} />
                            </button>
                            <button
                                onClick={() => onDelete(msg.id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-xl border border-red-500/20 cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Sender Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                                        {msg.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                                        <p className="text-gray-500 text-sm">{msg.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 px-2">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <User size={14} className="text-blue-500/50" />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-gray-600 w-24">Company:</span>
                                        {msg.company || "N/A"}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <Briefcase size={14} className="text-blue-500/50" />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-gray-600 w-24">Service:</span>
                                        {msg.serviceRequired}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <Calendar size={14} className="text-blue-500/50" />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-gray-600 w-24">Received:</span>
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="lg:col-span-2 space-y-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                        {msg.inquiryType}
                                    </div>
                                    {msg.budgetRange && (
                                        <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                                            {msg.budgetRange}
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                                    {msg.message}
                                </p>

                                <div className="pt-8 mt-4 border-t border-white/5 flex flex-wrap gap-4">
                                    <a
                                        href={`mailto:${msg.email}?subject=Re: Your inquiry regarding ${msg.serviceRequired}&body=Hi ${msg.name},%0A%0AThank you for reaching out through my portfolio!%0A%0A`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                                    >
                                        <ExternalLink size={14} />
                                        Send Professional Reply
                                    </a>
                                    {msg.timeline && (
                                        <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                            Timeline: <span className="text-gray-300">{msg.timeline}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <Mail size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-medium">No messages in your inbox yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
