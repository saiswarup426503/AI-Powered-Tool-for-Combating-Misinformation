export enum RiskLevel {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Unknown = "Unknown"
}

export interface ManipulativeTechnique {
    technique_name: string;
    explanation: string;
    risk_level: RiskLevel;
}

export interface Source {
    uri: string;
    title: string;
}

export interface CorrectedInformation {
    text: string;
    sources: Source[];
}

export interface AnalysisReport {
    risk_level: RiskLevel;
    credibility_score: number;
    summary: string;
    classification: string;
    detected_techniques: ManipulativeTechnique[];
    corrected_information?: CorrectedInformation;
}


export interface FullAnalysis {
    report: AnalysisReport;
    sources: Source[];
}