/**
 * PayPal Checkout Service
 * 
 * Frontend service for PayPal payment operations.
 * Handles creating orders and capturing payments via the backend API.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export type PlanType = 'monthly' | 'yearly';

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  approvalUrl: string | null;
  status: string;
  error?: string;
}

export interface CaptureOrderResponse {
  success: boolean;
  message: string;
  transactionId: string;
  planType: PlanType;
  subscriptionExpiration: string;
  user: {
    id: string;
    email: string;
    isPremium: boolean;
    planType: PlanType;
    subscriptionExpiration: string;
  };
  error?: string;
}

/**
 * Get the authorization token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('auth-token');
}

/**
 * Create a PayPal order for the specified plan
 * 
 * @param planType - 'monthly' or 'yearly'
 * @returns Order details including orderId for PayPal SDK
 */
export async function createOrder(planType: PlanType): Promise<CreateOrderResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/api/paypal/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ planType }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create PayPal order');
  }

  return data;
}

/**
 * Capture a PayPal order after buyer approval
 * 
 * @param orderId - PayPal order ID from createOrder response
 * @returns Capture result with updated user data
 */
export async function captureOrder(orderId: string): Promise<CaptureOrderResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/api/paypal/capture-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to capture PayPal payment');
  }

  // Update local user data with premium status
  if (data.success && data.user) {
    const existingUserData = localStorage.getItem('user-data');
    if (existingUserData) {
      const userData = JSON.parse(existingUserData);
      userData.isPremium = data.user.isPremium;
      userData.planType = data.user.planType;
      userData.subscriptionExpiration = data.user.subscriptionExpiration;
      localStorage.setItem('user-data', JSON.stringify(userData));
    }
  }

  return data;
}

/**
 * PayPal service object for convenience
 */
export const paypalService = {
  createOrder,
  captureOrder,
};

export default paypalService;
