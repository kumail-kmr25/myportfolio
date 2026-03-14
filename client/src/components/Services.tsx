"use client";

import { Code, Layout, Smartphone, Server, Globe, Rocket, Terminal } from "lucide-react";
import { m, Variants } from "framer-motion";
import { useHireModal } from "@/context/HireModalContext";

const services = [
    {
        icon: Layout,
        title: "Web Development",
        description: "Responsive, high-performance websites built with Next.js and Tailwind CSS.",
        delay: 0,
    },
    {
        icon: Code,
        title: "Full Stack Solutions",
        description: "End-to-end development including backend APIs, database design, and frontend implementation.",
        delay: 0.1,
    },
    {
        icon: Server,
        title: "DevOps & Deployment",
        description: "CI/CD pipelines, Docker containerization, and cloud deployment on AWS/Vercel.",
        delay: 0.2,
    },
    {
        icon: Code,
        title: "Technical Consulting",
        description: "Strategic advice on architecture, scalability, and technical debt reduction.",
        delay: 0.3,
    },
    {
        icon: Globe,
        title: "SEO Optimization",
        description: "Technical SEO, performance optimization, and accessibility improvements for better ranking.",
        delay: 0.4,
    },
    {
        icon: Rocket,
        title: "MVP Development",
        description: "Rapid prototyping and MVP development for startups to get to market quickly.",
        delay: 0.5,
    },
];

export default function Services() {
    const { openModal } = useHireModal();
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="services" className="py-24 lg:py-16 bg-[#050505] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16 lg:mb-12">
                    <m.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block"
                    >
                        Expertise
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        Services <span className="text-gray-500">I Offer</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Specialized solutions for startups and businesses looking to scale through technical excellence.
                    </m.p>
                </div>

                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <m.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            onClick={() => openModal()}
                            className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>
                        </m.div>
                    ))}
                </m.div>

                {/* Strategic Workflow Consolidation */}
                <div className="mt-32 pt-32 border-t border-white/5">
                    <div className="text-center mb-16">
                        <m.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                        >
                            Execution Framework
                        </m.span>
                        <h3 className="text-3xl font-bold text-white">How I <span className="text-gray-500 italic">Deliver</span></h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Audit", desc: "Technical bottleneck analysis." },
                            { title: "Strategy", desc: "Scope & architecture definition." },
                            { title: "Build", desc: "Iterative development with updates." },
                            { title: "Launch", desc: "Deployment & 30-day support." }
                        ].map((step, i) => (
                            <m.div 
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col items-center text-center group hover:border-blue-500/20 transition-all"
                            >
                                <div className="text-blue-500 text-xs font-black mb-3">0{i+1}</div>
                                <h4 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors">{step.title}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                            </m.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
