/**
 * Resume Extraction Service
 * Handles AI-based extraction of structured resume data from text
 * Calls the backend API for AI-powered extraction
 */

import { ResumeData, WorkExperience, Education, Project, Achievement, Certification, Language } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

export interface ExtractedResumeData {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  country: string;
  linkedin: string;
  targetLevel: 'entry' | 'mid' | 'senior' | 'executive';
  tone: 'professional' | 'creative' | 'technical' | 'friendly';
  
  // Content
  skills: string[];
  experiences: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  achievements: Achievement[];
  summary: string;
  jobDescription: string;
  
  // Metadata
  language: 'es' | 'en';
  extractionConfidence: number; // 0-100
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface ExtractionResponse {
  success: boolean;
  data?: ExtractedResumeData;
  error?: string;
  isResumeContent: boolean;
  code?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

class ResumeExtractionService {
  private async getAuthToken(): Promise<string | null> {
    return localStorage.getItem('auth-token');
  }

  /**
   * Extracts structured resume data from text using AI
   */
  async extractResumeDataFromText(
    text: string,
    language: 'es' | 'en' = 'es'
  ): Promise<ExtractionResponse> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return {
          success: false,
          error: language === 'es' 
            ? 'No estás autenticado. Por favor, inicia sesión.'
            : 'You are not authenticated. Please log in.',
          isResumeContent: false,
          code: 'UNAUTHORIZED'
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/resume-extraction/extract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          language,
        }),
      });

      const result = await response.json();

      // Handle different error codes
      if (!response.ok) {
        // Handle rate limit
        if (response.status === 429) {
          return {
            success: false,
            error: language === 'es'
              ? 'Has excedido el límite de solicitudes. Por favor, espera un momento antes de intentar de nuevo.'
              : 'Rate limit exceeded. Please wait a moment before trying again.',
            isResumeContent: false,
            code: 'RATE_LIMIT'
          };
        }

        // Handle quota exceeded (premium feature restriction - do NOT logout)
        if (response.status === 403 && result.code === 'QUOTA_EXCEEDED') {
          return {
            success: false,
            error: language === 'es'
              ? 'Has utilizado tu currículum gratuito. Actualiza a Premium para continuar.'
              : 'You have used your free resume. Upgrade to Premium to continue.',
            isResumeContent: false,
            code: 'QUOTA_EXCEEDED'
          };
        }

        // Handle auth errors (401/403) - logout and redirect
        if (response.status === 401 || response.status === 403) {
          handleAuthError();
          return {
            success: false,
            error: language === 'es'
              ? 'Sesión expirada. Por favor, inicia sesión nuevamente.'
              : 'Session expired. Please log in again.',
            isResumeContent: false,
            code: 'UNAUTHORIZED'
          };
        }

        // Handle other errors
        return {
          success: false,
          error: result.error || (language === 'es' 
            ? 'Error al procesar el documento.'
            : 'Error processing the document.'),
          isResumeContent: false,
          code: result.code
        };
      }

      // Transform the API response to match the expected format
      if (result.success && result.data) {
        const extractedData = this.transformApiResponse(result.data, language);
        return {
          success: true,
          data: extractedData,
          isResumeContent: result.isResumeContent !== false,
        };
      }

      return {
        success: false,
        error: result.error || (language === 'es'
          ? 'No se pudo extraer información del documento.'
          : 'Could not extract information from the document.'),
        isResumeContent: false,
      };

    } catch (error) {
      console.error('Resume extraction error:', error);
      return {
        success: false,
        error: language === 'es'
          ? 'Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.'
          : 'Connection error. Please check your internet connection and try again.',
        isResumeContent: false,
        code: 'NETWORK_ERROR'
      };
    }
  }

  /**
   * Transform API response to match frontend ExtractedResumeData format
   */
  private transformApiResponse(apiData: any, language: 'es' | 'en'): ExtractedResumeData {
    // Ensure arrays are arrays
    const ensureArray = (val: any) => Array.isArray(val) ? val : [];

    return {
      firstName: apiData.firstName || '',
      lastName: apiData.lastName || '',
      email: apiData.email || '',
      phone: apiData.phone || '',
      profession: apiData.profession || '',
      country: apiData.country || '',
      linkedin: apiData.linkedin || '',
      targetLevel: this.validateTargetLevel(apiData.targetLevel),
      tone: 'professional',
      skills: ensureArray(apiData.skills),
      experiences: ensureArray(apiData.experiences).map((exp: any, idx: number) => ({
        id: exp.id || `exp-${idx + 1}`,
        title: exp.title || '',
        company: exp.company || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        isCurrent: Boolean(exp.isCurrent),
        achievements: ensureArray(exp.achievements),
        responsibilities: ensureArray(exp.responsibilities),
        pageNumber: null,
      })),
      education: ensureArray(apiData.education).map((edu: any, idx: number) => ({
        id: edu.id || `edu-${idx + 1}`,
        degree: edu.degree || '',
        institution: edu.institution || '',
        field: edu.field || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        isCompleted: edu.isCompleted !== false,
        pageNumber: null,
      })),
      certifications: ensureArray(apiData.certifications).map((cert: any, idx: number) => ({
        id: cert.id || `cert-${idx + 1}`,
        name: cert.name || '',
        issuer: cert.issuer || '',
        date: cert.date || '',
        credentialId: cert.credentialId || '',
        url: cert.url || '',
        pageNumber: null,
      })),
      projects: [],
      languages: ensureArray(apiData.languages).map((lang: any, idx: number) => ({
        id: lang.id || `lang-${idx + 1}`,
        name: lang.name || '',
        level: this.validateLanguageLevel(lang.level),
        pageNumber: null,
      })),
      achievements: ensureArray(apiData.achievements).map((ach: any, idx: number) => ({
        id: ach.id || `ach-${idx + 1}`,
        title: ach.title || '',
        description: ach.description || '',
        year: ach.year || '',
        pageNumber: null,
      })),
      summary: apiData.summary || '',
      jobDescription: '',
      language,
      extractionConfidence: typeof apiData.extractionConfidence === 'number'
        ? Math.min(100, Math.max(0, apiData.extractionConfidence))
        : 75,
    };
  }

  private validateTargetLevel(level: string): 'entry' | 'mid' | 'senior' | 'executive' {
    const validLevels = ['entry', 'mid', 'senior', 'executive'];
    return validLevels.includes(level) ? level as any : 'mid';
  }

  private validateLanguageLevel(level: string): 'basic' | 'intermediate' | 'advanced' | 'native' {
    const validLevels = ['basic', 'intermediate', 'advanced', 'native'];
    return validLevels.includes(level) ? level as any : 'intermediate';
  }

  /**
   * Validates extracted data for required fields
   */
  validateExtractedData(data: Partial<ExtractedResumeData>): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Required fields
    if (!data.firstName?.trim()) {
      errors.push({
        field: 'firstName',
        message: 'First name is required',
        severity: 'error',
      });
    }

    if (!data.lastName?.trim()) {
      errors.push({
        field: 'lastName',
        message: 'Last name is required',
        severity: 'error',
      });
    }

    if (!data.email?.trim()) {
      errors.push({
        field: 'email',
        message: 'Email is required',
        severity: 'error',
      });
    } else if (!this.isValidEmail(data.email)) {
      errors.push({
        field: 'email',
        message: 'Please enter a valid email address',
        severity: 'error',
      });
    }

    if (!data.profession?.trim()) {
      errors.push({
        field: 'profession',
        message: 'Profession/Job title is required',
        severity: 'error',
      });
    }

    // Recommended fields (warnings)
    if (!data.phone?.trim()) {
      warnings.push({
        field: 'phone',
        message: 'Adding a phone number is recommended',
        severity: 'warning',
      });
    }

    if (!data.country?.trim()) {
      warnings.push({
        field: 'country',
        message: 'Adding your country is recommended',
        severity: 'warning',
      });
    }

    if (!data.skills || data.skills.length < 3) {
      warnings.push({
        field: 'skills',
        message: 'Adding at least 3 skills is recommended',
        severity: 'warning',
      });
    }

    if (!data.experiences || data.experiences.length === 0) {
      warnings.push({
        field: 'experiences',
        message: 'Adding work experience is recommended',
        severity: 'warning',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Checks if text content looks like a resume (client-side pre-check)
   */
  isResumeContent(text: string): boolean {
    const lowerText = text.toLowerCase();
    
    // Common resume keywords in both English and Spanish
    const resumeKeywords = [
      'experience', 'education', 'skills', 'work', 'employment',
      'professional', 'career', 'summary', 'responsibilities',
      'achievements', 'qualifications', 'certifications',
      'experiencia', 'educación', 'habilidades', 'trabajo',
      'profesional', 'carrera', 'resumen', 'responsabilidades',
      'logros', 'calificaciones', 'certificaciones',
      'email', 'phone', 'linkedin', 'correo', 'teléfono',
    ];
    
    // Count matching keywords
    const matchCount = resumeKeywords.filter(kw => lowerText.includes(kw)).length;
    
    // Also check for email pattern
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    
    // Check for phone pattern
    const hasPhone = /[\d\s\-\(\)\+]{7,}/.test(text);
    
    return matchCount >= 3 || (matchCount >= 2 && (hasEmail || hasPhone));
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Converts extracted data to ResumeData format for the wizard
   */
  convertToResumeData(extracted: ExtractedResumeData): Partial<ResumeData> {
    return {
      firstName: extracted.firstName,
      lastName: extracted.lastName,
      email: extracted.email,
      phone: extracted.phone,
      profession: extracted.profession,
      country: extracted.country,
      linkedin: extracted.linkedin,
      targetLevel: extracted.targetLevel,
      tone: extracted.tone,
      skillsRaw: extracted.skills,
      experience: extracted.experiences,
      education: extracted.education,
      certifications: extracted.certifications,
      projects: extracted.projects,
      languages: extracted.languages,
      achievements: extracted.achievements,
      summary: extracted.summary,
      jobDescription: extracted.jobDescription || '',
      language: extracted.language,
    };
  }
}

export const resumeExtractionService = new ResumeExtractionService();
