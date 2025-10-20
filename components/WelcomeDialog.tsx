import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface WelcomeDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ isOpen, onClose }) => {
    const { theme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`relative max-w-md w-full mx-4 p-6 rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-slate-800'}`}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                        Welcome to AI Misinformation Detector
                    </h2>
                    <p className={`text-sm mb-4 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        This tool helps you analyze content for potential misinformation using advanced AI technology.
                        Choose from text, images, PDFs, or web pages to get started.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};
