import { getUserById, updateUser } from './dynamodb';
import { getResumeById } from './resumeService';
import { User } from './dynamodb';

export interface TrackDownloadResult {
  allowed: boolean;
  freeDownloadUsed: boolean;
  totalDownloads: number;
  message?: string;
}

/**
 * Tracks a resume download and enforces download limits
 * - Premium users: unlimited downloads
 * - Free users: 1 free download only
 * 
 * @param userId - The authenticated user's ID
 * @param resumeId - The resume ID to download
 * @returns Download tracking result with status and updated counts
 */
export const trackDownload = async (
  userId: string,
  resumeId: string
): Promise<TrackDownloadResult> => {
  try {
    // Validate inputs
    if (!userId || !resumeId) {
      throw new Error('User ID and Resume ID are required');
    }

    // Get user to check premium status and download limits
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify user owns the resume
    const resume = await getResumeById(userId, resumeId);
    if (!resume) {
      throw new Error('Resume not found or access denied');
    }

    // Premium users have unlimited downloads
    if (user.isPremium) {
      // Increment totalDownloads counter atomically
      const updatedUser = await updateUser(userId, {
        totalDownloads: (user.totalDownloads || 0) + 1,
      });

      return {
        allowed: true,
        freeDownloadUsed: user.freeDownloadUsed || false,
        totalDownloads: updatedUser.totalDownloads || 0,
      };
    }

    // Free user: check if they've used their free download
    if (user.freeDownloadUsed) {
      return {
        allowed: false,
        freeDownloadUsed: true,
        totalDownloads: user.totalDownloads || 0,
        message: 'You have used your free download. Upgrade to Premium for unlimited downloads.',
      };
    }

    // Free user: first download - allow and mark as used
    const updatedUser = await updateUser(userId, {
      freeDownloadUsed: true,
      totalDownloads: (user.totalDownloads || 0) + 1,
    });

    // Ensure totalDownloads is never negative (safety check)
    const finalTotalDownloads = Math.max(0, updatedUser.totalDownloads || 0);

    return {
      allowed: true,
      freeDownloadUsed: true,
      totalDownloads: finalTotalDownloads,
    };
  } catch (error) {
    console.error('Error tracking download:', error);
    throw error;
  }
};

