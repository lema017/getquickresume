import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CoverLetterState,
  CoverLetterData,
  CoverLetterTemplate,
  GeneratedCoverLetter,
  defaultCoverLetterData,
} from '@/types/coverLetter';

// Extended state type with currentCoverLetterId
interface ExtendedCoverLetterState extends CoverLetterState {
  currentCoverLetterId: string | null;
  setCurrentCoverLetterId: (id: string | null) => void;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
}

export const useCoverLetterStore = create<ExtendedCoverLetterState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentCoverLetter: { ...defaultCoverLetterData },
      currentCoverLetterId: null,
      generatedContent: null,
      isGenerating: false,
      isSaved: false,
      selectedTemplate: 'modern',
      editingParagraphId: null,
      savedCoverLetters: [],

      // Actions
      updateCoverLetterData: (data: Partial<CoverLetterData>) => {
        set((state) => ({
          currentCoverLetter: {
            ...state.currentCoverLetter,
            ...data,
          },
        }));
      },

      setGeneratedContent: (content: GeneratedCoverLetter | null) => {
        set({ generatedContent: content });
      },

      updateParagraph: (paragraphId: string, content: string) => {
        set((state) => {
          if (!state.generatedContent) return state;
          
          const updatedParagraphs = state.generatedContent.paragraphs.map((p) =>
            p.id === paragraphId ? { ...p, content } : p
          );
          
          return {
            generatedContent: {
              ...state.generatedContent,
              paragraphs: updatedParagraphs,
              updatedAt: new Date(),
            },
            isSaved: false, // Mark as unsaved when editing
          };
        });
      },

      setTemplate: (template: CoverLetterTemplate) => {
        set((state) => ({
          selectedTemplate: template,
          currentCoverLetter: {
            ...state.currentCoverLetter,
            template,
          },
        }));
      },

      setEditingParagraph: (paragraphId: string | null) => {
        set({ editingParagraphId: paragraphId });
      },

      setIsGenerating: (isGenerating: boolean) => {
        set({ isGenerating });
      },

      setCurrentCoverLetterId: (id: string | null) => {
        set({ currentCoverLetterId: id });
      },

      setIsSaved: (saved: boolean) => {
        set({ isSaved: saved });
      },

      resetCoverLetter: () => {
        set({
          currentCoverLetter: { ...defaultCoverLetterData },
          currentCoverLetterId: null,
          generatedContent: null,
          isGenerating: false,
          isSaved: false,
          editingParagraphId: null,
        });
      },

      loadFromResume: (resumeData, resumeId) => {
        set((state) => ({
          currentCoverLetter: {
            ...state.currentCoverLetter,
            sourceResumeId: resumeId,
            fullName: resumeData.fullName,
            email: resumeData.email,
            phone: resumeData.phone || '',
            linkedin: resumeData.linkedin || '',
            resumeContext: resumeData.resumeContext,
          },
        }));
      },
    }),
    {
      name: 'cover-letter-storage',
      partialize: (state) => ({
        currentCoverLetter: state.currentCoverLetter,
        currentCoverLetterId: state.currentCoverLetterId,
        generatedContent: state.generatedContent,
        selectedTemplate: state.selectedTemplate,
        savedCoverLetters: state.savedCoverLetters,
        isSaved: state.isSaved,
      }),
    }
  )
);

