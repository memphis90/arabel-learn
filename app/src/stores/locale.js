import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const lang = ref(localStorage.getItem('arabel_lang') || 'it')

  function setLang(l) {
    lang.value = l
    localStorage.setItem('arabel_lang', l)
  }

  return { lang, setLang }
})
