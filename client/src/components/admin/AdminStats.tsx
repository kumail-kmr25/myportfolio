"use client";

import { useState, useEffect } from "react";
import { BarChart3, Save, RefreshCw, Loader2, Info } from "lucide-react";

export interface SiteStats {
    totalProjects: number;
    bugsFixed: number;
    caseStudiesWritten: number;
    featureRequestsCompleted: number;
    yearsLearning: number;
    deploymentCount: number;
}

export default function AdminStats({ stats, onUpdate }: { stats: SiteStats | null, onUpdate: () => void }) {
    const [formData, setFormData] = useState<SiteStats>({
        totalProjects: 0,
        bugsFixed: 0,
        caseStudiesWritten: 0,
        featureRequestsCompleted: 0,
        yearsLearning: 0,
        deploymentCount: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (stats) {
            setFormData(stats);
        }
    }, [stats]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://kumailkmr-portfolio.onrender.com"}/api/admin/stats", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) onUpdate();
        } finally {
            setLoading(false);
        }
    };

    const statFields = [
        { label: "Total Projects", key: "totalProjects", description: "Automatically aggregated from Projects table" },
        { label: "Bugs Fixed", key: "bugsFixed", description: "Manual count of bugs resolved" },
        { label: "Case Studies Written", key: "caseStudiesWritten", description: "Automatically aggregated from Case Studies" },
        { label: "Features Completed", key: "featureRequestsCompleted", description: "Automatically aggregated from Feature Requests" },
        { label: "Years Learning", key: "yearsLearning", description: "Manual count of years in the field" },
        { label: "Deployment Count", key: "deploymentCount", description: "Total production deployments" },
    ];

    return (
        <div className="max-w-4xl space-y-8">
            <div className="bg-white/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 flex justify-between items-center gap-4">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">System Performance Stats</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure the metrics shown on your public dashboard.</p>
                </div>
                <BarChart3 className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10 opacity-20 shrink-0" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {statFields.map((field) => (
                        <div key={field.key} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block ml-2">
                                {field.label}
                            </label>
                            <input
                                type="number"
                                className="input-field !bg-black/40"
                                value={(formData as any)[field.key]}
                                onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                            />
                            <p className="text-[9px] text-gray-600 flex items-center gap-1 ml-2">
                                <Info size={10} /> {field.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                            <>
                                <Save size={18} /> Update Engineering Metrics
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
                <h4 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">Note on Automation</h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                    While some stats are manually configurable (like Years Learning), others are automatically calculated by the system daily. Manual overrides will be saved until the next automated aggregation cycle.
                </p>
            </div>
        </div>
    );
}
