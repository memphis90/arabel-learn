<template>
  <header style="display:flex;align-items:center;justify-content:space-between;padding:14px 32px;flex-shrink:0;border-bottom:1px solid rgba(var(--rgb-border),0.04);gap:16px">
    <!-- Breadcrumbs -->
    <div style="display:flex;align-items:center;gap:8px;font-size:0.875rem;min-width:0;flex:1">
      <template v-for="(b, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" style="color:rgba(var(--rgb-text),0.14)">/</span>
        <button v-if="b.onClick" @click="b.onClick()" style="background:none;border:none;cursor:pointer;padding:0;font-size:inherit;color:rgba(var(--rgb-text),0.32);transition:color 0.15s;white-space:nowrap"
          @mouseover="e => e.currentTarget.style.color='var(--text-1)'" @mouseout="e => e.currentTarget.style.color='rgba(var(--rgb-text),0.32)'">
          {{ b.label }}
        </button>
        <span v-else style="color:var(--text-1);font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ b.label }}</span>
      </template>
    </div>

    <!-- Search -->
    <div ref="searchWrap" style="position:relative;flex:0 1 320px;min-width:180px">
      <div style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:10px;border:1px solid rgba(var(--rgb-border),0.12);background:rgba(var(--rgb-border),0.04);transition:border-color 0.15s"
        :style="{ borderColor: focused ? 'rgba(var(--rgb-border),0.28)' : 'rgba(var(--rgb-border),0.12)' }">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ color: 'rgba(var(--rgb-text),0.35)', flexShrink: 0 }">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref="inputRef"
          v-model="query"
          @focus="focused = true"
          @keydown.escape="close"
          @keydown.enter.prevent="selectFirst"
          placeholder="Cerca corso…"
          style="background:none;border:none;outline:none;font-size:0.82rem;color:var(--text-1);width:100%;font-family:inherit"
          :style="{ '::placeholder': { color: 'rgba(var(--rgb-text),0.35)' } }"
        />
        <button v-if="query" @click="close" style="background:none;border:none;cursor:pointer;padding:0;color:rgba(var(--rgb-text),0.3);font-size:0.8rem;line-height:1;flex-shrink:0">✕</button>
      </div>

      <!-- Dropdown -->
      <div v-if="focused && results.length" style="position:absolute;top:calc(100% + 6px);left:0;right:0;border-radius:12px;border:1px solid rgba(var(--rgb-border),0.12);background:var(--bg-dropdown);box-shadow:0 8px 24px rgba(0,0,0,0.12);backdrop-filter:blur(16px);overflow:hidden;z-index:400">
        <button v-for="c in results" :key="c.id" @mousedown.prevent="goTo(c)"
          style="display:flex;align-items:center;gap:12px;width:100%;padding:10px 14px;border:none;background:transparent;cursor:pointer;text-align:left;transition:background 0.12s"
          @mouseover="e => e.currentTarget.style.background='rgba(var(--rgb-border),0.06)'"
          @mouseout="e => e.currentTarget.style.background='transparent'">
          <CourseIcon :course-id="c.id" style="flex-shrink:0" />
          <div>
            <div style="font-size:0.82rem;font-weight:600;color:var(--text-1)">{{ c.name }}</div>
            <div style="font-size:0.7rem;color:rgba(var(--rgb-text),0.4)">{{ c.tagline }}</div>
          </div>
        </button>
        <button v-if="hasMore" @mousedown.prevent="goToAll"
          style="display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:9px 14px;border:none;border-top:1px solid rgba(var(--rgb-border),0.08);background:transparent;cursor:pointer;font-size:0.76rem;font-weight:600;color:rgba(var(--rgb-text),0.45);transition:all 0.12s"
          @mouseover="e => { e.currentTarget.style.background='rgba(var(--rgb-border),0.04)'; e.currentTarget.style.color='var(--text-1)' }"
          @mouseout="e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(var(--rgb-text),0.45)' }">
          Vedi tutti i corsi ({{ allResults.length }}) →
        </button>
      </div>
      <div v-else-if="focused && query && !results.length"
        style="position:absolute;top:calc(100% + 6px);left:0;right:0;border-radius:12px;border:1px solid rgba(var(--rgb-border),0.12);background:var(--bg-dropdown);padding:14px;font-size:0.8rem;color:rgba(var(--rgb-text),0.4);text-align:center;z-index:400">
        Nessun corso trovato
      </div>
    </div>

    <!-- Actions -->
    <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
      <slot name="actions" />
      <ThemeToggle />
      <LangToggle />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LangToggle  from '@/components/LangToggle.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import CourseIcon  from '@/components/CourseIcon.vue'
import { courses } from '@/data/learn'

defineProps({
  breadcrumbs: { type: Array, default: () => [] },
})

const router     = useRouter()
const query      = ref('')
const focused    = ref(false)
const searchWrap = ref(null)
const inputRef   = ref(null)

const activeCourses = courses.filter(c => !c.comingSoon)

const allResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return activeCourses
  return activeCourses.filter(c =>
    c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
  )
})

const results  = computed(() => allResults.value.slice(0, 5))
const hasMore  = computed(() => allResults.value.length > 5)

function goTo(course) {
  router.push({ name: 'course', params: { id: course.id } })
  close()
}

function goToAll() {
  router.push({ name: 'courses' })
  close()
}

function selectFirst() {
  if (results.value.length) goTo(results.value[0])
}

function close() {
  query.value = ''
  focused.value = false
  inputRef.value?.blur()
}

function onOutsideClick(e) {
  if (searchWrap.value && !searchWrap.value.contains(e.target)) {
    focused.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', onOutsideClick))
</script>
