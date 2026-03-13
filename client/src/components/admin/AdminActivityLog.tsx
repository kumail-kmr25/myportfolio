"use client";

import { Clock, Shield, Globe, User, Terminal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityLog {
    id: string;
    action: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
    admin: {
        name: string;
        email: string;
    };
}

export default function AdminActivityLog({ logs = [] }: { logs: ActivityLog[], onUpdate: () => void }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-white/5 gap-6">
                <div>
                    <h2 className="text-xl font-bold text-white">System Access Logs</h2>
                    <p className="text-sm text-gray-500 mt-1">Audit trail of all administrative actions and logins.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                    <Shield size={14} className="text-green-500" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Auditing Active</span>
                </div>
            </div>

            <div className="glass-effect rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Admin</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Action</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Origin</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{log.admin.name}</p>
                                                <p className="text-[10px] text-gray-500 font-mono">{log.admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-white uppercase tracking-tight">{log.action}</p>
                                            {log.details && (
                                                <p className="text-[10px] text-gray-500 flex items-center gap-2">
                                                    <Terminal size={10} />
                                                    {log.details}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                                <Globe size={10} />
                                                {log.ipAddress || "Unknown IP"}
                                            </p>
                                            <p className="text-[9px] text-gray-600 truncate max-w-[200px]">{log.userAgent}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                            <Clock size={12} />
                                            {formatDistanceToNow(new Date(log.createdAt))} ago
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {logs.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">No security logs recorded</p>
                    </div>
                )}
            </div>
        </div>
    );
}
