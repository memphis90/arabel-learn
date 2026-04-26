import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const user    = ref(null)
  const stats   = ref({ xp: 0, level: 1, xpNextLevel: 200, streak: 0, badges: [] })
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const plan            = computed(() => user.value?.plan ?? 'FREE')
  const role            = computed(() => user.value?.role ?? 'user')
  const isAdmin         = computed(() => role.value === 'admin')
  const isEditor        = computed(() => ['admin', 'editor'].includes(role.value))

  async function init() {
    loading.value = true
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api'
      const res = await fetch(`${baseUrl}/auth/me`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        if (data?.user)  user.value  = data.user
        if (data?.stats) stats.value = data.stats
      }
    } catch { /* network error — treat as unauthenticated */ }
    finally { loading.value = false }
  }

  function setUser(userData, statsData) {
    user.value  = userData
    if (statsData) stats.value = statsData
  }

  function clearUser() {
    user.value  = null
    stats.value = { xp: 0, level: 1, xpNextLevel: 200, streak: 0, badges: [] }
  }

  async function logout() {
    await useApi().post('/auth/logout', {})
    clearUser()
  }

  function updateStats(newStats) {
    stats.value = { ...stats.value, ...newStats }
  }

  return { user, stats, loading, isAuthenticated, plan, role, isAdmin, isEditor, init, setUser, clearUser, logout, updateStats }
})
