"use client";

import { m } from "framer-motion";
import { 
    Users, 
    FileText, 
    Milestone, 
    ArrowRight, 
    Sparkles, 
    Target,
    Workflow,
    Award,
    Mail,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import About from "@/components/About";
import MyJourney from "@/components/MyJourney";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Skills from "@/components/Skills";
import { useHireModal } from "@/context/HireModalContext";

export default function CareerPage() {
    const { openModal } = useHireModal();
    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <ClientShell>
            <main className="min-h-screen bg-[#050505] text-white">
                {/* Executive Hero */}
                <section className="relative h-[70vh] flex flex-col justify-center items-center overflow-hidden px-6 text-center">
                    <div className="absolute inset-0 bg-purple-500/5 blur-[120px] pointer-events-none" />
                    
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: premiumEase as any }}
                        className="relative z-10 space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4">
                            <Briefcase size={12} /> Talent Acquisition Executive Briefing
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
                            ELITE <span className="text-purple-500 italic block underline decoration-purple-500/30 underline-offset-8">TENURE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium italic">
                            Dedicated to building high-performance engineering culture. A comprehensive overview of professional journey, core ethics, and long-term value.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 pt-10">
                            <button onClick={() => openModal({ service: "Resume Request", description: "Requesting a high-resolution PDF resume and professional portfolio dossier." })} className="btn-primary py-5 px-10 flex items-center gap-3 group text-xs uppercase tracking-widest font-black bg-purple-600 hover:bg-purple-500 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <FileText size={18} /> Executive Resume
                            </button>
                            <button onClick={() => openModal({ service: "Interview Request", description: "Inquiry to schedule a professional interview or technical screening." })} className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                <Mail size={18} /> Schedule Interview
                            </button>
                        </div>
                    </m.div>
                </section>

                {/* About Profile */}
                <About />

                {/* Competency Matrix */}
                <Skills />

                {/* Professional Journey */}
                <MyJourney />

                {/* Value Proposition */}
                <WhyWorkWithMe />

                {/* HR CTA */}
                <section className="py-40 bg-black text-center relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 bg-purple-500/5 blur-[120px]" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-8 mx-auto">
                            <Users size={32} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                            ALIGNED WITH <span className="text-purple-500 italic">CULTURE.</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-medium tracking-tight mb-12">
                            HR Managers — let&apos;s discuss how my engineering standards can elevate your team&apos;s output and technical excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onClick={() => openModal({ service: "HR Enquiry", description: "Direct inquiry from HR/Talent Acquisition regarding cultural alignment and engineering tenure." })} className="btn-primary py-6 px-16 text-xs uppercase tracking-widest font-black shadow-2xl bg-purple-600 hover:bg-purple-500 border-purple-500/50">
                                Contact Direct
                            </button>
                            <Link href="/hire" className="px-16 py-6 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Review Onboarding
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </ClientShell>
    );
}
