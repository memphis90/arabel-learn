import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') !== 'light')

function applyTheme(dark) {
  document.documentElement.classList.toggle('light', !dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

applyTheme(isDark.value)

watch(isDark, applyTheme)

export function useTheme() {
  return {
    isDark,
    toggle() { isDark.value = !isDark.value },
  }
}
