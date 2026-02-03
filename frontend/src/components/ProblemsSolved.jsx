import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaLock, FaServer, FaBug, FaTachometerAlt, FaRocket } from 'react-icons/fa';

const ProblemsSolved = () => {
    const problems = [
        {
            icon: <FaLock className="w-8 h-8 text-red-500" />,
            title: 'Authentication Issues',
            description: 'Login/signup not working, JWT session breaking, or role-based access control failing.'
        },
        {
            icon: <FaServer className="w-8 h-8 text-orange-500" />,
            title: 'API Failures',
            description: 'Backend APIs failing, returning incorrect errors, or disconnected from the frontend.'
        },
        {
            icon: <FaBug className="w-8 h-8 text-yellow-500" />,
            title: 'Application Crashes',
            description: 'React apps behaving unpredictably, crashing in production, or state management bugs.'
        },
        {
            icon: <FaTachometerAlt className="w-8 h-8 text-blue-500" />,
            title: 'Slow Performance',
            description: 'Huge database delays, slow loading times, or unoptimized code affecting user experience.'
        },
        {
            icon: <FaExclamationTriangle className="w-8 h-8 text-purple-500" />,
            title: 'Untested/Unstable Code',
            description: 'Half-finished features or spaghetti code that keeps breaking every time you update.'
        },
        {
            icon: <FaRocket className="w-8 h-8 text-green-500" />,
            title: 'Deployment Nightmares',
            description: 'Apps that work on your machine but break when deployed to production servers.'
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="problems" className="py-16 md:py-24 bg-dark-surface/30">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        Problems I Solve
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle mx-auto">
                        Instead of just manual labor, I focus on fixing the pain points that hold your business back.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 group"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">
                                {problem.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 rounded-2xl bg-primary-500/5 border border-primary-500/20 text-center"
                >
                    <p className="text-xl md:text-2xl font-medium text-white italic">
                        &quot;If your app is broken, unstable, or half-working — I can fix it.&quot;
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemsSolved;
