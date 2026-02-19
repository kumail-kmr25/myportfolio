export default function About() {
    return (
        <section id="about" className="py-20 md:py-32 bg-[#050505]">
            <div className="section-container">
                <h2 className="section-title">About Me</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>
                            I am a passionate Full Stack Developer with a strong foundation in modern web technologies.
                            My journey involves building scalable applications, optimizing performance, and designing intuitive user interfaces.
                        </p>
                        <p>
                            With expertise in the MERN stack (`MongoDB`, `Express.js`, `React`, `Node.js`) and Next.js,
                            I strive to create seamless digital experiences. I also have a keen interest in DevOps,
                            ensuring that applications are deployed efficiently and securely.
                        </p>
                        <p>
                            When I&apos;m not coding, I&apos;m exploring new design trends or contributing to open-source projects.
                        </p>
                    </div>

                    {/* Stats / Skills or Image Placeholder */}
                    <div className="glass-effect p-8 rounded-3xl">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-white mb-2">3+</h3>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Years Experience</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Projects Completed</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-white mb-2">20+</h3>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Happy Clients</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-white mb-2">24/7</h3>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
