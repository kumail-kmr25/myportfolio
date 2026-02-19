"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

    if (error) return null; // Or handle error UI

    return (
        <section id="projects" className="bg-[#050505] py-20">
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
                        {projects.map((project) => (
                            <div key={project.id} className="card group">
                                <div className="relative overflow-hidden rounded-xl mb-6 h-48">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Link href={project.demo} target="_blank" className="flex items-center text-sm font-medium text-white hover:text-blue-400 transition-colors">
                                        <ExternalLink size={16} className="mr-2" /> Live Demo
                                    </Link>
                                    <Link href={project.github} target="_blank" className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                        <Github size={16} className="mr-2" /> Source Code
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
