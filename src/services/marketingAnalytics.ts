/**
 * Marketing Analytics Service
 * Tracks key funnel events for GA4 with UTM and landing path attribution
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetOrDate: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

// Storage keys
const UTM_STORAGE_KEY = 'gqr_utm_params';
const LANDING_PATH_KEY = 'gqr_landing_path';
const SESSION_ONCE_PREFIX = 'gqr_once:';

// UTM parameters interface
interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Capture UTM parameters and landing path from URL on first visit
 * Should be called once on app initialization
 */
export function initMarketingTracking(): void {
  // Only capture on first visit (if not already stored in session)
  if (sessionStorage.getItem(UTM_STORAGE_KEY)) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  
  // Capture UTM parameters
  const utmParams: UTMParams = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
  
  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  // Store UTM params if any were found
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  } else {
    // Store empty object to mark session as initialized
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({}));
  }

  // Store landing path (without query params)
  const landingPath = window.location.pathname;
  sessionStorage.setItem(LANDING_PATH_KEY, landingPath);
}

/**
 * Get stored UTM parameters
 */
function getUTMParams(): UTMParams {
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * Get stored landing path
 */
function getLandingPath(): string {
  return sessionStorage.getItem(LANDING_PATH_KEY) || '/';
}

/**
 * Track an event to Google Analytics 4
 * 
 * @param eventName - The name of the event (e.g., 'landing_view', 'cta_click_start')
 * @param params - Optional additional parameters for the event
 */
export function track(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  // Ensure gtag is available
  if (typeof window === 'undefined' || !window.gtag) {
    // gtag not loaded yet, silently fail in dev
    if (import.meta.env.DEV) {
      console.log('[MarketingAnalytics] Event (gtag not ready):', eventName, params);
    }
    return;
  }

  // Get attribution data
  const utmParams = getUTMParams();
  const landingPath = getLandingPath();

  // Merge all parameters
  const eventParams = {
    ...params,
    ...utmParams,
    landing_path: landingPath,
    page_path: window.location.pathname,
  };

  // Send to GA4
  window.gtag('event', eventName, eventParams);

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[MarketingAnalytics] Event:', eventName, eventParams);
  }
}

function sessionOnce(key: string): boolean {
  try {
    const fullKey = `${SESSION_ONCE_PREFIX}${key}`;
    if (sessionStorage.getItem(fullKey)) return false;
    sessionStorage.setItem(fullKey, '1');
    return true;
  } catch {
    // If sessionStorage is unavailable, fail open (allow tracking)
    return true;
  }
}

// ============================================================================
// Pre-defined tracking functions for common events
// ============================================================================

/**
 * Track landing page view
 * Call on mount of landing pages (LandingPage, AtsResumeCheckerPage, etc.)
 */
export function trackLandingView(pageName: string): void {
  track('landing_view', { page_name: pageName });
}

/**
 * Track CTA click that starts resume creation flow
 * @param action - 'create' | 'upload' | 'import'
 * @param pageName - The page where the CTA was clicked
 */
export function trackCtaClickStart(action: 'create' | 'upload' | 'import', pageName: string): void {
  track('cta_click_start', { action, page_name: pageName });
}

/**
 * Start common engagement tracking for a landing page:
 * - landing_engaged at N seconds
 * - scroll_depth at threshold percentages
 *
 * Returns cleanup function for React effects.
 */
export function startLandingEngagementTracking(
  pageName: string,
  options?: {
    engagedAfterSeconds?: number;
    scrollThresholds?: number[];
  }
): () => void {
  const engagedAfterSeconds = options?.engagedAfterSeconds ?? 10;
  const scrollThresholds = options?.scrollThresholds ?? [25, 50, 75];

  // Time-on-page engagement
  const engagedTimer = window.setTimeout(() => {
    if (!sessionOnce(`landing_engaged:${pageName}:${window.location.pathname}`)) return;
    track('landing_engaged', { page_name: pageName, engaged_seconds: engagedAfterSeconds });
  }, engagedAfterSeconds * 1000);

  // Scroll depth tracking
  const fired = new Set<number>();
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const viewportHeight = window.innerHeight || 0;
    const scrollHeight = doc.scrollHeight || 0;
    if (!scrollHeight) return;

    const depth = Math.min(100, Math.round(((scrollTop + viewportHeight) / scrollHeight) * 100));

    for (const threshold of scrollThresholds) {
      if (fired.has(threshold)) continue;
      if (depth < threshold) continue;
      fired.add(threshold);

      if (!sessionOnce(`scroll_depth:${pageName}:${window.location.pathname}:${threshold}`)) continue;
      track('scroll_depth', { page_name: pageName, depth_percent: threshold });
    }
  };

  // Passive listener to minimize impact
  window.addEventListener('scroll', onScroll, { passive: true });
  // Fire once in case user lands mid-page (or very small pages)
  onScroll();

  return () => {
    window.clearTimeout(engagedTimer);
    window.removeEventListener('scroll', onScroll as any);
  };
}

