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
        { name: 'Case Studies', to: 'projects' },
        { name: 'About', to: 'about' },
        { name: 'Process', to: 'process' },
        { name: 'Tech Stack', to: 'skills' },
        { name: 'Connect', to: 'contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-[#050505]/80 backdrop-blur-lg border-b border-white/[0.05]'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    className="text-xl font-bold text-white tracking-tighter cursor-pointer flex items-center gap-2 group"
                >
                    Kumale Bhat
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer transition-colors duration-200 activeClass:text-white"
                            activeClass="!text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white p-2"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#050505] border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-12 flex flex-col space-y-8 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={600}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-gray-500 hover:text-white transition-colors"
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

