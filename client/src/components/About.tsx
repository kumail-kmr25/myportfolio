import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
        <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />

            <motion.div
                className="section-container relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Premium Profile Visual */}
                    <motion.div
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
                    </motion.div>

                    {/* Right: Technical Narrative */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <motion.span
                                variants={itemVariants}
                                className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-2 block"
                            >
                                My Journey
                            </motion.span>
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                            >
                                From 10th Class to <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Web Engineering Excellence</span>
                            </motion.h2>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl"
                        >
                            <p>
                                My journey in the tech world began in <span className="text-blue-400 font-semibold">2023</span>, right after I passed my <span className="text-white font-medium">class 10th exams</span>.
                                What started as a curiosity quickly evolved into a deep passion for building software that solves real-world problems.
                            </p>
                            <p>
                                I specialize in transforming complex business requirements into high-performance SaaS architectures.
                                With a focus on <span className="text-white font-medium">Full-Stack Scalability</span> and <span className="text-white font-medium">Clean Design Systems</span>,
                                I lead technical projects from inception to production-hardened deployments.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white">3+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Years Learning</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white">SaaS</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Specialty</div>
                            </div>
                        </motion.div>

                        {/* Dedicated CTA Button */}
                        <motion.div
                            variants={itemVariants}
                            className="pt-8"
                        >
                            <button
                                onClick={() => document.getElementById('my-journey')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-3 overflow-hidden shadow-2xl shadow-blue-500/20"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-lg">👉 View My Journey</span>
                                <div className="relative z-10 p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
