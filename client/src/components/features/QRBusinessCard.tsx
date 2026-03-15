"use client";

import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import { 
    Nfc, 
    Download, 
    Share2, 
    ExternalLink, 
    Mail, 
    Phone, 
    Globe, 
    Github, 
    Linkedin,
    Copy,
    Check
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kumailkmr.com";

export default function QRBusinessCard() {
    const [copied, setCopied] = useState(false);
    const [qrUrl, setQrUrl] = useState("");

    useEffect(() => {
        // Generate QR via Google Charts API (no API key needed)
        const encoded = encodeURIComponent(SITE_URL);
        setQrUrl(`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encoded}&chco=FFFFFF&chf=bg,s,000000`);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(SITE_URL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const cardLinks = [
        { label: "Portfolio", icon: Globe, href: SITE_URL },
        { label: "GitHub", icon: Github, href: "https://github.com/kumail-kmr" },
        { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/kumail-kmr" },
        { label: "Email", icon: Mail, href: "mailto:ka6307464@gmail.com" },
    ];

    return (
        <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.03] blur-[120px] rounded-full -translate-y-1/2" />
                <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-indigo-600/[0.03] blur-[120px] rounded-full -translate-y-1/2" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <Nfc size={12} /> Digital_Identity_Card_v2.0
                    </m.div>
                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase">
                        SCAN TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">CONNECT.</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-500 text-lg font-medium leading-relaxed italic">
                        One scan. Instant access to my portfolio, social proof, and direct contact channels.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Card Front */}
                    <m.div
                        initial={{ opacity: 0, rotateY: -20 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                        style={{ perspective: "1200px" }}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />

                        <div className="relative p-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d14] to-[#0a0a0a] overflow-hidden shadow-2xl">
                            {/* Card Shine */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {/* Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-2xl shadow-xl">
                                        K
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white italic tracking-tight">Kumail KMR</h3>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Full-Stack Engineer</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>

                            {/* QR Code */}
                            <div className="flex justify-center mb-10">
                                <div className="p-4 rounded-2xl bg-black border border-white/10">
                                    {qrUrl ? (
                                        <img
                                            src={qrUrl}
                                            alt="QR Code for Kumail KMR Portfolio"
                                            width={160}
                                            height={160}
                                            className="rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-40 h-40 bg-white/5 rounded-xl animate-pulse" />
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail size={14} className="text-blue-500 flex-shrink-0" />
                                    <span className="text-xs font-bold">ka6307464@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Globe size={14} className="text-blue-500 flex-shrink-0" />
                                    <span className="text-xs font-bold">{SITE_URL.replace("https://", "")}</span>
                                </div>
                            </div>

                            {/* URL Copy */}
                            <button
                                onClick={handleCopy}
                                className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all group"
                            >
                                {copied ? (
                                    <><Check size={14} className="text-emerald-500" /> Copied to Clipboard</>
                                ) : (
                                    <><Copy size={14} /> Copy Portfolio URL</>
                                )}
                            </button>
                        </div>
                    </m.div>

                    {/* Links & Actions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Quick_Links</p>
                            {cardLinks.map((link, i) => (
                                <m.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] hover:border-blue-500/20 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <link.icon size={18} />
                                        </div>
                                        <span className="text-sm font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">{link.label}</span>
                                    </div>
                                    <ExternalLink size={14} className="text-gray-700 group-hover:text-blue-400 transition-colors" />
                                </m.a>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="btn-primary py-5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                <Download size={16} /> Save Card
                            </button>
                            <button
                                onClick={() => navigator.share?.({ title: "Kumail KMR", url: SITE_URL }).catch(() => {})}
                                className="py-5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={16} /> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
