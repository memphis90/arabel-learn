<template>
  <div style="border-radius:14px;border:1px solid rgba(99,102,241,0.25);background:rgba(6,6,18,0.9);overflow:hidden">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(99,102,241,0.07);border-bottom:1px solid rgba(99,102,241,0.15)">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="display:flex;gap:5px">
          <div style="width:10px;height:10px;border-radius:50%;background:rgba(239,68,68,0.45)" />
          <div style="width:10px;height:10px;border-radius:50%;background:rgba(245,158,11,0.45)" />
          <div style="width:10px;height:10px;border-radius:50%;background:rgba(34,197,94,0.45)" />
        </div>
        <span style="font-size:0.75rem;font-weight:600;color:#818cf8;margin-left:4px">playground</span>
        <span style="font-size:0.67rem;color:rgba(228,230,244,0.2);font-family:monospace;background:rgba(255,255,255,0.04);padding:1px 7px;border-radius:4px">{{ langLabel }}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:0.65rem;color:rgba(228,230,244,0.18);font-family:monospace">Tab = 2 spazi</span>
        <button @click="reset" style="background:none;border:none;cursor:pointer;font-size:0.72rem;color:rgba(228,230,244,0.3);padding:2px 7px;border-radius:5px;transition:color 0.15s"
          @mouseover="e => e.currentTarget.style.color='rgba(228,230,244,0.7)'"
          @mouseout="e => e.currentTarget.style.color='rgba(228,230,244,0.3)'">Reset</button>
      </div>
    </div>

    <!-- Description -->
    <p v-if="tryIt.desc" style="margin:0;padding:10px 16px 0;font-size:0.8rem;color:rgba(228,230,244,0.48);line-height:1.5">{{ tryIt.desc }}</p>

    <!-- Editor -->
    <textarea
      v-model="code"
      @keydown.tab.prevent="insertTab"
      spellcheck="false"
      style="display:block;width:100%;min-height:140px;padding:14px 16px;background:#05050f;border:none;border-top:1px solid rgba(255,255,255,0.04);color:#c9d1d9;font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.82rem;line-height:1.7;resize:vertical;outline:none;box-sizing:border-box"
    />

    <!-- Run bar -->
    <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.2)">
      <button @click="run" :disabled="running" :style="{
        display:'flex', alignItems:'center', gap:'6px',
        padding:'7px 16px', borderRadius:'8px', border:'none',
        background: running ? 'rgba(99,102,241,0.4)' : '#6366f1',
        color:'#fff', fontSize:'0.8rem', fontWeight:700,
        cursor: running ? 'default' : 'pointer', transition:'background 0.2s',
        flexShrink:0,
      }">
        <svg v-if="!running" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <svg v-else viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="spin">
          <path d="M21 12a9 9 0 1 1-9-9"/>
        </svg>
        {{ running ? 'Esecuzione…' : 'Esegui' }}
      </button>
      <span style="flex:1;font-size:0.7rem;color:rgba(228,230,244,0.18)">
        {{ isJS ? 'esecuzione locale' : pistonCfg ? 'powered by piston' : 'output atteso' }}
      </span>
    </div>

    <!-- Output -->
    <Transition name="out">
      <div v-if="ran" :style="{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: hasError ? 'rgba(239,68,68,0.04)' : 'rgba(34,197,94,0.03)',
      }">
        <div style="display:flex;align-items:center;gap:8px;padding:8px 16px 4px">
          <span :style="{ fontSize:'0.67rem', fontWeight:700, letterSpacing:'0.07em', color: hasError ? '#f87171' : '#4ade80' }">
            {{ hasError ? 'ERRORE' : 'OUTPUT' }}
          </span>
          <div :style="{ height:'1px', flex:1, background: hasError ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)' }" />
        </div>
        <pre :style="{
          margin:0, padding:'4px 16px 14px',
          fontFamily:'\'JetBrains Mono\',\'Fira Code\',monospace',
          fontSize:'0.8rem', lineHeight:'1.65', whiteSpace:'pre-wrap', wordBreak:'break-all',
          color: hasError ? '#fca5a5' : '#86efac',
        }">{{ output }}</pre>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ tryIt: { type: Object, required: true } })

const JS_LANGS = new Set(['js', 'html'])

const LANG_LABELS = {
  js:   'JavaScript',
  html: 'JavaScript',
  ts:   'TypeScript',
  py:   'Python',
  go:   'Go',
  java: 'Java',
  php:  'PHP',
  bash: 'Bash',
  sql:  'SQL',
  yaml: 'YAML',
}

