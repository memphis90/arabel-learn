<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Impostazioni' }]" />
      <div style="flex:1;overflow-y:auto;padding:32px 40px">
        <div class="settings-layout">

          <!-- Vertical Tab Nav -->
          <nav class="settings-nav">
            <button
              v-for="tab in TABS"
              :key="tab.id"
              class="settings-nav__item"
              :class="{ 'settings-nav__item--active': activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <span class="settings-nav__icon" v-html="tab.icon" />
              {{ tab.label }}
            </button>
          </nav>

          <!-- Tab Content -->
          <div class="settings-content">

            <!-- Account -->
            <div v-if="activeTab === 'account'" class="settings-panels">

              <div class="settings-panel">
                <div class="settings-section-label">Profilo</div>
                <div class="settings-panel__body">
                  <div class="settings-row settings-row--col">
                    <span class="settings-row__label">Nome</span>
                    <span class="settings-row__value">{{ auth.user?.name || '—' }}</span>
                  </div>
                  <div class="settings-divider" />
                  <div class="settings-row settings-row--col">
                    <span class="settings-row__label">Email</span>
                    <span class="settings-row__value">{{ auth.user?.email || '—' }}</span>
                  </div>
                </div>
              </div>

              <div class="settings-panel">
                <div class="settings-section-label">Password</div>
                <div class="settings-panel__body" style="padding: 8px 20px">
                  <div class="settings-pw-form">
                    <div class="settings-pw-field">
                      <label class="settings-pw-label">Password attuale</label>
                      <div class="settings-pw-input-wrap">
                        <input v-model="pwCurrent" :type="pwShowCurrent ? 'text' : 'password'" class="settings-pw-input" autocomplete="current-password" placeholder="••••••••" />
                        <button type="button" class="settings-pw-eye" @click="pwShowCurrent = !pwShowCurrent" tabindex="-1">
                          <svg v-if="!pwShowCurrent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                    </div>
                    <div class="settings-pw-field">
                      <label class="settings-pw-label">Nuova password</label>
                      <div class="settings-pw-input-wrap">
                        <input v-model="pwNew" :type="pwShowNew ? 'text' : 'password'" class="settings-pw-input" autocomplete="new-password" placeholder="••••••••" />
                        <button type="button" class="settings-pw-eye" @click="pwShowNew = !pwShowNew" tabindex="-1">
                          <svg v-if="!pwShowNew" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                    </div>
                    <ul v-if="pwNew.length > 0" class="settings-pw-rules">
                      <li v-for="rule in pwNewRules" :key="rule.label" :class="rule.met ? 'settings-pw-rule--met' : 'settings-pw-rule--unmet'">
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline v-if="rule.met" points="2 6 5 9 10 3"/>
                          <line v-else x1="2" y1="6" x2="10" y2="6"/>
                        </svg>
                        {{ rule.label }}
                      </li>
                    </ul>
                    <div class="settings-pw-field">
                      <label class="settings-pw-label">Conferma nuova password</label>
                      <div class="settings-pw-input-wrap">
                        <input v-model="pwConfirm" :type="pwShowConfirm ? 'text' : 'password'" class="settings-pw-input" autocomplete="new-password" placeholder="••••••••" />
                        <button type="button" class="settings-pw-eye" @click="pwShowConfirm = !pwShowConfirm" tabindex="-1">
                          <svg v-if="!pwShowConfirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                    </div>
                    <p v-if="pwError" class="settings-pw-error">{{ pwError }}</p>
                    <p v-if="pwSuccess" class="settings-pw-success">{{ pwSuccess }}</p>
                    <div class="settings-row__actions">
                      <button class="settings-save-btn" :disabled="pwSaving" @click="changePassword">
                        {{ pwSaving ? 'Salvataggio…' : 'Aggiorna password' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="settings-panel">
                <div class="settings-section-label">Social</div>
                <div class="settings-panel__body">
                  <div class="settings-row settings-row--col">
                    <span class="settings-row__label">LinkedIn</span>
                    <span class="settings-row__desc">Visibile agli altri utenti nel Network</span>
                    <div class="settings-social-wrap">
                      <span class="settings-social-prefix">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        linkedin.com/in/
                      </span>
                      <input v-model="linkedinHandle" class="settings-social-input" placeholder="il-tuo-profilo" maxlength="100" @keydown.enter="saveSocials" />
                    </div>
                  </div>

                  <div class="settings-divider" />

                  <div class="settings-row settings-row--col">
                    <span class="settings-row__label">GitHub</span>
                    <span class="settings-row__desc">Mostra i tuoi progetti open source</span>
                    <div class="settings-social-wrap">
                      <span class="settings-social-prefix">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        github.com/
                      </span>
                      <input v-model="githubHandle" class="settings-social-input" placeholder="il-tuo-username" maxlength="100" @keydown.enter="saveSocials" />
                    </div>
                  </div>

                  <div class="settings-row" style="padding-top:8px">
                    <div>
                      <p v-if="socialsError"   class="settings-pw-error">{{ socialsError }}</p>
                      <p v-if="socialsSuccess" class="settings-pw-success">{{ socialsSuccess }}</p>
                    </div>
                    <button class="settings-save-btn" :disabled="socialsSaving" @click="saveSocials">
                      {{ socialsSaving ? 'Salvataggio…' : 'Salva' }}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <!-- Privacy -->
            <div v-else-if="activeTab === 'privacy'" class="settings-panels">
              <div class="settings-panel">
                <div class="settings-section-label">Privacy e Cookie</div>
                <div class="settings-panel__body">

                  <div class="settings-row">
                    <div class="settings-row__info">
                      <span class="settings-row__label">Consenso attuale</span>
                      <span class="settings-row__desc">La tua scelta sui cookie. Puoi cambiarla in qualsiasi momento.</span>
                    </div>
                    <span class="consent-badge" :class="{
                      'consent-badge--full':      consentValue === 'full',
                      'consent-badge--essential': consentValue === 'essential',
                      'consent-badge--pending':   !consentValue,
                    }">
                      <template v-if="consentValue === 'full'">Tutti i cookie</template>
                      <template v-else-if="consentValue === 'essential'">Solo essenziali</template>
                      <template v-else>In attesa di scelta</template>
                    </span>
                  </div>

                  <div class="settings-divider" />

                  <div class="settings-row">
                    <div class="settings-row__info">
                      <span class="settings-row__label">Modifica preferenza</span>
                    </div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap">
                      <button v-if="consentValue !== 'essential'" class="settings-btn settings-btn--secondary" @click="setConsent('essential')">
                        Solo essenziali
                      </button>
                      <button v-if="consentValue !== 'full'" class="settings-btn settings-btn--primary" @click="setConsent('full')">
                        Accetta tutti
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Danger Zone -->
            <div v-else-if="activeTab === 'danger'" class="settings-panels">

              <div class="settings-panel settings-panel--danger">
                <div class="settings-section-label">Zona pericolosa</div>
                <div class="settings-panel__body">

                  <div class="settings-row">
                    <div class="settings-row__info">
                      <span class="settings-row__label">Azzera progressi</span>
                      <span class="settings-row__desc">Cancella tutte le lezioni completate e i badge. L'operazione non è reversibile.</span>
                    </div>
                    <button v-if="!resetConfirming" class="settings-delete-btn" @click="resetConfirming = true">
                      Azzera progressi
                    </button>
                  </div>
                  <div v-if="resetConfirming" class="settings-delete-confirm">
                    <p class="settings-delete-confirm__text">Sicuro? Tutti i progressi verranno eliminati definitivamente.</p>
                    <div class="settings-delete-confirm__actions">
                      <button class="settings-delete-confirm__cancel" @click="resetConfirming = false">Annulla</button>
                      <button class="settings-delete-confirm__confirm" @click="confirmReset">Sì, azzera tutto</button>
                    </div>
                  </div>

                  <div class="settings-divider" />

                  <div class="settings-row">
                    <div class="settings-row__info">
                      <span class="settings-row__label">Elimina account</span>
                      <span class="settings-row__desc">Elimina permanentemente il tuo account e tutti i dati associati.</span>
                    </div>
                    <button v-if="!deleteConfirming" class="settings-delete-btn" @click="deleteConfirming = true">
                      Elimina account
                    </button>
                  </div>
                  <div v-if="deleteConfirming" class="settings-delete-confirm">
                    <p class="settings-delete-confirm__text">Sicuro? Questa azione eliminerà il tuo account in modo permanente.</p>
                    <div class="settings-delete-confirm__actions">
                      <button class="settings-delete-confirm__cancel" @click="deleteConfirming = false">Annulla</button>
                      <button class="settings-delete-confirm__confirm" :disabled="deleteLoading" @click="confirmDelete">
                        {{ deleteLoading ? 'Eliminazione…' : 'Sì, elimina account' }}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader  from '@/components/AppHeader.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { useTheme }  from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import { useApi }    from '@/composables/useApi'

const router = useRouter()
const auth   = useAuthStore()
const learn  = useLearnStore()
const { isDark, toggle: toggleTheme } = useTheme()
const { lang, setLang } = useLocale()
const { patch, del } = useApi()

const activeTab = ref('account')

const TABS = [
  {
    id: 'account',
    label: 'Account',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    id: 'danger',
    label: 'Zona pericolosa',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
]

const LANGS = [
  { code: 'it', label: 'Italiano', disabled: false },
  { code: 'en', label: 'English',  disabled: false },
]

// ── Cookie consent ────────────────────────────────────────────────────────────
const CONSENT_KEY = 'arabel-learn-consent'
const consentValue = ref(localStorage.getItem(CONSENT_KEY) || null)

function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value)
  consentValue.value = value
}

