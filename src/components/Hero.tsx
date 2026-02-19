"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const roles = ["Full Stack Developer", "DevOps Engineer", "UI/UX Designer"];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typeSpeed = isDeleting ? 50 : 150;

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentRole) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            } else {
                setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, roleIndex]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-purple-500/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-10" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen opacity-30 animate-pulse delay-1000" />
                <Image
                    src="/hero_background.svg"
                    alt="Background Grid"
                    fill
                    priority
                    className="object-cover object-center opacity-20 pointer-events-none"
                    fetchPriority="high"
                />
            </div>

            <div className="section-container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-purple-400 mb-6 backdrop-blur-md">
                        Available for Freelance & Hire
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold font-display text-white mb-6 tracking-tighter">
                        Kumail Kmr
                    </h1>
                    <div className="h-10 mb-8 md:mb-10">
                        <span className="text-xl md:text-3xl text-gray-400 font-light">
                            I am a <span className="text-white font-medium">{text}</span>
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <Link href="#contact" className="relative inline-flex group items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105">
                        <span className="z-10 flex items-center">
                            Hire Me
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <Link href="#projects" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:scale-105">
                        <span className="flex items-center">
                            View Work
                        </span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-0 right-0 mx-auto animate-bounce"
                >
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center p-1">
                        <div className="w-1 h-3 bg-white/50 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
