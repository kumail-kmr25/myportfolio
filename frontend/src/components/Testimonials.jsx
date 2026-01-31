import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import axios from 'axios';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', rating: 5, message: '' });
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

    useEffect(() => {
        fetchTestimonials();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            await axios.post(`${API_URL}/api/testimonials`, formData);

            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your testimonial has been submitted for review and will appear shortly.',
            });

            setFormData({ name: '', email: '', phone: '', role: '', rating: 5, message: '' });
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
        <section id="testimonials" className="py-16 md:py-24 bg-transparent border-t border-white/5" ref={ref}>
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Client Stories
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Feedback from people I've worked with
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid or Loading */}
                {isFetching ? (
                    <div className="flex justify-center items-center py-20 mb-12">
                        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : testimonials.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                    >
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial._id}
                                variants={itemVariants}
                                className="glass-effect p-6 rounded-xl flex flex-col relative group hover:border-primary-500/30 transition-all duration-300"
                            >
                                <FaQuoteLeft className="text-primary-500/20 text-4xl absolute top-6 right-6" />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 p-0.5">
                                        <img
                                            src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                            alt={testimonial.name}
                                            className="w-full h-full rounded-full object-cover border-2 border-black"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-semibold text-white">
                                                {testimonial.name}
                                            </h4>
                                            <FaCheckCircle className="text-blue-400 text-xs" title="Verified Client" />
                                        </div>
                                        <p className="text-xs text-primary-400 font-medium">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-3 h-3 ${(testimonial.rating || 5) > i
                                                ? 'text-yellow-400'
                                                : 'text-gray-700'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-400 text-sm italic leading-relaxed">
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
                        <p className="text-gray-400">
                            Be the first to share your experience!
                        </p>
                    </motion.div>
                )}

                {/* Testimonial Form */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={itemVariants}
                    className="max-w-xl mx-auto"
                >
                    <div className="glass-effect p-6 md:p-8 rounded-2xl">
                        <h3 className="text-xl font-bold font-display mb-6 text-center text-white">
                            Share Your Feedback
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
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
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">Role/Company</label>
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rating
                                </label>
                                <div className="flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: i + 1 })}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <FaStar
                                                className={`w-6 h-6 ${(formData.rating || 0) > i
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-700 hover:text-gray-500'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Feedback</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="input-field resize-none"
                                    placeholder="Share your experience..."
                                />
                            </div>

                            {submitStatus.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-lg text-sm ${submitStatus.type === 'success'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}
                                >
                                    {submitStatus.message}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-primary disabled:opacity-70"
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
