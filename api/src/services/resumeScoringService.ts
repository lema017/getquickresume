/**
 * Resume Scoring Service
 * 
 * Uses the deterministic scoring system to provide consistent, reproducible
 * resume evaluation with finite checklist criteria.
 * 
 * Includes AI-powered keyword analysis for ATS optimization scoring.
 */

import { GeneratedResume, ResumeData, ResumeScore, SectionChecklist } from '../types';
import { deterministicScoringService, DeterministicScore } from './deterministicScoringService';
import { keywordAnalyzerService, KeywordAnalysis } from './keywordAnalyzerService';
import { KeywordAnalysisData } from '../utils/resumeVerifiers';
import { contentValidatorService, ContentValidationResult } from './contentValidatorService';

interface ScoringTrackingContext {
  userId: string;
  resumeId?: string;
  isPremium: boolean;
}

class ResumeScoringService {
  /**
   * Score a resume using deterministic evaluation
   * Includes AI-powered keyword analysis for ATS optimization
   */
  async scoreResume(
    generatedResume: GeneratedResume,
    resumeData: ResumeData,
    isPremium: boolean,
    trackingContext?: ScoringTrackingContext
  ): Promise<ResumeScore> {
    try {
      // Build full resume text for keyword analysis
      const resumeText = this.buildResumeText(generatedResume);
      
      // Perform AI-powered keyword analysis (for ATS scoring)
      let keywordAnalysis: KeywordAnalysisData | null = null;
      
      try {
        const analysis = await keywordAnalyzerService.analyzeKeywords({
          resumeId: trackingContext?.resumeId || 'unknown',
          profession: resumeData?.profession || '',
          resumeText,
          userId: trackingContext?.userId,
          isPremium,
        });
        
        // Convert to KeywordAnalysisData format
        keywordAnalysis = {
          totalKeywordsFound: analysis.totalKeywordsFound,
          hardSkills: analysis.keywords.hardSkills,
          softSkills: analysis.keywords.softSkills,
          actionVerbs: analysis.keywords.actionVerbs,
          industryTerms: analysis.keywords.industryTerms,
          atsScore: analysis.atsScore,
          scoreValue: analysis.scoreValue,
          tierLabel: analysis.tierLabel,
          breakdown: analysis.breakdown,
        };
        
        console.log(`[Scoring] Keyword analysis complete: ${analysis.totalKeywordsFound} keywords found (${analysis.tierLabel})`);
      } catch (keywordError) {
        console.warn('[Scoring] Keyword analysis failed, continuing without it:', keywordError);
        // Continue without keyword analysis - the ATS section will be skipped
      }

      // Perform AI-powered content validation (for data quality scoring)
      let contentValidation: ContentValidationResult | null = null;
      
      // Merge resumeData into generatedResume for validation
      // This ensures manually added entries are validated, not just AI-generated ones
      const resumeForValidation: GeneratedResume = {
        ...generatedResume,
        education: resumeData?.education?.length ? resumeData.education.map(edu => ({
          degree: edu.degree || '',
          institution: edu.institution || '',
          field: edu.field || '',
          duration: `${edu.startDate || ''} - ${edu.endDate || 'Present'}`,
          gpa: edu.gpa,
        })) : generatedResume.education,
        experience: resumeData?.experience?.length ? resumeData.experience.map(exp => ({
          title: exp.title || '',
          company: exp.company || '',
          duration: `${exp.startDate || ''} - ${exp.endDate || 'Present'}`,
          description: exp.responsibilities?.join('. ') || '',
          achievements: exp.achievements || [],
          skills: [],
          impact: [],
        })) : generatedResume.experience,
        certifications: resumeData?.certifications?.length ? resumeData.certifications.map(cert => ({
          name: cert.name || '',
          issuer: cert.issuer || '',
          date: cert.date || '',
          credentialId: cert.credentialId,
          skills: [],
        })) : generatedResume.certifications,
        languages: resumeData?.languages?.length ? resumeData.languages.map(lang => ({
          language: lang.name || '',  // ResumeData.Language uses 'name', not 'language'
          level: lang.level || '',
        })) : generatedResume.languages,
      };
      
      try {
        if (contentValidatorService.shouldValidate(resumeForValidation)) {
          contentValidation = await contentValidatorService.validateContent(
            resumeForValidation,
            trackingContext?.userId,
            isPremium
          );
          
          console.log(`[Scoring] Content validation complete: overall quality ${contentValidation.overall}%, isValid: ${contentValidation.isValid}`);
          
          if (!contentValidation.isValid) {
            console.warn(`[Scoring] Content quality issues detected: ${contentValidation.summary}`);
          }
        }
      } catch (validationError) {
        console.warn('[Scoring] Content validation failed, continuing without it:', validationError);
        // Continue without content validation - the data quality section will be skipped
      }
      
      // Use deterministic scoring with keyword analysis and content validation data
      const deterministicScore = deterministicScoringService.scoreResume(
        generatedResume,
        resumeData,
        keywordAnalysis,
        contentValidation
      );

      // Convert to ResumeScore format with backward compatibility
      const score = this.convertToResumeScore(deterministicScore, keywordAnalysis);
      
      console.log(`[Scoring] Resume scored. Score: ${score.totalScore}/10, Completion: ${score.completionPercentage}%, Optimized: ${score.isOptimized}`);
      
      return score;
    } catch (error: any) {
      console.error('Error scoring resume:', error);
      throw new Error('Failed to score resume');
    }
  }

