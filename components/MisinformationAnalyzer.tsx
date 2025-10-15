import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { analyzeContent, AnalysisInput } from '../services/geminiService';
import { FullAnalysis } from '../types';
import { AnalysisResult } from './AnalysisResult';

const WelcomeMessage = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const sections = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25-4.5h16.5M4.5 12h16.5m-16.5 3.75h16.5" />
            </svg>,
            title: "Welcome to the AI Misinformation Detector",
            content: (
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                        In our hyper-connected digital world, artificial intelligence has revolutionized content creation, but it also amplifies the spread of false information at unprecedented speeds.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-slate-700 dark:text-slate-300">
                            AI-generated deepfakes, synthetic media, and automated content farms can create and distribute misleading narratives across social media platforms in minutes, reaching millions before traditional fact-checking can catch up.
                        </p>
                    </div>
                </div>
            )
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-600 dark:text-amber-400 mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            title: "Why Detection Matters Now More Than Ever",
            content: (
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                        The proliferation of AI tools has democratized content creation, but also lowered the barriers for malicious actors.
                    </p>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-slate-700 dark:text-slate-300">
                            From election interference to public health crises, AI-powered misinformation can manipulate public opinion, erode trust in institutions, and even incite real-world harm. Early detection and critical analysis are crucial in maintaining an informed society.
                        </p>
                    </div>
                </div>
            )
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            title: "How Our AI Detector Helps",
            content: (
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                        This tool leverages advanced AI algorithms to analyze content for manipulative patterns, cross-reference information with reliable sources, and provide credibility assessments.
                    </p>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-slate-700 dark:text-slate-300">
                            While not infallible, it serves as a powerful ally in the fight against digital deception, helping users make informed decisions in an era of information overload.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSection((prev) => (prev + 1) % sections.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [sections.length]);

    return (
        <div className="welcome-section w-full min-h-screen p-8 animate-fade-in relative overflow-hidden flex items-center">
            {/* Enhanced Watermark Logo */}
            <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[120vh] w-[120vh] text-blue-600 dark:text-blue-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.3}>
                    <defs>
                        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#shieldGradient)" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    <circle cx="12" cy="10" r="3" fill="white" opacity="0.8" />
                    <path stroke="white" strokeWidth="1" d="M12 13v3m-1-3h2" opacity="0.8" />
                </svg>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-30"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-25"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left side - Information */}
                <div className="space-y-8 backdrop-blur-sm bg-white/5 dark:bg-slate-800/5 p-8 rounded-3xl border border-white/10 dark:border-slate-700/10 shadow-2xl">
                    <div className="text-left">
                        <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
                            {sections[currentSection].icon}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent animate-pulse leading-tight">
                            {sections[currentSection].title}
                        </h2>
                    </div>

                    <div className="text-lg leading-relaxed">
                        {sections[currentSection].content}
                    </div>

                    <div className="flex justify-start space-x-3">
                        {sections.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSection(index)}
                                className={`w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${index === currentSection
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg'
                                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500'
                                    }`}
                                aria-label={`Go to section ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="p-6 bg-gradient-to-r from-slate-50/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-900/80 rounded-2xl border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm">
                        <p className="text-slate-700 dark:text-slate-300 font-medium text-left leading-relaxed">
                            Choose an input type above—Text, Image, PDF, or Webpage—to begin your analysis and stay ahead of the misinformation curve.
                        </p>
                    </div>
                </div>

                {/* Right side - Enhanced Photo */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative bg-gradient-to-br from-green-400/10 to-blue-500/10 p-8 rounded-3xl border border-green-300/20 dark:border-green-600/20 backdrop-blur-sm shadow-2xl">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 dark:text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 dark:text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-500 dark:text-cyan-400 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 drop-shadow-lg mb-2">Search</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 drop-shadow">Analyze before you Share</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
        <div className="space-y-6">
            {!isLoading && !error && !analysisResult && <WelcomeMessage />}

            <div className="max-w-4xl mx-auto">
                <div className="input-section bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
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
            </div>

            <div className="mt-6">
                {isLoading && <LoadingSpinner message={loadingMessage} />}
                {error && !isLoading && <ErrorMessage message={error} />}
                {analysisResult && !isLoading && <AnalysisResult result={analysisResult} />}
            </div>
        </div>
    );
};
