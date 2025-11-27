/**
 * Middleware de rate limiting para prevenir abuso de APIs
 */
export declare function checkRateLimit(userId: string, endpoint: string, maxRequests?: number, windowMs?: number): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
}>;
export declare function logSuspiciousActivity(userId: string, endpoint: string, reason: string, input?: string): Promise<void>;
//# sourceMappingURL=rateLimiter.d.ts.map