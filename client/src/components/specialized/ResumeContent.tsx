"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Download, 
    ChevronLeft, 
    FileText, 
    ExternalLink, 
    Mail, 
    Linkedin, 
    Github,
    Globe,
    Briefcase,
    GraduationCap,
    Zap,
    Cpu
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    const json = await res.json();
    return json.success ? json.data : json;
};

interface Resume {
    id: string;
    url: string;
    visible: boolean;
    updatedAt: string;
}

export default function ResumeContent() {
    const { data: resumes } = useSWR<Resume[]>("/api/admin/resume", fetcher);
    const activeResume = (Array.isArray(resumes) ? resumes : []).find(r => r.visible);

    const skills = [
        "React/Next.js", "TypeScript", "Node.js/Express", "Prisma/PostgreSQL", 
        "AWS/GCP/Vercel", "Tailwind CSS", "System Design", "Technical Strategy"
    ];

    const experience = [
        {
            company: "Technical Consultant",
            role: "Fractional CTO & Lead Engineer",
            period: "2023 - Present",
            description: "Providing high-level technical direction for startups and SMEs. Architecting scalable full-stack solutions and leading cross-functional engineering teams.",
            impact: "Successfully delivered 10+ MVPs with 25% faster time-to-market."
        },
        {
            company: "Global Scale-Up",
            role: "Senior Full-Stack Engineer",
            period: "2021 - 2023",
            description: "Developed and maintained high-traffic web applications using Next.js and Microservices. Optimized database performance and CI/CD pipelines.",
            impact: "Improved system reliability by 99.9% and reduced server latency by 40%."
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white py-24 px-8 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <Link href="/" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-all">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Escape_Terminal
                    </Link>
                    {activeResume && (
                        <a 
                            href={activeResume.url} 
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all group"
                        >
                            <Download size={16} className="group-hover:scale-110 transition-transform" />
                            Download_ARCHIVE.PDF
                        </a>
                    )}
                </div>

                {/* Hero Section */}
                <div className="mb-32 space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.5em]">Identity_Matrix // VERIFIED</p>
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">
                            Kumale<br />Ali_Bhat
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-500 font-medium max-w-2xl leading-relaxed italic">
                            Elite Full-Stack Engineer & Strategic Technical Consultant. Transforming complex operational requirements into high-performance digital assets.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                        <div className="flex items-center gap-3 group cursor-pointer hover:text-blue-500 transition-colors">
                            <Mail size={16} /> ka6307464@gmail.com
                        </div>
                        <div className="flex items-center gap-3 group cursor-pointer hover:text-blue-500 transition-colors">
                            <Globe size={16} /> Dubai, UAE (Remote-Global)
                        </div>
                        <div className="flex items-center gap-3 group cursor-pointer hover:text-blue-500 transition-colors">
                            <Linkedin size={16} /> /in/kumale-ali-bhat
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* Experience */}
                        <section className="space-y-16">
                            <div className="flex items-center gap-4">
                                <Briefcase className="text-blue-500" size={24} />
                                <h2 className="text-2xl font-black uppercase tracking-widest italic text-white/50">Experience_Logs</h2>
                            </div>
                            <div className="space-y-20 border-l border-white/5 ml-3">
                                {experience.map((exp, idx) => (
                                    <m.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative pl-12 group"
                                    >
                                        <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors border-2 border-[#050505]" />
                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{exp.role}</h3>
                                                <span className="text-[10px] font-black text-blue-500/60 uppercase tracking-widest bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/10">
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-500 uppercase tracking-wider">{exp.company}</p>
                                            <p className="text-gray-400 leading-relaxed text-lg max-w-xl italic">{exp.description}</p>
                                            <div className="flex items-start gap-3 p-6 bg-white/[0.02] border border-white/5 rounded-3xl group-hover:border-blue-500/20 transition-all">
                                                <Zap className="text-blue-500 mt-1 shrink-0" size={16} />
                                                <p className="text-xs font-black uppercase tracking-widest text-blue-300 leading-relaxed">{exp.impact}</p>
                                            </div>
                                        </div>
                                    </m.div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="space-y-16">
                            <div className="flex items-center gap-4">
                                <GraduationCap className="text-indigo-400" size={24} />
                                <h2 className="text-2xl font-black uppercase tracking-widest italic text-white/50">Academic_Foundation</h2>
                            </div>
                            <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[3rem] space-y-4 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter relative z-10">B.S. Software Engineering</h3>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs relative z-10">Distinction in Advanced Web Architectures</p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-20">
                        {/* Skills Matrix */}
                        <section className="space-y-12">
                            <div className="flex items-center gap-4">
                                <Cpu className="text-blue-500" size={24} />
                                <h2 className="text-xl font-black uppercase tracking-widest italic text-white/50">Skill_Core</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, idx) => (
                                    <span 
                                        key={idx}
                                        className="px-6 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Availability Hook */}
                        <section className="p-10 bg-blue-600/5 border border-blue-500/20 rounded-[3rem] space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-tight">Ready for Strategic Collaboration?</h3>
                                <p className="text-[11px] text-blue-300 font-black uppercase tracking-[0.2em] leading-relaxed italic">Currently accepting 2 new high-impact projects for Q2 2026.</p>
                            </div>
                            <Link href="/hire" className="block w-full py-5 bg-blue-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-center hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 relative z-10">
                                Initiate_Deployment
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
