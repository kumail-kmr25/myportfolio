"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Loader2, ArrowUpRight, PenLine, Trash2, Globe } from "lucide-react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || "Failed to fetch projects");
    }
    return res.json();
};

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
}

function ComparisonSlider({ before, after }: { before: string; after: string }) {
    const [sliderPos, setSliderPos] = useState(50);
    const [isResizing, setIsResizing] = useState(false);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isResizing) return;
        const container = (ref.current as any).getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const position = ((x - container.left) / container.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    const ref = useRef(null);

    return (
        <div
            ref={ref}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={() => setIsResizing(true)}
            onMouseUp={() => setIsResizing(false)}
            onMouseLeave={() => setIsResizing(false)}
            onTouchStart={() => setIsResizing(true)}
            onTouchEnd={() => setIsResizing(false)}
        >
            <Image src={after} alt="After" fill className="object-cover" />
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <Image src={before} alt="Before" fill className="object-cover" />
            </div>

            <div
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-black -ml-0.5">
                    <ArrowLeftRight size={14} />
                </div>
            </div>

            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">Before</div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">After</div>
        </div>
    );
}

import { ArrowLeftRight, Activity } from "lucide-react";
import { useRef } from "react";

export default function Projects() {
    const { data: projects, error, isLoading, mutate } = useSWR<Project[]>("/api/projects", fetcher);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedComparison, setSelectedComparison] = useState<Project | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/contact");
                if (res.ok) setIsAdmin(true);
            } catch (err) { }
        };
        checkSession();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            mutate();
        } catch (err) {
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="text-center py-20 text-red-500 bg-red-500/5 rounded-3xl border border-red-500/10 mx-auto max-w-4xl">
                <p className="font-medium">Error: {error.message}</p>
                <p className="text-sm text-gray-500 mt-2">Please check if the server is running and the database is connected.</p>
            </div>
        );
    }

    return (
        <section id="projects" className="bg-[#050505] py-12">
            <div className="section-container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">
                    Here are some of the projects I&apos;ve worked on. Each one presented unique challenges and learning opportunities.
                </p>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : !projects || projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No projects found. Check back soon!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.isArray(projects) && projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>

                                <div className="card relative h-full flex flex-col overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-white/20 transition-all duration-500 rounded-[2rem]">
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden aspect-[16/10] rounded-2xl m-3 mb-6">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index < 3}
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <div className="flex justify-between items-end w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex gap-4">
                                                    <Link
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Live demo of ${project.title}`}
                                                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                    >
                                                        <ExternalLink size={18} aria-hidden="true" />
                                                    </Link>
                                                    {project.deployment && project.deployment !== "https://" && project.deployment !== "" && (
                                                        <Link
                                                            href={project.deployment}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`Deployment link for ${project.title}`}
                                                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                        >
                                                            <Globe size={18} aria-hidden="true" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`GitHub repository for ${project.title}`}
                                                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                    >
                                                        <Github size={18} aria-hidden="true" />
                                                    </Link>
                                                </div>
                                                {isAdmin && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => router.push(`/admin?tab=projects&edit=${project.id}`)} aria-label={`Edit ${project.title}`} className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all backdrop-blur-md">
                                                            <PenLine size={18} aria-hidden="true" />
                                                        </button>
                                                        <button onClick={() => handleDelete(project.id)} aria-label={`Delete ${project.title}`} className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 border border-red-500/30 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all backdrop-blur-md">
                                                            <Trash2 size={18} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-8 pb-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                                                    {project.title}
                                                </h3>
                                                {project.beforeImageUrl && project.afterImageUrl && (
                                                    <button
                                                        onClick={() => setSelectedComparison(project)}
                                                        className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                                                    >
                                                        <Activity size={12} /> View Transformation
                                                    </button>
                                                )}
                                            </div>
                                            <ArrowUpRight size={20} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>

                                        <p className="text-gray-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Comparison Modal */}
            <AnimatePresence>
                {selectedComparison && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedComparison(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedComparison(null)}
                                className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white transition-all border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                                    <div className="mb-10">
                                        <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Activity size={14} /> Optimization Case Study
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 line-clamp-2">
                                            {selectedComparison.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed italic">
                                            &quot;{selectedComparison.improvementDetails}&quot;
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedComparison.metrics?.map((metric, i) => (
                                                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <div className="text-blue-500 font-black text-xl mb-1">
                                                        {metric.split(' ')[0]}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight">
                                                        {metric.split(' ').slice(1).join(' ')}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Key Achievement</h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                Successfully transformed the legacy architecture into a high-performance system, meeting all engineering KPIs.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center">
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                        Interactive Comparison
                                        <span className="text-[10px] text-gray-500 normal-case font-medium">(Slide to compare)</span>
                                    </h4>
                                    <ComparisonSlider
                                        before={selectedComparison.beforeImageUrl || ""}
                                        after={selectedComparison.afterImageUrl || ""}
                                    />
                                    <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        <span>Legacy Implementation</span>
                                        <span>Optimized System</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

import { X } from "lucide-react";
