"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { 
    ArrowLeft, 
    Layers, 
    Shield, 
    Zap, 
    Cpu, 
    Database, 
    Globe, 
    ArrowUpRight, 
    FileText, 
    Code2, 
    CheckCircle2,
    Users,
    Target,
    BarChart3,
    Terminal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { highConversionProjects } from "@/lib/projects-data";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ClientShell from "@/components/ClientShell";

interface ProjectDetailContentProps {
    slug: string;
}

export default function ProjectDetailContent({ slug }: ProjectDetailContentProps) {
    const router = useRouter();

    // Resolve project from both sources
    const project = useMemo(() => {
        const all = [...MOCK_PROJECTS, ...highConversionProjects];
        return all.find(p => p.id === slug || p.id === `mock-${slug}`);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white p-6">
                <div className="text-center space-y-6">
                    <h1 className="text-6xl font-black tracking-tighter">PROJECT_NOT_FOUND</h1>
                    <p className="text-gray-500 uppercase tracking-widest font-black">Scanning database for project signature...</p>
                    <button onClick={() => router.back()} className="btn-primary py-4 px-8">Return to Base</button>
                </div>
            </div>
        );
    }

    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <ClientShell>
            <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
                {/* Navigation Bar */}
                <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center pointer-events-none">
                    <button 
                        onClick={() => router.back()}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all pointer-events-auto backdrop-blur-xl group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex gap-4 pointer-events-auto">
                        <Link href="/hire" className="btn-primary py-3 px-8 text-[10px]">Deploy Solutions</Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative h-[80vh] flex flex-col justify-end overflow-hidden pb-20">
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={project.image} 
                            alt={project.title} 
                            fill 
                            priority
                            className="object-cover opacity-50 grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                        <m.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: premiumEase as any }}
                            className="max-w-4xl space-y-8"
                        >
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={12} /> {project.category || "Full-Stack Project"}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    {project.status || "Production"}
                                </span>
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                                {project.title}
                            </h1>

                            <p className="text-2xl md:text-3xl text-gray-400 font-medium max-w-2xl leading-tight border-l-4 border-blue-500/50 pl-10 italic">
                                {project.summary || project.description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-10">
                                {project.demo && project.demo !== "#" && (
                                    <a href={project.demo} target="_blank" className="btn-primary py-5 px-10 flex items-center gap-2 group text-xs uppercase tracking-widest font-black">
                                        Live Experience <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                                {project.github && project.github !== "#" && (
                                    <a href={project.github} target="_blank" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                        <Code2 size={18} /> Source Intelligence
                                    </a>
                                )}
                            </div>
                        </m.div>
                    </div>
                </section>

                {/* Triple-Threat Audience Section */}
                <section className="py-32 bg-[#020202] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Audience Nav Header */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 border-b border-white/5 pb-12">
                            <div>
                                <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4">01 // For HR & Recruiters</h3>
                                <p className="text-gray-500 text-xs font-medium leading-relaxed">ATS-optimized executive briefing focusing on roles, timeline, and core competencies.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-purple-500 uppercase tracking-[0.3em] mb-4">02 // For Tech Leads</h3>
                                <p className="text-gray-500 text-xs font-medium leading-relaxed">Deep-dive into engineering logic, scalability benchmarks, and architectural integrity.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">03 // For Direct Clients</h3>
                                <p className="text-gray-500 text-xs font-medium leading-relaxed">ROI-focused narrative highlighting the business problem, strategic solution, and impact.</p>
                            </div>
                        </div>

                        {/* Audience Content Matrix */}
                        <div className="space-y-40">
                            {/* HR Briefing */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <Users size={24} />
                                            </div>
                                            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Executive Briefing</h2>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Formal Role</p>
                                                    <p className="text-lg font-bold text-white">{project.role || "Lead Full-Stack Architect"}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Industry Domain</p>
                                                    <p className="text-lg font-bold text-white">{project.category || "FinTech / SaaS"}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Team Dynamics</p>
                                                    <p className="text-lg font-bold text-white">Solo / Lead Developer</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Tech Stack</p>
                                                    <p className="text-lg font-bold text-white">Primary: {project.tags[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Competency Matrix (ATS Friendly)</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.github && project.github !== "#" && (
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                                                >
                                                    <Terminal className="w-5 h-5 text-gray-400" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <BarChart3 size={24} />
                                            </div>
                                            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Impact Telemetry</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {(project.metrics || ["100% Reliability", "Sub-sec loads", "Scale Ready"]).map((metric, i) => (
                                                <div key={i} className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70">Verified Outcome</p>
                                                    <p className="text-2xl font-black text-white tracking-tighter">{metric}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Deep-Dive */}
                            <div className="space-y-20">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="w-16 h-16 rounded-[2rem] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-2">
                                        <Cpu size={32} />
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Engineering Audit</h2>
                                    <p className="text-gray-500 text-lg max-w-2xl font-medium">Deep-dive into the architectural decisions that power {project.title}.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                    <Database size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white tracking-tight uppercase">Architecture Map</h3>
                                            </div>
                                            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 aspect-square relative flex items-center justify-center overflow-hidden">
                                                <ArchitectureDiagram 
                                                    architecture={(project.systemArchitecture || project.architecture) as any} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                                    <Terminal size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white tracking-tight uppercase">Engineering Insight</h3>
                                            </div>
                                            <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 relative overflow-hidden space-y-6">
                                                {project.engineering && (
                                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                                        <p className="text-gray-400 leading-relaxed italic">&quot;{project.engineering}&quot;</p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                    {[
                                                        { label: "Backend Architecture", val: project.backendDepth },
                                                        { label: "Security Protocols", val: project.securityDepth },
                                                        { label: "Infrastructure Scaling", val: project.scalabilityDepth }
                                                    ].map((s, i) => (
                                                        <div key={i} className="space-y-4">
                                                            <div className="flex justify-between items-center text-sm">
                                                                <span className="text-gray-500 uppercase tracking-widest">{s.label}</span>
                                                                <span className="text-blue-400 font-bold">{s.val || 0}%</span>
                                                            </div>
                                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <m.div 
                                                                    initial={{ width: 0 }}
                                                                    whileInView={{ width: `${s.val || 0}%` }}
                                                                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client ROI / Problem-Solution */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                <div className="space-y-12">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Target size={24} />
                                            </div>
                                            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">The Business Case</h2>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-12">
                                        {project.problem && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 text-red-500">
                                                    <Shield className="w-6 h-6" />
                                                    <h3 className="text-xl font-bold uppercase tracking-tight">The Problem</h3>
                                                </div>
                                                <p className="text-gray-400 text-lg leading-relaxed">{project.problem}</p>
                                            </div>
                                        )}

                                        {project.solution && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 text-green-500">
                                                    <Zap className="w-6 h-6" />
                                                    <h3 className="text-xl font-bold uppercase tracking-tight">The Solution</h3>
                                                </div>
                                                <p className="text-gray-400 text-lg leading-relaxed">{project.solution}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div className="p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 w-full relative group">
                                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 space-y-8">
                                            <h4 className="text-3xl font-black text-white tracking-tighter italic uppercase">Key Performance Wins</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {project.valuePoints?.map((point: string, i: number) => (
                                                    <m.div 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-blue-500/50 transition-colors"
                                                    >
                                                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                                            <div className="w-2 h-2 rounded-full bg-current" />
                                                        </div>
                                                        <span className="text-gray-300 text-lg font-medium">{point}</span>
                                                    </m.div>
                                                ))}
                                            </div>
                                            <div className="pt-10">
                                                <Link href="/hire" className="btn-primary py-5 px-10 w-full flex justify-center text-xs">Request Similar Project Audit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="py-40 bg-black text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px]" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <m.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">
                                HIRE THE <span className="text-blue-500 italic underline">ENGINEER</span> BEHIND THIS.
                            </h2>
                            <p className="text-gray-500 text-xl font-medium tracking-tight">Recruiters, Clients, and HR Managers — let&apos;s build the future together.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                                <Link href="/hire" className="btn-primary py-6 px-16 text-xs uppercase tracking-widest font-black shadow-2xl">Deploy Me to Your Team</Link>
                                <a href="https://www.linkedin.com/in/kumale-ali-bhat-6196a0384/" target="_blank" className="px-16 py-6 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Review Engineering Credentials</a>
                            </div>
                        </m.div>
                    </div>
                </section>
            </main>
        </ClientShell>
    );
}
