import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaWrench, FaLightbulb, FaChartLine, FaComment, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestimonialFormModal = ({ isOpen, onClose, API_URL }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        projectType: '',
        rating: 5,
        type: 'simple', // 'simple' or 'structured'
        message: '',
        problem: '',
        solution: '',
        outcome: '',
        tags: '' // comma separated string
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // Prepare payload
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            };

            // If simple, clear structured fields just in case
            if (formData.type === 'simple') {
                delete payload.problem;
                delete payload.solution;
                delete payload.outcome;
            } else {
                // For structured, we can use 'message' as a summary or concatenation if backend requires it.
                // But backend validation requires 'message'. So we should ensuring message is populated.
                // Let's auto-generate message if it's empty for structured
                if (!payload.message) {
                    payload.message = `${payload.problem} -> ${payload.outcome}`;
                }
            }

            await axios.post(`${API_URL}/api/testimonials`, payload);

            setStatus({
                type: 'success',
                message: 'Thanks! Your feedback has been submitted for review.'
            });

            // Redirect after delay
            setTimeout(() => {
                onClose();
                setFormData({
                    name: '', role: '', email: '', projectType: '', rating: 5,
                    type: 'simple', message: '', problem: '', solution: '', outcome: '', tags: ''
                });
                setStatus(null);
                navigate('/testimonials');
            }, 2000);

        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.errors
                ? error.response.data.errors.map(e => e.msg).join(', ')
                : error.response?.data?.message || 'Something went wrong. Please try again.';

            setStatus({
                type: 'error',
                message: errorMsg
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-[#0f1014] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>

                    <div className="p-6 md:p-8">
                        <h3 className="text-2xl font-bold font-display text-white mb-2">Share Your Experience</h3>
                        <p className="text-gray-400 mb-6 text-sm">Your feedback helps me improve and helps others trust my work.</p>

                        {!status || status.type === 'error' ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Name *</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input-field py-2"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Company / Role *</label>
                                        <input
                                            required
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="input-field py-2"
                                            placeholder="CEO @ Startup"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Email (Private) *</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input-field py-2"
                                            placeholder="For verification only"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Project Type</label>
                                        <input
                                            type="text"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="input-field py-2"
                                            placeholder="e.g. Portfolio Website"
                                        />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Rating</label>
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

                                {/* Feedback Type Toggle */}
                                <div className="bg-white/5 p-1 rounded-lg flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'simple' })}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${formData.type === 'simple'
                                            ? 'bg-primary-500 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <FaComment /> Simple
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'structured' })}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${formData.type === 'structured'
                                            ? 'bg-primary-500 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <FaWrench /> Problem/Solution
                                    </button>
                                </div>

                                {/* Text Areas */}
                                {formData.type === 'simple' ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Message *</label>
                                        <textarea
                                            required
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input-field resize-none"
                                            placeholder="What was it like working with me?"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                                        <div>
                                            <label className="flex items-center gap-2 text-xs font-medium text-red-400 mb-1">
                                                <FaWrench /> The Problem *
                                            </label>
                                            <textarea
                                                required
                                                name="problem"
                                                rows="2"
                                                value={formData.problem}
                                                onChange={handleChange}
                                                className="input-field resize-none border-red-500/20 focus:border-red-500/50"
                                                placeholder="What challenge were you facing?"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-1">
                                                <FaLightbulb /> The Solution *
                                            </label>
                                            <textarea
                                                required
                                                name="solution"
                                                rows="2"
                                                value={formData.solution}
                                                onChange={handleChange}
                                                className="input-field resize-none border-blue-500/20 focus:border-blue-500/50"
                                                placeholder="How did I help fix or build it?"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-xs font-medium text-green-400 mb-1">
                                                <FaChartLine /> The Result *
                                            </label>
                                            <textarea
                                                required
                                                name="outcome"
                                                rows="2"
                                                value={formData.outcome}
                                                onChange={handleChange}
                                                className="input-field resize-none border-green-500/20 focus:border-green-500/50"
                                                placeholder="What was the outcome? (e.g. 20% faster load time)"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Tags */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Skills/Tags Used</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="input-field py-2"
                                        placeholder="React, CSS, Bug Fix (comma separated)"
                                    />
                                </div>

                                {status?.type === 'error' && (
                                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary py-3 flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        'Submit Testimonial'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    <FaCheckCircle />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                                <p className="text-gray-400">Your feedback has been submitted successfully.</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TestimonialFormModal;
