import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: 'SaaS Authentication Recovery',
            problem: 'Critical session breaking was causing 40% user drop-off during checkout.',
            solution: [
                'Refactored JWT implementation with secure HttpOnly cookies',
                'Fixed race conditions in backend session management',
                'Implemented robust role-based access control'
            ],
            result: '100% stable authentication and zero reported session drops since deployment.',
            tech: ['React', 'Node.js', 'MongoDB', 'JWT']
        },
        {
            title: 'Inventory System Stabilization',
            problem: 'Legacy React application crashing frequently due to unhandled API failures.',
            solution: [
                'Implemented global Error Boundaries and API interceptors',
                'Refactored state management to eliminate memory leaks',
                'Optimized database queries for 3x faster response times'
            ],
            result: 'Zero production crashes and 60% reduction in server load.',
            tech: ['React', 'Express', 'PostgreSQL', 'Redux']
        },
        {
            title: 'E-commerce API Optimization',
            problem: 'Slow API response times leading to abandoned carts and poor SEO ranking.',
            solution: [
                'Implemented redis caching for high-traffic endpoints',
                'Database schema restructuring for optimized lookups',
                'Payload minification and compression strategy'
            ],
            result: '95+ Google Lighthouse score and 2.1s improvement in TTI.',
            tech: ['Node.js', 'Redis', 'MongoDB', 'Nginx']
        }
    ];

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
        <section id="projects" className="bg-transparent border-t border-white/[0.05]">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-20"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Case Studies
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        A selection of high-impact fixes and production systems I&apos;ve stabilized.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={itemVariants}
                            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 border-b border-white/[0.05] last:border-0"
                        >
                            <div className="space-y-8">
                                <h3 className="text-3xl font-bold text-white group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Problem</p>
                                        <p className="text-gray-300 text-lg leading-relaxed">{project.problem}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Fixes Applied</p>
                                        <ul className="space-y-2">
                                            {project.solution.map((step, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-400">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                                                    {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Impact</p>
                                        <p className="text-white font-medium">{project.result}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-400 rounded-full border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden lg:block aspect-video bg-white/[0.02] rounded-3xl border border-white/[0.05] overflow-hidden">
                                {/* Visual representation or clean placeholder */}
                                <div className="w-full h-full flex items-center justify-center text-white/5 text-8xl font-bold tracking-tighter">
                                    0{index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
