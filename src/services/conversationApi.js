const API_BASE = 'http://localhost:3001/api';

function authHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiLoadConversations() {
  try {
    const res = await fetch(`${API_BASE}/conversations`, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  } catch {
    console.error('[API] Could not reach API server — is it running?');
    return [];
  }
}

export async function apiSaveConversation(conversation) {
  try {
    await fetch(`${API_BASE}/conversations/${conversation.id}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        messages: conversation.messages,
        model: conversation.model,
        persona: conversation.persona,
      }),
    });
  } catch (err) {
    console.error('[API] Save failed:', err.message);
  }
}

export async function apiDeleteConversations() {
  await fetch(`${API_BASE}/conversations`, { method: 'DELETE', headers: authHeaders() });
}
