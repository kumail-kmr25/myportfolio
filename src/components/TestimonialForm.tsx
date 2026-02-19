"use client";

import { useState } from "react";
import { z } from "zod";
import { Star, Loader2, CheckCircle2 } from "lucide-react";

const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    intervention_type: z.enum([
        "UI/UX Design",
        "DevOps / Cloud",
        "Frontend",
        "Backend",
        "Database Design",
        "Bug Fix / Error Optimisation",
        "Full Stack Development",
        "Others",
    ]),
    message: z.string().min(1, "Message is required"),
    rating: z.number().min(1).max(7),
    about_delivery_lead: z.string().min(1, "About the delivery lead is required"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
    onSuccess: () => void;
}

export default function TestimonialForm({ onSuccess }: TestimonialFormProps) {
    const [formData, setFormData] = useState<Partial<TestimonialFormData>>({
        rating: 7,
        intervention_type: "Full Stack Development",
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

            const response = await fetch("/api/testimonials", {
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
            }, 2000);
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
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400">Your feedback has been submitted successfully.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <input
                        type="text"
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your Name"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email ID</label>
                    <input
                        type="email"
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Intervention Type</label>
                <select
                    className="input-field appearance-none cursor-pointer bg-[#1a1a1a] text-white"
                    value={formData.intervention_type}
                    onChange={(e) => setFormData({ ...formData, intervention_type: e.target.value as any })}
                    style={{ colorScheme: "dark" }}
                >
                    <option className="bg-[#1a1a1a] text-white" value="UI/UX Design">UI/UX Design</option>
                    <option className="bg-[#1a1a1a] text-white" value="DevOps / Cloud">DevOps / Cloud</option>
                    <option className="bg-[#1a1a1a] text-white" value="Frontend">Frontend</option>
                    <option className="bg-[#1a1a1a] text-white" value="Backend">Backend</option>
                    <option className="bg-[#1a1a1a] text-white" value="Database Design">Database Design</option>
                    <option className="bg-[#1a1a1a] text-white" value="Bug Fix / Error Optimisation">Bug Fix / Error Optimisation</option>
                    <option className="bg-[#1a1a1a] text-white" value="Full Stack Development">Full Stack Development</option>
                    <option className="bg-[#1a1a1a] text-white" value="Others">Others</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                    className={`input-field min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Share your experience..."
                    value={formData.message || ""}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">About the Delivery Lead</label>
                    <input
                        type="text"
                        className={`input-field ${errors.about_delivery_lead ? 'border-red-500' : ''}`}
                        placeholder="Short description..."
                        value={formData.about_delivery_lead || ""}
                        onChange={(e) => setFormData({ ...formData, about_delivery_lead: e.target.value })}
                        required
                    />
                    {errors.about_delivery_lead && <p className="text-xs text-red-500">{errors.about_delivery_lead}</p>}
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 block">Rating (1-7)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handleRatingClick(num)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${formData.rating === num
                                    ? "bg-white text-black scale-110 shadow-lg"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {errors.form && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {errors.form}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    "Submit Testimonial"
                )}
            </button>
        </form>
    );
}
