"use client";


import Image from "next/image";
import { Star, BadgeCheck, Quote, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import TestimonialModal from "./TestimonialModal";

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
                &quot;{t.message}&quot;
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const testimonials = dummyTestimonials;

    const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="testimonials" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background glow and subtle dots */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container mb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                        >
                            Social Proof
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                        >
                            What People <span className="text-gray-500 italic">Say</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg leading-relaxed"
                        >
                            Real-world feedback from engineering partners and institutional clients. Unfiltered technical validation.
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-8 py-4 bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-white/[0.06] hover:border-blue-500/30 hover:scale-[1.05] active:scale-[0.95] backdrop-blur-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center gap-3">
                            <Plus size={16} className="text-blue-500" />
                            Add Yours
                        </span>
                    </motion.button>
                </div>
            </div>

            <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { }} />

            <div className="space-y-12">
                {/* Single Row — all testimonials */}
                {testimonials.length > 0 && <Marquee items={testimonials} />}
            </div>

            {/* Stats strip */}
            {testimonials.length > 0 && (
                <div className="section-container mt-24">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center justify-center gap-12 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden"
                    >
                        <motion.div variants={itemVariants} className="text-center group">
                            <div className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">{testimonials.length}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mt-2">Total Insights</div>
                        </motion.div>
                        <div className="hidden md:block w-px h-12 bg-white/10" />
                        <motion.div variants={itemVariants} className="text-center group">
                            <div className="text-3xl font-black text-yellow-400 group-hover:scale-110 transition-transform">
                                {(testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mt-2">Avg Rating</div>
                        </motion.div>
                        <div className="hidden md:block w-px h-12 bg-white/10" />
                        <motion.div variants={itemVariants} className="text-center group">
                            <div className="text-3xl font-black text-blue-400 group-hover:text-white transition-colors">
                                {testimonials.filter(t => t.verified).length}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mt-2">Verified Nodes</div>
                        </motion.div>

                        {/* Decorative background glow */}
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </section>
    );
}
