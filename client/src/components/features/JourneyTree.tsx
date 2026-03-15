"use client";

import { useScroll, useSpring, m, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHydrated } from "@/lib/hooks/useHydrated";

interface JourneyTreeProps {
    phases: any[];
    config?: any;
}

export default function JourneyTree({ phases, config }: JourneyTreeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hydrated = useHydrated();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mock constants for the tree geometry
    const treeWidth = 400;
    const treeHeight = phases.length * 300;
    const trunkWidth = 8;

    return (
        <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-20 min-h-[1000px]">
            {/* SVG Tree Background */}
            <svg
                viewBox={`0 0 ${treeWidth} ${treeHeight}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.2))" }}
            >
                {/* Trunk */}
                <m.path
                    d={`M ${treeWidth / 2} 0 V ${treeHeight}`}
                    fill="none"
                    stroke="url(#trunkGradient)"
                    strokeWidth={trunkWidth}
                    strokeLinecap="round"
                    style={{ pathLength }}
                />

                {/* Branches and Leaves points */}
                {phases.map((phase, index) => {
                    const y = (index + 0.5) * (treeHeight / phases.length);
                    const isLeft = index % 2 === 0;
                    const branchEndX = isLeft ? treeWidth / 2 - 60 : treeWidth / 2 + 60;
                    const branchEndY = y - 30;
                    
                    return (
                        <g key={phase.id || index}>
                            {/* Branch Path */}
                            <m.path
                                d={`M ${treeWidth / 2} ${y} C ${isLeft ? treeWidth / 2 - 30 : treeWidth / 2 + 30} ${y}, ${isLeft ? treeWidth / 2 - 40 : treeWidth / 2 + 40} ${branchEndY}, ${branchEndX} ${branchEndY}`}
                                fill="none"
                                stroke="url(#branchGradient)"
                                strokeWidth={3}
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                            />
                            
                            {/* Blooming Flower/Fruit at the end of branch */}
                            <m.g
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 260, 
                                    damping: 20, 
                                    delay: index * 0.1 + 0.8 
                                }}
                            >
                                <circle
                                    cx={branchEndX}
                                    cy={branchEndY}
                                    r={10}
                                    className="fill-blue-500/20 stroke-blue-500/50"
                                    strokeWidth={1}
                                />
                                <text
                                    x={branchEndX}
                                    y={branchEndY}
                                    fontSize="14"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className="select-none"
                                >
                                    {phase.ecoIcon || '🌸'}
                                </text>
                            </m.g>
                            
                            {/* Floating "Growth Particles" */}
                            {hydrated && [...Array(3)].map((_, i) => (
                                <m.circle
                                    key={i}
                                    cx={branchEndX}
                                    cy={branchEndY}
                                    r={1}
                                    fill="#60a5fa"
                                    animate={{
                                        x: (i - 1) * 20 + (Math.random() - 0.5) * 10,
                                        y: -40 - Math.random() * 20,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random(),
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                    }}
                                />
                            ))}
                        </g>
                    );
                })}

                <defs>
                    <linearGradient id="trunkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="branchGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Content Labels */}
            <div className="relative z-10">
                {phases.map((phase, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div 
                            key={phase.id || index}
                            className={`flex items-center mb-[200px] ${isLeft ? 'justify-start' : 'justify-end'}`}
                        >
                            <m.div 
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                            >
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase text-blue-400 mb-2">
                                    {phase.dateRange || phase.year}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 justify-end is-left:justify-end">
                                    {!isLeft && <span className="text-3xl">{phase.ecoIcon || '🌱'}</span>}
                                    {phase.title}
                                    {isLeft && <span className="text-3xl">{phase.ecoIcon || '🌱'}</span>}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {phase.description || phase.subtitle}
                                </p>
                                
                                <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                    {phase.steps?.map((step: any, sIdx: number) => (
                                        <div key={sIdx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400">
                                            {step.title}
                                        </div>
                                    ))}
                                </div>
                            </m.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
