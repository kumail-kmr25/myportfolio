"use client";

import { m } from "framer-motion";
import { Leaf, TrendingUp, Target } from "lucide-react";

interface JourneyLeafProps {
    step: any;
}

export default function JourneyLeaf({ step }: JourneyLeafProps) {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-blue-500/30 transition-all group"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    {step.icon ? <span className="text-xl">{step.icon}</span> : <Leaf size={20} />}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">{step.description}</p>
                    
                    {step.growthMetric && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                            <TrendingUp size={12} />
                            {step.growthMetric}
                        </div>
                    )}
                    
                    {step.impactMetric && (
                        <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            <Target size={12} />
                            {step.impactMetric}
                        </div>
                    )}
                </div>
            </div>
            
            {(step.technologies && step.technologies.length > 0) && (
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {step.technologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-gray-500">
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </m.div>
    );
}
