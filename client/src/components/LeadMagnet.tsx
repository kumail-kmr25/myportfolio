"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Download, Mail, CheckCircle2, FileText, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-[3rem] bg-gradient-to-br from-blue-600/10 via-white/[0.02] to-transparent border border-white/ client-generating-gradient-light p-10 md:p-20 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <FileText size={14} /> Free_Engineering_Resource
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
                The Scaling <br /> <span className="text-blue-500">Architecture</span> Playbook
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed max-w-sm mx-auto lg:ml-0">
                A 25-page deep dive into building production-ready SaaS with Next.js 15, multi-tenancy, and high-performance database sharding.
              </p>
              
              <ul className="space-y-4 hidden md:block">
                 {[
                   "Prisma Optimization Secrets",
                   "Serverless Resilience Patterns",
                   "Conversion-First UI Strategy"
                 ].map(item => (
                   <li key={item} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                      <ShieldCheck size={16} className="text-blue-500" />
                      {item}
                   </li>
                 ))}
              </ul>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <m.div 
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-8"
                  >
                    <div className="text-center space-y-2">
                       <h3 className="text-xl font-bold uppercase tracking-tight">Access Briefing</h3>
                       <p className="text-xs text-gray-500">Enter your secure email to receive the encrypted PDF link.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="CTO@company.io" 
                          className="w-full bg-black/40 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        />
                      </div>
                      <button 
                        disabled={isSubmitting}
                        className="w-full bg-white text-black py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? "Authenticating..." : (
                          <>
                            Download Brief <Download size={16} />
                          </>
                        )}
                      </button>
                    </form>
                    <p className="text-[10px] text-center text-gray-700 font-bold uppercase tracking-widest italic">
                       Zero Spam // Maximum Intel
                    </p>
                  </m.div>
                ) : (
                  <m.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 shadow-2xl space-y-8 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                       <CheckCircle2 size={40} />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter">Mission_Success</h3>
                       <p className="text-gray-400 font-medium">The Playbook has been dispatched to <span className="text-white">{email}</span>. Check your inbox to initiate download.</p>
                    </div>
                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                       Check Inbox <ArrowRight size={14} />
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
