"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Zap, ArrowRight, ShieldCheck, Download, RefreshCw, BarChart3, PieChart, Info } from "lucide-react";

export default function ViralROIEngine() {
    const [budget, setBudget] = useState(500000);
    const [timeline, setTimeline] = useState(12);
    const [efficiencyGain, setEfficiencyGain] = useState(30);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showBrief, setShowBrief] = useState(false);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const devCost = budget * 0.15; // Assuming 15% implementation cost for the engine
    const calculatedSavings = (budget * (efficiencyGain / 100)) * (timeline / 12);
    const netProfit = calculatedSavings - devCost;
    const roiPercent = (netProfit / devCost) * 100;

    const handleCalculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowBrief(true);
        }, 1200);
    };

    return (
        <section id="roi-engine" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-xs text-emerald-400 font-black uppercase tracking-[0.5em]">ROI Estimation Tool</p>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                        Business Value
                    </h2>
                    <p className="max-w-2xl text-gray-400 text-lg font-medium leading-relaxed italic">
                        Estimate the financial impact of high-performance technical architecture on your business operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="glass-effect p-10 rounded-[3rem] border border-white/5 space-y-10">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Project Budget</label>
                                        <span className="text-2xl font-black text-white italic tracking-tighter">{formatCurrency(budget)}</span>
                                    </div>
                                    <input 
                                        type="range" min="100000" max="10000000" step="100000" 
                                        className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
                                        value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[8px] font-black text-gray-700 uppercase tracking-widest">
                                        <span>1L</span>
                                        <span>1CR</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Projected Efficiency (%)</label>
                                        <span className="text-2xl font-black text-white italic tracking-tighter">{efficiencyGain}%</span>
                                    </div>
                                    <input 
                                        type="range" min="5" max="80" step="5" 
                                        className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500"
                                        value={efficiencyGain} onChange={(e) => setEfficiencyGain(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[8px] font-black text-gray-700 uppercase tracking-widest">
                                        <span>5%_Base</span>
                                        <span>80%_Max</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Implementation Timeline (Months)</label>
                                        <span className="text-2xl font-black text-white italic tracking-tighter">{timeline}M</span>
                                    </div>
                                    <input 
                                        type="range" min="6" max="36" step="6" 
                                        className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                                        value={timeline} onChange={(e) => setTimeline(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[8px] font-black text-gray-700 uppercase tracking-widest">
                                        <span>6M</span>
                                        <span>3YR</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCalculate}
                                disabled={isCalculating}
                                className="w-full btn-primary py-6 text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 group"
                            >
                                {isCalculating ? (
                                    <RefreshCw size={20} className="animate-spin text-white/50" />
                                ) : (
                                    <>
                                        CALCULATE_ROI
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {!showBrief ? (
                                <m.div 
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="aspect-video glass-effect rounded-[4rem] border border-white/5 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent skew-y-12 translate-y-20" />
                                    <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-gray-800 mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <PieChart size={40} />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-500 uppercase tracking-widest italic mb-4">Awaiting Calculation</h4>
                                    <p className="text-xs text-gray-700 font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                                        Configure parameters and calculate the projection to visualize your architectural yield.
                                    </p>
                                </m.div>
                            ) : (
                                <m.div 
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="glass-effect p-12 rounded-[4rem] border border-emerald-500/20 relative overflow-hidden shadow-2xl shadow-emerald-500/5">
                                        <div className="absolute top-0 right-0 p-12 text-emerald-500/[0.03] select-none pointer-events-none">
                                            <TrendingUp size={300} />
                                        </div>
                                        
                                        <div className="relative z-10 space-y-10">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Projected_Net_Yield</p>
                                                    <h3 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                                                        {formatCurrency(netProfit)}
                                                    </h3>
                                                </div>
                                                <div className="px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                                    +{roiPercent.toFixed(0)}% ROI
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                                                <div className="space-y-2">
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Efficiency_Surplus</p>
                                                    <p className="text-2xl font-black text-white italic">{formatCurrency(calculatedSavings)}</p>
                                                </div>
                                                <div className="space-y-2 text-right lg:text-left">
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Payback_Period</p>
                                                    <p className="text-2xl font-black text-white italic">~{Math.ceil(timeline / (roiPercent/100 + 1))} Months</p>
                                                </div>
                                            </div>

                                            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Info size={14} />
                                                    <p className="text-[10px] font-black uppercase tracking-widest">Business Insights</p>
                                                </div>
                                                <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                                                    &quot;Your business processes could be losing approximately <span className="text-white font-bold">{formatCurrency(calculatedSavings / timeline)}</span> every month. By deploying high-performance architecture, we recapture <span className="text-emerald-400 font-bold">{efficiencyGain}%</span> of lost efficiency, significantly improving your business yield.&quot;
                                                </p>
                                            </div>

                                            <button className="w-full py-5 text-xs font-black text-white uppercase tracking-[0.4em] border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
                                                <Download size={18} />
                                                GET_FULL_STRATEGY_PDF
                                            </button>
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
