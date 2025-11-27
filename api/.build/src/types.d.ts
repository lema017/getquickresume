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
    tokens: number;
    createdAt: string;
    updatedAt: string;
}
export interface GoogleUserInfo {
    sub: string;
    email: string;
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    locale?: string;
    email_verified: boolean;
}
export interface JWTPayload {
    userId: string;
    email: string;
    isPremium: boolean;
    tokens: number;
    iat?: number;
    exp?: number;
}
//# sourceMappingURL=types.d.ts.map