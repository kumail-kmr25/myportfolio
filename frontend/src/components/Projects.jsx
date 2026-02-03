import { motion } from 'framer-motion';
import authImage from '../assets/projects/auth-dashboard.png';
import recoveryImage from '../assets/projects/app-recovery.png';

const Projects = () => {
    const projects = [
        {
            title: 'Full-Stack Auth Dashboard',
            problem: 'Users couldn’t log in and sessions were breaking, leading to high drop-off rates.',
            solution: 'Implemented robust JWT authentication with secure HttpOnly cookies and fixed backend session logic.',
            result: '100% stable authentication flow and a secure, role-based admin dashboard.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB'],
            github: 'https://github.com/kumail-kmr25/saas-platform',
            live: 'https://saas-demo.example.com',
            gradient: 'from-blue-600 to-purple-600',
            image: authImage
        },
        {
            title: 'Bug Fix & App Recovery',
            problem: 'React app crashing frequently due to unhandled API errors and race conditions in state management.',
            solution: 'Refactored API layer with proper error boundaries and optimized state updates using clean React patterns.',
            result: 'Eliminated 95% of production crashes and improved initial load time by 40%.',
            tech: ['React', 'Node.js', 'Axios', 'Context API'],
            github: 'https://github.com/kumail-kmr25/mern-admin',
            live: 'https://mern-app.example.com',
            gradient: 'from-green-600 to-teal-600',
            image: recoveryImage
        }
    ];

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
        <section id="projects" className="py-10 md:py-16 bg-transparent">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Featured Projects
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle">
                        High-end production-ready applications
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={itemVariants}
                            transition={{ delay: index * 0.1 }}
                            className="card group flex flex-col h-full"
                        >
                            {/* Project Image */}
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-6 bg-gray-800 border border-white/5">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay`} />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h3>

                                <div className="space-y-4 mb-6 flex-grow">
                                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                                        <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Problem</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-primary-500/5 border border-primary-500/10">
                                        <p className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-1">What I Fixed</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                        <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Result</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{project.result}</p>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 mt-auto">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 btn-secondary text-sm py-3 px-4"
                                    >
                                        GitHub
                                    </a>
                                    {project.live !== '#' && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 btn-primary text-sm py-3 px-4"
                                        >
                                            Live Demo
                                        </a>
                                    )}
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
