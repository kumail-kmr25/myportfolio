"use client";

import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelector from './LanguageSelector';

export const FloatingControls: React.FC = () => {
    return (
        <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-3">
            <ThemeSwitcher />
            <LanguageSelector />
        </div>
    );
};

export default FloatingControls;
