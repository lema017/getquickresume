const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export type SupportTicketType = 'help' | 'complaint' | 'comment' | 'feature';
export type SupportTicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export interface SupportTicket {
  ticketId: string;
  userId: string;
  type: SupportTicketType;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  type: SupportTicketType;
  subject: string;
  message: string;
}

export interface CreateTicketResponse {
  success: boolean;
  data?: SupportTicket;
  error?: string;
  message?: string;
}

export interface ListTicketsResponse {
  success: boolean;
  data?: SupportTicket[];
  error?: string;
  message?: string;
}

export interface GetTicketResponse {
  success: boolean;
  data?: SupportTicket;
  error?: string;
  message?: string;
}

class SupportService {
  private async getAuthToken(): Promise<string> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No authentication token found');
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createTicket(request: CreateTicketRequest): Promise<CreateTicketResponse> {
    return this.makeRequest<CreateTicketResponse>(
      'api/support/tickets',
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }

  async getUserTickets(): Promise<ListTicketsResponse> {
    return this.makeRequest<ListTicketsResponse>(
      'api/support/tickets',
      {
        method: 'GET',
      }
    );
  }

  async getTicket(ticketId: string): Promise<GetTicketResponse> {
    return this.makeRequest<GetTicketResponse>(
      `api/support/tickets/${ticketId}`,
      {
        method: 'GET',
      }
    );
  }
}

export const supportService = new SupportService();

