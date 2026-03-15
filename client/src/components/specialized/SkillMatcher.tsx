"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, XCircle, Cpu, Zap, Target, Briefcase } from "lucide-react";

const availableSkills = [
    "React", "JavaScript", "Next.js", "TypeScript", "Node.js", 
    "Tailwind CSS", "Prisma", "MongoDB", "PostgreSQL", "Docker", "AWS", "GraphQL"
];

const roles = [
    { 
        id: "fullstack", 
        name: "Full Stack Engineer", 
        required: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
        desirable: ["Prisma", "Docker", "AWS"]
    },
    { 
        id: "frontend", 
        name: "Frontend Architect", 
        required: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        desirable: ["GraphQL", "JavaScript"]
    },
    { 
        id: "devops", 
        name: "Infrastructure / DevOps", 
        required: ["Docker", "AWS", "Node.js"],
        desirable: ["TypeScript", "Next.js"]
    }
];

export default function SkillMatcher() {
    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [customSkills, setCustomSkills] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const matchStats = useMemo(() => {
        const matched = selectedRole.required.filter(s => availableSkills.includes(s)).length;
        const total = selectedRole.required.length;
        const score = Math.round((matched / total) * 100);
        
        const extraMatched = selectedRole.desirable.filter(s => availableSkills.includes(s));
        
        return { score, matched, total, extraMatched };
    }, [selectedRole]);

    const premiumEase = [0.16, 1, 0.3, 1];

    return (
        <div className="w-full max-w-5xl mx-auto p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                {/* Left side: Role Selection */}
                <div className="flex-1 space-y-8">
                    <div>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Candidate Match Engine</span>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight">Select <span className="text-blue-500 italic">Target Role</span></h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role)}
                                className={`p-6 rounded-2xl border transition-all flex items-center justify-between group ${selectedRole.id === role.id ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "bg-white/[0.03] border-white/5 hover:border-white/20"}`}
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedRole.id === role.id ? "bg-blue-600 text-white" : "bg-white/5 text-gray-500"}`}>
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className={`font-black text-sm uppercase tracking-widest ${selectedRole.id === role.id ? "text-white" : "text-gray-400"}`}>{role.name}</p>
                                        <p className="text-[10px] text-gray-500 font-medium">Auto-match optimization active.</p>
                                    </div>
                                </div>
                                <CheckCircle2 size={20} className={`transition-opacity ${selectedRole.id === role.id ? "opacity-100 text-blue-500" : "opacity-0 text-gray-800"}`} />
                            </button>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                            <input 
                                type="text"
                                placeholder="Search custom requirement..."
                                className="w-full bg-white/5 border border-white/5 rounded-xl px-12 py-4 text-xs font-medium text-white focus:border-blue-500 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right side: Results */}
                <div className="flex-1 space-y-8 lg:border-l lg:border-white/5 lg:pl-12">
                    <div className="text-center lg:text-left">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Qualification Match Analysis</p>
                        <div className="relative inline-block lg:block">
                            <h4 className="text-6xl font-black text-white tracking-tighter">
                                {matchStats.score}<span className="text-blue-500">%</span>
                            </h4>
                            <div className="h-2 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                                <m.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchStats.score}%` }}
                                    transition={{ duration: 1.5, ease: premiumEase as any }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Requirement Breakdown</p>
                        <div className="space-y-3">
                            {selectedRole.required.map((skill) => (
                                <div key={skill} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Zap size={14} className="text-blue-500" />
                                        <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                                        <CheckCircle2 size={10} /> Perfect Match
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Supplementary Value-Add</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedRole.desirable.map((skill) => (
                                <span key={skill} className="px-4 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                                    + {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                            Request Interview & Audit <Target size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
