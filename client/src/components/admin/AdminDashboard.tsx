"use client";

import { useState, useEffect } from "react";
import { Loader2, LogOut } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { getApiUrl } from "@/lib/api";
import dynamic from "next/dynamic";

// Admin Components
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";
import DashboardOverview from "@/components/admin/DashboardOverview";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminContact from "@/components/admin/AdminContact";
import AdminHireRequests from "@/components/admin/AdminHireRequests";
import AdminFeatureRequests from "@/components/admin/AdminFeatureRequests";
import AdminStats, { type SiteStats } from "@/components/admin/AdminStats";
import AdminDiagnostics from "@/components/admin/AdminDiagnostics";
import AdminCapacityManager from "@/components/admin/AdminCapacityManager";
import AdminDeveloperStatus from "@/components/admin/AdminDeveloperStatus";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminResume from "@/components/admin/AdminResume";
import AdminJourney from "@/components/admin/AdminJourney";
import AdminCaseStudies from "./AdminCaseStudies";
import AdminActivityLog from "./AdminActivityLog";
import AdminAudit from "./AdminAudit";
import AdminAuditRequests from "./AdminAuditRequests";
import AdminTestimonials from "./AdminTestimonials";
import AdminBlog from "./AdminBlog";
import AdminClients from "./AdminClients";
import AdminPromotions from "./AdminPromotions";
import AdminROIEngine from "./AdminROIEngine";
import AdminFeatureManager from "./AdminFeatureManager";
import AdminOpenSource from "./AdminOpenSource";
import AdminComponents from "./AdminComponents";
import AdminADRs from "./AdminADRs";
import AdminSubscribers from "./AdminSubscribers";
import AdminServices from "./AdminServices";
import AdminProcess from "./AdminProcess";
import AdminSettings from "./AdminSettings";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url));
    if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('auth-unauthorized'));
        throw new Error("Unauthorized");
    }
    const json = await res.json();
    if (!res.ok || json.success === false) {
        throw new Error(json.error || "Fetch failed");
    }
    return json.success ? json.data : json;
};

interface AdminTestimonial { id: string; name: string; email: string; company?: string | null; relationshipType: string; interventionType: string; message: string; rating: number; aboutDeliveryLead: string; approved: boolean; featured: boolean; verified: boolean; createdAt: string; }
interface AdminContactMessage { id: string; name: string; email: string; message: string; replied: boolean; createdAt: string; inquiryType: string; company?: string | null; serviceRequired: string; budgetRange?: string | null; timeline?: string | null; }
interface AdminHireRequest { id: string; name: string; email: string; company: string | null; description: string; selectedService: string; budgetRange: string; timeline: string; projectType: string; status: string; source?: string; createdAt: string; }
interface AdminBlogPost { id: string; title: string; excerpt: string; content: string; category: string; readTime: string; published: boolean; createdAt: string; }
interface AdminDiagnosticLog { id: string; description: string; techStack?: string; createdAt: string; matchedPatternId?: string; environment: string; errorMessage?: string; }
interface AdminProject { id: string; title: string; summary?: string; description: string; status: string; role?: string; tags: string[]; image: string; demo?: string; github?: string; problem?: string; solution?: string; targetAudience?: string; valueProp?: string; architecture?: any; challenges?: string; engineering?: string; performance?: string; scalability?: string; security?: string; lessons?: string; uiDepth: number; backendDepth: number; securityDepth: number; scalabilityDepth: number; timeline?: any; gallery: string[]; results?: string; metrics: string[]; category?: string; isFeatured: boolean; isVisible: boolean; createdAt: string; updatedAt: string; }
interface AdminCaseStudy { id: string; title: string; errorMessage: string; rootCause: string; steps: string[]; solution: string; impact: string; techStack: string[]; isPublished: boolean; createdAt: string; }
interface AdminStats extends SiteStats { diagRuns: number; leadGenTotal: number; hireRequests: number; patternsMatched: number; referrals: number; leadMagnets: number; playgroundSessions: number; }

interface AdminDashboardProps {
    initialActivities?: any[];
    initialAvailability?: any;
}

import { SelectionProvider } from "@/context/SelectionContext";

