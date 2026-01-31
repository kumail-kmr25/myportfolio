import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/kumail-kmr25" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/kumale-ali-bhat" },
        { icon: <FaTwitter />, href: "https://x.com/KumailKmr" }
    ];

    return (
        <footer className="border-t border-white/5 bg-black/50 backdrop-blur-md pt-16 pb-8">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-display text-white">
                            Kumale Ali Bhat
                        </h3>
                        <p className="text-gray-400 max-w-xs leading-relaxed">
                            Full-Stack Developer turning complex problems into elegant solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-400 hover:text-primary-500 transition-colors duration-200 block w-fit"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300"
                                >
                                    <span className="text-xl">
                                        {social.icon}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Kumale Ali Bhat. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
