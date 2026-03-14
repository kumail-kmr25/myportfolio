"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    Monitor, 
    Smartphone, 
    Tablet, 
    ExternalLink,
    RefreshCw,
    X,
    Maximize2
} from "lucide-react";
import { useFeatures } from "@/lib/features";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(j => j.data || j);

interface Preview {
    id: string;
    title: string;
    siteUrl: string;
    defaultView: "desktop" | "tablet" | "mobile";
}

interface LiveSitePreviewProps {
    initialPreviews?: Preview[];
}

export default function LiveSitePreview({ initialPreviews }: LiveSitePreviewProps) {
    const { isEnabled } = useFeatures();
    const { data: previews = initialPreviews || [] } = useSWR(isEnabled("live-preview") ? "/api/features/previews" : null, fetcher);
    const [activePreview, setActivePreview] = useState<Preview | null>(null);
    const [currentView, setCurrentView] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [key, setKey] = useState(0); // For reloading iframe

    if (!isEnabled("live-preview") || !previews || previews.length === 0) return null;

    const getViewWidth = () => {
        switch (currentView) {
            case "mobile": return "375px";
            case "tablet": return "768px";
            default: return "100%";
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Nexus_Preview</h2>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Real-time production exploration</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {previews.map((preview: Preview) => (
                    <button
                        key={preview.id}
                        onClick={() => {
                            setActivePreview(preview);
                            setCurrentView(preview.defaultView || "desktop");
                        }}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border outline-none ${
                            activePreview?.id === preview.id
                            ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20"
                            : "bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {preview.title}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activePreview && (
                    <m.div
                        key={activePreview.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="space-y-6"
                    >
                        {/* Control Bar */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentView("desktop")}
                                    className={`p-3 rounded-xl transition-all ${currentView === "desktop" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                                >
                                    <Monitor size={16} />
                                </button>
                                <button
                                    onClick={() => setCurrentView("tablet")}
                                    className={`p-3 rounded-xl transition-all ${currentView === "tablet" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                                >
                                    <Tablet size={16} />
                                </button>
                                <button
                                    onClick={() => setCurrentView("mobile")}
                                    className={`p-3 rounded-xl transition-all ${currentView === "mobile" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                                >
                                    <Smartphone size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setKey(k => k + 1)}
                                    className="p-3 text-gray-500 hover:text-white transition-colors"
                                >
                                    <RefreshCw size={16} />
                                </button>
                                <a 
                                    href={activePreview.siteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Device Frame */}
                        <div className="flex justify-center bg-[#050505] rounded-[3rem] p-4 md:p-8 border border-white/5 relative overflow-hidden group">
                            <m.div
                                animate={{ width: getViewWidth() }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl relative"
                            >
                                <iframe
                                    key={`${activePreview.id}-${key}`}
                                    src={activePreview.siteUrl}
                                    className="w-full h-full border-none"
                                />
                            </m.div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
