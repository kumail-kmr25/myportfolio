import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef();
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const services = [
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
        'Database Development',
        'SEO Optimisation',
        'Website Audit'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // EmailJS configuration - Replace with your actual credentials
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ivp4pz8';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

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
            setSubmitStatus({
                type: 'error',
                message: 'Failed to send message. Please try again or contact me directly via email.',
            });
            console.error('EmailJS Error:', error);
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

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'ka6307464@gmail.com',
            link: 'mailto:ka6307464@gmail.com',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            label: 'LinkedIn',
            value: 'Kumale Ali Bhat',
            link: 'https://www.linkedin.com/in/kumale-ali-bhat',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
            label: 'GitHub',
            value: '@kumail-kmr25',
            link: 'https://github.com/kumail-kmr25',
        },
    ];

    return (
        <section
            id="contact"
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
                        Get In Touch
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Have a project in mind? Let's work together to bring your ideas to life
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={itemVariants}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -z-10" />

                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field bg-white/5 border-white/10 focus:border-primary-500 text-gray-100"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field bg-white/5 border-white/10 focus:border-primary-500 text-gray-100"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="service"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        In which service you are interested? *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="input-field bg-white/5 border-white/10 focus:border-primary-500 text-gray-100 w-full p-3 rounded-lg"
                                    >
                                        <option value="" disabled className="bg-gray-900">Select a service</option>
                                        {services.map((service) => (
                                            <option key={service} value={service} className="bg-gray-900 text-gray-100">
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="input-field bg-white/5 border-white/10 focus:border-primary-500 text-gray-100 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                {submitStatus.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-lg glass-effect ${submitStatus.type === 'success'
                                            ? 'text-green-400 border-green-500/30'
                                            : 'text-red-400 border-red-500/30'
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
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-neon-cyan"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner border-white/20 border-t-white" />
                                            Sending...
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
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold font-display mb-4 text-gray-100">
                                Let's Connect
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
                                Feel free to reach out through any of the channels below.
                            </p>
                        </motion.div>

                        <motion.div variants={containerVariants} className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-4 glass-effect rounded-xl hover:bg-white/5 transition-colors duration-200 border border-white/5 hover:border-primary-500/30 group"
                                >
                                    <div className="p-3 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg text-white shadow-lg group-hover:shadow-neon-cyan transition-shadow duration-300">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{info.label}</p>
                                        <p className="font-semibold text-gray-100">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="pt-8 border-t border-gray-200 dark:border-dark-border"
                        >
                            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                Follow Me
                            </h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: 'github', link: 'https://github.com/kumail-kmr25' },
                                    { icon: 'linkedin', link: 'https://www.linkedin.com/in/kumale-ali-bhat' },
                                    { icon: 'twitter', link: 'https://x.com/KumailKmr' },
                                ].map((social) => (
                                    <motion.a
                                        key={social.icon}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-gray-200 dark:bg-dark-card rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200"
                                    >
                                        {social.icon === 'github' && (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        )}
                                        {social.icon === 'linkedin' && (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        )}
                                        {social.icon === 'twitter' && (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        )}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
