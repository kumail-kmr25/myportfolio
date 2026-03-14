"use client";

import { Check, ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { m } from "framer-motion";

const packages = [
    {
        name: "MVP / Landing Page",
        price: "Starts at $1,500",
        description: "Perfect for startups needing a high-converting landing page or a simple MVP to validate their idea.",
        icon: Zap,
        color: "blue",
        features: [
            "Custom UI/UX Design",
            "Next.js Speed Optimization",
            "Mobile Responsive Layout",
            "Contact Form Integration",
            "SEO Fundamental Setup",
            "1 Week Delivery"
        ]
    },
    {
        name: "Full Startup Package",
        price: "Starts at $3,500",
        description: "A complete production-ready web application with authentication, database, and custom logic.",
        icon: Rocket,
        color: "purple",
        featured: true,
        features: [
            "Everything in MVP",
            "User Authentication (NextAuth)",
            "Database Design (PostgreSQL/Prisma)",
            "Dynamic Content Management",
            "API Integrations",
            "Priority Support",
            "2-3 Weeks Delivery"
        ]
    },
    {
        name: "Enterprise / SaaS",
        price: "Custom Quote",
        description: "Scaleable SaaS architectures designed for high traffic and complex business requirements.",
        icon: Shield,
        color: "blue",
        features: [
            "Multi-tenant Architecture",
            "Advanced DevOps & Deployment",
            "Real-time Data (WebSockets)",
            "Performance Audit & Optimization",
            "White-label Implementation",
            "30-Day Post-Launch Support",
            "Ongoing Maintenance"
        ]
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block"
                    >
                        Investment Tiers
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Pricing <span className="text-gray-500 italic">& Packages</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Transparent pricing for world-class engineering. Choose a package that fits your stage, or contact me for a custom quote.
                    </m.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <m.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-[2.5rem] border ${pkg.featured ? 'border-blue-500/50 bg-blue-500/[0.03]' : 'border-white/5 bg-white/[0.02]'} flex flex-col`}
                        >
                            {pkg.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
                                    Most Popular
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pkg.color === 'blue' ? 'bg-blue-600/10 text-blue-500' : 'bg-purple-600/10 text-purple-500'}`}>
                                <pkg.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                            <div className="mb-4">
                                <span className="text-3xl font-black text-white">{pkg.price}</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                {pkg.description}
                            </p>

                            <ul className="space-y-4 mb-10 flex-1">
                                {pkg.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                                        <div className="text-blue-500 flex-shrink-0">
                                            <Check size={16} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${pkg.featured ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                            >
                                Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
