"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    Play, 
    X, 
    Maximize2, 
    Clock, 
    ExternalLink,
    ChevronRight,
    PlayCircle
} from "lucide-react";
import { useFeatures } from "@/lib/features";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(j => j.data || j);

interface Video {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    videoType: string;
    thumbnailUrl: string | null;
    duration: number | null;
}

interface VideoWalkthroughProps {
    initialVideos?: Video[];
}

export default function VideoWalkthrough({ initialVideos }: VideoWalkthroughProps) {
    const { isEnabled } = useFeatures();
    const { data: videos = initialVideos || [] } = useSWR(isEnabled("project-video") ? "/api/features/videos" : null, fetcher);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    if (!isEnabled("project-video") || !videos || videos.length === 0) return null;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Engineering_Recon</h2>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Deep-dive project walkthroughs</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest italic">Live_Nodes: {videos.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video: Video) => (
                    <m.div
                        key={video.id}
                        whileHover={{ y: -5 }}
                        className="group relative cursor-pointer"
                        onClick={() => setSelectedVideo(video)}
                    >
                        {/* Thumbnail Container */}
                        <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] relative">
                            {video.thumbnailUrl ? (
                                <img 
                                    src={video.thumbnailUrl} 
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                                    <FeaturedBotIcon className="w-12 h-12 text-blue-500/20" />
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-xl shadow-blue-600/40">
                                    <Play size={24} className="ml-1" />
                                </div>
                            </div>

                            {/* Duration Tag */}
                            {video.duration && (
                                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                                    <Clock size={10} className="text-blue-400" />
                                    <span className="text-[10px] text-white font-black uppercase tracking-widest">
                                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div className="mt-4 px-2">
                            <h3 className="text-white font-black italic tracking-tight group-hover:text-blue-400 transition-colors">{video.title}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 line-clamp-1 opacity-60">
                                {video.description || "Mission briefing restricted."}
                            </p>
                        </div>
                    </m.div>
                ))}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVideo(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />
                        <m.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="w-full max-w-6xl aspect-video bg-[#080808] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{selectedVideo.title}</h3>
                                    <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        Streaming_Node_Active
                                    </span>
                                </div>
                                <button 
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-3 bg-white/[0.05] hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Player Container */}
                            <div className="flex-grow bg-black relative">
                                <iframe 
                                    src={selectedVideo.videoUrl}
                                    className="w-full h-full border-none"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

const FeaturedBotIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"></path>
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
    </svg>
);
