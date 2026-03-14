"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Terminal, GitCommit, Zap, BookOpen, Clock } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface LogEntry {
    id: string;
    weekStartDate: string;
    completed: string[];
    inProgress: string[];
    learning: string[];
    hoursWorked?: number;
    commitsCount?: number;
}

export const DevLog: React.FC = () => {
    const { data, error } = useSWR('/api/devlog', fetcher);
    const logs: LogEntry[] = data?.logs || [];

    if (error) return null;
    if (!logs.length) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Development Log
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Weekly <span className="text-blue-500">Shipment Logs</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    A transparent look into my weekly engineering activity, focusing on shipped features, ongoing research, and core system optimizations.
                </p>
            </div>

            <div className="space-y-8">
                {logs.map((log, index) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative bg-[#050505] border border-white/5 rounded-3xl overflow-hidden p-8"
                    >
                        {/* Header Stats */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
                                    <Terminal size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">
                                        Week of {new Date(log.weekStartDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </h3>
                                    <p className="text-gray-500 text-sm">Sprint Update</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 md:gap-8">
                                {log.hoursWorked && (
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-blue-500" />
                                        <div className="text-sm font-semibold text-white">{log.hoursWorked}h <span className="text-gray-500 font-normal">Worked</span></div>
                                    </div>
                                )}
                                {log.commitsCount && (
                                    <div className="flex items-center gap-3">
                                        <GitCommit size={16} className="text-emerald-500" />
                                        <div className="text-sm font-semibold text-white">{log.commitsCount} <span className="text-gray-500 font-normal">Commits</span></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Shipped */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                                    <Zap size={14} />
                                    Shipped
                                </div>
                                <ul className="space-y-3">
                                    {log.completed.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                                            <span className="text-emerald-500 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* In Progress */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    Active Work
                                </div>
                                <ul className="space-y-3">
                                    {log.inProgress.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                                            <span className="text-blue-500 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Learning/R&D */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-purple-500 font-bold text-xs uppercase tracking-widest">
                                    <BookOpen size={14} />
                                    R&D / Learning
                                </div>
                                <ul className="space-y-3">
                                    {log.learning.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                                            <span className="text-purple-500 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DevLog;
