<template>
  <div style="border-radius:12px;border:1px solid rgba(99,102,241,0.25);background:rgba(99,102,241,0.04);overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(99,102,241,0.07);border-bottom:1px solid rgba(99,102,241,0.15)">
      <div style="display:flex;align-items:center;gap:7px">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span style="font-size:0.78rem;font-weight:600;color:#818cf8">Prova tu</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:0.65rem;color:rgba(228,230,244,0.22);font-family:monospace">Tab = 2 spazi</span>
        <button @click="reset" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:rgba(228,230,244,0.35)">Reset</button>
      </div>
    </div>
    <p v-if="tryIt.desc" style="margin:0;padding:10px 14px 0;font-size:0.8rem;color:rgba(228,230,244,0.55)">{{ tryIt.desc }}</p>
    <textarea
      v-model="code"
      @keydown.tab.prevent="insertTab"
      spellcheck="false"
      style="display:block;width:100%;min-height:120px;padding:12px 14px;background:#07071a;border:none;border-top:1px solid rgba(255,255,255,0.05);color:#c9d1d9;font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.8rem;line-height:1.65;resize:vertical;outline:none"
    />
    <div style="padding:10px 14px;display:flex;gap:8px;align-items:center;border-top:1px solid rgba(255,255,255,0.05)">
      <button @click="run" style="padding:6px 14px;border-radius:8px;border:none;background:#6366f1;color:#fff;font-size:0.78rem;font-weight:600;cursor:pointer">▶ Esegui</button>
      <div v-if="ran" style="flex:1;padding:6px 12px;border-radius:8px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);font-family:monospace;font-size:0.78rem;color:#86efac;white-space:pre-wrap">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ tryIt: { type: Object, required: true } })

const code   = ref(props.tryIt.code)
const output = ref('')
const ran    = ref(false)

function run() {
  ran.value    = true
  output.value = props.tryIt.output || '// Eseguito con successo'
}
function reset() {
  code.value   = props.tryIt.code
  output.value = ''
  ran.value    = false
}
function insertTab(e) {
  const el    = e.target
  const start = el.selectionStart
  const end   = el.selectionEnd
  code.value  = code.value.substring(0, start) + '  ' + code.value.substring(end)
  requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2 })
}
</script>
