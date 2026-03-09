"use client";

import React from "react";
import { HireModalProvider } from "@/context/HireModalContext";
import SessionProvider from "@/components/common/SessionProvider";
import QuickNav from "@/components/QuickNav";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <HireModalProvider>
                {children}
            </HireModalProvider>
            <QuickNav />
        </SessionProvider>
    );
}
