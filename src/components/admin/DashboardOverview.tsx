"use client";

import {
    Users,
    MessageSquare,
    Mail,
    FolderPlus,
    TrendingUp,
    Clock,
    Zap,
    Briefcase
} from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="card p-8 bg-white/5 border-white/5 group hover:bg-white/10 transition-all">
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <card.icon className={`text-${card.color}-400`} size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Activity & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <Clock className="text-blue-400" size={20} />
                        System Overview
                    </h2>
                    <div className="glass-effect rounded-[2.5rem] p-10 border border-white/5">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex-grow space-y-4">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Your professional portfolio is currently monitoring <span className="text-white font-bold">{stats.hireRequests} hire requests</span> and <span className="text-white font-bold">{stats.messages} inquiries</span>.
                                        There are <span className="text-white font-bold">{stats.testimonials} testimonials</span> stored, with 100% database availability metrics.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Database Online
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        Vercel Deployed
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-48 h-48 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full flex items-center justify-center border border-white/10 relative overflow-hidden group">
                                <TrendingUp size={64} className="text-blue-500/40 group-hover:scale-125 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <Users className="text-purple-400" size={20} />
                        Admin Profile
                    </h2>
                    <div className="card p-8 bg-white/5 border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black text-white">
                                K
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Kumail KMR</h4>
                                <p className="text-xs text-gray-500">Super Administrator</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs py-3 border-b border-white/5">
                                <span className="text-gray-500">Last Session</span>
                                <span className="text-white font-medium">Just now</span>
                            </div>
                            <div className="flex justify-between text-xs py-3 border-b border-white/5">
                                <span className="text-gray-500">Security Level</span>
                                <span className="text-green-500 font-bold uppercase">Maximum</span>
                            </div>
                            <div className="flex justify-between text-xs py-3 border-b border-white/5">
                                <span className="text-gray-500">Environment</span>
                                <span className="text-blue-400 font-medium">Production</span>
                            </div>
                            <div className="pt-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Availability Status</p>
                                <button
                                    onClick={handleToggle}
                                    disabled={isUpdating}
                                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group/btn ${availabilityStatus === "Available"
                                        ? "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white"
                                        : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Briefcase size={16} />}
                                        <span className="text-xs font-bold uppercase tracking-widest">{availabilityStatus}</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${availabilityStatus === "Available" ? "bg-green-500/40" : "bg-red-500/40"}`}>
                                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${availabilityStatus === "Available" ? "left-5" : "left-1"}`} />
                                    </div>
                                </button>
                                <p className="text-[9px] text-gray-600 mt-3 text-center italic">Click to toggle your public availability badge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
