"use client";

import React from "react";
import { HireModalProvider } from "@/context/HireModalContext";
import SessionProvider from "@/components/common/SessionProvider";
import QuickNav from "@/components/QuickNav";
import { LazyMotion, domMax } from "framer-motion";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <HireModalProvider>
                <LazyMotion features={domMax} strict>
                    {children}
                </LazyMotion>
                <QuickNav />
            </HireModalProvider>
        </SessionProvider>
    );
}

