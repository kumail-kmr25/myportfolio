"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { contactSchema, type ContactFormData } from "@portfolio/shared";
import { getApiUrl } from "@/lib/api";
import { motion, Variants } from "framer-motion";

function ContactInner() {
    const [showPhone, setShowPhone] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        const service = searchParams.get("service");
        const inquiry = searchParams.get("inquiry");

        if (service) {
            setValue("serviceRequired", service as any);
        }
        if (inquiry) {
            setValue("inquiryType", inquiry as any);
        }

        // Handle custom event from Diagnostic Tool
        const handlePrefill = (e: any) => {
            const { service, diagnostic } = e.detail;
            if (service) setValue("serviceRequired", service as any);
            if (diagnostic) setValue("message", diagnostic);
            setValue("inquiryType", "Technical Inquiry");
        };

        window.addEventListener("prefill-contact", handlePrefill);
        return () => window.removeEventListener("prefill-contact", handlePrefill);
    }, [searchParams, setValue]);

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch(getApiUrl("/api/contact"), {

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="contact" className="bg-[#050505] py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />

            <motion.div
                className="section-container relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="text-center mb-16">
                    <motion.span
                        variants={itemVariants}
                        className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block"
                    >
                        Availability
                    </motion.span>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        Get In <span className="text-gray-500 italic">Touch</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Have a project in mind or just want to discuss engineering? I&apos;d love to hear from you.
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Form HERO - Professional & High-Converting */}
                    <motion.div
                        variants={itemVariants}
                        className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent"
                    >
                        <div className="bg-[#0a0a0a] rounded-[2.4rem] border border-white/5 overflow-hidden">
                            {submitStatus === "success" && submittedData ? (
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col items-center justify-center text-center mb-12">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                            <CheckCircle2 size={40} className="text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Inquiry Received!</h3>
                                        <p className="text-gray-400 text-lg">
                                            Thank you, <span className="text-white font-bold">{submittedData.name}</span>. Here is a summary of what you sent:
                                        </p>
                                    </div>

                                    <div className="rounded-3xl p-8 border border-white/5 bg-white/[0.02] space-y-6 mb-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Official Email</p>
                                                <p className="text-white font-medium">{submittedData.email}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Company</p>
                                                <p className="text-white font-medium">{submittedData.company || "Not Specified"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Inquiry Type</p>
                                                <p className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-bold inline-block border border-blue-500/20">{submittedData.inquiryType}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Service Category</p>
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
                                            className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-colors"
                                        >
                                            Send Another Request
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form className="space-y-8 p-6 md:p-10" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-1 bg-white/5" />
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Identity</h3>
                                            <div className="h-px flex-1 bg-white/5" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name <span className="text-blue-500">*</span></label>
                                                <input
                                                    {...register("name")}
                                                    type="text"
                                                    id="name"
                                                    placeholder="e.g. John Doe"
                                                    autoComplete="name"
                                                    className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-blue-500/50'} rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/[0.05] transition-all`}
                                                />
                                                {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold uppercase tracking-widest"><AlertCircle size={10} /> {errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address <span className="text-blue-500">*</span></label>
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    id="email"
                                                    placeholder="john@company.com"
                                                    autoComplete="email"
                                                    className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-blue-500/50'} rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/[0.05] transition-all`}
                                                />
                                                {errors.email && <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold uppercase tracking-widest"><AlertCircle size={10} /> {errors.email.message}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-gray-500">Company / Organization <span className="text-gray-700">(Optional)</span></label>
                                            <input
                                                {...register("company")}
                                                type="text"
                                                id="company"
                                                placeholder="Where do you work?"
                                                autoComplete="organization"
                                                className="w-full bg-white/[0.03] border border-white/5 focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/[0.05] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-1 bg-white/5" />
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Project Parameters</h3>
                                            <div className="h-px flex-1 bg-white/5" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label htmlFor="inquiryType" className="text-xs font-black uppercase tracking-widest text-gray-500">Reason for Contact <span className="text-blue-500">*</span></label>
                                                <div className="relative">
                                                    <select
                                                        {...register("inquiryType")}
                                                        id="inquiryType"
                                                        className={`w-full bg-white/[0.03] border ${errors.inquiryType ? 'border-red-500/50' : 'border-white/5'} focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:bg-white/[0.05] transition-all`}
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
                                                </div>
                                                {errors.inquiryType && <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold uppercase tracking-widest"><AlertCircle size={10} /> {errors.inquiryType.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="serviceRequired" className="text-xs font-black uppercase tracking-widest text-gray-500">Service Required <span className="text-blue-500">*</span></label>
                                                <select
                                                    {...register("serviceRequired")}
                                                    id="serviceRequired"
                                                    className={`w-full bg-white/[0.03] border ${errors.serviceRequired ? 'border-red-500/50' : 'border-white/5'} focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:bg-white/[0.05] transition-all`}
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
                                                {errors.serviceRequired && <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold uppercase tracking-widest"><AlertCircle size={10} /> {errors.serviceRequired.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label htmlFor="budgetRange" className="text-xs font-black uppercase tracking-widest text-gray-500">Budget Range <span className="text-gray-600">(Optional)</span></label>
                                                <select
                                                    {...register("budgetRange")}
                                                    id="budgetRange"
                                                    className="w-full bg-white/[0.03] border border-white/5 focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:bg-white/[0.05] transition-all"
                                                >
                                                    <option value="" className="bg-[#0a0a0a] text-white">Optional...</option>
                                                    <option value="Below ₹10,000" className="bg-[#0a0a0a] text-white">Below ₹10,000</option>
                                                    <option value="₹10,000 – ₹50,000" className="bg-[#0a0a0a] text-white">₹10,000 – ₹50,000</option>
                                                    <option value="₹50,000+" className="bg-[#0a0a0a] text-white">₹50,000+</option>
                                                    <option value="Discuss Later" className="bg-[#0a0a0a] text-white">Discuss Later</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="timeline" className="text-xs font-black uppercase tracking-widest text-gray-500">Project Timeline <span className="text-gray-600">(Optional)</span></label>
                                                <select
                                                    {...register("timeline")}
                                                    id="timeline"
                                                    className="w-full bg-white/[0.03] border border-white/5 focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:bg-white/[0.05] transition-all"
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

                                    <div className="space-y-3">
                                        <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-gray-500">Project Narrative <span className="text-blue-500">*</span></label>
                                        <textarea
                                            {...register("message")}
                                            id="message"
                                            rows={6}
                                            placeholder="Please provide a detailed explanation (min 20 characters)..."
                                            className={`w-full bg-white/[0.03] border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-blue-500/50'} rounded-[1.5rem] px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/[0.05] transition-all resize-none`}
                                        />
                                        {errors.message && <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold uppercase tracking-widest"><AlertCircle size={10} /> {errors.message.message}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="foundBy" className="text-xs font-black uppercase tracking-widest text-gray-500">Discovery Channel <span className="text-gray-600">(Optional)</span></label>
                                        <select
                                            {...register("foundBy")}
                                            id="foundBy"
                                            className="w-full bg-white/[0.03] border border-white/5 focus:border-blue-500/50 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:bg-white/[0.05] transition-all"
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
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-3"
                                        >
                                            <AlertCircle size={18} />
                                            {errorMessage}
                                        </motion.div>
                                    )}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={submitStatus === "loading"}
                                            className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-white uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden group relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            {submitStatus === "loading" ? (
                                                <>
                                                    <Loader2 size={24} className="animate-spin" />
                                                    <span>Analyzing Parameters...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Submit Engineering Request</span>
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-center text-gray-500 font-black uppercase tracking-widest">
                                        Expected Response Time: &lt; 24 Hours
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Quick Reach Info - Now more subtle below the main form */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10", label: "Direct Email", value: "ka6307464@gmail.com" },
                            { icon: Phone, color: "text-green-400", bg: "bg-green-500/10", label: "Encrypted Comms", value: "6006121193", isPhone: true },
                            { icon: MapPin, color: "text-purple-400", bg: "bg-purple-500/10", label: "Regional Node", value: "Kashmir, India" }
                        ].map((info, i) => (
                            <motion.div
                                key={info.label}
                                variants={itemVariants}
                                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.06)" }}
                                className="flex items-center space-x-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 transition-all"
                            >
                                <div className={`p-4 ${info.bg} rounded-2xl ${info.color}`}>
                                    <info.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{info.label}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-white font-bold">{info.isPhone ? (showPhone ? info.value : "••••••••••") : info.value}</p>
                                        {info.isPhone && !showPhone && (
                                            <button
                                                onClick={() => setShowPhone(true)}
                                                className="text-[10px] text-blue-400 font-bold uppercase tracking-widest hover:underline"
                                            >
                                                Decrypt
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default function Contact() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <ContactInner />
        </Suspense>
    );
}
