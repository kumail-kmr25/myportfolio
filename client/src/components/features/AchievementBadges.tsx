"use client";

import React from "react";
import { m } from "framer-motion";
import { 
    Award, 
    Shield, 
    Zap, 
    TrendingUp, 
    Medal,
    Trophy,
    Star
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

interface BadgeItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface BadgeData {
    badges: BadgeItem[];
}

const iconMap: Record<string, any> = {
    "Award": Award,
    "Shield": Shield,
    "Zap": Zap,
    "TrendingUp": TrendingUp,
    "Medal": Medal,
    "Trophy": Trophy,
    "Star": Star
};

export default function AchievementBadges() {
    const { data, isLoading } = useSWR<BadgeData>("/api/achievements", fetcher);

    if (isLoading) return null;

    const badges = data?.badges || [];

    return (
        <section className="py-20 px-6 bg-[#030303] relative overflow-hidden border-y border-white/5">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {badges.map((badge, i) => {
                        const Icon = iconMap[badge.icon] || Award;
                        return (
                            <m.div 
                                key={badge.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex flex-col items-center text-center space-y-4 max-w-[200px]"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-blue-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="w-20 h-20 rounded-[2rem] bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl relative z-10">
                                        <Icon size={32} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg border-2 border-[#030303] z-20">
                                        ✓
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tighter">{badge.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed opacity-60">
                                        {badge.description}
                                    </p>
                                </div>
                            </m.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
