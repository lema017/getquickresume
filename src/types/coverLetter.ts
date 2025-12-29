// Cover Letter Types

export type CoverLetterTone = 'professional' | 'friendly' | 'confident' | 'creative';
export type CoverLetterLength = 'concise' | 'standard' | 'detailed';
export type CoverLetterTemplate = 'classic' | 'modern' | 'minimal' | 'creative';

// Resume context for AI-powered cover letter generation
export interface ResumeContext {
  profession?: string;
  skills?: string[];
  experienceSummary?: string; // Condensed work history
  summary?: string; // Professional summary from resume
  achievements?: string[]; // Key achievements from resume
}

export interface CoverLetterParagraph {
  id: string;
  type: 'greeting' | 'opening' | 'body' | 'skills' | 'closing' | 'signature';
  content: string;
  isEditing?: boolean;
}

export interface CoverLetterData {
  // Source
  sourceResumeId?: string;
  resumeContext?: ResumeContext; // Rich context from selected resume
  
  // Company & Job Details
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  hiringManagerName?: string;
  
  // Personal Touch
  whyThisCompany?: string;
  keyAchievement?: string;
  
  // User Info (from resume or manual input)
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  
  // Tone & Style
  tone: CoverLetterTone;
  length: CoverLetterLength;
  template: CoverLetterTemplate;
  
  // Language for AI output
  language?: 'en' | 'es';
}

export interface GeneratedCoverLetter {
  id: string;
  paragraphs: CoverLetterParagraph[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CoverLetter {
  id: string;
  userId: string;
  title: string;
  data: CoverLetterData;
  generatedContent?: GeneratedCoverLetter;
  status: 'draft' | 'generated' | 'saved';
  aiCost?: {
    totalInputTokens: number;
    totalOutputTokens: number;
    totalCostUSD: number;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CoverLetterState {
  // Current cover letter being edited
  currentCoverLetter: CoverLetterData;
  generatedContent: GeneratedCoverLetter | null;
  
  // UI State
  isGenerating: boolean;
  isSaved: boolean;
  selectedTemplate: CoverLetterTemplate;
  editingParagraphId: string | null;
  
  // Saved cover letters
  savedCoverLetters: CoverLetter[];
  
  // Actions
  updateCoverLetterData: (data: Partial<CoverLetterData>) => void;
  setGeneratedContent: (content: GeneratedCoverLetter | null) => void;
  updateParagraph: (paragraphId: string, content: string) => void;
  setTemplate: (template: CoverLetterTemplate) => void;
  setEditingParagraph: (paragraphId: string | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsSaved: (isSaved: boolean) => void;
  resetCoverLetter: () => void;
  loadFromResume: (resumeData: {
    fullName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    resumeContext?: ResumeContext;
  }, resumeId: string) => void;
}

// Default values
export const defaultCoverLetterData: CoverLetterData = {
  companyName: '',
  jobTitle: '',
  jobDescription: '',
  hiringManagerName: '',
  whyThisCompany: '',
  keyAchievement: '',
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  tone: 'professional',
  length: 'standard',
  template: 'modern',
  language: 'en',
};

