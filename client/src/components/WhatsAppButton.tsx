"use client";

import { MessageCircle } from "lucide-react";
import { m } from "framer-motion";

export default function WhatsAppButton() {
    const phoneNumber = "916006121193";
    const message = encodeURIComponent("Hi Kumail, I'd like to discuss a project.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-8 z-[100]"
        >
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center"
            >
                {/* Pulsing Ring */}
                <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                
                {/* Glassmorphism Button */}
                <div className="relative w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <MessageCircle size={32} />
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        <p className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                            Chat on WhatsApp
                        </p>
                    </div>
                </div>
            </a>
        </m.div>
    );
}
