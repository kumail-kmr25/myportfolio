"use client";

import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion";
import { Loader2, Code2, Bug, BookOpen, Layers, CheckSquare, Calendar, Github, ExternalLink } from "lucide-react";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then((res) => res.json());

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 30,
    });

    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function StatsDashboard() {
    const { data: stats, isLoading } = useSWR("/api/stats", fetcher);
    const { data: availability } = useSWR("/api/availability", fetcher);

    const statItems = [
        { label: "Total Projects", value: stats?.totalProjects || 0, icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Bugs Fixed", value: stats?.bugsFixed || 0, icon: Bug, color: "text-red-500", bg: "bg-red-500/10" },
        { label: "Case Studies", value: stats?.caseStudiesWritten || 0, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Features Built", value: stats?.featureRequestsCompleted || 0, icon: CheckSquare, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Years Learning", value: Math.max(stats?.yearsLearning || 0, 3), icon: Calendar, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { label: "Deployments", value: stats?.deploymentCount || 0, icon: Rocket, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="stats" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <div className="section-container relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                    >
                        Real-time Analytics
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white !mb-4"
                    >
                        Live Developer <span className="text-gray-500 italic">Stats</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-xl text-lg"
                    >
                        Quantitative metrics reflecting technical output, architectural contributions, and continuous learning iteration.
                    </motion.p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
                    >
                        {statItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                variants={itemVariants}
                                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.04)" }}
                                className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center backdrop-blur-sm"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <item.icon size={26} />
                                </div>
                                <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                                    <AnimatedCounter value={item.value} />
                                    {item.label === "Years Learning" && <span className="text-xl ml-0.5 text-blue-500">+</span>}
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
                                    {item.label}
                                </div>

                                {/* Decorative background glow */}
                                <div className={`absolute -bottom-10 -right-10 w-24 h-24 ${item.bg} blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity`}></div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="p-10 rounded-[3rem] bg-gradient-to-br from-gray-900/50 to-black border border-white/5 flex flex-col md:flex-row items-center gap-10 group hover:border-white/10 transition-all backdrop-blur-md"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500">
                            <Github className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">GitHub Architecture</h4>
                            <p className="text-gray-400 mb-6 leading-relaxed">Systematically tracking commits, branch merges, and technical contributions in real-time.</p>
                            <a href="https://github.com/kumail-kmr25" target="_blank" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-colors group/link">
                                Expand Intelligence <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-950/20 to-black border border-white/5 flex flex-col md:flex-row items-center gap-10 group hover:border-white/10 transition-all backdrop-blur-md"
                    >
                        <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500">
                            <Code2 className="w-12 h-12 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">System Operations</h4>
                            <p className="text-gray-400 mb-6 leading-relaxed">Infrastructure monitoring maintaining critical uptime for deployments and client-side assets.</p>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Core Engine: OPTIMAL</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DB Node: ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Helper icon not available in default lucide if not imported properly
function Rocket(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.59.79-1.35.79-2.21 0-1.28-1.02-2.29-2.29-2.29-.86 0-1.62.08-2.21.79Z" />
            <path d="M15 10c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Z" />
            <path d="M17.5 2.8c-2.3 0-4.5 1-6.4 2.8l-4.1 4.1c-1.8 1.9-2.8 4.1-2.8 6.4 0 1.2.5 2.5 1.4 3.4s2.2 1.4 3.4 1.4c2.3 0 4.5-1 6.4-2.8l4.1-4.1c1.8-1.9 2.8-4.1 2.8-6.4 0-1.2-.5-2.5-1.4-3.4s-2.2-1.4-3.4-1.4Z" />
            <path d="m11.5 12.5 7.7-7.7" />
        </svg>
    );
}
