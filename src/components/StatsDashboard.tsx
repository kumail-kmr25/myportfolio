"use client";

import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Loader2, Code2, Bug, BookOpen, Layers, CheckSquare, Calendar, Github, ExternalLink } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

    const statItems = [
        { label: "Total Projects", value: stats?.totalProjects || 0, icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Bugs Fixed", value: stats?.bugsFixed || 0, icon: Bug, color: "text-red-500", bg: "bg-red-500/10" },
        { label: "Case Studies", value: stats?.caseStudiesWritten || 0, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Features Built", value: stats?.featureRequestsCompleted || 0, icon: CheckSquare, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Years Learning", value: stats?.yearsLearning || 0, icon: Calendar, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { label: "Deployments", value: stats?.deploymentCount || 0, icon: Rocket, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <section id="stats" className="py-24 bg-[#050505]">
            <div className="section-container">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="section-title !mb-4">Live Developer Stats</h2>
                    <p className="text-gray-400 max-w-xl">
                        Real-time metrics reflecting my engineering output, community contributions, and continuous learning journey.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {statItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon size={24} />
                                </div>
                                <div className="text-3xl font-black text-white mb-1">
                                    <AnimatedCounter value={item.value} />
                                    {item.label === "Years Learning" && <span className="text-lg ml-0.5">+</span>}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    {item.label}
                                </div>

                                {/* Decorative background glow */}
                                <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${item.bg} blur-3xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-black border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                            <Github className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">GitHub Statistics</h4>
                            <p className="text-sm text-gray-400 mb-4">Tracking commits, pull requests, and open source contributions daily.</p>
                            <a href="https://github.com" target="_blank" className="text-xs font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                                View Profile <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-950/20 to-black border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
                        <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                            <Code2 className="w-10 h-10 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">System Monitoring</h4>
                            <p className="text-sm text-gray-400 mb-4">Maintaining 99.9% uptime for all personal deployments and client projects.</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core API: UP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">DB: Connected</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
