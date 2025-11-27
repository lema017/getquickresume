export interface JWTPayload {
    userId: string;
    email: string;
    isPremium: boolean;
    tokens: number;
    iat?: number;
    exp?: number;
}
export declare const generateToken: (payload: Omit<JWTPayload, "iat" | "exp">) => string;
export declare const verifyToken: (token: string) => JWTPayload;
export declare const decodeToken: (token: string) => JWTPayload | null;
//# sourceMappingURL=jwt.d.ts.map