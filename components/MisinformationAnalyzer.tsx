import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { analyzeContent, AnalysisInput } from '../services/geminiService';
import { FullAnalysis } from '../types';
import { AnalysisResult } from './AnalysisResult';

const WelcomeMessage = () => (
    <div className="relative overflow-hidden w-full min-h-screen animate-fade-in">
        <div className="relative p-8 md:p-12">
            {/* Hero Section - Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                {/* Left Column - Welcome Messages */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            AI Misinformation Detector
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            In today's digital landscape, misinformation spreads like wildfire through AI-generated content.
                            Our advanced tool analyzes and verifies information from multiple sources to help you combat false narratives.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                        <p className="mb-4 opacity-90">Choose an input type below—Text, Image, PDF, or Webpage—to begin your analysis and stay informed.</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                AI-Powered Analysis
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Multi-Language Support
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Real-time Results
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Dynamic Logo */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <div className="relative w-80 h-80 rounded-full border-8 border-white dark:border-slate-700 shadow-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 animate-spin-slow">
                            <svg width="200" height="200" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#f63bf3ff', stopOpacity: 20 }} />
                                        <stop offset="100%" style={{ stopColor: '#1e8bafff', stopOpacity: 10 }} />
                                    </linearGradient>
                                </defs>
                                <path d="M200 50 L320 120 L320 280 Q320 320 280 340 L200 380 L120 340 Q80 320 80 280 L80 120 Z" fill="url(#grad1)" opacity="0.5" />
                                <text x="200" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="white">AI</text>
                                <text x="200" y="220" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">Fake News Detector</text>
                                <circle cx="200" cy="140" r="3" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&fit=crop&crop=center"
                            alt="Text Analysis"
                            className="w-8 h-8 object-cover rounded"
                        />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Text Analysis</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Analyze articles, posts, and documents for factual accuracy and bias detection.</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=48&h=48&fit=crop&crop=center"
                            alt="Image Verification"
                            className="w-8 h-8 object-cover rounded"
                        />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Image & Media</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Verify images, PDFs, and multimedia content for manipulation and authenticity.</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&fit=crop&crop=center"
                            alt="Web Analysis"
                            className="w-8 h-8 object-cover rounded"
                        />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Web Content</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Scrape and analyze web pages, news articles, and online content sources.</p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                <p>Powered by advanced AI technology for accurate detection and comprehensive analysis.</p>
            </div>
        </div>
    </div >
);

const loadingMessages = [
    "Initializing analysis...",
    "Scanning content for key topics...",
    "Cross-referencing facts with Google Search...",
    "Identifying potential manipulative techniques...",
    "Assessing credibility and overall risk...",
    "Compiling your detailed report...",
];

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-800">
        <svg className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Analyzing Content...</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 h-5 transition-opacity duration-500">
            {message || 'Our AI is checking for credibility clues...'}
        </p>
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="p-4 border-l-4 border-red-500 bg-red-100 dark:bg-red-900/20 rounded-r-lg">
        <h3 className="font-bold text-red-800 dark:text-red-300">Analysis Failed</h3>
        <p className="text-red-700 dark:text-red-400">{message}</p>
    </div>
);

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // remove the "data:mime/type;base64," prefix
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};

const MAX_FILE_SIZE_MB = 4;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type Mode = 'text' | 'image' | 'pdf' | 'url';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${active
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
    >
        {children}
    </button>
);

