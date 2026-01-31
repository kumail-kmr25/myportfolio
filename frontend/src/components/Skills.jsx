import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker, FaAws, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiTypescript } from 'react-icons/si';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = [
        { name: 'HTML5', icon: <FaHtml5 className="w-12 h-12" />, color: 'text-orange-500' },
        { name: 'CSS3', icon: <FaCss3Alt className="w-12 h-12" />, color: 'text-blue-500' },
        { name: 'JavaScript', icon: <FaJs className="w-12 h-12" />, color: 'text-yellow-400' },
        { name: 'TypeScript', icon: <SiTypescript className="w-12 h-12" />, color: 'text-blue-600' },
        { name: 'React', icon: <FaReact className="w-12 h-12" />, color: 'text-cyan-400' },
        { name: 'Next.js', icon: <SiNextdotjs className="w-12 h-12" />, color: 'text-white' },
        { name: 'Tailwind', icon: <SiTailwindcss className="w-12 h-12" />, color: 'text-cyan-300' },
        { name: 'Node.js', icon: <FaNodeJs className="w-12 h-12" />, color: 'text-green-500' },
        { name: 'MongoDB', icon: <SiMongodb className="w-12 h-12" />, color: 'text-green-400' },
        { name: 'PostgreSQL', icon: <SiPostgresql className="w-12 h-12" />, color: 'text-blue-400' },
        { name: 'Docker', icon: <FaDocker className="w-12 h-12" />, color: 'text-blue-500' },
        { name: 'AWS', icon: <FaAws className="w-12 h-12" />, color: 'text-orange-400' },
        { name: 'GitHub', icon: <FaGithub className="w-12 h-12" />, color: 'text-white' },
        { name: 'Figma', icon: <FaFigma className="w-12 h-12" />, color: 'text-pink-500' },
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
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <section
            id="skills"
            ref={ref}
            className="py-20 bg-transparent"
        >
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-title">
                        Skills
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-subtitle">
                        My Technical Arsenal
                    </motion.p>
                </motion.div>

                <div className="relative overflow-hidden py-10">
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030014] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030014] to-transparent z-10" />

                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{
                            x: [0, -1920],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Triplicate the skills list to ensure seamless looping */}
                        {[...skills, ...skills, ...skills].map((skill, index) => (
                            <div
                                key={`${skill.name}-${index}`}
                                className="flex flex-col items-center gap-4 group cursor-pointer"
                            >
                                <div className={`p-6 glass-effect rounded-2xl group-hover:bg-white/10 transition-colors duration-300 ${skill.color} shadow-lg group-hover:shadow-${skill.color}/50 transform group-hover:-translate-y-2 transition-transform`}>
                                    <div className="w-12 h-12">
                                        {skill.icon}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
