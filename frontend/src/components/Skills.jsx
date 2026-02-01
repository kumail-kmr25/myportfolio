import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker, FaAws, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiTypescript } from 'react-icons/si';

const Skills = () => {
    const skills = [
        { name: 'HTML5', icon: <FaHtml5 className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-orange-500' },
        { name: 'CSS3', icon: <FaCss3Alt className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-blue-500' },
        { name: 'JavaScript', icon: <FaJs className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-yellow-400' },
        { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-blue-600' },
        { name: 'React', icon: <FaReact className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-cyan-400' },
        { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-white' },
        { name: 'Tailwind', icon: <SiTailwindcss className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-cyan-300' },
        { name: 'Node.js', icon: <FaNodeJs className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-green-500' },
        { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-green-400' },
        { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-blue-400' },
        { name: 'Docker', icon: <FaDocker className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-blue-500' },
        { name: 'AWS', icon: <FaAws className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-orange-400' },
        { name: 'GitHub', icon: <FaGithub className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-white' },
        { name: 'Figma', icon: <FaFigma className="w-8 h-8 md:w-10 md:h-10" />, color: 'text-pink-500' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
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
        <section id="skills" className="py-10 md:py-16 bg-transparent border-t border-white/5">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-title">
                        Skills & Technologies
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="section-subtitle">
                        The tools I use to bring ideas to life
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6 justify-items-center"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 w-full group cursor-default"
                            >
                                <div className={`${skill.color} transition-transform duration-300 group-hover:scale-110 drop-shadow-lg`}>
                                    {skill.icon}
                                </div>
                                <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
