"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    X, 
    Github, 
    ExternalLink, 
    Layers, 
    Code2, 
    Cpu, 
    Database, 
    Zap, 
    Shield, 
    BarChart, 
    ChevronLeft, 
    ChevronRight,
    Milestone,
    Terminal,
    CheckCircle2,
    Target,
    Workflow
} from "lucide-react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    summary?: string;
    description: string;
    status: string;
    role?: string;
    tags: string[];
    image: string;
    demo?: string;
    github?: string;
    problem?: string;
    solution?: string;
    targetAudience?: string;
    valueProp?: string;
    architecture?: any;
    challenges?: string;
    engineering?: string;
    performance?: string;
    scalability?: string;
    security?: string;
    lessons?: string;
    uiDepth: number;
    backendDepth: number;
    securityDepth: number;
    scalabilityDepth: number;
    timeline?: any;
    gallery: string[];
    results?: string;
    metrics: string[];
    category?: string;
}

interface ProjectCaseStudyModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, isOpen, onClose }: ProjectCaseStudyModalProps) {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const timeline = project.timeline ? (typeof project.timeline === 'string' ? JSON.parse(project.timeline) : project.timeline) : [
        { phase: "Idea", label: "Conceptualization" },
        { phase: "Dev", label: "Engineering" },
        { phase: "Deploy", label: "Production" },
        { phase: "Optimize", label: "Scaling" }
    ];

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
            >
                {/* Backdrop */}
                <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
                />

