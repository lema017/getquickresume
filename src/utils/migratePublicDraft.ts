import { NavigateFunction } from 'react-router-dom';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { resumeService } from '@/services/resumeService';
import { ResumeData } from '@/types';

const PUBLIC_DRAFT_KEY = 'public_resume_draft';
const PUBLIC_TEMPLATE_KEY = 'public_selected_template';

export type MigrationResult = 'migrated' | 'no_draft' | 'limit_reached';

/**
 * Migrates public wizard draft data into the authenticated resume flow.
 * Called after successful login.
 *
 * Returns:
 *  - 'migrated'      – resume created in API and user redirected to wizard
 *  - 'no_draft'      – nothing to migrate (caller redirects to /dashboard)
 *  - 'limit_reached' – draft exists but non-premium user already has a resume;
 *                       data loaded locally, caller should show upgrade modal
 */
export async function migratePublicDraft(navigate: NavigateFunction): Promise<MigrationResult> {
  try {
    const raw = localStorage.getItem(PUBLIC_DRAFT_KEY);
    if (!raw) return 'no_draft';

    const parsed = JSON.parse(raw);
    const resumeData: ResumeData = parsed.state?.resumeData ?? parsed.resumeData ?? parsed;

    if (!resumeData.firstName && !resumeData.email) return 'no_draft';

    const templateRaw = localStorage.getItem(PUBLIC_TEMPLATE_KEY);
    let templateId: string | undefined;
    let templateCategory: 'free' | 'premium' | undefined;
    if (templateRaw) {
      try {
        const tmpl = JSON.parse(templateRaw);
        templateId = tmpl.id;
        templateCategory = tmpl.category ?? 'free';
      } catch { /* ignore */ }
    }

    // Check if non-premium user has hit their 1-resume limit
    const user = useAuthStore.getState().user;
    const isPremium = user?.isPremium ?? false;

    if (!isPremium) {
      const existingResumes = await resumeService.listResumes();
      if (existingResumes.length >= 1) {
        // Load data locally so user can still work in the wizard
        const store = useResumeStore.getState();
        store.loadResumeData(resumeData);
        if (templateId && templateCategory) {
          store.setSelectedTemplate(templateId, templateCategory);
        }
        store.setIsOverSaveLimit(true);

        localStorage.removeItem(PUBLIC_DRAFT_KEY);
        localStorage.removeItem(PUBLIC_TEMPLATE_KEY);

        return 'limit_reached';
      }
    }

    const newResume = await resumeService.createResume(resumeData);

    const store = useResumeStore.getState();
    store.setCurrentResumeId(newResume.id);
    store.loadResumeData(resumeData);
    if (templateId && templateCategory) {
      store.setSelectedTemplate(templateId, templateCategory);
    }

    localStorage.removeItem(PUBLIC_DRAFT_KEY);
    localStorage.removeItem(PUBLIC_TEMPLATE_KEY);

    const lastStep = resumeData.currentStep || 1;
    const nextStep = Math.min(lastStep + 1, 8);
    navigate(`/wizard/manual/step-${nextStep}?resumeId=${newResume.id}`, { replace: true });
    return 'migrated';
  } catch (error) {
    console.error('Error migrating public draft:', error);
    return 'no_draft';
  }
}
