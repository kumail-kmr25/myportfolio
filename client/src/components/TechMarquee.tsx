"use client";

import React from "react";
import { m } from "framer-motion";

const techStack = [
    "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", 
    "MongoDB", "Docker", "AWS", "Vercel", "Tailwind CSS", 
    "Framer Motion", "Prisma", "GraphQL", "Redis", "Expert Engineering"
];

export default function TechMarquee() {
    return (
        <div className="py-8 bg-[#050505] border-y border-white/5 relative overflow-hidden select-none">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
            
            <m.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 30, 
                    ease: "linear" 
                }}
                className="flex whitespace-nowrap gap-x-12"
            >
                {[...techStack, ...techStack].map((tech, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-blue-500 transition-colors cursor-default">
                            {tech}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-blue-500/20" />
                    </div>
                ))}
            </m.div>
        </div>
    );
}
