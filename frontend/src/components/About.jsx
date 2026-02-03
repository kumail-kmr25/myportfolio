import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        <section id="about" ref={ref} className="py-24 bg-transparent">
            <div className="section-container">
                <div className="max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="space-y-12"
                    >
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h2 className="section-title">The Developer Behind the Fix</h2>
                            <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                                I specialize in stabilizing broken systems. When your production app is failing,
                                your sessions are breaking, or your API is sluggish, I provide the surgical
                                intervention needed to restore reliability.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div variants={itemVariants} className="space-y-6">
                                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500">Why I&apos;m Trusted</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'System Recovery', sub: 'I fix deep-seated bugs that others miss.' },
                                        { label: 'Security First', sub: 'Hardened JWT and session management flows.' },
                                        { label: 'Performance', sub: 'Sub-second API responses and optimized frontend state.' },
                                        { label: 'Reliability', sub: 'Clean code built for long-term production stability.' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                                            <div>
                                                <p className="text-white font-semibold text-base">{item.label}</p>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-6">
                                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500">Core Expertise</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        'Bug Resolution',
                                        'Auth Stabilization',
                                        'API Architecture',
                                        'Performance Audit',
                                        'Database Recovery',
                                        'Secure Deployment',
                                    ].map((item, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-xl text-sm text-gray-300 font-medium"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={itemVariants} className="pt-8">
                            <Link
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-80}
                            >
                                <button className="btn-primary">
                                    Fix My App
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
