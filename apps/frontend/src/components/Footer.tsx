"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, ArrowUp, ShieldCheck } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#050505] border-t border-white/10 py-12 relative">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-2xl font-bold font-display text-white mb-2">Kumail Kmr</p>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Kumail Kmr. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex space-x-6">
                        <Link href="https://github.com/kumail-kmr25" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform" aria-label="Visit my GitHub profile">
                            <Github size={24} />
                        </Link>
                        <Link href="https://x.com/KumailKmr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform" aria-label="Visit my Twitter profile">
                            <Twitter size={24} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/kumale-ali-bhat-6196a0384/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform" aria-label="Visit my LinkedIn profile">
                            <Linkedin size={24} />
                        </Link>
                        <Link href="https://www.instagram.com/kumail.kmr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform" aria-label="Visit my Instagram profile">
                            <Instagram size={24} />
                        </Link>
                    </div>

                    {/* Admin Dashboard Link */}
                    <Link
                        href="/admin"
                        className="flex items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors text-xs"
                        title="Admin Dashboard"
                    >
                        <ShieldCheck size={14} />
                        <span className="hidden md:inline">Admin</span>
                    </Link>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute bottom-8 right-6 md:right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all hover:scale-110 group"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" />
            </button>
        </footer>
    );
}
