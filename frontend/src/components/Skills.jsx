import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = [
        {
            category: 'Frontend',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Vite'],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            category: 'Backend',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            technologies: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Middleware'],
            color: 'from-green-500 to-emerald-500',
        },
        {
            category: 'Databases',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            technologies: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Database Design', 'Query Optimization'],
            color: 'from-purple-500 to-pink-500',
        },
        {
            category: 'DevOps',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            technologies: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'AWS', 'GitHub Actions'],
            color: 'from-orange-500 to-red-500',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="skills"
            ref={ref}
            className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface"
        >
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Skills & Expertise
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        Technologies I work with to bring your ideas to life
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.2 },
                            }}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="card h-full relative overflow-hidden">
                                {/* Gradient Background on Hover */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.05 }}
                                    transition={{ duration: 0.3 }}
                                    className={`absolute inset-0 bg-gradient-to-br ${skill.color}`}
                                />

                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} text-white mb-6 relative z-10`}>
                                    {skill.icon}
                                </div>

                                {/* Category Title */}
                                <h3 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-gray-100 relative z-10">
                                    {skill.category}
                                </h3>

                                {/* Technologies */}
                                <ul className="space-y-2 relative z-10">
                                    {skill.technologies.map((tech, techIndex) => (
                                        <motion.li
                                            key={tech}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                                        >
                                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color}`} />
                                            {tech}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Hover Border Effect */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${skill.color} -z-10`}
                                    style={{ padding: '2px' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Skills Cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                        Other Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            'Git',
                            'GitHub',
                            'VS Code',
                            'Postman',
                            'Figma',
                            'Framer Motion',
                            'EmailJS',
                            'JWT',
                            'CORS',
                            'Validation',
                            'Responsive Design',
                            'SEO',
                            'Accessibility',
                        ].map((tool, index) => (
                            <motion.span
                                key={tool}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.7 + index * 0.03 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-6 py-3 bg-white dark:bg-dark-card rounded-full shadow-md hover:shadow-xl border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 cursor-default"
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
