import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaWrench, FaLightbulb, FaChartLine, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestimonialFormModal = ({ isOpen, onClose, API_URL }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        projectType: '',
        rating: 5,
        type: 'simple',
        message: '',
        problem: '',
        solution: '',
        outcome: '',
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            };

            if (formData.type === 'simple') {
                delete payload.problem;
                delete payload.solution;
                delete payload.outcome;
            } else if (!payload.message) {
                payload.message = `${payload.problem} -> ${payload.outcome}`;
            }

            await axios.post(`${API_URL}/api/testimonials`, payload);

            setStatus({
                type: 'success',
                message: 'Inquiry Verification: Your records have been submitted for review.'
            });

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
            const errorMsg = error.response?.data?.message || 'Submission error. Please verify requirements.';

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
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="relative bg-[#050505] border border-white/[0.05] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>

                    <div className="p-8 md:p-12">
                        <header className="mb-12">
                            <h3 className="text-3xl font-bold text-white mb-3">Validation Input</h3>
                            <p className="text-gray-500 text-sm">Provide feedback on the architectural intervention or system stabilization performed.</p>
                        </header>

                        {!status || status.type === 'error' ? (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Professional Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Corporate Role / Entity</label>
                                        <input
                                            required
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                            placeholder="CTO @ TechGlobal"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Project Domain</label>
                                        <input
                                            type="text"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                            placeholder="e.g. API Stabilization"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone || ''} // Ensure controlled input
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Performance Rating</label>
                                        <div className="flex gap-2 py-2">
                                            {[...Array(5)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                                                    className="focus:outline-none"
                                                >
                                                    <FaStar
                                                        className={`w-5 h-5 ${(formData.rating || 0) > i
                                                            ? 'text-white'
                                                            : 'text-white/10 hover:text-white/30'
                                                            } transition-colors`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'simple' })}
                                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${formData.type === 'simple'
                                            ? 'bg-white text-black'
                                            : 'text-gray-500 hover:text-white'
                                            }`}
                                    >
                                        Executive Summary
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'structured' })}
                                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${formData.type === 'structured'
                                            ? 'bg-white text-black'
                                            : 'text-gray-500 hover:text-white'
                                            }`}
                                    >
                                        Technical Audit
                                    </button>
                                </div>

                                {formData.type === 'simple' ? (
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Observation</label>
                                        <textarea
                                            required
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
                                            placeholder="Describe the engagement and results..."
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 flex items-center gap-2">
                                                <FaWrench className="text-[8px]" /> Anomaly / Problem
                                            </label>
                                            <textarea
                                                required
                                                name="problem"
                                                rows="2"
                                                value={formData.problem}
                                                onChange={handleChange}
                                                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
                                                placeholder="What baseline issues were identified?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 flex items-center gap-2">
                                                <FaLightbulb className="text-[8px]" /> Intervention Applied
                                            </label>
                                            <textarea
                                                required
                                                name="solution"
                                                rows="2"
                                                value={formData.solution}
                                                onChange={handleChange}
                                                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
                                                placeholder="What surgical fixes were implemented?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 flex items-center gap-2">
                                                <FaChartLine className="text-[8px]" /> Measured Outcome
                                            </label>
                                            <textarea
                                                required
                                                name="outcome"
                                                rows="2"
                                                value={formData.outcome}
                                                onChange={handleChange}
                                                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
                                                placeholder="Specify quantifiable results (e.g. 50ms latency reduced)..."
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Core Technologies (Optional)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                        placeholder="Comma-separated e.g. Node.js, AWS, Redis"
                                    />
                                </div>

                                {status?.type === 'error' && (
                                    <div className="text-red-400 text-xs font-medium bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary py-4 text-sm font-bold uppercase tracking-[0.2em]"
                                >
                                    {loading ? 'Processing Submission...' : 'Transmit Validation'}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center"
                            >
                                <div className="w-16 h-16 bg-white/5 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaCheck className="text-xl" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">Submission Received</h4>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">Your professional validation has been successfully recorded. Redirecting to validation registry...</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TestimonialFormModal;
