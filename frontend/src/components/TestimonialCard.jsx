import { motion } from 'framer-motion';
import { FaStar, FaWrench, FaLightbulb, FaChartLine } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, variants }) => {
    const isStructured = testimonial.problem || testimonial.solution || testimonial.outcome;

    return (
        <motion.div
            variants={variants}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
        >
            {/* Header: Name & Role */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                    <h4 className="font-bold text-white text-lg tracking-tight">
                        {testimonial.name}
                    </h4>
                    {isStructured && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                            Intervention
                        </span>
                    )}
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500">
                    {testimonial.role} {testimonial.projectType && <span className="text-gray-600">/ {testimonial.projectType}</span>}
                </p>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-6 mb-8">
                {isStructured ? (
                    <div className="space-y-6">
                        {testimonial.problem && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                                    <FaWrench className="text-[8px]" /> The Problem
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {testimonial.problem}
                                </p>
                            </div>
                        )}

                        {testimonial.solution && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                                    <FaLightbulb className="text-[8px]" /> The Solution
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {testimonial.solution}
                                </p>
                            </div>
                        )}

                        {testimonial.outcome && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                                    <FaChartLine className="text-[8px]" /> The Result
                                </p>
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    {testimonial.outcome}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-300 text-base leading-relaxed italic">
                        &quot;{testimonial.message}&quot;
                    </p>
                )}
            </div>

            {/* Bottom Bar: Tags & Rating */}
            <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {testimonial.tags && testimonial.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium text-gray-500 lowercase">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`w-3 h-3 ${(testimonial.rating || 5) > i
                                ? 'text-white/20 group-hover:text-white transition-colors duration-300'
                                : 'text-white/5'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard;
