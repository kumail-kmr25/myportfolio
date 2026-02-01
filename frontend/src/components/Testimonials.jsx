import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import TestimonialCard from './TestimonialCard';
import TestimonialFormModal from './TestimonialFormModal';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const [testimonials, setTestimonials] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/testimonials`);
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchTestimonials();
    }, [API_URL]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="testimonials" className="pt-20 md:pt-32 pb-16 bg-transparent border-t border-white/5 relative overflow-hidden" ref={ref}>
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants} className="inline-block px-3 py-1 mb-4 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
                        Testimonials
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="section-title mb-4">
                        What Clients Say
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
                        Real feedback from real people I’ve helped through clean code, bug fixing, and responsive design.
                    </motion.p>
                </motion.div>

                {/* Content */}
                {isFetching ? (
                    <div className="flex justify-center items-center py-20 mb-12">
                        <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-start"
                    >
                        {testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial._id}
                                    testimonial={testimonial}
                                    variants={itemVariants}
                                />
                            ))
                        ) : (
                            <motion.div
                                variants={itemVariants}
                                className="col-span-full text-center py-12 glass-effect rounded-2xl border-dashed border-2 border-white/10"
                            >
                                <p className="text-gray-400 mb-4">No testimonials yet. Be the first to leave one!</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary inline-flex items-center gap-2 group"
                    >
                        <FaPlus className="text-xs group-hover:rotate-90 transition-transform" />
                        Leave Feedback
                    </button>
                    <p className="mt-4 text-xs text-gray-500">
                        * New testimonials are reviewed before appearing.
                    </p>
                </motion.div>
            </div>

            {/* Modal */}
            <TestimonialFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                API_URL={API_URL}
            />
        </section>
    );
};

export default Testimonials;
