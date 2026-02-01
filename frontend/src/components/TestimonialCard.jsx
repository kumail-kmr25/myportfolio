import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaCheckCircle, FaWrench, FaLightbulb, FaChartLine } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, variants }) => {
    const isStructured = testimonial.problem || testimonial.solution || testimonial.outcome;

    return (
        <motion.div
            variants={variants}
            className="glass-effect p-6 rounded-xl flex flex-col relative group hover:border-primary-500/30 transition-all duration-300 h-full"
            whileHover={{ y: -5, boxShadow: '0 20px 40px -20px rgba(var(--primary-rgb), 0.15)' }}
        >
            <FaQuoteLeft className="text-primary-500/10 text-6xl absolute top-4 right-4 z-0" />

            {/* Header: Avatar, Name, Role */}
            <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 p-0.5">
                    <img
                        src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover border-2 border-black"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-lg">
                            {testimonial.name}
                        </h4>
                        <FaCheckCircle className="text-blue-400 text-xs" title="Verified Client" />
                    </div>
                    <p className="text-sm text-primary-400 font-medium">
                        {testimonial.role} {testimonial.projectType && <span className="text-gray-500">• {testimonial.projectType}</span>}
                    </p>
                </div>
            </div>

            {/* Structured Content or Simple Message */}
            <div className="flex-grow relative z-10 space-y-3 mb-4">
                {isStructured ? (
                    <>
                        {testimonial.problem && (
                            <div className="text-sm">
                                <span className="flex items-center gap-2 text-red-400 font-semibold mb-1">
                                    <FaWrench className="text-xs" /> Problem
                                </span>
                                <p className="text-gray-300 leading-relaxed text-sm pl-2 border-l-2 border-red-500/20">
                                    {testimonial.problem}
                                </p>
                            </div>
                        )}

                        {testimonial.solution && (
                            <div className="text-sm">
                                <span className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                                    <FaLightbulb className="text-xs" /> Solution
                                </span>
                                <p className="text-gray-300 leading-relaxed text-sm pl-2 border-l-2 border-blue-500/20">
                                    {testimonial.solution}
                                </p>
                            </div>
                        )}

                        {testimonial.outcome && (
                            <div className="text-sm">
                                <span className="flex items-center gap-2 text-green-400 font-semibold mb-1">
                                    <FaChartLine className="text-xs" /> Result
                                </span>
                                <p className="text-gray-300 leading-relaxed text-sm pl-2 border-l-2 border-green-500/20 font-medium">
                                    {testimonial.outcome}
                                </p>
                            </div>
                        )}

                        {/* Fallback for msg if some parts are missing but not all, or just to show the main quote if desired. 
                            Design choice: if structured, we prioritize P/S/R. logic: show message only if P/S/R is incomplete or as a summary? 
                            Let's append message if it exists and is different. usually message covers it. 
                            Let's show message if NO P/S/R, otherwise rely on P/S/R.
                        */}
                    </>
                ) : (
                    <p className="text-gray-300 text-sm italic leading-relaxed">
                        &quot;{testimonial.message}&quot;
                    </p>
                )}
            </div>

            {/* Tags */}
            {testimonial.tags && testimonial.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {testimonial.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Rating */}
            <div className="flex gap-1 relative z-10 pt-4 border-t border-white/5 mt-auto">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`w-4 h-4 ${(testimonial.rating || 5) > i
                            ? 'text-yellow-400'
                            : 'text-gray-700'
                            }`}
                    />
                ))}
            </div>

            {/* Badge for Problem Solved */}
            {isStructured && (
                <div className="absolute top-0 right-0 p-2">
                    <div className="bg-primary-500/20 text-primary-300 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg backdrop-blur-sm border border-primary-500/20">
                        PROBLEM SOLVED
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TestimonialCard;
