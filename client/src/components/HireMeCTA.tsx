import { motion, Variants } from "framer-motion";
import { Bug, Code2, Layout, Database, Zap, Cloud, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";

const services = [
    { label: "Fix Bugs", icon: Bug, color: "text-red-500", bg: "bg-red-500/10", service: "Bug Fix / Error Optimisation" },
    { label: "Full Stack Dev", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10", service: "Full Stack Development" },
    { label: "UI/UX Design", icon: Layout, color: "text-purple-500", bg: "bg-purple-500/10", service: "UI/UX Design" },
    { label: "DB Design", icon: Database, color: "text-green-500", bg: "bg-green-500/10", service: "Database Design" },
    { label: "Performance", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", service: "Performance Tuning" },
    { label: "Cloud Deploy", icon: Cloud, color: "text-orange-500", bg: "bg-orange-500/10", service: "DevOps / Cloud" },
];

export default function HireMeCTA() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Technical Grid Accent */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-grid)" />
                </svg>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="section-container relative z-10"
            >
                <div className="max-w-5xl mx-auto p-12 md:p-20 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-center shadow-2xl relative overflow-hidden group/cta">
                    {/* Inner pulsing glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover/cta:scale-150 transition-transform duration-1000" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full group-hover/cta:scale-150 transition-transform duration-1000 delay-150" />

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight relative z-10">
                        Ready to Build Something <span className="text-blue-500 italic drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Legendary?</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 mb-16 text-xl max-w-2xl mx-auto leading-relaxed">
                        Whether you need a full-scale application or a critical performance boost, I&apos;m here to deliver high-performance engineering.
                    </motion.p>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                        {services.map((item) => (
                            <Link
                                key={item.label}
                                href={`#contact?service=${encodeURIComponent(item.service)}`}
                                className="group flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] hover:bg-blue-500/[0.02]"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`}>
                                    <item.icon size={28} />
                                </div>
                                <span className="text-[10px] font-black text-gray-500 group-hover:text-blue-400 transition-colors uppercase tracking-[0.2em] text-center">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link
                            href="#contact"
                            className="group relative px-12 py-6 bg-blue-600 rounded-[2rem] font-black text-white text-lg uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-4 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10">Start Your Project</span>
                            <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <LiveStatusBadge variant="hero" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