                {/* Modal Container */}
                <m.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-[#080808] border border-white/10 rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header Controls */}
                    <div className="absolute top-8 right-8 z-[110] flex gap-4">
                        <button 
                            onClick={onClose}
                            className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all group"
                        >
                            <X size={20} className="group-rotate-90 transition-transform" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar overflow-x-hidden">
                        {/* Hero Section */}
                        <section className="relative h-[60vh] sm:h-[70vh] flex flex-col justify-end p-8 sm:p-16">
                            <div className="absolute inset-0 z-0">
                                <Image 
                                    src={project.image} 
                                    alt={project.title} 
                                    fill 
                                    className="object-cover opacity-40 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                            </div>

                            <div className="relative z-10 max-w-3xl space-y-6">
                                <m.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                                        Case Study
                                    </span>
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/</span>
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                        {project.status}
                                    </span>
                                </m.div>
                                
                                <m.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-none"
                                >
                                    {project.title}
                                </m.h1>

                                <m.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl text-gray-400 font-medium max-w-2xl leading-relaxed"
                                >
                                    {project.summary || project.description.split('.')[0] + '.'}
                                </m.p>

                                <m.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4 pt-4"
                                >
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" className="btn-primary py-4 px-8 flex items-center gap-2 group">
                                            Live Experience <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                            <Github size={18} /> Source Intelligence
                                        </a>
                                    )}
                                </m.div>
                            </div>
                        </section>

                        {/* Content Grid */}
                        <div className="px-8 sm:px-16 py-20 space-y-32">
                            
                            {/* Mission & Context */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                                <Target size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white tracking-tight uppercase">Problem</h3>
                                        </div>
                                        <p className="text-gray-400 text-lg leading-relaxed italic border-l-2 border-red-500/20 pl-6">
                                            "{project.problem || "No specific problem documented for this project."}"
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                                <Zap size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white tracking-tight uppercase">Solution</h3>
                                        </div>
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            {project.solution || project.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="glass-effect p-10 rounded-[3rem] border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.02] to-transparent">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Engineering Role</p>
                                        <p className="text-2xl font-black text-white">{project.role || "Lead Architect"}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Status</p>
                                            <p className="text-white font-bold">{project.status}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Category</p>
                                            <p className="text-white font-bold">{project.category || "Full-Stack Dev"}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Tech Stack Infrastructure</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Insights (The Terminal) */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <Terminal size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight uppercase">Code & Architecture Insights</h3>
                                </div>
                                <div className="bg-[#050505] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                                    <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">system_breakdown.bash</span>
                                    </div>
                                    <div className="p-8 sm:p-12 font-mono text-sm leading-8 space-y-4">
                                        <div className="flex gap-4">
                                            <span className="text-blue-500 font-black">❯</span>
                                            <p className="text-gray-400 italic">cat architecture_map.json</p>
                                        </div>
                                        <div className="pl-8 space-y-2 border-l border-white/10 ml-1">
                                            <p className="text-blue-400"><span className="text-white">"Frontend"</span>: "React + Next.js (App Router)",</p>
                                            <p className="text-purple-400"><span className="text-white">"Backend"</span>: "Node.js (Next API Routes)",</p>
                                            <p className="text-emerald-400"><span className="text-white">"Database"</span>: "PostgreSQL (Prisma ORM)",</p>
                                            <p className="text-amber-400"><span className="text-white">"Realtime"</span>: "WebSockets / SWR Optimistic UI",</p>
                                            <p className="text-gray-500"><span className="text-white">"Cloud"</span>: "Vercel + Edge Infrastructure"</p>
                                        </div>
                                        <div className="flex gap-4 pt-6">
                                            <span className="text-blue-500 font-black">❯</span>
                                            <p className="text-gray-300">Initialized system metrics...</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-green-500 font-black">✓</span>
                                            <p className="text-gray-400 uppercase tracking-widest text-[10px] font-black">Optimized Query execution confirmed</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Timeline Visualizer */}
                            <section className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <Workflow size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight uppercase">Engineering Workflow</h3>
                                </div>
                                <div className="relative pt-8 pb-12">
                                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block" />
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        {timeline.map((item: any, i: number) => (
                                            <div key={i} className="relative z-10 text-center md:text-left">
                                                <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-white/10 flex items-center justify-center text-white font-black mb-4 mx-auto md:mx-0 group-hover:border-blue-500/50 transition-colors">
                                                    {i + 1}
                                                </div>
                                                <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.phase}</h4>
                                                <p className="text-white font-bold">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Visual Showcase (Gallery) */}
                            {project.gallery && project.gallery.length > 0 && (
                                <section className="space-y-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                            <Layers size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase">Interface Showcase</h3>
                                    </div>
                                    <div className="relative group/gallery aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-white/5">
                                        <Image 
                                            src={project.gallery[activeImage]} 
                                            alt="Showcase" 
                                            fill 
                                            className="object-cover transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        
                                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                                            {project.gallery.map((_, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setActiveImage(i)}
                                                    className={`w-3 h-3 rounded-full transition-all ${activeImage === i ? "bg-blue-500 w-10" : "bg-white/20 hover:bg-white/40"}`}
                                                />
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => setActiveImage(prev => (prev === 0 ? project.gallery.length - 1 : prev - 1))}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/60"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button 
                                            onClick={() => setActiveImage(prev => (prev === project.gallery.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/60"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </section>
                            )}

                            {/* Deep Engineering Section */}
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="card p-8 bg-white/5 border-white/5 space-y-4">
                                    <BarChart className="text-blue-500" size={24} />
                                    <h4 className="text-white font-bold">Performance</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{project.performance || "Highly optimized initial loads with Next.js pre-rendering."}</p>
                                </div>
                                <div className="card p-8 bg-white/5 border-white/5 space-y-4">
                                    <Shield className="text-purple-500" size={24} />
                                    <h4 className="text-white font-bold">Security</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{project.security || "End-to-end data encryption and robust auth patterns."}</p>
                                </div>
                                <div className="card p-8 bg-white/5 border-white/5 space-y-4">
                                    <Cpu className="text-orange-500" size={24} />
                                    <h4 className="text-white font-bold">Scalability</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{project.scalability || "Microservice-ready architecture built for growth."}</p>
                                </div>
                                <div className="card p-8 bg-white/5 border-white/5 space-y-4">
                                    <Database className="text-emerald-500" size={24} />
                                    <h4 className="text-white font-bold">Resilience</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{project.backendDepth > 80 ? "Fault-tolerant systems with error handling." : "Standard reliable logic."}</p>
                                </div>
                            </section>

                            {/* Real Impact Section */}
                            <section className="p-12 rounded-[3.5rem] bg-gradient-to-br from-blue-600/10 via-blue-900/5 to-transparent border border-blue-500/10 flex flex-col md:flex-row items-center gap-12">
                                <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">System Impact</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        {project.results || "Successfully addressed technical requirements while delivering a premium user experience."}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-6">
                                        {project.metrics.map(metric => (
                                            <span key={metric} className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 py-1 px-3 rounded-md">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Footer CTA */}
                        <section className="px-8 sm:px-16 pb-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div>
                                <h4 className="text-white font-bold italic">Interested in the engineering behind this?</h4>
                                <p className="text-gray-500 text-sm">Let's discuss architecture and technical feasibility.</p>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={onClose}
                                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                    Dismiss Case
                                </button>
                                <a href="#hire" onClick={onClose} className="btn-primary py-4 px-8">
                                    Start Collaboration
                                </a>
                            </div>
                        </section>
                    </div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
}
