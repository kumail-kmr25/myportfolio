"use client";

import { m, Variants } from "framer-motion";
import { Phone, FileText, Palette, FlaskConical, Rocket, Search } from "lucide-react";

const steps = [
    {
        id: "step-0",
        icon: Search,
        title: "Technical Audit",
        desc: "Deep-core analysis of your performance, SEO, and structural bottlenecks",
        delay: 0.05
    },
    {
        id: "step-1",
        icon: Phone,
        title: "Discovery Call",
        desc: "Free 30-min call to understand your goals, budget and timeline",
        delay: 0.1
    },
    {
        id: "step-2",
        icon: FileText,
        title: "Proposal & Scope",
        desc: "Detailed project proposal delivered within 24 hours",
        delay: 0.2
    },
    {
        id: "step-3",
        icon: Palette,
        title: "Design & Build",
        desc: "Weekly progress updates throughout development",
        delay: 0.3
    },
    {
        id: "step-4",
        icon: FlaskConical,
        title: "Testing & Revisions",
        desc: "2 rounds of revisions included before launch",
        delay: 0.4
    },
    {
        id: "step-5",
        icon: Rocket,
        title: "Launch & Support",
        desc: "Full deployment + 30 days of free post-launch support",
        delay: 0.5
    }
];

export default function Process() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="process" className="py-24 lg:py-16 bg-[#050505] relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                    >
                        Strategic Workflow
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                    >
                        My <span className="text-gray-500 italic">Process</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl text-lg"
                    >
                        A systematic approach to building production-ready platforms that scale.
                    </m.p>
                </div>

                <div className="relative">
                    {/* Horizontal Line for Desktop */}
                    <div className="absolute top-[45px] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden lg:block" />
                    
                    <m.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12 lg:gap-8"
                    >
                        {steps.map((step, index) => (
                            <m.div
                                key={step.id}
                                variants={itemVariants}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-[90px] h-[90px] rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 relative z-10 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 group-hover:scale-110">
                                    <step.icon size={32} className="text-blue-500 group-hover:text-white transition-colors" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-black text-blue-400 group-hover:bg-white group-hover:text-blue-600 transition-all">
                                        0{index + 1}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {step.desc}
                                </p>
                            </m.div>
                        ))}
                    </m.div>
                </div>
            </div>
        </section>
    );
}
