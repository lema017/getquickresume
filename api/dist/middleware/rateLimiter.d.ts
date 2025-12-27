/**
 * Middleware de rate limiting para prevenir abuso de APIs
 */
export declare function checkRateLimit(userId: string, endpoint: string, maxRequests?: number, windowMs?: number): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
}>;
/**
 * Refund a rate limit credit when a request fails with a server error (500)
 * This ensures users aren't penalized for server-side failures
 */
export declare function refundRateLimit(userId: string, endpoint: string): Promise<void>;
export declare function logSuspiciousActivity(userId: string, endpoint: string, reason: string, input?: string): Promise<void>;
//# sourceMappingURL=rateLimiter.d.ts.map