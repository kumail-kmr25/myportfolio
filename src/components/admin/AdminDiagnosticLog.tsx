"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface AdminDiagnosticLogProps {
    log: any;
    onConvert: (log: any) => void;
}

export default function AdminDiagnosticLog({ log, onConvert }: AdminDiagnosticLogProps) {
    const [isConverted, setIsConverted] = useState(false);

    const handleConvert = () => {
        onConvert(log);
        setIsConverted(true);
        setTimeout(() => setIsConverted(false), 3000);
    };

    return (
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.04] transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium line-clamp-2">{log.description}</p>
                    <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-gray-600">
                        <span>{log.environment}</span>
                        {log.techStack && <span>• {log.techStack}</span>}
                        <span>• {new Date(log.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {!log.matchedPatternId && (
                        <button
                            onClick={handleConvert}
                            disabled={isConverted}
                            className={`px-3 py-1 text-[9px] font-black uppercase rounded-full transition-all flex items-center gap-2 ${isConverted
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            {isConverted ? (
                                <><CheckCircle2 size={10} /> Added to Form</>
                            ) : (
                                "Convert to Pattern"
                            )}
                        </button>
                    )}
                    {log.matchedPatternId ? (
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase rounded-full">Match Found</span>
                    ) : (
                        !isConverted && <span className="px-3 py-1 bg-gray-500/10 text-gray-500 border border-gray-500/20 text-[9px] font-black uppercase rounded-full">No Pattern</span>
                    )}
                </div>
            </div>
            {log.errorMessage && (
                <pre className="p-4 bg-black/40 rounded-2xl border border-white/5 text-[10px] text-red-400 font-mono overflow-x-auto mt-4">
                    {log.errorMessage}
                </pre>
            )}
        </div>
    );
}