/**
 * Track when user starts the wizard flow
 */
export function trackWizardStarted(): void {
  track('wizard_started');
}

/**
 * Track when a resume is created/saved for the first time
 */
export function trackResumeCreated(resumeId?: string): void {
  track('resume_created', { resume_id: resumeId || 'unknown' });
}

/**
 * Track when AI generates resume content
 */
export function trackResumeGeneratedAI(resumeId?: string): void {
  track('resume_generated_ai', { resume_id: resumeId || 'unknown' });
}

/**
 * Track when user views their ATS score
 */
export function trackAtsScoreViewed(score?: number): void {
  track('ats_score_viewed', { ats_score: score || 0 });
}

/**
 * Track when user starts job tailoring flow
 */
export function trackJobTailoringStarted(resumeId?: string): void {
  track('job_tailoring_started', { resume_id: resumeId || 'unknown' });
}

/**
 * Track PDF download attempt
 */
export function trackPdfDownloadAttempt(resumeId?: string): void {
  track('pdf_download_attempt', { resume_id: resumeId || 'unknown' });
}

/**
 * Track when user views upgrade/premium page or modal
 */
export function trackUpgradeViewed(source: string): void {
  track('upgrade_viewed', { source });
}

/**
 * Track successful premium purchase
 */
export function trackUpgradePurchased(planType?: string): void {
  track('upgrade_purchased', { plan_type: planType || 'unknown' });
}

/**
 * Track new user registration
 * @param provider - The authentication provider used ('google' | 'linkedin')
 */
export function trackUserRegistered(provider: 'google' | 'linkedin'): void {
  track('user_registered', { auth_provider: provider });
}

/**
 * Track successful resume PDF download completion
 * @param resumeId - The ID of the downloaded resume
 * @param templateId - The ID of the template used
 */
export function trackResumeDownloadCompleted(resumeId?: string, templateId?: string): void {
  track('resume_download_completed', { 
    resume_id: resumeId || 'unknown',
    template_id: templateId || 'unknown'
  });
}

// ============================================================================
// Public Translator Funnel Events
// ============================================================================

/**
 * Track when a public translation is completed
 * @param targetLanguage - The target language code
 * @param sourceLanguage - The source language code (or 'auto')
 */
export function trackTranslateCompleted(targetLanguage: string, sourceLanguage: string = 'auto'): void {
  track('translate_completed', { target_language: targetLanguage, source_language: sourceLanguage });
}

/**
 * Track when the score teaser card is shown after translation
 * @param score - The deterministic score shown
 */
export function trackScoreTeaserViewed(score: number): void {
  if (!sessionOnce('score_teaser_viewed')) return;
  track('score_teaser_viewed', { teaser_score: score });
}

/**
 * Track when user clicks a conversion CTA on the translator page
 * @param ctaType - The CTA identifier (e.g., 'score', 'insights', 'save', 'full_analysis', 'rate_limit')
 */
export function trackTranslatorCtaClicked(ctaType: string): void {
  track('translator_cta_clicked', { cta_type: ctaType });
}

/**
 * Track when user hits the translation rate limit
 */
export function trackTranslatorRateLimited(): void {
  if (!sessionOnce('translator_rate_limited')) return;
  track('translator_rate_limited');
}

// ============================================================================
// Public ATS Checker Funnel Events
// ============================================================================

/**
 * Track when a public ATS check is completed
 * @param score - The ATS score returned
 */
export function trackAtsCheckCompleted(score: number): void {
  track('ats_check_completed', { ats_score: score });
}

/**
 * Track when user clicks a conversion CTA on the ATS checker page
 * @param ctaType - The CTA identifier (e.g., 'insights', 'full_analysis', 'rate_limit', 'final_cta')
 */
export function trackAtsCheckerCtaClicked(ctaType: string): void {
  track('ats_checker_cta_clicked', { cta_type: ctaType });
}

/**
 * Track when user hits the ATS checker rate limit
 */
export function trackAtsCheckerRateLimited(): void {
  if (!sessionOnce('ats_checker_rate_limited')) return;
  track('ats_checker_rate_limited');
}
