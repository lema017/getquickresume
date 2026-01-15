import { User } from '../types';
import { updateUser } from '../services/dynamodb';

export interface PremiumStatus {
  isPremium: boolean;
  isExpired: boolean;
  expiresAt?: Date;
  daysRemaining?: number;
}

/**
 * Check if user's premium subscription is currently valid
 */
export function checkPremiumStatus(user: User): PremiumStatus {
  if (!user.isPremium) {
    return { isPremium: false, isExpired: false };
  }

  if (!user.subscriptionExpiration) {
    // Legacy premium user without expiration - consider premium
    return { isPremium: true, isExpired: false };
  }

  const expiresAt = new Date(user.subscriptionExpiration);
  const now = new Date();
  const isExpired = expiresAt <= now;
  const daysRemaining = isExpired ? 0 : Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    isPremium: !isExpired,
    isExpired,
    expiresAt,
    daysRemaining
  };
}

/**
 * Check premium status and auto-downgrade if expired
 */
export async function validateAndUpdatePremiumStatus(user: User): Promise<User> {
  const status = checkPremiumStatus(user);
  
  if (user.isPremium && status.isExpired) {
    // Downgrade expired user
    await updateUser(user.id, { isPremium: false });
    return { ...user, isPremium: false };
  }
  
  return user;
}
