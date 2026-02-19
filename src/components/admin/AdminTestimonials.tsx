"use client";

import {
    CheckCircle2,
    XCircle,
    Trash2,
    Star,
    Clock,
    Building2,
    User2
} from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    relationship_type: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
    approved: boolean;
    created_at: string;
}

interface AdminTestimonialsProps {
    testimonials: Testimonial[];
    onApprove: (id: string, approved: boolean) => void;
    onDelete: (id: string) => void;
}

export default function AdminTestimonials({ testimonials, onApprove, onDelete }: AdminTestimonialsProps) {
    const pending = testimonials.filter(t => !t.approved);
    const approved = testimonials.filter(t => t.approved);

    const renderTestimonial = (testimonial: Testimonial) => (
        <div key={testimonial.id} className={`card p-8 group relative flex flex-col border-white/5 transition-all ${testimonial.approved ? 'bg-green-500/5 hover:bg-green-500/[0.08]' : 'bg-white/5 hover:bg-white/[0.08]'}`}>
            {/* Status Badge */}
            <div className={`absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${testimonial.approved
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                {testimonial.approved ? 'Live on Site' : 'Pending Review'}
            </div>

            {/* Actions */}
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                <button
                    onClick={() => onApprove(testimonial.id, !testimonial.approved)}
                    className={`p-2.5 rounded-xl transition-all ${testimonial.approved
                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                            : "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                        }`}
                    title={testimonial.approved ? "Revoke" : "Approve"}
                >
                    {testimonial.approved ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                </button>
                <button
                    onClick={() => onDelete(testimonial.id)}
                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="mt-12 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
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
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{testimonial.intervention_type}</p>
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
        </div>
    );

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Pending Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                        <Clock size={20} className="text-yellow-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Pending Approval</h2>
                        <p className="text-xs text-gray-500">Endorsements waiting for your review</p>
                    </div>
                    {pending.length > 0 && (
                        <span className="ml-auto px-4 py-1.5 bg-yellow-500 text-black font-black text-[10px] rounded-full uppercase tracking-widest">
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
