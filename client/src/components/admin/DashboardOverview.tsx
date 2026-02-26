"use client";

import {
    Users,
    MessageSquare,
    Mail,
    FolderPlus,
    TrendingUp,
    Clock,
    Zap,
    Briefcase,
    Activity
} from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AdminLiveFeed from "./AdminLiveFeed";

interface OverviewProps {
    stats: {
        testimonials: number;
        messages: number;
        hireRequests: number;
        projects: number;
        blogPosts: number;
    };
    recentActivity: any[];
    availabilityStatus: string;
    onUpdateAvailability: (status: string) => Promise<void>;
}

export default function DashboardOverview({ stats, recentActivity, availabilityStatus, onUpdateAvailability }: OverviewProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = async () => {
        setIsUpdating(true);
        const nextStatus = availabilityStatus === "Available" ? "Busy" : "Available";
        try {
            await onUpdateAvailability(nextStatus);
        } finally {
            setIsUpdating(false);
        }
    };
    const cards = [
        { label: "Total Endorsements", value: stats.testimonials, icon: Users, color: "blue" },
        { label: "Hire Requests", value: stats.hireRequests, icon: Mail, color: "indigo" },
        { label: "Client Inquiries", value: stats.messages, icon: Mail, color: "purple" },
        { label: "Portfolio Projects", value: stats.projects, icon: FolderPlus, color: "blue" },
        { label: "Insights Published", value: stats.blogPosts, icon: TrendingUp, color: "green" },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="card p-6 sm:p-8 bg-white/5 border-white/5 group hover:bg-white/10 transition-all">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                            <card.icon className={`text-${card.color}-400`} size={20} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{card.value || 0}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Activity & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <AdminLiveFeed />
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <Users className="text-purple-400" size={20} />
                        Admin Profile
                    </h2>
                    <div className="card p-6 sm:p-8 bg-white/5 border-white/5">
                        <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
                                K
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Kumail KMR</h4>
                                <p className="text-[10px] text-gray-500">Super Administrator</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[11px] py-3 border-b border-white/5">
                                <span className="text-gray-500">Last Session</span>
                                <span className="text-white font-medium">Just now</span>
                            </div>
                            <div className="flex justify-between text-[11px] py-3 border-b border-white/5">
                                <span className="text-gray-500">Security Level</span>
                                <span className="text-green-500 font-bold uppercase">Maximum</span>
                            </div>
                            <div className="flex justify-between text-[11px] py-3 border-b border-white/5">
                                <span className="text-gray-500">Environment</span>
                                <span className="text-blue-400 font-medium">Production</span>
                            </div>
                            <div className="pt-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Availability Status</p>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${availabilityStatus === "Available" ? "bg-green-500" : "bg-red-500"}`} />
                                        <span className="text-xs font-bold uppercase tracking-widest">{availabilityStatus}</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${availabilityStatus === "Available" ? "bg-green-500/40" : "bg-red-500/40"}`}>
                                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${availabilityStatus === "Available" ? "left-5" : "left-1"}`} />
                                    </div>
                                </div>
                                <p className="text-[9px] text-gray-600 mt-3 text-center italic">Live capacity is now managed via the <strong>Work Capacity</strong> tab.</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-white flex items-center gap-3 mt-8">
                        <Activity className="text-green-400" size={20} />
                        System Health
                    </h2>
                    <div className="card p-6 bg-white/5 border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">DB Latency</span>
                            <span className="text-[10px] text-green-400 font-mono">42ms - Optimal</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-green-500/50" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">API Resilience</span>
                            <span className="text-[10px] text-blue-400 font-mono">99.9% Uptime</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[99%] bg-blue-500/50" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">SWR Pulse</span>
                            <span className="text-[10px] text-purple-400 font-mono">Healthy (3.2s)</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-purple-500/50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
