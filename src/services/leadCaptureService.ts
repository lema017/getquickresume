const API_URL = import.meta.env.VITE_API_URL;

export async function capturePublicLead(data: {
  email: string;
  phone: string;
  country: string;
}): Promise<void> {
  try {
    await fetch(`${API_URL}/api/public/lead-capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, _hp: '' }),
    });
  } catch {
    // Silently ignore -- non-critical marketing data
  }
}
