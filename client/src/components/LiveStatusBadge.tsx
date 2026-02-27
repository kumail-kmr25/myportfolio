"use client";

import useSWR from "swr";

const STATUS_CONFIG = {
    available: { dot: "bg-green-400", text: "text-green-400", label: "Available", glow: "shadow-green-500/50" },
    deep_work: { dot: "bg-yellow-400 animate-pulse", text: "text-yellow-400", label: "In Deep Work", glow: "shadow-yellow-500/50" },
    active_project: { dot: "bg-red-400", text: "text-red-400", label: "Active Project", glow: "shadow-red-500/50" },
    open_collaboration: { dot: "bg-blue-400", text: "text-blue-400", label: "Open to Collaboration", glow: "shadow-blue-500/50" },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface StatusData {
    status: StatusKey;
    capacityPercent: number;
    nextAvailabilityDays: number;
    currentFocus: string;
    customMessage?: string;
}

export function LiveStatusBadge({ variant = "navbar" }: { variant?: "navbar" | "hero" | "hire" }) {
    const { data } = useSWR<StatusData>("/api/developer-status", fetcher, { refreshInterval: 60000 });

    if (!data) return null;

    const config = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.available;

    if (variant === "navbar") {
        return (
            <span className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest ${config.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {config.label}
            </span>
        );
    }

    if (variant === "hero") {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className={`w-2 h-2 rounded-full ${config.dot} shadow-lg ${config.glow}`} />
                <span className={`text-xs font-black uppercase tracking-widest ${config.text}`}>{config.label}</span>
                {data.customMessage && (
                    <span className="text-gray-500 text-xs">· {data.customMessage}</span>
                )}
            </div>
        );
    }

    if (variant === "hire") {
        return (
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/8 space-y-5">
                <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full shadow-lg flex-shrink-0 ${config.dot} ${config.glow}`} />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Current Status</p>
                        <p className={`text-sm font-black ${config.text}`}>{config.label}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Current Capacity</span>
                        <span className="text-sm font-black text-white">{data.capacityPercent}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${data.capacityPercent >= 80 ? "bg-red-500" : data.capacityPercent >= 50 ? "bg-yellow-500" : "bg-green-500"}`}
                            style={{ width: `${data.capacityPercent}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Next Availability</p>
                        <p className="text-sm font-black text-white">
                            {data.nextAvailabilityDays === 0 ? "Now" : `${data.nextAvailabilityDays} Days`}
                        </p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Current Focus</p>
                        <p className="text-xs font-bold text-white line-clamp-2">{data.currentFocus}</p>
                    </div>
                </div>

                {data.customMessage && (
                    <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                        <p className="text-xs text-blue-300 italic">&quot;{data.customMessage}&quot;</p>
                    </div>
                )}
            </div>
        );
    }

    return null;
}
