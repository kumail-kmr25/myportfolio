"use client";


import Image from "next/image";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Static dummy testimonials for showcase
const dummyTestimonials = [
    {
        id: "1",
        name: "Alice Johnson",
        company: "Acme Corp",
        role: "CTO",
        relationship_type: "client",
        intervention_type: "consulting",
        message: "Kumail delivered exceptional full‑stack solutions in record time.",
        rating: 5,
        photoUrl: null,
        verified: true,
        featured: true,
        created_at: "2024-01-01",
    },
    {
        id: "2",
        name: "Bob Smith",
        company: "Beta Ltd",
        role: "Founder",
        relationship_type: "client",
        intervention_type: "devops",
        message: "The deployment pipeline he set up runs under a second.",
        rating: 5,
        photoUrl: null,
        verified: true,
        featured: false,
        created_at: "2024-02-15",
    },
    {
        id: "3",
        name: "Carol Lee",
        company: "Gamma Inc",
        role: "Product Manager",
        relationship_type: "client",
        intervention_type: "full‑stack",
        message: "Bug fixing under 1 s – truly impressive!",
        rating: 5,
        photoUrl: null,
        verified: false,
        featured: false,
        created_at: "2024-03-10",
    },
];

// No fetcher needed – using static dummy data

interface Testimonial {
    id: string;
    name: string;
    company?: string | null;
    role?: string | null;
    relationship_type: string;
    intervention_type: string;
    message: string;
    rating: number;
    photoUrl?: string | null;
    verified?: boolean;
    featured?: boolean;
    created_at: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className="flex-shrink-0 w-[340px] mx-3 p-6 rounded-3xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:scale-[1.03] hover:bg-white/[0.06] transition-all duration-300 group cursor-default select-none"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>

            {/* Quote icon */}
            <Quote size={22} className="text-blue-500/40 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(n => (
                    <Star key={n} size={13} className={n <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} />
                ))}
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 mb-5 italic">
                "{t.message}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                {t.photoUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                        <Image src={t.photoUrl} alt={t.name} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {t.name[0]}
                    </div>
                )}
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white truncate">{t.name}</span>
                        {t.verified && (
                            <BadgeCheck size={14} className="text-blue-400 flex-shrink-0" aria-label="Verified Client" />
                        )}
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                        {t.role && <span>{t.role}</span>}
                        {t.role && t.company && <span> · </span>}
                        {t.company && <span>{t.company}</span>}
                        {!t.role && !t.company && <span className="text-blue-400/70">{t.intervention_type}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Marquee({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
    const duplicated = [...items, ...items, ...items];

    return (
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <motion.div
                className="flex"
                animate={{ x: reverse ? ["0%", "33.33%"] : ["0%", "-33.33%"] }}
                transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                style={{ width: "max-content" }}
                whileHover={{ animationPlayState: "paused" } as any}
            >
                {duplicated.map((t, i) => <TestimonialCard key={`${t.id}-${i}`} t={t} />)}
            </motion.div>
        </div>
    );
}

export default function Testimonials() {
    const testimonials = dummyTestimonials;

    const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

    return (
        <section id="testimonials" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-3">Client Voices</div>
                        <h2 className="section-title">What People Say</h2>
                        <p className="text-gray-400 mt-3 leading-relaxed max-w-lg">
                            Real feedback from clients, colleagues, and collaborators. Unfiltered. Honest. Verified.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Row 1 — forward */}
                {row1.length > 0 && <Marquee items={row1} />}
                {/* Row 2 — reverse (only show if enough items) */}
                {row2.length > 0 && <Marquee items={row2.length >= 2 ? row2 : row1} reverse />}
            </div>

            {/* Stats strip */}
            {testimonials.length > 0 && (
                <div className="section-container mt-12">
                    <div className="flex flex-wrap items-center justify-center gap-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">{testimonials.length}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Total Reviews</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-yellow-400">
                                {(testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Avg Rating</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-blue-400">
                                {testimonials.filter(t => t.verified).length}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Verified Clients</div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
