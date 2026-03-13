"use client";

import React, { useState, useRef } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Clock,
    Briefcase,
    IndianRupee,
    Sparkles,
    Send,
    ArrowRight,
    AlertCircle,
    ArrowLeft
} from "lucide-react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hireSchema, type HireFormData } from "@portfolio/shared";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";
import { getApiUrl } from "@/lib/api";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok || json.success === false) throw new Error(json.error || "Fetch failed");
    return json.success ? json.data : json;
};

type Step = "services" | "details" | "success";

const services = [
    {
        id: "Website Development",
        title: "Website Development",
        description: "Custom, high-performance websites built with modern frameworks.",
        icon: Sparkles,
        color: "blue"
    },
    {
        id: "Web Application",
        title: "Web Application",
        description: "Full-scale web applications with complex logic and state management.",
        icon: Briefcase,
        color: "indigo"
    },
    {
        id: "SaaS Platform",
        title: "SaaS Platform",
        description: "Scalable, multi-tenant software as a service products.",
        icon: Send,
        color: "purple"
    },
    {
        id: "Frontend Development",
        title: "Frontend Development",
        description: "Modern, responsive, and high-performance user interfaces.",
        icon: Sparkles,
        color: "blue"
    },
    {
        id: "Backend Development",
        title: "Backend Development",
        description: "Robust, scalable, and secure server-side logic and APIs.",
        icon: Send,
        color: "indigo"
    },
    {
        id: "Full Stack Development",
        title: "Full Stack Development",
        description: "End-to-end development of complex web systems.",
        icon: Briefcase,
        color: "purple"
    },
    {
        id: "UI/UX Design",
        title: "UI/UX Design",
        description: "Intuitive user experiences and stunning interface designs.",
        icon: Sparkles,
        color: "pink"
    },
    {
        id: "Bug Fix / Optimization",
        title: "Bug Fix / Optimization",
        description: "Technical debt resolution and performance engineering.",
        icon: Clock,
        color: "green"
    },
    {
        id: "Database Design",
        title: "Database Design",
        description: "Secure, optimized, and scalable data architectures.",
        icon: IndianRupee,
        color: "yellow"
    },
    {
        id: "DevOps / Cloud",
        title: "DevOps / Cloud",
        description: "Cloud infrastructure, CI/CD, and system reliability.",
        icon: Send,
        color: "blue"
    },
    {
        id: "Other",
        title: "Other",
        description: "Custom engineering solutions tailored to your unique needs.",
        icon: Sparkles,
        color: "indigo"
    }
] as const;

