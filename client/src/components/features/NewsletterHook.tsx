"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { Zap, Mail, ShieldCheck, ArrowRight, Loader2, Database, Brain, Lock } from "lucide-react";

export default function NewsletterHook() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "Newsletter Hook - Main Site" })
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="glass-effect p-12 md:p-20 rounded-[4rem] border border-white/5 relative overflow-hidden group">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] italic">
                                <Brain size={16} className="text-purple-500" /> Intelligence_Feed_V2
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Join the_Protocol
                            </h2>
                            <p className="max-w-xl mx-auto text-gray-500 text-sm font-medium leading-relaxed italic">
                                High-intensity technical breakdowns, architectural blueprints, and engineering strategy delivered to your encrypted inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="w-full max-w-lg space-y-6">
                            <div className="relative group/input">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/input:text-purple-400 transition-colors" size={20} />
                                <input 
                                    type="email"
                                    required
                                    placeholder="INITIATE_EMAIL_HANDSHAKE..."
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold placeholder:text-gray-800"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={`w-full py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all duration-500 ${
                                    status === "success" 
                                    ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20" 
                                    : "bg-white text-black hover:bg-purple-500 hover:text-white shadow-2xl shadow-purple-500/10"
                                }`}
                            >
                                {status === "loading" ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : status === "success" ? (
                                    <>
                                        HANDSHAKE_COMPLETE
                                        <ShieldCheck size={18} />
                                    </>
                                ) : (
                                    <>
                                        ACCESS_STREAM
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-widest text-gray-700">
                            <span className="flex items-center gap-2"><Lock size={12} /> Encrypted_Channel</span>
                            <span className="flex items-center gap-2"><Database size={12} /> Zero_Spam_Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
