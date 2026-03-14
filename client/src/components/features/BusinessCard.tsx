"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { User, Briefcase, Mail, Phone, Globe, Linkedin, Download, Share2 } from 'lucide-react';

export const BusinessCard: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const profile = {
        name: "Kumail Kumar",
        title: "Full-Stack Developer",
        email: "ka6307464@gmail.com",
        phone: "+91 1234567890",
        website: "https://kumailkmr.vercel.app",
        linkedin: "https://linkedin.com/in/kumail-kmr25"
    };

    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.website}
END:VCARD`;

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Digital <span className="text-blue-500">vCard</span></h2>
                <p className="text-gray-500">Scan to save my professional contact details instantly.</p>
            </div>

            <div 
                className="relative w-full max-w-md aspect-[1.75/1] cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d transition-all duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16" />
                        
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight">{profile.name}</h3>
                                <p className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">{profile.title}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                <User size={24} className="text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <Mail size={14} className="text-blue-500/50" />
                                {profile.email}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <Globe size={14} className="text-blue-500/50" />
                                {profile.website.replace('https://', '')}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4 text-[10px] text-gray-600 font-black uppercase tracking-widest relative z-10">
                            <span>Available for Hire</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Remote / On-site
                            </div>
                        </div>
                    </div>

                    {/* Back Side (QR Code) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl p-8 flex flex-col items-center justify-center rotate-y-180 shadow-2xl">
                        <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                            <QRCodeSVG value={vCardData} size={160} level="H" />
                        </div>
                        <p className="text-black text-[10px] font-black uppercase tracking-widest">Connect with me</p>
                    </div>
                </motion.div>
            </div>

            <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-bold transition-all flex items-center gap-2">
                    <Download size={16} /> Download VCF
                </button>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white text-sm font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                    <Share2 size={16} /> Share Card
                </button>
            </div>
            
            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </section>
    );
};

export default BusinessCard;