export default function HirePage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("services");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { data: availability } = useSWR("/api/availability", fetcher);
    const status = availability?.status || "available";

    const containerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm<HireFormData>({
        resolver: zodResolver(hireSchema) as any,
        defaultValues: {
            name: "",
            email: "",
            company: "",
            description: "",
            referenceLink: "",
            contactMethod: "Email",
            source: "hire_page",
            selectedService: "Website Development",
            budgetRange: "$500 – $1000",
            timeline: "1 month",
            projectType: "Website Development"
        }
    });

    const selectedService = watch("selectedService");
    const formData = watch();

    const onSubmit = async (data: HireFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch(getApiUrl('/api/hire'), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await response.json().catch(() => ({ success: false, error: "Network response parse failure" }));

            if (response.ok && json.success !== false) {
                setIsSuccess(true);
                setStep("success");
            } else {
                setError(json.error || `Error ${response.status}: ${response.statusText}`);
            }
        } catch (err: any) {
            setError(`Network error: ${err.message || "Failed to fetch"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const nextStep = () => {
        if (step === "services") {
            setStep("details");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (step === "details") {
            setStep("services");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex flex-col md:flex-row">
            {/* Left Sidebar - High Conversion Branding */}
            <div className="w-full md:w-80 lg:w-96 bg-[#070707] border-b md:border-b-0 md:border-r border-white/5 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
                </div>

                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Portfolio</span>
                    </Link>

                    <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-[0_0_30px_rgba(37,99,235,0.3)] shrink-0 border border-blue-400/30">
                        <Sparkles size={32} />
                    </div>

                    <div className="space-y-4 mb-12">
                        <h1 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
                            Let&apos;s Build <span className="text-blue-500 italic block mt-2">Extraordinary</span>
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
                            Transforming complex requirements into seamless, high-performance digital systems.
                        </p>
                    </div>

                    <nav className="space-y-8">
                        {[
                            { id: "services", label: "Service Selection", step: 1 },
                            { id: "details", label: "Strategic Blueprint", step: 2 },
                            { id: "success", label: "Mission Confirmed", step: 3 }
                        ].map((s, i) => (
                            <div key={s.id} className="flex items-center gap-4 group">
                                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xs font-bold transition-all duration-500
                                    ${step === s.id
                                        ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                        : (isSuccess && s.step < 3 ? "bg-green-500/20 border-green-500 text-green-500" : "border-white/10 text-gray-600 bg-white/[0.02]")}`}
                                >
                                    {isSuccess && s.step < 3 ? <CheckCircle2 size={16} /> : s.step}
                                </div>
                                <span className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300
                                    ${step === s.id ? "text-white" : "text-gray-600"}`}
                                >
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="relative z-10 w-full mt-12">
                    <LiveStatusBadge variant="hire" />
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
                    <m.div
                        initial={{ width: "33.33%" }}
                        animate={{
                            width: step === "services" ? "33.33%" : step === "details" ? "66.66%" : "100%"
                        }}
                        className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    />
                </div>

                <div className="max-w-4xl mx-auto px-8 md:px-16 py-12 md:py-24">
                    <form onSubmit={handleSubmit(onSubmit)} className="min-h-[600px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {step === "success" ? (
                                <m.div
                                    key="success"
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className="flex-grow flex flex-col items-center justify-center text-center space-y-12 py-12"
                                >
                                    <m.div variants={itemVariants} className="w-32 h-32 bg-green-500/10 rounded-[3rem] flex items-center justify-center text-green-500 mb-4 border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
                                        <CheckCircle2 size={64} />
                                    </m.div>

                                    <div className="space-y-6">
                                        <m.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none">
                                            Transmission <span className="text-green-500">Confirmed</span>
                                        </m.h2>
                                        <m.div variants={itemVariants} className="h-1.5 w-32 bg-gradient-to-r from-green-500 to-transparent mx-auto rounded-full" />
                                    </div>

                                    <m.p variants={itemVariants} className="text-gray-400 leading-relaxed text-xl max-w-xl mx-auto font-medium">
                                        Your project briefing has been successfully received. I will review the technical requirements and respond within 24 hours.
                                    </m.p>

                                    <m.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 w-full max-w-2xl space-y-8 backdrop-blur-3xl shadow-2xl mt-8">
                                        <p className="text-[12px] text-gray-500 font-black uppercase tracking-[0.4em]">Next Phase Protocols</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                            <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 group hover:border-green-500/30 transition-colors">
                                                <p className="text-white font-black text-xs uppercase tracking-widest mb-3 group-hover:text-green-400 transition-colors">Strategic Review</p>
                                                <p className="text-[11px] text-gray-500 leading-relaxed">I am analyzing your goals to create a technical roadmap and complexity mapping tailored to your needs.</p>
                                            </div>
                                            <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 group hover:border-blue-500/30 transition-colors">
                                                <p className="text-white font-black text-xs uppercase tracking-widest mb-3 group-hover:text-blue-400 transition-colors">Direct Connection</p>
                                                <p className="text-[11px] text-gray-500 leading-relaxed">A formal engineering proposal will be dispatched to <span className="text-blue-400">{formData.email}</span> shortly.</p>
                                            </div>
                                        </div>
                                    </m.div>

                                    <m.div variants={itemVariants}>
                                        <Link
                                            href="/"
                                            className="btn-primary py-5 px-12 group flex items-center gap-3 text-sm"
                                        >
                                            Return to Dashboard
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </m.div>
                                </m.div>
                            ) : (
                                <div key={step} className="flex-grow flex flex-col">
                                    {step === "services" && (
                                        <m.div
                                            key="services"
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, x: -20 }}
                                            variants={containerVariants}
                                            className="space-y-12"
                                        >
                                            <m.div variants={itemVariants}>
                                                <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Phase 01 / Selection</h2>
                                                <p className="text-3xl font-black text-white uppercase tracking-tight">Focusing the Objective</p>
                                            </m.div>

                                            <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                {services.map((service) => (
                                                    <div
                                                        key={service.id}
                                                        onClick={() => setValue("selectedService", service.id as any)}
                                                        className={`p-8 bg-white/[0.02] border rounded-[2.5rem] transition-all cursor-pointer group hover:bg-white/[0.04] ${selectedService === service.id ? "border-blue-600 bg-blue-600/[0.03] ring-1 ring-blue-500/20" : "border-white/5"}`}
                                                    >
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${selectedService === service.id ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]" : "bg-white/5 text-gray-400"}`}>
                                                            <service.icon size={28} />
                                                        </div>
                                                        <h3 className="text-white text-lg font-bold mb-3">{service.title}</h3>
                                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">{service.description}</p>
                                                    </div>
                                                ))}
                                            </m.div>
                                        </m.div>
                                    )}

                                    {step === "details" && (
                                        <m.div
                                            key="details"
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, x: -20 }}
                                            variants={containerVariants}
                                            className="space-y-12"
                                        >
                                            <m.div variants={itemVariants}>
                                                <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Phase 02 / Blueprinting</h2>
                                                <p className="text-3xl font-black text-white uppercase tracking-tight">Strategic Requirements</p>
                                            </m.div>

                                            <div className="space-y-10">
                                                <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 italic">Collaborator Identity*</label>
                                                        <input
                                                            {...register("name")}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                            placeholder="Full Name"
                                                        />
                                                        {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.name.message as string}</p>}
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 italic">Routing Endpoint*</label>
                                                        <input
                                                            {...register("email")}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                            placeholder="Email Address"
                                                        />
                                                        {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.email.message as string}</p>}
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 italic">Organization (Optional)</label>
                                                        <input
                                                            {...register("company")}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                            placeholder="Company Name"
                                                        />
                                                    </div>
                                                </m.div>

                                                <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3 text-white">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 italic">Engineering Domain*</label>
                                                        <select
                                                            {...register("projectType")}
                                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                                        >
                                                            {[
                                                                "UI/UX Design",
                                                                "Frontend Development",
                                                                "Backend Development",
                                                                "Full Stack Development",
                                                                "DevOps / Cloud",
                                                                "Database Design",
                                                                "Bug Fix / Optimization",
                                                                "Website Development",
                                                                "Web Application",
                                                                "Other"
                                                            ].map(type => <option key={type} value={type} className="text-white bg-[#0a0a0a]">{type}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 italic">Intelligence Reference (Optional)</label>
                                                        <input
                                                            {...register("referenceLink")}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                            placeholder="Link to design or reference site"
                                                        />
                                                    </div>
                                                </m.div>

                                                <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-5">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2 italic">Capital Allocation</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {["Under $500", "$500 – $1000", "$1000 – $3000", "$3000+"].map((range) => (
                                                                <button
                                                                    key={range}
                                                                    type="button"
                                                                    onClick={() => setValue("budgetRange", range as any)}
                                                                    className={`px-5 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.budgetRange === range ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white/[0.03] border-white/5 text-gray-600 hover:border-white/10"}`}
                                                                >
                                                                    {range}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-5">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2 italic">Temporal Constraints</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {["ASAP", "1–2 weeks", "1 month", "Flexible"].map((time) => (
                                                                <button
                                                                    key={time}
                                                                    type="button"
                                                                    onClick={() => setValue("timeline", time as any)}
                                                                    className={`px-5 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.timeline === time ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white/[0.03] border-white/5 text-gray-600 hover:border-white/10"}`}
                                                                >
                                                                    {time}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </m.div>

                                                <m.div variants={itemVariants} className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Technical Brief / Vision*</label>
                                                    <textarea
                                                        {...register("description")}
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-10 py-8 text-sm text-white focus:border-blue-500 outline-none transition-all min-h-[220px] resize-none leading-relaxed placeholder:text-gray-700 font-medium"
                                                        placeholder="Detail the technical landscape, key objectives, and the unique challenges you want to solve..."
                                                    />
                                                    {errors.description && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.description.message as string}</p>}
                                                </m.div>

                                                <m.div variants={itemVariants} className="space-y-5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2 italic">Preferred Synchronization Method</label>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {["Email", "LinkedIn", "WhatsApp"].map((method) => (
                                                            <button
                                                                key={method}
                                                                type="button"
                                                                onClick={() => setValue("contactMethod", method as any)}
                                                                className={`px-5 py-5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.contactMethod === method ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20" : "bg-white/[0.03] border-white/10 text-gray-600 hover:border-white/20"}`}
                                                            >
                                                                {method}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </m.div>
                                            </div>
                                        </m.div>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <m.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 text-[11px] font-black uppercase tracking-[0.2em] text-center"
                            >
                                {error}
                            </m.div>
                        )}

                        {/* Navigation Actions */}
                        {!isSuccess && ( step !== "success" ) && (
                            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col-reverse md:flex-row md:items-center justify-between gap-8">
                                {step !== "services" ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center justify-center gap-3 text-gray-600 hover:text-white transition-all group"
                                    >
                                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Previous Phase</span>
                                    </button>
                                ) : <div className="hidden md:block" />}

                                <div className="flex gap-4 w-full md:w-auto">
                                    {step === "details" ? (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-16 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em] group shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? <span className="animate-pulse">Analyzing...</span> : (
                                                <>
                                                    Submit Brief
                                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="w-full md:w-auto px-16 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[1.5rem] flex items-center justify-center gap-4 transition-all font-black text-xs uppercase tracking-[0.2em] group"
                                        >
                                            Continue Phase
                                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
