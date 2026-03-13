"use client";

import React from "react";
import { HireModalProvider } from "@/context/HireModalContext";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
import SessionProvider from "@/components/common/SessionProvider";
import QuickNav from "@/components/QuickNav";
import { LazyMotion, domMax } from "framer-motion";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <HireModalProvider>
                <LazyMotion features={domMax} strict>
                    {children}
                    <WhatsAppButton />
                </LazyMotion>
                <QuickNav />
            </HireModalProvider>
        </SessionProvider>
    );
}

