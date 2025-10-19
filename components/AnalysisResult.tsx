import React, { useState, useCallback } from 'react';
import { RiskLevel, ManipulativeTechnique, FullAnalysis, CorrectedInformation as CorrectedInformationType } from '../types';

const riskStyles: { [key in RiskLevel]: { badge: string; text: string; border: string; icon: React.ReactElement } } = {
    [RiskLevel.Low]: {
        badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-500',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>

    },
    [RiskLevel.Medium]: {
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        text: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-500',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 011 1v3a1 1 0 01-2 0V5z" clipRule="evenodd" /></svg>
    },
    [RiskLevel.High]: {
        badge: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-500',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
    },
    [RiskLevel.Unknown]: {
        badge: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-500',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
    }
};

const CredibilityGauge: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = (s: number) => {
        if (s > 75) return { text: 'text-green-600 dark:text-green-400', stroke: 'stroke-green-500' };
        if (s > 40) return { text: 'text-yellow-600 dark:text-yellow-400', stroke: 'stroke-yellow-500' };
        return { text: 'text-red-600 dark:text-red-400', stroke: 'stroke-red-500' };
    };

    const colors = getScoreColor(score);
    const radius = 65;
    const strokeWidth = 15;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center h-48 w-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                    className="stroke-slate-200 dark:stroke-slate-700"
                    cx="100"
                    cy="100"
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    transform="rotate(-90 100 100)"
                />
                {/* Foreground circle */}
                <circle
                    className={`${colors.stroke} transition-all duration-1000 ease-out`}
                    cx="100"
                    cy="100"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    transform="rotate(-90 100 100)"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${colors.text}`}>{score}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">out of 100</span>
            </div>
        </div>
    );
};


const TechniqueCard: React.FC<{ technique: ManipulativeTechnique }> = ({ technique }) => {
    const style = riskStyles[technique.risk_level] || riskStyles[RiskLevel.Unknown];
    return (
        <div className={`p-4 border-l-4 ${style.border} bg-slate-100 dark:bg-slate-800 rounded-r-lg`}>
            <h4 className={`font-semibold text-lg flex items-center ${style.text}`}>
                {style.icon} {technique.technique_name}
            </h4>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{technique.explanation}</p>
        </div>
    );
};

const CorrectedInformation: React.FC<{ correction: CorrectedInformationType }> = ({ correction }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fact-Check & Correction
        </h3>
        <div className="p-5 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg shadow-inner">
            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{correction.text}</p>
            {correction.sources && correction.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800/50">
                    <h5 className="font-semibold text-sm text-slate-600 dark:text-slate-300 mb-2">Sources for Correction:</h5>
                    <ul className="space-y-2">
                        {correction.sources.map((source, index) => (
                            <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-1 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <a
                                    href={source.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                >
                                    {source.title || source.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

const ClassificationDisplay: React.FC<{ classification: string }> = ({ classification }) => {
    const getStyle = (c: string) => {
        const lower = c.toLowerCase();
        if (lower.includes('misinformation') || lower.includes('fake news') || lower.includes('scam') || lower.includes('false')) {
            return {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
                style: 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border-red-500/50'
            };
        }
        if (lower.includes('factual') || lower.includes('accurate') || lower.includes('verified')) {
            return {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
                style: 'text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border-green-500/50'
            };
        }
        return {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
            style: 'text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 border-blue-500/50'
        };
    };

    const { icon, style } = getStyle(classification);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">AI Classification</h3>
            <div className={`flex items-center p-4 rounded-lg border ${style}`}>
                <div className="flex-shrink-0 mr-4">
                    {icon}
                </div>
                <div>
                    <p className="text-lg font-bold">{classification}</p>
                </div>
            </div>
        </div>
    );
};


export const AnalysisResult: React.FC<{ result: FullAnalysis }> = ({ result }) => {
    const { report, sources } = result;
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = useCallback(() => {
        if (!report) return;

        const shareText = `
**AI Misinformation Analysis Report**
-----------------------------------
Classification: ${report.classification}
Risk Level: ${report.risk_level}
Credibility Score: ${report.credibility_score}/100

Summary:
${report.summary}
-----------------------------------
Generated by AI Misinformation Detector.
        `.trim().replace(/^\s+/gm, '');

        navigator.clipboard.writeText(shareText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error("Failed to copy analysis summary: ", err);
        });

    }, [report]);

    const overallStyle = riskStyles[report.risk_level] || riskStyles[RiskLevel.Unknown];

    return (
        <div className="relative bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-lg animate-fade-in space-y-8">
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800/50"
                aria-label="Copy analysis summary to clipboard"
            >
                {isCopied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share Analysis
                    </>
                )}
            </button>


            <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200">Analysis Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="md:col-span-1">
                            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-2">Credibility Score</p>
                            <CredibilityGauge score={report.credibility_score} />
                        </div>
                        <div className="md:col-span-2">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${overallStyle.badge}`}>
                                {overallStyle.icon}
                                Overall Risk: {report.risk_level}
                            </div>
                            <p className="mt-2 text-slate-700 dark:text-slate-300">{report.summary}</p>
                        </div>
                    </div>
                </div>

                {report.classification && (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <ClassificationDisplay classification={report.classification} />
                    </div>
                )}

                {report.corrected_information && report.corrected_information.text && (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <CorrectedInformation correction={report.corrected_information} />
                    </div>
                )}

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Detected Techniques & Concerns</h3>
                    {report.detected_techniques.length > 0 ? (
                        <div className="space-y-4">
                            {report.detected_techniques.map((tech, index) => (
                                <TechniqueCard key={index} technique={tech} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <p className="text-slate-600 dark:text-slate-400">No specific manipulative techniques were automatically detected. However, always exercise critical thinking and verify information from trusted sources.</p>
                        </div>
                    )}
                </div>

                {sources && sources.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">General Sources Consulted by AI</h3>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <ul className="space-y-3">
                                {sources.map((source, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        <a
                                            href={source.uri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {source.title || source.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};