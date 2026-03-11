"use client";

import { m } from "framer-motion";
import { Server, Zap, Globe, Cpu } from "lucide-react";

const signals = [
    {
        icon: <Zap className="w-5 h-5 text-blue-400" />,
        label: "Technologies",
        value: "Next.js | Node.js | MongoDB | PostgreSQL | Cloud Deployment",
    },
    {
        icon: <Globe className="w-5 h-5 text-purple-400" />,
        label: "Deployment",
        value: "Production applications deployed with modern infrastructure.",
    },
    {
        icon: <Cpu className="w-5 h-5 text-emerald-400" />,
        label: "Expertise",
        value: "Full-Stack Architecture & Scalable Systems",
    },
    {
        icon: <Server className="w-5 h-5 text-amber-400" />,
        label: "Availability",
        value: "Accepting Freelance & Enterprise Projects",
    }
];

export default function TrustSignals() {
    return (
        <section className="py-12 bg-[#020202] border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {signals.map((signal, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-blue-500/30 transition-all duration-500">
                                {signal.icon}
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
                                    {signal.label}
                                </h4>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-white transition-colors duration-500">
                                    {signal.value}
                                </p>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
