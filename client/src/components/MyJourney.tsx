"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
    Rocket,
    Code2,
    Cpu,
    Brain,
    Globe,
    Database,
    ShieldCheck,
    Layers,
    CheckCircle2,
    Circle
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useSWR from 'swr';
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json());

const IconMap: { [key: string]: React.ReactNode } = {
    "Brain": <Brain className="w-5 h-5 text-blue-400" />,
    "Code2": <Code2 className="w-5 h-5 text-indigo-400" />,
    "Cpu": <Cpu className="w-5 h-5 text-purple-400" />,
    "Rocket": <Rocket className="w-5 h-5 text-pink-400" />,
};

export default function MyJourney() {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fallback data while loading
    const { data: phases = [] } = useSWR('/api/journey', fetcher);
    const { data: skills = [] } = useSWR('/api/skills', fetcher);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="my-journey" ref={containerRef} className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Animated Gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                    >
                        Professional Evolution
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
                    >
                        The <span className="text-gray-500 italic">Journey</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-transparent mx-auto rounded-full"
                    />

                    {/* Check/Uncheck Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 flex flex-col items-center gap-4"
                    >
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={() => {
                                    if (isVisible) {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                    setIsVisible(!isVisible);
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-20 h-10 bg-white/[0.03] border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all after:duration-500 after:ease-[0.16, 1, 0.3, 1] peer-checked:bg-blue-600/20 peer-checked:border-blue-500/50 shadow-2xl group-hover:border-white/20 transition-all"></div>
                            <span className="ml-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-400 transition-colors">
                                {isVisible ? 'Node Online' : 'Node Standby'}
                            </span>
                        </label>
                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">
                            {isVisible ? 'Interacting with career timeline' : 'Initialize timeline exploration'}
                        </p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {isVisible && (
                        <motion.div
                            key="journey-content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            {/* Vertical Line */}
                            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
                                <motion.div
                                    style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                                    className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 origin-top"
                                />
                            </div>

                            {/* Phases */}
                            <div className="space-y-24">
                                {Array.isArray(phases) && phases.map((phase: any, index: number) => (
                                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Timeline Dot */}
                                        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 z-20">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            />
                                        </div>

                                        {/* Content Card */}
                                        <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                            <motion.div
                                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                whileHover={{ scale: 1.02 }}
                                                className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-blue-500/20 transition-all duration-500 group relative overflow-hidden"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                                            {IconMap[phase.icon] || <Code2 className="w-5 h-5 text-blue-400" />}
                                                        </div>
                                                        <span className="text-sm font-mono text-blue-400">{phase.phase}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-3">{phase.title}</h3>
                                                    <p className="text-gray-400 leading-relaxed">{phase.description}</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Skills Highlight Block */}
                            <div className="mt-40 max-w-4xl mx-auto">
                                <div className="text-center mb-12">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">What I Work With</h3>
                                    <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
                                </div>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {Array.isArray(skills) && [...skills].sort((a: any, b: any) => a.order - b.order).map((skill: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="relative group"
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 transition-all blur-sm" />
                                            <div className="relative px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium backdrop-blur-sm transition-all flex items-center gap-3">
                                                {skill.name}
                                                {skill.status === "learning" && (
                                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 uppercase tracking-tighter">
                                                        <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                                                        Learning
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress Indicator (Scroll Depth) */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 z-50 origin-left"
                style={{ scaleX }}
            />
        </section>
    );
}
