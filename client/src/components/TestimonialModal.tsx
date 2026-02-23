"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TestimonialForm from "./TestimonialForm";

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function TestimonialModal({ isOpen, onClose, onSuccess }: TestimonialModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl glass-effect rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
                    >
                        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Share Your Experience</h2>
                                    <p className="text-gray-400 mt-2">Your feedback helps us improve our services.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <TestimonialForm onSuccess={() => {
                                onSuccess();
                                // onClose is handled in parent or here after success
                            }} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