  /**
   * Build full resume text for keyword analysis
   */
  private buildResumeText(generatedResume: GeneratedResume): string {
    const parts: string[] = [];
    
    // Professional Summary
    if (generatedResume.professionalSummary) {
      parts.push(generatedResume.professionalSummary);
    }
    
    // Experience
    if (generatedResume.experience) {
      for (const exp of generatedResume.experience) {
        parts.push(`${exp.title} at ${exp.company}`);
        if (exp.description) parts.push(exp.description);
        if (exp.achievements) parts.push(exp.achievements.join(' '));
        if (exp.impact) parts.push(exp.impact.join(' '));
      }
    }
    
    // Skills
    if (generatedResume.skills) {
      if (generatedResume.skills.technical) {
        parts.push(generatedResume.skills.technical.join(' '));
      }
      if (generatedResume.skills.soft) {
        parts.push(generatedResume.skills.soft.join(' '));
      }
      if (generatedResume.skills.tools) {
        parts.push(generatedResume.skills.tools.join(' '));
      }
    }
    
    // Projects
    if (generatedResume.projects) {
      for (const proj of generatedResume.projects) {
        parts.push(`${proj.name}: ${proj.description}`);
        if (proj.technologies) parts.push(proj.technologies.join(' '));
      }
    }
    
    // Achievements
    if (generatedResume.achievements) {
      parts.push(generatedResume.achievements.join(' '));
    }
    
    // Education
    if (generatedResume.education) {
      for (const edu of generatedResume.education) {
        parts.push(`${edu.degree} ${edu.field} at ${edu.institution}`);
      }
    }
    
    return parts.join('\n\n');
  }

  /**
   * Re-evaluate a single checklist item after enhancement
   * This allows targeted verification without full re-scoring
   */
  async reEvaluateChecklistItem(
    itemId: string,
    generatedResume: GeneratedResume,
    resumeData: ResumeData,
    existingScore: ResumeScore
  ): Promise<ResumeScore> {
    try {
      const result = deterministicScoringService.reEvaluateItem(
        itemId,
        generatedResume,
        resumeData
      );

      if (!result) {
        console.warn(`Checklist item not found: ${itemId}, performing full rescore`);
        return this.scoreResume(generatedResume, resumeData, true);
      }

      const section = deterministicScoringService.getSectionForItem(itemId);
      if (!section || !existingScore.checklist[section]) {
        return this.scoreResume(generatedResume, resumeData, true);
      }

      // Update the specific item in the checklist
      const updatedChecklist = { ...existingScore.checklist };
      const sectionChecklist = { ...updatedChecklist[section] };
      
      const itemIndex = sectionChecklist.items.findIndex(i => i.id === itemId);
      if (itemIndex === -1) {
        return this.scoreResume(generatedResume, resumeData, true);
      }

      const oldItem = sectionChecklist.items[itemIndex];
      const wasCompleted = oldItem.isCompleted;
      const isNowCompleted = result.passed;

      // Update the item
      sectionChecklist.items = [
        ...sectionChecklist.items.slice(0, itemIndex),
        result.item,
        ...sectionChecklist.items.slice(itemIndex + 1)
      ];

      // Recalculate section stats
      if (wasCompleted !== isNowCompleted) {
        if (isNowCompleted) {
          sectionChecklist.completedCount++;
          if (result.item.priority === 'required') {
            sectionChecklist.requiredCompletedCount++;
          }
        } else {
          sectionChecklist.completedCount--;
          if (result.item.priority === 'required') {
            sectionChecklist.requiredCompletedCount--;
          }
        }
      }

      updatedChecklist[section] = sectionChecklist;

      // Recalculate totals
      const newScore = this.recalculateScoreFromChecklist(updatedChecklist, existingScore);
      
      console.log(`[Scoring] Item ${itemId} re-evaluated. New status: ${isNowCompleted ? 'PASSED' : 'FAILED'}`);
      
      return newScore;
    } catch (error) {
      console.error('Error re-evaluating checklist item:', error);
      // Fallback to full rescore
      return this.scoreResume(generatedResume, resumeData, true);
    }
  }

