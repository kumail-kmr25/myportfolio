"use client";

import { useState, useEffect } from "react";
import { Loader2, ShieldCheck, LogOut } from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Admin Components
import Sidebar from "@/components/admin/Sidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminContact from "@/components/admin/AdminContact";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminCaseStudies from "@/components/admin/AdminCaseStudies";
import AdminFeatureRequests from "@/components/admin/AdminFeatureRequests";
import AdminStats from "@/components/admin/AdminStats";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
};

function AdminPageContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "messages" | "testimonials" | "projects" | "blog" | "case-studies" | "feature-requests" | "stats">("overview");

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get("tab");
        const validTabs = ["overview", "messages", "testimonials", "projects", "blog", "case-studies", "feature-requests", "stats"];
        if (tab && validTabs.includes(tab)) {
            setActiveTab(tab as any);
        }
    }, [searchParams]);

    // Data Fetching
    const { data: allTestimonials, mutate: mutateTestimonials } = useSWR(
        isLoggedIn ? "/api/admin/testimonials" : null,
        fetcher
    );

    const { data: projects, mutate: mutateProjects } = useSWR(
        isLoggedIn ? "/api/projects" : null,
        fetcher
    );

    const { data: messages, mutate: mutateMessages } = useSWR(
        isLoggedIn ? "/api/contact" : null,
        fetcher
    );

    const { data: blogPosts, mutate: mutateBlogPosts } = useSWR(
        isLoggedIn ? "/api/blog" : null,
        fetcher
    );

    const { data: caseStudies, mutate: mutateCaseStudies } = useSWR(
        isLoggedIn ? "/api/admin/case-studies" : null,
        fetcher
    );

    const { data: featureRequests, mutate: mutateFeatureRequests } = useSWR(
        isLoggedIn ? "/api/admin/feature-requests" : null,
        fetcher
    );

    const { data: statsData, mutate: mutateStats } = useSWR(
        isLoggedIn ? "/api/stats" : null,
        fetcher
    );

    const checkSession = async () => {
        try {
            const res = await fetch("/api/contact");
            if (res.ok) setIsLoggedIn(true);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsLoggedIn(true);
                router.refresh();
            } else {
                setAuthError(data.error || "Login failed");
            }
        } catch {
            setAuthError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsLoggedIn(false);
            setEmail("");
            setPassword("");
            router.push("/admin");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    // Action Handlers
    const handleTestimonialApproval = async (id: string, approved: boolean) => {
        try {
            await fetch(`/api/admin/testimonials`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, approved }),
            });
            mutateTestimonials();
        } catch (err) {
            console.error(err);
        }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            mutateTestimonials();
        } catch (err) {
            console.error(err);
        }
    };

    const handleMessageDelete = async (id: string) => {
        if (!confirm("Delete this message?")) return;
        try {
            const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                alert(`Failed to delete message: ${data.error || res.statusText}`);
            }
            mutateMessages();
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
        }
    };

    const handleToggleReplied = async (id: string, current: boolean) => {
        try {
            await fetch(`/api/admin/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ replied: !current }),
            });
            mutateMessages();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProject = async (projectData: any) => {
        const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData),
        });
        if (res.ok) mutateProjects();
    };

    const handleProjectUpdate = async (id: string, projectData: any) => {
        const res = await fetch(`/api/projects/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData),
        });
        if (res.ok) mutateProjects();
    };

    const handleProjectDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        mutateProjects();
    };

    const handleAddBlog = async (blogData: any) => {
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData),
        });
        if (res.ok) mutateBlogPosts();
    };

    const handleBlogUpdate = async (id: string, blogData: any) => {
        const res = await fetch(`/api/blog/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData),
        });
        if (res.ok) mutateBlogPosts();
    };

    const handleBlogDelete = async (id: string) => {
        if (!confirm("Delete this blog post?")) return;
        await fetch(`/api/blog/${id}`, { method: "DELETE" });
        mutateBlogPosts();
    };

    // New Handlers
    const handleCaseStudyAction = async () => {
        mutateCaseStudies();
    };

    const handleFeatureRequestAction = async () => {
        mutateFeatureRequests();
    };

    const handleStatsUpdate = async () => {
        mutateStats();
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
                <div className="w-full max-w-sm glass-effect rounded-[3rem] p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                    <div className="text-center mb-10 relative">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Admin Login</h1>
                        <p className="text-gray-500 mt-2 text-xs font-bold tracking-widest uppercase">Secure Portal Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 relative">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Identifier</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Access Secret</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {authError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-bold text-red-500 uppercase tracking-widest text-center">
                                {authError}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Authenticate"}
                        </button>
                        <div className="text-center">
                            <Link href="/admin/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors opacity-40">
                                Forgot Access Secret?
                            </Link>
                        </div>
                    </form>

                    <div className="flex justify-center mt-10 relative">
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Sidebar Integration */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                messageCount={messages?.filter((m: any) => !m.replied).length}
                pendingFeaturesCount={featureRequests?.filter((f: any) => f.status === "pending").length}
            />

            {/* Main Content Area */}
            <main className="flex-grow lg:ml-72 p-8 lg:p-16">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Dynamic View Header */}
                    <div className="flex items-end justify-between border-b border-white/5 pb-12">
                        <div>
                            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mb-3">Viewing System</p>
                            <h1 className="text-5xl font-black text-white capitalize tracking-tighter">
                                {activeTab === 'overview' ? 'Dashboard' : activeTab}
                            </h1>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="hidden md:flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mr-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Live System Analytics
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                <LogOut size={14} className="rotate-180" />
                                View Live Site
                            </Link>
                        </div>
                    </div>

                    {/* Tab Switching Logic */}
                    <div className="min-h-[60vh]">
                        {activeTab === "overview" && (
                            <DashboardOverview
                                stats={{
                                    testimonials: Array.isArray(allTestimonials) ? allTestimonials.length : 0,
                                    messages: Array.isArray(messages) ? messages.length : 0,
                                    projects: Array.isArray(projects) ? projects.length : 0,
                                    blogPosts: Array.isArray(blogPosts) ? blogPosts.length : 0
                                }}
                                recentActivity={[]}
                            />
                        )}

                        {activeTab === "messages" && (
                            <AdminContact
                                messages={Array.isArray(messages) ? messages : []}
                                onToggleReplied={handleToggleReplied}
                                onDelete={handleMessageDelete}
                            />
                        )}

                        {activeTab === "testimonials" && (
                            <AdminTestimonials
                                testimonials={Array.isArray(allTestimonials) ? allTestimonials : []}
                                onApprove={handleTestimonialApproval}
                                onDelete={handleTestimonialDelete}
                            />
                        )}

                        {activeTab === "projects" && (
                            <AdminProjects
                                projects={Array.isArray(projects) ? projects : []}
                                onAdd={handleAddProject}
                                onUpdate={handleProjectUpdate}
                                onDelete={handleProjectDelete}
                            />
                        )}

                        {activeTab === "blog" && (
                            <AdminBlog
                                posts={Array.isArray(blogPosts) ? blogPosts : []}
                                onAdd={handleAddBlog}
                                onUpdate={handleBlogUpdate}
                                onDelete={handleBlogDelete}
                            />
                        )}

                        {activeTab === "case-studies" && (
                            <AdminCaseStudies
                                studies={Array.isArray(caseStudies) ? caseStudies : []}
                                onUpdate={handleCaseStudyAction}
                            />
                        )}

                        {activeTab === "feature-requests" && (
                            <AdminFeatureRequests
                                requests={Array.isArray(featureRequests) ? featureRequests : []}
                                onUpdate={handleFeatureRequestAction}
                            />
                        )}

                        {activeTab === "stats" && (
                            <AdminStats
                                stats={statsData}
                                onUpdate={handleStatsUpdate}
                            />
                        )}
                    </div>

                    {/* Footer Signature */}
                    <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            Kumail KMR Portfolio Engine v2.0
                        </p>
                        <div className="flex gap-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Secure</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Encryption Active</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white text-xs tracking-widest uppercase font-black"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Portal...</div>}>
            <AdminPageContent />
        </Suspense>
    );
}
