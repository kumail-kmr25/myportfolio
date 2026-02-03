import { motion } from 'framer-motion';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Audit & Analysis',
            description: 'You explain the issue, and I analyze the codebase to confirm the root cause and the best solution.'
        },
        {
            number: '02',
            title: 'Fix & Refactor',
            description: 'I fix the bug or build the feature using clean, maintainable code following industry best practices.'
        },
        {
            number: '03',
            title: 'Test & Validate',
            description: 'You test the solution in a staging environment to ensure everything works exactly as expected.'
        },
        {
            number: '04',
            title: 'Deliver & Support',
            description: 'I push to production and offer optional post-delivery support to ensure long-term stability.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="process" className="py-16 md:py-24 bg-dark-surface/30">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        A Simple Process
                    </motion.h2>
                    <motion.p variants={itemVariants} className="section-subtitle mx-auto">
                        No confusion. No overcomplication. Just a clear path from problem to solution.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <span className="absolute -top-4 -left-4 text-6xl font-black text-white/5 group-hover:text-primary-500/10 transition-colors">
                                {step.number}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-4 font-display relative z-10">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
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
