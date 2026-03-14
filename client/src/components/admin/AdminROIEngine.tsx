"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Zap, ArrowRight, ShieldCheck, Download, RefreshCw, BarChart3 } from "lucide-react";

export default function AdminROIEngine() {
    const [budget, setBudget] = useState(500000);
    const [timeline, setTimeline] = useState(12); // months
    const [efficiencyGain, setEfficiencyGain] = useState(30); // %
    const [isCalculating, setIsCalculating] = useState(false);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const calculatedSavings = (budget * (efficiencyGain / 100)) * (timeline / 12);
    const roiPercent = ((calculatedSavings - (budget * 0.2)) / (budget * 0.2)) * 100; // Assuming 20% dev cost

    const handleGenerate = () => {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 800);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Configuration Panel */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">ROI_Parameters</h3>
                                <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em]">Configure financial projection model</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-black uppercase text-gray-500">Project_Surface_Value</label>
                                    <span className="text-xs font-bold text-white tracking-widest">{formatCurrency(budget)}</span>
                                </div>
                                <input 
                                    type="range" min="100000" max="5000000" step="100000" 
                                    className="w-full accent-blue-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer" 
                                    value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-black uppercase text-gray-500">Operation_Horizon (Months)</label>
                                    <span className="text-xs font-bold text-white tracking-widest">{timeline}M</span>
                                </div>
                                <input 
                                    type="range" min="3" max="36" step="1" 
                                    className="w-full accent-purple-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer" 
                                    value={timeline} onChange={(e) => setTimeline(Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-black uppercase text-gray-500">Target_Efficiency_Gain (%)</label>
                                    <span className="text-xs font-bold text-white tracking-widest">{efficiencyGain}%</span>
                                </div>
                                <input 
                                    type="range" min="5" max="90" step="5" 
                                    className="w-full accent-emerald-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer" 
                                    value={efficiencyGain} onChange={(e) => setEfficiencyGain(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            className="w-full py-5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-400 transition-all flex items-center justify-center gap-3"
                        >
                            {isCalculating ? <RefreshCw className="animate-spin" size={18} /> : "Extrapolate Yield Matrix"}
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Projection Matrix */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="p-10 rounded-[3rem] bg-indigo-600/[0.01] border border-white/ client-generating-gradient relative overflow-hidden h-full flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-12 text-white/[0.01] pointer-events-none">
                            <BarChart3 size={240} />
                        </div>

                        <div className="space-y-2 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck size={14} /> Confirmed_Projection_Engine
                            </div>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Yield_Intelligence</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-8 my-12 relative z-10">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign size={14} className="text-emerald-500" /> Projected_Surplus
                                </p>
                                <p className="text-4xl font-black text-white italic tracking-tighter">{formatCurrency(calculatedSavings)}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={14} className="text-blue-500" /> Relative_ROI_Delta
                                </p>
                                <p className="text-4xl font-black text-emerald-500 italic tracking-tighter">+{roiPercent.toFixed(1)}%</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Tactical_Brief</p>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-gray-500 hover:text-white">
                                    <Download size={16} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                                "The proposed technical architecture optimizes for a {efficiencyGain}% efficiency baseline. At your current operational surface, this yields a {formatCurrency(calculatedSavings)} surplus over the next {timeline} months, fundamentally neutralizing implementation debt within {Math.ceil(timeline / (roiPercent/100 + 1))} months."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
