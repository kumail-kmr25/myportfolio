import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    "Hello"
];

const LoadingScreen = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Show greeting for 600ms
        const timeout = setTimeout(() => {
            if (index < greetings.length - 1) {
                setIndex(prev => prev + 1);
            } else {
                // Determine when to finish (200ms after last greeting)
                setTimeout(onComplete, 200);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [index, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            exit={{ y: -window.innerHeight, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative z-10">
                <AnimatePresence mode='wait'>
                    <motion.h1
                        key={index}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.2 } }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-wider flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-center px-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    >
                        <span className="w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full inline-block mt-1 sm:mt-2 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
                        {greetings[index]}
                    </motion.h1>
                </AnimatePresence>
            </div>

            {/* Background Texture Effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        </motion.div>
    );
};

export default LoadingScreen;
