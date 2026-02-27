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
    FileText,
    ArrowRight
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

    const premiumEase = [0.16, 1, 0.3, 1];

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
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? "py-4 bg-[#020202]/40 backdrop-blur-3xl border-b border-white/[0.05]" : "py-8 bg-transparent"}`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group relative z-10"
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: premiumEase as any }}
                        className="text-2xl font-black tracking-tighter text-white"
                    >
                        KUMAIL <span className="text-blue-500 italic">KMR</span>
                    </motion.span>
                    <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"
                        transition={{ duration: 0.5, ease: premiumEase as any }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] p-1.5 rounded-full backdrop-blur-2xl">
                    {dynamicLinks.map((link, index) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <Link
                                key={link.name}
                                href={link.isCTA ? "#" : link.href}
                                target={link.isExternal ? "_blank" : undefined}
                                rel={link.isExternal ? "noopener noreferrer" : undefined}
                                onClick={(e) => {
                                    if (link.isCTA) {
                                        e.preventDefault();
                                        openModal();
                                    }
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10
                                    ${link.isCTA
                                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-500/20 ml-2 overflow-hidden group/cta"
                                        : isActive ? "text-white" : "text-gray-500 hover:text-white"}`}
                            >
                                <span className="relative z-10">
                                    {link.name}
                                    {isActive && !link.isCTA && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </span>
                                {hoveredIndex === index && !link.isCTA && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                {link.isCTA && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 -z-10" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none p-3 hover:bg-white/5 rounded-2xl transition-all active:scale-95"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.6, ease: premiumEase as any }}
                        className="md:hidden absolute top-full left-0 w-full glass-effect border-b border-white/[0.05] overflow-hidden shadow-2xl bg-[#020202]/95 backdrop-blur-3xl"
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                            className="flex flex-col p-10 space-y-8"
                        >
                            {dynamicLinks.map((link) => (
                                <motion.div
                                    key={link.name}
                                    variants={{
                                        open: { opacity: 1, x: 0, filter: "blur(0px)" },
                                        closed: { opacity: 0, x: -20, filter: "blur(10px)" }
                                    }}
                                    transition={{ duration: 0.5, ease: premiumEase as any }}
                                >
                                    <Link
                                        href={link.isCTA ? "#" : link.href}
                                        target={link.isExternal ? "_blank" : undefined}
                                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                                        className={`text-3xl font-black tracking-tighter uppercase flex items-center justify-between group
                                            ${link.isCTA ? "text-blue-500 pt-8 border-t border-white/[0.05] w-full" : "text-white"}`}
                                        onClick={(e) => {
                                            if (link.isCTA) {
                                                e.preventDefault();
                                                openModal();
                                            }
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span className="group-hover:translate-x-3 transition-transform duration-500 flex items-center gap-4">
                                            {link.isExternal && <FileText size={24} className="text-blue-500" />}
                                            {link.name}
                                        </span>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight size={24} className="text-blue-500/50" />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
