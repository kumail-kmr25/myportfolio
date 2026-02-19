"use client";

import { Star, MessageSquare } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        content: "Kumail transformed our MVP into a scalable product in record time. His attention to detail and clean code is unmatched.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Michael Chen",
        role: "CTO, FinFlow",
        content: "We hired Kumail for a critical backend migration. He delivered flawless execution and improved our API performance by 40%.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Emily Davis",
        role: "Product Manager, CreativeAgency",
        content: "The UI/UX design Kumail created for our client was stunning. He has a unique ability to blend aesthetics with functionality.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-[#050505] relative">
            <div className="section-container">
                <h2 className="section-title text-center">Client Testimonials</h2>
                <p className="section-subtitle text-center mx-auto mb-16">
                    Don&apos;t just take my word for it. Here&apos;s what my clients say.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-600/20">
                                <MessageSquare className="text-white w-6 h-6" />
                            </div>

                            <div className="mt-8 mb-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-6 leading-relaxed">
                                    &quot;{testimonial.content}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                                {/* Placeholder avatar if image fails or for privacy */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
