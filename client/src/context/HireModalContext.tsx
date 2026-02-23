"use client";

import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";

const HireMeModal = dynamic(() => import("@/components/HireMeModal"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });

interface HireModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const HireModalContext = createContext<HireModalContextType | undefined>(undefined);

export function HireModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <HireModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
            <HireMeModal />
            <CommandPalette />
        </HireModalContext.Provider>
    );
}

export function useHireModal() {
    const context = useContext(HireModalContext);
    if (context === undefined) {
        throw new Error("useHireModal must be used within a HireModalProvider");
    }
    return context;
}
