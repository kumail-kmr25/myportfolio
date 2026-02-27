"use client";

import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { motion, Variants } from "framer-motion";

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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="blog" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block"
                        >
                            Journal
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                        >
                            Latest <span className="text-gray-500">Insights</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg max-w-2xl"
                        >
                            Thoughts on technology, engineering design, and sustainable development.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="#blog" aria-label="Read all blog articles" className="hidden md:flex items-center text-white hover:text-blue-400 font-bold text-sm uppercase tracking-widest transition-colors">
                            Read all articles <ArrowRight className="ml-3 w-4 h-4" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {posts.map((post: any) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="h-full flex flex-col bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-500 p-8 rounded-[2.5rem] relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/20 rounded-full">
                                        <Sparkles size={10} className="text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{post.category}</span>
                                    </div>
                                    <div className="flex items-center text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                        <Clock className="w-3 h-3 mr-2 text-blue-500" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight tracking-tight">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 mb-10 line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <Calendar className="w-3 h-3 mr-2" />
                                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </div>

                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-600 transition-all transform group-hover:-translate-y-1">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="#" className="inline-flex items-center text-white hover:text-blue-400 font-bold text-sm uppercase tracking-widest transition-colors py-4 px-8 border border-white/10 rounded-2xl bg-white/5">
                        Read all articles <ArrowRight className="ml-3 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
