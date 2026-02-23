"use client";

import useSWR from "swr";
import { Clock, Tag, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    created_at: string;
}

export default function BlogPage() {
    const { data: posts, error, isLoading } = useSWR<BlogPost[]>("/api/blog", fetcher);

    return (
        <section className="min-h-screen bg-[#050505] pt-32 pb-20">
            <div className="section-container">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        Insights & <span className="text-blue-500 text-glow">Articles</span>
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Sharing my thoughts on software engineering, AI agents, and the future of web development.
                        Stay updated with the latest trends and technical deep-dives.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-center">
                        <p className="text-red-500 font-bold">Failed to load articles.</p>
                        <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
                    </div>
                ) : !posts || posts.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <p className="text-gray-500 font-medium">No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group relative glass-effect rounded-[2.5rem] p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        <Clock size={12} className="text-blue-500/50" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:translate-x-2">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
