"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    Bot, 
    X, 
    Send, 
    MessageSquare, 
    Minimize2,
    User,
    Loader2
} from "lucide-react";
import { useFeatures } from "@/lib/features";
import { useHydrated } from "@/lib/hooks/useHydrated";

interface Message {
    role: "assistant" | "user";
    content: string;
    timestamp: Date;
}

export default function AIChatAssistant() {
    const { isEnabled, getConfig } = useFeatures();
    const hydrated = useHydrated();
    const config = getConfig("ai-chat");
    const enabled = isEnabled("ai-chat");

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize with welcome message
    useEffect(() => {
        if (enabled && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content: config.welcomeMessage || "Hi! I'm Kumail KMR's AI assistant. How can I help you build something amazing today?",
                    timestamp: new Date()
                }
            ]);
        }
    }, [enabled, messages.length, config.welcomeMessage]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    if (!enabled || !hydrated) return null;

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/features/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: input,
                    history: (messages || []).slice(-5) 
                })
            });
            const data = await res.json();
            
            if (data.success) {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: data.data.content,
                    timestamp: new Date()
                }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "I'm having a bit of trouble connecting right now. Feel free to reach out to Kumail KMR directly via the contact form!",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[200] font-[family-name:var(--font-outfit)]">
            <AnimatePresence>
                {isOpen ? (
                    <m.div
                        initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
                        className="w-[90vw] md:w-[400px] h-[600px] bg-[#080808]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-6"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/40">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest leading-none mb-1 italic">
                                        {config.botName || "Kumail KMR AI"}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Systems Online</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                            >
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-none"
                        >
                            {messages.map((msg, i) => (
                                <m.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                                        msg.role === "user" 
                                        ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20" 
                                        : "bg-white/[0.03] border border-white/5 text-gray-300 rounded-tl-none"
                                    }`}>
                                        {msg.content}
                                    </div>
                                </m.div>
                            ))}
                            {isTyping && (
                                <m.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                    </div>
                                </m.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-black/40">
                            <div className="relative group">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your message..."
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <p className="text-[9px] text-center mt-4 text-gray-700 font-bold uppercase tracking-widest italic opacity-40">
                                Powered by Kumail KMR's Knowledge Base
                            </p>
                        </div>
                    </m.div>
                ) : (
                    <m.button
                        layoutId="chat-bubble"
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 border border-white/10 hover:bg-blue-500 transition-all"
                    >
                        <MessageSquare size={24} />
                    </m.button>
                )}
            </AnimatePresence>
        </div>
    );
}
