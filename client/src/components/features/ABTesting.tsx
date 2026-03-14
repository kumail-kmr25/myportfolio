"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Split, BarChart3, Target, Eye } from 'lucide-react';

export const ABTesting: React.FC = () => {
    const [variant, setVariant] = useState<'A' | 'B'>('A');

    useEffect(() => {
        // Simple client-side randomizer for demo
        setVariant(Math.random() > 0.5 ? 'A' : 'B');
    }, []);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center gap-3 text-blue-500 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 text-xs font-bold uppercase tracking-widest w-fit mb-6">
                        <Split size={16} />
                        Performance Optimization
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Conversion <span className="text-blue-500">A/B Engine</span></h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Every pixel is measured. My integrated A/B testing engine allows for real-time conversion tracking and layout optimization to ensure maximum ROI for every feature.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500">
                                <Target size={18} />
                            </div>
                            <div className="text-sm">
                                <span className="text-white font-bold block">Variant {variant} Active</span>
                                <span className="text-gray-500">Serving live traffic variant</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
                                <BarChart3 size={18} />
                            </div>
                            <div className="text-sm">
                                <span className="text-white font-bold block">12.4% Lift</span>
                                <span className="text-gray-500">Average improvement on CTA engagement</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-12 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <AnimatePresence mode="wait">
                            {variant === 'A' ? (
                                <motion.div
                                    key="variantA"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center space-y-8 relative z-10"
                                >
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Transforming Ideas Into <span className="text-blue-500">Digital Reality</span></h3>
                                    <button className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                                        Start Your Project
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="variantB"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center space-y-8 relative z-10"
                                >
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Architecting <span className="text-emerald-500">Scalable Systems</span> For Growth</h3>
                                    <button className="px-10 py-5 bg-white text-black font-black rounded-2xl text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                        Build Together
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <div className="mt-12 flex justify-center gap-4 opacity-50">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                <Eye size={12} /> Live Preview
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ABTesting;
