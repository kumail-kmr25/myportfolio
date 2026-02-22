"use client";

import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { motion } from "framer-motion";

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
                    <Link href="#blog" aria-label="Read all blog articles" className="hidden md:flex items-center text-white hover:text-blue-400 font-medium transition-colors mt-4 md:mt-0">
                        Read all articles <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post: any, index: number) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="card h-full flex flex-col bg-white/[0.02] backdrop-blur-3xl border-white/5 group-hover:border-blue-500/40 group-hover:bg-blue-500/[0.02] transition-all duration-500 p-8 rounded-[2rem] relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                        <Sparkles size={10} className="text-blue-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{post.category}</span>
                                    </div>
                                    <div className="flex items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                                        <Clock className="w-3 h-3 mr-1 text-blue-400/50" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight tracking-tight">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 mb-8 line-clamp-3 text-sm leading-relaxed font-medium">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center text-[10px] font-black uppercase tracking-wider text-gray-500">
                                        <Calendar className="w-3 h-3 mr-2" />
                                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </div>

                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
