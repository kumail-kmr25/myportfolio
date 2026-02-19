"use client";

import { Code2, Database, Layout, Server, Smartphone, Terminal, Cpu, Globe } from "lucide-react";

const skills = [
    { name: "React", icon: Code2, color: "text-cyan-400" },
    { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
    { name: "Next.js", icon: Globe, color: "text-white" },
    { name: "TypeScript", icon: Code2, color: "text-blue-400" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "Tailwind CSS", icon: Layout, color: "text-cyan-300" },
    { name: "MongoDB", icon: Database, color: "text-green-400" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-300" },
    { name: "Docker", icon: Smartphone, color: "text-blue-500" },
    { name: "AWS", icon: Cloud, color: "text-orange-400" },
    { name: "GraphQL", icon: Cpu, color: "text-pink-500" },
];

// Duplicate for infinite scroll effect
const allSkills = [...skills, ...skills];

import { Cloud } from "lucide-react";

export default function Skills() {
    return (
        <section className="py-20 bg-[#050505] overflow-hidden relative">
            <div className="section-container mb-12 text-center">
                <h2 className="section-title">Tech Stack</h2>
                <p className="section-subtitle mx-auto">
                    Technologies I work with to build high-performance applications.
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
                    {allSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            <skill.icon className={`w-6 h-6 ${skill.color}`} />
                            <span className="text-xl font-medium text-gray-200">{skill.name}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 py-4 ml-8">
                    {/* Second set for seamless loop - handled by CSS usually, but here we duplicated the array */}
                </div>
            </div>

            {/* Gradient masks for smooth fade */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#050505] to-transparent z-10" />
        </section>
    );
}
