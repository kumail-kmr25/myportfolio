"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    width?: "full" | "container";
    delay?: number;
}

export default function SectionReveal({ children, width = "full", delay = 0 }: SectionRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={width === "container" ? "section-container" : "w-full"}
        >
            {children}
        </motion.div>
    );
}
