"use client";

import { Code2, Database, Layout, Server, Smartphone, Terminal, Cpu, Globe, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
    { name: "React", icon: Code2, color: "text-cyan-400" },
    { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
    { name: "Next.js", icon: Globe, color: "text-white" },
    { name: "TypeScript", icon: Code2, color: "text-blue-400" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "Tailwind CSS", icon: Layout, color: "text-cyan-300" },
    { name: "Prisma", icon: Database, color: "text-blue-500" },
    { name: "MongoDB", icon: Database, color: "text-green-400" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-300" },
    { name: "Docker", icon: Smartphone, color: "text-blue-500" },
    { name: "AWS", icon: Cloud, color: "text-orange-400" },
    { name: "GraphQL", icon: Cpu, color: "text-pink-500" },
];

// Duplicate for infinite scroll effect
const allSkills = [...skills, ...skills, ...skills];

export default function Skills() {
    return (
        <section className="py-12 bg-[#050505] overflow-hidden relative">
            <div className="section-container mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle mx-auto">
                        Technologies I work with to build high-performance applications.
                    </p>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-8 py-10">
                    {allSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.1,
                                rotateY: 15,
                                rotateX: -5,
                                z: 50
                            }}
                            className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.07] transition-all backdrop-blur-md cursor-default group/skill shadow-xl hover:shadow-blue-500/10"
                        >
                            <skill.icon className={`w-8 h-8 ${skill.color} transition-transform group-hover/skill:scale-110`} />
                            <span className="text-2xl font-bold tracking-tight text-gray-300 group-hover/skill:text-white transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 py-10">
                    {allSkills.map((skill, index) => (
                        <motion.div
                            key={`dupe-${index}`}
                            whileHover={{
                                scale: 1.1,
                                rotateY: 15,
                                rotateX: -5,
                                z: 50
                            }}
                            className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.07] transition-all backdrop-blur-md cursor-default group/skill shadow-xl hover:shadow-blue-500/10"
                        >
                            <skill.icon className={`w-8 h-8 ${skill.color} transition-transform group-hover/skill:scale-110`} />
                            <span className="text-2xl font-bold tracking-tight text-gray-300 group-hover/skill:text-white transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gradient masks for smooth fade */}
            <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        </section>
    );
}
