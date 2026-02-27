import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Footer() {
    const premiumEase = [0.16, 1, 0.3, 1];

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: premiumEase as any,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: premiumEase as any }
        }
    };

    return (
        <footer className="bg-[#020202] border-t border-white/[0.05] py-20 relative overflow-hidden">
            {/* Technical Data Pulse Accent */}
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <motion.div
                    animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-16 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="text-center md:text-left">
                    <motion.p
                        variants={itemVariants}
                        className="text-3xl font-black tracking-tighter text-white mb-4"
                    >
                        KUMAIL <span className="text-blue-500 italic">KMR</span>
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col gap-2"
                    >
                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} Technical Engineering Unit
                        </p>
                        <p className="text-gray-800 text-[9px] font-black uppercase tracking-[0.2em]">
                            Built for peak performance & horizontal scalability
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-10">
                    <div className="flex items-center gap-4">
                        {[
                            { href: "https://github.com/kumail-kmr25", icon: Github, label: "GitHub" },
                            { href: "https://x.com/KumailKmr", icon: Twitter, label: "Twitter" },
                            { href: "https://www.linkedin.com/in/kumale-ali-bhat-6196a0384/", icon: Linkedin, label: "LinkedIn" },
                            { href: "https://www.instagram.com/kumail.kmr", icon: Instagram, label: "Instagram" }
                        ].map((social) => (
                            <motion.div key={social.label} variants={itemVariants}>
                                <Link
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-center group relative overflow-hidden backdrop-blur-2xl"
                                    aria-label={`Visit my ${social.label} profile`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <social.icon size={20} className="relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Admin Dashboard Link */}
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-blue-500 transition-all py-3 px-6 rounded-2xl border border-white/[0.03] hover:border-blue-500/20 hover:bg-blue-500/5 group backdrop-blur-3xl"
                            title="Admin Dashboard"
                        >
                            <ShieldCheck size={14} className="group-hover:rotate-12 transition-transform" />
                            <span>System Admin</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
}
