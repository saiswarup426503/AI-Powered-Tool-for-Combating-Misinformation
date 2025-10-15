
import React from 'react';
import { Header } from './components/Header';
import { MisinformationAnalyzer } from './components/MisinformationAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/20 via-transparent to-pink-100/20 dark:from-cyan-900/10 dark:via-transparent dark:to-pink-900/10 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-yellow-50/30 via-transparent to-green-50/30 dark:from-yellow-900/5 dark:via-transparent dark:to-green-900/5 animate-gradient-y"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
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