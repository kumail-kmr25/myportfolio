"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Users, Search, Filter, Plus, ChevronRight, Mail, Phone, Globe, ExternalLink, Calendar, DollarSign, Activity, ShieldCheck, MoreVertical, Sparkles } from "lucide-react";

const MOCK_CLIENTS = [
  { id: "cl-01", name: "Nebula Systems", contact: "Sarah Chen", email: "sarah@nebula.io", status: "Active", value: "INR 4.5L", health: 98, lastContact: "2h ago" },
  { id: "cl-02", name: "Pulse Healthcare", contact: "Marcus Wright", email: "m.wright@pulse.hc", status: "Maintenance", value: "INR 2.2L", health: 85, lastContact: "1d ago" },
  { id: "cl-03", name: "Zenith Real Estate", contact: "Elena Rodriguez", email: "elena@zenith.com", status: "Negotiation", value: "Pending", health: 100, lastContact: "Just now" },
];

export default function AdminClients() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-10">
      {/* Header Container */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 px-10 py-12 bg-white/[0.02] border border-white/5 rounded-[4rem] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="space-y-6 relative z-10">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] shadow-sm italic">
             <Users size={14} className="animate-pulse" /> PERSONNEL_REGISTRY_UNIT_M-04
           </div>
           <div>
             <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none mb-3">Client_Lifecycle</h2>
             <p className="text-[11px] text-gray-700 font-black uppercase tracking-[0.4em] max-w-md italic">Orchestrate high-intensity relationships & monitor project health telemetry.</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto relative z-10">
           <div className="relative group/search">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/search:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH_NODE_IDENTITY..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full xl:w-72 bg-black/40 border border-white/10 rounded-2xl pl-14 pr-8 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-black tracking-tighter placeholder:text-gray-800 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.4em] italic"
              />
           </div>
           <button className="p-5 bg-white text-black rounded-2xl hover:bg-blue-400 transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-4 group/btn overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-500/10 transform translate-y-full group-hover/btn:translate-y-0 transition-transform" />
              <Plus size={22} className="relative z-10" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">Initialize_Node</span>
           </button>
        </div>
      </div>

      {/* Stats Quick Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "Total_Account_Value", value: "INR 18.2L", icon: DollarSign, color: "text-emerald-500" },
           { label: "Active_Architectures", value: "07", icon: Activity, color: "text-blue-500" },
           { label: "Retention_Stability", value: "96.4%", icon: ShieldCheck, color: "text-purple-500" }
         ].map((stat, idx) => (
           <div key={stat.label} className="p-10 rounded-[3.5rem] bg-white/[0.03] border border-white/5 space-y-6 group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-white/[0.05] transition-colors">
                 <stat.icon size={80} />
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform relative z-10`}>
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-6">
         {MOCK_CLIENTS.map((client, i) => (
           <m.div
             key={client.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.05 }}
             className="group relative p-10 rounded-[3.5rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.03] transition-all duration-500 flex flex-col xl:flex-row xl:items-center gap-12"
           >
              <div className="absolute top-8 left-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[9px] font-mono text-blue-500/40 uppercase tracking-[0.5em]">Vector_ID: {client.id.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-8 xl:w-[450px]">
                 <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 font-black text-3xl italic group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl relative overflow-hidden">
                   <span className="relative z-10">{client.name.charAt(0)}</span>
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="min-w-0 space-y-2">
                   <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight group-hover:text-blue-400 transition-colors">{client.name}</h3>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
                     <span className="text-blue-500/60 italic">{client.contact.toUpperCase()}</span>
                     <div className="w-1 h-1 rounded-full bg-white/10" />
                     <span className="truncate">{client.email.toUpperCase()}</span>
                   </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-16 flex-grow">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">Project_Health</p>
                    <div className="flex items-center gap-4">
                       <div className="flex-grow h-2 max-w-[140px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <m.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${client.health}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className={`h-full relative ${client.health > 90 ? 'bg-emerald-500' : 'bg-yellow-500'} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
                          >
                             <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </m.div>
                       </div>
                       <span className="text-[12px] font-black text-white italic">{client.health}%_STABILITY</span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">Operational_Value</p>
                    <p className="text-xl font-black text-white italic tracking-tighter">{client.value}</p>
                 </div>

                 <div className="hidden md:block space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">Last_Handshake</p>
                    <p className="text-base font-black text-gray-700 italic flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                       {client.lastContact.toUpperCase()}
                    </p>
                 </div>
              </div>

              <div className="flex items-center gap-6 ml-auto">
                 <button className="p-4 rounded-2xl bg-white/5 text-gray-800 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all border border-white/5 shadow-xl">
                    <Mail size={18} />
                 </button>
                 <button className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-blue-600/10 text-blue-400 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 group/go shadow-2xl shadow-blue-500/10 italic">
                    Control_Hub <ChevronRight size={18} className="group-hover/go:translate-x-2 transition-transform" />
                 </button>
              </div>
           </m.div>
         ))}
      </div>
    </div>
  );
}
