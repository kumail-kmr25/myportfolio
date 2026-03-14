"use client";

import React from "react";
import { HireModalProvider } from "@/context/HireModalContext";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
import SessionProvider from "@/components/common/SessionProvider";
import QuickNav from "@/components/QuickNav";
import { LazyMotion, domMax, AnimatePresence, m } from "framer-motion";

import Preloader from "./Preloader";
import Navbar from "./Navbar";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <HireModalProvider>
                <LazyMotion features={domMax} strict>
                    <Preloader />
                    <Navbar />
                    <AnimatePresence mode="wait" initial={false}>
                        <m.div
                            key="page-transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {children}
                        </m.div>
                    </AnimatePresence>
                    <WhatsAppButton />
                </LazyMotion>
                <QuickNav />
            </HireModalProvider>
        </SessionProvider>
    );
}

