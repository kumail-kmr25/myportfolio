"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Certification {
    id: string;
    name: string;
    issuer: string;
    issuerLogoUrl?: string;
    issueDate: string;
    verifyUrl?: string;
    skills: string[];
}

export const Certifications: React.FC = () => {
    const { data, error } = useSWR('/api/certifications', fetcher);
    const certifications: Certification[] = data?.certifications || [];

    if (error) return null;
    if (!certifications.length) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Professional <span className="text-blue-500">Credentials</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl">
                        Verified industry certifications and academic achievements that validate my technical expertise and commitment to continuous learning.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                    <CheckCircle2 size={16} />
                    <span>Verified Registry</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative bg-[#050505] border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-500" />
                        
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                                <Award size={24} />
                            </div>
                            {cert.verifyUrl && (
                                <a 
                                    href={cert.verifyUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {cert.name}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium mb-4">
                            {cert.issuer}
                        </p>

                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-6">
                            <Calendar size={14} />
                            <span>{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {(cert.skills || []).slice(0, 3).map(skill => (
                                <span 
                                    key={skill}
                                    className="px-2 py-1 bg-white/5 rounded-md text-[10px] uppercase tracking-wider text-gray-300 font-semibold border border-white/5"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
