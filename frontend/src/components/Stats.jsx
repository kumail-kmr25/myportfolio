import { motion } from 'framer-motion';

const Stats = () => {
    const stats = [
        { label: 'Bugs Terminated', value: '150+' },
        { label: 'Apps Stabilized', value: '40+' },
        { label: 'Avg. Refactor Speed', value: '48h' },
        { label: 'Uptime Reliability', value: '99.9%' }
    ];

    return (
        <section className="py-12 bg-primary-500/5 border-y border-white/5">
            <div className="section-container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <p className="text-4xl md:text-5xl font-bold text-white font-display mb-2 group-hover:text-primary-500 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                                {stat.value}
                            </p>
                            <p className="text-sm md:text-base text-primary-500 font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
