import { Resume } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export type ResumeTranslationMode = 'translate' | 'rewrite';

export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: 'Mandarin Chinese', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export const resumeTranslationService = {
  /**
   * Translate a resume to a target language
   */
  async translateResume(
    resumeId: string,
    targetLanguage: string,
    mode: ResumeTranslationMode = 'translate'
  ): Promise<Resume> {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${API_BASE_URL}/api/resumes/${resumeId}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ targetLanguage, mode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to translate resume');
      }

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Invalid response from server');
      }

      return data.data;
    } catch (error) {
      console.error('Error translating resume:', error);
      throw error;
    }
  },

  /**
   * Get list of supported languages
   */
  getSupportedLanguages(): SupportedLanguage[] {
    return SUPPORTED_LANGUAGES;
  },
};

