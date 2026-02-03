import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef();
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const services = [
        'Bug Fixing & Error Resolution',
        'Authentication & Authorization',
        'Backend & API Development',
        'App Stabilization & Performance',
        'Full-Stack Solution',
        'Other'
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
                message: 'Message sent successfully! I\'ll get back to you soon.',
            });
            setFormData({ name: '', email: '', service: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to send message. Please contact me directly via email.',
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
        <section id="contact" className="pt-2 md:pt-4 pb-10 md:pb-16 bg-transparent border-t border-white/5" ref={ref}>
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Ready to Fix Your App?
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle mx-auto">
                        If you&apos;re stuck with bugs, broken features, or auth issues — I can help.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={itemVariants}
                        className="w-full"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="glass-effect p-6 md:p-8 rounded-2xl space-y-6">
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
                                    placeholder="Your name"
                                />
                            </div>

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
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="input-field appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="bg-dark-card">Select a topic</option>
                                    {services.map(service => (
                                        <option key={service} value={service} className="bg-dark-card text-white">
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="input-field resize-none"
                                    placeholder="Tell me about your project..."
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
                                className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Check out my socials */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold font-display mb-4 text-white">Let&apos;s Connect</h3>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                I&apos;m always looking for new opportunities and interesting projects.
                                Whether you have a question or just want to say hi, feel free to reach out!
                            </p>
                        </motion.div>

                        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-4">
                            <a href="mailto:ka6307464@gmail.com" className="group flex items-center gap-4 p-4 rounded-xl glass-effect hover:bg-white/5 transition-colors">
                                <span className="p-3 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors">
                                    <FaEnvelope className="w-6 h-6" />
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white font-medium">ka6307464@gmail.com</p>
                                </div>
                            </a>

                            <a href="https://www.linkedin.com/in/kumale-ali-bhat" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl glass-effect hover:bg-white/5 transition-colors">
                                <span className="p-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <FaLinkedin className="w-6 h-6" />
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">LinkedIn</p>
                                    <p className="text-white font-medium">Kumale Ali Bhat</p>
                                </div>
                            </a>

                            <div className="grid grid-cols-2 gap-4">
                                <a href="https://github.com/kumail-kmr25" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 rounded-xl glass-effect hover:bg-white/5 transition-colors">
                                    <span className="p-2 rounded-lg bg-gray-500/10 text-gray-400 group-hover:bg-white group-hover:text-black transition-colors">
                                        <FaGithub className="w-5 h-5" />
                                    </span>
                                    <span className="text-white font-medium">GitHub</span>
                                </a>

                                <a href="https://x.com/KumailKmr" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 rounded-xl glass-effect hover:bg-white/5 transition-colors">
                                    <span className="p-2 rounded-lg bg-blue-400/10 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors">
                                        <FaTwitter className="w-5 h-5" />
                                    </span>
                                    <span className="text-white font-medium">Twitter</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