// ── Password change ───────────────────────────────────────────────────────────
const pwCurrent     = ref('')
const pwNew         = ref('')
const pwConfirm     = ref('')
const pwError       = ref('')
const pwSuccess     = ref('')
const pwSaving      = ref(false)
const pwShowCurrent = ref(false)
const pwShowNew     = ref(false)
const pwShowConfirm = ref(false)

const pwNewRules = computed(() => [
  { label: 'Almeno 8 caratteri',   met: pwNew.value.length >= 8 },
  { label: 'Una lettera maiuscola', met: /[A-Z]/.test(pwNew.value) },
  { label: 'Una lettera minuscola', met: /[a-z]/.test(pwNew.value) },
  { label: 'Un numero',            met: /\d/.test(pwNew.value) },
])

async function changePassword() {
  pwError.value   = ''
  pwSuccess.value = ''
  if (!pwCurrent.value) { pwError.value = 'Inserisci la password attuale'; return }
  if (pwNewRules.value.some(r => !r.met)) { pwError.value = 'La nuova password non soddisfa i requisiti'; return }
  if (pwNew.value !== pwConfirm.value) { pwError.value = 'Le password non coincidono'; return }
  pwSaving.value = true
  const { error } = await patch('/users/me/password', { currentPassword: pwCurrent.value, newPassword: pwNew.value })
  pwSaving.value = false
  if (error) { pwError.value = error; return }
  pwCurrent.value = ''
  pwNew.value     = ''
  pwConfirm.value = ''
  pwSuccess.value = 'Password aggiornata con successo'
}

