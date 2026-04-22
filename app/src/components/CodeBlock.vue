<template>
  <div style="border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:#0a0a18;margin:4px 0">
    <div v-if="label" style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06)">
      <span style="font-size:0.72rem;color:rgba(228,230,244,0.45);font-family:monospace">{{ label }}</span>
      <button @click="copy" style="background:none;border:none;cursor:pointer;font-size:0.7rem;padding:2px 6px;border-radius:4px;transition:color 0.2s"
        :style="{ color: copied ? '#22c55e' : 'rgba(228,230,244,0.35)' }">
        {{ copied ? '✓ Copiato' : 'Copia' }}
      </button>
    </div>
    <pre style="margin:0;padding:16px;overflow-x:auto;font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.82rem;line-height:1.65;color:#c9d1d9"><code v-html="highlighted"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  code:  { type: String, required: true },
  label: { type: String, default: '' },
  lang:  { type: String, default: 'js' },
})

const copied = ref(false)

function highlight(src) {
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  return esc(src).replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*)|(#[^\n]*)|\b(const|let|var|function|return|require|import|export|from|if|else|class|new|this|async|await|module|default|def|print|echo|cd|ls|mkdir|sudo)\b/g,
    (_, str, comment, hashComment, kw) => {
      if (str         !== undefined) return `<span class="tok-str">${str}</span>`
      if (comment     !== undefined) return `<span class="tok-comment">${comment}</span>`
      if (hashComment !== undefined) return `<span class="tok-comment">${hashComment}</span>`
      if (kw          !== undefined) return `<span class="tok-kw">${kw}</span>`
      return _
    }
  )
}

const highlighted = computed(() => highlight(props.code))

function copy() {
  navigator.clipboard?.writeText(props.code).catch(() => {})
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}
</script>