const languages = [
    { name: 'Afrikaans' }, { name: 'Albanian' }, { name: 'Amharic' }, { name: 'Arabic' },
    { name: 'Armenian' }, { name: 'Azerbaijani' }, { name: 'Basque' }, { name: 'Belarusian' },
    { name: 'Bengali' }, { name: 'Bosnian' }, { name: 'Bulgarian' }, { name: 'Catalan' },
    { name: 'Cebuano' }, { name: 'Chinese (Simplified)' }, { name: 'Chinese (Traditional)' },
    { name: 'Corsican' }, { name: 'Croatian' }, { name: 'Czech' }, { name: 'Danish' },
    { name: 'Dutch' }, { name: 'English' }, { name: 'Esperanto' }, { name: 'Estonian' },
    { name: 'Filipino' }, { name: 'Finnish' }, { name: 'French' }, { name: 'Frisian' },
    { name: 'Galician' }, { name: 'Georgian' }, { name: 'German' }, { name: 'Greek' },
    { name: 'Gujarati' }, { name: 'Haitian Creole' }, { name: 'Hausa' }, { name: 'Hawaiian' },
    { name: 'Hebrew' }, { name: 'Hindi' }, { name: 'Hmong' }, { name: 'Hungarian' },
    { name: 'Icelandic' }, { name: 'Igbo' }, { name: 'Indonesian' }, { name: 'Irish' },
    { name: 'Italian' }, { name: 'Japanese' }, { name: 'Javanese' }, { name: 'Kannada' },
    { name: 'Kazakh' }, { name: 'Khmer' }, { name: 'Korean' }, { name: 'Kurdish' },
    { name: 'Kyrgyz' }, { name: 'Lao' }, { name: 'Latin' }, { name: 'Latvian' },
    { name: 'Lithuanian' }, { name: 'Luxembourgish' }, { name: 'Macedonian' }, { name: 'Malagasy' },
    { name: 'Malay' }, { name: 'Malayalam' }, { name: 'Maltese' }, { name: 'Maori' },
    { name: 'Marathi' }, { name: 'Mongolian' }, { name: 'Myanmar (Burmese)' }, { name: 'Nepali' },
    { name: 'Norwegian' }, { name: 'Pashto' }, { name: 'Persian' }, { name: 'Polish' },
    { name: 'Portuguese' }, { name: 'Punjabi' }, { name: 'Romanian' }, { name: 'Russian' },
    { name: 'Samoan' }, { name: 'Scots Gaelic' }, { name: 'Serbian' }, { name: 'Sesotho' },
    { name: 'Shona' }, { name: 'Sindhi' }, { name: 'Sinhala' }, { name: 'Slovak' },
    { name: 'Slovenian' }, { name: 'Somali' }, { name: 'Spanish' }, { name: 'Sundanese' },
    { name: 'Swahili' }, { name: 'Swedish' }, { name: 'Tajik' }, { name: 'Tamil' },
    { name: 'Telugu' }, { name: 'Thai' }, { name: 'Turkish' }, { name: 'Ukrainian' },
    { name: 'Urdu' }, { name: 'Uzbek' }, { name: 'Vietnamese' }, { name: 'Welsh' },
    { name: 'Xhosa' }, { name: 'Yiddish' }, { name: 'Yoruba' }, { name: 'Zulu' }
].sort((a, b) => a.name.localeCompare(b.name));

