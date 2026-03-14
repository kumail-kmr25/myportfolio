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
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="space-y-4">
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

                                            <div className="group space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                                    Tell me about your project
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        {...register("message")}
                                                        placeholder="I need a SaaS dashboard for my fintech startup..."
                                                        rows={5}
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                                                    />
                                                    {errors.message && <p className="text-red-500 text-[10px] mt-1 pl-1 font-bold uppercase tracking-tight">{errors.message.message}</p>}
                                                </div>
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
                                            {submitStatus === "loading" ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    Initializing...
                                                </span>
                                            ) : (
                                                <>
                                                    Initialize Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-12 pt-12 border-t border-white/5">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6">Or connect via</p>
                                            <div className="flex flex-wrap justify-center gap-4">
                                                <a href="mailto:kumail@example.com" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold">
                                                    <Mail size={16} className="text-blue-500" /> kumail@example.com
                                                </a>
                                                <a href="https://linkedin.com/in/kumailkmr" target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold">
                                                    <Linkedin size={16} className="text-blue-500" /> LinkedIn
                                                </a>
                                                <a href="#" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white hover:border-blue-500 hover:bg-blue-600/10 transition-all text-sm font-black uppercase tracking-widest group">
                                                    Book a Free Call <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </a>
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
