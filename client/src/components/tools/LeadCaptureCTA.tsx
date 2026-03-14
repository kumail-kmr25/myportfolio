"use client";

import { m } from "framer-motion";
import { Mail, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LeadCaptureCTA() {
    const calendlyLink = process.env.NEXT_PUBLIC_CALENDLY_LINK || "#";

    return (
        <section className="py-20 border-t border-white/5">
            <div className="glass-effect p-12 rounded-[3.5rem] border border-blue-500/20 bg-blue-500/[0.02] text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Want Me to Fix These Issues?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto font-medium">
                        I help businesses improve their website performance, speed, and conversions. 
                        Let&apos;s turn your website into a high-performance machine.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <a 
                        href={calendlyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full sm:w-auto px-10 py-5 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20"
                    >
                        <Calendar size={16} />
                        Book a Free Consultation
                        <ArrowRight size={16} />
                    </a>
                    <Link 
                        href="/#contact"
                        className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                    >
                        <Mail size={16} />
                        Get a Custom Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}
