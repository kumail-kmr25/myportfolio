import { motion } from 'framer-motion';
import { FaBug, FaLock, FaDatabase, FaServer } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: <FaBug className="w-10 h-10 text-primary-500" />,
            title: 'Bug Fixing & Error Resolution',
            points: [
                'React / Node.js bugs',
                'Console & runtime errors',
                'API response & logic issues'
            ]
        },
        {
            icon: <FaLock className="w-10 h-10 text-primary-500" />,
            title: 'Authentication & Authorization',
            points: [
                'JWT auth setup',
                'Admin & user roles',
                'Secure login / signup flows'
            ]
        },
        {
            icon: <FaDatabase className="w-10 h-10 text-primary-500" />,
            title: 'Backend & API Development',
            points: [
                'REST APIs (Node + Express)',
                'MongoDB schema & query optimization',
                'API debugging & integration'
            ]
        },
        {
            icon: <FaServer className="w-10 h-10 text-primary-500" />,
            title: 'App Stabilization',
            points: [
                'Performance improvements',
                'Production issue fixes',
                'Deployment bug resolution'
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="services" className="py-16 md:py-24">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Outcome-Based Services
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle mx-auto">
                        Focused on fixing problems and delivering results, not just writing lines of code.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
                        >
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-6 font-display">
                                {service.title}
                            </h3>
                            <ul className="space-y-4">
                                {service.points.map((point, pIndex) => (
                                    <li key={pIndex} className="flex items-center gap-3 text-gray-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
