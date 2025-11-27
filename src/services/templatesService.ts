const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export type TemplateCategory = 'free' | 'premium';

export interface TEMPLATE_META {
  id: string;
  name: string;
  tagName: string;
  description?: string;
  layout?: 'single-column' | 'two-column';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
  s3Key?: string;
  hash?: string;
  layout?: 'single-column' | 'two-column';
}

export interface TemplatesResponse {
  templates: ResumeTemplate[];
}

export interface CreateTemplateRequest {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
  hash?: string;
}

export interface CreateTemplateResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    description?: string;
    category: TemplateCategory;
    tagName: string;
    s3Key: string;
    createdAt: string;
  };
  message?: string;
  error?: string;
}

class TemplatesService {
  private async getAuthToken(): Promise<string> {
    const token = localStorage.getItem('auth-token');
    if (!token) throw new Error('No authentication token found');
    return token;
  }

  async getTemplates(): Promise<ResumeTemplate[]> {
    const token = await this.getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/templates`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data?.error || data?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    const data: TemplatesResponse = await res.json();
    return data.templates || [];
  }

  async createTemplate(templateData: CreateTemplateRequest): Promise<CreateTemplateResponse> {
    // Endpoint público, no requiere autenticación
    const res = await fetch(`${API_BASE_URL}/api/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });

    const data: CreateTemplateResponse = await res.json();

    if (!res.ok) {
      const msg = data?.error || data?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    return data;
  }
}

export const templatesService = new TemplatesService();


