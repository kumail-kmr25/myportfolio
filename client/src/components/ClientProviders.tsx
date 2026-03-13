"use client";

import React from "react";
import { HireModalProvider } from "@/context/HireModalContext";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
import SessionProvider from "@/components/common/SessionProvider";
import QuickNav from "@/components/QuickNav";
import { LazyMotion, domMax } from "framer-motion";

import Preloader from "./Preloader";
import Navbar from "./Navbar";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <HireModalProvider>
                <LazyMotion features={domMax} strict>
                    <Preloader />
                    <Navbar />
                    {children}
                    <WhatsAppButton />
                </LazyMotion>
                <QuickNav />
            </HireModalProvider>
        </SessionProvider>
    );
}

