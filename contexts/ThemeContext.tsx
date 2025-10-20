import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as Theme) || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const body = window.document.body;
        root.classList.remove('light', 'dark');
        body.classList.remove('bg-slate-50', 'text-slate-800', 'bg-slate-900', 'text-slate-200');
        if (theme === 'dark') {
            root.classList.add('dark');
            body.classList.add('bg-slate-900', 'text-slate-200');
        } else {
            body.classList.add('bg-slate-50', 'text-slate-800');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
