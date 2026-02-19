"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, LogOut, ShieldCheck, FolderPlus, MessageSquare, Plus, X } from "lucide-react";
import useSWR from "swr";
import { ProjectFormData } from "@/lib/schemas/project";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Testimonial {
    id: string;
    name: string;
    intervention_type: string;
    message: string;
    rating: number;
    about_delivery_lead: string;
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

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"testimonials" | "projects">("testimonials");

    // Project Form State
    const [projectData, setProjectData] = useState<Partial<ProjectFormData>>({
        tags: [],
        demo: "#",
        github: "#",
    });
    const [tagInput, setTagInput] = useState("");

    const { data: testimonials, mutate: mutateTestimonials } = useSWR<Testimonial[]>(
        isLoggedIn ? "/api/testimonials" : null,
        fetcher
    );

    const { data: projects, mutate: mutateProjects } = useSWR<Project[]>(
        isLoggedIn ? "/api/projects" : null,
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
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                mutateTestimonials();
            } else {
                alert("Failed to delete testimonial");
            }
        } catch (err) {
            alert("An error occurred while deleting");
        }
    };

    const handleProjectDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                mutateProjects();
            } else {
                alert("Failed to delete project");
            }
        } catch (err) {
            alert("An error occurred while deleting");
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
                mutateProjects();
                setProjectData({ tags: [], demo: "#", github: "#" });
                alert("Project added successfully!");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to add project");
            }
        } catch (err) {
            alert("An error occurred");
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
        setProjectData({
            ...projectData,
            tags: projectData.tags?.filter((_, i) => i !== index),
        });
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsLoggedIn(false);
            setPassword("");
        } catch (err) {
            console.error("Logout failed", err);
            window.location.reload();
        }
    };

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

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Enter Admin Password"
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
                <div className="flex gap-4 mb-24 border-b border-white/5 pb-4">
                    <button
                        onClick={() => setActiveTab("testimonials")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${activeTab === "testimonials" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Testimonials
                    </button>
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${activeTab === "projects" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <FolderPlus className="w-4 h-4" />
                        Projects
                    </button>
                </div>

                {/* Content */}
                {activeTab === "testimonials" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials?.map((testimonial) => (
                            <div key={testimonial.id} className="card relative group border-white/5 bg-white/5">
                                <button
                                    onClick={() => handleTestimonialDelete(testimonial.id)}
                                    className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="mb-4">
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-tight">{testimonial.intervention_type}</p>
                                </div>
                                <p className="text-gray-400 text-sm italic mb-6">&quot;{testimonial.message}&quot;</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Delivery Lead Feedback</p>
                                    <p className="text-xs text-gray-300 mt-1">{testimonial.about_delivery_lead}</p>
                                </div>
                            </div>
                        ))}
                        {testimonials?.length === 0 && (
                            <div className="col-span-full text-center py-24 glass-effect rounded-[3rem] border border-dashed border-white/10">
                                <p className="text-gray-500">No testimonials to display.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Add Project Form */}
                        <div className="card border-white/10 bg-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
                            <form onSubmit={handleAddProject} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Title</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={projectData.title || ""}
                                            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Image URL</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="https://..."
                                            value={projectData.image || ""}
                                            onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Description</label>
                                    <textarea
                                        className="input-field min-h-[100px]"
                                        value={projectData.description || ""}
                                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Demo Link</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={projectData.demo || "#"}
                                            onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">GitHub Link</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={projectData.github || "#"}
                                            onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-300 block">Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {projectData.tags?.map((tag, i) => (
                                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                                {tag}
                                                <button type="button" onClick={() => removeTag(i)}>
                                                    <X className="w-3 h-3 hover:text-white" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="React"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary w-full disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Project"}
                                </button>
                            </form>
                        </div>

                        {/* Existing Projects List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects?.map((project) => (
                                <div key={project.id} className="card relative group border-white/5 bg-white/5">
                                    <button
                                        onClick={() => handleProjectDelete(project.id)}
                                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
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
            </div>
        </div>
    );
}
