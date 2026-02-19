"use client";

import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [showPhone, setShowPhone] = useState(false);

    return (
        <section id="contact" className="bg-[#050505] py-20 relative overflow-hidden">
            {/* Background blobs or effects can be added here */}
            <div className="section-container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                    Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
                                    <p className="text-gray-400">kumailkmr25@gmail.com</p>
                                    <p className="text-gray-500 text-sm mt-1">I usually respond within 24 hours.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <Phone size={24} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-bold text-white mb-2">Call Me</h3>
                                {!showPhone ? (
                                    <button
                                        onClick={() => setShowPhone(true)}
                                        className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-white"
                                    >
                                        Get Phone Number
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-4 mt-1 animate-fade-in-up">
                                        <p className="text-gray-400 text-lg">6006121193</p>
                                        <a
                                            href="https://wa.me/916006121193"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-full text-green-400 transition-colors"
                                        >
                                            <MessageCircle size={20} />
                                        </a>
                                    </div>
                                )}
                                <p className="text-gray-500 text-sm mt-2">Available Mon-Fri, 9am - 6pm.</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                                    <p className="text-gray-400">Kashmir, India</p>
                                    <p className="text-gray-500 text-sm mt-1">Open to remote work worldwide.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-6 card" onSubmit={(e) => {
                        e.preventDefault();
                        alert("Thank you for your message! This is a demo form.");
                    }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                <input type="text" id="name" placeholder="John Doe" className="input-field" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                <input type="email" id="email" placeholder="john@example.com" className="input-field" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                            <input type="text" id="subject" placeholder="Project Inquiry" className="input-field" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                            <textarea id="message" rows={4} placeholder="Tell me about your project..." className="input-field resize-none" required />
                        </div>

                        <button type="submit" className="btn-primary w-full group">
                            Send Message
                            <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
