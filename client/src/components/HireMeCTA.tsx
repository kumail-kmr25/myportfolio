"use client";

import { motion } from "framer-motion";
import { Bug, Code2, Layout, Database, Zap, Cloud, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

const services = [
    { label: "Fix Bugs", icon: Bug, color: "text-red-500", bg: "bg-red-500/10", service: "Bug Fix / Error Optimisation" },
    { label: "Full Stack Dev", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10", service: "Full Stack Development" },
    { label: "UI/UX Design", icon: Layout, color: "text-purple-500", bg: "bg-purple-500/10", service: "UI/UX Design" },
    { label: "DB Design", icon: Database, color: "text-green-500", bg: "bg-green-500/10", service: "Database Design" },
    { label: "Performance", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", service: "Performance Tuning" },
    { label: "Cloud Deploy", icon: Cloud, color: "text-orange-500", bg: "bg-orange-500/10", service: "DevOps / Cloud" },
];

export default function HireMeCTA() {
    return (
        <section className="py-12 bg-[#050505] relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="section-container relative z-10">
                <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Ready to Build Something <span className="text-blue-500">Legendary?</span>
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
                        Whether you need a full-scale application or a critical performance boost, I&apos;m here to deliver high-performance engineering.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                        {services.map((item, index) => (
                            <Link
                                key={item.label}
                                href={`#contact?service=${encodeURIComponent(item.service)}`}
                                className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={24} />
                                </div>
                                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest text-center">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            href="#contact"
                            className="btn-primary px-12 py-5 text-lg font-bold flex items-center gap-3 w-full md:w-auto"
                        >
                            Start Your Project <ArrowRight size={20} />
                        </Link>
                        <LiveStatusBadge variant="hero" />
                    </div>
                </div>
            </div>
        </section>
    );
}
