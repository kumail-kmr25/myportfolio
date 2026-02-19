import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/10 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold font-display text-white mb-2">Kumail Kmr</h2>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Kumail Kmr. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={24} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter size={24} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Instagram size={24} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
