import { WaitlistData, DemoFormData, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * Submit email to waitlist
 */
export async function submitToWaitlist(data: WaitlistData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit to waitlist');
    }

    return result;
  } catch (error) {
    console.error('Waitlist submission error:', error);
    throw error;
  }
}

/**
 * Submit demo form
 */
export async function submitDemoForm(data: DemoFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit demo form');
    }

    return result;
  } catch (error) {
    console.error('Demo form submission error:', error);
    throw error;
  }
}

/**
 * Generic API error handler
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred. Please try again.';
}