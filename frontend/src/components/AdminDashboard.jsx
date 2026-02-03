import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCheck, FaTrash, FaSignOutAlt, FaStar, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AdminDashboard = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');
    const navigate = useNavigate();

    const { API_URL } = config;
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.get(`${API_URL}/api/testimonials/all`, config);
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response?.status === 401) {
                    handleLogout(); // Token invalid
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, [API_URL, token, handleLogout]);

    const handleApprove = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${API_URL}/api/testimonials/${id}/approve`, {}, config);
            // Optimistic update
            setTestimonials(prev => prev.map(t => t._id === id ? { ...t, approved: true } : t));
        } catch (error) {
            console.error('Approval failed:', error);
            alert('Failed to approve testimonial');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/api/testimonials/${id}`, config);
            // Optimistic update
            setTestimonials(prev => prev.filter(t => t._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete testimonial');
        }
    };

    const handleLogout = useCallback(() => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    }, [navigate]);

    const pendingTestimonials = testimonials.filter(t => !t.approved);
    const approvedTestimonials = testimonials.filter(t => t.approved);
    const displayList = activeTab === 'pending' ? pendingTestimonials : approvedTestimonials;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-display">Dashboard</h1>
                        <p className="text-gray-400">Manage your testimonials</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg transition-colors border border-white/5 hover:border-red-500/30"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'pending'
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        Pending ({pendingTestimonials.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('approved')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'approved'
                            ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        Approved ({approvedTestimonials.length})
                    </button>
                </div>

                {/* List */}
                <motion.div
                    key={activeTab}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-4"
                >
                    {displayList.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                            No {activeTab} testimonials found.
                        </div>
                    ) : (
                        displayList.map((testimonial) => (
                            <motion.div
                                key={testimonial._id}
                                variants={itemVariants}
                                className="glass-effect p-6 rounded-xl flex flex-col md:flex-row gap-6 relative group"
                            >
                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < testimonial.rating ? 'opacity-100' : 'opacity-20'} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-primary-400 mb-3">{testimonial.role}</p>
                                    <p className="text-gray-300 italic mb-4">&quot;{testimonial.message}&quot;</p>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <FaClock /> {new Date(testimonial.createdAt).toLocaleDateString()}
                                        </span>
                                        <span>{testimonial.email}</span>
                                        <span>{testimonial.phone}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex md:flex-col gap-3 justify-center md:border-l border-white/10 md:pl-6">
                                    {!testimonial.approved && (
                                        <button
                                            onClick={() => handleApprove(testimonial._id)}
                                            className="p-3 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-all border border-green-500/20"
                                            title="Approve"
                                        >
                                            <FaCheck />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
