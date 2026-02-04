import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TestimonialCard from './TestimonialCard';
import Navbar from './Navbar';
import Footer from './Footer';
import config from '../config';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { API_URL } = config;

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
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
                setError('Failed to retrieve client validation records.');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
        window.scrollTo(0, 0);
    }, [API_URL]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-40 pb-24">
                <div className="section-container !py-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="mb-12 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Core Portfolio
                        </button>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Client <span className="text-gray-500">Validation</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                            A record of performance across diverse production environments.
                            These insights reflect the measurable impact of stabilization and architectural recovery.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border border-white/10 border-t-white rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="py-24 text-center border border-red-500/10 rounded-3xl bg-red-500/5">
                            <p className="text-red-400 uppercase tracking-widest text-xs font-bold mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-tighter"
                            >
                                Retry Connection
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                                <div className="col-span-full py-24 text-center border border-white/[0.05] rounded-3xl bg-white/[0.01]">
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">No Records Found</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestimonialsPage;
