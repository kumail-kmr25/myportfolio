"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    Play, 
    Pause, 
    Volume2, 
    VolumeX,
    Mic2,
    Music,
    Activity
} from "lucide-react";
import { useFeatures } from "@/lib/features";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(j => j.data || j);

export default function VoiceIntro() {
    const { isEnabled, getConfig } = useFeatures();
    const { data: config } = useSWR(isEnabled("voice-intro") ? "/api/features/voice-intro" : null, fetcher);
    const enabled = isEnabled("voice-intro");

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const audioUrl = config?.audioUrl || "/audio/intro.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : 0.8;
        }
    }, [isMuted]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(p);
        }
    };

    if (!enabled) return null;

    return (
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-white/10 transition-all relative overflow-hidden"
        >
            <audio 
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => { setIsPlaying(false); setProgress(0); }}
            />

            <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 overflow-hidden ${isPlaying ? 'bg-blue-600 scale-110 shadow-2xl shadow-blue-600/40' : 'bg-white/5 hover:bg-white/10'}`}>
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <m.div 
                                key="playing"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="flex gap-1 items-end h-8"
                            >
                                {[0.2, 0.5, 0.8, 0.4, 0.9, 0.3].map((h, i) => (
                                    <m.div
                                        key={i}
                                        animate={{ height: [`${h * 100}%`, `${(1-h) * 100}%`, `${h * 100}%`] }}
                                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                        className="w-1.5 bg-white/40 rounded-full"
                                    />
                                ))}
                            </m.div>
                        ) : (
                            <m.div
                                key="paused"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <Mic2 size={32} className="text-gray-500" />
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <button
                    onClick={togglePlay}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl hover:scale-110 active:scale-95 transition-all"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
                </button>
            </div>

            <div className="flex-grow space-y-4">
                <div className="space-y-1 text-center md:text-left">
                    <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic">Aural_Mission_Briefing</span>
                    <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Briefing_Transmission_01</h4>
                    <p className="text-[11px] text-gray-500 font-medium">Hear a personal message about my philosophy and current mission focus.</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                        <m.div 
                            style={{ width: `${progress}%` }}
                            className="absolute inset-y-0 left-0 bg-blue-600"
                        />
                    </div>
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                </div>
            </div>

            {/* Decorative background wavelength */}
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-[0.02] pointer-events-none">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path d="M0 50 Q 25 10 50 50 T 100 50" fill="none" stroke="white" strokeWidth="2" />
                </svg>
            </div>
        </m.div>
    );
}
