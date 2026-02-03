import { motion } from 'framer-motion';

const Stats = () => {
    const stats = [
        { label: 'Bugs Terminated', value: '150+' },
        { label: 'Apps Stabilized', value: '40+' },
        { label: 'Avg. Refactor Speed', value: '48h' },
        { label: 'Uptime Reliability', value: '99.9%' }
    ];

    return (
        <section className="py-20 bg-transparent border-b border-white/[0.05]">
            <div className="section-container !py-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="text-center group"
                        >
                            <p className="text-5xl md:text-6xl font-bold text-white font-display mb-3 tracking-tighter">
                                {stat.value}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-200">
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
