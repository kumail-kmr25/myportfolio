"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
                        <div className="hidden md:flex w-80 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-12 shadow-xl shrink-0">
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
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all
                                                ${step === s.id ? "bg-white border-white text-blue-600" : "border-white/30 text-white/50"}`}
                                            >
                                                {s.step}
                                            </div>
                                            <span className={`text-[11px] font-bold uppercase tracking-widest transition-all
                                                ${step === s.id ? "text-white" : "text-white/40"}`}
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
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex-grow flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto py-12"
                                            >
                                                <div className="w-24 h-24 bg-green-500/10 rounded-[2rem] flex items-center justify-center text-green-500 mb-8 border border-green-500/20 shadow-lg shadow-green-500/5">
                                                    <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
                                                </div>
                                                <div className="space-y-4">
                                                    <h2 className="text-4xl font-black text-white uppercase tracking-tight">Project Brief Received</h2>
                                                    <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
                                                </div>
                                                <p className="text-gray-400 leading-relaxed text-lg">
                                                    Thank you for sharing your vision, <span className="text-white font-bold">{formData.name}</span>.
                                                    I&apos;ve successfully received your brief for <span className="text-blue-400 font-bold">{formData.selectedService}</span>.
                                                </p>
                                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 w-full mt-8 space-y-4">
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Next Steps</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                            <p className="text-white font-bold text-sm mb-1">Brief Review</p>
                                                            <p className="text-[10px] text-gray-500 leading-normal">I&apos;ll analyze your requirements and prepare a preliminary strategy within 12-24 hours.</p>
                                                        </div>
                                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                            <p className="text-white font-bold text-sm mb-1">Direct Contact</p>
                                                            <p className="text-[10px] text-gray-500 leading-normal">You&apos;ll receive a confirmation email shortly. I&apos;ll reach out via <span className="text-blue-400">{formData.email}</span> to discuss the next steps.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors pt-8"
                                                >
                                                    Click anywhere to close
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <div key={step} className="flex-grow flex flex-col">
                                                {step === "services" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-10"
                                                    >
                                                        <div>
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
                                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Step 1: Select Your Service</p>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === "details" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-10"
                                                    >
                                                        <div>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Setting the <span className="text-blue-500 italic block mt-2">stage</span></h2>
                                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Step 2: Budget & Timeline</p>
                                                        </div>

                                                        <div className="space-y-8">
                                                            <div className="space-y-4">
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
                                                            </div>

                                                            <div className="space-y-4">
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
                                                            </div>

                                                            <div className="space-y-4">
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
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === "vision" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-10"
                                                    >
                                                        <div>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Share your <span className="text-blue-500 italic block mt-2">vision</span></h2>
                                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Step 3: Project Requirements</p>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Describe what you want to achieve</label>
                                                                <textarea
                                                                    {...register("description")}
                                                                    placeholder="Goals, features, target audience..."
                                                                    className="w-full min-h-[160px] bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-white focus:border-blue-500 outline-none transition-all resize-none"
                                                                />
                                                                {errors.description?.message && <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.description.message as string}</p>}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === "contact" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-10"
                                                    >
                                                        <div>
                                                            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">Let&apos;s stay in <span className="text-blue-500 italic block mt-2">touch</span></h2>
                                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Step 4: Contact Information</p>
                                                        </div>

                                                        <div className="space-y-8">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Full Name</label>
                                                                    <input
                                                                        {...register("name")}
                                                                        type="text"
                                                                        autoComplete="name"
                                                                        placeholder="John Doe"
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm md:text-base min-h-[48px] text-white focus:border-blue-500 outline-none transition-all"
                                                                    />
                                                                    {errors.name?.message && <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.name.message as string}</p>}
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Work Email</label>
                                                                    <input
                                                                        {...register("email")}
                                                                        type="email"
                                                                        autoComplete="email"
                                                                        placeholder="john@company.com"
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm md:text-base min-h-[48px] text-white focus:border-blue-500 outline-none transition-all"
                                                                    />
                                                                    {errors.email?.message && <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.email.message as string}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Company Name (Optional)</label>
                                                                <input
                                                                    {...register("company")}
                                                                    type="text"
                                                                    autoComplete="organization"
                                                                    placeholder="Company Inc."
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm md:text-base min-h-[48px] text-white focus:border-blue-500 outline-none transition-all"
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {error && (
                                                    <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-in fade-in zoom-in duration-300">
                                                        {error}
                                                    </div>
                                                )}

                                                {/* Actions */}
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
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}


