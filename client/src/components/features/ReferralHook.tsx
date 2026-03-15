"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Share2, Link as LinkIcon, Gift, Copy, Check, Users, Sparkles, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function ReferralHook() {
    const [referralCode, setReferralCode] = useState(`REF-${Math.random().toString(36).substring(7).toUpperCase()}`);
    const [copied, setCopied] = useState(false);

    const copyLink = async () => {
        const link = `${window.location.origin}?ref=${referralCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Notify backend of referral link generation/copy (optional but good for tracking velocity)
        try {
            await fetch("/api/referrals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ referrerCode: referralCode })
            });
        } catch (err) {
            console.error("Referral tracking failed", err);
        }
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <div className="relative group">
                    {/* Animated background rings */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="w-[500px] h-[500px] border border-blue-500 rounded-full animate-ping duration-[4000ms]" />
                        <div className="absolute w-[300px] h-[300px] border border-indigo-500 rounded-full animate-ping duration-[3000ms]" />
                    </div>

                    <div className="glass-effect p-12 rounded-[4rem] border border-white/5 relative z-10 text-center space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] shadow-sm italic mx-auto">
                                <Sparkles size={14} className="animate-pulse" /> Partner Program
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Invite a Partner
                            </h2>
                            <p className="max-w-xl mx-auto text-gray-500 text-sm font-medium leading-relaxed italic">
                                Help us expand the engineering network. Refer a peer and unlock prioritized access to the Architecture Library and advanced blueprints.
                            </p>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-4 flex flex-col md:flex-row items-center gap-4 group/input">
                            <div className="flex-grow flex items-center gap-4 px-6 py-4">
                                <LinkIcon size={18} className="text-gray-700 group-focus-within/input:text-blue-400 transition-colors" />
                                <code className="text-gray-400 text-xs font-mono truncate tracking-tight uppercase">
                                    {typeof window !== 'undefined' ? window.location.origin : 'site.com'}/?ref={referralCode}
                                </code>
                            </div>
                            <button 
                                onClick={copyLink}
                                className={`w-full md:w-auto px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                                    copied 
                                    ? "bg-emerald-500 text-white" 
                                    : "bg-white text-black hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied to Clipboard" : "Copy Referral Link"}
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                            <div className="space-y-2">
                                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Active Referrals</p>
                                <p className="text-2xl font-black text-white italic tabular-nums">00</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Growth Impact</p>
                                <p className="text-2xl font-black text-blue-500 italic tabular-nums">1.2X</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">System Status</p>
                                <p className="text-2xl font-black text-emerald-500 italic tabular-nums uppercase">Stable</p>
                            </div>
                        </div>

                        <div className="pt-6 flex items-center justify-center gap-8">
                            <button className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                                <Share2 size={14} /> Share with Network
                            </button>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <button className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                                <Users size={14} /> View Leaderboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
