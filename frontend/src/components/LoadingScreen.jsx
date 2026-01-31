import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    "Hello",
    "Assalamualaikum", // Islam
    "Namaste",         // Hinduism
    "Sat Sri Akal",    // Sikhism
    "Shalom",          // Judaism
    "Bonjour",         // French
    "Hola"             // Spanish
];

const LoadingScreen = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Cycle through greetings
        const timeout = setTimeout(() => {
            if (index < greetings.length - 1) {
                setIndex(prev => prev + 1);
            } else {
                // Determine when to finish (short delay after last word)
                setTimeout(onComplete, 800);
            }
        }, 250); // Duration per greeting

        return () => clearTimeout(timeout);
    }, [index, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            exit={{ y: -window.innerHeight, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative overflow-hidden">
                <AnimatePresence mode='wait'>
                    <motion.h1
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl md:text-6xl font-bold font-display tracking-wider flex items-center gap-4"
                    >
                        <span className="w-3 h-3 bg-primary-500 rounded-full inline-block mb-2"></span>
                        {greetings[index]}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
