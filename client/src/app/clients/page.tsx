"use client";

import { m } from "framer-motion";
import { 
    Zap, 
    Target, 
    Layers, 
    ArrowRight, 
    Sparkles, 
    BarChart3,
    TrendingUp,
    ShieldCheck,
    Mail,
    Globe
} from "lucide-react";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import LeadMagnet from "@/components/LeadMagnet";
import { useHireModal } from "@/context/HireModalContext";
import QualificationQuiz from "@/components/specialized/QualificationQuiz";

export default function ClientsPage() {
    const { openModal } = useHireModal();
    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <ClientShell>
            <main className="min-h-screen bg-[#050505] text-white">
                {/* ROI Hero */}
                <section className="relative h-[80vh] flex flex-col justify-center items-center overflow-hidden px-6 text-center">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none" />
                    
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: premiumEase as any }}
                        className="relative z-10 space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                            <Target size={12} /> Strategic Business Growth & ROI
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-4">
                            BUILD FOR <span className="text-emerald-500 italic block">REVENUE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium italic">
                            High-fidelity systems designed to convert visitors into loyal customers. I build business outcomes, not just features.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 pt-10">
                            <Link href="/audit" className="btn-primary py-5 px-10 flex items-center gap-3 group text-xs uppercase tracking-widest font-black bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <Zap size={18} /> Start Free Value Audit
                            </Link>
                            <button onClick={() => openModal({ service: "Partnership Enquiry", description: "Inquiry regarding a strategic business partnership or high-fidelity project collaboration." })} className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                <Mail size={18} /> Request Partnership
                            </button>
                        </div>
                    </m.div>
                </section>

                {/* Business Impact Stats */}
                <section className="py-24 border-y border-white/5 bg-[#020202]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Avg. ROI", value: "3.5x", icon: TrendingUp, color: "text-emerald-500" },
                            { label: "Lead Gen Lift", value: "200%", icon: BarChart3, color: "text-blue-500" },
                            { label: "Load Velocity", value: "320ms", icon: Zap, color: "text-amber-500" },
                            { label: "Trust Score", value: "100%", icon: ShieldCheck, color: "text-purple-500" },
                        ].map((stat, i) => (
                            <m.div 
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-4 text-center lg:text-left"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto lg:mx-0 ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-4xl font-black text-white">{stat.value}</p>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </section>

                {/* Service Menu */}
                <Services />

                {/* High-Impact Proof */}
                <Projects />

                {/* Professional Foundation */}
                <About />

                 {/* Lead Qualification Quiz */}
                <section className="py-32 bg-[#020202] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">Strategic Alignment</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Qualify your <span className="text-emerald-500 italic">Project Intensity</span></h2>
                        </div>
                        <QualificationQuiz />
                    </div>
                </section>

                {/* Lead Capture */}
                <LeadMagnet />

                {/* Pricing Tiers */}
                <Pricing />

                {/* Final Client CTA */}
                <section className="py-40 bg-black text-center relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[120px]" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8 mx-auto">
                            <Globe size={32} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                            CAPTURE YOUR <span className="text-emerald-500 italic">MARKET.</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-medium tracking-tight mb-12">
                            Stop losing leads to slow, generic websites. Invest in a conversion engine that pays for itself.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onClick={() => openModal({ service: "Project Initiation", description: "Inquiry to initiate a new project with focus on ROI and conversion optimization." })} className="btn-primary py-6 px-16 text-xs uppercase tracking-widest font-black shadow-2xl bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50">
                                Start Project
                            </button>
                            <Link href="/audit" className="px-16 py-6 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Free Technical Audit
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </ClientShell>
    );
}
