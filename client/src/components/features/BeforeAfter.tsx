"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Scan, MousePointer2, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ComparisonItem {
    id: string;
    title: string;
    description: string;
    beforeUrl: string;
    afterUrl: string;
    category: string;
}

const COMPARISONS: ComparisonItem[] = [
    {
        id: "comp-1",
        title: "Legacy Refresh",
        description: "Modernizing a bloated legacy dashboard into a high-performance React application.",
        beforeUrl: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?auto=format&fit=crop&q=80&w=1200",
        afterUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        category: "UI Architecture"
    },
    {
        id: "comp-2",
        title: "SaaS Transformation",
        description: "Transforming standard landing pages into conversion-optimized growth machines.",
        beforeUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
        afterUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        category: "Conversion Engineering"
    }
];

export default function BeforeAfter() {
    const [sliderPos, setSliderPos] = useState(50);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);

    const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const relativeX = x - rect.left;
        const position = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
        
        setSliderPos(position);
    };

    const handleMouseDown = () => setIsResizing(true);
    const handleMouseUp = () => setIsResizing(false);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isResizing]);

    const activeItem = COMPARISONS[activeIndex];

    return (
        <section id="comparisons" className="py-32 px-6 bg-[#030303] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    
                    {/* Visual Comparison Area */}
                    <div className="lg:col-span-7 space-y-8">
                        <div 
                            ref={containerRef}
                            className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 cursor-col-resize select-none group"
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleMouseDown}
                        >
                            {/* After Image (Base) */}
                            <div className="absolute inset-0">
                                <img src={activeItem.afterUrl} alt="After" className="w-full h-full object-cover" />
                                <div className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    OPTIMIZED_SYSTEM
                                </div>
                            </div>

                            {/* Before Image (Overlay) */}
                            <div 
                                className="absolute inset-0 border-r border-white/50 z-10"
                                style={{ width: `${sliderPos}%` }}
                            >
                                <div className="absolute inset-0 w-[100vw] lg:w-[70vw]">
                                     <img src={activeItem.beforeUrl} alt="Before" className="w-full h-full object-cover grayscale" />
                                     <div className="absolute top-8 left-8 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                                        LEGACY_STATE
                                    </div>
                                </div>
                            </div>

                            {/* Handle Bar */}
                            <div 
                                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-black text-black flex items-center justify-center shadow-2xl">
                                    <ArrowLeftRight size={20} />
                                </div>
                            </div>

                            {/* Hint Overlay */}
                            <m.div 
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none transition-opacity"
                            >
                                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                                    <MousePointer2 size={16} /> Drag to Compare Impact
                                </div>
                            </m.div>
                        </div>

                        <div className="flex justify-between items-center px-4">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setActiveIndex(prev => (prev - 1 + COMPARISONS.length) % COMPARISONS.length)}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => setActiveIndex(prev => (prev + 1) % COMPARISONS.length)}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">
                                Case Study {activeIndex + 1} of {COMPARISONS.length}
                            </div>
                        </div>
                    </div>

                    {/* Narrative Area */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                            <m.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                <Scan size={12} /> Visual_Audit_Module_v1.0
                            </m.div>
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
                                ARCHITECTURAL <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">EVOLUTION.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed italic">
                                Visualizing the transformation from fragmented legacy systems to cohesive, high-performance digital ecosystems.
                            </p>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                <Scan size={100} />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{activeItem.category}</p>
                                <h3 className="text-2xl font-black text-white italic tracking-tight">{activeItem.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed italic">{activeItem.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Performance Gain</p>
                                    <p className="text-xl font-black text-emerald-500 italic">+120%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Load Velocity</p>
                                    <p className="text-xl font-black text-blue-500 italic">-3.2s</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
