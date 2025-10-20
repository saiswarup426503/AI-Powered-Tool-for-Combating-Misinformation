import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MisinformationAnalyzer } from './components/MisinformationAnalyzer';
import { WelcomeDialog } from './components/WelcomeDialog';
import { useTheme } from './contexts/ThemeContext';

const App: React.FC = () => {
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Animated Gradient Background */}
      {theme === 'light' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/20 via-transparent to-pink-100/20 animate-gradient-xy"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-yellow-50/30 via-transparent to-green-50/30 animate-gradient-y"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-pink-900/20 animate-gradient-xy"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-yellow-900/30 via-transparent to-green-900/30 animate-gradient-y"></div>
        </>
      )}

      {/* Permanent Watermark */}
      <div className="absolute inset-0 opacity-20 bg-center bg-no-repeat bg-contain pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3e%3cstop offset='100%25' style='stop-color:%231e40af;stop-opacity:1' /%3e%3c/linearGradient%3e%3c/defs%3e%3cpath d='M200 50 L320 120 L320 280 Q320 320 280 340 L200 380 L120 340 Q80 320 80 280 L80 120 Z' fill='url(%23grad1)' opacity='0.8'/%3e%3ctext x='200' y='180' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' font-weight='bold' fill='white'%3eAI%3c/text%3e%3ctext x='200' y='220' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' font-weight='bold' fill='white'%3eFake%20News%20Detector%3c/text%3e%3ccircle cx='200' cy='140' r='20' fill='none' stroke='white' stroke-width='3'/%3e%3ccircle cx='200' cy='140' r='8' fill='white'/%3e%3ccircle cx='200' cy='140' r='3' fill='white'/%3e%3c/svg%3e")` }}></div>

      {/* Welcome Dialog */}
      <WelcomeDialog isOpen={showWelcome} onClose={handleCloseWelcome} />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <MisinformationAnalyzer />
        </main>
        <footer className="text-center py-4 text-xs text-slate-500 dark:text-slate-400">
          <p>Disclaimer: This AI-powered tool provides an analysis based on common patterns of misinformation and is intended for educational purposes. It is not a substitute for professional fact-checking or critical thinking. Always verify information from multiple reputable sources.</p>
          <p>&copy; 2025 AI Misinformation Detector. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
