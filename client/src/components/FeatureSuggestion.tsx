"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MessageSquare, Send, CheckCircle2, Trophy, Lightbulb, Zap, Rocket } from "lucide-react";
import { featureRequestSchema } from "@portfolio/shared";
import { z } from "zod";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface FeatureRequest {
    id: string;
    message: string;
    category: string;
    status: string;
    created_at: string;
}

export default function FeatureSuggestion() {
    const { data: completedSuggestions, mutate } = useSWR<FeatureRequest[]>("/api/feature-requests", fetcher);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        category: "UI",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const validatedData = featureRequestSchema.parse(formData);

            const res = await fetch(`/api/feature-requests`, {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });

            if (!res.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
            setFormData({ name: "", email: "", message: "", category: "UI" });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    newErrors[issue.path[0].toString()] = issue.message;
                });
                setErrors(newErrors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="suggest-feature" className="py-12 bg-[#050505]">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Info & Form */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="section-title text-left !mb-4">Suggest a Feature</h2>
                            <p className="text-gray-400">
                                Help me improve my portfolio. If I build your suggested feature, I&apos;ll credit you with a &quot;Built from community suggestion&quot; badge.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Name</label>
                                        <input
                                            type="text"
                                            className={`input-field ${errors.name ? 'border-red-500/50' : ''}`}
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                                        <input
                                            type="email"
                                            className={`input-field ${errors.email ? 'border-red-500/50' : ''}`}
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Category</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {["UI", "Performance", "New Tool", "Other"].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, category: cat })}
                                                className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all ${formData.category === cat
                                                    ? "bg-blue-500 border-blue-500 text-white"
                                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Feature Idea</label>
                                    <textarea
                                        className={`input-field min-h-[120px] resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                                        placeholder="Tell me what you'd like to see..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                    {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary w-full py-4 text-base font-bold disabled:opacity-50 group active:scale-[0.98] transition-all"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                        {isLoading ? "Submitting..." : "Send Suggestion"}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center text-green-400 text-sm font-medium mt-4 flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={16} />
                                            Thank you! Your idea has been sent.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Recently Completed */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Shipped Ideas</h3>
                                <p className="text-sm text-gray-500">Recently completed community suggestions</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {!Array.isArray(completedSuggestions) || completedSuggestions.length === 0 ? (
                                <div className="p-8 rounded-3xl border border-dashed border-white/10 text-center text-gray-500">
                                    <Lightbulb className="w-8 h-8 mx-auto mb-4 opacity-20" />
                                    Be the first to suggest a feature that gets built!
                                </div>
                            ) : (
                                completedSuggestions.map((req, index) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex gap-6"
                                    >
                                        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 items-center justify-center text-green-500">
                                            <Zap size={20} />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-2 py-1 rounded-md bg-blue-500 text-[10px] font-black uppercase tracking-wider text-white">
                                                    Verified
                                                </span>
                                                <div className="text-[10px] font-bold text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md flex items-center gap-1">
                                                    <Rocket size={10} />
                                                    Built from community suggestion
                                                </div>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-1 italic">&quot;{req.message}&quot;</p>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                Category: {req.category}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-2">Want to work together?</h4>
                                <p className="text-blue-100 text-sm mb-6 opacity-80">I&apos;m currently available for freelance projects and full-time opportunities.</p>
                                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#050505] rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                                    Let&apos;s Talk <Send size={16} />
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

