"use client";

import { m } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Code2, Globe, Database, Terminal } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    project: any;
    isFeatured?: boolean;
    onViewCaseStudy: (project: any) => void;
}

export default function ProjectCard({ project, isFeatured = false, onViewCaseStudy }: ProjectCardProps) {
    const cardVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    if (isFeatured) {
        return (
            <m.div 
                variants={cardVariants}
                onClick={() => onViewCaseStudy(project)}
                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-700 overflow-hidden cursor-pointer"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] lg:aspect-auto rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:border-blue-500/30 transition-all duration-700 bg-[#050505] shadow-2xl">
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {project.status || "Production"}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-8 relative z-10 w-full">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[2px] bg-blue-500 rounded-full" />
                            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors duration-500">
                                Hero Project
                            </span>
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none group-hover:text-blue-50 transition-colors duration-500">
                            {project.title}
                        </h3>
                        <p className="text-lg lg:text-xl text-gray-400 font-medium leading-relaxed italic border-l-2 border-white/10 pl-6 group-hover:border-blue-500/50 group-hover:text-gray-300 transition-all duration-500">
                            {project.summary || project.description}
                        </p>
                    </div>

                    {/* Tech Stack Highlighting */}
                    <div className="space-y-3 pt-2">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Technology Stack</p>
                        <div className="flex flex-wrap gap-2 group-hover:glow-tech transition-all duration-500">
                            {project.tags.slice(0, 5).map((tag: any) => (
                                <span key={tag} className="px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] font-bold text-blue-300 shadow-sm backdrop-blur-sm group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-200 transition-all duration-500">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6 mt-auto">
                        <button 
                            onClick={() => onViewCaseStudy(project)}
                            className="btn-primary py-4 px-8 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                        >
                            View Details <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                        
                        <div className="flex gap-4">
                            {project.demo && project.demo !== "#" && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest tooltip-trigger group/demo">
                                    <Globe size={16} className="group-hover/demo:text-blue-400 transition-colors" /> Live Demo
                                </a>
                            )}
                            {project.github && project.github !== "#" && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest tooltip-trigger group/git">
                                    <Github size={16} className="group-hover/git:text-gray-300 transition-colors" /> View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </m.div>
        );
    }

    // Standard Card Variant
    return (
        <m.div 
            variants={cardVariants}
            onClick={() => onViewCaseStudy(project)}
            className="group relative p-6 lg:p-8 rounded-[3rem] bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-gradient-to-b hover:from-white/[0.06] hover:to-white/[0.02] hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col h-full cursor-pointer"
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Collection */}
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 border border-white/10 bg-[#050505] shadow-xl group-hover:border-blue-500/20 transition-all duration-500">
                <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                        {project.category || "Development"}
                    </span>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {project.demo && project.demo !== "#" && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <ArrowUpRight size={20} />
                        </a>
                    )}
                    {project.github && project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                            <Github size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-col flex-grow relative z-10">
                <div className="space-y-3 mb-6">
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed italic line-clamp-2 pr-4 group-hover:text-gray-300 transition-colors duration-300">
                        {project.summary || project.description}
                    </p>
                </div>

                {/* Tags Grid */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag: any) => (
                            <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-gray-400 group-hover:border-blue-500/20 group-hover:text-blue-300 group-hover:bg-blue-500/5 transition-all duration-300">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="px-2.5 py-1 rounded-md bg-transparent text-[9px] font-bold text-gray-600">
                                +{project.tags.length - 4}
                            </span>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => onViewCaseStudy(project)}
                        className="w-full py-4 rounded-xl bg-white/[0.02] border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-blue-500 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/case"
                    >
                        View Details <ArrowUpRight size={14} className="group-hover/case:translate-x-1 group-hover/case:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </m.div>
    );
}
