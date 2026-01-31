import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: '', rating: 8, message: '' });
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
            const response = await axios.post(`${API_URL}/api/testimonials`, formData);
            // Add new testimonial to the list immediately (Live Update)
            if (response.data.data) {
                setTestimonials([response.data.data, ...testimonials]);
            } else {
                fetchTestimonials(); // Fallback if no data returned
            }

            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your testimonial is now live.',
            });
            setFormData({ name: '', email: '', role: '', rating: 8, message: '' });
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
            className="py-20 bg-transparent"
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
                                className="glass-effect p-8 rounded-2xl flex flex-col items-center text-center relative mt-8"
                            >
                                {/* Avatar - Overlapping top */}
                                <div className="absolute -top-10 w-20 h-20 rounded-full p-1 bg-gradient-to-r from-primary-500 to-purple-500 shadow-lg">
                                    <img
                                        src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                        alt={testimonial.name}
                                        className="w-full h-full rounded-full object-cover border-2 border-gray-900 bg-gray-800"
                                    />
                                </div>

                                <div className="mt-10 mb-4">
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-primary-500 font-medium">
                                        {testimonial.role}
                                    </p>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(8)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-4 h-4 ${(testimonial.rating || 5) > i
                                                ? 'text-yellow-400'
                                                : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                                    "{testimonial.message}"
                                </p>
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
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Your Email (for avatar) *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="john@example.com"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    We use your email to fetch your Gravatar photo.
                                </p>
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Your Rating *
                                </label>
                                <div className="flex gap-2 mb-6">
                                    {[...Array(8)].map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: i + 1 })}
                                            className="focus:outline-none transition-colors duration-200"
                                        >
                                            <FaStar
                                                className={`w-6 h-6 ${(formData.rating || 0) > i
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
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
