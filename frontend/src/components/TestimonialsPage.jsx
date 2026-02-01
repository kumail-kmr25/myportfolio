import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaQuoteLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TestimonialCard from './TestimonialCard';
import Navbar from './Navbar';
import Footer from './Footer';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/testimonials`);
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, [API_URL]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#050505] min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="mb-8 inline-flex items-center gap-2 text-primary-400 hover:text-white transition-colors"
                        >
                            <FaHome /> Back to Home
                        </button>

                        <h1 className="section-title mb-6">Client Success Stories</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            See what people are saying about their experience working with me.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
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
                                <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                                    <FaQuoteLeft className="text-4xl text-white/10 mx-auto mb-4" />
                                    <p className="text-gray-500">No testimonials published yet.</p>
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
