<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:#05050f;position:relative;overflow:hidden">
    <StarBackground />
    <div style="position:relative;z-index:1;width:100%;max-width:400px">

      <!-- Brand -->
      <div style="text-align:center;margin-bottom:32px">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;background:#6366f1;margin-bottom:14px">
          <svg viewBox="340 300 175 215" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M 356.50 506.04 C355.40,505.58 353.49,504.24 352.25,503.06 C348.20,499.21 349.15,495.76 360.93,471.51 C366.94,459.13 372.12,448.21 372.42,447.24 C372.82,445.98 372.16,445.12 370.10,444.20 C366.50,442.61 364.55,438.32 365.85,434.89 C367.35,430.94 369.85,429.55 375.67,429.40 C378.64,429.33 381.24,429.10 381.45,428.88 C381.66,428.67 384.96,421.98 388.79,414.00 C426.22,336.04 438.70,311.24 441.39,309.48 C444.96,307.14 451.47,308.01 454.73,311.27 C459.20,315.75 458.82,320.14 452.94,332.00 C442.12,353.82 406.00,428.43 406.00,428.95 C406.00,429.25 413.98,429.36 423.73,429.18 C433.49,429.01 442.94,429.14 444.74,429.48 C451.81,430.80 454.57,438.84 449.37,442.93 C446.86,444.90 445.50,445.00 422.06,445.00 L 397.38 445.00 L 385.94 468.69 C379.65,481.72 373.38,494.65 372.00,497.42 C368.23,505.03 362.16,508.41 356.50,506.04 Z M 474.97 463.71 C473.89,461.95 473.01,460.22 473.00,459.87 C473.00,459.25 467.84,448.24 454.29,420.00 C450.47,412.02 445.14,400.84 442.46,395.13 L 437.59 384.77 L 443.54 373.40 L 449.50 362.04 L 453.75 370.77 C456.09,375.57 461.00,385.80 464.66,393.50 C468.32,401.20 474.66,414.48 478.75,423.00 C488.13,442.56 499.00,465.74 499.00,466.17 C499.00,466.35 494.03,466.60 487.96,466.71 L 476.92 466.92 L 474.97 463.71 Z"/>
          </svg>
        </div>
        <h1 style="margin:0 0 4px;font-size:1.6rem;font-weight:700;color:#e4e6f4;letter-spacing:-0.02em">Arabel Learn</h1>
        <p style="margin:0;font-size:0.85rem;color:rgba(228,230,244,0.4)">Impara a programmare, un livello alla volta</p>
      </div>

      <!-- Card -->
      <div style="background:rgba(12,12,28,0.8);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px">
        <!-- Tabs -->
        <div style="display:flex;margin-bottom:24px;background:rgba(255,255,255,0.04);border-radius:10px;padding:3px">
          <button v-for="m in ['login','register']" :key="m" @click="mode = m" :style="{
            flex: 1, padding: '7px', border: 'none', borderRadius: '8px', cursor: 'pointer',
            background: mode === m ? '#6366f1' : 'transparent',
            color: mode === m ? '#fff' : 'rgba(228,230,244,0.45)',
            fontSize: '0.85rem', fontWeight: mode === m ? 600 : 400, transition: 'all 0.2s',
          }">{{ m === 'login' ? 'Accedi' : 'Registrati' }}</button>
        </div>

        <p v-if="error" style="margin:0 0 14px;padding:10px 14px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);font-size:0.83rem;color:#fca5a5">{{ error }}</p>

        <!-- Dev bypass — visible only in development -->
        <div v-if="isDev" style="margin-bottom:16px;padding:10px 14px;border-radius:10px;background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2)">
          <div style="font-size:0.7rem;font-weight:600;color:rgba(234,179,8,0.7);letter-spacing:0.06em;margin-bottom:8px">⚙ DEV MODE</div>
          <button type="button" @click="devLogin" style="width:100%;padding:8px;border-radius:8px;border:1px solid rgba(234,179,8,0.3);background:rgba(234,179,8,0.08);color:#fbbf24;font-size:0.82rem;font-weight:600;cursor:pointer">
            Accedi senza backend
          </button>
        </div>

        <!-- Google OAuth -->
        <a :href="`${apiBase}/auth/google`" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:#e4e6f4;font-size:0.9rem;font-weight:500;text-decoration:none;transition:background 0.2s;margin-bottom:4px"
          @mouseover="e => e.currentTarget.style.background='rgba(255,255,255,0.08)'"
          @mouseout="e => e.currentTarget.style.background='rgba(255,255,255,0.04)'">
          <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continua con Google
        </a>

        <div style="display:flex;align-items:center;gap:10px;margin:4px 0">
          <div style="flex:1;height:1px;background:rgba(255,255,255,0.07)"/>
          <span style="font-size:0.72rem;color:rgba(228,230,244,0.3)">oppure</span>
          <div style="flex:1;height:1px;background:rgba(255,255,255,0.07)"/>
        </div>

        <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:14px">
          <input v-if="mode === 'register'" v-model="name" :style="inputStyle" placeholder="Nome completo" />
          <input v-model="email" :style="inputStyle" type="email" placeholder="Email" required />
          <input v-model="password" :style="inputStyle" type="password" placeholder="Password" required />
          <button type="submit" :disabled="loading" :style="{
            padding: '11px', borderRadius: '10px', border: 'none',
            background: loading ? 'rgba(99,102,241,0.5)' : '#6366f1',
            color: '#fff', fontSize: '0.9rem', fontWeight: 600,
            cursor: loading ? 'default' : 'pointer', transition: 'background 0.2s',
          }">
            {{ loading ? 'Caricamento…' : (mode === 'login' ? 'Accedi' : 'Crea account') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StarBackground from '@/components/StarBackground.vue'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'

const router = useRouter()
const auth   = useAuthStore()
const learn  = useLearnStore()
const api    = useApi()

const isDev  = import.meta.env.DEV
const apiBase = import.meta.env.VITE_API_URL || '/api'

const mode     = ref('login')
const email    = ref('')
const password = ref('')
const name     = ref('')
const loading  = ref(false)
const error    = ref('')

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
  color: '#e4e6f4', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
}

function devLogin() {
  auth.setUser(
    { id: 0, email: 'dev@arabel.dev', name: 'Dev User', plan: 'FREE' },
    { xp: 320, level: 3, xpNextLevel: 400, streak: 5, badges: [] },
  )
  router.push({ name: 'home' })
}

async function submit() {
  error.value   = ''
  loading.value = true
  try {
    const endpoint = mode.value === 'login' ? '/auth/login' : '/auth/register'
    const body     = mode.value === 'login'
      ? { email: email.value, password: password.value }
      : { email: email.value, password: password.value, name: name.value }

    const { data, error: err } = await api.post(endpoint, body)

    if (err) { error.value = err; return }

    auth.setUser(data.user, data.stats)
    await learn.fetchProgress()
    router.push({ name: 'home' })
  } finally {
    loading.value = false
  }
}
</script>
