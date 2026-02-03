

const Resume = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8 printable">
            <div className="max-w-4xl mx-auto bg-white shadow-xl p-12 md:p-16 relative">
                {/* Print Button */}
                <button
                    onClick={handlePrint}
                    className="print:hidden absolute top-8 right-8 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print / Save PDF
                </button>

                {/* Header */}
                <header className="border-b-2 border-gray-900 pb-8 mb-8">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">KUMALE ALI BHAT</h1>
                    <h2 className="text-2xl text-gray-600 font-light mb-6">FREELANCE FULL STACK DEVELOPER & BUG FIX SPECIALIST</h2>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
                        <a href="mailto:contact@kumail.dev" className="flex items-center gap-2 hover:text-blue-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            contact@kumail.dev
                        </a>
                        <a href="https://github.com/kumail-kmr25" className="flex items-center gap-2 hover:text-blue-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            github.com/kumail-kmr25
                        </a>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Remote / Worldwide
                        </span>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Main Column */}
                    <div className="md:col-span-2 space-y-10">
                        {/* Experience */}
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
                                Experience
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="text-lg font-bold">Freelance Full Stack Developer</h4>
                                        <span className="text-sm text-gray-500 font-medium">2023 - Present</span>
                                    </div>
                                    <p className="text-gray-600 mb-2 font-medium">Remote</p>
                                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm leading-relaxed">
                                        <li>Developed and deployed custom web applications for diverse clients using React, Node.js, and MongoDB.</li>
                                        <li>Implemented secure authentication systems and integrated payment gateways like Stripe.</li>
                                        <li>Optimized application performance, achieving 95+ Google Lighthouse scores.</li>
                                    </ul>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="text-lg font-bold">Frontend Developer</h4>
                                        <span className="text-sm text-gray-500 font-medium">2022 - 2023</span>
                                    </div>
                                    <p className="text-gray-600 mb-2 font-medium">Tech Solutions Inc.</p>
                                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm leading-relaxed">
                                        <li>Collaborated with UI/UX designers to translate Figma designs into pixel-perfect React components.</li>
                                        <li>Refactored legacy codebases to improve maintainability and reduce technical debt.</li>
                                        <li>Assisted in implementing responsive design principles ensuring cross-browser compatibility.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
                                Key Projects
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold">Enterprise SaaS Platform</h4>
                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">MERN Stack</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Built a scalable SaaS platform with role-based access control, analytics dashboard, and automated email reporting system.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold">E-Commerce Solution</h4>
                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">Next.js + Stripe</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Developed a high-performance e-commerce site featuring dynamic product filtering, shopping cart state management, and secure checkout.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-10">
                        {/* Skills */}
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
                                Skills
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-bold text-sm mb-2 text-gray-900">Frontend</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].map(skill => (
                                            <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-bold text-sm mb-2 text-gray-900">Backend</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'].map(skill => (
                                            <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-bold text-sm mb-2 text-gray-900">Tools & DevOps</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['Git', 'Docker', 'AWS', 'Linux', 'Vite'].map(skill => (
                                            <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
                                Education
                            </h3>
                            <div>
                                <h4 className="font-bold text-gray-900">BCA</h4>
                                <p className="text-sm text-gray-600 mb-1">Bachelor of Computer Applications (First Year)</p>
                                <p className="text-xs text-gray-500">Currently Pursuing</p>
                            </div>
                        </section>

                        {/* Languages */}
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
                                Languages
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex justify-between">
                                    <span>English</span>
                                    <span className="text-gray-500">Professional</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Urdu/Hindi</span>
                                    <span className="text-gray-500">Native</span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
