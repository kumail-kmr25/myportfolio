"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, CheckCircle2, AlertCircle, ArrowRight, Linkedin, ArrowUpRight } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { contactSchema, type ContactFormData } from "@portfolio/shared";
import { getApiUrl } from "@/lib/api";
import { m, Variants } from "framer-motion";

function ContactInner() {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.success) {
                    setSettings(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch settings:", err);
            }
        };
        fetchSettings();
    }, []);

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
        const service = searchParams?.get("service");
        const inquiry = searchParams?.get("inquiry");

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
        <section id="contact" className="bg-[#050505] py-24 lg:py-16 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />

            <m.div
                className="section-container relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="text-center mb-16 lg:mb-12">
                    <m.span
                        variants={itemVariants}
                        className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block"
                    >
                        Availability
                    </m.span>
                    <m.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        Get In <span className="text-gray-500 italic">Touch</span>
                    </m.h2>
                    <m.p
                        variants={itemVariants}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Have a project in mind or just want to discuss engineering? I&apos;d love to hear from you.
                    </m.p>
                </div>

                <div className="section-container max-w-4xl mx-auto">
                    {/* Contact Form HERO */}
                    <m.div
                        variants={itemVariants}
                        className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl"
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
                                            Thank you, <span className="text-white font-bold">{submittedData.name}</span>. I&apos;ll get back to you shortly.
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setSubmitStatus("idle");
                                                setSubmittedData(null);
                                            }}
                                            className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-colors"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 md:p-10">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                        {/* Honeypot Field */}
                                        <div className="hidden">
                                            <input {...register("company")} tabIndex={-1} autoComplete="off" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        {...register("name")}
                                                        placeholder="John Doe"
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-[10px] mt-1 pl-1 font-bold uppercase tracking-tight">{errors.name.message}</p>}
                                                </div>
                                            </div>

                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        {...register("email")}
                                                        placeholder="john@example.com"
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                                                    />
                                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 pl-1 font-bold uppercase tracking-tight">{errors.email.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Inquiry Type
                                                </label>
                                                <select
                                                    {...register("inquiryType")}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-[#050505]">Select Type</option>
                                                    <option value="Freelance Project" className="bg-[#050505]">Freelance Project</option>
                                                    <option value="Full-Time Role" className="bg-[#050505]">Full-Time Role</option>
                                                    <option value="Technical Inquiry" className="bg-[#050505]">Technical Inquiry</option>
                                                    <option value="Bug Fix / Error Resolution" className="bg-[#050505]">Bug Fix / Error Resolution</option>
                                                    <option value="Collaboration" className="bg-[#050505]">Collaboration</option>
                                                    <option value="Other" className="bg-[#050505]">Other</option>
                                                </select>
                                            </div>

                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Service Required
                                                </label>
                                                <select
                                                    {...register("serviceRequired")}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-[#050505]">Select Service</option>
                                                    <option value="Full Stack Development" className="bg-[#050505]">Full Stack Development</option>
                                                    <option value="Frontend Development" className="bg-[#050505]">Frontend Development</option>
                                                    <option value="Backend Development" className="bg-[#050505]">Backend Development</option>
                                                    <option value="UI/UX Design" className="bg-[#050505]">UI/UX Design</option>
                                                    <option value="Performance Tuning" className="bg-[#050505]">Performance Tuning</option>
                                                    <option value="Bug Fix / Error Optimisation" className="bg-[#050505]">Bug Fix / Error Optimisation</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Budget Range
                                                </label>
                                                <select
                                                    {...register("budgetRange")}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-[#050505]">Select Budget</option>
                                                    <option value="Below ₹10,000" className="bg-[#050505]">Below ₹10,000</option>
                                                    <option value="₹10,000 – ₹50,000" className="bg-[#050505]">₹10,000 – ₹50,000</option>
                                                    <option value="₹50,000+" className="bg-[#050505]">₹50,000+</option>
                                                    <option value="Discuss Later" className="bg-[#050505]">Discuss Later</option>
                                                </select>
                                            </div>

                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Timeline
                                                </label>
                                                <select
                                                    {...register("timeline")}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-[#050505]">Select Timeline</option>
                                                    <option value="Urgent (1–3 days)" className="bg-[#050505]">Urgent (1–3 days)</option>
                                                    <option value="1–2 weeks" className="bg-[#050505]">1–2 weeks</option>
                                                    <option value="1 month" className="bg-[#050505]">1 month</option>
                                                    <option value="Flexible" className="bg-[#050505]">Flexible</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="group space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                Found By
                                            </label>
                                            <select
                                                {...register("foundBy")}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                                            >
                                                <option value="" className="bg-[#050505]">How did you find me?</option>
                                                <option value="LinkedIn" className="bg-[#050505]">LinkedIn</option>
                                                <option value="GitHub" className="bg-[#050505]">GitHub</option>
                                                <option value="Referral" className="bg-[#050505]">Referral</option>
                                                <option value="Google Search" className="bg-[#050505]">Google Search</option>
                                                <option value="Other" className="bg-[#050505]">Other</option>
                                            </select>
                                        </div>

                                        <div className="group space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                Project Intelligence
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    {...register("message")}
                                                    placeholder="Describe the architectural requirements or business problem you're solving..."
                                                    rows={5}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                                                />
                                                {errors.message && <p className="text-red-500 text-[10px] mt-1 pl-1 font-bold uppercase tracking-tight">{errors.message.message}</p>}
                                            </div>
                                        </div>

                                        {submitStatus === "error" && (
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-3">
                                                <AlertCircle size={18} />
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitStatus === "loading"}
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            {submitStatus === "loading" ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Initializing Channel...
                                                </span>
                                            ) : (
                                                <>
                                                    Transmit Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-12 pt-12 border-t border-white/5">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-8">Direct Access Protocols</p>
                                            <div className="flex flex-wrap justify-center gap-6">
                                                <a href={`mailto:${settings?.emailAddress || 'ka6307464@gmail.com'}`} className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 transition-all text-xs font-bold group">
                                                    <Mail size={18} className="text-blue-500 group-hover:scale-110 transition-transform" /> {settings?.emailAddress || 'ka6307464@gmail.com'}
                                                </a>
                                                <a href={settings?.linkedinUrl || "https://www.linkedin.com/in/kumail-kmr25"} target="_blank" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 transition-all text-xs font-bold group">
                                                    <Linkedin size={18} className="text-blue-500 group-hover:scale-110 transition-transform" /> Professional Network
                                                </a>
                                                <a href={`https://wa.me/${settings?.phoneNumber?.replace(/\+/g, '') || '971500000000'}?text=${encodeURIComponent("Hello Kumail KMR, I'm interested in discussing a project.")}`} target="_blank" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20 text-gray-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all text-xs font-bold group">
                                                    <MessageCircle size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" /> Rapid Response Protocol
                                                </a>
                                                <button 
                                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 transition-all text-sm font-black uppercase tracking-widest group"
                                                >
                                                    Secure Discovery Call <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </m.div>
                </div>
            </m.div>
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
