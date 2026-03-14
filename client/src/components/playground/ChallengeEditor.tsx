"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Terminal, Copy, RotateCcw, Play, CheckCircle2, AlertCircle, Sparkles, ChevronRight, MessageSquare, Trophy } from "lucide-react";
import Link from "next/link";

interface ChallengeEditorProps {
  initialCode: string;
  onValidate: (code: string) => Promise<{ success: boolean; feedback: string }>;
  conversionPrompt: string;
}

export default function ChallengeEditor({ initialCode, onValidate, conversionPrompt }: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; feedback: string } | null>(null);
  const [showConversion, setShowConversion] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleValidate = async () => {
    setIsValidating(true);
    const validationResult = await onValidate(code);
    setResult(validationResult);
    setIsValidating(false);
    
    if (validationResult.success) {
      setTimeout(() => setShowConversion(true), 800);
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="space-y-6">
      {/* Editor Main Unit */}
      <div className="relative group/editor">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur opacity-50 group-hover/editor:opacity-100 transition-opacity" />
        <div className="relative bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[500px] shadow-2xl">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <Terminal size={14} />
                <span>Source.tsx</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <m.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setCode(initialCode)}
                className="p-2.5 rounded-xl bg-white/5 text-gray-500 hover:text-white transition-colors border border-white/5"
                title="Reset Code"
              >
                <RotateCcw size={16} />
              </m.button>
              <m.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleValidate}
                disabled={isValidating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                {isValidating ? "Analyzing..." : (
                  <>
                    <Play size={14} /> Validate
                  </>
                )}
              </m.button>
            </div>
          </div>

          {/* Code Input Area */}
          <div className="flex-grow flex relative font-mono text-sm leading-relaxed overflow-hidden">
            {/* Gutter */}
            <div className="w-12 bg-[#050505] border-r border-white/5 py-8 text-right pr-4 text-gray-700 select-none hidden sm:block">
              {Array.from({ length: Math.max(lineCount, 15) }).map((_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
              ))}
            </div>
            
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow bg-transparent p-8 focus:outline-none resize-none text-gray-300 selection:bg-blue-500/20 overflow-y-auto"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          {/* Validation Feedback Overlay */}
          <AnimatePresence>
            {result && (
              <m.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className={`absolute bottom-6 left-6 right-6 p-6 rounded-2xl border backdrop-blur-xl z-20 flex items-start gap-4 shadow-2xl ${
                  result.success 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                {result.success ? <CheckCircle2 className="shrink-0" size={24} /> : <AlertCircle className="shrink-0" size={24} />}
                <div className="space-y-1">
                  <p className="font-black text-[11px] uppercase tracking-widest">
                    {result.success ? "Success_Authenticated" : "Validation_Null"}
                  </p>
                  <p className="text-sm font-medium text-white/80">{result.feedback}</p>
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="ml-auto text-white/30 hover:text-white transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Conversion Upsell (Lead Generation) */}
      <AnimatePresence>
        {showConversion && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent border border-blue-500/30 relative overflow-hidden group/upsell"
          >
            <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover/upsell:scale-125 transition-transform duration-1000">
              <Sparkles size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Trophy size={14} /> Achievement_Unlocked
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">Elite Performance Detected</h3>
                <p className="text-gray-400 font-medium leading-relaxed italic">{conversionPrompt}</p>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link 
                  href="/hire"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-400 transition-all hover:scale-105"
                >
                  Book Priority Strategy <MessageSquare size={16} />
                </Link>
                <button 
                  onClick={() => setShowConversion(false)}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
