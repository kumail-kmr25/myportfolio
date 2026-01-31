import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    const projects = [
        {
            title: 'Enterprise SaaS Platform',
            description: 'A comprehensive SaaS platform featuring user authentication, role-based access control, interactive dashboards, and integrated payment processing with Stripe. Built with scalability and security in mind.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Docker'],
            github: 'https://github.com/kumail-kmr25/saas-platform',
            live: 'https://saas-demo.example.com',
            gradient: 'from-blue-600 to-purple-600',
            features: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'Analytics'],
            image: '/assets/projects/saas-dashboard.png'
        },
        {
            title: 'Full-Stack MERN Application',
            description: 'Complete MERN stack application with advanced admin panel, real-time notifications, data visualization, and comprehensive CRUD operations. Features modern UI/UX with responsive design.',
            tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'Chart.js'],
            github: 'https://github.com/kumail-kmr25/mern-admin',
            live: 'https://mern-app.example.com',
            gradient: 'from-green-600 to-teal-600',
            features: ['Real-time Updates', 'Data Visualization', 'CRUD Operations', 'User Management'],
            image: '/assets/projects/mern-admin.png'
        },
        {
            title: 'CI/CD DevOps Pipeline',
            description: 'Automated DevOps infrastructure with containerized deployment, continuous integration/delivery, monitoring, and automated testing. Demonstrates production-grade deployment practices.',
            tech: ['Docker', 'GitHub Actions', 'Nginx', 'AWS', 'Linux', 'PostgreSQL'],
            github: 'https://github.com/kumail-kmr25/devops-pipeline',
            live: '#',
            gradient: 'from-orange-600 to-red-600',
            features: ['Auto Deployment', 'Container Orchestration', 'Monitoring', 'Load Balancing'],
            image: '/assets/projects/devops-pipeline.png'
        },
        {
            title: 'Scalable E-Commerce Platform',
            description: 'Modern e-commerce platform with product management, shopping cart, order processing, and admin analytics. Features include payment integration, inventory management, and user reviews.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind', 'AWS S3'],
            github: 'https://github.com/kumail-kmr25/ecommerce',
            live: 'https://shop.example.com',
            gradient: 'from-pink-600 to-purple-600',
            features: ['Shopping Cart', 'Payment Gateway', 'Inventory System', 'User Reviews'],
            image: '/assets/projects/ecommerce-store.png'
        },
    ];

    return (
        <section id="projects" className="bg-black relative">
            <div className="py-20 text-center">
                <h2 className="section-title">
                    Featured Projects
                </h2>
                <p className="section-subtitle">
                    High-end, production-ready applications showcasing my expertise
                </p>
            </div>

            <div ref={ref} className="relative">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        total={projects.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            <div className="h-[20vh]" /> {/* Spacer */}
        </section>
    );
};

const ProjectCard = ({ project, index, total, scrollYProgress }) => {
    // Calculate the target position for this card to "stick"
    // We want each card to take up a portion of the scroll
    const step = 1 / total;
    const start = index * step;
    const end = start + step;

    const opacity = useTransform(scrollYProgress,
        [start, start + 0.1, end - 0.1, end],
        [0, 1, 1, 0]
    );

    const scale = useTransform(scrollYProgress,
        [start, start + 0.1, end - 0.1, end],
        [0.8, 1, 1, 0.8]
    );

    const x = useTransform(scrollYProgress,
        [start, end],
        ['10%', '-10%'] // Parallax effect
    );

    return (
        <motion.div
            className="h-screen sticky top-0 flex items-center justify-center overflow-hidden"
            style={{ opacity }}
        >
            <div className="section-container relative w-full h-full flex flex-col md:flex-row items-center gap-12">
                {/* Content Side */}
                <div className="w-full md:w-1/2 z-10 bg-black/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <div className={`h-1 w-20 bg-gradient-to-r ${project.gradient} mb-6`} />
                    <h3 className="text-4xl font-bold font-display mb-4 text-white">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                        {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {project.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-primary-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        {project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-${project.gradient.split(' ')[1].replace('to-', '')}/50`}>
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Visual Side */}
                <motion.div
                    className="w-full md:w-1/2 perspective-1000"
                    style={{ scale }}
                >
                    <motion.div
                        className="relative w-full aspect-video rounded-xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden preserve-3d transform-gpu"
                        style={{
                            rotateY: -15,
                            rotateX: 10,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                        initial={{ rotateY: -15, rotateX: 10 }}
                        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
                        transition={{ spring: { stiffness: 300, damping: 20 } }}
                    >
                        {/* Glossy reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />

                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Background glow for each project */}
            <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-5 blur-[100px] pointer-events-none`} />
        </motion.div>
    );
};

export default Projects;
