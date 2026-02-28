"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    X,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Clock,
    Briefcase,
    IndianRupee,
    Sparkles,
    Send,
    ArrowRight,
    AlertCircle
} from "lucide-react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hireSchema, type HireFormData } from "@portfolio/shared";
import { useHireModal } from "@/context/HireModalContext";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Step = "services" | "details" | "vision" | "contact" | "success";

const services = [
    {
        id: "Web Development (Full Stack)",
        title: "Full Stack Web App",
        description: "End-to-end development with modern stacks (Next.js, Node.js, Prisma).",
        icon: Sparkles,
        color: "blue"
    },
    {
        id: "Frontend Development (React/Next.js)",
        title: "Frontend Excellence",
        description: "Transforming designs into pixel-perfect, interactive React applications.",
        icon: Briefcase,
        color: "indigo"
    },
    {
        id: "Backend Development (Node.js/Prisma)",
        title: "Robust Backends",
        description: "Scalable APIs, database architectures, and secure server logic.",
        icon: Send,
        color: "purple"
    },
    {
        id: "UI/UX Design & Prototyping",
        title: "UI/UX Design",
        description: "Creating intuitive user experiences and premium visual identities.",
        icon: Sparkles,
        color: "pink"
    },
    {
        id: "Performance Optimization",
        title: "Speed Optimization",
        description: "Achieving perfect Lighthouse scores and blazing fast performance.",
        icon: Clock,
        color: "green"
    },
    {
        id: "Bug Fixing & Error Resolution",
        title: "Debug & Fix",
        description: "Resolving complex technical issues and refining existing codebases.",
        icon: IndianRupee,
        color: "yellow"
    }
] as const;

