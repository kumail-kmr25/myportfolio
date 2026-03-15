"use client";

import { m } from "framer-motion";
import { Globe, Layers, ShieldCheck, Code2, ArrowRight, Github, ExternalLink, Star, GitBranch, Zap } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(json => json.success ? json.data : json);

export default function DeveloperHub() {
    const { data: opensource } = useSWR("/api/admin/opensource", fetcher);
    const { data: components } = useSWR("/api/admin/showcase", fetcher);
    const { data: adrs } = useSWR("/api/admin/adrs", fetcher);
    const { data: blogPosts } = useSWR("/api/blog", fetcher);

    const techInsights = blogPosts?.filter((post: any) => 
        post.category === "Engineering" || post.category === "Development" || post.category === "Architecture"
    ).slice(0, 2);
    return (
        <section id="developer-hub" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24 border-b border-white/5 pb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-xs text-blue-400 font-black uppercase tracking-[0.5em]">Engineering Resources</p>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Developer Hub
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Open Source Forge */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-600/20">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Open Source</h3>
                        </div>
                        <div className="space-y-6">
                            {opensource?.slice(0, 3).map((repo: any) => (
                                <m.div 
                                    key={repo.id}
                                    whileHover={{ x: 10 }}
                                    className="p-8 glass-effect rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all"
                                >
                                    <h4 className="text-xl font-bold text-white mb-2">{repo.title}</h4>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">{repo.description}</p>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <span className="flex items-center gap-1.5"><Star size={12} className="text-yellow-500" /> {repo.stars}</span>
                                        <span className="flex items-center gap-1.5"><GitBranch size={12} className="text-blue-500" /> {repo.forks}</span>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>

                    {/* Component Library */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 border border-emerald-600/20">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Showcase</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {components?.slice(0, 4).map((comp: any) => (
                                <m.div 
                                    key={comp.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="aspect-square glass-effect rounded-[3rem] border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden group"
                                >
                                    <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <Code2 size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">{comp.title}</h4>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{comp.category}</p>
                                </m.div>
                            ))}
                        </div>
                    </div>

                    {/* Architecture ADRs */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-400 border border-orange-600/20">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Governance</h3>
                        </div>
                        <div className="space-y-4">
                            {adrs?.slice(0, 5).map((adr: any) => (
                                <div key={adr.id} className="p-6 glass-effect rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02]">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{adr.title}</h4>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-700">{adr.status} // {new Date(adr.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <ArrowRight size={14} className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Insights Section */}
                <div className="mt-32 pt-32 border-t border-white/5 mx-auto max-w-5xl">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 border border-purple-600/20">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Technical Insights</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {techInsights?.map((post: any) => (
                            <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group">
                                <div className="p-10 glass-effect rounded-[3rem] border border-white/5 group-hover:border-purple-500/30 transition-all h-full">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-purple-400 mb-4 block">{post.category} // {post.readTime}</span>
                                    <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 group-hover:text-purple-400 transition-colors">{post.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                                    <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest">
                                        Read Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
