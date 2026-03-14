"use client";

import { m, Variants } from "framer-motion";
import { Zap, Rocket, Wrench, MessageSquare, ShieldCheck } from "lucide-react";

const differentiators = [
    {
        icon: Zap,
        title: "Fast Delivery",
        desc: "Most projects delivered in 1–2 weeks without sacrificing quality",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10"
    },
    {
        icon: Rocket,
        title: "Performance-First",
        desc: "Every site I build scores 90+ on Google PageSpeed Insights",
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        icon: Wrench,
        title: "Full-Stack + DevOps",
        desc: "I don't just build it — I deploy, monitor and maintain it",
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        icon: MessageSquare,
        title: "Direct Communication",
        desc: "No middlemen. You work directly with me, the developer",
        color: "text-green-400",
        bg: "bg-green-400/10"
    },
    {
        icon: ShieldCheck,
        title: "30-Day Free Support",
        desc: "Free bug fixes and updates for 30 days after every launch",
        color: "text-red-400",
        bg: "bg-red-400/10"
    }
];

export default function WhyWorkWithMe() {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="why-work-with-me" className="py-24 lg:py-16 bg-[#020202] relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 block"
                    >
                        Success Partnership
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                    >
                        Why Work <span className="text-gray-500 italic">With Me</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl text-lg"
                    >
                        I focus on delivering high-impact technical solutions that solve real business problems, not just writing code.
                    </m.p>
                </div>

                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {differentiators.map((item, index) => (
                        <m.div
                            key={item.title}
                            variants={itemVariants}
                            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.04)" }}
                            className={`p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group flex flex-col items-start text-left backdrop-blur-sm ${index === 3 || index === 4 ? 'lg:col-span-1.5' : ''}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                <item.icon size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                {item.desc}
                            </p>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    );
}
