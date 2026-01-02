// URL Validation Utilities for Job Tailoring Feature

import { SUPPORTED_DOMAINS } from '@/types/jobTailoring';

/**
 * Check if a string is a valid URL format
 */
export function isValidUrlFormat(url: string): boolean {
  try {
    const urlObj = new URL(url);
    // Must be http or https
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Check if URL uses HTTPS (recommended for job posting URLs)
 */
export function isSecureUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Extract the domain from a URL
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Check if the URL is from a supported job board domain
 */
export function isSupportedJobBoard(url: string): { supported: boolean; domain?: string } {
  const domain = extractDomain(url);
  if (!domain) {
    return { supported: false };
  }

  const matchedDomain = SUPPORTED_DOMAINS.find(supportedDomain => {
    // Check if the URL contains the supported domain pattern
    const domainLower = domain.toLowerCase();
    const pathLower = url.toLowerCase();
    
    if (supportedDomain.includes('/')) {
      // For patterns like 'linkedin.com/jobs', check both domain and path
      return pathLower.includes(supportedDomain);
    }
    // For simple domains, just check hostname
    return domainLower.includes(supportedDomain.replace('.com', ''));
  });

  return {
    supported: !!matchedDomain,
    domain: matchedDomain || domain
  };
}

/**
 * Get a user-friendly name for a job board domain
 */
export function getJobBoardName(url: string): string {
  const domain = extractDomain(url);
  if (!domain) return 'Unknown';

  const domainLower = domain.toLowerCase();

  if (domainLower.includes('linkedin')) return 'LinkedIn';
  if (domainLower.includes('indeed')) return 'Indeed';
  if (domainLower.includes('glassdoor')) return 'Glassdoor';
  if (domainLower.includes('monster')) return 'Monster';
  if (domainLower.includes('ziprecruiter')) return 'ZipRecruiter';
  if (domainLower.includes('greenhouse')) return 'Greenhouse';
  if (domainLower.includes('lever')) return 'Lever';
  if (domainLower.includes('workday')) return 'Workday';

  // Return cleaned up domain name
  return domain.replace('www.', '').split('.')[0];
}

/**
 * Validate URL and return detailed validation result
 */
export interface UrlFormatValidation {
  isValid: boolean;
  isSecure: boolean;
  isSupportedJobBoard: boolean;
  jobBoardName?: string;
  error?: string;
}

export function validateUrlFormat(url: string): UrlFormatValidation {
  // Check for empty input
  if (!url || !url.trim()) {
    return {
      isValid: false,
      isSecure: false,
      isSupportedJobBoard: false,
      error: 'Please enter a URL'
    };
  }

  const trimmedUrl = url.trim();

  // Check if it looks like a URL (has a dot and no spaces)
  if (!trimmedUrl.includes('.') || trimmedUrl.includes(' ')) {
    return {
      isValid: false,
      isSecure: false,
      isSupportedJobBoard: false,
      error: 'This doesn\'t look like a valid URL'
    };
  }

  // Add protocol if missing
  let urlToValidate = trimmedUrl;
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    urlToValidate = 'https://' + trimmedUrl;
  }

  // Validate URL format
  if (!isValidUrlFormat(urlToValidate)) {
    return {
      isValid: false,
      isSecure: false,
      isSupportedJobBoard: false,
      error: 'Invalid URL format'
    };
  }

  const secure = isSecureUrl(urlToValidate);
  const jobBoardCheck = isSupportedJobBoard(urlToValidate);
  const jobBoardName = getJobBoardName(urlToValidate);

  return {
    isValid: true,
    isSecure: secure,
    isSupportedJobBoard: jobBoardCheck.supported,
    jobBoardName: jobBoardName
  };
}

/**
 * Normalize URL (add https if missing, remove trailing slashes, etc.)
 */
export function normalizeUrl(url: string): string {
  let normalized = url.trim();
  
  // Add https if no protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }

  // Remove trailing slash
  if (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

/**
 * Check if input looks like a URL (for detecting input type)
 */
export function looksLikeUrl(input: string): boolean {
  const trimmed = input.trim();
  
  // Check for URL indicators
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return true;
  }
  
  // Check for common domain patterns
  const urlPatterns = [
    /^www\./i,
    /\.com\//i,
    /\.io\//i,
    /\.co\//i,
    /linkedin\.com/i,
    /indeed\.com/i,
    /glassdoor\.com/i,
    /greenhouse\.io/i,
    /lever\.co/i,
  ];
  
  return urlPatterns.some(pattern => pattern.test(trimmed));
}

/**
 * Get supported job boards list for display
 */
export function getSupportedJobBoardsList(): { name: string; domain: string }[] {
  return [
    { name: 'LinkedIn', domain: 'linkedin.com/jobs' },
    { name: 'Indeed', domain: 'indeed.com' },
    { name: 'Glassdoor', domain: 'glassdoor.com' },
    { name: 'Monster', domain: 'monster.com' },
    { name: 'ZipRecruiter', domain: 'ziprecruiter.com' },
    { name: 'Greenhouse', domain: 'greenhouse.io' },
    { name: 'Lever', domain: 'lever.co' },
    { name: 'Workday', domain: 'workday.com' },
  ];
}

