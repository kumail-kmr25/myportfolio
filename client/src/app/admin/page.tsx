"use client";

import { useState, useEffect } from "react";
import { Loader2, ShieldCheck, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Admin Components
import Sidebar from "@/components/admin/Sidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminContact from "@/components/admin/AdminContact";
import AdminHireRequests from "@/components/admin/AdminHireRequests";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminCaseStudies from "@/components/admin/AdminCaseStudies";
import AdminFeatureRequests from "@/components/admin/AdminFeatureRequests";
import AdminStats, { type SiteStats } from "@/components/admin/AdminStats";
import AdminDiagnostics from "@/components/admin/AdminDiagnostics";
import AdminCapacityManager from "@/components/admin/AdminCapacityManager";
import AdminDeveloperStatus from "@/components/admin/AdminDeveloperStatus";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

import { getApiUrl } from "@/lib/api";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
};

interface AdminTestimonial { id: string; name: string; email: string; company?: string | null; relationship_type: string; intervention_type: string; message: string; rating: number; about_delivery_lead: string; approved: boolean; featured: boolean; verified: boolean; created_at: string; }
interface AdminProject { id: string; title: string; description: string; tags: string[]; image: string; demo: string; deployment?: string | null; github: string; beforeImageUrl?: string | null; afterImageUrl?: string | null; improvementDetails?: string | null; metrics?: string[]; }
interface AdminContactMessage { id: string; name: string; email: string; message: string; replied: boolean; created_at: string; inquiryType: string; company?: string | null; serviceRequired: string; budgetRange?: string | null; timeline?: string | null; }
interface AdminHireRequest { id: string; name: string; email: string; company: string | null; description: string; selectedService: string; budgetRange: string; timeline: string; projectType: string; status: string; source?: string; createdAt: string; }
interface AdminBlogPost { id: string; title: string; excerpt: string; content: string; category: string; readTime: string; published: boolean; created_at: string; }
interface AdminDiagnosticLog { id: string; description: string; techStack?: string; createdAt: string; matchedPatternId?: string; environment: string; errorMessage?: string; }
interface AdminStats extends SiteStats { diagRuns: number; leadGenTotal: number; hireRequests: number; patternsMatched: number; }

function AdminPageContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "status" | "messages" | "hire" | "testimonials" | "projects" | "blog" | "case-studies" | "feature-requests" | "stats" | "diagnostics" | "capacity">("overview");

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get("tab");
        const validTabs = ["overview", "status", "messages", "hire", "testimonials", "projects", "blog", "case-studies", "feature-requests", "stats", "diagnostics", "capacity"];
        if (tab && validTabs.includes(tab as any)) {
            setActiveTab(tab as any);
        }
    }, [searchParams]);

    // Data Fetching

    const { data: allTestimonials, mutate: mutateTestimonials } = useSWR<AdminTestimonial[]>(
        isLoggedIn ? "/api/admin/testimonials" : null,
        fetcher
    );

    const { data: projects, mutate: mutateProjects } = useSWR<AdminProject[]>(
        isLoggedIn ? "/api/projects" : null,
        fetcher
    );

    const { data: messages, mutate: mutateMessages } = useSWR<AdminContactMessage[]>(
        isLoggedIn ? "/api/contact" : null,
        fetcher
    );

    const { data: hireRequests, mutate: mutateHireRequests } = useSWR<AdminHireRequest[]>(
        isLoggedIn ? "/api/admin/hire" : null,
        fetcher
    );

    const { data: blogPosts, mutate: mutateBlogPosts } = useSWR<AdminBlogPost[]>(
        isLoggedIn ? "/api/blog" : null,
        fetcher
    );

    const { data: caseStudies, mutate: mutateCaseStudies } = useSWR<any[]>(
        isLoggedIn ? "/api/admin/case-studies" : null,
        fetcher
    );

    const { data: featureRequests, mutate: mutateFeatureRequests } = useSWR<any[]>(
        isLoggedIn ? "/api/admin/feature-requests" : null,
        fetcher
    );

    const { data: statsData, mutate: mutateStats } = useSWR<AdminStats>(
        isLoggedIn ? "/api/stats" : null,
        fetcher
    );

    const { data: diagPatterns, mutate: mutateDiagPatterns } = useSWR<any[]>(
        isLoggedIn ? "/api/admin/diagnostic-patterns" : null,
        fetcher
    );

    const { data: diagLogs, mutate: mutateDiagLogs } = useSWR<AdminDiagnosticLog[]>(
        isLoggedIn ? "/api/admin/diagnostic-logs" : null,
        fetcher
    );

    const { data: availabilityData, mutate: mutateAvailability } = useSWR<any>(
        isLoggedIn ? "/api/availability" : null,
        fetcher
    );

    const checkSession = async () => {
        try {
            const res = await fetch(getApiUrl("/api/contact"));
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
            const res = await fetch(getApiUrl("/api/admin/login"), {
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

    const handleTestimonialApproval = async (id: string, approved: boolean) => {
        try {
            await fetch("/api/admin/testimonials", {
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
            await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
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

    const handleHireStatusUpdate = async (id: string, status: string) => {
        try {
            await fetch("/api/admin/hire", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            mutateHireRequests();
        } catch (err) {
            console.error(err);
        }
    };

    const handleHireDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/hire/${id}`, { method: "DELETE" });
            if (res.ok) {
                mutateHireRequests();
            } else {
                const data = await res.json().catch(() => ({}));
                alert(`Failed to delete request: ${data.error || res.statusText}`);
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
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

    const handleCaseStudyAction = async () => mutateCaseStudies();
    const handleFeatureRequestAction = async () => mutateFeatureRequests();
    const handleStatsUpdate = async () => mutateStats();
    const handleDiagAction = async () => {
        mutateDiagPatterns();
        mutateDiagLogs();
    };

    const handleUpdateAvailability = async (status: string) => {
        try {
            const res = await fetch("/api/admin/availability", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) mutateAvailability();
        } catch (err) { console.error(err); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white font-[family-name:var(--font-outfit)]">
                <div className="w-full max-w-sm glass-effect rounded-[3rem] p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    <div className="text-center mb-10 relative">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight uppercase">Admin Login</h1>
                        <p className="text-gray-500 mt-2 text-[10px] font-bold tracking-widest uppercase">Secure Portal Access</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6 relative">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Identifier</label>
                            <input type="email" autoComplete="email" className="input-field min-h-[48px]" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Access Secret</label>
                            <input type="password" title="password" autoComplete="current-password" className="input-field min-h-[48px]" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {authError && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-bold text-red-500 uppercase tracking-widest text-center">{authError}</div>}
                        <button type="submit" disabled={isLoading} className="btn-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 disabled:opacity-50 min-h-[48px] flex justify-center items-center mt-6">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Authenticate"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex font-[family-name:var(--font-outfit)]">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                messageCount={messages?.filter((m) => !m.replied).length}
                newHireCount={hireRequests?.filter((h) => h.status === "new").length}
                pendingFeaturesCount={featureRequests?.filter((f) => f.status === "pending").length}
                newLogsCount={diagLogs?.filter((l) => !l.matchedPatternId).length}
            />

            <main className="flex-grow lg:ml-72 p-8 lg:p-16">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-12 gap-6">
                        <div>
                            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mb-3">Viewing System</p>
                            <h1 className="text-4xl lg:text-5xl font-black text-white capitalize tracking-tighter">
                                {activeTab === 'overview' ? 'Dashboard' : activeTab.replace('-', ' ')}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mr-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Live System Analytics
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                            >
                                <LogOut size={14} />
                                <span>Terminate Session</span>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="min-h-[60vh]"
                        >
                            {activeTab === "overview" && (
                                <div className="space-y-12">
                                    <AdminAnalytics stats={{ diagRuns: statsData?.diagRuns || 0, leadGenTotal: statsData?.leadGenTotal || 0, hireRequests: statsData?.hireRequests || 0, patternsMatched: statsData?.patternsMatched || 0 }} />
                                    <DashboardOverview
                                        stats={{ testimonials: allTestimonials?.length || 0, messages: messages?.length || 0, hireRequests: hireRequests?.length || 0, projects: projects?.length || 0, blogPosts: blogPosts?.length || 0 }}
                                        recentActivity={[
                                            ...(hireRequests || []).map(h => ({ id: h.id, type: "hire", title: `Hire Request: ${h.name}`, subtitle: h.projectType, timestamp: h.createdAt, status: h.status })),
                                            ...(messages || []).map(m => ({ id: m.id, type: "message", title: `Message: ${m.name}`, subtitle: m.inquiryType || "Inquiry", timestamp: m.created_at, status: m.replied ? "replied" : "new" })),
                                            ...(diagLogs || []).map(l => ({ id: l.id, type: "diagnostic", title: "Diagnostic Run", subtitle: l.description, timestamp: l.createdAt, status: "completed" }))
                                        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)}
                                        availabilityStatus={availabilityData?.status || "Available"}
                                        onUpdateAvailability={handleUpdateAvailability}
                                    />
                                </div>
                            )}

                            {activeTab === "status" && <AdminDeveloperStatus />}
                            {activeTab === "messages" && <AdminContact messages={messages || []} onToggleReplied={handleToggleReplied} onDelete={handleMessageDelete} />}
                            {activeTab === "hire" && <AdminHireRequests requests={hireRequests || []} onUpdateStatus={handleHireStatusUpdate} onDelete={handleHireDelete} />}
                            {activeTab === "testimonials" && <AdminTestimonials testimonials={allTestimonials || []} onApprove={handleTestimonialApproval} onDelete={handleTestimonialDelete} />}
                            {activeTab === "projects" && <AdminProjects projects={projects || []} onAdd={handleAddProject} onUpdate={handleProjectUpdate} onDelete={handleProjectDelete} />}
                            {activeTab === "blog" && <AdminBlog posts={blogPosts || []} onAdd={handleAddBlog} onUpdate={handleBlogUpdate} onDelete={handleBlogDelete} />}
                            {activeTab === "case-studies" && <AdminCaseStudies studies={caseStudies || []} onUpdate={handleCaseStudyAction} />}
                            {activeTab === "feature-requests" && <AdminFeatureRequests requests={featureRequests || []} onUpdate={handleFeatureRequestAction} />}
                            {activeTab === "stats" && <AdminStats stats={statsData || null} onUpdate={handleStatsUpdate} />}
                            {activeTab === "diagnostics" && <AdminDiagnostics patterns={diagPatterns || []} logs={diagLogs || []} onUpdate={handleDiagAction} />}
                            {activeTab === "capacity" && <AdminCapacityManager />}
                        </motion.div>
                    </AnimatePresence>

                    <footer className="pt-20 border-t border-white/5 flex justify-between items-center opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Kumail KMR Portfolio Engine v2.0</p>
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
