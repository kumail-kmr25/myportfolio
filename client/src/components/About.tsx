import Image from "next/image";
import { m, Variants } from "framer-motion";
import VoiceIntro from "./features/VoiceIntro";
import RevenueDashboard from "./features/RevenueDashboard";
import Certifications from "./features/Certifications";
import DevLog from "./features/DevLog";
import TechRadar from "./features/TechRadar";
import CodeSnippets from "./features/CodeSnippets";
import FitScore from "./features/FitScore";
import ProposalGen from "./features/ProposalGen";
import PaymentLinks from "./features/PaymentLinks";
import MilestoneTracker from "./features/MilestoneTracker";
import BusinessCard from "./features/BusinessCard";
import ABTesting from "./features/ABTesting";
import SignatureGen from "./features/SignatureGen";
import ArticleList from "./features/ArticleList";
import AchievementGallery from "./features/AchievementGallery";

export default function About() {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section id="about" className="py-24 lg:py-16 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />

            <m.div
                className="section-container relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Premium Profile Visual */}
                    <m.div
                        variants={itemVariants}
                        className="flex justify-center lg:justify-start order-2 lg:order-1"
                    >
                        <div className="relative group">
                            {/* Decorative Outer Ring */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />

                            {/* The Circle Photo */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/10 p-2 bg-[#0a0a0a] ring-1 ring-white/5 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image
                                        src="https://github.com/kumail-kmr25.png"
                                        alt="Kumail Kmr"
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Professional Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-2xl transform rotate-3 ring-4 ring-[#050505]">
                                    Technical Lead
                                </div>
                            </div>
                        </div>
                    </m.div>

                    {/* Right: Technical Narrative */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <m.span
                                variants={itemVariants}
                                className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-2 block"
                            >
                                Get to know me
                            </m.span>
                            <m.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                            >
                                Specialized in <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">High-Performance Engineering</span>
                            </m.h2>
                        </div>

                        <m.div
                            variants={itemVariants}
                            className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl"
                        >
                            <p>
                                I&apos;m Kumail, a Full-Stack Engineer specializing in high-performance digital solutions that drive business growth. 
                                I bridge the gap between complex technical requirements and commercial results, ensuring your platform isn&apos;t just code—it&apos;s a revenue-generating asset.
                            </p>
                            <p>
                                With a focus on Next.js, Cloud Architecture, and DevOps, I build systems that are fast, secure, and ready to scale. No jargon, no fluff—just engineering excellence delivered on time.
                            </p>
                        </m.div>

                        <m.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 pt-4"
                        >
                            {[
                                { label: "Fast Delivery", value: "1-2 Weeks" },
                                { label: "Performance", value: "90+ Score" },
                                { label: "Support", value: "30 Days Free" },
                                { label: "Direct Access", value: "No Middlemen" }
                            ].map((stat) => (
                                <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center hover:bg-white/[0.04] transition-colors">
                                    <div className="text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{stat.label}</div>
                                </div>
                            ))}
                        </m.div>

                        <m.div variants={itemVariants}>
                            <VoiceIntro />
                        </m.div>

                        {/* Dedicated CTA Buttons */}
                        <m.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 pt-8"
                        >
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-blue-500/20"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-lg">View My Work</span>
                                <div className="relative z-10 p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                            <a
                                href="#"
                                className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white transition-all duration-300 hover:bg-white/10 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10 text-lg">Download CV</span>
                                <div className="relative z-10 p-1 bg-white/10 rounded-lg group-hover:translate-y-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                            </a>
                        </m.div>
                    </div>
                </div>

                <div className="mt-32">
                    <RevenueDashboard />
                </div>

                <div className="mt-32">
                    <Certifications />
                </div>

                <div className="mt-32">
                    <AchievementGallery />
                </div>

                <div className="mt-32">
                    <TechRadar />
                </div>

                <div className="mt-32">
                    <ABTesting />
                </div>

                <div className="mt-32">
                    <CodeSnippets />
                </div>

                <div className="mt-32">
                    <DevLog />
                </div>

                <div className="mt-32">
                    <ArticleList />
                </div>

                <div className="mt-32">
                    <MilestoneTracker />
                </div>

                <div className="mt-48 lg:mt-64 space-y-32">
                    <ProposalGen />
                    <PaymentLinks />
                    <SignatureGen />
                </div>

                <div className="mt-32 lg:mt-48">
                    <FitScore />
                </div>

                <div className="mt-32 lg:mt-48">
                    <BusinessCard />
                </div>
            </m.div>
        </section>
    );
}