export default function AdminDashboard({ initialActivities = [], initialAvailability = null }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "projects" | "status" | "messages" | "hire" | "testimonials" | "services" | "process" | "blog" | "feature-requests" | "stats" | "diagnostics" | "capacity" | "resume" | "journey" | "activity" | "case-studies" | "audit" | "audit-requests" | "clients" | "referrals" | "leads" | "roi-engine" | "features" | "opensource" | "components" | "adrs" | "subscribers" | "settings">("overview");
    const [isNavOpen, setIsNavOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { status: sessionStatus } = useSession();
    const isAuthenticated = sessionStatus === "authenticated";

    useEffect(() => {
        const tab = searchParams?.get("tab");
        const validTabs = ["overview", "projects", "status", "messages", "hire", "testimonials", "services", "process", "blog", "feature-requests", "stats", "diagnostics", "capacity", "resume", "journey", "activity", "case-studies", "audit", "audit-requests", "clients", "referrals", "leads", "roi-engine", "features", "opensource", "components", "adrs", "subscribers", "settings"];
        if (tab && validTabs.includes(tab as any)) {
            setActiveTab(tab as any);
        }
    }, [searchParams]);

    // Data Fetching — keys are null until session is confirmed to prevent 401 flood
    const { data: projects, mutate: mutateProjects } = useSWR<AdminProject[]>(isAuthenticated ? "/api/projects" : null, fetcher);
    const { data: allTestimonials, mutate: mutateTestimonials } = useSWR<AdminTestimonial[]>(isAuthenticated ? "/api/admin/testimonials" : null, fetcher);
    const { data: serviceTiers, mutate: mutateServices } = useSWR<any[]>(isAuthenticated ? "/api/admin/service-tiers" : null, fetcher);
    const { data: processSteps, mutate: mutateProcess } = useSWR<any[]>(isAuthenticated ? "/api/admin/process" : null, fetcher);
    const { data: messages, mutate: mutateMessages } = useSWR<AdminContactMessage[]>(isAuthenticated ? "/api/contact" : null, fetcher);
    const { data: hireRequests, mutate: mutateHireRequests } = useSWR<AdminHireRequest[]>(isAuthenticated ? "/api/admin/hire" : null, fetcher);
    const { data: blogPosts, mutate: mutateBlogPosts } = useSWR<AdminBlogPost[]>(isAuthenticated ? "/api/blog" : null, fetcher);
    const { data: featureRequests, mutate: mutateFeatureRequests } = useSWR<any[]>(isAuthenticated ? "/api/admin/feature-requests" : null, fetcher);
    const { data: statsData, mutate: mutateStats } = useSWR<AdminStats>(isAuthenticated ? "/api/stats" : null, fetcher);
    const { data: diagPatterns, mutate: mutateDiagPatterns } = useSWR<any[]>(isAuthenticated ? "/api/admin/diagnostic-patterns" : null, fetcher);
    const { data: diagLogs, mutate: mutateDiagLogs } = useSWR<AdminDiagnosticLog[]>(isAuthenticated ? "/api/admin/diagnostic-logs" : null, fetcher);
    const { data: availabilityData, mutate: mutateAvailability } = useSWR<any>(isAuthenticated ? "/api/availability" : null, fetcher, {
        fallbackData: initialAvailability
    });
    const { data: journeyPhases, mutate: mutateJourney } = useSWR<any[]>(isAuthenticated ? "/api/admin/journey" : null, fetcher);
    const { data: caseStudies, mutate: mutateCaseStudies } = useSWR<AdminCaseStudy[]>(isAuthenticated ? "/api/admin/case-studies" : null, fetcher);
    const { data: activityLogs, mutate: mutateActivityLogs } = useSWR<any[]>(isAuthenticated ? "/api/admin/activity-log" : null, fetcher);
    const { data: auditRequests, mutate: mutateAuditRequests } = useSWR<any>(isAuthenticated ? "/api/admin/audit-requests" : null, fetcher);
    const { data: promotionsData, mutate: mutatePromotions } = useSWR<any>(isAuthenticated ? "/api/admin/promotions" : null, fetcher);
    const { data: featureToggles, mutate: mutateFeatureToggles } = useSWR<any[]>(isAuthenticated ? "/api/admin/features" : null, fetcher);
    const { data: opensource, mutate: mutateOpensource } = useSWR<any[]>(isAuthenticated ? "/api/admin/opensource" : null, fetcher);
    const { data: showcase, mutate: mutateShowcase } = useSWR<any[]>(isAuthenticated ? "/api/admin/showcase" : null, fetcher);
    const { data: adrs, mutate: mutateAdrs } = useSWR<any[]>(isAuthenticated ? "/api/admin/adrs" : null, fetcher);
    const { data: subscribers, mutate: mutateSubscribers } = useSWR<any[]>(isAuthenticated ? "/api/admin/subscribers" : null, fetcher);


    useEffect(() => {
        const handleUnauthorized = () => {
            router.push("/admin/login");
        };
        const handleOpenMenu = () => {
            setIsNavOpen(true);
        };
        window.addEventListener('auth-unauthorized', handleUnauthorized);
        window.addEventListener('open-admin-menu', handleOpenMenu);
        return () => {
            window.removeEventListener('auth-unauthorized', handleUnauthorized);
            window.removeEventListener('open-admin-menu', handleOpenMenu);
        };
    }, [router]);

    const handleLogout = async () => {
        try {
            // 1. Terminate server-side session and clear cookies via API
            await fetch("/api/admin/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout API failed:", err);
        }

        try {
            // 2. Clear all client-side storage
            localStorage.clear();
            sessionStorage.clear();

            // 3. Clear all potential cookies on the client side
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/admin`;
            }
        } catch (err) {
            console.error("Storage cleanup failed:", err);
        }

        // 4. Finalize with NextAuth signOut
        await signOut({ callbackUrl: "/", redirect: true });
    };

    const handleTestimonialApproval = async (id: string, approved: boolean, data?: any) => {
        try {
            await fetch("/api/admin/testimonials", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, approved, ...data }),
            });
            mutateTestimonials();
        } catch (err) { console.error(err); }
    };

    const handleTestimonialVerify = async (id: string, verified: boolean) => {
        try {
            await fetch("/api/admin/testimonials", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, verified }),
            });
            mutateTestimonials();
        } catch (err) { console.error(err); }
    };

    const handleTestimonialFeature = async (id: string, featured: boolean) => {
        try {
            const res = await fetch("/api/admin/testimonials", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, featured }),
            });
            const data = await res.json().catch(() => ({ success: false }));
            if (res.ok && data.success !== false) {
                mutateTestimonials();
            } else {
                console.error("Testimonial feature update failed:", data.error || res.statusText);
            }
        } catch (err) { console.error(err); }
    };

    const handleTestimonialDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
            const data = await res.json().catch(() => ({ success: false }));
            if (res.ok && data.success !== false) {
                mutateTestimonials();
            } else {
                alert(`Failed to delete testimonial: ${data.error || res.statusText}`);
            }
        } catch (err) { console.error(err); alert("Network error. Please try again."); }
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
            const res = await fetch(`/api/admin/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ replied: !current }),
            });
            const data = await res.json().catch(() => ({ success: false }));
            if (res.ok && data.success !== false) {
                mutateMessages();
            } else {
                console.error("Failed to toggle reply status:", data.error || res.statusText);
            }
        } catch (err) { console.error(err); }
    };

    const handleHireStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/admin/hire", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            const data = await res.json().catch(() => ({ success: false }));
            if (res.ok && data.success !== false) {
                mutateHireRequests();
            } else {
                console.error("Failed to update hire status:", data.error || res.statusText);
            }
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


    const handleAddBlog = async (blogData: any) => {
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData),
        });
        const data = await res.json().catch(() => ({ success: false }));
        if (res.ok && data.success !== false) {
            mutateBlogPosts();
        } else {
            console.error("Failed to add blog:", data.error || res.statusText);
        }
    };

    const handleBlogUpdate = async (id: string, blogData: any) => {
        const res = await fetch(`/api/blog/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData),
        });
        const data = await res.json().catch(() => ({ success: false }));
        if (res.ok && data.success !== false) {
            mutateBlogPosts();
        } else {
            console.error("Failed to update blog:", data.error || res.statusText);
        }
    };

    const handleBlogDelete = async (id: string) => {
        if (!confirm("Delete this blog post?")) return;
        await fetch(`/api/blog/${id}`, { method: "DELETE" });
        mutateBlogPosts();
    };

    const handleProjectAction = async () => { await mutateProjects(); };
    const handleFeatureRequestAction = async () => mutateFeatureRequests();
    const handleStatsUpdate = async () => mutateStats();
    const handleDiagAction = async () => {
        mutateDiagPatterns();
        mutateDiagLogs();
    };

    const handleAddJourney = async (data: any) => {
        const res = await fetch("/api/admin/journey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const resData = await res.json().catch(() => ({ success: false }));
        if (res.ok && resData.success !== false) {
            mutateJourney();
        } else {
            console.error("Failed to add journey phase:", resData.error || res.statusText);
        }
    };

    const handleJourneyUpdate = async (id: string, data: any) => {
        const res = await fetch(`/api/admin/journey/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const resData = await res.json().catch(() => ({ success: false }));
        if (res.ok && resData.success !== false) {
            mutateJourney();
        } else {
            console.error("Failed to update journey phase:", resData.error || res.statusText);
        }
    };

    const handleJourneyDelete = async (id: string) => {
        if (!confirm("Delete this journey phase?")) return;
        const res = await fetch(`/api/admin/journey/${id}`, { method: "DELETE" });
        if (res.ok) mutateJourney();
    };

    const handleAddOpensource = async (data: any) => {
        const res = await fetch("/api/admin/opensource", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (res.ok) mutateOpensource();
    };
    const handleAddShowcase = async (data: any) => {
        const res = await fetch("/api/admin/showcase", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (res.ok) mutateShowcase();
    };
    const handleAddAdr = async (data: any) => {
        const res = await fetch("/api/admin/adrs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (res.ok) mutateAdrs();
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
        <SelectionProvider>
            <div className="min-h-screen bg-[#050505] flex font-[family-name:var(--font-outfit)]">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                messageCount={Array.isArray(messages) ? messages.filter((m) => !m.replied).length : 0}
                newHireCount={Array.isArray(hireRequests) ? hireRequests.filter((h) => h.status === "new").length : 0}
                pendingFeaturesCount={Array.isArray(featureRequests) ? featureRequests.filter((f) => f.status === "pending").length : 0}
                newLogsCount={Array.isArray(diagLogs) ? diagLogs.filter((l) => !l.matchedPatternId).length : 0}
                newAuditCount={auditRequests?.analytics?.pending || 0}
                isOpen={isNavOpen}
                setIsOpen={setIsNavOpen}
            />

            <MobileNav 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                menuItems={[]} // Can be used for deeper sub-menus later
                newHireCount={Array.isArray(hireRequests) ? hireRequests.filter((h) => h.status === "new").length : 0}
                newAuditCount={auditRequests?.analytics?.pending || 0}
                messageCount={Array.isArray(messages) ? messages.filter((m) => !m.replied).length : 0}
            />

            <main className="flex-grow lg:ml-72 p-8 lg:p-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-500/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-500/[0.01] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    {/* Integrated Command Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-16">
                        <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em]">Kernel_Link_Active</p>
                                <div className="h-px w-20 bg-gradient-to-r from-blue-500/20 to-transparent" />
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                                {activeTab === 'overview' ? 'COMMAND_UNIT' : activeTab.replace('-', '_')}
                            </h1>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-2 group cursor-default">
                                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors" />
                                    <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em]">PERSISTENCE: V2.8.4_STABLE</p>
                                </div>
                                <div className="flex items-center gap-2 group cursor-default">
                                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-emerald-500 transition-colors" />
                                    <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em]">NODE: VERCEL_EDGE_PRODUCTION</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex flex-col items-end gap-1.5">
                                <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Live_Sync_Established</span>
                                </div>
                                <p className="text-[8px] text-gray-800 font-black uppercase tracking-[0.4em] mr-4">SECURE_CHANNEL_ACTIVE</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="group relative flex items-center gap-4 px-8 py-4 rounded-3xl bg-red-600/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
                                <span>TERMINATE_SESSION</span>
                            </button>
                        </div>
                    </div>

                    {/* Operational Viewport */}
                    <AnimatePresence mode="wait">
                        <m.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            className="min-h-[70vh] relative"
                        >
                            <ErrorBoundary>
                                {activeTab === "overview" && (
                                    <div className="space-y-16">
                                        <AdminAnalytics stats={{ 
                                            diagRuns: (statsData as any)?.diagRuns ?? (statsData as any)?.data?.diagRuns ?? 0, 
                                            leadGenTotal: (statsData as any)?.leadGenTotal ?? (statsData as any)?.data?.leadGenTotal ?? 0, 
                                            hireRequests: (statsData as any)?.hireRequests ?? (statsData as any)?.data?.hireRequests ?? 0, 
                                            patternsMatched: (statsData as any)?.patternsMatched ?? (statsData as any)?.data?.patternsMatched ?? 0,
                                            auditCount: (statsData as any)?.auditCount ?? (statsData as any)?.data?.auditCount ?? 0,
                                            auditLeads: (statsData as any)?.auditLeads ?? (statsData as any)?.data?.auditLeads ?? 0
                                        }} />
                                        <DashboardOverview
                                            stats={{ 
                                                projects: (projects as any)?.projects?.length ?? (projects as any)?.length ?? 0, 
                                                testimonials: (allTestimonials as any)?.testimonials?.length ?? (allTestimonials as any)?.length ?? 0, 
                                                messages: (messages as any)?.messages?.length ?? (messages as any)?.length ?? 0, 
                                                hireRequests: (hireRequests as any)?.requests?.length ?? (hireRequests as any)?.hireRequests?.length ?? (hireRequests as any)?.length ?? 0, 
                                                blogPosts: (blogPosts as any)?.posts?.length ?? (blogPosts as any)?.length ?? 0,
                                                referrals: (statsData as any)?.referrals ?? (statsData as any)?.data?.referrals ?? 0,
                                                leadMagnets: (statsData as any)?.leadMagnets ?? (statsData as any)?.data?.leadMagnets ?? 0,
                                                playgroundSessions: (statsData as any)?.playgroundSessions ?? (statsData as any)?.data?.playgroundSessions ?? 0
                                            }}
                                            recentActivity={[
                                                ...(Array.isArray(hireRequests) ? hireRequests : (hireRequests as any)?.requests || (hireRequests as any)?.hireRequests || []).map((h: any) => ({ id: h.id, type: "hire", title: `Hire Request: ${h.name}`, subtitle: h.projectType, timestamp: h.createdAt, status: h.status })),
                                                ...(Array.isArray(allTestimonials) ? allTestimonials : (allTestimonials as any)?.testimonials || []).map((t: any) => ({ id: t.id, type: "testimonial", title: `Testimonial: ${t.name}`, subtitle: `${t.rating} Stars`, timestamp: t.createdAt, status: t.approved ? "approved" : "pending" })),
                                                ...(Array.isArray(messages) ? messages : (messages as any)?.messages || []).map((m: any) => ({ id: m.id, type: "message", title: `Message: ${m.name}`, subtitle: m.inquiryType || "Inquiry", timestamp: m.created_at, status: m.replied ? "replied" : "new" })),
                                                ...(Array.isArray(diagLogs) ? diagLogs : (diagLogs as any)?.logs || []).map((l: any) => ({ id: l.id, type: "diagnostic", title: "Diagnostic Run", subtitle: l.description, timestamp: l.createdAt, status: "completed" })),
                                                ...(Array.isArray(auditRequests?.data) ? auditRequests.data : []).map((a: any) => ({ id: a.id, type: "audit", title: `Audit: ${a.websiteUrl}`, subtitle: `${a.performance}% Score`, timestamp: a.createdAt, status: a.contacted ? "contacted" : "new" }))
                                            ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)}
                                            availabilityStatus={(availabilityData as any)?.status ?? (availabilityData as any)?.data?.status ?? "Available"}
                                            onUpdateAvailability={handleUpdateAvailability}
                                        />
                                    </div>
                                )}

                                {activeTab === "status" && <AdminDeveloperStatus />}
                                {activeTab === "capacity" && <AdminCapacityManager />}
                                {activeTab === "resume" && <AdminResume />}
                                {activeTab === "messages" && <AdminContact messages={(messages as any)?.messages || (Array.isArray(messages) ? messages : [])} onToggleReplied={handleToggleReplied} onDelete={handleMessageDelete} />}
                                {activeTab === "hire" && <AdminHireRequests requests={(hireRequests as any)?.requests || (hireRequests as any)?.hireRequests || (Array.isArray(hireRequests) ? hireRequests : [])} onUpdateStatus={handleHireStatusUpdate} onDelete={handleHireDelete} />}
                                {activeTab === "testimonials" && (
                                    <AdminTestimonials 
                                        testimonials={(allTestimonials as any)?.testimonials || (Array.isArray(allTestimonials) ? allTestimonials : [])} 
                                        onUpdate={async () => { await mutateTestimonials(); }}
                                    />
                                )}
                                {activeTab === "services" && <AdminServices />}
                                {activeTab === "process" && <AdminProcess />}
                                {activeTab === "projects" && <AdminProjects projects={(projects as any)?.projects || (Array.isArray(projects) ? projects : [])} onUpdate={handleProjectAction} />}
                                {activeTab === "blog" && <AdminBlog posts={(blogPosts as any)?.posts || (Array.isArray(blogPosts) ? blogPosts : [])} onAdd={handleAddBlog} onUpdate={handleBlogUpdate} onDelete={handleBlogDelete} />}
                                {activeTab === "feature-requests" && <AdminFeatureRequests requests={(featureRequests as any)?.requests || (Array.isArray(featureRequests) ? featureRequests : [])} onUpdate={handleFeatureRequestAction} />}
                                {activeTab === "stats" && <AdminStats stats={(statsData as any)?.data || statsData || null} onUpdate={handleStatsUpdate} />}
                                {activeTab === "diagnostics" && <AdminDiagnostics patterns={(diagPatterns as any)?.patterns || (Array.isArray(diagPatterns) ? diagPatterns : [])} logs={(diagLogs as any)?.logs || (Array.isArray(diagLogs) ? diagLogs : [])} onUpdate={handleDiagAction} />}
                                {activeTab === "journey" && <AdminJourney phases={(journeyPhases as any)?.phases || (Array.isArray(journeyPhases) ? journeyPhases : [])} onAdd={handleAddJourney} onUpdate={handleJourneyUpdate} onDelete={handleJourneyDelete} />}
                                {activeTab === "case-studies" && <AdminCaseStudies studies={(caseStudies as any)?.caseStudies || (Array.isArray(caseStudies) ? caseStudies : [])} onUpdate={() => mutateCaseStudies()} />}
                                {activeTab === "activity" && <AdminActivityLog logs={(activityLogs as any)?.logs || (Array.isArray(activityLogs) ? activityLogs : [])} onUpdate={() => mutateActivityLogs()} />}
                                                                 {activeTab === "referrals" && <AdminPromotions data={promotionsData?.referrals || []} type="referrals" />}
                                        {activeTab === "leads" && <AdminPromotions data={promotionsData?.leadMagnets || []} type="leads" />}
                                        {activeTab === "roi-engine" && <AdminROIEngine />}
                                 {activeTab === "clients" && <AdminClients />}
                                 {activeTab === "audit" && <AdminAudit />}
                                 {activeTab === "audit-requests" && <AdminAuditRequests />}
                                 {activeTab === "opensource" && <AdminOpenSource contributions={opensource} onAdd={handleAddOpensource} onUpdate={async (id: string, data: any) => { await fetch(`/api/admin/opensource/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); mutateOpensource(); }} onDelete={async (id: string) => { await fetch(`/api/admin/opensource/${id}`, { method: 'DELETE' }); mutateOpensource(); }} />}
                                 {activeTab === "components" && <AdminComponents showcase={showcase} onAdd={handleAddShowcase} onUpdate={async (id: string, data: any) => { await fetch(`/api/admin/showcase/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); mutateShowcase(); }} onDelete={async (id: string) => { await fetch(`/api/admin/showcase/${id}`, { method: 'DELETE' }); mutateShowcase(); }} />}
                                 {activeTab === "adrs" && <AdminADRs adrs={adrs} onAdd={handleAddAdr} onUpdate={async (id: string, data: any) => { await fetch(`/api/admin/adrs/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); mutateAdrs(); }} onDelete={async (id: string) => { await fetch(`/api/admin/adrs/${id}`, { method: 'DELETE' }); mutateAdrs(); }} />}
                                 {activeTab === "features" && <AdminFeatureManager features={featureToggles || []} onUpdate={() => mutateFeatureToggles()} />}
                                 {activeTab === "settings" && <AdminSettings />}

                            </ErrorBoundary>
                        </m.div>
                    </AnimatePresence>

                    {/* Integrated System Footer */}
                    <footer className="pt-24 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-10 opacity-30 group-hover:opacity-50 transition-opacity">
                        <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-[10px] text-gray-400">K</div>
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Kumail_Operational_Framework_V2.0</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-12">
                            {[
                                { label: "Security", val: "AES_256_GCM" },
                                { label: "Persistence", val: "POSTGRES_DENSE" },
                                { label: "Latency", val: "NODE_STABLE" }
                            ].map((hub, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-700">{hub.label}:</span>
                                    <span className="text-[9px] font-mono font-black text-gray-500">{hub.val}</span>
                                </div>
                            ))}
                        </div>
                    </footer>
                </div>
            </main>
            </div>
        </SelectionProvider>
    );
}
