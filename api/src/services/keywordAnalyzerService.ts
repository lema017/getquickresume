/**
 * Keyword Analyzer Service
 * 
 * Uses AI to analyze resume content and identify relevant keywords
 * that are already present in the resume. Scores based on keyword density
 * and relevance to the profession.
 */

import { getAIConfigForUser } from '../utils/aiProviderSelector';
import { trackAIUsage, AIResponse, TokenUsage } from './aiUsageService';
import { jsonrepair } from 'jsonrepair';

// ============================================================================
// Types
// ============================================================================

export interface KeywordCategory {
  hardSkills: string[];      // Technical skills: React, Python, AWS
  softSkills: string[];      // Soft skills: leadership, collaboration
  actionVerbs: string[];     // Action verbs: implemented, led, optimized
  industryTerms: string[];   // Industry terms: agile, CI/CD, microservices
}

export type ATSScoreTier = 'excellent' | 'good' | 'fair' | 'needs-work';

export interface KeywordAnalysis {
  totalKeywordsFound: number;
  keywords: KeywordCategory;
  atsScore: ATSScoreTier;
  scoreValue: number;  // 0-10 scale
  tierLabel: string;
  breakdown: string;
  analyzedAt: string;
}

// ============================================================================
// Scoring Tiers
// ============================================================================

const SCORING_TIERS = {
  excellent: { min: 25, label: 'Strong ATS Match', score: 10 },
  good: { min: 15, label: 'Good ATS Match', score: 7.5 },
  fair: { min: 8, label: 'Fair ATS Match', score: 5 },
  'needs-work': { min: 0, label: 'Needs More Keywords', score: 2.5 },
} as const;

// ============================================================================
// In-memory cache for keyword analysis
// ============================================================================

interface CacheEntry {
  analysis: KeywordAnalysis;
  expiresAt: number;
}

// Cache keyword analysis for 1 hour per resume
const CACHE_TTL_MS = 60 * 60 * 1000;
const analysisCache = new Map<string, CacheEntry>();

function getCacheKey(resumeId: string, profession: string): string {
  return `${resumeId}:${profession}`;
}

function getCachedAnalysis(resumeId: string, profession: string): KeywordAnalysis | null {
  const key = getCacheKey(resumeId, profession);
  const cached = analysisCache.get(key);
  
  if (cached && cached.expiresAt > Date.now()) {
    console.log(`[KeywordAnalyzer] Cache hit for ${key}`);
    return cached.analysis;
  }
  
  if (cached) {
    analysisCache.delete(key);
  }
  
  return null;
}

function setCachedAnalysis(resumeId: string, profession: string, analysis: KeywordAnalysis): void {
  const key = getCacheKey(resumeId, profession);
  analysisCache.set(key, {
    analysis,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
  console.log(`[KeywordAnalyzer] Cached analysis for ${key}`);
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of analysisCache.entries()) {
    if (entry.expiresAt <= now) {
      analysisCache.delete(key);
    }
  }
}, 10 * 60 * 1000); // Clean up every 10 minutes

// ============================================================================
// Service
// ============================================================================

class KeywordAnalyzerService {
  /**
   * Analyze resume content for ATS-relevant keywords
   */
  async analyzeKeywords(params: {
    resumeId: string;
    profession: string;
    resumeText: string;
    userId?: string;
    isPremium?: boolean;
  }): Promise<KeywordAnalysis> {
    const { resumeId, profession, resumeText, userId, isPremium = false } = params;
    
    // Check cache first
    const cached = getCachedAnalysis(resumeId, profession);
    if (cached) {
      return cached;
    }
    
    console.log(`[KeywordAnalyzer] Analyzing keywords for profession: ${profession}`);
    
    // Build the AI prompt
    const prompt = this.buildPrompt(profession, resumeText);
    
    // Call AI to extract keywords
    const { provider, model } = getAIConfigForUser(isPremium);
    
    let aiResponse: AIResponse;
    
    try {
      if (provider === 'openai') {
        aiResponse = await this.callOpenAI(prompt, model);
      } else if (provider === 'groq') {
        aiResponse = await this.callGroq(prompt, model);
      } else {
        aiResponse = await this.callAnthropic(prompt, model);
      }
      
      // Track AI usage
      if (userId) {
        await trackAIUsage({
          userId,
          resumeId,
          endpoint: 'keywordAnalysis',
          provider,
          model,
          usage: aiResponse.usage,
          isPremium,
        }).catch(err => console.warn('Failed to track AI usage:', err));
      }
      
      // Parse the response
      const analysis = this.parseResponse(aiResponse.content);
      
      // Cache the result
      setCachedAnalysis(resumeId, profession, analysis);
      
      return analysis;
    } catch (error) {
      console.error('[KeywordAnalyzer] Error analyzing keywords:', error);
      
      // Return a default analysis on error
      return this.createDefaultAnalysis();
    }
  }
  
  /**
   * Build the AI prompt for keyword extraction
   */
  private buildPrompt(profession: string, resumeText: string): string {
    return `You are an ATS (Applicant Tracking System) keyword analyzer. Analyze the following resume for a ${profession} position.

Your task is to EXTRACT only the keywords that are ALREADY PRESENT in the resume text. Do NOT suggest new keywords - only identify what's there.

Categorize the found keywords into:
1. hardSkills - Technical skills, programming languages, frameworks, methodologies (e.g., React, Python, AWS, Agile)
2. softSkills - Interpersonal and transferable skills (e.g., leadership, communication, problem-solving)
3. actionVerbs - Strong action verbs that describe achievements (e.g., implemented, led, optimized, delivered)
4. industryTerms - Industry-specific terminology and buzzwords (e.g., CI/CD, microservices, scalability, ROI)

RESUME TEXT:
${resumeText}

IMPORTANT RULES:
- Only include keywords that are ACTUALLY FOUND in the resume text above
- Remove duplicates (if "React" appears 3 times, only list it once)
- Include variations as separate entries only if meaningfully different
- Case-insensitive matching but preserve original casing
- Minimum 2 characters per keyword

Respond with ONLY valid JSON in this exact format:
{
  "hardSkills": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "actionVerbs": ["verb1", "verb2"],
  "industryTerms": ["term1", "term2"]
}`;
  }
  
