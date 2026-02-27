"use client";

import { Code, Layout, Smartphone, Server, Globe, Rocket, Terminal } from "lucide-react";
import { motion, Variants } from "framer-motion";

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
        icon: Terminal,
        title: "Bug Fixing & Optimization",
        description: "Debugging complex issues, resolving runtime errors, and optimizing application performance.",
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
            {/* Background blobs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block"
                    >
                        Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        Services <span className="text-gray-500">I Offer</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Specialized solutions for startups and businesses looking to scale through technical excellence.
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
