import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'

export const useLearnStore = defineStore('learn', () => {
  const completed = ref([])  // array of item_ids
  const loading   = ref(false)
  const xpToast   = ref(null) // { xp, newBadges }

  async function fetchProgress() {
    loading.value = true
    try {
      const { data } = await useApi().get('/learn/progress')
      if (data?.completed) completed.value = data.completed
      if (data?.stats)     useAuthStore().updateStats(data.stats)
    } finally {
      loading.value = false
    }
  }

  async function completeItem(itemId, itemType, xp, score = null, scoreTotal = null) {
    if (completed.value.includes(itemId)) return

    const { data, error } = await useApi().post('/learn/complete', {
      item_id:    itemId,
      item_type:  itemType,
      xp,
      score,
      score_total: scoreTotal,
    })

    if (error) return

    completed.value = [...completed.value, itemId]

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

  return { completed, loading, xpToast, fetchProgress, completeItem, clearToast, isCompleted }
})
