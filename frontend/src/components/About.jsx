import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import aboutImage from '../assets/images/about-image.jpg';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="about"
            ref={ref}
            className="py-20 bg-white dark:bg-dark-bg"
        >
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        About Me
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Passionate about building exceptional digital experiences
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={imageVariants}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-500/20 rounded-3xl -z-10" />
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-500/20 rounded-3xl -z-10" />

                            <motion.img
                                src={aboutImage}
                                alt="Kumale Ali Bhat - About"
                                loading="lazy"
                                className="w-full max-w-md h-auto rounded-3xl shadow-2xl object-cover relative z-10"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="space-y-6"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-3xl font-bold font-display mb-4 text-gray-900 dark:text-gray-100">
                                My Journey into Web Development
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                I'm a passionate Full-Stack Developer, Web Designer, and DevOps Engineer with a strong focus on creating
                                fast, scalable, and secure web products. My journey in tech started with a curiosity for how websites work,
                                and it has evolved into a deep commitment to building exceptional digital experiences.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                I specialize in modern web technologies including React, Node.js, and cloud infrastructure. My approach
                                combines clean code, beautiful design, and robust DevOps practices to deliver production-ready solutions
                                that make a real impact.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                When I'm not coding, I'm constantly learning new technologies, contributing to open-source projects,
                                and exploring ways to optimize development workflows. I believe in continuous improvement and staying
                                at the forefront of web development trends.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                What I Bring to the Table:
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    'Full-stack development with modern frameworks',
                                    'Responsive and accessible UI/UX design',
                                    'RESTful API development and integration',
                                    'Database design and optimization',
                                    'CI/CD pipelines and DevOps automation',
                                    'Cloud deployment and infrastructure management',
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-3"
                                    >
                                        <svg
                                            className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-6">
                            <motion.a
                                href="/resume.pdf"
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 btn-primary"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download Resume
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
