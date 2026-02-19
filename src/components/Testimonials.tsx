"use client";

import { useState } from "react";
import { Star, MessageSquare, Plus, Loader2 } from "lucide-react";
import useSWR from "swr";
import TestimonialModal from "./TestimonialModal";
import { motion } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Testimonial {
    id: string;
    name: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
    created_at: string;
}

export default function Testimonials() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: testimonials, error, mutate, isLoading } = useSWR<Testimonial[]>("/api/testimonials", fetcher);

    const handleSuccess = () => {
        mutate();
        setTimeout(() => setIsModalOpen(false), 2000);
    };

    return (
        <section id="testimonials" className="py-20 bg-[#050505] relative">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="section-title">Client Feedback</h2>
                        <p className="text-lg text-gray-400 mt-4 leading-relaxed">
                            Real experiences from clients I&apos;ve collaborated with. Transparent, honest, and impactful.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary gap-2 group whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Submit Testimonial
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-white/20" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 bg-red-500/5 rounded-3xl border border-red-500/10">
                        <p className="font-medium">Failed to load feedback. Please try again later.</p>
                    </div>
                ) : testimonials?.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <p className="text-gray-500 mb-6">No feedback yet. Be the first to share your experience!</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-secondary"
                        >
                            Add Your Testimonial
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials?.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="card group hover:-translate-y-2 transition-all duration-500 flex flex-col"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= testimonial.rating
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-700"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
                                        {new Date(testimonial.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="mb-8 flex-grow">
                                    <p className="text-gray-300 leading-relaxed italic">
                                        &quot;{testimonial.message}&quot;
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white font-bold text-lg border border-white/10 group-hover:border-white/20 transition-colors">
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{testimonial.name}</h4>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-tight">{testimonial.intervention_type}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1 font-bold">About Delivery Lead</p>
                                        <p className="text-sm text-gray-300 line-clamp-2">{testimonial.about_delivery_lead}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <TestimonialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </section>
    );
}
