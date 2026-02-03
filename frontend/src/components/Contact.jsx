import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef();
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const services = [
        'Full Stack Development',
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
        'Database Architecture',
        'DevOps and Cloud',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS credentials missing');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                service_type: formData.service,
                message: formData.message,
                to_name: 'Kumale Ali Bhat',
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setSubmitStatus({
                type: 'success',
                message: 'Inquiry received. I will respond within 24 hours.',
            });
            setFormData({ name: '', email: '', service: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Direct communication error. Please email me at ka6307464@gmail.com',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
    };

    return (
        <section id="contact" className="py-24 bg-transparent border-t border-white/[0.05]" ref={ref}>
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                            Secure Your <span className="block text-gray-500">System Recovery</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-12 max-w-md leading-relaxed">
                            I provide surgical fixes for production systems.
                            If your application is breaking or insecure, let&apos;s restore stability today.
                        </motion.p>

                        <motion.div variants={containerVariants} className="space-y-6">
                            <a href="mailto:ka6307464@gmail.com" className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors group">
                                <div className="p-3 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                    <FaEnvelope className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Direct Email</p>
                                    <p className="text-white font-medium text-lg">ka6307464@gmail.com</p>
                                </div>
                            </a>

                            <a href="https://www.linkedin.com/in/kumale-ali-bhat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors group">
                                <div className="p-3 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                    <FaLinkedin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">LinkedIn Professional</p>
                                    <p className="text-white font-medium text-lg">Kumale Ali Bhat</p>
                                </div>
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={itemVariants}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Service Required</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-4 text-white cursor-pointer focus:outline-none focus:border-white/20 transition-colors appearance-none"
                                >
                                    <option value="" disabled className="bg-[#050505]">Select intervention type</option>
                                    {services.map(service => (
                                        <option key={service} value={service} className="bg-[#050505] text-white">
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Project Details</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                                    placeholder="Briefly describe the instability or feature required..."
                                />
                            </div>

                            {submitStatus.message && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === 'success'
                                    ? 'bg-white/5 text-white border border-white/10'
                                    : 'bg-red-500/5 text-red-400 border border-red-500/10'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-5 text-lg"
                            >
                                {loading ? 'Processing...' : 'Fix My App'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
