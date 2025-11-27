export interface ProjectCandidate {
    name: string;
    dateRange?: string;
    description?: string;
    technologies?: string[];
}
export declare function extractProjectCandidates(raw: string): ProjectCandidate[];
//# sourceMappingURL=projectExtractor.d.ts.map