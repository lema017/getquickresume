// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth-token');
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface CreateCheckoutRequest {
  planType: 'monthly' | 'yearly';
}

export interface CreateCheckoutResponse {
  success: boolean;
  checkoutUrl?: string;
  transactionId?: string;
  error?: string;
  message?: string;
}

class CheckoutService {
  private async getAuthToken(): Promise<string> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('User not authenticated');
    }
    return token;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Unknown error',
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || errorData.error || 'Request failed');
    }

    return response.json();
  }

  /**
   * Create a checkout transaction and get the transaction ID for Paddle overlay
   */
  async createCheckoutTransaction(
    planType: 'monthly' | 'yearly'
  ): Promise<{ transactionId: string; checkoutUrl?: string }> {
    const response = await this.makeRequest<CreateCheckoutResponse>(
      'api/checkout/create-transaction',
      {
        method: 'POST',
        body: JSON.stringify({ planType }),
      }
    );

    if (!response.success || !response.transactionId) {
      throw new Error(response.error || response.message || 'Failed to create checkout');
    }

    return {
      transactionId: response.transactionId,
      checkoutUrl: response.checkoutUrl,
    };
  }
}

export const checkoutService = new CheckoutService();