export default function HireMeModal() {
    const { isOpen, closeModal } = useHireModal();
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
        trigger,
        formState: { errors },
        reset
    } = useForm<HireFormData>({
        resolver: zodResolver(hireSchema) as any,
        defaultValues: {
            name: "",
            email: "",
            company: "",
            description: "",
            source: "hire_me",
            selectedService: "Web Development (Full Stack)",
            budgetRange: "₹25,000 – ₹50,000",
            timeline: "1 month",
            projectType: "New Project from scratch"
        }
    });

    const selectedService = watch("selectedService");
    const formData = watch();

    const onSubmit = async (data: HireFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const apiUrl = "";
            const response = await fetch(`/api/hire`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        setStep("services");
                        setIsSuccess(false);
                        reset();
                    }, 500);
                }, 3000);
            } else {
                const errorData = await response.json().catch(() => null);
                if (errorData) {
                    setError(errorData.error + (errorData.message ? `: ${errorData.message}` : "") || "Something went wrong.");
                } else {
                    setError(`Error ${response.status}: ${response.statusText}`);
                }
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

    const nextStep = async () => {
        if (step === "services") {
            setStep("details");
            return;
        }

        if (step === "details") {
            setStep("vision");
            return;
        }

        if (step === "vision") {
            const isValid = await trigger("description");
            if (isValid) setStep("contact");
            return;
        }
    };

    const prevStep = () => {
        if (step === "details") setStep("services");
        if (step === "vision") setStep("details");
        if (step === "contact") setStep("vision");
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-6xl h-full max-h-[850px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Left Sidebar - Progress */}
                        <div className="hidden md:flex w-80 bg-[#070707] border-r border-white/5 p-12 flex-col justify-between relative overflow-hidden shrink-0">
                            {/* Premium Background Accents */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-12 shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0 border border-blue-400/30">
                                    <Sparkles size={24} />
                                </div>

                                <nav className="space-y-8">
                                    {[
                                        { id: "services", label: "Service", step: 1 },
                                        { id: "details", label: "Project Details", step: 2 },
                                        { id: "vision", label: "Project Vision", step: 3 },
                                        { id: "contact", label: "Your Info", step: 4 }
                                    ].map((s, i) => (
                                        <div key={s.id} className="flex items-center gap-4 group">
                                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300
                                                ${step === s.id
                                                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                                    : "border-white/10 text-gray-600 bg-white/[0.02]"}`}
                                            >
                                                {s.step}
                                            </div>
                                            <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300
                                                ${step === s.id ? "text-white" : "text-gray-600"}`}
                                            >
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="relative z-10 w-full mt-12 pb-8">
                                <LiveStatusBadge variant="hire" />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] relative overflow-hidden">
                            {/* Visual Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
                                <motion.div
                                    initial={{ width: "25%" }}
                                    animate={{
                                        width: step === "services" ? "25%" :
                                            step === "details" ? "50%" :
                                                step === "vision" ? "75%" : "100%"
                                    }}
                                    className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                />
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between p-8 md:p-12 pb-0 shrink-0">
                                <button onClick={closeModal} className="md:hidden w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white">
                                    <X size={20} />
                                </button>
                                <div className="hidden md:block" />
                                <button onClick={closeModal} className="hidden md:flex w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl items-center justify-center text-white transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div ref={containerRef} className="flex-grow overflow-y-auto px-8 md:px-20 py-12 custom-scrollbar relative">
                                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial="hidden"
                                                animate="visible"
                                                variants={containerVariants}
                                                className="flex-grow flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto py-12"
                                            >
                                                <motion.div variants={itemVariants} className="w-24 h-24 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center text-green-500 mb-4 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                                    <CheckCircle2 size={48} />
                                                </motion.div>

                                                <div className="space-y-4">
                                                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                                                        Transmission <span className="text-green-500">Confirmed</span>
                                                    </motion.h2>
                                                    <motion.div variants={itemVariants} className="h-1 w-24 bg-gradient-to-r from-green-500 to-transparent mx-auto rounded-full" />
                                                </div>

                                                <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed text-lg font-medium">
                                                    Your brief for <span className="text-white">{formData.selectedService}</span> has been securely routed. I&apos;ll analyze the requirements and initialize contact within 24 hours.
                                                </motion.p>

                                                <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 w-full mt-8 space-y-6 backdrop-blur-3xl shadow-2xl">
                                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Protocol Breakdown</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                                        <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-green-500/30 transition-colors">
                                                            <p className="text-white font-black text-xs uppercase tracking-widest mb-2 group-hover:text-green-400 transition-colors">Strategic Review</p>
                                                            <p className="text-[10px] text-gray-500 leading-relaxed">Technical analysis of goals and complexity mapping for your specific project needs.</p>
                                                        </div>
                                                        <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                                                            <p className="text-white font-black text-xs uppercase tracking-widest mb-2 group-hover:text-blue-400 transition-colors">Direct Outreach</p>
                                                            <p className="text-[10px] text-gray-500 leading-relaxed">A formal proposal will be dispatched to <span className="text-blue-400">{formData.email}</span> with next steps.</p>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <motion.button
                                                    variants={itemVariants}
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-all pt-8 flex items-center gap-4"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    Session Finalized • Click to close
                                                </motion.button>
                                            </motion.div>
                                        ) : (
                                            <div key={step} className="flex-grow flex flex-col">
                                                {step === "services" && (
                                                    <motion.div
                                                        key="services"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit={{ opacity: 0, x: -20 }}
                                                        variants={containerVariants}
                                                        className="space-y-10"
                                                    >
                                                        <motion.div variants={itemVariants}>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Let&apos;s build something <span className="text-blue-500 italic block mt-2">extraordinary</span></h2>
                                                            {status === 'booked' && (
                                                                <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                                                                        <AlertCircle className="text-red-500" size={24} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-white uppercase tracking-widest">I&apos;m currently fully booked.</p>
                                                                        <p className="text-[10px] text-gray-500 font-medium">
                                                                            Next availability: <span className="text-red-400">{availability?.nextSlot ? new Date(availability.nextSlot).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }) : 'Soon'}</span>. You can still submit your project request.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Step 1: Select Your Service</p>
                                                        </motion.div>

                                                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {services.map((service) => (
                                                                <div
                                                                    key={service.id}
                                                                    onClick={() => setValue("selectedService", service.id as any)}
                                                                    className={`p-6 bg-white/[0.03] border rounded-[2rem] transition-all cursor-pointer group hover:bg-white/[0.06] ${selectedService === service.id ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20" : "border-white/5"}`}
                                                                >
                                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${selectedService === service.id ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400"}`}>
                                                                        <service.icon size={24} />
                                                                    </div>
                                                                    <h3 className="text-white font-bold mb-2">{service.title}</h3>
                                                                    <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    </motion.div>
                                                )}

                                                {step === "details" && (
                                                    <motion.div
                                                        key="details"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit={{ opacity: 0, x: -20 }}
                                                        variants={containerVariants}
                                                        className="space-y-10"
                                                    >
                                                        <motion.div variants={itemVariants}>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Setting the <span className="text-blue-500 italic block mt-2">stage</span></h2>
                                                            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Step 2: Budget & Timeline</p>
                                                        </motion.div>

                                                        <div className="space-y-8">
                                                            <motion.div variants={itemVariants} className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Budget Range (Expected)</label>
                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                                    {["₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000+", "Flexible / To be discussed"].map((range) => (
                                                                        <button
                                                                            key={range}
                                                                            type="button"
                                                                            onClick={() => setValue("budgetRange", range as any)}
                                                                            className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.budgetRange === range ? "bg-blue-600 border-blue-600 text-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10"}`}
                                                                        >
                                                                            {range.includes("/") ? "Flexible" : range}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>

                                                            <motion.div variants={itemVariants} className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Estimated Timeline</label>
                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                                    {["Urgent (less than 1 week)", "1–2 weeks", "1 month", "2–3 months", "Flexible"].map((time) => (
                                                                        <button
                                                                            key={time}
                                                                            type="button"
                                                                            onClick={() => setValue("timeline", time as any)}
                                                                            className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.timeline === time ? "bg-blue-600 border-blue-600 text-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10"}`}
                                                                        >
                                                                            {time.includes("Urgent") ? "Urgent" : time}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>

                                                            <motion.div variants={itemVariants} className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">What are we starting?</label>
                                                                <select
                                                                    {...register("projectType")}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                                                >
                                                                    <option value="New Project from scratch" className="bg-[#0f0f0f]">New Project from scratch</option>
                                                                    <option value="Existing Project (Maintenance/Update)" className="bg-[#0f0f0f]">Existing Project (Maintenance/Update)</option>
                                                                    <option value="Long-term Partnership" className="bg-[#0f0f0f]">Long-term Partnership</option>
                                                                    <option value="Consulting" className="bg-[#0f0f0f]">Consulting</option>
                                                                    <option value="Other" className="bg-[#0f0f0f]">Other</option>
                                                                </select>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === "vision" && (
                                                    <motion.div
                                                        key="vision"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit={{ opacity: 0, x: -20 }}
                                                        variants={containerVariants}
                                                        className="space-y-10"
                                                    >
                                                        <motion.div variants={itemVariants}>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Sharing the <span className="text-blue-500 italic block mt-2">vision</span></h2>
                                                            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Step 3: Project Details</p>
                                                        </motion.div>

                                                        <div className="space-y-8">
                                                            <motion.div variants={itemVariants} className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Tell me about your project goals</label>
                                                                <textarea
                                                                    {...register("description")}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-sm text-white focus:border-blue-500 outline-none transition-all min-h-[200px] resize-none leading-relaxed"
                                                                    placeholder="What are we building? What problems are we solving?"
                                                                />
                                                                {errors.description && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.description.message as string}</p>}
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === "contact" && (
                                                    <motion.div
                                                        key="contact"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit={{ opacity: 0, x: -20 }}
                                                        variants={containerVariants}
                                                        className="space-y-10"
                                                    >
                                                        <motion.div variants={itemVariants}>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Final <span className="text-blue-500 italic block mt-2">handshake</span></h2>
                                                            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Step 4: Contact Information</p>
                                                        </motion.div>

                                                        <div className="space-y-8">
                                                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                                                                    <input
                                                                        {...register("name")}
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                                                        placeholder="John Doe"
                                                                    />
                                                                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.name.message as string}</p>}
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Work Email</label>
                                                                    <input
                                                                        {...register("email")}
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                                                        placeholder="john@company.com"
                                                                    />
                                                                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.email.message as string}</p>}
                                                                </div>
                                                            </motion.div>

                                                            <motion.div variants={itemVariants} className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Company Name (Optional)</label>
                                                                <input
                                                                    {...register("company")}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                                                    placeholder="Company Inc."
                                                                />
                                                            </motion.div>

                                                            <motion.div variants={itemVariants} className="p-8 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 backdrop-blur-3xl">
                                                                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                                                                    By submitting this brief, you initialize a technical request. I will analyze the parameters and respond via <span className="text-blue-400">{formData.email || 'provided email'}</span> within one business cycle.
                                                                </p>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                    </AnimatePresence>

                                    {error && (
                                        <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-in fade-in zoom-in duration-300">
                                            {error}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    {!isSuccess && (
                                        <div className="mt-auto pt-12 flex flex-col-reverse md:flex-row md:items-center justify-between shrink-0 gap-4">
                                            {step !== "services" ? (
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="flex items-center justify-center gap-3 text-gray-500 hover:text-white transition-colors w-full md:w-auto py-3 md:py-0"
                                                >
                                                    <ChevronLeft size={20} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Previous</span>
                                                </button>
                                            ) : <div className="hidden md:block" />}

                                            <div className="flex gap-4 w-full md:w-auto">
                                                {step === "contact" ? (
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl md:min-w-[200px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest group shadow-2xl shadow-blue-500/20 transition-all disabled:opacity-50 min-h-[48px]"
                                                    >
                                                        {isSubmitting ? <span className="animate-pulse">Submitting...</span> : (
                                                            <>
                                                                Send Brief
                                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                            </>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest group min-h-[48px]"
                                                    >
                                                        Continue
                                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}


