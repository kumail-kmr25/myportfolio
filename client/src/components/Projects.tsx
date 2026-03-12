"use client";

import { useState } from "react";
import useSWR from "swr";
import { m, AnimatePresence } from "framer-motion";
import { Layers, Loader2, Sparkles, Code2, Rocket, LayoutGrid, Cpu } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import SectionReveal from "./SectionReveal";
import { useHireModal } from "@/context/HireModalContext";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Projects() {
    const { data, isLoading } = useSWR("/api/projects", fetcher);
    // Handle both direct array (fallback/mock) and object-wrapped array (API v1)
    const projects = data?.projects || (Array.isArray(data) ? data : []);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const { openModal } = useHireModal();

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const headerVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="projects" className="py-24 lg:py-32 bg-[#020202] relative overflow-hidden">
            {/* Background Architecture Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/10 via-white/5 to-transparent" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full" />

            <div className="section-container relative z-10">
                {isLoading ? (
                    <div className="py-32 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin opacity-20" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Compiling Product Matrix...</p>
                    </div>
                ) : (!Array.isArray(projects) || projects.length === 0) ? (
                    <div className="py-32 flex flex-col items-center justify-center space-y-4 text-center">
                        <p className="text-gray-500 italic">No projects available at the moment.</p>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <m.div 
                            variants={headerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center mb-24 lg:mb-32"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                <LayoutGrid size={12} /> Product Ecosystem
                                </span>
                            </div>
                            
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
                                Featured <span className="text-blue-500 italic">Projects</span>
                            </h2>
                            
                            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed italic">
                                "Real systems I designed and built."
                            </p>
                        </m.div>

                        {/* Featured Projects (Hero Cards) */}
                        <m.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-12 lg:space-y-24 mb-24"
                        >
                            {projects.filter((p: any) => p.isFeatured).slice(0, 2).map((project: any) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    isFeatured={true} 
                                    onViewCaseStudy={setSelectedProject}
                                />
                            ))}
                        </m.div>

                        {/* Live System Status Panel (Bonus Trick) */}
                        <m.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mb-24 p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] bg-[#050505] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative overflow-hidden group"
                        >
                            {/* Animated Background Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex items-center gap-4 md:w-1/3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 relative">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl animate-ping opacity-20" />
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">System Status</h3>
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Live Developer Dashboard</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full md:w-2/3 md:border-l border-white/10 md:pl-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Projects Built</p>
                                    <p className="text-2xl font-black text-white">{projects.length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Systems Online</p>
                                    <p className="text-2xl font-black text-white">{projects.filter((p:any) => p.demo && p.demo !== "#").length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Currently Building</p>
                                    <p className="text-2xl font-black text-white">1</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Open For Work</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <p className="text-2xl font-black text-white">Yes</p>
                                    </div>
                                </div>
                            </div>
                        </m.div>

                        {/* Standard Projects Grid */}
                        {projects.filter((p: any) => !p.isFeatured || !projects.filter((fp: any) => fp.isFeatured).slice(0, 2).some((fp: any) => fp.id === p.id)).length > 0 && (
                            <div className="space-y-16">
                                <m.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {projects.filter((p: any) => !p.isFeatured || !projects.filter((fp: any) => fp.isFeatured).slice(0, 2).some((fp: any) => fp.id === p.id)).map((project: any) => (
                                        <ProjectCard 
                                            key={project.id} 
                                            project={project} 
                                            onViewCaseStudy={setSelectedProject}
                                        />
                                    ))}
                                </m.div>
                            </div>
                        )}

                        {/* Call To Action Section */}
                        <m.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-32 p-12 lg:p-16 rounded-[3.5rem] bg-gradient-to-br from-blue-600/10 via-blue-900/5 to-transparent border border-blue-500/20 text-center relative overflow-hidden group"
                        >
                            {/* Animated Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-1000" />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                    <Rocket size={32} />
                                </div>
                                
                                <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                                    Need something similar <span className="text-blue-500 italic block sm:inline mt-2 sm:mt-0">built?</span>
                                </h3>
                                
                                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                                    Let's collaborate to build a high-performance system tailored to your specific needs.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <button 
                                        onClick={() => openModal()}
                                        className="btn-primary py-4 px-10 text-sm w-full sm:w-auto hover:scale-105 transition-transform"
                                    >
                                        Hire Me
                                    </button>
                                    <button 
                                        onClick={() => openModal()}
                                        className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest hover:border-blue-500/30 min-h-[48px]"
                                    >
                                        Start a Project
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    </>
                )}
            </div>

            {/* Modal Orchestration */}
            <ProjectCaseStudyModal 
                isOpen={!!selectedProject} 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
}
