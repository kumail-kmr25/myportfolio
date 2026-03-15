"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Download, Layout, LayoutGrid, LayoutList, PenTool, ExternalLink } from 'lucide-react';

export const SignatureGen: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [template, setTemplate] = useState<'modern' | 'minimal' | 'corporate'>('modern');
    
    const profile = {
        name: "Kumale Ali Bhat",
        title: "Full-Stack Developer",
        email: "ka6307464@gmail.com",
        phone: "+91 1234567890",
        website: "kumailkmr.vercel.app"
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 text-purple-500 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 text-xs font-bold uppercase tracking-widest w-fit mb-6">
                            <PenTool size={16} />
                            Professional Utility
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Email <span className="text-purple-500">Signature</span> Gen</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Generate professional, brand-aligned email signatures for your team or personal correspondence. Optimized for all major email clients.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['modern', 'minimal', 'corporate'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTemplate(t as any)}
                                className={`p-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${
                                    template === t 
                                    ? 'bg-purple-600/20 border-purple-500 text-purple-400' 
                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleCopy}
                            className="flex-1 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? 'Copied HTML' : 'Copy Signature'}
                        </button>
                        <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-purple-600/10 blur-[100px] rounded-full" />
                    
                    <div className="relative bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
                        <div className="bg-white rounded-2xl p-8 text-black min-h-[160px] flex items-center shadow-lg">
                            {template === 'modern' && (
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
                                        KK
                                    </div>
                                    <div className="h-16 w-px bg-gray-200" />
                                    <div className="space-y-1">
                                        <div className="text-xl font-black tracking-tight">{profile.name}</div>
                                        <div className="text-purple-600 font-bold text-xs uppercase tracking-widest">{profile.title}</div>
                                        <div className="text-[11px] text-gray-500 font-medium pt-2 flex gap-3">
                                            <span>{profile.email}</span>
                                            <span>|</span>
                                            <span>{profile.website}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {template === 'minimal' && (
                                <div className="space-y-1">
                                    <div className="text-lg font-bold">{profile.name}</div>
                                    <div className="text-gray-500 text-sm">{profile.title}</div>
                                    <div className="pt-2 text-xs text-purple-600 font-bold">{profile.website}</div>
                                </div>
                            )}

                            {template === 'corporate' && (
                                <div className="w-full">
                                    <div className="text-lg font-black uppercase text-purple-800 border-b-2 border-purple-800 mb-2">{profile.name}</div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-[12px] font-bold text-gray-700">{profile.title}</div>
                                        <div className="text-[10px] text-gray-500 flex flex-col items-end">
                                            <span>M: {profile.phone}</span>
                                            <span>E: {profile.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-between items-center px-4">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                            </div>
                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Live Preview</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignatureGen;
