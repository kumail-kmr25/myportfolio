import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Premium Profile Visual */}
                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative group">
                            {/* Decorative Outer Ring */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />

                            {/* The Circle Photo */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/10 p-2 bg-[#0a0a0a] ring-1 ring-white/5">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image
                                        src="https://github.com/kumailkmr.png"
                                        alt="Kumail Kmr"
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Professional Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-2xl transform rotate-3 ring-4 ring-[#050505]">
                                    Technical Lead
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Narrative */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-2 block">Company Visionary</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                Engineering Excellence <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Through Pure Logic</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl">
                            <p>
                                I specialize in transforming complex business requirements into high-performance SaaS architectures.
                                With a focus on <span className="text-white font-medium">Full-Stack Scalability</span> and <span className="text-white font-medium">Clean Design Systems</span>,
                                I lead technical projects from inception to production-hardened deployments.
                            </p>
                            <p>
                                My methodology integrates modern engineering primitives—leveraging Next.js for edge-optimized delivery and robust backend orchestration
                                to ensure sub-second latency and absolute data integrity.
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1">
                                <div className="text-2xl font-bold text-white">100%</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Commitment</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1">
                                <div className="text-2xl font-bold text-white">SaaS</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Specialty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
