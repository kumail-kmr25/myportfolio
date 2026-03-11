"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
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
    const { openModal } = useHireModal();

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
        <section id="home" aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] selection:bg-blue-500/30 pt-24">
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

                    {/* Orbital Light Sources */}
                    <m.div
                        animate={{
                            x: [0, 50, -50, 0],
                            y: [0, -30, 30, 0],
                            scale: [1, 1.2, 0.9, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 h-[800px] w-[800px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"
                    />
                    <m.div
                        animate={{
                            x: [0, -50, 50, 0],
                            y: [0, 30, -30, 0],
                            scale: [1.1, 0.9, 1.2, 1.1],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 h-[800px] w-[800px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"
                    />

                    <m.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.03, scale: 1 }}
                        transition={{ duration: 1.5, ease: premiumEase as any }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                    >
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid-hero" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-hero)" />
                        </svg>
                    </m.div>
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
                                <m.div
                                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-blue-500/10 blur-xl rounded-full"
                                />
                                <span className="relative inline-block py-2 px-5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 backdrop-blur-2xl transition-all hover:border-blue-500/30 hover:bg-blue-500/5 group">
                                    <span className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        Full-Stack Developer
                                    </span>
                                </span>
                            </div>
                        </m.div>

                        <m.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: premiumEase as any }}
                            className="text-6xl sm:text-7xl lg:text-8xl font-black font-display text-white mb-6 tracking-tighter leading-[0.9] select-none"
                        >
                            Kumail <span className="text-blue-500 italic">KMR</span>
                        </m.h1>

                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1.2, ease: premiumEase as any }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-6 tracking-tight"
                        >
                            Building <span className="text-white">Scalable</span> Web Platforms
                        </m.h2>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1.2, ease: premiumEase as any }}
                            className="text-gray-500 text-lg sm:text-xl max-w-xl mb-12 font-medium leading-relaxed"
                        >
                            I design and develop modern web applications with reliable architecture, secure systems, and production-ready deployment.
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1, ease: premiumEase as any }}
                            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto"
                        >

                            <Link
                                href="#projects"
                                prefetch={false}
                                className="group relative w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:scale-[1.05] active:scale-[0.95] shadow-xl shadow-blue-500/20 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    View Projects
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal();
                                }}
                                className="group relative w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.05] active:scale-[0.95] backdrop-blur-3xl"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Hire Me
                                </span>
                            </button>

                            <Link
                                href="#journey"
                                prefetch={false}
                                className="group relative w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-gray-400 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:text-white hover:border-white/20 hover:scale-[1.05] active:scale-[0.95]"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    My Journey
                                </span>
                            </Link>
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
                            
                            <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                                <Image
                                    src="/profile.jpg"
                                    alt="Kumail KMR"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                    quality={90}
                                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 450px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-40" />
                            </div>


                            {/* Floating Badges */}
                            <m.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 p-4 rounded-2xl bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-md hidden sm:block"
                            >
                                <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Status</div>
                                <div className="text-[10px] font-bold text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Available for Hire
                                </div>
                            </m.div>
                        </m.div>
                    </div>
                </div>
            </div>

        </section>
    );
}
