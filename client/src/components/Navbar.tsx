"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    CheckSquare,
    BarChart3,
    Activity,
    LogOut,
    Menu,
    X,
    Briefcase,
    Settings,
    FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHireModal } from "@/context/HireModalContext";
import { LiveStatusBadge } from "@/components/LiveStatusBadge";
import { getApiUrl } from "@/lib/api";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface NavLink {
    name: string;
    href: string;
    isCTA?: boolean;
    isExternal?: boolean;
}

const navLinks: NavLink[] = [
    { name: "Projects", href: "#projects" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Hire Me", href: "#contact", isCTA: true },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const { openModal } = useHireModal();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch(getApiUrl("/api/resume"));
                if (res.ok) {
                    const data = await res.json();
                    setResumeUrl(data.url);
                }
            } catch (err) {
                // Silently ignore
            }
        };
        fetchResume();
    }, []);

    const dynamicLinks: NavLink[] = [
        ...navLinks.filter(l => !l.isCTA),
        ...(resumeUrl ? [{ name: "Resume", href: resumeUrl, isExternal: true }] : []),
        ...navLinks.filter(l => l.isCTA)
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach(link => {
            if (link.href.startsWith("#")) {
                const section = document.getElementById(link.href.substring(1));
                if (section) observer.observe(section);
            }
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
                ? "bg-black/60 backdrop-blur-xl py-3 border-b border-white/[0.08] shadow-2xl"
                : "bg-transparent py-6 border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white group flex items-center gap-4">
                        <motion.span
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="bg-white text-black w-11 h-11 flex items-center justify-center rounded-xl font-black text-2xl"
                        >
                            K
                        </motion.span>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold leading-tight tracking-tight uppercase">Kumail KMR</span>
                            <LiveStatusBadge variant="navbar" />
                        </div>
                    </Link>
                </div>

                <div className="hidden md:flex items-center relative bg-white/[0.03] border border-white/[0.05] p-1 rounded-full backdrop-blur-md">
                    {dynamicLinks.map((link, index) => {
                        const isActive = activeSection === link.href.substring(1);
                        if (link.isExternal) {
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.05em] transition-all relative z-10 text-blue-400 hover:text-blue-300 flex items-center gap-2"
                                >
                                    <FileText size={12} />
                                    {link.name}
                                </a>
                            );
                        }
                        return (
                            <Link
                                key={link.name}
                                href={link.isCTA ? "#" : link.href}
                                onClick={(e) => {
                                    if (link.isCTA) {
                                        e.preventDefault();
                                        openModal();
                                    }
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.05em] transition-all relative z-10 hover:-translate-y-0.5
                                    ${link.isCTA
                                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] ml-2 scale-100 hover:scale-[1.03] !translate-y-0"
                                        : isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                <span className="relative">
                                    {link.name}
                                    {isActive && !link.isCTA && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                                        />
                                    )}
                                </span>
                                {hoveredIndex === index && !link.isCTA && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none p-2 hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full glass-effect border-b border-white/5 overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-8 space-y-6">
                            {dynamicLinks.map((link, i) => {
                                if (link.isExternal) {
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-2xl font-bold tracking-tight text-blue-500 flex items-center gap-2"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <FileText size={20} />
                                                {link.name}
                                            </a>
                                        </motion.div>
                                    );
                                }
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.isCTA ? "#" : link.href}
                                            className={`text-2xl font-bold tracking-tight ${link.isCTA ? "text-blue-500 pt-4 border-t border-white/5 w-full block" : "text-gray-300"}`}
                                            onClick={(e) => {
                                                if (link.isCTA) {
                                                    e.preventDefault();
                                                    openModal();
                                                }
                                                setIsOpen(false);
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
