"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, CheckCircle2, Building2, Layers, IndianRupee } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const ProposalGen: React.FC = () => {
    const { data: templateData } = useSWR('/api/proposals', fetcher);
    const templates = templateData?.templates || [];
    
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        industry: '',
        projectType: '',
        budget: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedProposal, setGeneratedProposal] = useState<any>(null);

    const industries = ["E-commerce", "SaaS", "Real Estate", "Healthcare", "Education"];

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/proposals', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    features: ["Authentication", "Dashboard", "API Integration"],
                    timeline: "4-6 Weeks"
                })
            });
            const data = await res.json();
            setGeneratedProposal(data);
            setStep(2);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="py-20 px-6 max-w-5xl mx-auto">
            <div className="bg-[#050505] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <FileText size={200} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Proposal <span className="text-blue-500">Generator</span></h2>
                            <p className="text-gray-500 text-sm">Create professional project scopes in seconds</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Client Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all"
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="john@company.com"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all"
                                            value={formData.clientEmail}
                                            onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setStep(1)}
                                    disabled={!formData.clientName || !formData.clientEmail}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    Next Phase <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Project Industry</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {industries.map(ind => (
                                            <button
                                                key={ind}
                                                onClick={() => setFormData({...formData, industry: ind})}
                                                className={`p-4 rounded-2xl border transition-all text-sm font-medium ${
                                                    formData.industry === ind 
                                                    ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                                                    : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                                                }`}
                                            >
                                                {ind}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setStep(0)}
                                        className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={!formData.industry || isGenerating}
                                        className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                    >
                                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'Generate Proposal'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="inline-flex p-6 bg-emerald-500/10 rounded-full text-emerald-500 mb-8">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Proposal Created!</h3>
                                <p className="text-gray-400 mb-10">We've generated a custom scope for {formData.clientName}. A copy has been saved to your administration portal.</p>
                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm">
                                        <Send size={16} /> Send to Client
                                    </button>
                                    <button onClick={() => setStep(0)} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm">
                                        New Template
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const ChevronRight = ({...props}) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const Loader2 = ({...props}) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
);

export default ProposalGen;