// ── Social links ──────────────────────────────────────────────────────────────
const linkedinHandle = ref(auth.user?.linkedin_url || '')
const githubHandle   = ref(auth.user?.github_url   || '')
const socialsSaving  = ref(false)
const socialsError   = ref('')
const socialsSuccess = ref('')

function normalizeHandle(value, re) {
  return value.trim().replace(re, '').replace(/\/$/, '')
}

async function saveSocials() {
  socialsError.value   = ''
  socialsSuccess.value = ''
  const linkedin = normalizeHandle(linkedinHandle.value, /^https?:\/\/(www\.)?linkedin\.com\/in\//i)
  const github   = normalizeHandle(githubHandle.value,   /^https?:\/\/(www\.)?github\.com\//i)
  linkedinHandle.value = linkedin
  githubHandle.value   = github
  socialsSaving.value  = true
  const { error } = await patch('/users/me/profile', { linkedin_url: linkedin || null, github_url: github || null })
  socialsSaving.value  = false
  if (error) { socialsError.value = error; return }
  if (auth.user) { auth.user.linkedin_url = linkedin || null; auth.user.github_url = github || null }
  socialsSuccess.value = 'Social aggiornati'
}

// ── Reset progress ────────────────────────────────────────────────────────────
const resetConfirming = ref(false)

function confirmReset() {
  learn.resetProgress()
  resetConfirming.value = false
}

// ── Delete account ────────────────────────────────────────────────────────────
const deleteConfirming = ref(false)
const deleteLoading    = ref(false)

async function confirmDelete() {
  deleteLoading.value = true
  const { error } = await del('/users/me')
  deleteLoading.value = false
  if (error) { deleteConfirming.value = false; return }
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.settings-layout {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
}

/* ── Nav ──────────────────────────────────────────────────── */
.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 180px;
  flex-shrink: 0;
  padding-top: 4px;
}

.settings-nav__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(var(--rgb-text), 0.55);
  text-align: left;
  width: 100%;
  transition: background 0.15s, color 0.15s;
}
.settings-nav__item:hover {
  background: rgba(var(--rgb-border), 0.06);
  color: var(--text-1);
}
.settings-nav__item--active {
  background: rgba(99, 102, 241, 0.16);
  color: var(--text-1);
  font-weight: 500;
}

.settings-nav__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
}
.settings-nav__item--active .settings-nav__icon { opacity: 1; }
.settings-nav__icon :deep(svg) { width: 18px; height: 18px; }

