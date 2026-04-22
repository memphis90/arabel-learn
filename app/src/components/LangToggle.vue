<template>
  <div style="position:relative;flex-shrink:0" ref="root">
    <button @click="open = !open" :style="{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 10px', border: '1px solid rgba(var(--rgb-border),0.08)',
      borderRadius: '8px', background: open ? 'rgba(99,102,241,0.12)' : 'transparent',
      cursor: 'pointer', color: 'rgba(var(--rgb-text),0.5)', transition: 'all 0.15s',
    }"
    @mouseover="e => { if(!open) e.currentTarget.style.background='rgba(var(--rgb-border),0.05)' }"
    @mouseout="e => { if(!open) e.currentTarget.style.background='transparent' }">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span style="font-size:0.72rem;font-weight:600;letter-spacing:0.04em">{{ lang.toUpperCase() }}</span>
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
        :style="{ transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <Transition name="lang-drop">
      <div v-if="open" style="position:absolute;top:calc(100% + 6px);right:0;min-width:140px;border-radius:10px;border:1px solid rgba(var(--rgb-border),0.09);background:var(--bg-dropdown);box-shadow:0 8px 24px rgba(0,0,0,0.5);backdrop-filter:blur(16px);overflow:hidden;z-index:300">
        <button v-for="opt in options" :key="opt.code"
          @click="pick(opt.code)"
          :style="{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '10px 14px', border: 'none',
            background: lang === opt.code ? 'rgba(99,102,241,0.14)' : 'transparent',
            color: lang === opt.code ? '#c4b5fd' : 'rgba(var(--rgb-text),0.6)',
            fontSize: '0.82rem', fontWeight: lang === opt.code ? 600 : 400,
            cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
          }"
          @mouseover="e => { if(lang !== opt.code) e.currentTarget.style.background='rgba(var(--rgb-border),0.05)' }"
          @mouseout="e => { if(lang !== opt.code) e.currentTarget.style.background='transparent' }">
          <span style="font-size:1.1rem">{{ opt.flag }}</span>
          <span>{{ opt.label }}</span>
          <svg v-if="lang === opt.code" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>

  <Teleport to="body">
    <div v-if="open" @click="open = false" style="position:fixed;inset:0;z-index:299" />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { lang, setLang } = useLocale()
const open = ref(false)
const root = ref(null)

const options = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
]

function pick(code) {
  setLang(code)
  open.value = false
}
</script>

<style scoped>
.lang-drop-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.lang-drop-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.lang-drop-enter-from   { opacity: 0; transform: translateY(-6px); }
.lang-drop-leave-to     { opacity: 0; transform: translateY(-6px); }
</style>
