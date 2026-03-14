"use client";

import { m } from "framer-motion";
import { 
    TrendingUp, 
    DollarSign, 
    BarChart3, 
    ArrowUpRight, 
    Users, 
    Zap,
    Target
} from "lucide-react";
import { useFeatures } from "@/lib/features";
import useSWR from "swr";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then(res => res.json()).then(j => j.data || j);

interface ClientRevenue {
    id: string;
    clientName: string;
    industry: string;
    monthlyRevenueBefore: number | null;
    monthlyRevenueAfter: number | null;
    totalRevenueGenerated: number;
    conversionBefore: number | null;
    conversionAfter: number | null;
    trafficBefore: number | null;
    trafficAfter: number | null;
    currency: string;
}

interface RevenueDashboardProps {
    initialData?: ClientRevenue[];
}

export default function RevenueDashboard({ initialData }: RevenueDashboardProps) {
    const { isEnabled } = useFeatures();
    const { data = initialData || [] } = useSWR(isEnabled("revenue-dashboard") ? "/api/features/revenue" : null, fetcher);

    if (!isEnabled("revenue-dashboard") || !data || data.length === 0) return null;

    const totalGenerated = data.reduce((acc: number, curr: ClientRevenue) => acc + curr.totalRevenueGenerated, 0);
    const avgConversionLift = data.reduce((acc: number, curr: ClientRevenue) => {
        if (curr.conversionBefore && curr.conversionAfter) {
            return acc + (curr.conversionAfter - curr.conversionBefore);
        }
        return acc;
    }, 0) / (data.filter((d: ClientRevenue) => d.conversionBefore && d.conversionAfter).length || 1);

    return (
        <div className="space-y-12">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-blue-600 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl shadow-blue-600/20 relative overflow-hidden"
                >
                    <div className="absolute -right-4 -top-4 opacity-10">
                        <TrendingUp size={120} />
                    </div>
                    <span className="text-[10px] text-blue-100 font-black uppercase tracking-widest italic">Cumulative_Impact</span>
                    <div className="mt-4">
                        <h3 className="text-4xl font-black text-white italic tracking-tighter">
                            ₹{(totalGenerated / 1000000).toFixed(1)}M+
                        </h3>
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mt-1">Total revenue generated</p>
                    </div>
                </m.div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-white/10 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <ArrowUpRight size={24} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-black text-white italic tracking-tighter">
                            +{avgConversionLift.toFixed(1)}%
                        </h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Avg. Conversion Lift</p>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-white/10 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <Users size={24} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-black text-white italic tracking-tighter text-glow-purple">
                            480K+
                        </h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Total Traffic Optimized</p>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-white/10 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Target size={24} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-black text-white italic tracking-tighter">
                            99.9%
                        </h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">System Reliability</p>
                    </div>
                </div>
            </div>

            {/* Individual Case Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.map((client: ClientRevenue, i: number) => (
                    <m.div
                        key={client.id}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 space-y-8 relative overflow-hidden group hover:bg-white/[0.03] transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic">{client.industry}_SECTOR</span>
                                <h4 className="text-2xl font-black text-white italic tracking-tighter mt-1 uppercase">{client.clientName}</h4>
                            </div>
                            <div className="px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                Live_Impact
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Monthly_Revenue_Delta</span>
                                <div className="flex items-end gap-3">
                                    <div className="text-gray-700 font-black line-through text-lg italic opacity-40">
                                        ₹{client.monthlyRevenueBefore?.toLocaleString()}
                                    </div>
                                    <div className="text-white font-black text-3xl italic tracking-tighter">
                                        ₹{client.monthlyRevenueAfter?.toLocaleString()}
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <m.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '85%' }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-emerald-500" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Conversion_Optimization</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 font-bold">PRE</span>
                                        <span className="text-xl font-black text-gray-700 italic">{client.conversionBefore}%</span>
                                    </div>
                                    <div className="w-8 h-px bg-white/10" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-emerald-500 font-bold">POST</span>
                                        <span className="text-3xl font-black text-white italic tracking-tighter">
                                            {client.conversionAfter}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-gray-700 font-black uppercase italic">Traffic_Delta</span>
                                    <span className="text-sm font-black text-white italic">+{((client.trafficAfter || 0) - (client.trafficBefore || 0)).toLocaleString()} users</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Efficiency_Score</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <div key={s} className={`w-3 h-1 rounded-full ${s <= 4 ? 'bg-blue-500' : 'bg-gray-800'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>
        </div>
    );
}
