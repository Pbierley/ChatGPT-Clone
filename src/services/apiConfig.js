function normalizeApiBase(url) {
  const trimmed = (url || '/api').trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

export const API_BASE = normalizeApiBase(import.meta.env.VITE_API_BASE_URL);
