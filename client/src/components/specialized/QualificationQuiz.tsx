"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    ChevronRight, 
    ChevronLeft, 
    Zap, 
    Rocket, 
    ShieldCheck, 
    Layout, 
    TrendingUp,
    Sparkles,
    CheckCircle2,
    DollarSign,
    Clock
} from "lucide-react";
import { useHireModal } from "@/context/HireModalContext";

type Step = 0 | 1 | 2 | 3;

export default function QualificationQuiz() {
    const [step, setStep] = useState<Step>(0);
    const [selections, setSelections] = useState({
        objective: "",
        timeline: "",
        budget: ""
    });
    const { openModal } = useHireModal();

    const objectives = [
        { id: "mvp", title: "Launch Rapid MVP", icon: Rocket, desc: "Go from idea to production in weeks." },
        { id: "refactor", title: "Scale/Refactor System", icon: ShieldCheck, desc: "Modernize legacy code & optimize infra." },
        { id: "custom", title: "Custom Web Application", icon: Layout, desc: "Bespoke systems built for high-performance." },
        { id: "ui", title: "High-Fidelity UI", icon: Sparkles, desc: "Stunning visuals & premium interactions." }
    ];

    const timelines = ["Under 1 Month", "1-3 Months", "Flexible"];
    const budgets = ["$5k - $10k", "$10k - $25k", "$25k+"];

    const next = () => setStep((s) => (s + 1) as Step);
    const prev = () => setStep((s) => (s - 1) as Step);

    const handleFinish = () => {
        openModal({
            service: selections.objective,
            description: `Automated Qualification: \nObjective: ${selections.objective}\nTimeline: ${selections.timeline}\nBudget: ${selections.budget}`
        });
    };

    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <div className="w-full max-w-4xl mx-auto rounded-[2.5rem] bg-[#070707] border border-white/10 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <m.div 
                    animate={{ width: `${(step / 3) * 100}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                />
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <m.div 
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="text-center">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">Strategic Scoping Tool</span>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tight">What is your primary <span className="text-emerald-500 italic block mt-2">Objective?</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {objectives.map((obj) => (
                                <button
                                    key={obj.id}
                                    onClick={() => { setSelections({ ...selections, objective: obj.title }); next(); }}
                                    className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all text-left group hover:bg-white/[0.06] hover:border-emerald-500/30"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <obj.icon size={24} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">{obj.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{obj.desc}</p>
                                </button>
                            ))}
                        </div>
                    </m.div>
                )}

                {step === 1 && (
                    <m.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 text-center"
                    >
                        <div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">Velocity Mapping</span>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Select your expected <span className="text-emerald-500 italic block mt-2">Timeline</span></h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                            {timelines.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => { setSelections({ ...selections, timeline: time }); next(); }}
                                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 text-white font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-4 group"
                                >
                                    <Clock size={16} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
                                    {time}
                                </button>
                            ))}
                        </div>

                        <button onClick={prev} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Previous Step</button>
                    </m.div>
                )}

                {step === 2 && (
                    <m.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 text-center"
                    >
                        <div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">CapEx Allocation</span>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Identify your <span className="text-emerald-500 italic block mt-2">Budget Range</span></h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                            {budgets.map((budget) => (
                                <button
                                    key={budget}
                                    onClick={() => { setSelections({ ...selections, budget: budget }); next(); }}
                                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 text-white font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-4 group"
                                >
                                    <DollarSign size={16} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
                                    {budget}
                                </button>
                            ))}
                        </div>

                        <button onClick={prev} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Previous Step</button>
                    </m.div>
                )}

                {step === 3 && (
                    <m.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-10 text-center py-12"
                    >
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <TrendingUp size={40} />
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Qualification <span className="text-emerald-500 italic">Complete.</span></h3>
                            <p className="text-gray-400 font-medium max-w-lg mx-auto">
                                Based on your requirements, we can initiate a high-fidelity partnership focused on {selections.objective}.
                            </p>
                        </div>

                        <div className="pt-8 space-y-4">
                            <button 
                                onClick={handleFinish}
                                className="w-full max-w-md py-6 rounded-[2rem] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-4"
                            >
                                Initiate Priority Request <Zap size={18} />
                            </button>
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest italic">Proceeding triggers automated background briefing.</p>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
