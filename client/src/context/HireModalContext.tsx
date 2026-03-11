"use client";

import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";

const HireMeModal = dynamic(() => import("@/components/HireMeModal"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });

interface HireModalContextType {
    isOpen: boolean;
    initialData?: {
        service?: string;
        description?: string;
    };
    openModal: (data?: { service?: string; description?: string }) => void;
    closeModal: () => void;
}

const HireModalContext = createContext<HireModalContextType | undefined>(undefined);

export function HireModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialData, setInitialData] = useState<{ service?: string; description?: string } | undefined>();

    const openModal = (data?: { service?: string; description?: string }) => {
        setInitialData(data);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setInitialData(undefined);
    };

    return (
        <HireModalContext.Provider value={{ isOpen, initialData, openModal, closeModal }}>
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
