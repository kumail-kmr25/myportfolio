"use client";

import React, { use } from "react";
import { m } from "framer-motion";
import { ChevronLeft, Trophy, Zap, Clock, Code2, Globe, Cpu, Terminal, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ChallengeEditor from "@/components/playground/ChallengeEditor";
import { PLAYGROUND_CHALLENGES } from "@/lib/playground-data";

interface ChallengeContentProps {
  slug: string;
}

export default function ChallengeContent({ slug }: ChallengeContentProps) {
  const challenge = PLAYGROUND_CHALLENGES.find((c) => c.slug === slug);

  if (!challenge) {
    notFound();
  }

  const handleValidate = async (code: string) => {
    // Simulate server-side validation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { validationRules } = challenge;
    let feedback = "";
    let success = true;

    if (validationRules.contains) {
      for (const keyword of validationRules.contains) {
        if (!code.includes(keyword)) {
          success = false;
          feedback = `Critical Requirement Missing: Your implementation must utilize "${keyword}".`;
          break;
        }
      }
    }

    if (success) {
      feedback = "Challenge successfully authenticated. Performance metrics within optimal thresholds. Conversion path unlocked.";
    }

    return { success, feedback };
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <Link 
              href="/playground" 
              className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Playground
            </Link>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Code2 size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">{challenge.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded-md">{challenge.difficulty}</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                    <Clock size={12} />
                    <span>Est. {challenge.estimatedTime}m</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-yellow-500/80">
                    <Zap size={12} />
                    <span>{challenge.xp} XP Potential</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black italic">T</div>
               <div>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Global Rank</p>
                  <p className="text-xs font-bold text-white leading-none">#42nd Percentile</p>
               </div>
             </div>
             <div className="w-px h-10 bg-white/5" />
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center text-[8px] font-black">U{i}</div>
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-blue-600 flex items-center justify-center text-[8px] font-black italic">+8K</div>
             </div>
          </div>
        </div>

        {/* Main Grid: Description & Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Instructions Column */}
          <div className="lg:col-span-4 space-y-8">
             <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                  <Terminal size={14} className="text-blue-500" />
                  Mission_Brief
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed italic">
                  {challenge.description}
                </p>
                
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-700">Engineering_Requirements</h4>
                   <ul className="space-y-3">
                      {challenge.validationRules.contains?.map(req => (
                        <li key={req} className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                           Utilize <code className="bg-white/5 px-2 py-0.5 rounded text-blue-400 font-mono italic">{req}</code> in implementation
                        </li>
                      ))}
                      <li className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                         Ensure code is valid React syntax
                      </li>
                   </ul>
                </div>
             </div>

             {/* Dynamic Hint CTA */}
             <m.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 group"
             >
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-white">Need a Hand?</h4>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-6">
                  Facing an architectural block? My AI Mentor can provide structural advice tailored to your implementation.
                </p>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Activate AI Hint <ArrowRight size={14} />
                </button>
             </m.div>
          </div>

          {/* Editor Column */}
          <div className="lg:col-span-8">
            <ChallengeEditor 
              initialCode={challenge.initialCode}
              onValidate={handleValidate}
              conversionPrompt={challenge.conversionPrompt}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
