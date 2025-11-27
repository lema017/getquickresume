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
export declare const getUserByEmail: (email: string) => Promise<User | null>;
export declare const createUser: (userData: Partial<User>) => Promise<User>;
export declare const updateUser: (id: string, updates: Partial<User>) => Promise<User>;
//# sourceMappingURL=dynamodb.d.ts.map