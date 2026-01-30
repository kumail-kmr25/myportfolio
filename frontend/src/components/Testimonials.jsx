import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', role: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/testimonials`);
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            await axios.post(`${API_URL}/api/testimonials`, formData);
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your testimonial has been submitted for review.',
            });
            setFormData({ name: '', role: '', message: '' });
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to submit testimonial. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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
        <section
            id="testimonials"
            ref={ref}
            className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface"
        >
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Testimonials
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        What clients and collaborators say about working with me
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                {testimonials.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial._id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="card"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                                        {testimonial.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic">
                                    "{testimonial.message}"
                                </p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        className="text-center py-12 mb-16"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Be the first to leave a testimonial!
                        </p>
                    </motion.div>
                )}

                {/* Testimonial Form */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={itemVariants}
                    className="max-w-2xl mx-auto"
                >
                    <div className="card">
                        <h3 className="text-2xl font-bold font-display mb-6 text-center text-gray-900 dark:text-gray-100">
                            Share Your Experience
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Your Role/Company *
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="CEO at Company"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Your Testimonial *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="input-field resize-none"
                                    placeholder="Share your experience working with me..."
                                />
                            </div>

                            {submitStatus.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-lg ${submitStatus.type === 'success'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                        }`}
                                >
                                    {submitStatus.message}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                        Submit Testimonial
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
