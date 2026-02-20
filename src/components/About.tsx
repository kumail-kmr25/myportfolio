import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-12 md:py-16 bg-[#050505]">
            <div className="section-container">
                <h2 className="section-title">About Me</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                        <p>
                            Started my coding journey in 2023, I quickly discovered a passion for building software that solves real-world problems.
                            What began as curiosity has evolved into a dedicated pursuit of mastering full-stack development.
                        </p>
                        <p>
                            Over the past year, I&apos;ve immersed myself in the MERN stack and Next.js, building projects like **Edunova SaaS** and e-commerce platforms
                            that prioritize performance and user experience. I view code not just as syntax, but as a tool for creative expression and logical problem solving.
                        </p>
                        <p>
                            My approach combines technical precision with a design-first mindset, ensuring that every application I build is robust, scalable, and visually engaging.
                        </p>
                    </div>

                    {/* Profile Photo */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="glass-effect p-4 rounded-3xl relative overflow-hidden aspect-square">
                            <Image
                                src="/profile.jpg"
                                alt="Kumail Kmr"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500 p-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