const PISTON_MAP = {
  ts:   { language: 'typescript', version: '*' },
  py:   { language: 'python',     version: '*' },
  go:   { language: 'go',         version: '*' },
  java: { language: 'java',       version: '*' },
  php:  { language: 'php',        version: '*' },
  bash: { language: 'bash',       version: '*' },
}

function detectLang(tryIt) {
  if (tryIt.lang) return tryIt.lang
  const c = tryIt.code?.trim() || ''
  if (c.startsWith('#!') || /^(cd|ls|mkdir|rm|echo|cat|grep|find|chmod|sudo|curl|ssh)\b/m.test(c)) return 'bash'
  if (c.startsWith('<?php')) return 'php'
  if (c.startsWith('package main') || /^func \w/m.test(c)) return 'go'
  if (/^(--|SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/im.test(c)) return 'sql'
  if (/^(SET|GET|HSET|PUBLISH|XADD|SUBSCRIBE|LPUSH|SADD|TTL|DEL)\b/m.test(c)) return 'redis'
  if (/\bfunction\s+\w+\s*\([^)]*:\s*(string|number|boolean)\b/.test(c)) return 'ts'
  return 'js'
}

const lang      = computed(() => detectLang(props.tryIt))
const langLabel = computed(() => LANG_LABELS[lang.value] || lang.value)
const isJS      = computed(() => JS_LANGS.has(lang.value))
const pistonCfg = computed(() => PISTON_MAP[lang.value] || null)

const code     = ref(props.tryIt.code)
const output   = ref('')
const ran      = ref(false)
const running  = ref(false)
const hasError = ref(false)

watch(() => props.tryIt, (t) => {
  code.value     = t.code
  output.value   = ''
  ran.value      = false
  hasError.value = false
})

// Run JS locally in a sandboxed Web Worker — no external API, no auth, instant
function runLocal(src) {
  return new Promise(resolve => {
    const workerSrc = `
      const _logs = [];
      const console = {
        log:   (...a) => _logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')),
        error: (...a) => _logs.push('[error] ' + a.join(' ')),
        warn:  (...a) => _logs.push('[warn] '  + a.join(' ')),
        info:  (...a) => _logs.push(a.join(' ')),
      };
      try {
        ${src}
        postMessage({ out: _logs.join('\\n'), err: null });
      } catch(e) {
        postMessage({ out: _logs.join('\\n'), err: e.toString() });
      }
    `
    const url    = URL.createObjectURL(new Blob([workerSrc], { type: 'application/javascript' }))
    const worker = new Worker(url)
    const timer  = setTimeout(() => { worker.terminate(); resolve({ out: '', err: 'Timeout: esecuzione troppo lunga (5s)' }) }, 5000)

    worker.onmessage = ({ data }) => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve(data) }
    worker.onerror   = (e)        => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve({ out: '', err: e.message }) }
  })
}

async function run() {
  if (running.value) return
  running.value  = true
  ran.value      = false
  hasError.value = false

  try {
    if (isJS.value) {
      const { out, err } = await runLocal(code.value)
      hasError.value = !!err
      output.value   = err ? (out ? out + '\n' : '') + err : (out || '(nessun output)')
    } else if (pistonCfg.value) {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: pistonCfg.value.language,
          version:  pistonCfg.value.version,
          files:    [{ content: code.value }],
        }),
      })
      if (!res.ok) throw new Error(`Piston HTTP ${res.status}`)
      const data = await res.json()
      const out  = (data.run?.stdout || '').trimEnd()
      const err  = (data.run?.stderr || '').trimEnd()
      if (err && !out) { hasError.value = true; output.value = err }
      else output.value = (out + (err ? '\n' + err : '')) || '(nessun output)'
    } else {
      output.value = props.tryIt.output || 'Esecuzione non disponibile nel browser per questo linguaggio.'
    }
  } catch (err) {
    hasError.value = true
    output.value   = `Errore di esecuzione: ${err.message}`
  } finally {
    running.value = false
    ran.value     = true
  }
}

function reset() {
  code.value     = props.tryIt.code
  output.value   = ''
  ran.value      = false
  hasError.value = false
}

function insertTab(e) {
  const el    = e.target
  const start = el.selectionStart
  const end   = el.selectionEnd
  code.value  = code.value.substring(0, start) + '  ' + code.value.substring(end)
  requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2 })
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }
.out-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.out-enter-from   { opacity: 0; transform: translateY(-4px); }
</style>
