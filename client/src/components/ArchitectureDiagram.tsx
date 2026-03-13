"use client";

import { m } from "framer-motion";
import { Code2 } from "lucide-react";

interface Node {
    id: string;
    x: number;
    y: number;
    label: string;
    sub: string;
    color?: string;
}

interface Edge {
    from: string;
    to: string;
}

interface Architecture {
    nodes: Node[];
    edges?: Edge[];
}

interface ArchitectureDiagramProps {
    architecture: Architecture;
}

export default function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
    if (!architecture || !architecture.nodes) return null;

    return (
        <div className="relative aspect-[21/9] w-full bg-[#050505] rounded-[3rem] border border-white/5 overflow-hidden group/arch">
            {/* Grid Paper Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
            
            {/* Edges / Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {architecture.edges?.map((edge, i) => {
                    const from = architecture.nodes.find((n) => n.id === edge.from);
                    const to = architecture.nodes.find((n) => n.id === edge.to);
                    if (!from || !to) return null;
                    return (
                        <m.line 
                            key={i}
                            x1={`${from.x}%`} y1={`${from.y}%`}
                            x2={`${to.x}%`} y2={`${to.y}%`}
                            stroke="currentColor"
                            className="text-blue-500/20"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            {architecture.nodes.map((node, i) => (
                <m.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center gap-2 group/node hover:border-blue-500/50 transition-all cursor-default z-10"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div className={`p-2 rounded-lg bg-${node.color || 'blue'}-500/10 text-${node.color || 'blue'}-500`}>
                        <Code2 size={16} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-white uppercase tracking-tighter">{node.label}</p>
                        <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">{node.sub}</p>
                    </div>
                </m.div>
            ))}
        </div>
    );
}
