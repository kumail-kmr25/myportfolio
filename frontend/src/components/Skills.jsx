import { motion } from 'framer-motion';

const Skills = () => {
    const coreStack = [
        'React', 'Node.js', 'MongoDB', 'JWT', 'REST APIs',
        'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section id="skills" className="py-24 bg-transparent border-y border-white/[0.05]">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center"
                >
                    <motion.h2 variants={itemVariants} className="text-lg font-bold uppercase tracking-[0.2em] text-gray-500 mb-12">
                        Core Technology Stack
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto"
                    >
                        {coreStack.map((skill, index) => (
                            <motion.span
                                key={index}
                                variants={itemVariants}
                                className="text-2xl md:text-3xl font-bold text-white/20 hover:text-white transition-colors duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
