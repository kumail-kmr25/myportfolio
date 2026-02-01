import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Testimonials', to: 'testimonials' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-dark-bg/95 backdrop-blur-md border-b border-white/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-1 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group cursor-pointer"
                        >
                            <Link
                                to="home"
                                smooth={true}
                                duration={500}
                                className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-bold rounded-full group bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all duration-300 logo-button"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary-500 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-display tracking-tight logo-shine font-extrabold">
                                        Kumale
                                    </span>
                                    <div className="flex items-center justify-center">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
                                activeClass="text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger Menu Button (Mobile/Tablet) */}
                    <div className="lg:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            <motion.div
                                animate={isMobileMenuOpen ? "open" : "closed"}
                                className="w-6 h-6 flex flex-col justify-center items-center"
                            >
                                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-0 right-0 bg-dark-bg border-b border-white/10 lg:hidden shadow-2xl"
                    >
                        <div className="px-5 py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={500}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-2xl font-display font-medium text-white hover:text-primary-500 transition-colors py-2 border-b border-white/5 last:border-0"
                                    activeClass="text-primary-500"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