export const MisinformationAnalyzer: React.FC = () => {
    const [mode, setMode] = useState<Mode>('text');
    const [inputText, setInputText] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [filePrompt, setFilePrompt] = useState('');
    const [outputLanguage, setOutputLanguage] = useState<string>('English');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<FullAnalysis | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);

    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isLoading) {
            let i = 0;
            setLoadingMessage(loadingMessages[0]);
            interval = setInterval(() => {
                i = (i + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[i]);
            }, 2500);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
                setError(`File is too large. Please select a file smaller than ${MAX_FILE_SIZE_MB}MB.`);
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const isSpeechRecognitionSupported = useMemo(() => {
        return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    }, []);

    const handleToggleRecording = () => {
        if (!isSpeechRecognitionSupported) {
            setError("Speech recognition is not supported in this browser.");
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
            return;
        }

        // Let the SpeechRecognition API handle the permission prompt and error handling directly
        // to avoid potential race conditions with a separate getUserMedia check.

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setError(null);
            setIsRecording(true);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            let friendlyMessage = `An unknown error occurred (${event.error}). Please try again.`;
            switch (event.error) {
                case 'audio-capture':
                    friendlyMessage = 'Could not start audio capture. Please ensure your microphone is connected, not in use by another application, and that this page has permission to access it in both your browser and operating system privacy settings.';
                    break;
                case 'not-allowed':
                    friendlyMessage = 'Microphone access was denied. Please grant permission in your browser settings to use this feature.';
                    break;
                case 'no-speech':
                    friendlyMessage = 'No speech was detected. Please try speaking again.';
                    break;
                case 'network':
                    friendlyMessage = 'A network error occurred with the speech recognition service. Please check your connection.';
                    break;
                case 'service-not-allowed':
                    friendlyMessage = 'Speech recognition service is not allowed by your browser or an extension. Please check your settings.';
                    break;
            }
            setError(`Speech recognition error: ${friendlyMessage}`);
            setIsRecording(false);
        };

        recognition.onresult = (event: any) => {
            let newFinalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    newFinalTranscript += event.results[i][0].transcript;
                }
            }
            if (newFinalTranscript) {
                setInputText(prevText => (prevText.trim() ? prevText + ' ' : '') + newFinalTranscript);
            }
        };

        recognition.start();
    };

    const isAnalyzeDisabled = useMemo(() => {
        if (isLoading || isRecording) return true;
        switch (mode) {
            case 'text': return !inputText.trim();
            case 'url': return !url.trim();
            case 'image':
            case 'pdf': return !file;
            default: return true;
        }
    }, [isLoading, isRecording, mode, inputText, url, file]);

    const handleAnalyze = useCallback(async () => {
        setError(null);
        setAnalysisResult(null);

        let analysisInput: AnalysisInput | null = null;

        try {
            switch (mode) {
                case 'text':
                    if (!inputText.trim()) { setError("Please enter some text to analyze."); return; }
                    analysisInput = { type: 'text', value: inputText };
                    break;
                case 'url':
                    if (!url.trim()) { setError("Please enter a URL to analyze."); return; }
                    analysisInput = { type: 'url', value: url };
                    break;
                case 'image':
                case 'pdf':
                    if (!file) { setError("Please select a file to analyze."); return; }
                    setIsLoading(true);
                    const base64Data = await fileToBase64(file);
                    analysisInput = { type: 'media', base64Data, mimeType: file.type, promptText: filePrompt };
                    break;
            }

            if (analysisInput) {
                setIsLoading(true);
                const result = await analyzeContent(analysisInput, outputLanguage);
                setAnalysisResult(result);
            }
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [mode, inputText, url, file, filePrompt, outputLanguage]);

    const renderInputArea = () => {
        switch (mode) {
            case 'text':
                return (
                    <div className="relative">
                        <textarea
                            id="text-input"
                            rows={10}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={isRecording ? "Listening..." : "Paste text or use the microphone to dictate..."}
                            className="w-full p-3 pr-14 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-slate-50 dark:bg-slate-700 placeholder-slate-400 dark:placeholder-slate-500"
                            disabled={isLoading}
                        />
                        {isSpeechRecognitionSupported && (
                            <button
                                type="button"
                                onClick={handleToggleRecording}
                                disabled={isLoading}
                                className={`absolute bottom-3 right-3 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                                    ${isRecording
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500'
                                    }`}
                                aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" /><path d="M5.5 8.5a.5.5 0 01.5.5v1.5a4 4 0 004 4h0a4 4 0 004-4V9a.5.5 0 011 0v1.5a5 5 0 01-4.5 4.975V17h3a.5.5 0 010 1H7a.5.5 0 010-1h3v-1.525A5 5 0 013.5 10.5V9a.5.5 0 01.5-.5z" /></svg>
                            </button>
                        )}
                    </div>
                );
            case 'url':
                return (
                    <input
                        id="url-input"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/news-article"
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-slate-50 dark:bg-slate-700 placeholder-slate-400 dark:placeholder-slate-500"
                        disabled={isLoading}
                    />
                );
            case 'image':
            case 'pdf':
                const acceptType = mode === 'image' ? 'image/*' : 'application/pdf';
                return (
                    <div className="space-y-4">
                        <div className="w-full p-4 text-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept={acceptType}
                                onChange={handleFileChange}
                                disabled={isLoading}
                            />
                            <label htmlFor="file-upload" className={`cursor-pointer font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 ${isLoading ? 'cursor-not-allowed' : ''}`}>
                                Choose a {mode} file
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">or drag and drop</p>
                            {file && <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-medium">{file.name}</p>}
                        </div>
                        <textarea
                            rows={3}
                            value={filePrompt}
                            onChange={(e) => setFilePrompt(e.target.value)}
                            placeholder={`Optional: Add any text from the ${mode} or questions you have about it...`}
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-slate-50 dark:bg-slate-700 placeholder-slate-400 dark:placeholder-slate-500"
                            disabled={isLoading || !file}
                        />
                    </div>
                );
        }
    };

    const resetInputs = (newMode: Mode) => {
        setMode(newMode);
        setError(null);
        setAnalysisResult(null);
        setInputText('');
        setUrl('');
        setFile(null);
        setFilePrompt('');
    }

    return (
        <>
            <WelcomeMessage />
            <div className="container mx-auto px-4 py-8">
                <hr className="my-8 border-slate-300 dark:border-slate-700" />
                <div className="w-full space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6">
                            <TabButton active={mode === 'text'} onClick={() => resetInputs('text')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4a1 1 0 00-1-1H7a1 1 0 00-1 1v12a1 1 0 11-2 0V4z" clipRule="evenodd" /></svg>
                                <span>Text</span>
                            </TabButton>
                            <TabButton active={mode === 'image'} onClick={() => resetInputs('image')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                                <span>Image</span>
                            </TabButton>
                            <TabButton active={mode === 'pdf'} onClick={() => resetInputs('pdf')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                                <span>PDF</span>
                            </TabButton>
                            <TabButton active={mode === 'url'} onClick={() => resetInputs('url')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0m-2.828-2.828a2 2 0 012.828 0l3 3a2 2 0 11-2.828 2.828m-2.828 5.656a2 2 0 10-2.828-2.828l-3-3a2 2 0 102.828-2.828l3 3a2 2 0 002.828 2.828z" clipRule="evenodd" /></svg>
                                <span>Webpage</span>
                            </TabButton>
                        </div>

                        {renderInputArea()}

                        <div className="mt-4">
                            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Report Language
                            </label>
                            <select
                                id="language-select"
                                value={outputLanguage}
                                onChange={(e) => setOutputLanguage(e.target.value)}
                                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-slate-50 dark:bg-slate-700"
                                disabled={isLoading}
                                aria-label="Select report language"
                            >
                                {languages.map(lang => <option key={lang.name} value={lang.name}>{lang.name}</option>)}
                            </select>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzeDisabled}
                            className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900 transition duration-150"
                        >
                            {isLoading ? 'Analyzing...' : 'Analyze Content'}
                        </button>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600">
                        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Analysis Results</h2>
                        {isLoading && <LoadingSpinner message={loadingMessage} />}
                        {error && !isLoading && <ErrorMessage message={error} />}
                        {analysisResult && !isLoading && <AnalysisResult result={analysisResult} />}
                    </div>
                </div>
            </div>
        </>
    );
};
