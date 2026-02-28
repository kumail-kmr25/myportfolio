"use client";

import { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import useSWR from "swr";
import {
    ExternalLink, Github, Globe, ChevronRight, Layers, Zap,
    Shield, Database, Server, Monitor, ArrowRight, TrendingUp,
    Clock, CheckCircle, AlertCircle, Code2, BarChart3, Lightbulb,
    Layout, GitBranch, Cpu, Lock, Loader2, X, ArrowLeftRight, Activity,
    ChevronDown, ChevronUp, Users
} from "lucide-react";
import { getApiUrl } from "@/lib/api";

interface Architecture {
    nodes: Array<{ id: string; label: string; sub: string; icon: string; color: string; x: number; y: number }>;
    edges: Array<{ from: string; to: string; label: string }>;
}

interface Project {
    id: string;
    title: string;
    summary?: string;
    description: string;
    status: string;
    role?: string;
    tags: string[];
    image: string;
    demo?: string | null;
    github?: string | null;

    // Case Study
    problem?: string;
    solution?: string;
    targetAudience?: string;
    valueProp?: string;
    architecture?: Architecture;
    challenges?: string;
    engineering?: string;
    performance?: string;
    scalability?: string;
    security?: string;
    lessons?: string;

    // Depth
    uiDepth: number;
    backendDepth: number;
    securityDepth: number;
    scalabilityDepth: number;

    // Compatibility
    beforeImageUrl?: string | null;
    afterImageUrl?: string | null;
    improvementDetails?: string | null;
    metrics?: string[];
    decisionLogs?: string[];
}

type Tab = "snapshot" | "overview" | "architecture" | "engineering" | "performance" | "lessons";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "snapshot", label: "Snapshot", icon: <Zap size={14} /> },
    { id: "overview", label: "Overview", icon: <Layout size={14} /> },
    { id: "architecture", label: "Architecture", icon: <GitBranch size={14} /> },
    { id: "engineering", label: "Engineering", icon: <Code2 size={14} /> },
    { id: "performance", label: "Performance", icon: <Activity size={14} /> },
    { id: "lessons", label: "Lessons", icon: <Lightbulb size={14} /> },
];

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
};

// ─────────────────────────────────────────
// Architecture Flow Diagram
// ─────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor size={18} />,
    Server: <Server size={18} />,
    Database: <Database size={18} />,
    Lock: <Lock size={18} />,
    Layers: <Layers size={18} />,
    Cpu: <Cpu size={18} />,
};

const colorMap: Record<string, string> = {
    blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
    green: "border-green-500/20 bg-green-500/5 text-green-400",
    rose: "border-rose-500/20 bg-rose-500/5 text-rose-400",
    indigo: "border-indigo-500/20 bg-indigo-500/5 text-indigo-400",
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
};

const glowMap: Record<string, string> = {
    blue: "shadow-blue-500/20 border-blue-500/40",
    purple: "shadow-purple-500/20 border-purple-500/40",
    amber: "shadow-amber-500/20 border-amber-500/40",
    green: "shadow-green-500/20 border-green-500/40",
    rose: "shadow-rose-500/20 border-rose-500/40",
    indigo: "shadow-indigo-500/20 border-indigo-500/40",
    emerald: "shadow-emerald-500/20 border-emerald-500/40",
};

