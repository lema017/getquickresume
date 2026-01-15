/**
 * Client-side document text extraction utility
 * Extracts text from PDF, DOCX, and TXT files in the browser
 */

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker - use Vite-compatible URL resolution
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// Supported file types
export const SUPPORTED_FILE_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'text/plain': 'txt',
} as const;

export const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.txt'];

// Tiered file size limits
export const FILE_SIZE_LIMITS = {
  FREE: 2 * 1024 * 1024,      // 2 MB for free users
  PREMIUM: 10 * 1024 * 1024,  // 10 MB for premium users
};

// Keep for backwards compatibility
export const MAX_FILE_SIZE = FILE_SIZE_LIMITS.PREMIUM;
export const MAX_TEXT_LENGTH = 50 * 1024; // 50KB of text

export interface ExtractionResult {
  success: boolean;
  text: string;
  error?: string;
  fileType: string;
  fileName: string;
  characterCount: number;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  fileSizeMB?: number;
  maxSizeMB?: number;
  showFileSizeModal?: boolean;
}

/**
 * Validates the file type and size before extraction
 * @param file - The file to validate
 * @param isPremium - Whether the user has a premium account (affects file size limit)
 */
export function validateFile(file: File, isPremium: boolean = false): FileValidationResult {
  const maxFileSize = isPremium ? FILE_SIZE_LIMITS.PREMIUM : FILE_SIZE_LIMITS.FREE;
  const fileSizeMB = file.size / (1024 * 1024);
  const maxSizeMB = maxFileSize / (1024 * 1024);

  // Check file size with tiered limits
  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${maxSizeMB}MB`,
      fileSizeMB,
      maxSizeMB,
      showFileSizeModal: true,
    };
  }

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type;

  const isValidMime = mimeType in SUPPORTED_FILE_TYPES;
  const isValidExtension = SUPPORTED_EXTENSIONS.includes(fileExtension);

  if (!isValidMime && !isValidExtension) {
    return {
      valid: false,
      error: `Unsupported file type. Please upload a PDF, DOCX, or TXT file.`,
    };
  }

  return { valid: true };
}

/**
 * Gets the file type from file object
 */
export function getFileType(file: File): string {
  const mimeType = file.type as keyof typeof SUPPORTED_FILE_TYPES;
  if (mimeType in SUPPORTED_FILE_TYPES) {
    return SUPPORTED_FILE_TYPES[mimeType];
  }
  
  // Fallback to extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension || 'unknown';
}

/**
 * Extracts text from a PDF file using pdf.js
 */
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const textParts: string[] = [];
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      textParts.push(pageText);
    }
    
    return textParts.join('\n\n').trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. The file may be corrupted or password-protected.');
  }
}

/**
 * Extracts text from a DOCX file using mammoth
 */
async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from Word document. The file may be corrupted.');
  }
}

/**
 * Extracts text from a plain text file
 */
async function extractTextFromTXT(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text.trim());
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read text file.'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Main function to extract text from any supported file type
 * @param file - The file to extract text from
 * @param isPremium - Whether the user has a premium account (affects file size limit)
 */
export async function extractTextFromFile(file: File, isPremium: boolean = false): Promise<ExtractionResult> {
  // Validate file first
  const validation = validateFile(file, isPremium);
  if (!validation.valid) {
    return {
      success: false,
      text: '',
      error: validation.error,
      fileType: getFileType(file),
      fileName: file.name,
      characterCount: 0,
    };
  }

  const fileType = getFileType(file);
  let extractedText = '';

  try {
    switch (fileType) {
      case 'pdf':
        extractedText = await extractTextFromPDF(file);
        break;
      case 'docx':
      case 'doc':
        extractedText = await extractTextFromDOCX(file);
        break;
      case 'txt':
        extractedText = await extractTextFromTXT(file);
        break;
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }

    // Check if we got any text
    if (!extractedText || extractedText.length < 50) {
      return {
        success: false,
        text: extractedText,
        error: 'The document appears to be empty or contains very little text.',
        fileType,
        fileName: file.name,
        characterCount: extractedText.length,
      };
    }

    // Truncate if too long
    if (extractedText.length > MAX_TEXT_LENGTH) {
      extractedText = extractedText.substring(0, MAX_TEXT_LENGTH);
    }

    // Basic sanitization - remove potential prompt injection patterns
    extractedText = sanitizeText(extractedText);

    return {
      success: true,
      text: extractedText,
      fileType,
      fileName: file.name,
      characterCount: extractedText.length,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during text extraction';
    return {
      success: false,
      text: '',
      error: errorMessage,
      fileType,
      fileName: file.name,
      characterCount: 0,
    };
  }
}

/**
 * Sanitizes extracted text to prevent prompt injection
 * Removes suspicious patterns that could be interpreted as AI instructions
 */
function sanitizeText(text: string): string {
  // Remove potential instruction-like patterns
  // This is a basic sanitization - backend should do more thorough validation
  let sanitized = text;
  
  // Remove markdown code blocks that might contain instructions
  sanitized = sanitized.replace(/```[\s\S]*?```/g, '[code block removed]');
  
  // Remove XML/HTML-like tags that might be interpreted as system prompts
  sanitized = sanitized.replace(/<\/?(?:system|assistant|user|prompt|instruction)[^>]*>/gi, '');
  
  // Remove lines that start with common prompt patterns
  sanitized = sanitized.replace(/^(?:ignore|forget|disregard|system:?|instruction:?|prompt:?).*/gim, '');
  
  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  // Re-add paragraph breaks for readability
  sanitized = sanitized.replace(/\. /g, '.\n');
  
  return sanitized;
}

/**
 * Checks if extracted text looks like a resume
 * Basic heuristic check - backend AI will do proper validation
 */
export function looksLikeResume(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Common resume keywords
  const resumeKeywords = [
    'experience',
    'education',
    'skills',
    'work history',
    'employment',
    'professional',
    'career',
    'objective',
    'summary',
    'responsibilities',
    'achievements',
    'qualifications',
    'certifications',
    'references',
    'linkedin',
    'email',
    'phone',
    'address',
    'university',
    'degree',
    'bachelor',
    'master',
    'mba',
    // Spanish keywords
    'experiencia',
    'educación',
    'habilidades',
    'historial laboral',
    'profesional',
    'carrera',
    'objetivo',
    'resumen',
    'responsabilidades',
    'logros',
    'calificaciones',
    'certificaciones',
    'referencias',
    'correo',
    'teléfono',
    'dirección',
    'universidad',
    'licenciatura',
    'maestría',
  ];
  
  // Count how many keywords are present
  const keywordCount = resumeKeywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;
  
  // If at least 3 keywords are present, it's likely a resume
  return keywordCount >= 3;
}

