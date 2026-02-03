import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
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
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="home"
            className="flex items-center min-h-[80vh] pt-32 pb-16"
        >
            <div className="section-container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] mb-8 text-white tracking-tight"
                    >
                        I Fix Broken Web Apps & Build <span className="block text-gray-500">Secure, Production-Ready Systems</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl font-medium text-gray-400 mb-12 max-w-2xl leading-relaxed"
                    >
                        React &middot; Node.js &middot; MongoDB &middot; JWT Authentication &middot; App Stabilization
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-6"
                    >
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
                        <Link
                            to="projects"
                            smooth={true}
                            duration={500}
                            offset={-80}
                        >
                            <button className="btn-secondary">
                                View Projects
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
