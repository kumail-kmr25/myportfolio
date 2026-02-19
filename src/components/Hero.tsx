import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
                {/* Placeholder for the generated image */}
                <div className="w-full h-full bg-[url('/hero_background.svg')] bg-cover bg-center opacity-50" />
            </div>

            <div className="section-container relative z-10 text-center">
                <h1 className="text-5xl md:text-8xl font-bold font-display text-white mb-6 tracking-tighter animate-fade-in-up">
                    Kumail Kmr
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                    Full Stack Developer | DevOps Engineer | UI/UX Designer
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link href="#contact" className="btn-primary group">
                        Contact Me
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="#projects" className="btn-secondary">
                        View Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
