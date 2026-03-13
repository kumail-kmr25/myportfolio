"use client";

import React, { ReactNode } from "react";
import { m, Variants } from "framer-motion";

interface ViewportRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
    threshold?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export default function ViewportReveal({
    children,
    className = "",
    delay = 0,
    staggerChildren = 0.1,
    threshold = 0.1,
    direction = "up",
    distance = 30
}: ViewportRevealProps) {
    const getInitialOffset = () => {
        switch (direction) {
            case "up": return { y: distance };
            case "down": return { y: -distance };
            case "left": return { x: distance };
            case "right": return { x: -distance };
            default: return {};
        }
    };

    const containerVariants: Variants = {
        hidden: { 
            opacity: 0,
            ...getInitialOffset(),
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1], // Premium Quintic Easing
                staggerChildren: staggerChildren,
                delayChildren: delay
            }
        }
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={containerVariants}
            className={className}
        >
            {/* If we want to stagger direct children, we can wrap them in m.div with childVariants if needed */}
            {children}
        </m.div>
    );
}
