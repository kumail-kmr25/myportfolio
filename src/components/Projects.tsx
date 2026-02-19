import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
    {
        title: "Edunova SaaS",
        description: "A comprehensive School Management System with role-based access control, attendance tracking, and grading. Features a powerful dashboard for administrators, teachers, and students.",
        tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
        image: "/edunova_dashboard.svg",
        demo: "#",
        github: "https://github.com/kumail-kmr25/Edunova-saas.git",
    },
    {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform built with Next.js, Stripe, and Sanity CMS.",
        tags: ["Next.js", "TypeScript", "Stripe", "Sanity"],
        image: "/ecommerce_project.svg",
        demo: "#",
        github: "#",
    },
    {
        title: "AI Content Generator",
        description: "An AI-powered application that generates marketing copy using OpenAI API.",
        tags: ["OpenAI", "Next.js", "Tailwind CSS"],
        image: "/ai_project.svg",
        demo: "#",
        github: "#",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="bg-[#050505] py-20">
            <div className="section-container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">
                    Here are some of the projects I&apos;ve worked on. Each one presented unique challenges and learning opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="card group">
                            <div className="relative overflow-hidden rounded-xl mb-6 h-48">
                                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
                                <Link href={project.demo} className="flex items-center text-sm font-medium text-white hover:text-blue-400 transition-colors">
                                    <ExternalLink size={16} className="mr-2" /> Live Demo
                                </Link>
                                <Link href={project.github} className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    <Github size={16} className="mr-2" /> Source Code
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
