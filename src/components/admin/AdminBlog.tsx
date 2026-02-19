"use client";

import {
    Plus,
    X,
    Trash2,
    PenLine,
    Loader2,
    Calendar,
    Clock,
    Hash
} from "lucide-react";
import { useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    published: boolean;
    created_at: string;
}

interface AdminBlogProps {
    posts: BlogPost[];
    onAdd: (data: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function AdminBlog({ posts, onAdd, onDelete }: AdminBlogProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        readTime: "5 min read",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onAdd({ ...formData, published: true });
            setFormData({ title: "", excerpt: "", content: "", category: "", readTime: "5 min read" });
            setIsAdding(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Insights & Blog</h2>
                    <p className="text-xs text-gray-500">Share your technical knowledge and updates</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary gap-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? "Discard Draft" : "New Article"}
                </button>
            </div>

            {isAdding && (
                <div className="glass-effect rounded-[2.5rem] p-10 border border-purple-500/20 bg-purple-500/[0.02] animate-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Article Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="The Future of Agentic AI..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Category</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Development / Design / AI"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Short Excerpt</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="A brief summary for the card view..."
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Main Content</label>
                            <textarea
                                className="input-field min-h-[300px] resize-none font-mono text-sm leading-relaxed"
                                placeholder="Write your article in Markdown..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Estimated Read Time</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/20 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Publish Article"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="group glass-effect rounded-[2.5rem] p-8 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shrink-0">
                            <PenLine size={24} />
                        </div>

                        <div className="flex-grow space-y-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-purple-500/20">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                    <Clock size={12} />
                                    {post.readTime}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{post.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-8">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Created</span>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar size={12} className="text-purple-500/50" />
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <button
                                onClick={() => onDelete(post.id)}
                                className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {posts.length === 0 && !isAdding && (
                    <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem]">
                        <Hash size={48} className="text-white/10 mx-auto mb-6" />
                        <p className="text-gray-500 font-medium">No blog posts found. Time to share some insights!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
