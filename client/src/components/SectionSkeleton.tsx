"use client";

import { motion } from "framer-motion";

interface SectionSkeletonProps {
    minHeight?: string;
    hasTitle?: boolean;
    hasSubtitle?: boolean;
}

export default function SectionSkeleton({
    minHeight = "400px",
    hasTitle = true,
    hasSubtitle = true
}: SectionSkeletonProps) {
    return (
        <div
            className="section-container py-24 opacity-20 pointer-events-none select-none"
            style={{ minHeight }}
        >
            {hasTitle && (
                <div className="h-12 w-64 bg-white/10 rounded-full mb-6 mx-auto animate-pulse" />
            )}
            {hasSubtitle && (
                <div className="h-4 w-96 bg-white/5 rounded-full mb-12 mx-auto animate-pulse" />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-64 bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
