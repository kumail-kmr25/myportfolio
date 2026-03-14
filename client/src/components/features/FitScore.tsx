"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Question {
    question: string;
    options: { text: string; weight: number }[];
}

export const FitScore: React.FC = () => {
    const { data, error } = useSWR('/api/fit-score', fetcher);
    const config = data?.config;
    
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (error || !config || !config.enabled) return null;

    const questions: Question[] = config.questions || [];
    const totalSteps = questions.length;

    const handleAnswer = (weight: number) => {
        const newAnswers = [...answers, weight];
        setAnswers(newAnswers);
        
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            handleSubmit(newAnswers);
        }
    };

    const handleSubmit = async (finalAnswers: number[]) => {
        setIsSubmitting(true);
        const score = finalAnswers.reduce((a, b) => a + b, 0);
        let category = 'fair';
        if (score >= config.excellentMin) category = 'excellent';
        else if (score >= config.goodMin) category = 'good';

        try {
            await fetch('/api/fit-score', {
                method: 'POST',
                body: JSON.stringify({
                    answers: finalAnswers,
                    score,
                    category
                })
            });
            setFinished(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getScoreCategory = () => {
        const score = answers.reduce((a, b) => a + b, 0);
        if (score >= config.excellentMin) return { label: 'Excellent Fit', color: 'text-emerald-500', msg: config.excellentMessage };
        if (score >= config.goodMin) return { label: 'Good Fit', color: 'text-blue-500', msg: config.goodMessage };
        return { label: 'Potential Fit', color: 'text-amber-500', msg: config.fairMessage };
    };

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="bg-[#050505] border border-white/5 rounded-[40px] overflow-hidden p-8 md:p-12 shadow-2xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Target size={120} />
                </div>

                <AnimatePresence mode="wait">
                    {!finished ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-blue-500/20">0{step + 1}</div>
                                <div className="h-px flex-1 bg-white/5" />
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Question {step + 1} of {totalSteps}</div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
                                {questions[step].question}
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.weight)}
                                        disabled={isSubmitting}
                                        className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300 text-left"
                                    >
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{opt.text}</span>
                                        <ChevronRight size={18} className="text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                            
                            {isSubmitting && (
                                <div className="absolute inset-0 bg-[#050505]/80 flex items-center justify-center rounded-3xl z-20 backdrop-blur-sm">
                                    <Loader2 className="animate-spin text-blue-500" size={40} />
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="inline-flex p-6 bg-emerald-500/10 rounded-full text-emerald-500 mb-8">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${getScoreCategory().color}`}>
                                {getScoreCategory().label}
                            </h2>
                            <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
                                {getScoreCategory().msg}
                            </p>
                            <button 
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                            >
                                Let&apos;s Discuss Next Steps
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FitScore;
