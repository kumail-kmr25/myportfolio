"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SelectionContextType {
    selectedIds: string[];
    toggleSelection: (id: string) => void;
    clearSelection: () => void;
    setSelection: (ids: string[]) => void;
    isSelected: (id: string) => boolean;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = useCallback((id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) 
                ? prev.filter(i => i !== id) 
                : [...prev, id]
        );
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds([]);
    }, []);

    const setSelection = useCallback((ids: string[]) => {
        setSelectedIds(ids);
    }, []);

    const isSelected = useCallback((id: string) => {
        return selectedIds.includes(id);
    }, [selectedIds]);

    return (
        <SelectionContext.Provider value={{ selectedIds, toggleSelection, clearSelection, setSelection, isSelected }}>
            {children}
        </SelectionContext.Provider>
    );
}

export function useSelection() {
    const context = useContext(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
}