function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
    const [hovered, setHovered] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    if (!architecture || !architecture.nodes) return null;

    return (
        <div className="relative w-full rounded-3xl bg-black/40 border border-white/5 overflow-hidden p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <GitBranch size={12} /> System Architecture Flow
            </div>

            <div className="relative w-full" style={{ height: "300px" }}>
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.15)" />
                        </marker>
                    </defs>
                    {architecture.edges.map((edge, i) => {
                        const from = architecture.nodes.find(n => n.id === edge.from)!;
                        const to = architecture.nodes.find(n => n.id === edge.to)!;
                        if (!from || !to) return null;
                        const x1 = `${from.x}%`;
                        const y1 = `${from.y}%`;
                        const x2 = `${to.x}%`;
                        const y2 = `${to.y}%`;
                        const isActive = hovered === edge.from || hovered === edge.to;
                        return (
                            <line
                                key={i}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={isActive ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.08)"}
                                strokeWidth={isActive ? "2" : "1"}
                                strokeDasharray={isActive ? "" : "4 4"}
                                markerEnd="url(#arrowhead)"
                                style={{ transition: "all 0.3s ease" }}
                            />
                        );
                    })}
                </svg>

                {architecture.nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onHoverStart={() => setHovered(node.id)}
                        onHoverEnd={() => setHovered(null)}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className={`
                            relative px-3 py-2 rounded-2xl border text-center
                            ${colorMap[node.color] || colorMap.blue}
                            ${hovered === node.id ? `shadow-lg ${glowMap[node.color] || glowMap.blue}` : ""}
                            transition-all duration-300 min-w-[80px]
                        `}>
                            {hovered === node.id && (
                                <motion.div
                                    layoutId="pulse"
                                    className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-md"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            )}
                            <div className="relative z-20">
                                <div className="flex justify-center mb-1">{iconMap[node.icon] || <Server size={18} />}</div>
                                <div className="text-[10px] font-black uppercase tracking-wider leading-tight">{node.label}</div>
                            </div>
                            <AnimatePresence>
                                {hovered === node.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                        animate={{ opacity: 1, y: -4, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black/90 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] text-gray-300 font-medium backdrop-blur-md z-30"
                                    >
                                        {node.sub}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5">
                {architecture.edges.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-gray-500">
                        <div className="w-4 border-t border-dashed border-white/20" />
                        <span>{e.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Engineering Depth Indicator
// ─────────────────────────────────────────
function EngineeringDepthIndicator({ project }: { project: Project }) {
    const indicators = [
        { label: "UI Complexity", value: project.uiDepth, color: "blue", icon: <Monitor size={14} /> },
        { label: "Backend Logic", value: project.backendDepth, color: "purple", icon: <Server size={14} /> },
        { label: "Security Layer", value: project.securityDepth, color: "amber", icon: <Lock size={14} /> },
        { label: "Scalability", value: project.scalabilityDepth, color: "green", icon: <Cpu size={14} /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {indicators.map((ind) => (
                <div key={ind.label} className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3 group">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl border ${colorMap[ind.color] || colorMap.blue}`}>
                                {ind.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                                {ind.label}
                            </span>
                        </div>
                        <span className="text-lg font-black text-white">{ind.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${ind.color === 'blue' ? 'bg-blue-500' : ind.color === 'purple' ? 'bg-purple-500' : ind.color === 'amber' ? 'bg-amber-500' : 'bg-green-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${ind.value}%` }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────
// Tab Content Renderer
// ─────────────────────────────────────────
function TabContent({ tab, project }: { tab: Tab; project: Project }) {
    const variants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    switch (tab) {
        case "snapshot":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Executive Info */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Product Core</h4>
                                <p className="text-xl text-white font-medium leading-relaxed">{project.summary}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Current Status</div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${project.status === 'Production' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                        {project.status}
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Engineering Role</div>
                                    <div className="text-sm font-bold text-white">{project.role}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] font-bold text-blue-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Depth Meters */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Engineering Depth Indicator</h4>
                            <EngineeringDepthIndicator project={project} />
                        </div>
                    </div>
                </motion.div>
            );

        case "overview":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-amber-400">
                                <AlertCircle size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">The Problem</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.problem}</p>
                        </section>
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-400">
                                <CheckCircle size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">The Solution</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.solution}</p>
                        </section>
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-400">
                                <Users size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Target Audience</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.targetAudience}</p>
                        </section>
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-purple-400">
                                <TrendingUp size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Value Proposition</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.valueProp}</p>
                        </section>
                    </div>
                </motion.div>
            );

        case "architecture":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-6">
                    {project.architecture && (
                        <div className="space-y-6">
                            <ArchitectureDiagram architecture={project.architecture} />
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">System Flow Analysis</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    This visual flow represents the core request-response lifecycle. Each node is engineered for specific throughput and security constraints, ensuring a robust and fault-tolerant system.
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            );

        case "engineering":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400">Crucial Challenges</h4>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.challenges}</p>
                        </section>
                        <section className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Engineering Approach</h4>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.engineering}</p>
                        </section>
                    </div>
                    {project.decisionLogs && project.decisionLogs.length > 0 && (
                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Technical Decision Log</h4>
                            <div className="flex flex-wrap gap-3">
                                {project.decisionLogs.map((log, i) => (
                                    <div key={i} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-400">
                                        • {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            );

        case "performance":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-cyan-400">
                                <Zap size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Optimizations</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.performance}</p>
                        </section>
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-indigo-400">
                                <Cpu size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Scalability Readiness</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.scalability}</p>
                        </section>
                    </div>

                    {/* Transformation & Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                        <div className="md:col-span-2 flex flex-wrap gap-3">
                            {project.metrics?.map((metric, i) => (
                                <div key={i} className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col group hover:border-blue-500/30 transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Measured Impact</span>
                                    <span className="text-sm font-black text-blue-400 group-hover:text-blue-300 transition-colors uppercase">{metric}</span>
                                </div>
                            ))}
                        </div>

                        {project.beforeImageUrl && project.afterImageUrl && (
                            <button
                                onClick={() => (window as any).toggleComparison?.()}
                                className="w-full p-6 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex flex-col items-center justify-center gap-2 group hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
                            >
                                <ArrowLeftRight size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Visual Evolution</span>
                                <span className="text-[8px] font-bold text-gray-500 uppercase">View Transformation</span>
                            </button>
                        )}
                    </div>

                    {project.improvementDetails && (
                        <div className="p-6 rounded-3xl bg-blue-500/[0.02] border border-blue-500/10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Technical Decompression</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{project.improvementDetails}</p>
                        </div>
                    )}
                </motion.div>
            );

        case "lessons":
            return (
                <motion.div {...variants} transition={{ duration: 0.3 }} className="space-y-6">
                    <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 border-l-4 border-l-amber-500">
                        <div className="flex items-center gap-4 text-amber-400 mb-4">
                            <Lightbulb size={24} />
                            <h4 className="text-lg font-black uppercase tracking-widest">Core Insights</h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-base italic">&ldquo;{project.lessons}&rdquo;</p>
                    </div>
                </motion.div>
            );

        default:
            return null;
    }
}

// ─────────────────────────────────────────
// Comparison Slider
// ─────────────────────────────────────────
function ComparisonSlider({ before, after }: { before: string; after: string }) {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(pos, 2), 98));
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl select-none cursor-ew-resize"
            onMouseMove={e => isDragging && handleMove(e.clientX)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            <Image src={after} alt="After" fill className="object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <Image src={before} alt="Before" fill className="object-cover" />
            </div>
            <div className="absolute inset-y-0 flex items-center" style={{ left: `${sliderPos}%` }}>
                <div className="w-0.5 h-full bg-white/80" />
                <div className="absolute w-9 h-9 rounded-full bg-white shadow-2xl flex items-center justify-center text-black -translate-x-1/2">
                    <ArrowLeftRight size={14} />
                </div>
            </div>
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">Before</span>
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-500/70 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">After</span>
        </div>
    );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────
export default function Projects() {
    const { data: projects, error, isLoading } = useSWR<Project[]>(getApiUrl("/api/projects"), fetcher);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<Tab>("snapshot");
    const [showComparison, setShowComparison] = useState(false);

    const active = projects?.[activeIndex];

    useEffect(() => {
        setActiveTab("snapshot");
    }, [activeIndex]);

    useEffect(() => {
        (window as any).toggleComparison = () => setShowComparison(true);
        return () => { delete (window as any).toggleComparison; };
    }, []);

    if (error) return null;
    if (isLoading || !projects) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <section id="projects" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-16 sm:mb-24 text-center sm:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center sm:justify-start gap-3 mb-4"
                    >
                        <div className="w-12 h-[1px] bg-blue-500/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Portfolio</span>
                    </motion.div>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter sm:max-w-3xl leading-[0.9]">
                        Product Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Studies.</span>
                    </h2>
                    <p className="mt-6 text-gray-500 text-sm sm:text-lg max-w-2xl font-medium leading-relaxed">
                        Deep-dives into architecture, technical challenges, and optimized workflows of my flagship projects.
                    </p>
                </div>

                {/* Mobile Selector Dropdown */}
                <div className="lg:hidden mb-12">
                    <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/10">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Select Product</label>
                        <select
                            value={activeIndex}
                            onChange={(e) => setActiveIndex(Number(e.target.value))}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white font-bold appearance-none outline-none focus:border-blue-500/50"
                        >
                            {projects.map((p, i) => (
                                <option key={p.id} value={i}>{p.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ── Left: Sidebar Vertical Selector (Desktop Only) ── */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 space-y-2 sticky top-32">
                        <div className="mb-6 p-4 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Project Intelligence Console</span>
                        </div>
                        {projects.map((p, i) => (
                            <button
                                key={p.id}
                                onClick={() => setActiveIndex(i)}
                                className={`
                                    w-full text-left p-5 rounded-2xl transition-all duration-300 group
                                    ${i === activeIndex
                                        ? "bg-white/[0.04] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                                        : "opacity-40 hover:opacity-100 border border-transparent"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs font-black transition-colors ${i === activeIndex ? "text-blue-500" : "text-gray-600 group-hover:text-blue-400"}`}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <div className={`text-sm font-black tracking-tight mb-0.5 ${i === activeIndex ? "text-white" : "text-gray-400"}`}>
                                            {p.title}
                                        </div>
                                        <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                                            {p.status}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </aside>

                    {/* ── Right: Dynamic Project Panel ── */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {active && (
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-8"
                                >
                                    {/* Project Header Widget */}
                                    <div className="relative p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
                                        {/* Banner Background */}
                                        <div className="absolute inset-0 z-0 opacity-20">
                                            <Image src={active.image} alt="" fill className="object-cover blur-2xl scale-125" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#050505]/80 to-transparent" />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${active.status === 'Production' ? 'border-green-500/50 text-green-400 bg-green-500/5' : 'border-amber-500/50 text-amber-400 bg-amber-500/5'}`}>
                                                            {active.status}
                                                        </span>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                                                            Role: {active.role}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                                                        {active.title}
                                                    </h3>
                                                </div>
                                                <div className="flex gap-3">
                                                    {active.demo && active.demo !== "#" && (
                                                        <Link href={active.demo} target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 text-[11px] font-black uppercase tracking-widest text-white hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                                                            <ExternalLink size={14} /> Live System
                                                        </Link>
                                                    )}
                                                    {active.github && active.github !== "#" && (
                                                        <Link href={active.github} target="_blank" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                            <Github size={20} />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard Tabs */}
                                    <div className="flex overflow-x-auto gap-1 p-2 rounded-[2rem] bg-white/[0.01] border border-white/5 scrollbar-hide">
                                        {TABS.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`
                                                    flex items-center gap-3 px-6 py-3.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex-shrink-0
                                                    ${activeTab === tab.id
                                                        ? "bg-white text-black shadow-2xl shadow-white/10"
                                                        : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
                                                    }
                                                `}
                                            >
                                                {tab.icon}
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Dynamic Content Display */}
                                    <motion.div
                                        layout
                                        initial={false}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 min-h-[500px] overflow-hidden"
                                    >
                                        <AnimatePresence mode="wait">
                                            <TabContent key={`${active.id}-${activeTab}`} tab={activeTab} project={active} />
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Bottom Nudge - Next Case Study */}
                                    <button
                                        onClick={() => {
                                            const next = (activeIndex + 1) % projects.length;
                                            setActiveIndex(next);
                                            window.scrollTo({ top: document.getElementById('projects')?.offsetTop ? document.getElementById('projects')!.offsetTop - 100 : 0, behavior: 'smooth' });
                                        }}
                                        className="group relative w-full h-48 rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-blue-500/20 overflow-hidden transition-all flex flex-col items-center justify-center gap-2 text-gray-600"
                                    >
                                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                            <Image src={projects[(activeIndex + 1) % projects.length].image} alt="" fill className="object-cover" />
                                        </div>
                                        <motion.div
                                            className="relative z-10 flex flex-col items-center gap-3"
                                            whileHover={{ y: -5 }}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-blue-500 transition-colors">Initialize Next Discovery</span>
                                            <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                                                {projects[(activeIndex + 1) % projects.length].title}
                                            </h4>
                                            <ArrowRight size={24} className="mt-2 group-hover:translate-x-2 transition-transform text-blue-500" />
                                        </motion.div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Comparison Modal */}
            <AnimatePresence>
                {showComparison && active?.beforeImageUrl && active?.afterImageUrl && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowComparison(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                            <button onClick={() => setShowComparison(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"><X size={20} /></button>
                            <h3 className="text-xl font-black text-white mb-2">{active.title}</h3>
                            <ComparisonSlider before={active.beforeImageUrl} after={active.afterImageUrl} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
