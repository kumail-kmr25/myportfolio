import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Footer() {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <motion.div
                className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="text-center md:text-left">
                    <motion.p
                        variants={itemVariants}
                        className="text-2xl font-bold tracking-tight text-white mb-2"
                    >
                        Kumail <span className="text-gray-500 italic">Kmr</span>
                    </motion.p>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-500 text-xs font-black uppercase tracking-widest"
                    >
                        © {new Date().getFullYear()} All Engineering Rights Reserved.
                    </motion.p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6">
                    <div className="flex items-center gap-6">
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
                                    className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all flex items-center justify-center group"
                                    aria-label={`Visit my ${social.label} profile`}
                                >
                                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Admin Dashboard Link */}
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-blue-500 transition-colors py-2 px-4 rounded-full border border-transparent hover:border-blue-500/20 hover:bg-blue-500/5 group"
                            title="Admin Dashboard"
                        >
                            <ShieldCheck size={12} className="group-hover:animate-pulse" />
                            <span>System Admin</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
}
