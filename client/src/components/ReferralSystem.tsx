"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Share2, Copy, Gift, Users, TrendingUp, Check, ExternalLink, Mail, Twitter, Linkedin, Sparkles } from "lucide-react";

export default function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const referralCode = "KMR-REF-77X";
  const referralLink = `https://kumailkmr.vercel.app/r/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Active Referrals", value: "12", icon: Users },
    { label: "Potential Payout", value: "INR 1.2L", icon: Gift },
    { label: "Viral Velocity", value: "High", icon: TrendingUp },
  ];

  return (
    <section className="py-32 px-6 bg-[#030303] relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em]"
            >
              <Gift size={14} /> Referral_Program_v2.0
            </m.div>

            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
            >
              MULTIPLY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">THE_REWARD.</span>
            </m.h2>

            <m.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg"
            >
              Help high-growth startups find me. For every successful client referral, you earn <span className="text-white">10% of the project value</span>. No cap. Just growth.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {stats.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2 group hover:bg-white/[0.05] transition-all"
                >
                  <stat.icon size={20} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-white italic">{stat.value}</p>
                </m.div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[3rem] blur opacity-40 group-hover:opacity-100 transition-opacity" />
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative p-10 md:p-14 rounded-[3rem] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-10"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                  <Sparkles size={24} className="text-yellow-400" />
                  Secure_Referral_Link
                </h3>
                <p className="text-sm text-gray-500 font-medium">Generate your unique identity token and track your viral velocity in real-time.</p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between group/link">
                     <span className="text-xs font-mono text-blue-400/80 truncate pr-4">{referralLink}</span>
                     <button onClick={handleCopy} className="text-white/30 hover:text-white transition-colors">
                        {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                     </button>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="px-8 py-5 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                  >
                    Generate Link
                  </button>
                </div>
                <div className="flex items-center justify-between px-2">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-700">Token_Expires: 90_Days</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 hover:text-emerald-400 flex items-center gap-2">
                     Learn Compensation Tier <ExternalLink size={12} />
                   </button>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6 text-center">Viral_Propagation_Network</p>
                 <div className="flex justify-center gap-6">
                    {[
                      { icon: Twitter, label: "X.com" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Mail, label: "Direct" },
                      { icon: Share2, label: "System" }
                    ].map(social => (
                      <m.button
                        key={social.label}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center gap-3 group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                           <social.icon size={22} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-700 group-hover:text-white transition-colors">{social.label}</span>
                      </m.button>
                    ))}
                 </div>
              </div>
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
