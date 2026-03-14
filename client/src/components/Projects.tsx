"use client";

import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { m, AnimatePresence } from "framer-motion";
import { 
    Layers, 
    Loader2, 
    Sparkles, 
    Code2, 
    Rocket, 
    LayoutGrid, 
    Cpu, 
    ArrowRight,
    Utensils,
    Hotel,
    Clapperboard,
    Zap,
    BarChart3,
    ShoppingCart,
    Wrench,
    MapPin,
    Globe
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import SectionReveal from "./SectionReveal";
import { useHireModal } from "@/context/HireModalContext";
import { getApiUrl } from "@/lib/api";
import { highConversionProjects } from "@/lib/projects-data";
import VideoWalkthrough from "./features/VideoWalkthrough";
import LiveSitePreview from "./features/LiveSitePreview";

const fetcher = async (url: string) => {
    try {
        const res = await fetch(getApiUrl(url));
        const json = await res.json();
        return json.success ? json.data : json;
    } catch (error) {
        console.error("[PROJECTS_FETCH_ERROR]", error);
        return null;
    }
};

const industries = [
    { id: "all", label: "Global Scope", icon: Globe },
    { id: "Restaurant", label: "Restaurants", icon: Utensils },
    { id: "Hotel", label: "Hotels", icon: Hotel },
    { id: "Agency", label: "Agencies", icon: Clapperboard },
    { id: "Startup", label: "Startups", icon: Zap },
    { id: "SaaS", label: "SaaS/B2B", icon: BarChart3 },
    { id: "E-commerce", label: "E-Commerce", icon: ShoppingCart },
    { id: "Local Service", label: "Servicing", icon: Wrench },
    { id: "Real Estate", label: "Real Estate", icon: MapPin },
];

export default function Projects() {
    const { data, isLoading } = useSWR("/api/projects", fetcher);
    const [selectedIndustry, setSelectedIndustry] = useState("all");
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const { openModal } = useHireModal();

    const projectsData = data?.projects || (Array.isArray(data) ? data : null);
    
    // Merge real data with our high-conversion drafts
    const allProjects = useMemo(() => {
        const merged = [...(projectsData || [])];
        // Add draft projects if they don't exist by ID
        highConversionProjects.forEach(draft => {
            if (!merged.find(p => p.id === draft.id || p.title === draft.title)) {
                merged.push(draft);
            }
        });
        return merged.filter(p => p.isVisible !== false);
    }, [projectsData]);

    const filteredProjects = useMemo(() => {
        if (selectedIndustry === "all") return allProjects;
        return allProjects.filter(p => p.category === selectedIndustry);
    }, [allProjects, selectedIndustry]);

    const heroProject = useMemo(() => {
        return filteredProjects.find(p => p.isFeatured) || filteredProjects[0];
    }, [filteredProjects]);

    const secondaryProjects = useMemo(() => {
        return filteredProjects.filter(p => p.id !== heroProject?.id);
    }, [filteredProjects, heroProject]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="projects" className="py-24 lg:py-32 bg-[#020202] relative overflow-hidden">
            {/* Background Architecture Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/10 via-white/5 to-transparent" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
            
            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
                        <m.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6"
                        >
                            <Sparkles size={12} className="animate-pulse" /> Result-Driven Architecture
                        </m.div>
                        
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
                            The <span className="text-blue-500 italic">Portfolio</span>
                        </h2>
                        
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-medium italic">
                            &quot;I don&apos;t build features. I build business outcomes.&quot;
                        </p>
                    </div>
                </SectionReveal>

                {/* Industry Filter Controls */}
                <div className="flex flex-wrap justify-center gap-2 mb-20 lg:mb-24">
                    {industries.map((ind) => (
                        <button
                            key={ind.id}
                            onClick={() => setSelectedIndustry(ind.id)}
                            className={`group flex items-center gap-2.5 px-6 py-3 rounded-2xl border transition-all duration-300 font-black text-[10px] uppercase tracking-widest ${
                                selectedIndustry === ind.id 
                                ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)]" 
                                : "bg-white/5 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white"
                            }`}
                        >
                            <ind.icon size={14} className={selectedIndustry === ind.id ? "text-white" : "text-blue-500/50 group-hover:text-blue-400"} />
                            {ind.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <m.div
                        key={selectedIndustry}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-20 lg:space-y-32"
                    >
                        {/* 1. Hero Project (Large Impact) */}
                        {heroProject && (
                            <div className="relative">
                                <ProjectCard 
                                    project={heroProject} 
                                    isHero={true}
                                    onViewCaseStudy={setSelectedProject}
                                />
                            </div>
                        )}

                        {/* 2. Systems Efficiency Panel (Social Proof) */}
                        <m.div 
                            variants={containerVariants}
                            className="p-8 lg:p-12 rounded-[3rem] bg-gradient-to-br from-[#050505] to-[#080808] border border-white/10 shadow-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                <Cpu size={200} className="text-blue-500" />
                            </div>
                            
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="max-w-md text-center lg:text-left">
                                    <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Global Performance Metrics</span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                                        Performance is <span className="italic text-blue-500">Conversion.</span>
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Across every industry, speed remains the #1 indicator of revenue. All systems are engineered for sub-second delivery.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full lg:w-auto">
                                    {[
                                        { label: "AOV Growth", value: "+22%", sub: "Avg. across E-comm" },
                                        { label: "Load Time", value: "320ms", sub: "Global Average" },
                                        { label: "LCP Score", value: "98/100", sub: "Lighthouse Standard" },
                                        { label: "Lead Gen", value: "10x", sub: "Real Estate Focus" },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center lg:items-start space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                                            <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-500/70">{stat.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                        {/* 3. Secondary Projects Grid */}
                        {secondaryProjects.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {secondaryProjects.map((project) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        onViewCaseStudy={setSelectedProject}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Feature: Video Walkthroughs */}
                        <div className="mt-32">
                            <VideoWalkthrough />
                        </div>

                        {/* Feature: Live Site Previews */}
                        <div className="mt-32">
                            <LiveSitePreview initialPreviews={[]} />
                        </div>
                    </m.div>
                </AnimatePresence>

                {/* Call To Action Section */}
                <SectionReveal>
                    <div className="mt-32 p-12 lg:p-20 rounded-[4rem] bg-gradient-to-br from-blue-600/10 via-blue-900/5 to-transparent border border-blue-500/20 text-center relative overflow-hidden group">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                                <Rocket size={40} />
                            </div>
                            
                            <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-none">
                                Your project is <span className="text-blue-500 italic block mt-2">next.</span>
                            </h3>
                            
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                                Don&apos;t settle for a generic template. Get a high-fidelity system designed for your industry and conversion goals.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <button 
                                    onClick={() => openModal()}
                                    className="px-12 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                >
                                    Start Project
                                </button>
                                <button 
                                    onClick={() => openModal()}
                                    className="px-12 py-5 bg-white/5 text-white border border-white/10 font-black text-xs uppercase tracking-[0.2em] rounded-3xl hover:bg-white/10 transition-all hover:border-blue-500/30 flex items-center gap-3"
                                >
                                    View Process <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </SectionReveal>
            </div>

            <ProjectCaseStudyModal 
                isOpen={!!selectedProject} 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
}
