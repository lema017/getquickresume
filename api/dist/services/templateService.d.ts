interface TemplateRecord {
    id: string;
    name?: string;
    description?: string;
    category: 'free' | 'premium';
    s3Key: string;
    tagName?: string;
    hash?: string;
}
export interface CreateTemplateData {
    id: string;
    name: string;
    description?: string;
    category: 'free' | 'premium';
    tagName: string;
    jsCode: string;
    hash?: string;
}
export declare const templateService: {
    listAll(): Promise<TemplateRecord[]>;
    getCode(s3Key: string): Promise<string>;
    createTemplate(data: CreateTemplateData): Promise<TemplateRecord>;
};
export type { TemplateRecord };
//# sourceMappingURL=templateService.d.ts.map