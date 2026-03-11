"use client";

import { useState } from "react";
import useSWR from "swr";
import { m, AnimatePresence } from "framer-motion";
import { Layers, Loader2, Sparkles, Code2, Rocket, LayoutGrid } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import SectionReveal from "./SectionReveal";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Projects() {
    const { data: projects, isLoading } = useSWR("/api/projects", fetcher);
    const [selectedProject, setSelectedProject] = useState<any>(null);

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

    if (isLoading) {
        return (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin opacity-20" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Compiling Product Matrix...</p>
            </div>
        );
    }

    if (!projects || projects.length === 0) return null;

    // Filter projects based on user requested priority
    // User requested: EduNova, MedCipher, ValeKash, FinFlow AI, Clinkart, Quebook
    // We will sort them or take first 3 as featured
    const featuredProjects = projects.filter((p: any) => p.isFeatured).slice(0, 3);
    const standardProjects = projects.filter((p: any) => !p.isFeatured || featuredProjects.every((fp: any) => fp.id !== p.id));

    return (
        <section id="projects" className="py-24 lg:py-32 bg-[#020202] relative overflow-hidden">
            {/* Background Architecture Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/10 via-white/5 to-transparent" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full" />

            <div className="section-container relative z-10">
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
                        Case <span className="text-gray-500 italic">Studies</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed italic">
                        Technical deep-dives into end-to-end product engineering, architectural decision logs, and systemic impact analysis.
                    </p>
                </m.div>

                {/* Featured Projects Loop */}
                <m.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-12 lg:space-y-24 mb-32"
                >
                    {featuredProjects.map((project: any) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            isFeatured={true} 
                            onViewCaseStudy={setSelectedProject}
                        />
                    ))}
                </m.div>

                {/* Standard Projects Grid */}
                {standardProjects.length > 0 && (
                    <div className="space-y-16">
                        <div className="flex items-center gap-8">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] shrink-0">Extended Portfolio</h3>
                            <div className="h-px w-full bg-white/5" />
                        </div>
                        
                        <m.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {standardProjects.map((project: any) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    onViewCaseStudy={setSelectedProject}
                                />
                            ))}
                        </m.div>
                    </div>
                )}

                {/* Integration Note */}
                <m.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 text-center group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Code2 size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Want to see the code?</h4>
                    <p className="text-gray-500 text-sm mb-8">Access the production snapshots and architectural documentation for any system above.</p>
                    <a href="https://github.com/kumail-kmr25" target="_blank" className="btn-primary py-4 px-10">
                        Global Repository Access
                    </a>
                </m.div>
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
