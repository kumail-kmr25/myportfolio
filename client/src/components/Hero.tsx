"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Search, Target, Cpu, Users, Briefcase } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useHireModal } from "@/context/HireModalContext";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

const roles = [
    "Full Stack Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Critical Bug Fix Expert"
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const premiumEase = [0.16, 1, 0.3, 1];

    useEffect(() => {
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 30, // Increased sensitivity
                    y: (e.clientY / window.innerHeight - 0.5) * 30,
                });
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typeSpeed = isDeleting ? 30 : 80; // Refined typing speed

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentRole) {
                setTimeout(() => setIsDeleting(true), 2500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            } else {
                setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
            }
        }, text === "" && !isDeleting ? 500 : typeSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, roleIndex]);

    return (
        <section id="home" aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] selection:bg-blue-500/30 pt-24 lg:pt-20">
            {/* Elite Technical Infrastructure */}
            <div className="absolute inset-0 z-0">
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-150 mix-blend-overlay" />

                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, ease: premiumEase as any }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 opacity-[0.1]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                            backgroundSize: '40px 40px',
                            transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] z-10" />

                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        transition={{ duration: 1.5, ease: premiumEase as any }}
                        className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent z-10"
                    />
                </m.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Column: Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: premiumEase as any }}
                            className="flex flex-col items-center lg:items-start gap-6 mb-8"
                        >
                            <div className="relative">
                                <span className="relative inline-block py-2 px-5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 backdrop-blur-2xl transition-all">
                                    Full-Stack Engineer & Architect
                                </span>
                            </div>
                        </m.div>

                        <m.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: premiumEase as any }}
                            className="text-fluid-h1 font-black font-display text-white mb-8 tracking-tighter leading-[0.95] select-none text-center lg:text-left"
                        >
                            Building <span className="text-blue-500 italic">High-Performance</span> Digital Ecosystems.
                        </m.h1>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1.2, ease: premiumEase as any }}
                            className="text-gray-400 text-lg sm:text-xl max-w-xl mb-12 font-medium leading-relaxed"
                        >
                            Full-Stack Developer specializing in Next.js, Node.js & DevOps — helping startups and businesses launch production-ready platforms that perform.
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1, ease: premiumEase as any }}
                            className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center lg:justify-start w-full sm:w-auto"
                        >
                            <button
                                onClick={() => {
                                    const el = document.getElementById('projects');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative w-full sm:w-auto px-10 py-5 bg-blue-600 border border-blue-500 text-white rounded-2xl font-bold text-xs tracking-widest uppercase transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Explorer Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <Link
                                href="/audit"
                                prefetch={true}
                                className="group relative w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs tracking-widest uppercase transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-3xl flex items-center justify-center gap-2"
                            >
                                <Search size={16} className="text-blue-500" />
                                Audit Site
                            </Link>
                        </m.div>

                        {/* Audience Intent Picker */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1, ease: premiumEase as any }}
                            className="mt-16 pt-16 border-t border-white/5"
                        >
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8 lg:text-left text-center">
                                Select Your Focus
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { 
                                        label: "Recruiters", 
                                        desc: "Technical deep-dives & audits.", 
                                        href: "/recruiters", 
                                        icon: Cpu, 
                                        color: "group-hover:text-blue-500",
                                        borderColor: "hover:border-blue-500/30"
                                    },
                                    { 
                                        label: "Clients", 
                                        desc: "ROI metrics & business value.", 
                                        href: "/clients", 
                                        icon: Target, 
                                        color: "group-hover:text-emerald-500",
                                        borderColor: "hover:border-emerald-500/30"
                                    },
                                    { 
                                        label: "HR Managers", 
                                        desc: "Culture fit & tenure maps.", 
                                        href: "/career", 
                                        icon: Briefcase, 
                                        color: "group-hover:text-purple-500",
                                        borderColor: "hover:border-purple-500/30"
                                    }
                                ].map((intent) => (
                                    <Link 
                                        key={intent.label}
                                        href={intent.href}
                                        className={`group p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 ${intent.borderColor} hover:bg-white/[0.04] hover:-translate-y-1`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${intent.color}`}>
                                            <intent.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{intent.label}</h4>
                                            <p className="text-[10px] text-gray-500 font-medium">{intent.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </m.div>

                    </div>

                    {/* Right Column: Visual */}
                    <div className="flex-1 relative order-first lg:order-last mb-12 lg:mb-0">
                        <m.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: premiumEase as any }}
                            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] mx-auto"
                        >

                            {/* Decorative Elements */}
                             <m.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-blue-500/20 rounded-full"
                            />
                            <m.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-8 border border-dashed border-purple-500/10 rounded-full"
                            />
                            
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl group ring-8 ring-white/[0.02]">
                                <Image
                                    src="/profile.jpg"
                                    alt="KK"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 450px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-40" />
                            </div>
                        </m.div>
                    </div>
                </div>
            </div>

        </section>
    );
}
