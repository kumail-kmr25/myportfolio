"use client";

import {
    LayoutDashboard,
    MessageSquare,
    Mail,
    FolderPlus,
    PenLine,
    BookOpen,
    CheckSquare,
    BarChart3,
    Activity,
    LogOut,
    Menu,
    X,
    Briefcase,
    Settings,
    Zap,
    History
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    onLogout: () => void;
    messageCount?: number;
    pendingFeaturesCount?: number;
    newHireCount?: number;
    newLogsCount?: number;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, messageCount, pendingFeaturesCount, newHireCount, newLogsCount }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "messages", label: "Messages", icon: Mail, count: messageCount },
        { id: "hire", label: "Hire Requests", icon: Briefcase, count: newHireCount },
        { id: "testimonials", label: "Testimonials", icon: MessageSquare },
        { id: "projects", label: "Projects", icon: FolderPlus },
        { id: "case-studies", label: "Case Studies", icon: BookOpen },
        { id: "feature-requests", label: "Feature Requests", icon: CheckSquare, count: pendingFeaturesCount },
        { id: "stats", label: "Site Stats", icon: BarChart3 },
        { id: "diagnostics", label: "Diagnostics", icon: Activity, count: newLogsCount },
        { id: "status", label: "Live Status", icon: Zap },
        { id: "capacity", label: "Work Capacity", icon: Settings },
        { id: "activity", label: "Login Activity", icon: History },
        { id: "blog", label: "Blog Posts", icon: PenLine },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 left-6 z-50 p-3 bg-white/5 border border-white/10 rounded-2xl lg:hidden hover:bg-white/10 transition-all shadow-xl backdrop-blur-xl"
            >
                {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
            )}

            {/* Sidebar Container */}
            <aside className={`fixed top-0 left-0 h-full bg-[#080808] border-r border-white/5 z-40 w-72 transition-all duration-500 ease-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:opacity-100 opacity-0'}`}>
                <div className="flex flex-col h-full p-8">
                    {/* Brand */}
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                            KK
                        </div>
                        <div>
                            <h2 className="text-white font-bold tracking-tight">Admin Suite</h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-0.5">Control Center</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${activeTab === item.id
                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={20} className={activeTab === item.id ? "text-white" : "group-hover:text-blue-400 transition-colors"} />
                                <span className="font-semibold text-sm">{item.label}</span>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? "bg-white text-blue-600" : "bg-blue-500/20 text-blue-400"
                                        }`}>
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="pt-8 border-t border-white/5">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group"
                        >
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
