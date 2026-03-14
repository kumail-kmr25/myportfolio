import { Check, ArrowRight, Zap, Shield, Rocket, Calculator } from "lucide-react";
import { m } from "framer-motion";
import { useState } from "react";
import EstimatorModal from "./EstimatorModal";

const packages = [
// ... (rest of the packages keep same)
];

export default function Pricing() {
    const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

    return (
        <section id="pricing" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* ... (background elements keep same) */}

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block"
                    >
                        Investment Tiers
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Pricing <span className="text-gray-500 italic">& Packages</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
                    >
                        Transparent pricing for world-class engineering. Choose a package that fits your stage, or contact me for a custom quote.
                    </m.p>

                    <m.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEstimatorOpen(true)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:bg-white/10 transition-all shadow-2xl"
                    >
                        <Calculator size={16} /> Calculate Your Custom Project ROI
                    </m.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ... (packages map keep same) */}
                </div>
            </div>

            <EstimatorModal isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
        </section>
    );
}
