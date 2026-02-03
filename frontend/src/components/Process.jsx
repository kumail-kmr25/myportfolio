import { motion } from 'framer-motion';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Diagnostic Audit',
            description: 'A deep dive into your existing codebase to trace the origin of instability and security gaps.'
        },
        {
            number: '02',
            title: 'Intervention',
            description: 'Surgical code fixes and refactoring focused on immediate stabilization and long-term health.'
        },
        {
            number: '03',
            title: 'Validation',
            description: 'Rigorous testing and end-to-end site verification to ensure 100% bug-free delivery.'
        },
        {
            number: '04',
            title: 'Deployment',
            description: 'Controlled production launch with monitoring to guarantee absolute system reliability.'
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
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="process" className="bg-transparent">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-20"
                >
                    <h2 className="section-title">The Stabilization Process</h2>
                    <p className="section-subtitle">A controlled, methodical approach to taking your application from broken to production-grade.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-300"
                        >
                            <span className="block text-xs font-bold text-gray-600 mb-6 tracking-widest uppercase">
                                Step {step.number}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-4">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
