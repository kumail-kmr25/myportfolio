import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: 'Enterprise SaaS Platform',
            description: 'A comprehensive SaaS platform featuring user authentication, role-based access control, interactive dashboards, and integrated payment processing with Stripe.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: 'https://github.com/kumail-kmr25/saas-platform',
            live: 'https://saas-demo.example.com',
            gradient: 'from-blue-600 to-purple-600',
            features: ['User Authentication', 'Payment Integration', 'Admin Dashboard'],
            image: '/assets/projects/saas-dashboard.png'
        },
        {
            title: 'Full-Stack MERN Application',
            description: 'Complete MERN stack application with advanced admin panel, real-time notifications, data visualization, and comprehensive CRUD operations.',
            tech: ['MongoDB', 'Express', 'React', 'Node.js'],
            github: 'https://github.com/kumail-kmr25/mern-admin',
            live: 'https://mern-app.example.com',
            gradient: 'from-green-600 to-teal-600',
            features: ['Real-time Updates', 'Data Visualization', 'CRUD Operations'],
            image: '/assets/projects/mern-admin.png'
        },
        {
            title: 'CI/CD DevOps Pipeline',
            description: 'Automated DevOps infrastructure with containerized deployment, continuous integration/delivery, monitoring, and automated testing.',
            tech: ['Docker', 'GitHub Actions', 'AWS'],
            github: 'https://github.com/kumail-kmr25/devops-pipeline',
            live: '#',
            gradient: 'from-orange-600 to-red-600',
            features: ['Auto Deployment', 'Container Orchestration', 'Monitoring'],
            image: '/assets/projects/devops-pipeline.png'
        },
        {
            title: 'Scalable E-Commerce Platform',
            description: 'Modern e-commerce platform with product management, shopping cart, order processing, and admin analytics.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
            github: 'https://github.com/kumail-kmr25/ecommerce',
            live: 'https://shop.example.com',
            gradient: 'from-pink-600 to-purple-600',
            features: ['Shopping Cart', 'Payment Gateway', 'Inventory System'],
            image: '/assets/projects/ecommerce-store.png'
        },
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
        <section id="projects" className="py-16 md:py-24 bg-transparent">
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
                                <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-6 flex-grow">
                                    {project.description}
                                </p>

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