/* ── Content ──────────────────────────────────────────────── */
.settings-content { flex: 1; min-width: 0; }

.settings-panels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ── Panel ────────────────────────────────────────────────── */
.settings-panel {
  background: rgba(var(--rgb-surface), 0.7);
  border: 1px solid rgba(var(--rgb-border), 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.settings-panel--danger { border-color: rgba(239, 68, 68, 0.2); }
.settings-panel--danger .settings-section-label { color: rgba(239, 68, 68, 0.6); }

.settings-section-label {
  padding: 16px 28px 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(var(--rgb-text), 0.3);
}

.settings-panel__body { padding: 8px 0; }

/* ── Row ──────────────────────────────────────────────────── */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 28px;
}
.settings-row--col {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.settings-row__info { display: flex; flex-direction: column; gap: 3px; }
.settings-row__label { font-size: 0.875rem; font-weight: 500; color: var(--text-1); }
.settings-row__desc  { font-size: 0.78rem; color: rgba(var(--rgb-text), 0.38); }
.settings-row__value { font-size: 0.875rem; color: rgba(var(--rgb-text), 0.6); }

.settings-row__actions { padding-top: 8px; }

.settings-divider {
  height: 1px;
  background: rgba(var(--rgb-border), 0.07);
  margin: 0 28px;
}

/* ── Theme switch ─────────────────────────────────────────── */
.settings-theme-switch { display: flex; gap: 8px; }

.settings-theme-opt {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid rgba(var(--rgb-border), 0.1);
  background: transparent;
  color: rgba(var(--rgb-text), 0.5);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
}
.settings-theme-opt svg { width: 15px; height: 15px; flex-shrink: 0; }
.settings-theme-opt:hover { color: var(--text-1); border-color: rgba(var(--rgb-border), 0.2); }
.settings-theme-opt--active {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
}

/* ── Language pills ───────────────────────────────────────── */
.settings-lang-pills { display: flex; gap: 8px; flex-wrap: wrap; }

.settings-lang-pill {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(var(--rgb-border), 0.1);
  background: transparent;
  color: rgba(var(--rgb-text), 0.5);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
}
.settings-lang-pill:hover { color: var(--text-1); border-color: rgba(var(--rgb-border), 0.2); }
.settings-lang-pill--active {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
}
.settings-lang-pill--disabled { opacity: 0.35; cursor: not-allowed; }

/* ── LinkedIn ─────────────────────────────────────────────── */
.settings-linkedin-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(var(--rgb-border), 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(var(--rgb-border), 0.04);
  transition: border-color 0.15s;
}
.settings-linkedin-wrap:focus-within { border-color: rgba(99, 102, 241, 0.5); }

.settings-linkedin-prefix {
  padding: 9px 10px 9px 12px;
  font-size: 0.8rem;
  color: rgba(var(--rgb-text), 0.3);
  white-space: nowrap;
  flex-shrink: 0;
  border-right: 1px solid rgba(var(--rgb-border), 0.08);
}

.settings-linkedin-input {
  flex: 1;
  padding: 9px 12px;
  border: none;
  background: transparent;
  color: var(--text-1);
  font-size: 0.875rem;
  outline: none;
}
.settings-linkedin-input::placeholder { color: rgba(var(--rgb-text), 0.25); }

/* ── Password form ────────────────────────────────────────── */
.settings-pw-form { display: flex; flex-direction: column; gap: 14px; padding: 8px 0 16px; }
.settings-pw-field { display: flex; flex-direction: column; gap: 5px; }
.settings-pw-label { font-size: 0.8rem; color: rgba(var(--rgb-text), 0.5); }
.settings-pw-input-wrap { position: relative; }
.settings-pw-input {
  width: 100%;
  padding: 9px 40px 9px 12px;
  border-radius: 8px;
  border: 1px solid rgba(var(--rgb-border), 0.1);
  background: rgba(var(--rgb-border), 0.04);
  color: var(--text-1);
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.settings-pw-input:focus { border-color: rgba(99, 102, 241, 0.5); }
.settings-pw-input::placeholder { color: rgba(var(--rgb-text), 0.25); }
.settings-pw-eye {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(var(--rgb-text), 0.3);
  padding: 4px;
  display: flex;
}
.settings-pw-eye svg { width: 16px; height: 16px; }
.settings-pw-eye:hover { color: rgba(var(--rgb-text), 0.7); }

.settings-pw-rules { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.settings-pw-rules li { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; }
.settings-pw-rules li svg { width: 12px; height: 12px; flex-shrink: 0; }
.settings-pw-rule--met   { color: #86efac; }
.settings-pw-rule--unmet { color: rgba(var(--rgb-text), 0.3); }

.settings-pw-error   { margin: 0; font-size: 0.8rem; color: #f87171; }
.settings-pw-success { margin: 0; font-size: 0.8rem; color: #86efac; }

.settings-save-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background: #6366f1;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.settings-save-btn:hover:not(:disabled) { background: #4f46e5; }
.settings-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Buttons ──────────────────────────────────────────────── */
.settings-btn {
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.settings-btn--primary {
  border: none;
  background: #6366f1;
  color: #fff;
}
.settings-btn--primary:hover { background: #4f46e5; }
.settings-btn--secondary {
  background: transparent;
  border: 1px solid rgba(var(--rgb-border), 0.15);
  color: rgba(var(--rgb-text), 0.6);
}
.settings-btn--secondary:hover { color: var(--text-1); border-color: rgba(var(--rgb-border), 0.3); }

/* ── Consent badge ────────────────────────────────────────── */
.consent-badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}
.consent-badge--full      { background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; }
.consent-badge--essential { background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.3); color: #fbbf24; }
.consent-badge--pending   { background: rgba(var(--rgb-border),0.08); border: 1px solid rgba(var(--rgb-border),0.15); color: rgba(var(--rgb-text),0.4); }

/* ── Danger ───────────────────────────────────────────────── */
.settings-delete-btn {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.settings-delete-btn:hover { background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.6); }

.settings-delete-confirm { padding: 0 28px 20px; display: flex; flex-direction: column; gap: 12px; }
.settings-delete-confirm__text { font-size: 0.83rem; color: #ef4444; margin: 0; }
.settings-delete-confirm__actions { display: flex; gap: 8px; }
.settings-delete-confirm__cancel {
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid rgba(var(--rgb-border), 0.1);
  background: transparent;
  color: rgba(var(--rgb-text), 0.5);
  font-size: 0.82rem;
  cursor: pointer;
  transition: background 0.15s;
}
.settings-delete-confirm__cancel:hover { background: rgba(var(--rgb-border), 0.06); }
.settings-delete-confirm__confirm {
  padding: 7px 16px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.settings-delete-confirm__confirm:hover:not(:disabled) { background: #dc2626; }
.settings-delete-confirm__confirm:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
