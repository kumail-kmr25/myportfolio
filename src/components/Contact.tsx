"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

export default function Contact() {
    const [showPhone, setShowPhone] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get("content-type");
            let result;

            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                throw new Error(`Server returned ${response.status}: ${response.statusText}. Expected JSON but received ${contentType || 'unknown'}.`);
            }

            if (response.ok && result.success) {
                setSubmittedData(data);
                setSubmitStatus("success");
                reset();
                // We don't auto-reset to idle here anymore to let user read summary
            } else {
                setSubmitStatus("error");
                setErrorMessage(result.error || "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            setSubmitStatus("error");
            setErrorMessage(error.message || "Failed to connect to the server.");
        }
    };

    return (
        <section id="contact" className="bg-[#050505] py-12 relative overflow-hidden">
            <div className="section-container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                    Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                </p>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Form HERO - Professional & High-Converting */}
                    <div className="card shadow-2xl shadow-blue-500/5 border-white/10">
                        {submitStatus === "success" && submittedData ? (
                            <div className="p-8 md:p-12 animate-in fade-in zoom-in duration-500">
                                <div className="flex flex-col items-center justify-center text-center mb-12">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3">Inquiry Received!</h3>
                                    <p className="text-gray-400 text-lg">
                                        Thank you, <span className="text-white font-bold">{submittedData.name}</span>. Here is a summary of what you sent:
                                    </p>
                                </div>

                                <div className="glass-effect rounded-3xl p-8 border border-white/5 bg-white/[0.02] space-y-6 mb-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">Official Email</p>
                                            <p className="text-white font-medium">{submittedData.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">Company</p>
                                            <p className="text-white font-medium">{submittedData.company || "Not Specified"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">Inquiry Type</p>
                                            <p className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-bold inline-block border border-blue-500/20">{submittedData.inquiryType}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">Service Category</p>
                                            <p className="text-white font-medium">{submittedData.serviceRequired}</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/5">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-3">Project Narrative</p>
                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line italic bg-white/5 p-6 rounded-2xl border border-white/5">
                                            &quot;{submittedData.message}&quot;
                                        </p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            setSubmitStatus("idle");
                                            setSubmittedData(null);
                                        }}
                                        className="btn-primary px-10"
                                    >
                                        Send Another Request
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-8 p-2 md:p-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white/90 border-b border-white/5 pb-2">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-400">Full Name <span className="text-blue-500">*</span></label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                id="name"
                                                placeholder="e.g. John Doe"
                                                className={`input-field ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address <span className="text-blue-500">*</span></label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                id="email"
                                                placeholder="john@company.com"
                                                className={`input-field ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                            />
                                            {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-medium text-gray-400">Company / Organization <span className="text-gray-600">(Optional)</span></label>
                                        <input
                                            {...register("company")}
                                            type="text"
                                            id="company"
                                            placeholder="Where do you work?"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white/90 border-b border-white/5 pb-2">Project & Opportunity Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="inquiryType" className="text-sm font-medium text-gray-400">Reason for Contact <span className="text-blue-500">*</span></label>
                                            <div className="relative">
                                                <select
                                                    {...register("inquiryType")}
                                                    id="inquiryType"
                                                    className={`input-field appearance-none bg-[#0a0a0a] text-white pr-10 ${errors.inquiryType ? 'border-red-500/50' : ''}`}
                                                >
                                                    <option value="" className="bg-[#0a0a0a] text-white">Choose one...</option>
                                                    <option value="Internship Opportunity" className="bg-[#0a0a0a] text-white">Internship Opportunity</option>
                                                    <option value="Full-Time Role" className="bg-[#0a0a0a] text-white">Full-Time Role</option>
                                                    <option value="Freelance Project" className="bg-[#0a0a0a] text-white">Freelance Project</option>
                                                    <option value="Bug Fix / Error Resolution" className="bg-[#0a0a0a] text-white">Bug Fix / Error Resolution</option>
                                                    <option value="Performance Optimization" className="bg-[#0a0a0a] text-white">Performance Optimization</option>
                                                    <option value="API Integration" className="bg-[#0a0a0a] text-white">API Integration</option>
                                                    <option value="Collaboration" className="bg-[#0a0a0a] text-white">Collaboration</option>
                                                    <option value="Other" className="bg-[#0a0a0a] text-white">Other</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <Loader2 size={14} className="animate-pulse" />
                                                </div>
                                            </div>
                                            {errors.inquiryType && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.inquiryType.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="serviceRequired" className="text-sm font-medium text-gray-400">Service Required <span className="text-blue-500">*</span></label>
                                            <select
                                                {...register("serviceRequired")}
                                                id="serviceRequired"
                                                className={`input-field appearance-none bg-[#0a0a0a] text-white ${errors.serviceRequired ? 'border-red-500/50' : ''}`}
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white">Select a service...</option>
                                                <option value="UI/UX Design" className="bg-[#0a0a0a] text-white">UI/UX Design</option>
                                                <option value="Frontend Development" className="bg-[#0a0a0a] text-white">Frontend Development</option>
                                                <option value="Backend Development" className="bg-[#0a0a0a] text-white">Backend Development</option>
                                                <option value="Full Stack Development" className="bg-[#0a0a0a] text-white">Full Stack Development</option>
                                                <option value="DevOps / Cloud" className="bg-[#0a0a0a] text-white">DevOps / Cloud</option>
                                                <option value="Database Design" className="bg-[#0a0a0a] text-white">Database Design</option>
                                                <option value="Bug Fix / Error Optimisation" className="bg-[#0a0a0a] text-white">Bug Fix / Error Optimisation</option>
                                                <option value="Performance Tuning" className="bg-[#0a0a0a] text-white">Performance Tuning</option>
                                                <option value="Other" className="bg-[#0a0a0a] text-white">Other</option>
                                            </select>
                                            {errors.serviceRequired && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.serviceRequired.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="budgetRange" className="text-sm font-medium text-gray-400">Budget Range <span className="text-gray-600">(Optional)</span></label>
                                            <select
                                                {...register("budgetRange")}
                                                id="budgetRange"
                                                className="input-field appearance-none bg-[#0a0a0a] text-white"
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white">Optional...</option>
                                                <option value="Below ₹10,000" className="bg-[#0a0a0a] text-white">Below ₹10,000</option>
                                                <option value="₹10,000 – ₹50,000" className="bg-[#0a0a0a] text-white">₹10,000 – ₹50,000</option>
                                                <option value="₹50,000+" className="bg-[#0a0a0a] text-white">₹50,000+</option>
                                                <option value="Discuss Later" className="bg-[#0a0a0a] text-white">Discuss Later</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="timeline" className="text-sm font-medium text-gray-400">Project Timeline <span className="text-gray-600">(Optional)</span></label>
                                            <select
                                                {...register("timeline")}
                                                id="timeline"
                                                className="input-field appearance-none bg-[#0a0a0a] text-white"
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white">Optional...</option>
                                                <option value="Urgent (1–3 days)" className="bg-[#0a0a0a] text-white">Urgent (1–3 days)</option>
                                                <option value="1–2 weeks" className="bg-[#0a0a0a] text-white">1–2 weeks</option>
                                                <option value="1 month" className="bg-[#0a0a0a] text-white">1 month</option>
                                                <option value="Flexible" className="bg-[#0a0a0a] text-white">Flexible</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-400">Project Details <span className="text-blue-500">*</span></label>
                                    <textarea
                                        {...register("message")}
                                        id="message"
                                        rows={5}
                                        placeholder="Please provide a detailed explanation (min 20 characters)..."
                                        className={`input-field resize-none bg-[#0a0a0a] focus:ring-1 focus:ring-blue-500/50 ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.message.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="foundBy" className="text-sm font-medium text-gray-400">How Did You Find Me? <span className="text-gray-600">(Optional)</span></label>
                                    <select
                                        {...register("foundBy")}
                                        id="foundBy"
                                        className="input-field appearance-none bg-[#0a0a0a] text-white"
                                    >
                                        <option value="" className="bg-[#0a0a0a] text-white">Optional...</option>
                                        <option value="LinkedIn" className="bg-[#0a0a0a] text-white">LinkedIn</option>
                                        <option value="X (Twitter)" className="bg-[#0a0a0a] text-white">X (Twitter)</option>
                                        <option value="GitHub" className="bg-[#0a0a0a] text-white">GitHub</option>
                                        <option value="Referral" className="bg-[#0a0a0a] text-white">Referral</option>
                                        <option value="Google Search" className="bg-[#0a0a0a] text-white">Google Search</option>
                                        <option value="Other" className="bg-[#0a0a0a] text-white">Other</option>
                                    </select>
                                </div>

                                {submitStatus === "error" && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                                        <AlertCircle size={18} />
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitStatus === "loading"}
                                    className="btn-primary w-full py-4 text-lg font-bold group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    {submitStatus === "loading" ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 size={24} className="animate-spin mr-3" />
                                            <span>Processing Inquiry...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            Submit Request
                                            <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    )}
                                </button>
                                <p className="text-[11px] text-center text-gray-500 max-w-sm mx-auto">
                                    Your information is secure and will never be shared. 🛡️
                                    Expect a high-quality response within 1 business day.
                                </p>
                            </form>
                        )}
                    </div>

                    {/* Quick Reach Info - Now more subtle below the main form */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Direct Email</p>
                                <p className="text-sm text-white font-semibold">ka6307464@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                                <Phone size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium">Call / WhatsApp</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-white font-semibold">{showPhone ? "6006121193" : "••••••••••"}</p>
                                    {!showPhone && <button
                                        onClick={() => setShowPhone(true)}
                                        className="text-[10px] text-blue-400 hover:underline p-2 -m-2 focus:outline-none"
                                        aria-label="Reveal phone number"
                                    >
                                        Reveal
                                    </button>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Location</p>
                                <p className="text-sm text-white font-semibold">Kashmir, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