  /**
   * Parse the AI response into KeywordAnalysis
   */
  private parseResponse(content: string): KeywordAnalysis {
    try {
      // Clean up the response
      let cleanedContent = content.trim();
      
      // Remove markdown code blocks if present
      cleanedContent = cleanedContent.replace(/```json\s*/gi, '').replace(/```\s*/gi, '');
      
      // Try to repair malformed JSON
      const repairedJson = jsonrepair(cleanedContent);
      const parsed = JSON.parse(repairedJson);
      
      const keywords: KeywordCategory = {
        hardSkills: this.sanitizeArray(parsed.hardSkills),
        softSkills: this.sanitizeArray(parsed.softSkills),
        actionVerbs: this.sanitizeArray(parsed.actionVerbs),
        industryTerms: this.sanitizeArray(parsed.industryTerms),
      };
      
      // Calculate totals
      const totalKeywordsFound = 
        keywords.hardSkills.length +
        keywords.softSkills.length +
        keywords.actionVerbs.length +
        keywords.industryTerms.length;
      
      // Determine tier
      const { tier, tierLabel, scoreValue } = this.calculateTier(totalKeywordsFound);
      
      // Build breakdown string
      const breakdown = `Hard Skills: ${keywords.hardSkills.length} | Soft Skills: ${keywords.softSkills.length} | Action Verbs: ${keywords.actionVerbs.length} | Industry Terms: ${keywords.industryTerms.length}`;
      
      return {
        totalKeywordsFound,
        keywords,
        atsScore: tier,
        scoreValue,
        tierLabel,
        breakdown,
        analyzedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('[KeywordAnalyzer] Failed to parse AI response:', error, 'Content:', content);
      return this.createDefaultAnalysis();
    }
  }
  
  /**
   * Sanitize array of keywords
   */
  private sanitizeArray(arr: unknown): string[] {
    if (!Array.isArray(arr)) return [];
    
    return arr
      .filter((item): item is string => typeof item === 'string' && item.trim().length >= 2)
      .map(item => item.trim())
      .filter((item, index, self) => self.indexOf(item) === index); // Remove duplicates
  }
  
  /**
   * Calculate the scoring tier based on keyword count
   */
  private calculateTier(totalKeywords: number): { tier: ATSScoreTier; tierLabel: string; scoreValue: number } {
    if (totalKeywords >= SCORING_TIERS.excellent.min) {
      return {
        tier: 'excellent',
        tierLabel: SCORING_TIERS.excellent.label,
        scoreValue: SCORING_TIERS.excellent.score,
      };
    } else if (totalKeywords >= SCORING_TIERS.good.min) {
      return {
        tier: 'good',
        tierLabel: SCORING_TIERS.good.label,
        scoreValue: SCORING_TIERS.good.score,
      };
    } else if (totalKeywords >= SCORING_TIERS.fair.min) {
      return {
        tier: 'fair',
        tierLabel: SCORING_TIERS.fair.label,
        scoreValue: SCORING_TIERS.fair.score,
      };
    } else {
      return {
        tier: 'needs-work',
        tierLabel: SCORING_TIERS['needs-work'].label,
        scoreValue: SCORING_TIERS['needs-work'].score,
      };
    }
  }
  
  /**
   * Create a default analysis for error cases
   */
  private createDefaultAnalysis(): KeywordAnalysis {
    return {
      totalKeywordsFound: 0,
      keywords: {
        hardSkills: [],
        softSkills: [],
        actionVerbs: [],
        industryTerms: [],
      },
      atsScore: 'needs-work',
      scoreValue: 0,
      tierLabel: 'Unable to analyze',
      breakdown: 'Analysis failed - please try again',
      analyzedAt: new Date().toISOString(),
    };
  }
  
  /**
   * Clear cache for a specific resume (call after resume update)
   */
  clearCache(resumeId: string): void {
    for (const key of analysisCache.keys()) {
      if (key.startsWith(`${resumeId}:`)) {
        analysisCache.delete(key);
      }
    }
    console.log(`[KeywordAnalyzer] Cleared cache for resume ${resumeId}`);
  }
  
  // ============================================================================
  // AI Provider Calls
  // ============================================================================
  
  private async callOpenAI(prompt: string, model: string): Promise<AIResponse> {
    const apiKey = process.env.OPENAI_API_KEY || '';
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an ATS keyword analyzer. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    return {
      content: data.choices[0]?.message?.content || '{}',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  }
  
  private async callGroq(prompt: string, model: string): Promise<AIResponse> {
    const apiKey = process.env.GROQ_API_KEY || '';
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: 'You are an ATS keyword analyzer. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    return {
      content: data.choices[0]?.message?.content || '{}',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  }
  
  private async callAnthropic(prompt: string, model: string): Promise<AIResponse> {
    const apiKey = process.env.ANTHROPIC_API_KEY || '';
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-3-haiku-20240307',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    return {
      content: data.content?.[0]?.text || '{}',
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
      },
    };
  }
}

export const keywordAnalyzerService = new KeywordAnalyzerService();

