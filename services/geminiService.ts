import { GoogleGenAI } from "@google/genai";
import { FullAnalysis, AnalysisReport, Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface TextInput {
    type: 'text';
    value: string;
}
export interface UrlInput {
    type: 'url';
    value: string;
}
export interface MediaInput {
    type: 'media';
    base64Data: string;
    mimeType: string;
    promptText: string;
}

export type AnalysisInput = TextInput | UrlInput | MediaInput;

const buildBasePrompt = (languageInstruction: string, taskInstruction: string) => `
    ${languageInstruction}

    ${taskInstruction}

    Based on your analysis, provide a structured response in JSON format. The response must be a single JSON object with the following properties:
    1.  "risk_level": An overall risk level. This value MUST be one of the following English strings: 'Low', 'Medium', 'High', or 'Unknown'.
    2.  "credibility_score": A numerical score from 0 (very untrustworthy) to 100 (very trustworthy).
    3.  "summary": A brief summary of your main findings (in the language specified by the language instruction).
    4.  "classification": A brief, direct classification of the content (e.g., "Likely Misinformation", "Satire", "Opinion Piece", "Factual Reporting"). This classification must be in the language specified by the language instruction.
    5.  "detected_techniques": An array of objects, where each object has a "technique_name", an "explanation", and its specific "risk_level". The "technique_name" and "explanation" must be in the language specified by the language instruction. The "risk_level" value MUST be one of the following English strings: 'Low', 'Medium', 'High', or 'Unknown'.
    6.  "corrected_information": If the analysis identifies factual inaccuracies (typically for 'Medium' or 'High' risk levels), provide an object with two properties:
        a. "text": A clear, concise, and factually correct version of the information (in the language specified by the language instruction).
        b. "sources": An array of source objects that directly support the corrected information. Each object must have a "uri" and a "title". The title can be in its original language.
        If the content is largely accurate or the risk is 'Low', this entire "corrected_information" property can be omitted.
`;

export const analyzeContent = async (input: AnalysisInput, outputLanguage: string): Promise<FullAnalysis> => {
    let contents: any;

    const languageInstruction = `**Primary Instruction:** Your response MUST be in ${outputLanguage}. All string values in the final JSON object (summary, classification, technique names, explanations, corrected information) must be translated into ${outputLanguage}. The only exceptions are source titles and URIs, which should remain in their original form.`;

    if (input.type === 'text') {
        const taskInstruction = `Analyze the following text for signs of misinformation, fake news, scams, or manipulative techniques. Your goal is to assess its credibility and educate the user. Use Google Search to find relevant, up-to-date information to support your analysis.`;
        const prompt = buildBasePrompt(languageInstruction, taskInstruction) + `\n\nText to analyze:\n---\n${input.value}\n---`;
        contents = prompt;
    } else if (input.type === 'url') {
        const taskInstruction = `Analyze the content of the webpage at the following URL for signs of misinformation, fake news, scams, or manipulative techniques. Your goal is to assess its credibility and educate the user. Use Google Search to access the page and find relevant, up-to-date information to support your analysis.`;
        const prompt = buildBasePrompt(languageInstruction, taskInstruction) + `\n\nWebpage URL to analyze:\n---\n${input.value}\n---`;
        contents = prompt;
    } else if (input.type === 'media') {
        const taskInstruction = `Analyze the following file (image or document) and the associated text prompt for signs of misinformation, fake news, scams, or manipulative techniques. Your goal is to assess its credibility and educate the user. Use Google Search to find relevant, up-to-date information to support your analysis.`;
        const prompt = buildBasePrompt(languageInstruction, taskInstruction) + `\n\nUser's text prompt (use this as context):\n---\n${input.promptText || 'No additional context provided.'}\n---`;
        contents = {
            parts: [
                { text: prompt },
                {
                    inlineData: {
                        data: input.base64Data,
                        mimeType: input.mimeType,
                    },
                },
            ],
        };
    } else {
        throw new Error("Invalid input type for analysis.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                tools: [{ googleSearch: {} }],
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        const jsonText = response.text.trim();
        const jsonStart = jsonText.indexOf('{');
        const jsonEnd = jsonText.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("The AI model returned a response that was not valid JSON.");
        }
        const jsonBlock = jsonText.substring(jsonStart, jsonEnd + 1);

        const report = JSON.parse(jsonBlock) as AnalysisReport;

        report.credibility_score = Math.max(0, Math.min(100, report.credibility_score));

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources: Source[] = (groundingMetadata?.groundingChunks ?? [])
            .map((chunk: any) => {
                if (chunk.web && chunk.web.uri) {
                    return {
                        uri: chunk.web.uri,
                        title: chunk.web.title || chunk.web.uri
                    };
                }
                return null;
            })
            .filter((source: Source | null): source is Source => source !== null);

        const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

        return { report, sources: uniqueSources };
    } catch (error) {
        console.error("Error analyzing content with Gemini API:", error);
        if (error instanceof SyntaxError) {
            throw new Error("Failed to analyze the content. The AI model returned an invalid format.");
        }
        throw new Error("Failed to analyze the content. The AI model may be unavailable or the content could not be processed.");
    }
};