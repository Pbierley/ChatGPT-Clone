import { API_BASE } from './apiConfig';

export async function sendMessageToAI(messages, model = 'gpt-4o-mini') {
  const token = localStorage.getItem('auth_token');
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ messages, model }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to get AI response');
  return data.content;
}
