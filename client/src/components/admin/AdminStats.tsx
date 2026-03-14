import { useState, useEffect } from "react";
import { BarChart3, Save, RefreshCw, Loader2, Info, Target, Cpu, Zap, Activity, HardDrive } from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { m } from "framer-motion";

export interface SiteStats {
    bugsFixed: number;
    caseStudiesWritten: number;
    featureRequestsCompleted: number;
    yearsLearning: number;
    deploymentCount: number;
    auditCount: number;
    auditLeads: number;
}

export default function AdminStats({ stats, onUpdate }: { stats: SiteStats | null, onUpdate: () => void }) {
    const [formData, setFormData] = useState<SiteStats>({
        bugsFixed: 0,
        caseStudiesWritten: 0,
        featureRequestsCompleted: 0,
        yearsLearning: 0,
        deploymentCount: 0,
        auditCount: 0,
        auditLeads: 0
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
            const response = await fetch(getApiUrl(`/api/admin/stats`), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok && data.success) onUpdate();
            else console.error("Update failed:", data.error);
        } finally {
            setLoading(false);
        }
    };

    const statFields = [
        { label: "Bugs Neutralized", key: "bugsFixed", description: "Verified resolutions", icon: Zap, color: "text-red-400", vectorId: "V-01" },
        { label: "Case Engineering", key: "caseStudiesWritten", description: "Aggregated documentation", icon: HardDrive, color: "text-blue-400", vectorId: "V-02" },
        { label: "Feature Pipeline", key: "featureRequestsCompleted", description: "Architectural enhancements", icon: Cpu, color: "text-purple-400", vectorId: "V-03" },
        { label: "Engineering Tenure", key: "yearsLearning", description: "Professional experience", icon: Target, color: "text-green-400", vectorId: "V-04" },
        { label: "Production Deploys", key: "deploymentCount", description: "CI/CD executions", icon: Activity, color: "text-orange-400", vectorId: "V-05" },
        { label: "Security Audits", key: "auditCount", description: "Website evaluations", icon: BarChart3, color: "text-emerald-400", vectorId: "V-06" },
        { label: "Conversion Delta", key: "auditLeads", description: "High-intent generation", icon: RefreshCw, color: "text-indigo-400", vectorId: "V-07" },
    ];

    return (
        <div className="max-w-6xl space-y-12 animate-in fade-in duration-700">
            <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#080808] relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
                <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Performance_Vector_Controller</h2>
                    </div>
                    <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] leading-relaxed max-w-md">
                        Fine-tune global performance indicators. These values drive the trust-engine visualizations across the public interface.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5 relative z-10">
                    <div className="text-right">
                        <div className="text-[8px] font-black text-gray-800 uppercase tracking-widest leading-none mb-1">Grid_State</div>
                        <div className="text-[10px] font-mono font-black text-emerald-500 leading-none">NOMINAL_SYNC</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <BarChart3 className="text-blue-500/40 w-8 h-8 shrink-0" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statFields.map((field) => (
                        <m.div 
                            key={field.key} 
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.02] transition-all space-y-8 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 text-[7px] font-black text-gray-900 font-mono tracking-tighter uppercase pointer-events-none">
                                {field.vectorId} // READ_ACCESS
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${field.color} border border-white/5 group-hover:rotate-12 transition-transform`}>
                                    <field.icon size={18} />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block leading-none">
                                        {field.label}
                                    </label>
                                    <p className="text-[7px] text-gray-800 font-black uppercase tracking-widest">{field.description}</p>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full bg-black/60 border border-white/[0.03] rounded-xl px-6 py-5 text-3xl font-black text-white focus:outline-none focus:border-blue-500/40 transition-all font-mono tracking-tighter italic"
                                    value={(formData as any)[field.key]}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                                />
                                <div className="absolute left-0 -bottom-2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[7px] font-mono text-gray-800">OFFSET // 000</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-1 h-3 bg-gray-900 group-hover:bg-blue-500/20 rounded-full transition-colors" />
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-8 rounded-[2.5rem] bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-8 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 group/btn relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                <Save size={18} className="group-hover/btn:scale-125 transition-transform relative z-10" />
                                <span className="relative z-10">Synchronize Engineering Intelligence // V1.0</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="p-10 rounded-[3rem] bg-blue-500/[0.03] border border-blue-500/10 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Activity size={24} />
                </div>
                <div className="space-y-2">
                    <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Operational Protocol</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed font-medium uppercase tracking-tight">
                        Aggregated metrics are recalibrated daily at 00:00 UTC. Manual overrides take precedence in the current epoch but may be superseded by verified system logs during the next synchronization cycle.
                    </p>
                </div>
            </div>
        </div>
    );
}

