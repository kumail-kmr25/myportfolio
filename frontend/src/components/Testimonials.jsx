import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import TestimonialCard from './TestimonialCard';
import TestimonialFormModal from './TestimonialFormModal';
import config from '../config';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const [testimonials, setTestimonials] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { API_URL } = config;

    useEffect(() => {
        const fetchTestimonials = async () => {
            setIsFetching(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/api/testimonials`, {
                    timeout: 10000 // 10 second timeout
                });

                if (Array.isArray(response.data)) {
                    setTestimonials(response.data);
                } else {
                    console.error('Testimonials data is not an array:', response.data);
                    setTestimonials([]);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError('Unable to load testimonials at this time.');
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
        <section id="testimonials" className="bg-transparent border-t border-white/5 relative overflow-hidden" ref={ref}>
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
                        Client Results
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
                        Real feedback from businesses and startups I’ve helped through bug fixing, app stabilization, and production-ready code.
                    </motion.p>
                </motion.div>

                {/* Content */}
                {isFetching ? (
                    <div className="flex justify-center items-center py-20 mb-12">
                        <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 mb-12 glass-effect rounded-2xl border border-red-500/10">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                        >
                            Try refreshing the page
                        </button>
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
                    className="flex flex-col items-center gap-4 mt-8"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary inline-flex items-center gap-2 group"
                    >
                        <FaPlus className="text-xs group-hover:rotate-90 transition-transform" />
                        Leave Feedback
                    </button>

                    <a
                        href="/testimonials"
                        className="text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                    >
                        View All Client Stories
                    </a>
                </motion.div>
            </div>

            {/* Modal */}
            <TestimonialFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                API_URL={API_URL}
            />
        </section >
    );
};

export default Testimonials;
