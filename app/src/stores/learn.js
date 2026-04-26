import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'

export const useLearnStore = defineStore('learn', () => {
  const completed = ref([])  // array of item_ids
  const followed  = ref([])  // array of course_ids
  const loading   = ref(false)
  const xpToast   = ref(null) // { xp, newBadges }

  async function fetchProgress() {
    loading.value = true
    try {
      const { data } = await useApi().get('/learn/progress')
      if (data?.completed) completed.value = data.completed
      if (data?.followed)  followed.value  = data.followed
      if (data?.stats)     useAuthStore().updateStats(data.stats)
    } finally {
      loading.value = false
    }
  }

  function isFollowed(courseId) {
    return followed.value.includes(courseId)
  }

  async function followCourse(courseId) {
    if (followed.value.includes(courseId)) return
    followed.value = [...followed.value, courseId]
    useApi().post('/learn/follow', { course_id: courseId }).catch(() => {})
  }

  async function completeItem(itemId, itemType, xp, score = null, scoreTotal = null) {
    if (completed.value.includes(itemId)) return

    // Optimistic update: mark locally and show toast immediately
    completed.value = [...completed.value, itemId]
    xpToast.value   = { xp, newBadges: [] }

    const { data, error } = await useApi().post('/learn/complete', {
      item_id:    itemId,
      item_type:  itemType,
      xp,
      score,
      score_total: scoreTotal,
    })

    if (error) return

    if (data) {
      useAuthStore().updateStats({
        xp:          data.xp,
        level:       data.level,
        xpNextLevel: data.xpNextLevel,
        streak:      data.streak,
        badges:      data.badges,
      })
      xpToast.value = { xp, newBadges: data.newBadges || [] }
    }
  }

  function clearToast() {
    xpToast.value = null
  }

  function isCompleted(itemId) {
    return completed.value.includes(itemId)
  }

  async function resetProgress() {
    completed.value = []
    followed.value  = []
    useApi().post('/learn/reset', {}).catch(() => {})
    useAuthStore().updateStats({ xp: 0, level: 1, xpNextLevel: 200, streak: 0, badges: [] })
  }

  return { completed, followed, loading, xpToast, fetchProgress, completeItem, clearToast, isCompleted, isFollowed, followCourse, resetProgress }
})
