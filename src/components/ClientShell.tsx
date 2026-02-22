"use client";

import dynamic from "next/dynamic";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <IntroAnimation />
            {children}
        </>
    );
}
