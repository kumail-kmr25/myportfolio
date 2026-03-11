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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    if (isFeatured) {
        return (
            <m.div 
                variants={cardVariants}
                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-700 overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] lg:aspect-auto rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-blue-500/20 transition-all duration-700 bg-white/5">
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                        {project.status}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-8 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-blue-500/50" />
                            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">Featured System</span>
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                            {project.title}
                        </h3>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed italic border-l-2 border-white/5 pl-6 group-hover:border-blue-500/30 transition-colors">
                            {project.summary || "High-performance engineering solution built for scalability and real-world impact."}
                        </p>
                    </div>

                    {/* Quick Metrics */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag: any) => (
                            <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button 
                            onClick={() => onViewCaseStudy(project)}
                            className="btn-primary py-4 px-8 flex items-center gap-2 group/btn"
                        >
                            View Case Study <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                        <div className="flex gap-2">
                            {project.demo && (
                                <a href={project.demo} target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all tooltip-trigger" title="Live Demo">
                                    <Globe size={18} />
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all tooltip-trigger" title="GitHub">
                                    <Github size={18} />
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
            className="group relative p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col h-full"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-white/5">
                <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{project.category || "Development"}</span>
                    <button 
                        onClick={() => onViewCaseStudy(project)}
                        className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:border-blue-400 transition-all"
                    >
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase">{project.title}</h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed italic">{project.summary || project.description}</p>
            </div>

            {/* Tags Refined */}
            <div className="flex flex-wrap gap-1.5 mt-6 pt-6 border-t border-white/5">
                {project.tags.slice(0, 3).map((tag: any) => (
                    <span key={tag} className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                        #{tag}
                    </span>
                ))}
            </div>
            
            <button 
                onClick={() => onViewCaseStudy(project)}
                className="mt-6 w-full py-3 rounded-xl border border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:border-blue-500/30 hover:text-white transition-all"
            >
                Protocol Breakdown
            </button>
        </m.div>
    );
}
