"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Fallback posts when no database posts exist
const fallbackPosts = [
    {
        id: "fallback-1",
        title: "How I Scaled a Next.js App to 1 Million Users",
        excerpt: "Learn the architectural decisions and performance optimizations that made scaling possible.",
        category: "Development",
        readTime: "8 min read",
        created_at: "2026-02-15T00:00:00Z",
    },
    {
        id: "fallback-2",
        title: "The Future of Web Design: Glassmorphism & Beyond",
        excerpt: "Exploring the latest UI trends and how to implement them effectively using Tailwind CSS.",
        category: "Design",
        readTime: "5 min read",
        created_at: "2026-02-02T00:00:00Z",
    },
    {
        id: "fallback-3",
        title: "Why DevOps is Critical for Freelance Developers",
        excerpt: "Streamline your workflow and deliver more value to clients with automated CI/CD pipelines.",
        category: "DevOps",
        readTime: "6 min read",
        created_at: "2026-01-28T00:00:00Z",
    },
];

export default function Blog() {
    const { data: blogPosts } = useSWR("/api/blog", fetcher);

    const posts = blogPosts && Array.isArray(blogPosts) && blogPosts.length > 0 ? blogPosts : fallbackPosts;

    return (
        <section id="blog" className="py-12 bg-[#050505]">
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
                    {posts.map((post: any) => (
                        <div key={post.id} className="card group hover:bg-white/10 transition-colors">
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
                                    {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
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
