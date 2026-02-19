"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, LogOut, ShieldCheck, FolderPlus, MessageSquare, Plus, X, Mail, CheckCircle, XCircle, PenLine } from "lucide-react";
import useSWR from "swr";
import { ProjectFormData } from "@/lib/schemas/project";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Testimonial {
    id: string;
    name: string;
    email?: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
    approved: boolean;
    created_at: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    demo: string;
    github: string;
}

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

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

export default function AdminPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"messages" | "testimonials" | "projects" | "blog">("messages");

    // Project Form State
    const [projectData, setProjectData] = useState<Partial<ProjectFormData>>({
        tags: [],
        demo: "#",
        github: "#",
    });
    const [tagInput, setTagInput] = useState("");

    // Blog Form State
    const [blogData, setBlogData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        readTime: "5 min read",
    });
    const [showBlogForm, setShowBlogForm] = useState(false);

    // Fetch all data
    const { data: testimonials, mutate: mutateTestimonials } = useSWR<Testimonial[]>(
        isLoggedIn ? "/api/testimonials" : null,
        fetcher
    );

    // Fetch ALL testimonials for admin (including unapproved)
    const { data: allTestimonials, mutate: mutateAllTestimonials } = useSWR<Testimonial[]>(
        isLoggedIn ? "/api/admin/testimonials" : null,
        fetcher
    );

    const { data: projects, mutate: mutateProjects } = useSWR<Project[]>(
        isLoggedIn ? "/api/projects" : null,
        fetcher
    );

    const { data: messages } = useSWR<ContactMessage[]>(
        isLoggedIn ? "/api/contact" : null,
        fetcher
    );

    const { data: blogPosts, mutate: mutateBlogPosts } = useSWR<BlogPost[]>(
        isLoggedIn ? "/api/blog" : null,
        fetcher
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsLoggedIn(true);
            } else {
                setError(data.error || "Login failed");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestimonialApproval = async (id: string, approved: boolean) => {
        try {
            await fetch(`/api/testimonials/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approved }),
            });
            mutateAllTestimonials();
            mutateTestimonials();
        } catch (err) {
            console.error("Approval error:", err);
        }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            mutateAllTestimonials();
            mutateTestimonials();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleProjectDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            mutateProjects();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
            if (res.ok) {
                setProjectData({ tags: [], demo: "#", github: "#" });
                mutateProjects();
            }
        } catch (err) {
            console.error("Add project error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const addTag = () => {
        if (tagInput.trim()) {
            setProjectData({
                ...projectData,
                tags: [...(projectData.tags || []), tagInput.trim()],
            });
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...(projectData.tags || [])];
        newTags.splice(index, 1);
        setProjectData({ ...projectData, tags: newTags });
    };

    const handleAddBlogPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...blogData, published: true }),
            });
            if (res.ok) {
                setBlogData({ title: "", excerpt: "", content: "", category: "", readTime: "5 min read" });
                setShowBlogForm(false);
                mutateBlogPosts();
            }
        } catch (err) {
            console.error("Add blog error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteBlogPost = async (id: string) => {
        if (!confirm("Delete this blog post?")) return;
        try {
            await fetch(`/api/blog/${id}`, { method: "DELETE" });
            mutateBlogPosts();
        } catch (err) {
            console.error("Delete blog error:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsLoggedIn(false);
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    // Check if already logged in
    useEffect(() => {
        fetch("/api/testimonials")
            .then((res) => {
                if (res.ok) {
                    // Session check via a simple authenticated endpoint
                    fetch("/api/contact")
                        .then((r) => {
                            if (r.ok) setIsLoggedIn(true);
                        })
                        .catch(() => { });
                }
            })
            .catch(() => { });
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-md glass-effect rounded-[2.5rem] p-12 border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Admin Access</h1>
                        <p className="text-gray-400 mt-2">Sign in to manage your portfolio.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="flex justify-between mt-6">
                        <Link href="/admin/register" className="text-sm text-gray-500 hover:text-white transition-colors">
                            Register
                        </Link>
                        <Link href="/admin/reset-password" className="text-sm text-gray-500 hover:text-white transition-colors">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-12 lg:p-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-2">Welcome back. Manage your site content here.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleLogout}
                            className="btn-secondary gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-4">
                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-sm ${activeTab === "messages" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <Mail className="w-4 h-4" />
                        Messages
                        {messages && messages.length > 0 && (
                            <span className="ml-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">{messages.length}</span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("testimonials")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-sm ${activeTab === "testimonials" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Testimonials
                    </button>
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-sm ${activeTab === "projects" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <FolderPlus className="w-4 h-4" />
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("blog")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-sm ${activeTab === "blog" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <PenLine className="w-4 h-4" />
                        Blog / Insights
                    </button>
                </div>

                {/* ===== MESSAGES TAB ===== */}
                {activeTab === "messages" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {messages?.map((msg) => (
                            <div key={msg.id} className="card border-white/5 bg-white/5">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-bold text-white">{msg.name}</h4>
                                        <p className="text-xs text-gray-500">{msg.email}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-500 whitespace-nowrap">
                                        {new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{msg.message}</p>
                                <a
                                    href={`mailto:${msg.email}?subject=Re: Your message on my portfolio&body=Hi ${msg.name},%0A%0AThank you for reaching out!%0A%0A`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl text-xs font-medium hover:bg-blue-500/20 transition-colors"
                                >
                                    <Mail className="w-3 h-3" />
                                    Reply via Email
                                </a>
                            </div>
                        ))}
                        {(!messages || messages.length === 0) && (
                            <div className="col-span-full text-center py-24 glass-effect rounded-[3rem] border border-dashed border-white/10">
                                <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500">No messages yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ===== TESTIMONIALS TAB ===== */}
                {activeTab === "testimonials" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allTestimonials?.map((testimonial) => (
                            <div key={testimonial.id} className={`card relative group border-white/5 ${testimonial.approved ? "bg-green-500/5 border-green-500/10" : "bg-white/5"}`}>
                                {/* Status Badge */}
                                <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${testimonial.approved ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                    {testimonial.approved ? "Approved" : "Pending"}
                                </div>

                                {/* Actions */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleTestimonialApproval(testimonial.id, !testimonial.approved)}
                                        className={`p-2 rounded-xl transition-all ${testimonial.approved
                                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                                            : "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                                            }`}
                                        title={testimonial.approved ? "Revoke Approval" : "Approve"}
                                    >
                                        {testimonial.approved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleTestimonialDelete(testimonial.id)}
                                        className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="mb-4 mt-8">
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-tight">{testimonial.intervention_type}</p>
                                </div>
                                <p className="text-gray-400 text-sm italic mb-4">&quot;{testimonial.message}&quot;</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Delivery Lead Feedback</p>
                                    <p className="text-xs text-gray-300 mt-1">{testimonial.about_delivery_lead}</p>
                                </div>
                            </div>
                        ))}
                        {(!allTestimonials || allTestimonials.length === 0) && (
                            <div className="col-span-full text-center py-24 glass-effect rounded-[3rem] border border-dashed border-white/10">
                                <p className="text-gray-500">No testimonials to display.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ===== PROJECTS TAB ===== */}
                {activeTab === "projects" && (
                    <div className="space-y-12">
                        {/* Add Project Form */}
                        <div className="card border-white/10 bg-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
                            <form onSubmit={handleAddProject} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Title</label>
                                        <input type="text" className="input-field" value={projectData.title || ""} onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Image URL</label>
                                        <input type="text" className="input-field" placeholder="https://..." value={projectData.image || ""} onChange={(e) => setProjectData({ ...projectData, image: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Description</label>
                                    <textarea className="input-field min-h-[100px]" value={projectData.description || ""} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Demo Link</label>
                                        <input type="text" className="input-field" value={projectData.demo || "#"} onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">GitHub Link</label>
                                        <input type="text" className="input-field" value={projectData.github || "#"} onChange={(e) => setProjectData({ ...projectData, github: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-300 block">Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {projectData.tags?.map((tag, i) => (
                                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                                {tag}
                                                <button type="button" onClick={() => removeTag(i)}><X className="w-3 h-3 hover:text-white" /></button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="text" className="input-field" placeholder="React" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                                        <button type="button" onClick={addTag} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Project"}
                                </button>
                            </form>
                        </div>

                        {/* Existing Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects?.map((project) => (
                                <div key={project.id} className="card relative group border-white/5 bg-white/5">
                                    <button onClick={() => handleProjectDelete(project.id)} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="h-32 relative rounded-xl overflow-hidden mb-4">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">{project.title}</h4>
                                    <p className="text-gray-400 text-xs line-clamp-2">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== BLOG TAB ===== */}
                {activeTab === "blog" && (
                    <div className="space-y-12">
                        {/* Toggle Blog Form */}
                        {!showBlogForm ? (
                            <button onClick={() => setShowBlogForm(true)} className="btn-primary gap-2">
                                <Plus className="w-4 h-4" />
                                New Blog Post
                            </button>
                        ) : (
                            <div className="card border-white/10 bg-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">New Blog Post</h2>
                                    <button onClick={() => setShowBlogForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddBlogPost} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Title</label>
                                            <input type="text" className="input-field" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Category</label>
                                            <input type="text" className="input-field" placeholder="Development, Design, DevOps..." value={blogData.category} onChange={(e) => setBlogData({ ...blogData, category: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Excerpt</label>
                                        <input type="text" className="input-field" placeholder="Brief summary..." value={blogData.excerpt} onChange={(e) => setBlogData({ ...blogData, excerpt: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Content</label>
                                        <textarea className="input-field min-h-[200px]" placeholder="Write your article..." value={blogData.content} onChange={(e) => setBlogData({ ...blogData, content: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Read Time</label>
                                        <input type="text" className="input-field" placeholder="5 min read" value={blogData.readTime} onChange={(e) => setBlogData({ ...blogData, readTime: e.target.value })} />
                                    </div>
                                    <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Post"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Existing Blog Posts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts?.map((post) => (
                                <div key={post.id} className="card relative group border-white/5 bg-white/5">
                                    <button onClick={() => handleDeleteBlogPost(post.id)} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-center mb-3 text-xs font-semibold uppercase tracking-wider text-blue-400">
                                        <span>{post.category}</span>
                                        <span className="text-gray-600">{post.readTime}</span>
                                    </div>
                                    <h4 className="font-bold text-white mb-2 line-clamp-2">{post.title}</h4>
                                    <p className="text-gray-400 text-xs line-clamp-3 mb-3">{post.excerpt}</p>
                                    <p className="text-[10px] text-gray-600">
                                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </p>
                                </div>
                            ))}
                            {(!blogPosts || blogPosts.length === 0) && !showBlogForm && (
                                <div className="col-span-full text-center py-24 glass-effect rounded-[3rem] border border-dashed border-white/10">
                                    <PenLine className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-500">No blog posts yet. Create your first insight!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
