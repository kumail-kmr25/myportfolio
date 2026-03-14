"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { CreditCard, ExternalLink, IndianRupee, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Payment {
    id: string;
    title: string;
    description: string;
    amount: number;
    currency: string;
    status: string;
}

export const PaymentLinks: React.FC = () => {
    const { data, error } = useSWR('/api/payments', fetcher);
    const payments: Payment[] = data?.links || [];

    if (error || !payments.length) return null;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Secure <span className="text-blue-500">Checkout</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl px-1">
                        Direct-to-client payment architecture for seamless deposits, milestone payments, and ongoing maintenance.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck size={16} />
                    PCI Compliant
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {payments.map((pay, idx) => (
                    <motion.div
                        key={pay.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-[#050505] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-600/10 transition-colors">
                                <CreditCard size={24} className="text-gray-400 group-hover:text-blue-500" />
                            </div>
                            <div className="text-2xl font-black text-white flex items-center">
                                <span className="text-sm font-medium text-gray-500 mr-1">{pay.currency}</span>
                                {(pay.amount / 100).toLocaleString()}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{pay.title}</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">
                            {pay.description}
                        </p>

                        <button className="w-full py-4 bg-white/5 group-hover:bg-blue-600 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            Proceed to Pay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-1"><Zap size={10} /> Instant</div>
                            <div className="flex items-center gap-1"><ShieldCheck size={10} /> Secure</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PaymentLinks;
