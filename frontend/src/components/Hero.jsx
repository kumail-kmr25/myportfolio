import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import heroImage from '../assets/images/about-image.jpg';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="home"
            className="flex items-center justify-center relative pt-24 pb-12 lg:min-h-screen"
        >
            <div className="section-container relative z-10">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left flex flex-col items-center lg:items-start"
                    >
                        <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
                            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary-500/10 text-primary-500 border border-primary-500/20 rounded-full text-xs md:text-sm font-semibold mb-4 tracking-wide">
                                Welcome to my portfolio
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-4">
                                Hi, I'm{' '}
                                <span className="text-gradient block mt-1">Kumale Ali Bhat</span>
                            </h1>
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-xl md:text-2xl font-medium text-gray-300 mb-6 max-w-lg"
                        >
                            Full-Stack Developer | Designer | DevOps
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-gray-400 mb-8 max-w-xl leading-relaxed"
                        >
                            Turning ideas into fast, scalable, and secure web products.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="projects"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="w-full sm:w-auto"
                            >
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    View Projects
                                </motion.button>
                            </Link>
                            <Link
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="w-full sm:w-auto"
                            >
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-secondary w-full sm:w-auto"
                                >
                                    Contact Me
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex gap-5 mt-8"
                        >
                            {[
                                { href: "https://github.com/kumail-kmr25", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                                { href: "https://www.linkedin.com/in/kumale-ali-bhat", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                                { href: "https://x.com/KumailKmr", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, color: "#00f0ff" }}
                                    className="text-gray-400 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Image */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex justify-center items-center w-full"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-2xl transform scale-95" />
                            <motion.img
                                src={heroImage}
                                alt="Kumale Ali Bhat"
                                loading="eager"
                                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-2xl object-cover border-2 border-primary-500/30 ring-4 ring-white/5"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
