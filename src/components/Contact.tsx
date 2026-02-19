"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

export default function Contact() {
    const [showPhone, setShowPhone] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus("success");
                reset();
                setTimeout(() => setSubmitStatus("idle"), 5000);
            } else {
                setSubmitStatus("error");
                setErrorMessage(result.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("Failed to connect to the server.");
        }
    };

    return (
        <section id="contact" className="bg-[#050505] py-20 relative overflow-hidden">
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
                    <div className="card">
                        {submitStatus === "success" ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                                <button
                                    onClick={() => setSubmitStatus("idle")}
                                    className="mt-8 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className={`input-field ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                        />
                                        {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className={`input-field ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                        />
                                        {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                    <textarea
                                        {...register("message")}
                                        id="message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className={`input-field resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.message.message}</p>}
                                </div>

                                {submitStatus === "error" && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                                        <AlertCircle size={18} />
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitStatus === "loading"}
                                    className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitStatus === "loading" ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
