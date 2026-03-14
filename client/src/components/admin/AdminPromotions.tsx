"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { Gift, Target, Zap, TrendingUp, Share2, Download, Users, Plus, ChevronRight, PieChart, ArrowUpRight, Sparkles, Filter, MoreVertical } from "lucide-react";

export default function AdminPromotions({ data = [], type = "referrals" }: { data?: any[], type?: "referrals" | "leads" }) {
  const [activeSubTab, setActiveSubTab] = useState<"referrals" | "leads" | "targeting">(type);

  const promoStats = [
    { label: "Active_Viral_Loops", value: data.length.toString().padStart(2, '0'), icon: Zap, color: "text-blue-500" },
    { label: "Total_Propagation", value: data.reduce((acc, curr) => acc + (curr.users || curr.downloads || 0), 0), icon: TrendingUp, color: "text-emerald-500" },
    { label: "Lead_Capture_Rate", value: "24.5%", icon: Target, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Container */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 px-10 py-12 bg-white/[0.02] border border-white/5 rounded-[4rem] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.03] to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="space-y-6 relative z-10">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] shadow-sm italic">
             <TrendingUp size={14} className="animate-pulse" /> PROPAGATION_MATRIX_UNIT_M-05
           </div>
           <div>
             <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none mb-3">Viral_Propagation</h2>
             <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] max-w-md italic">Manage high-velocity acquisition loops & monitor lead magnet conversion vectors.</p>
           </div>
        </div>

        <div className="flex flex-col gap-6 w-full xl:w-auto relative z-10">
            <div className="flex p-2 bg-black/40 border border-white/10 rounded-[2rem] backdrop-blur-3xl">
               {(["referrals", "leads", "targeting"] as const).map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setActiveSubTab(tab)}
                   className={`px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap italic ${activeSubTab === tab ? "bg-white text-black shadow-2xl" : "text-gray-600 hover:text-white"}`}
                 >
                   {tab === "referrals" ? "Vector_Loops" : tab === "leads" ? "Lead_Magnets" : "Strategic_Targeting"}
                 </button>
               ))}
            </div>
        </div>
      </div>

      {/* Stats Quick Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {promoStats.map((stat, idx) => (
           <div key={stat.label} className="p-10 rounded-[3.5rem] bg-white/[0.03] border border-white/5 space-y-6 group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-white/[0.05] transition-colors">
                 <stat.icon size={80} />
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform relative z-10 shadow-xl`}>
                 <stat.icon size={22} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">{stat.label}</p>
                <p className="text-4xl font-black text-white italic tracking-tighter mt-2">{stat.value}</p>
              </div>
              <div className="absolute bottom-4 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
           </div>
         ))}
      </div>

      {/* Promotion Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Live Performance Stream */}
         <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-8">
               <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-4 italic">
                  <PieChart size={18} className="text-blue-500" />
                  Performance_Heuristics
               </h3>
               <button className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] hover:text-blue-400 transition-all flex items-center gap-3 border-b border-blue-500/20 pb-1 italic">
                  DEEP_ANALYSIS_SYNC <ArrowUpRight size={14} />
               </button>
            </div>
            
            <div className="p-10 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-8 relative overflow-hidden group/stream">
               <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-indigo-600/20 to-transparent" />
               
               {/* Mock Table/List for Referrals/Leads */}
               {activeSubTab === "referrals" ? (
                 <div className="space-y-6">
                    {data.length > 0 ? data.map((ref: any) => (
                      <div key={ref.id || ref.code} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group/row hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-500">
                         <div className="flex items-center gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 font-black text-xl italic group-hover/row:bg-indigo-600 group-hover/row:text-white transition-all shadow-xl">R</div>
                            <div className="space-y-2">
                               <p className="text-lg font-black text-white uppercase italic tracking-tighter group-hover/row:text-indigo-400 transition-colors leading-tight">{ref.referralCode || ref.code || "REF-TRK"}</p>
                               <div className="flex items-center gap-3">
                                  <Users size={12} className="text-gray-700" />
                                  <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">{ref.user?.name || "ANONYMOUS_ACTOR"} ATTACHED</p>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-12">
                            <div className="hidden xl:block text-right space-y-1">
                               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-800 italic">ACCUMULATED_VALUE</p>
                               <p className="text-xl font-black text-emerald-500 italic tracking-tighter">INR {(ref.totalValue || 0).toLocaleString()}</p>
                            </div>
                            <div className={`px-5 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest italic transition-all ${ref.status === 'ACTIVE' || ref.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                               {ref.status || 'ACTIVE'}
                            </div>
                            <button className="p-3 bg-white/5 rounded-xl text-gray-800 hover:text-white hover:bg-white/10 transition-all"><MoreVertical size={20} /></button>
                         </div>
                      </div>
                    )) : (
                        <div className="py-32 text-center space-y-8 opacity-40">
                            <Gift className="mx-auto text-gray-800 animate-pulse" size={60} />
                            <div className="space-y-3">
                               <p className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-700 italic">NO_PROPAGATION_DETECTED</p>
                               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-800">Viral loop stream currently empty.</p>
                            </div>
                        </div>
                    )}
                 </div>
               ) : activeSubTab === "leads" ? (
                 <div className="space-y-6">
                    {data.length > 0 ? data.map((lead: any) => (
                      <div key={lead.id || lead.name} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group/row hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-500">
                         <div className="flex items-center gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover/row:bg-purple-600 group-hover/row:text-white transition-all shadow-xl"><Download size={22} /></div>
                            <div className="space-y-2">
                               <p className="text-lg font-black text-white uppercase italic tracking-tighter group-hover/row:text-purple-400 transition-colors leading-tight">{lead.magnetName || lead.name || "LEAD-GEN"}</p>
                               <div className="flex items-center gap-3">
                                  <Sparkles size={12} className="text-gray-700" />
                                  <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">CAPTURED FROM {lead.email.toUpperCase() || "UNKNOWN_NODE"}</p>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-12">
                            <div className="hidden xl:block text-right space-y-1">
                               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-800 italic">TEMPORAL_TRACE</p>
                               <p className="text-xl font-black text-white italic tracking-tighter">{new Date(lead.createdAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                            <div className="px-5 py-2.5 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-indigo-500/5">
                               {lead.type || "CAPTURED"}
                            </div>
                            <button className="p-3 bg-white/5 rounded-xl text-gray-800 hover:text-white hover:bg-white/10 transition-all"><MoreVertical size={20} /></button>
                         </div>
                      </div>
                    )) : (
                        <div className="py-32 text-center space-y-8 opacity-40">
                            <Target className="mx-auto text-gray-800 animate-pulse" size={60} />
                            <div className="space-y-3">
                               <p className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-700 italic">NO_INGEST_EVENTS</p>
                               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-800">Lead magnet telemetry synchronized but empty.</p>
                            </div>
                        </div>
                    )}
                 </div>
               ) : (
                 <div className="space-y-8">
                    {[
                        { sector: "FinTech_SaaS", potential: "High", focus: "Security Architecture", leads: 12, color: "text-blue-500" },
                        { sector: "HealthCare_EMR", potential: "Premium", focus: "Data Compliance", leads: 8, color: "text-emerald-500" },
                        { sector: "Luxury_Real_Estate", potential: "High", focus: "Visual Storytelling", leads: 5, color: "text-indigo-500" }
                    ].map((sector, idx) => (
                        <div key={sector.sector} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-10 group/row hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-500 shadow-xl">
                            <div className="flex items-center gap-8">
                                <div className={`w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center ${sector.color} group-hover/row:bg-indigo-600 group-hover/row:text-white transition-all shadow-2xl`}>
                                    <Sparkles size={28} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover/row:text-blue-400 transition-colors leading-tight">{sector.sector}</p>
                                    <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.2em] italic">Focus: {sector.focus.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-16">
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-black uppercase text-gray-800 tracking-[0.2em] italic">POTENTIAL</p>
                                    <p className="text-base font-black text-emerald-500 tracking-[0.4em] uppercase">{sector.potential}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-black uppercase text-gray-800 tracking-[0.2em] italic">CAPTURED</p>
                                    <p className="text-2xl font-black text-white tracking-tighter italic">{sector.leads.toString().padStart(2, '0')}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-800 group-hover/row:translate-x-3 group-hover/row:text-blue-500 transition-all">
                                   <ArrowUpRight size={26} />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
               )}

               <button className="w-full py-8 mt-4 rounded-[2.5rem] bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-400 transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-6 group/btn italic active:scale-95 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-500/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                  <span className="relative z-10">INITIALIZE_NEW_VECTOR</span>
                  <Plus size={22} className="relative z-10 group-hover/btn:rotate-90 transition-transform duration-500" />
               </button>
            </div>
         </div>

         {/* Viral Insight Sidebar */}
         <div className="lg:col-span-4 space-y-10">
             <div className="p-10 rounded-[4rem] bg-indigo-600/[0.02] border border-white/5 space-y-10 relative overflow-hidden group/insight backdrop-blur-3xl shadow-2xl">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="flex items-center gap-4 relative z-10">
                   <Target size={18} className="text-indigo-400" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 italic">Viral_Velocity_Pulse</h3>
                </div>
                
                <div className="space-y-10 relative z-10">
                   <div className="flex flex-col items-center py-6 relative">
                      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full animate-pulse" />
                      <div className="text-7xl font-black text-white italic tracking-tighter mb-4 relative z-10 leading-none">94%</div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic relative z-10">Propagation_Efficiency</p>
                   </div>
                   
                   <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 relative group/advice">
                      <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover/advice:opacity-100 transition-opacity" />
                      <p className="text-[13px] text-gray-500 font-black leading-relaxed italic text-center uppercase tracking-widest leading-loose">
                         &quot;Viral propagation is performing <span className="text-white">12%</span> above average. Recommendation: Focus on scaling the <span className="text-indigo-400 italic font-black">&apos;Scaling Arch Playbook&apos;</span> lead magnet to high-intensity US nodes.&quot;
                      </p>
                   </div>

                   <button className="w-full py-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl italic relative overflow-hidden group/brief">
                      <div className="absolute inset-0 bg-white/5 transform translate-y-full group-hover/brief:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10">GENERATE_STRATEGY_BRIEF</span>
                   </button>
                </div>
             </div>

             <div className="p-10 rounded-[4rem] bg-black/40 border border-white/5 space-y-8 relative overflow-hidden">
                <div className="flex items-center gap-4">
                   <Zap size={18} className="text-yellow-500 animate-pulse" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Global_Status</h3>
                </div>
                <div className="space-y-4">
                   {[
                     { label: "Handshake_Status", val: "STABLE", color: "text-emerald-500" },
                     { label: "Network_Parity", val: "OPTIMAL", color: "text-blue-500" },
                     { label: "Sync_Latency", val: "14ms", color: "text-indigo-500" }
                   ].map(s => (
                     <div key={s.label} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group/stat">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 group-hover/stat:text-gray-500 transition-colors italic">{s.label}</span>
                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${s.color} italic`}>{s.val}</span>
                     </div>
                   ))}
                </div>
             </div>
         </div>
      </div>
    </div>
  );
}
