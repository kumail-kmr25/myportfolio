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
    // --- New Proof of Work Fields ---
    systemArchitecture?: { name: string, value: string }[];
    engineeringDecisions?: { title: string, reason: string, benefits: string }[];
    codeSnippet?: { language: string, code: string, description: string };
    realStats?: { components: string, apiRoutes: string, models: string, platform: string, buildTime: string };
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
        { phase: "Wireframe", label: "App Design" },
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
                                    priority
                                    sizes="100vw"
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

                            {/* Proof of Work: System Architecture */}
                            {project.systemArchitecture && project.systemArchitecture.length > 0 && (
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Layers size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase">System Architecture</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {project.systemArchitecture.map((arch, idx) => (
                                            <div key={idx} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-2 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all">
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{arch.name}</p>
                                                <p className="text-sm font-bold text-white">{arch.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Proof of Work: Key Engineering Decisions */}
                            {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                            <Cpu size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase">Key Engineering Decisions</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.engineeringDecisions.map((decision, idx) => (
                                            <div key={idx} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 space-y-4">
                                                <h4 className="text-lg font-bold text-white bg-white/5 inline-block px-4 py-2 rounded-xl mb-2">{decision.title}</h4>
                                                <div className="space-y-3">
                                                    <div className="pl-4 border-l-2 border-red-500/50">
                                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">The Why</p>
                                                        <p className="text-sm text-gray-400 italic">{decision.reason}</p>
                                                    </div>
                                                    <div className="pl-4 border-l-2 border-green-500/50">
                                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">The Benefit</p>
                                                        <p className="text-sm text-gray-300">{decision.benefits}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Proof of Work: Code Snippet Highlight */}
                            {project.codeSnippet && (
                                <section className="space-y-8 relative group">
                                    {/* Ambient Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex items-center gap-4 mb-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                            <Code2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white tracking-tight uppercase flex items-center gap-3">
                                                Real Code In Production
                                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] tracking-widest">Verified</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="bg-[#0D0D0D] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10">
                                        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                            <span className="text-xs font-mono text-gray-400">{project.codeSnippet.description}</span>
                                            <span className="px-3 py-1 rounded-md bg-white/10 text-[10px] font-black font-mono text-white uppercase tracking-widest">{project.codeSnippet.language}</span>
                                        </div>
                                        <div className="p-8 sm:p-10 overflow-x-auto custom-scrollbar">
                                            <pre className="text-sm font-mono leading-relaxed text-gray-300">
                                                <code>
                                                    {project.codeSnippet.code}
                                                </code>
                                            </pre>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Proof of Work: Real Development Stats */}
                            {project.realStats && (
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                            <BarChart size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-tight uppercase">Project Scale & Stats</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                                            <p className="text-3xl font-black text-white mb-1">{project.realStats.components}</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Components</p>
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                                            <p className="text-3xl font-black text-white mb-1">{project.realStats.apiRoutes}</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">API Routes</p>
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                                            <p className="text-3xl font-black text-white mb-1">{project.realStats.models}</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">DB Models</p>
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                                            <p className="text-xl font-black text-white mb-1 mt-1 truncate">{project.realStats.platform}</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Deployed On</p>
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center col-span-2 md:col-span-1">
                                            <p className="text-xl font-black text-white mb-1 mt-1">{project.realStats.buildTime}</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Build Time</p>
                                        </div>
                                    </div>
                                </section>
                            )}

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
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                                        {timeline.map((item: any, i: number) => (
                                            <div key={i} className="relative z-10 text-center md:text-left flex-1">
                                                <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-white/10 flex items-center justify-center text-white font-black mb-4 mx-auto md:mx-0 group-hover:border-blue-500/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
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
