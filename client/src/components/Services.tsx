"use client";

import { Check, Zap, Shield, Rocket, Laptop, Server, Globe, Terminal, Code } from "lucide-react";
import { m, Variants } from "framer-motion";
import { useHireModal } from "@/context/HireModalContext";

const tiers = [
    {
        name: "Discovery & Audit",
        price: "From $499",
        description: "A deep dive into your existing codebase or new project idea.",
        features: [
            "Comprehensive code audit",
            "Performance bottleneck analysis",
            "Security vulnerability scan",
            "Architecture roadmap",
            "Development strategy"
        ],
        icon: Terminal,
        delay: 0,
    },
    {
        name: "MVP Development",
        price: "From $2,499",
        description: "Turn your idea into a production-ready MVP in record time.",
        features: [
            "Core feature implementation",
            "Database & API design",
            "User authentication",
            "Responsive frontend",
            "Launch on Vercel/AWS"
        ],
        icon: Rocket,
        delay: 0.1,
        featured: true,
    },
    {
        name: "Enterprise Scaling",
        price: "From $4,999",
        description: "Optimize and scale your application for high-traffic demands.",
        features: [
            "Global infrastructure setup",
            "Database optimization",
            "Microservices architecture",
            "Advanced monitoring",
            "99.9% uptime guarantee"
        ],
        icon: Server,
        delay: 0.2,
    },
    {
        name: "Full-Stack Retainer",
        price: "$1,999/mo",
        description: "On-demand development for your growing business needs.",
        features: [
            "Unlimited small features",
            "Priority support & bug fixes",
            "Performance maintenance",
            "Monthly technical review",
            "Weekly progress sync"
        ],
        icon: Code,
        delay: 0.3,
    },
    {
        name: "Technical Strategy",
        price: "Custom",
        description: "Fractional CTO services for strategic technical direction.",
        features: [
            "Technology stack selection",
            "Team technical mentorship",
            "Vendor management",
            "Scalability planning",
            "Security compliance (HIPAA/ISO)"
        ],
        icon: Globe,
        delay: 0.4,
    }
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
        <section id="services" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
            
            <div className="section-container relative z-10">
                <div className="text-center mb-20">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-sm tracking-[0.2em] uppercase mb-4 block"
                    >
                        Strategic Solutions
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Tiered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Services</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Choose the right level of partnership for your technical needs, from quick audits to long-term strategic support.
                    </m.p>
                </div>

                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                >
                    {tiers.map((tier, index) => (
                        <m.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className={`group relative p-8 rounded-[2rem] border transition-all duration-500 flex flex-col ${
                                tier.featured 
                                    ? "bg-gradient-to-b from-blue-600/10 to-transparent border-blue-500/30 ring-1 ring-blue-500/20" 
                                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                            }`}
                        >
                            {tier.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-blue-600/20">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${
                                    tier.featured ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-white/5 text-blue-400"
                                }`}>
                                    <tier.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="text-2xl font-black text-white mb-4">{tier.price}</div>
                                <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => openModal()}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                                    tier.featured
                                        ? "bg-blue-600 text-white hover:bg-blue-50 shadow-lg shadow-blue-600/20 hover:text-blue-600"
                                        : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                                }`}
                            >
                                Get Started
                            </button>
                        </m.div>
                    ))}
                </m.div>

                <div className="mt-24 pt-24 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        Not sure which tier fits your project?{" "}
                        <button onClick={() => openModal()} className="text-blue-500 hover:underline font-bold">
                            Book a free consultation
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
}
