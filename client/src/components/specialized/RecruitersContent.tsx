"use client";

import { m } from "framer-motion";
import { 
    Cpu, 
    FileText, 
    Database, 
    Layers, 
    ArrowRight, 
    Sparkles, 
    Terminal,
    Github,
    Linkedin,
    Mail
} from "lucide-react";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import StatsDashboard from "@/components/StatsDashboard";
import Testimonials from "@/components/Testimonials";
import { useHireModal } from "@/context/HireModalContext";
import SkillMatcher from "@/components/specialized/SkillMatcher";

export default function RecruitersContent() {
    const { openModal } = useHireModal();
    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <ClientShell>
            <main className="min-h-screen bg-[#050505] text-white">
                {/* Technical Hero */}
                <section className="relative h-[70vh] flex flex-col justify-center items-center overflow-hidden px-6 text-center">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px] pointer-events-none" />

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: premiumEase as any }}
                        className="relative z-10 space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">
                            <Cpu size={12} /> Full-Stack Engineering & Architecture
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
                            TECHNICAL <span className="text-blue-500 italic block">EXPERTISE.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium italic">
                            ATS-optimized briefing for technical recruiters and engineering managers. Focusing on performance, scalability, and clean architecture.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 pt-10">
                            <button onClick={() => openModal({ service: "Technical Placement", description: "Requesting full technical dossier and resume for placement audit." })} className="btn-primary py-5 px-10 flex items-center gap-3 group text-xs uppercase tracking-widest font-black">
                                <FileText size={18} /> Download Full Dossier
                            </button>
                            <a href="https://www.linkedin.com/in/kumail-kmr25" target="_blank" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                <Linkedin size={18} /> Review Track Record
                            </a>
                        </div>
                    </m.div>
                </section>

                <Testimonials />

                {/* Core Competencies Matrix */}
                <div id="stack">
                    <Skills />
                </div>

                {/* Production Benchmarks */}
                <div id="stats">
                    <StatsDashboard />
                </div>

                 {/* Skill Matcher Section */}
                <section className="py-32 bg-[#020202] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Technical Match</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Automated <span className="text-blue-500 italic">Skill Alignment</span></h2>
                        </div>
                        <SkillMatcher />
                    </div>
                </section>

                {/* Technical Showcase */}
                <div id="work">
                    <Projects />
                </div>

                {/* Recruiter CTA */}
                <section className="py-40 bg-black text-center relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px]" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-8 mx-auto">
                            <Cpu size={32} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                            READY FOR THE <span className="text-blue-500 italic">NEXT CHALLENGE.</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-medium tracking-tight mb-12">
                            Recruiters — get a direct line for high-priority placement or technical collaboration.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onClick={() => openModal({ service: "Recruitment Enquiry", description: "Inquiry regarding potential technical placement or contract collaboration." })} className="btn-primary py-6 px-16 text-xs uppercase tracking-widest font-black shadow-2xl flex items-center gap-3">
                                <Mail size={18} /> Secure Inquiry
                            </button>
                            <Link href="/audit" className="px-16 py-6 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Request System Audit
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </ClientShell>
    );
}
