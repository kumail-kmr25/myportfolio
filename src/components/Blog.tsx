"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
    {
        title: "How I Scaled a Next.js App to 1 Million Users",
        excerpt: "Learn the architectural decisions and performance optimizations that made scaling possible.",
        date: "Feb 15, 2026",
        readTime: "8 min read",
        category: "Development",
        slug: "#",
    },
    {
        title: "The Future of Web Design: Glassmorphism & Beyond",
        excerpt: "Exploring the latest UI trends and how to implement them effectively using Tailwind CSS.",
        date: "Feb 02, 2026",
        readTime: "5 min read",
        category: "Design",
        slug: "#",
    },
    {
        title: "Why DevOps is Critical for Freelance Developers",
        excerpt: " streamline your workflow and deliver more value to clients with automated CI/CD pipelines.",
        date: "Jan 28, 2026",
        readTime: "6 min read",
        category: "DevOps",
        slug: "#",
    },
];

export default function Blog() {
    return (
        <section id="blog" className="py-20 bg-[#050505]">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="section-title">Latest Insights</h2>
                        <p className="section-subtitle mb-0">
                            Thoughts on technology, design, and freelance strategy.
                        </p>
                    </div>
                    <Link href="#" className="hidden md:flex items-center text-white hover:text-blue-400 font-medium transition-colors mt-4 md:mt-0">
                        Read all articles <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link href={post.slug} key={index} className="card group hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center mb-4 text-xs font-semibold uppercase tracking-wider text-blue-400">
                                <span>{post.category}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-gray-400 mb-6 line-clamp-3 text-sm">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center text-xs text-gray-500 gap-4 mt-auto">
                                <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {post.date}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.readTime}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="#" className="inline-flex items-center text-white hover:text-blue-400 font-medium transition-colors">
                        Read all articles <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
