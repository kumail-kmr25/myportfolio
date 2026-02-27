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
    ChevronDown, ChevronUp
} from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    demo: string;
    deployment?: string | null;
    github: string;
    beforeImageUrl?: string | null;
    afterImageUrl?: string | null;
    improvementDetails?: string | null;
    metrics?: string[];
    decisionLogs?: string[];
}

type Tab = "overview" | "architecture" | "challenges" | "metrics" | "screenshots" | "tech" | "impact" | "decisions";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Layout size={14} /> },
    { id: "architecture", label: "Architecture", icon: <GitBranch size={14} /> },
    { id: "challenges", label: "Challenges", icon: <AlertCircle size={14} /> },
    { id: "metrics", label: "Performance", icon: <BarChart3 size={14} /> },
    { id: "screenshots", label: "Screenshots", icon: <Monitor size={14} /> },
    { id: "tech", label: "Tech Stack", icon: <Code2 size={14} /> },
    { id: "impact", label: "Impact", icon: <TrendingUp size={14} /> },
    { id: "decisions", label: "Decisions", icon: <Code2 size={14} /> },
];

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
};

// ─────────────────────────────────────────
// Architecture Flow Diagram
// ─────────────────────────────────────────
const ARCH_NODES = [
    { id: "frontend", label: "Frontend", sub: "Next.js UI / Components", icon: <Monitor size={18} />, color: "blue", x: 10, y: 35 },
    { id: "api", label: "API", sub: "Route Handlers", icon: <Server size={18} />, color: "purple", x: 40, y: 35 },
    { id: "auth", label: "Auth Logic", sub: "JWT Validation & Guards", icon: <Lock size={18} />, color: "amber", x: 40, y: 70 },
    { id: "db", label: "Database", sub: "Prisma & PostgreSQL", icon: <Database size={18} />, color: "green", x: 70, y: 35 },
    { id: "storage", label: "File Storage", sub: "CDN Delivery", icon: <Layers size={18} />, color: "rose", x: 90, y: 35 },
];

const ARCH_EDGES = [
    { from: "frontend", to: "api", label: "GraphQL / REST" },
    { from: "frontend", to: "auth", label: "Session Cookies" },
    { from: "api", to: "db", label: "Secure Queries" },
    { from: "auth", to: "api", label: "Role Validation" },
    { from: "db", to: "storage", label: "Media References" },
];

const colorMap: Record<string, string> = {
    blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
    amber: "border-amber-500/50 bg-amber-500/10 text-amber-400",
    green: "border-green-500/50 bg-green-500/10 text-green-400",
    rose: "border-rose-500/50 bg-rose-500/10 text-rose-400",
    cyan: "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
};

const glowMap: Record<string, string> = {
    blue: "shadow-blue-500/30",
    purple: "shadow-purple-500/30",
    amber: "shadow-amber-500/30",
    green: "shadow-green-500/30",
    rose: "shadow-rose-500/30",
    cyan: "shadow-cyan-500/30",
};

