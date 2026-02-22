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
import { formatDistanceToNow } from "date-fns";

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
                        <Zap className="text-blue-400" size={20} />
                        Live Activity Feed
                    </h2>
                    <div className="glass-effect rounded-[2.5rem] p-4 border border-white/5 overflow-hidden">
                        <div className="space-y-1">
                            {recentActivity.length === 0 ? (
                                <div className="p-12 text-center text-gray-600 text-xs font-bold uppercase tracking-widest">
                                    No recent activity detected
                                </div>
                            ) : (
                                recentActivity.map((activity, idx) => {
                                    const Icon = activity.type === "hire" ? Briefcase : activity.type === "message" ? Mail : Zap;
                                    const color = activity.type === "hire" ? "green" : activity.type === "message" ? "purple" : "blue";

                                    return (
                                        <div
                                            key={activity.id}
                                            className={`flex items-center gap-6 p-6 rounded-[2rem] hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/5 ${idx !== recentActivity.length - 1 ? 'border-b-white/5' : ''}`}
                                        >
                                            <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <Icon className={`text-${color}-400`} size={20} />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                                        {activity.title}
                                                    </h4>
                                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap ml-4">
                                                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-500 truncate italic">
                                                        {activity.subtitle}
                                                    </p>
                                                    <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter
                                                        ${activity.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                                            activity.status === 'replied' || activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                                'bg-white/5 text-gray-500'}`}
                                                    >
                                                        {activity.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
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
                </div>
            </div>
        </div>
    );
}
