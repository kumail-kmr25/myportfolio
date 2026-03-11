"use client";

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
    Bookmark
} from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    role?: string | null;
    relationship_type: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
    approved: boolean;
    featured: boolean;
    verified: boolean;
    created_at: string;
}

interface AdminTestimonialsProps {
    testimonials: Testimonial[];
    onApprove: (id: string, approved: boolean, data?: any) => void;
    onDelete: (id: string) => void;
    onVerify?: (id: string, verified: boolean) => void;
    onFeature?: (id: string, featured: boolean) => void;
}

export default function AdminTestimonials({ testimonials, onApprove, onDelete, onVerify, onFeature }: AdminTestimonialsProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Testimonial>>({});

    const handleEditStart = (t: Testimonial) => {
        setEditingId(t.id);
        setEditForm(t);
    };

    const handleEditSave = () => {
        if (editingId && onApprove) {
            onApprove(editingId, editForm.approved ?? false, editForm);
            setEditingId(null);
        }
    };

    const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
    const pending = safeTestimonials.filter(t => !t.approved);
    const approved = safeTestimonials.filter(t => t.approved);

    const renderTestimonial = (testimonial: Testimonial) => (
        <div key={testimonial.id} className={`card p-6 sm:p-8 group relative flex flex-col border-white/5 transition-all ${testimonial.approved ? 'bg-green-500/5 hover:bg-green-500/[0.08]' : 'bg-white/5 hover:bg-white/[0.08]'}`}>
            {/* Status Badge */}
            <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${testimonial.approved
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                {testimonial.approved ? 'Live' : 'Pending'}
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col sm:flex-row gap-2 sm:opacity-0 group-hover:opacity-100 transition-all sm:scale-95 group-hover:scale-100 z-10">
                <button
                    onClick={() => handleEditStart(testimonial)}
                    className="p-3 sm:p-2.5 bg-[#0a0a0a]/80 sm:bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg sm:shadow-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="Edit Testimonial"
                >
                    <Star size={18} className="sm:size-[18px]" />
                </button>
                <button
                    onClick={() => onApprove(testimonial.id, !testimonial.approved)}
                    className={`p-3 sm:p-2.5 rounded-xl transition-all shadow-lg sm:shadow-none min-w-[44px] min-h-[44px] flex items-center justify-center ${testimonial.approved
                        ? "bg-[#0a0a0a]/80 sm:bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                        : "bg-[#0a0a0a]/80 sm:bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                        }`}
                    title={testimonial.approved ? "Revoke" : "Approve"}
                >
                    {testimonial.approved ? <XCircle size={18} className="sm:size-[18px]" /> : <CheckCircle2 size={18} className="sm:size-[18px]" />}
                </button>
                {onVerify && (
                    <button
                        onClick={() => onVerify(testimonial.id, !testimonial.verified)}
                        className={`p-3 sm:p-2.5 rounded-xl transition-all shadow-lg sm:shadow-none min-w-[44px] min-h-[44px] flex items-center justify-center ${testimonial.verified ? "bg-[#0a0a0a]/80 sm:bg-blue-500/20 text-blue-400" : "bg-[#0a0a0a]/80 sm:bg-white/5 text-gray-400 sm:text-gray-500 hover:bg-blue-500/20 hover:text-blue-400"}`}
                        title={testimonial.verified ? "Remove Verified" : "Mark Verified Client"}
                    >
                        <BadgeCheck size={18} className="sm:size-[18px]" />
                    </button>
                )}
                {onFeature && (
                    <button
                        onClick={() => onFeature(testimonial.id, !testimonial.featured)}
                        className={`p-3 sm:p-2.5 rounded-xl transition-all shadow-lg sm:shadow-none min-w-[44px] min-h-[44px] flex items-center justify-center ${testimonial.featured ? "bg-[#0a0a0a]/80 sm:bg-amber-500/20 text-amber-400" : "bg-[#0a0a0a]/80 sm:bg-white/5 text-gray-400 sm:text-gray-500 hover:bg-amber-500/20 hover:text-amber-400"}`}
                        title={testimonial.featured ? "Unfeature" : "Feature this testimonial"}
                    >
                        <Bookmark size={18} className="sm:size-[18px]" />
                    </button>
                )}
                <button
                    onClick={() => onDelete(testimonial.id)}
                    className="p-3 sm:p-2.5 bg-[#0a0a0a]/80 sm:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg sm:shadow-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                    <Trash2 size={18} className="sm:size-[18px]" />
                </button>
            </div>

            <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                size={14}
                                className={s <= testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                    </span>
                </div>

                <p className="text-gray-300 leading-relaxed italic text-sm">
                    &quot;{testimonial.message}&quot;
                </p>

                <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white font-bold text-xl border border-white/10">
                            {testimonial.name[0]}
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                                {testimonial.role ? `${testimonial.role} @ ` : ""}{testimonial.intervention_type}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <Building2 size={12} className="text-white/20" />
                            {testimonial.company || "N/A"}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <User2 size={12} className="text-white/20" />
                            {testimonial.relationship_type.split(' ')[0]}
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Delivery Feedback</p>
                        <p className="text-xs text-gray-400 line-clamp-2">{testimonial.about_delivery_lead}</p>
                    </div>
                </div>
            </div>

            {/* Edit Modal Overlay */}
            {editingId === testimonial.id && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 space-y-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Edit Testimonial</h3>
                            <button onClick={() => setEditingId(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <XCircle size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Name</label>
                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-blue-500" value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Message</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-blue-500 min-h-[100px] resize-none" value={editForm.message || ""} onChange={e => setEditForm({ ...editForm, message: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Role</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-blue-500" value={editForm.role || ""} onChange={e => setEditForm({ ...editForm, role: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Company</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-blue-500" value={editForm.company || ""} onChange={e => setEditForm({ ...editForm, company: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Delivery Feedback</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-blue-500 min-h-[80px] resize-none" value={editForm.about_delivery_lead || ""} onChange={e => setEditForm({ ...editForm, about_delivery_lead: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleEditSave} className="flex-1 bg-blue-600 text-white py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all font-bold">Save Changes</button>
                            <button onClick={() => setEditingId(null)} className="flex-1 bg-white/5 text-white py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Pending Section */}
            <section className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                            <Clock size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-white">Pending Approval</h2>
                            <p className="text-[10px] sm:text-xs text-gray-500">Endorsements waiting for review</p>
                        </div>
                    </div>
                    {pending.length > 0 && (
                        <span className="shrink-0 px-4 py-1.5 bg-yellow-500 text-black font-black text-[10px] rounded-full uppercase tracking-widest w-full sm:w-auto text-center">
                            {pending.length} Action Required
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pending.map(renderTestimonial)}
                    {pending.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                            <p className="text-gray-500 font-medium">All caught up! No pending testimonials.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Live Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                        <CheckCircle2 size={20} className="text-green-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Live Feedback</h2>
                        <p className="text-xs text-gray-500">Testimonials currently visible on your portfolio</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {approved.map(renderTestimonial)}
                    {approved.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                            <p className="text-gray-500 font-medium">No live testimonials yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
