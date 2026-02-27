"use client";

import { useState, useEffect } from "react";
import { Loader2, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getApiUrl } from "@/lib/api";

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
import AdminResume from "@/components/admin/AdminResume";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('auth-unauthorized'));
        throw new Error("Unauthorized");
    }
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

interface AdminDashboardProps {
    initialActivities?: any[];
    initialAvailability?: any;
}

export default function AdminDashboard({ initialActivities = [], initialAvailability = null }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "status" | "messages" | "hire" | "testimonials" | "projects" | "blog" | "case-studies" | "feature-requests" | "stats" | "diagnostics" | "capacity" | "resume">("overview");

    const router = useRouter();
    const searchParams = useSearchParams();
    const { status: sessionStatus } = useSession();
    const isAuthenticated = sessionStatus === "authenticated";

    useEffect(() => {
        const tab = searchParams.get("tab");
        const validTabs = ["overview", "status", "messages", "hire", "testimonials", "projects", "blog", "case-studies", "feature-requests", "stats", "diagnostics", "capacity", "resume"];
        if (tab && validTabs.includes(tab as any)) {
            setActiveTab(tab as any);
        }
    }, [searchParams]);

    // Data Fetching — keys are null until session is confirmed to prevent 401 flood
    const { data: allTestimonials, mutate: mutateTestimonials } = useSWR<AdminTestimonial[]>(isAuthenticated ? "/api/admin/testimonials" : null, fetcher);
    const { data: projects, mutate: mutateProjects } = useSWR<AdminProject[]>(isAuthenticated ? "/api/projects" : null, fetcher);
    const { data: messages, mutate: mutateMessages } = useSWR<AdminContactMessage[]>(isAuthenticated ? "/api/contact" : null, fetcher);
    const { data: hireRequests, mutate: mutateHireRequests } = useSWR<AdminHireRequest[]>(isAuthenticated ? "/api/admin/hire" : null, fetcher);
    const { data: blogPosts, mutate: mutateBlogPosts } = useSWR<AdminBlogPost[]>(isAuthenticated ? "/api/blog" : null, fetcher);
    const { data: caseStudies, mutate: mutateCaseStudies } = useSWR<any[]>(isAuthenticated ? "/api/admin/case-studies" : null, fetcher);
    const { data: featureRequests, mutate: mutateFeatureRequests } = useSWR<any[]>(isAuthenticated ? "/api/admin/feature-requests" : null, fetcher);
    const { data: statsData, mutate: mutateStats } = useSWR<AdminStats>(isAuthenticated ? "/api/stats" : null, fetcher);
    const { data: diagPatterns, mutate: mutateDiagPatterns } = useSWR<any[]>(isAuthenticated ? "/api/admin/diagnostic-patterns" : null, fetcher);
    const { data: diagLogs, mutate: mutateDiagLogs } = useSWR<AdminDiagnosticLog[]>(isAuthenticated ? "/api/admin/diagnostic-logs" : null, fetcher);
    const { data: availabilityData, mutate: mutateAvailability } = useSWR<any>(isAuthenticated ? "/api/availability" : null, fetcher, {
        fallbackData: initialAvailability
    });


    useEffect(() => {
        const handleUnauthorized = () => {
            router.push("/admin/login");
        };
        window.addEventListener('auth-unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
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
        } catch (err) { console.error(err); }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
            mutateTestimonials();
        } catch (err) { console.error(err); }
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
        } catch (err) { console.error(err); alert("Network error. Please try again."); }
    };

    const handleToggleReplied = async (id: string, current: boolean) => {
        try {
            await fetch(`/api/admin/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ replied: !current }),
            });
            mutateMessages();
        } catch (err) { console.error(err); }
    };

    const handleHireStatusUpdate = async (id: string, status: string) => {
        try {
            await fetch("/api/admin/hire", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            mutateHireRequests();
        } catch (err) { console.error(err); }
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
        } catch (err) { console.error(err); alert("Network error. Please try again."); }
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

    if (sessionStatus === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <Loader2 className="w-6 h-6 animate-spin text-white/30" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex font-[family-name:var(--font-outfit)]">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                messageCount={Array.isArray(messages) ? messages.filter((m) => !m.replied).length : 0}
                newHireCount={Array.isArray(hireRequests) ? hireRequests.filter((h) => h.status === "new").length : 0}
                pendingFeaturesCount={Array.isArray(featureRequests) ? featureRequests.filter((f) => f.status === "pending").length : 0}
                newLogsCount={Array.isArray(diagLogs) ? diagLogs.filter((l) => !l.matchedPatternId).length : 0}
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
                            <ErrorBoundary>
                                {activeTab === "overview" && (
                                    <div className="space-y-12">
                                        <AdminAnalytics stats={{ diagRuns: statsData?.diagRuns || 0, leadGenTotal: statsData?.leadGenTotal || 0, hireRequests: statsData?.hireRequests || 0, patternsMatched: statsData?.patternsMatched || 0 }} />
                                        <DashboardOverview
                                            stats={{ testimonials: allTestimonials?.length || 0, messages: messages?.length || 0, hireRequests: hireRequests?.length || 0, projects: projects?.length || 0, blogPosts: blogPosts?.length || 0 }}
                                            recentActivity={[
                                                ...(Array.isArray(hireRequests) ? hireRequests : []).map(h => ({ id: h.id, type: "hire", title: `Hire Request: ${h.name}`, subtitle: h.projectType, timestamp: h.createdAt, status: h.status })),
                                                ...(Array.isArray(messages) ? messages : []).map(m => ({ id: m.id, type: "message", title: `Message: ${m.name}`, subtitle: m.inquiryType || "Inquiry", timestamp: m.created_at, status: m.replied ? "replied" : "new" })),
                                                ...(Array.isArray(diagLogs) ? diagLogs : []).map(l => ({ id: l.id, type: "diagnostic", title: "Diagnostic Run", subtitle: l.description, timestamp: l.createdAt, status: "completed" }))
                                            ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)}
                                            availabilityStatus={availabilityData?.status || "Available"}
                                            onUpdateAvailability={handleUpdateAvailability}
                                        />
                                    </div>
                                )}

                                {activeTab === "status" && <AdminDeveloperStatus />}
                                {activeTab === "capacity" && <AdminCapacityManager />}
                                {activeTab === "resume" && <AdminResume />}
                                {activeTab === "messages" && <AdminContact messages={Array.isArray(messages) ? messages : []} onToggleReplied={handleToggleReplied} onDelete={handleMessageDelete} />}
                                {activeTab === "hire" && <AdminHireRequests requests={Array.isArray(hireRequests) ? hireRequests : []} onUpdateStatus={handleHireStatusUpdate} onDelete={handleHireDelete} />}
                                {activeTab === "testimonials" && <AdminTestimonials testimonials={Array.isArray(allTestimonials) ? allTestimonials : []} onApprove={handleTestimonialApproval} onDelete={handleTestimonialDelete} />}
                                {activeTab === "projects" && <AdminProjects projects={Array.isArray(projects) ? projects : []} onAdd={handleAddProject} onUpdate={handleProjectUpdate} onDelete={handleProjectDelete} />}
                                {activeTab === "blog" && <AdminBlog posts={Array.isArray(blogPosts) ? blogPosts : []} onAdd={handleAddBlog} onUpdate={handleBlogUpdate} onDelete={handleBlogDelete} />}
                                {activeTab === "case-studies" && <AdminCaseStudies studies={Array.isArray(caseStudies) ? caseStudies : []} onUpdate={handleCaseStudyAction} />}
                                {activeTab === "feature-requests" && <AdminFeatureRequests requests={Array.isArray(featureRequests) ? featureRequests : []} onUpdate={handleFeatureRequestAction} />}
                                {activeTab === "stats" && <AdminStats stats={statsData || null} onUpdate={handleStatsUpdate} />}
                                {activeTab === "diagnostics" && <AdminDiagnostics patterns={Array.isArray(diagPatterns) ? diagPatterns : []} logs={Array.isArray(diagLogs) ? diagLogs : []} onUpdate={handleDiagAction} />}
                            </ErrorBoundary>
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