  /**
   * Convert DeterministicScore to ResumeScore format
   * Includes backward compatibility for legacy breakdown field
   */
  private convertToResumeScore(
    deterministicScore: DeterministicScore,
    keywordAnalysis?: KeywordAnalysisData | null
  ): ResumeScore {
    // Build legacy breakdown from checklist sections
    const breakdown: Record<string, number> = {
      summary: deterministicScore.checklist.summary?.earnedPoints || 0,
      experience: deterministicScore.checklist.experience?.earnedPoints || 0,
      skills: deterministicScore.checklist.skills?.earnedPoints || 0,
      education: deterministicScore.checklist.education?.earnedPoints || 0,
      projects: deterministicScore.checklist.projects?.earnedPoints || 0,
      achievements: deterministicScore.checklist.achievements?.earnedPoints || 0,
      languages: deterministicScore.checklist.languages?.earnedPoints || 0,
      contact: deterministicScore.checklist.contact?.earnedPoints || 0,
    };
    
    // Add ATS section if available
    if (deterministicScore.checklist.ats) {
      breakdown.ats = deterministicScore.checklist.ats.earnedPoints;
    }

    return {
      totalScore: deterministicScore.totalScore,
      maxPossibleScore: deterministicScore.maxPossibleScore,
      completionPercentage: deterministicScore.completionPercentage,
      isOptimized: deterministicScore.isOptimized,
      breakdown,
      checklist: deterministicScore.checklist,
      enhancementHistory: deterministicScore.enhancementHistory,
      strengths: deterministicScore.strengths,
      improvements: deterministicScore.improvements,
      generatedAt: deterministicScore.generatedAt,
      scoringVersion: deterministicScore.scoringVersion,
      // Include keyword analysis for frontend display
      keywordAnalysis: keywordAnalysis || undefined,
    };
  }

  /**
   * Recalculate score from updated checklist
   */
  private recalculateScoreFromChecklist(
    checklist: Record<string, SectionChecklist>,
    existingScore: ResumeScore
  ): ResumeScore {
    let totalEarnedPoints = 0;
    let totalMaxPoints = 0;
    let totalCompleted = 0;
    let totalItems = 0;
    let allRequiredCompleted = true;

    // Rebuild breakdown
    const breakdown = { ...existingScore.breakdown };

    for (const [key, section] of Object.entries(checklist)) {
      // Recalculate earned points for this section
      let sectionEarned = 0;
      for (const item of section.items) {
        if (item.isCompleted) {
          // Find point value (approximate from max points / items)
          sectionEarned += section.maxPoints / section.totalCount;
        }
      }
      
      section.earnedPoints = Math.round(sectionEarned * 100) / 100;
      totalEarnedPoints += section.earnedPoints;
      totalMaxPoints += section.maxPoints;
      totalCompleted += section.completedCount;
      totalItems += section.totalCount;

      if (section.requiredCompletedCount < section.requiredCount) {
        allRequiredCompleted = false;
      }

      // Update breakdown
      if (key in breakdown) {
        (breakdown as any)[key] = section.earnedPoints;
      }
    }

    // Regenerate strengths and improvements
    const strengths = this.generateStrengthsFromChecklist(checklist);
    const improvements = this.generateImprovementsFromChecklist(checklist);

    // Normalize score to 0-10 scale regardless of actual max points
    const normalizedScore = totalMaxPoints > 0 
      ? Math.round((totalEarnedPoints / totalMaxPoints) * 10 * 10) / 10 
      : 0;

    return {
      ...existingScore,
      totalScore: Math.min(normalizedScore, 10.0), // Cap at 10.0
      completionPercentage: Math.round((totalCompleted / totalItems) * 100),
      isOptimized: allRequiredCompleted && normalizedScore >= 8.0,
      breakdown,
      checklist,
      strengths,
      improvements,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Generate strengths from completed checklist items
   */
  private generateStrengthsFromChecklist(checklist: Record<string, SectionChecklist>): string[] {
    const strengths: string[] = [];
    
    for (const section of Object.values(checklist)) {
      if (section.completedCount >= section.totalCount * 0.75) {
        strengths.push(`Strong ${section.displayName}: ${section.completedCount}/${section.totalCount} criteria met`);
      }
      
      for (const item of section.items) {
        if (item.isCompleted && item.priority === 'required') {
          strengths.push(`${item.label}: ${item.details || item.description}`);
        }
      }
    }

    return strengths.slice(0, 5);
  }

  /**
   * Generate improvements from incomplete checklist items
   */
  private generateImprovementsFromChecklist(checklist: Record<string, SectionChecklist>): string[] {
    const improvements: { priority: number; text: string }[] = [];
    
    const priorityOrder = { required: 3, recommended: 2, optional: 1 };

    for (const section of Object.values(checklist)) {
      for (const item of section.items) {
        if (!item.isCompleted) {
          improvements.push({
            priority: priorityOrder[item.priority],
            text: `${section.displayName}: ${item.description}`,
          });
        }
      }
    }

    improvements.sort((a, b) => b.priority - a.priority);
    return improvements.slice(0, 8).map(imp => imp.text);
  }

  /**
   * Validate score structure
   */
  validateScore(score: ResumeScore): boolean {
    return (
      typeof score.totalScore === 'number' &&
      score.totalScore >= 0 &&
      score.totalScore <= 10 &&
      typeof score.completionPercentage === 'number' &&
      typeof score.isOptimized === 'boolean' &&
      score.checklist !== undefined &&
      Array.isArray(score.strengths) &&
      Array.isArray(score.improvements)
    );
  }
}

export const resumeScoringService = new ResumeScoringService();
