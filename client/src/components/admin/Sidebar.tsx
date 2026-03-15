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
    History,
    FileText,
    Milestone,
    Search,
    Users,
    Gift,
    Target,
    ShieldCheck,
    Cpu,
    Boxes,
    Globe,
    Layers
} from "lucide-react";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    onLogout: () => void;
    messageCount?: number;
    pendingFeaturesCount?: number;
    newHireCount?: number;
    newLogsCount?: number;
    newAuditCount?: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, messageCount, pendingFeaturesCount, newHireCount, newLogsCount, newAuditCount, isOpen, setIsOpen }: SidebarProps) {

    const menuItems = [
        { id: "overview", label: "Kernel Hub", icon: LayoutDashboard, category: "Core", modId: "M-01" },
        { id: "projects", label: "Engineering Repository", icon: FolderPlus, category: "Core", modId: "M-02" },
        { id: "journey", label: "Roadmap Flow", icon: Milestone, category: "Core", modId: "M-02.1" },
        { id: "services", label: "Service Architecture", icon: Zap, category: "Core", modId: "M-02.2" },
        { id: "process", label: "Operational Flow", icon: History, category: "Core", modId: "M-02.3" },
        { id: "blog", label: "Intelligence Feed", icon: PenLine, category: "Core", modId: "M-03" },
        
        { id: "opensource", label: "Open Source Forge", icon: Globe, category: "Growth", modId: "M-07.1" },
        { id: "components", label: "Showcase Library", icon: Layers, category: "Growth", modId: "M-07.2" },
        { id: "adrs", label: "Architecture Logs", icon: ShieldCheck, category: "Growth", modId: "M-07.3" },
        { id: "clients", label: "Client Lifecycle", icon: Users, category: "Growth", modId: "M-04" },
        { id: "referrals", label: "Viral Propagation", icon: Gift, category: "Growth", modId: "M-05" },
        { id: "leads", label: "Lead Magnets", icon: Target, category: "Growth", modId: "M-06" },
        { id: "subscribers", label: "Node Subscribers", icon: Mail, category: "Growth", modId: "M-06.1" },
        { id: "roi-engine", label: "Yield Intelligence", icon: BarChart3, category: "Growth", modId: "M-07" },
        { id: "hire", label: "Deployment Requests", icon: Briefcase, count: newHireCount, category: "Growth", modId: "M-08" },
        
        { id: "messages", label: "Comm Array", icon: Mail, count: messageCount, category: "Inbound", modId: "M-09" },
        { id: "audit-requests", label: "Audit Stream", icon: Search, count: newAuditCount, category: "Inbound", modId: "M-10" },
        { id: "feature-requests", label: "Heuristic Engine", icon: CheckSquare, count: pendingFeaturesCount, category: "Inbound", modId: "M-11" },
        
        { id: "diagnostics", label: "Pulse Diagnostics", icon: Activity, count: newLogsCount, category: "System", modId: "M-12" },
        { id: "status", label: "Live Telemetry", icon: Zap, category: "System", modId: "M-13" },
        { id: "activity", label: "Temporal Sync", icon: History, category: "System", modId: "M-14" },
        { id: "stats", label: "Performance Matrix", icon: BarChart3, category: "System", modId: "M-15" },
        { id: "features", label: "Feature Forge", icon: Settings, category: "System", modId: "M-16" },
        { id: "settings", label: "Kernel Config", icon: Settings, category: "System", modId: "M-17" },
    ];

    const categories = ["Core", "Growth", "Inbound", "System"];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 left-6 z-[150] p-4 bg-[#080808]/80 border border-white/5 rounded-2xl lg:hidden hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl"
            >
                {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[130] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside className={`fixed top-0 left-0 h-full bg-[#050505] border-r border-white/ client-generating-gradient-light z-[140] w-80 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full scrollbar-none overflow-y-auto">
                    
                    {/* Brand / Identity Vector */}
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-2xl shadow-blue-600/40 relative z-10">
                                <Cpu size={24} />
                            </div>
                            <div className="relative z-10 text-left">
                                <h2 className="text-white font-black text-xs uppercase tracking-widest leading-none mb-1 italic">Kernel_Console</h2>
                                <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] opacity-80 animate-pulse">SYSTEM_ACTIVE</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Hub */}
                    <div className="flex-grow p-6 py-2 space-y-6">
                        {categories.map(cat => (
                            <div key={cat} className="space-y-2">
                                <h3 className="px-6 text-[8px] font-black uppercase tracking-[0.5em] text-gray-800 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Boxes size={10} className="text-gray-900" />
                                        {cat}_PROTOCOL
                                    </span>
                                    <span className="text-[7px] text-gray-900/40 font-mono">NODE_ALV</span>
                                </h3>
                                <nav className="space-y-0.5">
                                    {menuItems.filter(i => i.category === cat).map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-4 px-6 py-3 rounded-xl transition-all relative group overflow-hidden ${activeTab === item.id
                                                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                                                : "text-gray-600 hover:text-white hover:bg-white/[0.02]"
                                                }`}
                                        >
                                            <span className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transition-all duration-500 ${activeTab === item.id ? 'opacity-100' : 'opacity-0 scale-y-0 group-hover:opacity-50 group-hover:scale-y-100'}`} />
                                            
                                            <item.icon size={16} className={`relative z-10 ${activeTab === item.id ? "text-white" : "group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300"}`} />
                                            
                                            <div className="flex flex-col items-start relative z-10 overflow-hidden">
                                                <span className="font-black text-[9px] uppercase tracking-widest truncate leading-none mb-0.5">{item.label}</span>
                                                <span className={`text-[7px] font-mono tracking-tighter ${activeTab === item.id ? 'text-blue-200/60' : 'text-gray-800'}`}>{item.modId} {/* EXECUTION_READY */}</span>
                                            </div>
                                            
                                            {item.count !== undefined && item.count > 0 && (
                                                <span className={`relative z-10 ml-auto px-1.5 py-0.5 rounded-lg text-[8px] font-black border ${activeTab === item.id ? "bg-white text-blue-600 border-white" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                    }`}>
                                                    {item.count.toString().padStart(2, '0')}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        ))}
                    </div>

                    {/* Master Sync Status & Terminal Footer */}
                    <div className="p-8 mt-auto border-t border-white/5 space-y-6 bg-black/40 relative overflow-hidden group/footer">
                        <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover/footer:opacity-100 transition-opacity" />
                        
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-gray-800 mb-2">
                                <span>Master_Sync_Protocol</span>
                                <span className="animate-pulse text-blue-500">Active</span>
                            </div>
                            <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden flex">
                                <m.div 
                                    initial={{ width: "60%" }}
                                    animate={{ width: ["60%", "90%", "60%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full bg-blue-500/40"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2 relative z-10">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Operator_Session</span>
                                <span className="text-[11px] font-bold text-white uppercase italic tracking-tighter">Kumail_KMR // S-01</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 relative z-10 shadow-[0_0_10px_#3b82f6]" />
                            </div>
                        </div>
                        
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10 group relative z-10"
                        >
                            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black text-[9px] uppercase tracking-[0.2em] italic leading-none">Terminate_Session</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
