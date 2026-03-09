import { writable, derived } from 'svelte/store'
import { getApiUrl } from '$lib/config/api'

const tokenStore = writable<string | null>(
  typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
)

export const isAuthenticated = derived(tokenStore, ($token) => !!$token)
export const token = { subscribe: tokenStore.subscribe }

export function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  return fetch(getApiUrl('auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(async (response) => {
      if (!response.ok) {
        return { success: false, error: 'Neplatné přihlašovací údaje' }
      }
      const data = await response.json()
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', data.access_token)
      }
      tokenStore.set(data.access_token)
      return { success: true }
    })
    .catch(() => {
      return { success: false, error: 'Chyba připojení k serveru' }
    })
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
  }
  tokenStore.set(null)
}