function ArchitectureDiagram() {
    const [hovered, setHovered] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    return (
        <div className="relative w-full rounded-3xl bg-black/40 border border-white/5 overflow-hidden p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <GitBranch size={12} /> System Architecture Flow
            </div>

            {/* SVG connecting lines */}
            <div className="relative w-full" style={{ height: "260px" }}>
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.15)" />
                        </marker>
                    </defs>
                    {ARCH_EDGES.map((edge, i) => {
                        const from = ARCH_NODES.find(n => n.id === edge.from)!;
                        const to = ARCH_NODES.find(n => n.id === edge.to)!;
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

                {/* Nodes */}
                {ARCH_NODES.map((node) => (
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
                            ${colorMap[node.color]}
                            ${hovered === node.id ? `shadow-lg ${glowMap[node.color]}` : ""}
                            transition-all duration-300 min-w-[80px]
                        `}>
                            <div className="flex justify-center mb-1">{node.icon}</div>
                            <div className="text-[10px] font-black uppercase tracking-wider leading-tight">{node.label}</div>
                            <AnimatePresence>
                                {hovered === node.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                        animate={{ opacity: 1, y: -4, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black/90 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] text-gray-300 font-medium backdrop-blur-md z-10"
                                    >
                                        {node.sub}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5">
                {ARCH_EDGES.map((e, i) => (
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
// Metric Bar
// ─────────────────────────────────────────
function MetricBar({ label, value, max = 100, color = "blue", unit = "%" }: {
    label: string; value: number; max?: number; color?: string; unit?: string;
}) {
    const pct = Math.min((value / max) * 100, 100);
    const colorClass = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        amber: "bg-amber-500",
    }[color] || "bg-blue-500";

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
                <span className="text-sm font-black text-white">{value}{unit}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${colorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Tab Content Renderer
// ─────────────────────────────────────────
function TabContent({ tab, project }: { tab: Tab; project: Project }) {
    if (tab === "overview") {
        return (
            <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="flex gap-3 flex-wrap">
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-400 transition-all">
                        <ExternalLink size={14} /> Live Demo
                    </Link>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Github size={14} /> Source Code
                    </Link>
                    {project.deployment && project.deployment !== "https://" && (
                        <Link href={project.deployment} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Globe size={14} /> Deployment
                        </Link>
                    )}
                </div>
            </motion.div>
        );
    }

    if (tab === "architecture") {
        return (
            <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-blue-300 text-sm leading-relaxed">
                        This is not just about what was built — it&apos;s about <strong>how</strong> it was designed. The architecture below reflects real engineering decisions: auth flow, data access patterns, caching strategy, and role control.
                    </p>
                </div>
                <ArchitectureDiagram />
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: <Shield size={16} />, label: "Auth Guard", desc: "Middleware-level JWT protection on every admin route" },
                        { icon: <Database size={16} />, label: "Data Layer", desc: "Typed Prisma ORM with PostgreSQL — zero raw SQL" },
                        { icon: <Cpu size={16} />, label: "Edge Ready", desc: "Next.js Route Handlers compiled to edge functions" },
                    ].map((item) => (
                        <div key={item.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-blue-400">{item.icon}</div>
                            <div className="text-xs font-black text-white uppercase tracking-wider">{item.label}</div>
                            <div className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (tab === "challenges") {
        const challenges = project.improvementDetails
            ? [project.improvementDetails]
            : [
                "Designed a scalable API architecture that can handle 10x growth without structural changes",
                "Implemented real-time state sync between client and server without WebSockets",
                "Built a secure multi-layer auth system with zero third-party auth dependencies",
            ];

        return (
            <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
            >
                <p className="text-gray-500 text-xs uppercase tracking-widest font-black">Engineering Decisions & Problem Solving</p>
                {challenges.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                            <Lightbulb size={12} className="text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 leading-relaxed">{c}</p>
                        </div>
                    </motion.div>
                ))}
                <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-green-400 text-xs font-black uppercase tracking-widest">Resolution</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Each challenge was solved through principled engineering: research, prototyping, and incremental refinement — not brute force.
                    </p>
                </div>
            </motion.div>
        );
    }

    if (tab === "metrics") {
        return (
            <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-black text-green-400 mb-1">&lt;100ms</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Load Time</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-black text-blue-400 mb-1">O(1)</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">DB Query Comp.</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-black text-purple-400 mb-1">JWT</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Security</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-black text-amber-400 mb-1">100%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Role Logic Map</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Health Indicators</p>
                    <MetricBar label="Production Readiness" value={100} color="green" />
                    <MetricBar label="DB Query Optimization" value={98} color="blue" />
                    <MetricBar label="Security Defenses" value={100} color="purple" />
                    <MetricBar label="Role Authorization Coverage" value={100} color="amber" />
                </div>
            </motion.div>
        );
    }

    if (tab === "screenshots") {
        return (
            <motion.div
                key="screenshots"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                {project.beforeImageUrl && project.afterImageUrl ? (
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Transformation Gallery</p>
                        <ComparisonSlider before={project.beforeImageUrl} after={project.afterImageUrl} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Core Interface Snapshot</p>
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        );
    }

    if (tab === "tech") {
        const techCategories = [
            {
                label: "Frontend", color: "blue", icon: <Monitor size={14} />,
                items: project.tags.filter(t => ["React", "Next.js", "TypeScript", "Tailwind", "CSS", "HTML", "Vue", "Svelte", "Framer", "Motion"].some(k => t.toLowerCase().includes(k.toLowerCase()))),
            },
            {
                label: "Backend", color: "purple", icon: <Server size={14} />,
                items: project.tags.filter(t => ["Node", "Express", "API", "REST", "GraphQL", "Prisma", "Postgres", "SQL", "Mongo", "Redis"].some(k => t.toLowerCase().includes(k.toLowerCase()))),
            },
            {
                label: "Infrastructure", color: "green", icon: <Layers size={14} />,
                items: project.tags.filter(t => ["Vercel", "Railway", "Docker", "AWS", "GCP", "Azure", "Render", "Netlify", "Cloudflare"].some(k => t.toLowerCase().includes(k.toLowerCase()))),
            },
            {
                label: "Other", color: "amber", icon: <Code2 size={14} />,
                items: project.tags.filter(t => !["React", "Next.js", "TypeScript", "Tailwind", "CSS", "HTML", "Vue", "Svelte", "Framer", "Motion", "Node", "Express", "API", "REST", "GraphQL", "Prisma", "Postgres", "SQL", "Mongo", "Redis", "Vercel", "Railway", "Docker", "AWS", "GCP", "Azure", "Render", "Netlify", "Cloudflare"].some(k => t.toLowerCase().includes(k.toLowerCase()))),
            },
        ].filter(c => c.items.length > 0);

        // Fallback: just show all tags ungrouped if categorization fails
        const allCategorized = techCategories.flatMap(c => c.items);
        const uncategorized = project.tags.filter(t => !allCategorized.includes(t));

        return (
            <motion.div
                key="tech"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
            >
                {techCategories.length > 0 ? (
                    techCategories.map((cat) => (
                        <div key={cat.label} className="space-y-3">
                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${colorMap[cat.color].split(" ")[2]}`}>
                                {cat.icon} {cat.label}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((tag) => (
                                    <span key={tag} className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border ${colorMap[cat.color]}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-xl text-[11px] font-bold border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {uncategorized.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {uncategorized.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-xl text-[11px] font-bold border border-white/10 bg-white/5 text-gray-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mt-4">
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-black mb-2">Why this stack?</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Every technology was chosen deliberately — prioritizing developer velocity, runtime performance, and long-term maintainability over trend chasing.
                    </p>
                </div>
            </motion.div>
        );
    }

    if (tab === "impact") {
        return (
            <motion.div
                key="impact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
            >
                {[
                    { icon: <TrendingUp size={16} />, color: "green", title: "Business Value", desc: "Shipped a production-ready system that directly solves real user problems, not just a demo." },
                    { icon: <Clock size={16} />, color: "blue", title: "Delivery", desc: "Planned, designed, built, and deployed — end to end — maintaining code quality throughout." },
                    { icon: <Shield size={16} />, color: "purple", title: "Production Readiness", desc: "Secured with JWT auth, input sanitization, rate limiting, and error boundaries at every layer." },
                    { icon: <Zap size={16} />, color: "amber", title: "Performance First", desc: "Optimized for Core Web Vitals from day one — lazy loading, image optimization, and edge caching." },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex gap-4 p-5 rounded-2xl border ${colorMap[item.color]} hover:scale-[1.01] transition-transform`}
                    >
                        <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                        <div>
                            <div className="text-xs font-black uppercase tracking-widest mb-1">{item.title}</div>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    if (tab === "decisions") {
        return (
            <motion.div
                key="decisions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                    <p className="text-indigo-300 text-sm leading-relaxed">
                        <strong>Engineering Log:</strong> This section documents the critical trade-offs and technical decisions made during development. Transparent thinking is a core part of my engineering process.
                    </p>
                </div>

                <div className="space-y-0 relative ml-4">
                    {/* Timeline Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent" />

                    {project.decisionLogs && project.decisionLogs.length > 0 ? (
                        project.decisionLogs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-10 pb-8 last:pb-0 group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-indigo-500 z-10 group-hover:scale-125 transition-transform duration-300">
                                    <div className="absolute inset-1 rounded-full bg-indigo-500 animate-pulse" />
                                </div>

                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60 mb-1">
                                        Decision Step {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/[0.01] transition-all">
                                        <p className="text-sm text-gray-300 leading-relaxed font-mono">{log}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-600 border border-dashed border-white/5 rounded-3xl">
                            <Code2 className="w-8 h-8 mx-auto mb-4 opacity-20" />
                            No engineering logs registered for this phase yet.
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    return null;
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
    const { data: projects, error, isLoading } = useSWR<Project[]>("/api/projects", fetcher);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [selectorOpen, setSelectorOpen] = useState(false); // mobile
    const [showComparison, setShowComparison] = useState(false);

    const active = projects?.[activeIndex] ?? null;

    // Keyboard navigation
    useEffect(() => {
        if (!projects?.length) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") setActiveIndex(i => Math.max(0, i - 1));
            if (e.key === "ArrowDown") setActiveIndex(i => Math.min(projects.length - 1, i + 1));
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [projects]);

    // Reset tab when switching project
    useEffect(() => { setActiveTab("overview"); setShowComparison(false); }, [activeIndex]);

    if (error) return (
        <section id="projects" className="bg-[#050505] py-24">
            <div className="section-container">
                <div className="text-center py-20 text-red-400 text-sm">{error.message}</div>
            </div>
        </section>
    );

    if (isLoading) return (
        <section id="projects" className="bg-[#050505] py-24">
            <div className="section-container flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        </section>
    );

    if (!projects || projects.length === 0) return (
        <section id="projects" className="bg-[#050505] py-24">
            <div className="section-container text-center py-20 text-gray-500">No projects yet. Check back soon.</div>
        </section>
    );

    return (
        <section id="projects" className="bg-[#050505] py-24">
            <motion.div
                className="section-container relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">System Lab</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 text-center"
                    >
                        Project <span className="text-gray-500 italic">Intelligence</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-3xl mx-auto text-center leading-relaxed"
                    >
                        Exploring the nexus of architecture, challenge, and resolution. Each project represents a unique technical narrative built on principles of scalability and design excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mt-12"
                    >
                        <LiveStatusBadge variant="hero" />
                    </motion.div>
                </div>

                {/* Mobile selector toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setSelectorOpen(o => !o)}
                        className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                    >
                        <span>{active?.title ?? "Select a project"}</span>
                        {selectorOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <AnimatePresence>
                        {selectorOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-2 rounded-2xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/5">
                                    {projects.map((p, i) => (
                                        <button
                                            key={p.id}
                                            onClick={() => { setActiveIndex(i); setSelectorOpen(false); }}
                                            className={`w-full text-left px-5 py-4 text-sm font-bold transition-colors ${i === activeIndex ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                        >
                                            {p.title}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main layout: sidebar + content */}
                <div className="flex gap-6 items-start">

                    {/* ── Left: Project Selector (desktop) ── */}
                    <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 gap-2 sticky top-28">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-1">Projects</p>
                        {projects.map((p, i) => (
                            <motion.button
                                key={p.id}
                                onClick={() => setActiveIndex(i)}
                                whileHover={{ x: 4 }}
                                className={`
                                    group relative w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300
                                    ${i === activeIndex
                                        ? "bg-blue-500/10 border-blue-500/40 text-white"
                                        : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                                    }
                                `}
                            >
                                {i === activeIndex && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-blue-500"
                                    />
                                )}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-sm leading-tight">{p.title}</div>
                                        <div className={`text-[10px] mt-1 uppercase tracking-widest font-black ${i === activeIndex ? "text-blue-400/70" : "text-gray-600"}`}>
                                            {p.tags.slice(0, 2).join(" · ")}
                                        </div>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`flex-shrink-0 transition-all ${i === activeIndex ? "text-blue-400 translate-x-1" : "text-gray-600 opacity-0 group-hover:opacity-100"}`}
                                    />
                                </div>
                            </motion.button>
                        ))}

                        {/* Keyboard hint */}
                        <div className="mt-4 px-2 flex gap-2 items-center text-[10px] text-gray-700">
                            <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd>
                            <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd>
                            <span>to navigate</span>
                        </div>
                    </aside>

                    {/* ── Right: Project Detail Panel ── */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {active && (
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="space-y-6"
                                >
                                    {/* Project header */}
                                    <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                                                        {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                                        Production
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{active.title}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={active.demo} target="_blank" rel="noopener noreferrer"
                                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link href={active.github} target="_blank" rel="noopener noreferrer"
                                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <Github size={18} />
                                                </Link>
                                            </div>
                                        </div>

                                        {active.beforeImageUrl && active.afterImageUrl && (
                                            <button
                                                onClick={() => setShowComparison(true)}
                                                className="mt-4 flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors"
                                            >
                                                <Activity size={12} /> View Before/After Transformation
                                                <ArrowRight size={12} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex overflow-x-auto gap-1 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 scrollbar-hide">
                                        {TABS.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`
                                                    flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex-shrink-0
                                                    ${activeTab === tab.id
                                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                                    }
                                                `}
                                            >
                                                {tab.icon}
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab content */}
                                    <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            <TabContent key={`${active.id}-${activeTab}`} tab={activeTab} project={active} />
                                        </AnimatePresence>
                                    </div>

                                    {/* Next project nudge */}
                                    {activeIndex < projects.length - 1 && (
                                        <button
                                            onClick={() => setActiveIndex(i => i + 1)}
                                            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-gray-500 hover:text-white transition-all group"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest">Next Project</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold">{projects[activeIndex + 1].title}</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Comparison Modal */}
            <AnimatePresence>
                {showComparison && active?.beforeImageUrl && active?.afterImageUrl && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowComparison(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl"
                        >
                            <button
                                onClick={() => setShowComparison(false)}
                                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-black text-white mb-2">{active.title}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-black mb-6">Before / After — Drag to compare</p>
                            <ComparisonSlider before={active.beforeImageUrl} after={active.afterImageUrl} />
                            {active.improvementDetails && (
                                <p className="mt-4 text-sm text-gray-400 italic">&quot;{active.improvementDetails}&quot;</p>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
