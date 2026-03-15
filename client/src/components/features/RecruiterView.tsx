"use client";

import { m } from "framer-motion";
import { Briefcase, Download, CheckCircle, Clock, Zap, Target, Star, ShieldCheck } from "lucide-react";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(json => json.success ? json.data : json);

export default function RecruiterView() {
    const { data: resume } = useSWR("/api/resume", fetcher);
    const { data: skills } = useSWR("/api/skills", fetcher);
    const { data: availability } = useSWR("/api/availability", fetcher);
    return (
        <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24 border-b border-white/5 pb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            <p className="text-xs text-orange-400 font-black uppercase tracking-[0.5em]">Executive Summary</p>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Recruiter Portal
                        </h2>
                    </div>
                    <button className="btn-primary py-6 px-12 group flex items-center gap-4 !from-orange-600 !to-red-600 shadow-2xl shadow-orange-500/20">
                        <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                        <span className="font-black uppercase tracking-widest">Download Full Dossier</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left: Quick Stats & Availability */}
                    <div className="space-y-16">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-10 glass-effect rounded-[3rem] border border-white/5 space-y-4">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Status</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    <p className="text-2xl font-black text-white italic">{availability?.status || "Available"}</p>
                                </div>
                            </div>
                            <div className="p-10 glass-effect rounded-[3rem] border border-white/5 space-y-4">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Experience</p>
                                <p className="text-4xl font-black text-white italic tracking-tighter">8.4+</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Core Competencies</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {(Array.isArray(skills) ? skills : []).slice(0, 5).map((skill: any) => (
                                    <div key={skill.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-1.5 h-4 rounded-full ${i <= 4 ? 'bg-orange-500' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Verification */}
                    <div className="space-y-12">
                        <div className="p-12 glass-effect rounded-[4rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-10">Technical Foundation</h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Architectural Integrity</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Proven track record of designing scalable microservices and monorepo architectures for high-traffic applications.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Rapid Deployment</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Expertise in CI/CD orchestration, reducing deployment cycles by up to 60% through automated verification logic.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Security-First Culture</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Implementing HIPAA-ready and ISO-compliant security patterns at the kernel level of every application.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
