import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiPostgresql, SiTypescript, SiNextdotjs, SiTailwindcss, SiPrisma } from 'react-icons/si';
import aboutImage from '../assets/images/about-image.jpg';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
    };

    const techStack = [
        { Icon: FaReact, color: '#61DAFB' },
        { Icon: SiNextdotjs, color: '#ffffff' },
        { Icon: FaNodeJs, color: '#339933' },
        { Icon: SiExpress, color: '#ffffff' },
        { Icon: SiMongodb, color: '#47A248' },
        { Icon: SiPostgresql, color: '#4169E1' },
        { Icon: SiTypescript, color: '#3178C6' },
        { Icon: SiTailwindcss, color: '#06B6D4' },
        { Icon: SiPrisma, color: '#ffffff' },
        { Icon: FaDocker, color: '#2496ED' },
        { Icon: FaAws, color: '#FF9900' },
        { Icon: FaGitAlt, color: '#F05032' },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left Column: Image & Quick Stats */}
                    <motion.div variants={itemVariants} className="relative group mx-auto lg:mx-0">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-500 blur-lg" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={aboutImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h2 className="section-title text-left">Kumale Ali Bhat</h2>
                            <h3 className="text-2xl font-bold text-white">From Hello World to Production</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                My journey began with a simple curiosity about how websites worked. That curiosity quickly turned into a passion for building.
                                Starting with the fundamentals of HTML & CSS, I dived deep into JavaScript and the modern web ecosystem.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Today, I specialize in the MERN stack and cloud architectures. I love solving complex problems, whether it's optimizing
                                database queries or creating butter-smooth UI animations. My goal is to build software that is not just functional,
                                but exceptional.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500">Tech Arsenal</h3>
                            <div className="flex flex-wrap gap-6">
                                {techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                                            <tech.Icon
                                                size={32}
                                                style={{ color: tech.color }}
                                                className="filter drop-shadow-lg"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <Link
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-80}
                            >
                                <button className="btn-primary">
                                    Let's collaborate
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
