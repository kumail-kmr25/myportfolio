"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Loader2, ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import { motion } from "framer-motion";

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
    github: string;
}

export default function Projects() {
    const { data: projects, error, isLoading } = useSWR<Project[]>("/api/projects", fetcher);

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
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <Link
                                                    href={project.demo}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                >
                                                    <Github size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-8 pb-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                                                {project.title}
                                            </h3>
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
        </section>
    );
}
