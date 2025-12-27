import { ResumeData, GeneratedResume } from '../types';
import { TokenUsage, trackAIUsage } from './aiUsageService';

interface TranslationTrackingContext {
  userId: string;
  resumeId?: string;
  isPremium: boolean;
}

/**
 * Service for translating resumes to different languages using AI
 */
class TranslationService {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.model = process.env.AI_MODEL || 'gpt-4o';
  }

  /**
   * Translate a resume to a target language
   */
  async translateResume(
    resumeData: ResumeData,
    generatedResume: GeneratedResume,
    targetLanguage: string,
    trackingContext?: TranslationTrackingContext
  ): Promise<{ translatedResumeData: ResumeData; translatedGeneratedResume: GeneratedResume }> {
    try {
      // Build translation prompt
      const prompt = this.buildTranslationPrompt(resumeData, generatedResume, targetLanguage);

      // Call OpenAI API with usage tracking
      const { content, usage } = await this.callOpenAIWithUsage(prompt);

      // Track AI usage if context provided
      if (trackingContext) {
        await trackAIUsage({
          userId: trackingContext.userId,
          resumeId: trackingContext.resumeId,
          endpoint: 'translateResume',
          provider: 'openai',
          model: this.model,
          usage,
          isPremium: trackingContext.isPremium
        });
      }

      // Parse the translated content
      const translated = this.parseTranslationResponse(content, targetLanguage);

      return translated;
    } catch (error) {
      console.error('Error translating resume:', error);
      throw new Error('Failed to translate resume');
    }
  }

  /**
   * Build the translation prompt for AI
   */
  private buildTranslationPrompt(
    resumeData: ResumeData,
    generatedResume: GeneratedResume,
    targetLanguage: string
  ): string {
    const languageNames: Record<string, string> = {
      'en': 'English',
      'zh': 'Mandarin Chinese',
      'hi': 'Hindi',
      'es': 'Spanish',
      'fr': 'French',
      'ar': 'Arabic',
      'bn': 'Bengali',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese'
    };

    const targetLanguageName = languageNames[targetLanguage] || targetLanguage;

    return `You are a professional resume translator. Translate the following resume to ${targetLanguageName} (language code: ${targetLanguage}).

IMPORTANT RULES:
1. Translate ALL text content including names, descriptions, summaries, achievements, etc.
2. Keep the structure and formatting exactly the same
3. Maintain professional tone and terminology appropriate for the target language
4. Translate dates to the format used in the target language/culture
5. Keep technical terms, company names, and URLs unchanged unless they have standard translations
6. Return ONLY valid JSON matching the exact structure provided

RESUME DATA TO TRANSLATE:
${JSON.stringify(resumeData, null, 2)}

GENERATED RESUME TO TRANSLATE:
${JSON.stringify(generatedResume, null, 2)}

Return the translated resume in this exact JSON format:
{
  "translatedResumeData": { ... },
  "translatedGeneratedResume": { ... }
}

Ensure all text fields are translated to ${targetLanguageName}.`;
  }

  /**
   * Call OpenAI API for translation with usage tracking
   */
  private async callOpenAIWithUsage(prompt: string): Promise<{ content: string; usage: TokenUsage }> {
    const requestBody: any = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume translator. Translate resumes accurately while maintaining professional tone and structure. Always return valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 8000
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let errorMessage = `OpenAI API error: ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorBody);
        errorMessage = `OpenAI API error: ${errorJson.error?.message || response.statusText}`;
      } catch (e) {
        // Ignore parse error
      }
      throw new Error(errorMessage);
    }

    const data = await response.json() as any;
    const content = data.choices[0]?.message?.content || '';
    
    // Extract usage data
    const usage: TokenUsage = {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0
    };
    
    if (!content || content.trim().length === 0) {
      throw new Error('OpenAI API returned empty response');
    }
    
    return { content, usage };
  }

  /**
   * Parse the translation response from AI
   */
  private parseTranslationResponse(
    response: string,
    targetLanguage: string
  ): { translatedResumeData: ResumeData; translatedGeneratedResume: GeneratedResume } {
    try {
      const parsed = JSON.parse(response);
      
      if (!parsed.translatedResumeData || !parsed.translatedGeneratedResume) {
        throw new Error('Invalid translation response structure');
      }

      // Update language field in resumeData
      parsed.translatedResumeData.language = targetLanguage as 'es' | 'en';

      return {
        translatedResumeData: parsed.translatedResumeData as ResumeData,
        translatedGeneratedResume: parsed.translatedGeneratedResume as GeneratedResume
      };
    } catch (error) {
      console.error('Error parsing translation response:', error);
      throw new Error('Failed to parse translation response');
    }
  }
}

export const translationService = new TranslationService();

