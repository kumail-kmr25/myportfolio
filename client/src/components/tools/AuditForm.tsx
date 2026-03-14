"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Globe, AlertTriangle, Sparkles } from "lucide-react";

interface AuditFormProps {
    onSuccess: (data: any) => void;
    onError: (error: string) => void;
    onStart: () => void;
}

export default function AuditForm({ onSuccess, onError, onStart }: AuditFormProps) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statusIdx, setStatusIdx] = useState(0);

    const statusMessages = [
        "Initiating Secure Connection...",
        "Scraping SEO Architecture...",
        "Analyzing Mobile Framework...",
        "Measuring Core Web Vitals...",
        "Evaluating Performance Core...",
        "Finalizing Growth Insights..."
    ];

    useEffect(() => {
        let interval: any;
        if (loading) {
            interval = setInterval(() => {
                setStatusIdx((prev) => (prev + 1) % statusMessages.length);
            }, 2500);
        } else {
            setStatusIdx(0);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        
        setLoading(true);
        setError(null);
        onStart();

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (data.success) {
                onSuccess(data.data);
            } else {
                const errMsg = data.error || "Failed to analyze the website.";
                setError(errMsg);
                onError(errMsg);
            }
        } catch (err) {
            const errMsg = "Analysis failed. Please check the URL and try again.";
            setError(errMsg);
            onError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <m.form 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="relative max-w-2xl mx-auto"
        >
            <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                <div className="relative flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                        <input
                            type="text"
                            placeholder="yourwebsite.com"
                            className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[1.5rem] pl-14 pr-6 py-6 text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-base"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-12 py-6 rounded-[1.5rem] bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/30 shrink-0"
                    >
                        {loading ? (
                            <m.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={statusIdx}
                                className="flex items-center gap-4"
                            >
                                <Loader2 size={18} className="animate-spin text-blue-400" />
                                <span className="text-[10px] font-black tracking-widest">{statusMessages[statusIdx]}</span>
                            </m.div>
                        ) : (
                            <>
                                Initiate Scan
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
            
            <AnimatePresence>
                {error && (
                    <m.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-6"
                    >
                        <p className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest">
                            <AlertTriangle size={14} />
                            {error}
                        </p>
                    </m.div>
                )}
            </AnimatePresence>
        </m.form>
    );
}
