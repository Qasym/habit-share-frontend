const defaultBaseUrl = 'http://localhost:8000'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.toString() || defaultBaseUrl

export const API_ENDPOINTS = {
  register: () => `${API_BASE_URL}/auth/register`,
  token: () => `${API_BASE_URL}/auth/token`,
}
