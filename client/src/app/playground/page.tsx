"use client";

import React from "react";
import { m } from "framer-motion";
import { Code2, Zap, Trophy, Rocket, ChevronRight, Terminal, Globe, Cpu, Layers, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const techStack = [
  { name: "Next.js 15", icon: Globe, color: "text-white", bg: "bg-white/10" },
  { name: "React 19", icon: Cpu, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "TypeScript", icon: Terminal, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  { name: "Tailwind CSS", icon: Layers, color: "text-cyan-400", bg: "bg-cyan-400/10" },
];

const featuredChallenges = [
  {
    title: "Responsive Navbar Boss",
    description: "Build a premium, high-performance navbar with Framer Motion animations that works on all devices.",
    difficulty: "Intermediate",
    time: "20 min",
    xp: 500,
    stack: ["React", "Framer Motion", "Tailwind"],
  },
  {
    title: "SQL Query Master",
    description: "Write optimized PostgreSQL queries for a complex SaaS dashboard with multi-tenant data structures.",
    difficulty: "Advanced",
    time: "30 min",
    xp: 800,
    stack: ["SQL", "PostgreSQL", "Database Design"],
  },
  {
    title: "Next.js Server Actions",
    description: "Implement secure, end-to-end type-safe forms using Next.js 15 Server Actions and Zod validation.",
    difficulty: "Expert",
    time: "15 min",
    xp: 600,
    stack: ["Next.js", "Zod", "Server Actions"],
  },
];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} />
            The Future of Portfolios
          </m.div>

          <m.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            INTERACTIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600">
              PLAYGROUND
            </span>
          </m.h1>

          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
          >
            Don't just look at my work. <span className="text-white">Break it, fix it, and build upon it.</span> Experience high-end engineering firsthand with live-running code environments.
          </m.p>

          <m.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link 
              href="#challenges"
              className="group relative px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Coding <ChevronRight size={16} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              href="/portfolio"
              className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
            >
              View Projects
            </Link>
          </m.div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <m.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center gap-4 group hover:bg-white/[0.05] transition-all"
              >
                <div className={`p-4 rounded-2xl ${tech.bg} ${tech.color} group-hover:scale-110 transition-transform`}>
                  <tech.icon size={32} />
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">CODING CHALLENGES</h2>
              <p className="text-gray-500 font-medium max-w-lg">Master specific skills through hands-on exercises. Complete them to earn XP and showcase your technical depth.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Trophy className="text-yellow-400" size={20} />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Rank</p>
                  <p className="text-sm font-bold">#42</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredChallenges.map((challenge, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-6 hover:bg-white/[0.05] transition-all hover:-translate-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                    <Code2 size={24} />
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {challenge.difficulty}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{challenge.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed font-medium">{challenge.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {challenge.stack.map(s => (
                    <span key={s} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-400 lowercase border border-white/5">
                      #{s.toLowerCase().replace(" ", "")}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center px-2">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                    <span className="flex items-center gap-1.5"><Zap size={14} className="text-yellow-500" /> {challenge.xp} XP</span>
                    <span>{challenge.time}</span>
                  </div>
                  <Link href={`/playground/${challenge.title.toLowerCase().replace(/ /g, "-")}`} className="p-2 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section: AI Mentor */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-blue-600/10 border border-blue-500/20 p-12 md:p-24 overflow-hidden relative group">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em]">
                <Rocket size={14} />
                Coming Soon
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">AI CODE <br /><span className="text-blue-400 italic">MENTOR</span></h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mx-auto lg:ml-0">
                Get real-time feedback on your code quality, optimization tips, and architectural advice from an AI trained on my engineering standards.
              </p>
              <div className="pt-4">
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:ml-0">
                  <input 
                    type="email" 
                    placeholder="Enter email for early access" 
                    className="flex-1 bg-black/40 border border-blue-500/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  />
                  <button className="px-8 py-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 shrink-0">
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-20" />
                <div className="relative bg-[#080808] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <p className="text-blue-400"># Suggestion from AI Mentor</p>
                    <p className="text-gray-500 italic">"I noticed you're using a standard array for this high-frequency list. Consider using a Map for O(1) lookups..."</p>
                    <div className="pt-4 flex items-center gap-3 text-xs">
                      <span className="text-green-400 font-bold border border-green-400/20 px-2 py-0.5 rounded-md">+200 Performance Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">PLAYGROUND BY KUMAIL KMR</p>
      </footer>
    </main>
  );
}
