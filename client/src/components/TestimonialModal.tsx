"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, Camera, CheckCircle, X, Loader2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const RELATIONSHIP_TYPES = ["Colleague", "Client", "Collaborator", "Mentor", "Employer", "Freelance Client"];
const INTERVENTION_TYPES = ["Full-Stack Development", "Frontend Development", "Backend Development", "API Integration", "UI/UX Implementation", "Database Design", "Consulting", "Code Review", "Other"];

export default function TestimonialModal({ isOpen, onClose, onSuccess }: Props) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: "", email: "", role: "", company: "",
        relationship_type: "Client", intervention_type: "Full-Stack Development",
        message: "", rating: 5, about_delivery_lead: "", permission: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!isOpen) {
            setStep(1); setIsSuccess(false); setPhotoPreview(null); setPhotoFile(null);
            setForm({ name: "", email: "", role: "", company: "", relationship_type: "Client", intervention_type: "Full-Stack Development", message: "", rating: 5, about_delivery_lead: "", permission: false });
            setErrors({});
        }
    }, [isOpen]);

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { setErrors(p => ({ ...p, photo: "Max 2MB" })); return; }
        setPhotoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result as string);
        reader.readAsDataURL(file);
        setErrors(p => { const n = { ...p }; delete n.photo; return n; });
    };

    const validateStep1 = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
        if (!form.role.trim()) e.role = "Required";
        if (!form.message.trim() || form.message.length < 20) e.message = "At least 20 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!form.permission) { setErrors({ permission: "Please confirm permission" }); return; }
        setIsSubmitting(true);
        try {
            let photoUrl: string | undefined;

            // If photo, upload as base64 (simple approach for now)
            if (photoFile && photoPreview) {
                photoUrl = photoPreview; // Store base64 — in production use cloud storage
            }

            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, photoUrl }),
            });

            if (!res.ok) throw new Error("Submission failed");
            setIsSuccess(true);
            setTimeout(() => { onSuccess(); onClose(); }, 2500);
        } catch (err) {
            setErrors({ submit: "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const set = (key: string, val: any) => setForm(p => ({ ...p, [key]: val }));

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div>
                            <h2 className="text-lg font-black text-white">Share Your Experience</h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-0.5">
                                Step {step} of 2
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="h-0.5 bg-white/5">
                        <motion.div className="h-full bg-blue-500" animate={{ width: `${step * 50}%` }} transition={{ duration: 0.4 }} />
                    </div>

                    {isSuccess ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-16 px-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                                <CheckCircle size={32} className="text-green-400" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">Thank You!</h3>
                            <p className="text-gray-400 text-sm">Your testimonial is pending review and will appear once approved.</p>
                        </motion.div>
                    ) : (
                        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        {/* Photo upload */}
                                        <div className="flex items-center gap-4">
                                            <div
                                                onClick={() => fileRef.current?.click()}
                                                className="relative w-16 h-16 rounded-full border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all overflow-hidden flex-shrink-0"
                                            >
                                                {photoPreview ? (
                                                    <Image src={photoPreview} alt="Photo" fill className="object-cover" />
                                                ) : (
                                                    <Camera size={18} className="text-gray-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">Profile Photo</p>
                                                <p className="text-[10px] text-gray-500">Optional · Max 2MB</p>
                                                {errors.photo && <p className="text-[10px] text-red-400">{errors.photo}</p>}
                                            </div>
                                            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Full Name *</label>
                                                <input className="input-field text-sm min-h-[48px]" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" />
                                                {errors.name && <p className="text-[10px] text-red-400 mt-0.5">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Email *</label>
                                                <input className="input-field text-sm min-h-[48px]" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@company.com" />
                                                {errors.email && <p className="text-[10px] text-red-400 mt-0.5">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Role / Title</label>
                                                <input className="input-field text-sm min-h-[48px]" value={form.role} onChange={e => set("role", e.target.value)} placeholder="Senior Engineer" />
                                                {errors.role && <p className="text-[10px] text-red-400 mt-0.5">{errors.role}</p>}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Company</label>
                                                <input className="input-field text-sm min-h-[48px]" value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Inc." />
                                            </div>
                                        </div>

                                        {/* Star Rating */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Rating *</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <button key={n} onClick={() => set("rating", n)} type="button">
                                                        <Star size={24} className={`transition-all ${n <= form.rating ? "text-yellow-400 fill-yellow-400 scale-110" : "text-gray-600"}`} />
                                                    </button>
                                                ))}
                                                <span className="text-sm font-black text-gray-400 ml-2 self-center">{form.rating}/5</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Your Testimonial *</label>
                                            <textarea className="input-field text-sm min-h-[160px] resize-y" value={form.message} onChange={e => set("message", e.target.value)} placeholder="Share your honest experience working with me..." />
                                            {errors.message && <p className="text-[10px] text-red-400 mt-0.5">{errors.message}</p>}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Worked With Me As</label>
                                            <select className="input-field text-sm cursor-pointer min-h-[48px]" value={form.relationship_type} onChange={e => set("relationship_type", e.target.value)}>
                                                {RELATIONSHIP_TYPES.map(r => <option key={r} className="bg-[#0a0a0a] text-white py-2">{r}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Service Received</label>
                                            <select className="input-field text-sm cursor-pointer min-h-[48px]" value={form.intervention_type} onChange={e => set("intervention_type", e.target.value)}>
                                                {INTERVENTION_TYPES.map(t => <option key={t} className="bg-[#0a0a0a] text-white py-2">{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">How was communication & delivery?</label>
                                            <textarea className="input-field text-sm min-h-[100px] resize-y" value={form.about_delivery_lead} onChange={e => set("about_delivery_lead", e.target.value)} placeholder="Prompt replies, delivered on time, great communication..." />
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" className="mt-0.5 accent-blue-500" checked={form.permission} onChange={e => set("permission", e.target.checked)} />
                                                <span className="text-xs text-gray-400 leading-relaxed">
                                                    I confirm this is my genuine experience and give permission to display this testimonial publicly on this portfolio.
                                                </span>
                                            </label>
                                            {errors.permission && <p className="text-[10px] text-red-400 mt-1">{errors.permission}</p>}
                                        </div>
                                        {errors.submit && <p className="text-[10px] text-red-400 text-center">{errors.submit}</p>}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Footer */}
                    {!isSuccess && (
                        <div className="flex gap-3 p-6 border-t border-white/5">
                            {step === 2 && (
                                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Back
                                </button>
                            )}
                            {step === 1 ? (
                                <button onClick={() => { if (validateStep1()) setStep(2); }} className="flex-1 btn-primary py-3 text-xs font-black uppercase tracking-widest">
                                    Continue →
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 btn-primary py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                                    {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : null}
                                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
