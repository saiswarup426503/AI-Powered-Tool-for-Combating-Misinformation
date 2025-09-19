
import React from 'react';
import { Header } from './components/Header';
import { MisinformationAnalyzer } from './components/MisinformationAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <MisinformationAnalyzer />
      </main>
      <footer className="text-center py-4 text-xs text-slate-500 dark:text-slate-400">
        <p>Disclaimer: This AI-powered tool provides an analysis based on common patterns of misinformation and is intended for educational purposes. It is not a substitute for professional fact-checking or critical thinking. Always verify information from multiple reputable sources.</p>
        <p>&copy; 2025 AI Misinformation Detector. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
