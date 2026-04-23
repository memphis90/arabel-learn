import { useAuthStore } from '@/stores/auth'

export function useApi() {
  const baseUrl = import.meta.env.VITE_API_URL || '/api'

  async function request(endpoint, options = {}) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })

    if (response.status === 401) {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        auth.clearUser()
        if (endpoint.startsWith('/auth/')) {
          window.location.href = '/login'
        }
      }
      return { data: null, error: 'Unauthenticated', status: 401 }
    }

    const data = await response.json().catch(() => null)
    if (!response.ok) {
      return { data: null, error: data?.message || 'Request failed', status: response.status }
    }
    return { data, error: null, status: response.status }
  }

  return {
    get:   (endpoint)       => request(endpoint, { method: 'GET' }),
    post:  (endpoint, body) => request(endpoint, { method: 'POST',  body: JSON.stringify(body) }),
    patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    del:   (endpoint)       => request(endpoint, { method: 'DELETE' }),
  }
}
