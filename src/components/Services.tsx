"use client";

import { Code, Layout, Smartphone, Server, Globe, Rocket, Terminal } from "lucide-react";
import { motion } from "framer-motion";

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
    return (
        <section id="services" className="py-12 bg-[#050505] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        Services I Offer
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-subtitle mx-auto"
                    >
                        Specialized solutions for startups and businesses looking to scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay, duration: 0.5 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="card group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] border-white/5 hover:border-white/20"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <service.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
