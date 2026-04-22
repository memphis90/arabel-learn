import { ref, watch, readonly } from 'vue'

const stored = localStorage.getItem('theme')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(stored !== null ? stored !== 'light' : systemDark)

function applyTheme(dark) {
  document.documentElement.classList.toggle('light', !dark)
}

applyTheme(isDark.value)

watch(isDark, (dark) => {
  applyTheme(dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
})

export function useTheme() {
  return {
    isDark: readonly(isDark),
    toggle() { isDark.value = !isDark.value },
  }
}
