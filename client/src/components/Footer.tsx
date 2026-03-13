"use client";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, ShieldCheck, Plus, Minus, LayoutGrid, Sparkles } from "lucide-react";
import { m, AnimatePresence, Variants } from "framer-motion";
import { useHireModal } from "@/context/HireModalContext";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import { MOCK_PROJECTS } from "@/lib/mock-data";

export default function Footer() {
    const { openModal } = useHireModal();
    const [showProjects, setShowProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const premiumEase = [0.16, 1, 0.3, 1];

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: premiumEase as any,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: premiumEase as any }
        }
    };

    return (
        <footer className="bg-[#020202] border-t border-white/[0.05] py-20 relative overflow-hidden">
            {/* Technical Data Pulse Accent */}
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <m.div
                    animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <m.div
                className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-16 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="text-center md:text-left">
                    <m.p
                        variants={itemVariants}
                        className="text-3xl font-black tracking-tighter text-white mb-4"
                    >
                        KUMAIL <span className="text-blue-500 italic">KMR</span>
                    </m.p>
                    <m.div
                        variants={itemVariants}
                        className="flex flex-col gap-2"
                    >
                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} Technical Engineering Unit
                        </p>
                        <p className="text-gray-800 text-[9px] font-black uppercase tracking-[0.2em]">
                            Built for peak performance & horizontal scalability
                        </p>
                    </m.div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-10">
                    <div className="flex items-center gap-4">
                        {[
                            { href: "https://github.com/kumail-kmr25", icon: Github, label: "GitHub" },
                            { href: "https://x.com/KumailKmr", icon: Twitter, label: "Twitter" },
                            { href: "https://www.linkedin.com/in/kumale-ali-bhat-6196a0384/", icon: Linkedin, label: "LinkedIn" },
                            { href: "https://www.instagram.com/kumail.kmr", icon: Instagram, label: "Instagram" }
                        ].map((social) => (
                            <m.div key={social.label} variants={itemVariants}>
                                <Link
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-center group relative overflow-hidden backdrop-blur-2xl"
                                    aria-label={`Visit my ${social.label} profile`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <social.icon size={20} className="relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                                </Link>
                            </m.div>
                        ))}
                    </div>

                    <m.div variants={itemVariants} className="flex items-center gap-6">
                        <button
                            onClick={() => setShowProjects(!showProjects)}
                            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all py-3 px-6 rounded-2xl border ${showProjects ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/[0.03] border-white/8 text-gray-500 hover:text-white hover:border-blue-500/30'}`}
                        >
                            {showProjects ? <Minus size={14} /> : <Plus size={14} />}
                            <span>More Projects</span>
                        </button>

                        <Link 
                            href="/admin" 
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-500 transition-all py-3 px-6 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.02]"
                        >
                            <ShieldCheck size={14} />
                            <span>Admin</span>
                        </Link>
                    </m.div>
                </div>
            </m.div>

            {/* Expansion Section */}
            <AnimatePresence>
                {showProjects && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: premiumEase as any }}
                        className="overflow-hidden bg-[#050505]/50 border-t border-white/5"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-24">
                            <div className="flex flex-col items-center mb-16 text-center">
                                <m.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex items-center gap-4 mb-6"
                                >
                                    <span className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles size={12} /> Technical Showcase
                                    </span>
                                </m.div>
                                <m.h3 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8"
                                >
                                    Additional <span className="text-blue-500">Premium Builds</span>
                                </m.h3>
                                <m.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-gray-500 text-sm uppercase tracking-widest font-black"
                                >
                                    Deep engineering across multiple domains
                                </m.p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Highlighted Project Names */}
                                <div className="space-y-12">
                                    {[
                                        { name: "CUE AI", color: "text-blue-500", shadow: "shadow-blue-500/20" },
                                        { name: "Quebook", color: "text-purple-500", shadow: "shadow-purple-500/20" },
                                        { name: "Clinkart", color: "text-emerald-500", shadow: "shadow-emerald-500/20" }
                                    ].map((p, i) => (
                                        <m.div
                                            key={p.name}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="group cursor-default"
                                        >
                                            <h4 className={`text-6xl md:text-7xl lg:text-8xl font-black ${p.color} tracking-tighter filter blur-[1px] hover:blur-0 transition-all duration-700 opacity-40 hover:opacity-100 select-none`}>
                                                {p.name}
                                            </h4>
                                        </m.div>
                                    ))}
                                </div>

                                {/* Showcased Project */}
                                <m.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <ProjectCard 
                                        project={MOCK_PROJECTS.find(p => p.id === "mock-edunova")} 
                                        isFeatured={true}
                                        onViewCaseStudy={setSelectedProject}
                                    />
                                </m.div>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Modal Orchestration */}
            <ProjectCaseStudyModal 
                isOpen={!!selectedProject} 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </footer>
    );
}
