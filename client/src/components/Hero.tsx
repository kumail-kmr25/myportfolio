"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useHireModal } from "@/context/HireModalContext";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

const roles = ["Full Stack Developer", "DevOps Engineer", "UI/UX Designer"];

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

                <motion.div
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
                    <motion.div
                        animate={{
                            x: [0, 50, -50, 0],
                            y: [0, -30, 30, 0],
                            scale: [1, 1.2, 0.9, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 h-[800px] w-[800px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 50, 0],
                            y: [0, 30, -30, 0],
                            scale: [1.1, 0.9, 1.2, 1.1],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 h-[800px] w-[800px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"
                    />

                    <motion.div
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
                    </motion.div>
                </motion.div>
            </div>

            <div className="section-container relative z-10 text-center">
                <motion.div
                    style={{
                        x: mousePos.x * 0.4,
                        y: mousePos.y * 0.4,
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1.2,
                                ease: premiumEase as any,
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { ease: premiumEase as any } }
                        }}
                        className="flex flex-col items-center gap-6 mb-12"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -inset-4 bg-blue-500/10 blur-xl rounded-full"
                            />
                            <span className="relative inline-block py-2.5 px-6 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 backdrop-blur-2xl transition-all hover:border-blue-500/30 hover:bg-blue-500/5 group">
                                <span className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Technical Intervention Active
                                </span>
                            </span>
                        </div>
                        <LiveStatusBadge variant="hero" />
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: premiumEase as any } }
                        }}
                        className="text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-white mb-10 tracking-tighter leading-[0.85] select-none"
                    >
                        Kumail <span className="text-blue-500 italic">Kmr</span>
                    </motion.h1>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { ease: premiumEase as any } }
                        }}
                        className="h-12 mb-16"
                    >
                        <span className="text-xl md:text-3xl text-gray-500 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                            Protocol <span className="text-white bg-white/5 px-4 py-1 rounded-lg border border-white/10">{text}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-blue-500"
                            >
                                _
                            </motion.span>
                        </span>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.4, ease: premiumEase as any } }
                        }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }}
                            className="group relative px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-blue-500/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-4">
                                Initialize Partnership
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                            </span>
                        </button>

                        <Link
                            href="#projects"
                            prefetch={false}
                            className="group relative px-12 py-6 bg-white/[0.03] border border-white/[0.08] text-white rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase transition-all hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.05] active:scale-[0.95] backdrop-blur-3xl"
                        >
                            <span className="flex items-center gap-4">
                                View Repository
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5, ease: premiumEase as any }}
                    className="absolute bottom-12 left-0 right-0 mx-auto pointer-events-none"
                >
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-600 animate-pulse">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-24 bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent mx-auto"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
