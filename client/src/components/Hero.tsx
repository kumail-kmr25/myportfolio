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

    useEffect(() => {
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 20,
                    y: (e.clientY / window.innerHeight - 0.5) * 20,
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
        const typeSpeed = isDeleting ? 40 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000);
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
        <section id="home" aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-purple-500/30 pt-24">
            {/* Dynamic Technical Grid Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />

                {/* Elite Light Sources */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] bg-blue-600/10 blur-[60px] rounded-full mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.15, 0.2, 0.15]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] bg-purple-600/10 blur-[60px] rounded-full mix-blend-screen"
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            <div className="section-container relative z-10 text-center">
                <motion.div
                    style={{
                        x: mousePos.x * 0.5,
                        y: mousePos.y * 0.5,
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="flex flex-col items-center gap-4 mb-8 mt-6"
                    >
                        <span className="inline-block py-2 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 backdrop-blur-md">
                            Expert Technical Intervention
                        </span>
                        <LiveStatusBadge variant="hero" />
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-display text-white mb-8 tracking-[-0.04em] leading-[0.9]"
                    >
                        Kumail Kmr
                    </motion.h1>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="h-10 mb-12"
                    >
                        <span className="text-xl md:text-2xl text-gray-500 font-medium uppercase tracking-[0.2em]">
                            I am a <span className="text-white">{text}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-blue-500 ml-1"
                            >
                                _
                            </motion.span>
                        </span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            openModal();
                        }}
                        className="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-blue-500/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center gap-3">
                            Hire Me
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <Link href="#projects" prefetch={false} className="group relative px-10 py-5 bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/[0.06] hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md">
                        <span className="flex items-center gap-3">
                            View Projects
                        </span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-0 right-0 mx-auto"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto"
                    />
                </motion.div>
            </div>
        </section>
    );
}
