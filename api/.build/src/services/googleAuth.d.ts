export interface GoogleUserInfo {
    email: string;
    name: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    locale?: string;
}
export declare const verifyGoogleToken: (token: string) => Promise<GoogleUserInfo>;
export declare const parseLocation: (locale?: string) => {
    city: string;
    country: string;
};
//# sourceMappingURL=googleAuth.d.ts.map