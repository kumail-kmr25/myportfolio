import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import aboutImage from '../assets/images/about-image.jpg';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

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
        <section
            id="about"
            ref={ref}
            className="py-10 md:py-16 bg-transparent"
        >
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        About Me
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Passionate about building exceptional digital experiences
                    </motion.p>
                </motion.div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-10 items-center">
                    {/* Image */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={itemVariants}
                        className="flex justify-center w-full"
                    >
                        <div className="relative max-w-sm w-full">
                            <motion.img
                                src={aboutImage}
                                alt="Kumale Ali Bhat - About"
                                loading="lazy"
                                className="w-full h-auto rounded-2xl shadow-xl object-cover relative z-10 aspect-[4/5]"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="absolute inset-0 border-2 border-white/10 rounded-2xl transform translate-x-3 translate-y-3 -z-10" />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="space-y-6 text-center md:text-left"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold font-display mb-3 text-white">
                                My Journey
                            </h3>
                            <p className="text-base text-gray-400 leading-relaxed">
                                I&apos;m a passionate Full-Stack Developer and Designer focused on creating
                                fast, scalable, and secure web products. I combine clean code with beautiful design
                                to deliver production-ready solutions that make a real impact.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h4 className="text-lg font-semibold mb-4 text-white">
                                Key Skills
                            </h4>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {[
                                    'Full-Stack Dev',
                                    'UI/UX Design',
                                    'API Integration',
                                    'Database Design',
                                    'CI/CD & DevOps',
                                    'Cloud Infrastructure',
                                ].map((item, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-primary-500/50 transition-colors duration-200 cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <Link
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-80}
                            >
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary"
                                >
                                    Let&apos;s Connect
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
