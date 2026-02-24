"use client";

import { useState } from "react";
import { z } from "zod";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { testimonialSchema, type TestimonialFormData } from "@portfolio/shared";

interface TestimonialFormProps {
    onSuccess: () => void;
}

export default function TestimonialForm({ onSuccess }: TestimonialFormProps) {
    const [formData, setFormData] = useState<Partial<TestimonialFormData>>({
        rating: 7,
        intervention_type: "Full Stack Development",
        permission: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const validatedData = testimonialSchema.parse(formData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://kumailkmr-portfolio.onrender.com"}/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to submit testimonial");
            }

            setIsSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 3000);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    const path = issue.path[0];
                    if (path) {
                        newErrors[path.toString()] = issue.message;
                    }
                });
                setErrors(newErrors);
            } else {
                setErrors({ form: (error as Error).message });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Feedback Submitted!</h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                    Thank you for your professional endorsement. It will be visible after a quick review.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-1">
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Professional Context</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className={`input-field ${errors.name ? 'border-red-500/50' : ''}`}
                            placeholder="John Doe"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email Address <span className="text-gray-600">(Private) *</span></label>
                        <input
                            type="email"
                            className={`input-field ${errors.email ? 'border-red-500/50' : ''}`}
                            placeholder="john@example.com"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Company / Organization <span className="text-gray-600">(Optional)</span></label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Google, Startup X"
                            value={formData.company || ""}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Worked With Me As <span className="text-red-500">*</span></label>
                        <select
                            className={`input-field appearance-none bg-[#0a0a0a] text-white ${errors.relationship_type ? 'border-red-500/50' : ''}`}
                            value={formData.relationship_type || ""}
                            onChange={(e) => setFormData({ ...formData, relationship_type: e.target.value as any })}
                        >
                            <option value="" className="bg-[#0a0a0a] text-white">Select relationship...</option>
                            <option value="Freelance Client" className="bg-[#0a0a0a] text-white">Freelance Client</option>
                            <option value="Internship Mentor" className="bg-[#0a0a0a] text-white">Internship Mentor</option>
                            <option value="Hackathon Teammate" className="bg-[#0a0a0a] text-white">Hackathon Teammate</option>
                            <option value="Open Source Collaborator" className="bg-[#0a0a0a] text-white">Open Source Collaborator</option>
                            <option value="Hiring Manager" className="bg-[#0a0a0a] text-white">Hiring Manager</option>
                            <option value="Other" className="bg-[#0a0a0a] text-white">Other</option>
                        </select>
                        {errors.relationship_type && <p className="text-[10px] text-red-500">{errors.relationship_type}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Project Feedback</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Service Provided <span className="text-red-500">*</span></label>
                    <select
                        className={`input-field appearance-none bg-[#0a0a0a] text-white ${errors.intervention_type ? 'border-red-500/50' : ''}`}
                        value={formData.intervention_type || ""}
                        onChange={(e) => setFormData({ ...formData, intervention_type: e.target.value as any })}
                    >
                        <option value="" className="bg-[#0a0a0a] text-white">Select service...</option>
                        <option value="UI/UX Design" className="bg-[#0a0a0a] text-white">UI/UX Design</option>
                        <option value="Frontend Development" className="bg-[#0a0a0a] text-white">Frontend Development</option>
                        <option value="Backend Development" className="bg-[#0a0a0a] text-white">Backend Development</option>
                        <option value="Full Stack Development" className="bg-[#0a0a0a] text-white">Full Stack Development</option>
                        <option value="DevOps / Cloud" className="bg-[#0a0a0a] text-white">DevOps / Cloud</option>
                        <option value="Database Design" className="bg-[#0a0a0a] text-white">Database Design</option>
                        <option value="Bug Fix / Error Optimisation" className="bg-[#0a0a0a] text-white">Bug Fix / Error Optimisation</option>
                        <option value="Performance Optimization" className="bg-[#0a0a0a] text-white">Performance Optimization</option>
                        <option value="API Integration" className="bg-[#0a0a0a] text-white">API Integration</option>
                        <option value="Other" className="bg-[#0a0a0a] text-white">Other</option>
                    </select>
                    {errors.intervention_type && <p className="text-[10px] text-red-500">{errors.intervention_type}</p>}
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-400 block">Overall Rating <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handleRatingClick(num)}
                                className="group relative p-1 focus:outline-none transition-transform active:scale-90"
                            >
                                <Star
                                    size={32}
                                    className={`transition-all duration-300 ${formData.rating !== undefined && num <= formData.rating
                                        ? "text-yellow-500 fill-yellow-500 scale-110 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                                        : "text-white/10 group-hover:text-yellow-500/50"
                                        }`}
                                />
                                {formData.rating === num && (
                                    <motion.div
                                        layoutId="rating-glow"
                                        className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full -z-10"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 px-1">
                        {formData.rating === 7 ? "Exceptionalsly Professional" :
                            formData.rating === 1 ? "Needs Improvement" :
                                "Level of Excellence"}
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Testimonial Message <span className="text-red-500">*</span></label>
                    <textarea
                        className={`input-field min-h-[120px] resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                        placeholder="Share the impact, results, and your overall experience..."
                        value={formData.message || ""}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <div className="flex justify-between items-center">
                        {errors.message && <p className="text-[10px] text-red-500">{errors.message}</p>}
                        <p className={`text-[10px] ml-auto ${(formData.message?.length || 0) < 20 ? 'text-gray-500' : 'text-blue-400'}`}>
                            {(formData.message?.length || 0)}/500 characters
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">How was communication & delivery? <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        className={`input-field ${errors.about_delivery_lead ? 'border-red-500/50' : ''}`}
                        placeholder="e.g. Clear, professional, and detail-oriented"
                        value={formData.about_delivery_lead || ""}
                        onChange={(e) => setFormData({ ...formData, about_delivery_lead: e.target.value })}
                    />
                    {errors.about_delivery_lead && <p className="text-[10px] text-red-500">{errors.about_delivery_lead}</p>}
                </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={formData.permission || false}
                            onChange={(e) => setFormData({ ...formData, permission: e.target.checked })}
                        />
                        <div className="w-5 h-5 border border-white/20 rounded-md bg-white/5 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all"></div>
                        <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        I give permission to display this testimonial publicly on this portfolio.
                        I understand my email remains private. <span className="text-red-500">*</span>
                    </span>
                </label>
                {errors.permission && <p className="text-[10px] text-red-500">{errors.permission}</p>}

                {errors.form && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {errors.form}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-4 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Submit Professional Testimonial"
                    )}
                </button>
            </div>
        </form>
    );
}
