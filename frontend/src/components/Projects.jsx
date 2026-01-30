import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            title: 'Enterprise SaaS Platform',
            description: 'A comprehensive SaaS platform featuring user authentication, role-based access control, interactive dashboards, and integrated payment processing with Stripe. Built with scalability and security in mind.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Docker'],
            github: 'https://github.com/kumail-kmr25/saas-platform',
            live: 'https://saas-demo.example.com',
            gradient: 'from-blue-600 to-purple-600',
            features: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'Analytics'],
        },
        {
            title: 'Full-Stack MERN Application',
            description: 'Complete MERN stack application with advanced admin panel, real-time notifications, data visualization, and comprehensive CRUD operations. Features modern UI/UX with responsive design.',
            tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'Chart.js'],
            github: 'https://github.com/kumail-kmr25/mern-admin',
            live: 'https://mern-app.example.com',
            gradient: 'from-green-600 to-teal-600',
            features: ['Real-time Updates', 'Data Visualization', 'CRUD Operations', 'User Management'],
        },
        {
            title: 'CI/CD DevOps Pipeline',
            description: 'Automated DevOps infrastructure with containerized deployment, continuous integration/delivery, monitoring, and automated testing. Demonstrates production-grade deployment practices.',
            tech: ['Docker', 'GitHub Actions', 'Nginx', 'AWS', 'Linux', 'PostgreSQL'],
            github: 'https://github.com/kumail-kmr25/devops-pipeline',
            live: '#',
            gradient: 'from-orange-600 to-red-600',
            features: ['Auto Deployment', 'Container Orchestration', 'Monitoring', 'Load Balancing'],
        },
        {
            title: 'Scalable E-Commerce Platform',
            description: 'Modern e-commerce platform with product management, shopping cart, order processing, and admin analytics. Features include payment integration, inventory management, and user reviews.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind', 'AWS S3'],
            github: 'https://github.com/kumail-kmr25/ecommerce',
            live: 'https://shop.example.com',
            gradient: 'from-pink-600 to-purple-600',
            features: ['Shopping Cart', 'Payment Gateway', 'Inventory System', 'User Reviews'],
        },
    ];

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

    return (
        <section
            id="projects"
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
                        Featured Projects
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        High-end, production-ready applications showcasing my expertise
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="card group overflow-hidden"
                        >
                            {/* Header with Gradient */}
                            <div className={`h-2 bg-gradient-to-r ${project.gradient} mb-6`} />

                            {/* Title */}
                            <h3 className="text-2xl font-bold font-display mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Key Features:
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {project.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-dark-border"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </motion.a>
                                {project.live !== '#' && (
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-medium`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Demo
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        Want to see more? Check out my GitHub for additional projects and contributions.
                    </p>
                    <motion.a
                        href="https://github.com/kumail-kmr25"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 btn-primary"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View All Projects on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
