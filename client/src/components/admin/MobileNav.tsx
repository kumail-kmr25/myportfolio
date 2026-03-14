"use client";

import { m, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    FolderPlus, 
    Briefcase, 
    BarChart3, 
    MoreHorizontal,
    Search,
    Menu,
    X
} from "lucide-react";

interface MobileNavProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    menuItems: any[];
    newHireCount?: number;
    newAuditCount?: number;
    messageCount?: number;
}

export default function MobileNav({ activeTab, setActiveTab, menuItems, newHireCount, newAuditCount, messageCount }: MobileNavProps) {
    // Primary actions for the bottom bar (4 slots + "More")
    const primaryItems = [
        { id: "overview", label: "Home", icon: LayoutDashboard },
        { id: "projects", label: "Projects", icon: FolderPlus },
        { id: "hire", label: "Leads", icon: Briefcase, count: (newHireCount || 0) + (newAuditCount || 0) + (messageCount || 0) },
        { id: "stats", label: "Stats", icon: BarChart3 },
    ];

    return (
        <m.nav 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden"
        >
            {/* Glassmorphic Container */}
            <div className="mx-4 mb-4 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] flex items-center justify-around relative overflow-hidden">
                {/* Active Indicator Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-blue-500/20 blur-[60px]" />
                </div>

                {primaryItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`relative flex flex-col items-center gap-1 p-3 transition-all duration-500 ${
                            activeTab === item.id ? "text-blue-400 scale-110" : "text-gray-500"
                        }`}
                    >
                        <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        
                        {item.count !== undefined && item.count > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full text-[8px] font-black text-white flex items-center justify-center border-2 border-[#080808]">
                                {item.count}
                            </span>
                        )}
                        
                        {activeTab === item.id && (
                            <m.div 
                                layoutId="mobile-nav-indicator"
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                            />
                        )}
                    </button>
                ))}

                {/* More / Menu Trigger */}
                <button
                    onClick={() => {
                        // Open larger menu overlay
                        const event = new CustomEvent('open-admin-menu');
                        window.dispatchEvent(event);
                    }}
                    className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-white transition-all"
                >
                    <MoreHorizontal size={22} />
                    <span className="text-[10px] font-black uppercase tracking-widest">More</span>
                </button>
            </div>
        </m.nav>
    );
}
