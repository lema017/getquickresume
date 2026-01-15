export interface AIUsageStats {
    totalInputTokens: number;
    totalOutputTokens: number;
    totalCostUSD: number;
    totalAICalls: number;
    lastAICallAt: string;
    monthlyStats: {
        month: string;
        inputTokens: number;
        outputTokens: number;
        costUSD: number;
        callCount: number;
    };
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    avatarUrl?: string;
    city?: string;
    country?: string;
    location?: string;
    linkedin?: string;
    targetFunction?: string;
    profession?: string;
    provider: 'google' | 'facebook' | 'linkedin';
    isPremium: boolean;
    freeResumeUsed: boolean;
    premiumResumeCount: number;
    premiumResumeMonth: string;
    freeDownloadUsed: boolean;
    totalDownloads: number;
    freeCoverLetterUsed: boolean;
    premiumCoverLetterCount: number;
    premiumCoverLetterMonth: string;
    subscriptionExpiration?: string;
    planType?: 'monthly' | 'yearly';
    subscriptionStartDate?: string;
    paymentProvider?: 'paypal' | 'stripe' | 'other';
    paymentCustomerId?: string;
    paymentSubscriptionId?: string;
    paymentTransactionId?: string;
    aiUsageStats?: AIUsageStats;
    jobTailoringUsage?: {
        totalUsed: number;
        monthlyUsed: number;
        currentMonth: string;
        lastTailoredAt?: string;
    };
    createdAt: string;
    updatedAt: string;
}
export declare const getUserByEmail: (email: string) => Promise<User | null>;
export declare const createUser: (userData: Partial<User>) => Promise<User>;
export declare const getUserById: (id: string) => Promise<User | null>;
export declare const markFreeResumeUsed: (userId: string) => Promise<User>;
export declare const incrementPremiumResumeCount: (userId: string) => Promise<User>;
export declare const markFreeCoverLetterUsed: (userId: string) => Promise<User>;
export declare const incrementPremiumCoverLetterCount: (userId: string) => Promise<User>;
export declare const updateUser: (id: string, updates: Partial<User>) => Promise<User>;
/**
 * Upgrade user to premium status
 * Sets isPremium to true and stores subscription details
 */
export declare const upgradeUserToPremium: (userId: string, planType: "monthly" | "yearly", paymentProvider: "paypal" | "stripe" | "other", paymentCustomerId: string, paymentSubscriptionId?: string, paymentTransactionId?: string) => Promise<User>;
//# sourceMappingURL=dynamodb.d.ts.map