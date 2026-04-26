<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[
        { label: t('nav.courses'), onClick: () => $router.push({ name: 'home' }) },
        { label: course?.name || '', onClick: () => $router.push({ name: 'course', params: { id: courseId } }) },
        { label: quiz?.title || '' },
      ]" />
      <div class="view-scroll" style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:640px;margin:0 auto">

          <!-- Already done -->
          <div v-if="alreadyDone && !finished" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:50vh;gap:16px;text-align:center">
            <div style="font-size:2.5rem">✓</div>
            <h3 style="margin:0;color:var(--text-1)">{{ t('quiz.already_done_title') }}</h3>
            <p style="margin:0;color:rgba(var(--rgb-text),0.45);font-size:0.875rem">{{ t('quiz.already_done_desc', quiz.xp) }}</p>
            <button @click="$router.push({ name: 'course', params: { id: courseId } })" style="padding:10px 22px;border-radius:10px;border:1px solid rgba(var(--rgb-border),0.1);background:transparent;color:rgba(var(--rgb-text),0.7);cursor:pointer;font-size:0.875rem">{{ t('quiz.back') }}</button>
          </div>

          <!-- Results -->
          <div v-else-if="finished" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:20px">
            <div style="font-size:3rem">{{ resultEmoji }}</div>
            <div>
              <h2 style="margin:0 0 6px;font-size:1.8rem;font-weight:700;color:var(--text-1)">{{ resultPct }}%</h2>
              <p style="margin:0;color:rgba(var(--rgb-text),0.5);font-size:0.9rem">{{ t('quiz.correct_of', resultScore, quiz.questions.length) }}</p>
            </div>
            <div :style="{ padding: '10px 20px', borderRadius: '12px', background: `rgba(${course?.colorRgb},0.1)`, border: `1px solid rgba(${course?.colorRgb},0.25)`, fontSize: '0.95rem', fontWeight: 700, color: `rgb(${course?.colorRgb})` }">
              {{ t('quiz.xp_earned', quiz.xp) }}
            </div>
            <div v-if="resultScore === quiz.questions.length" style="font-size:0.82rem;padding:8px 16px;border-radius:99px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);color:#c084fc">{{ t('quiz.badge_quiz_ace') }}</div>
            <button @click="$router.push({ name: 'course', params: { id: courseId } })" style="padding:11px 28px;border-radius:12px;border:none;background:#6366f1;color:#fff;font-size:0.9rem;font-weight:600;cursor:pointer">{{ t('quiz.back_btn') }}</button>
          </div>

          <!-- Quiz -->
          <template v-else-if="quiz">
            <!-- Progress -->
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
              <div style="flex:1;height:4px;border-radius:99px;background:rgba(var(--rgb-border),0.07);overflow:hidden">
                <div :style="{ height: '100%', width: progressPct + '%', background: `rgb(${course?.colorRgb})`, borderRadius: '99px', transition: 'width 0.4s ease' }" />
              </div>
              <span style="font-size:0.78rem;color:rgba(var(--rgb-text),0.38);white-space:nowrap">{{ qIdx + 1 }} / {{ quiz.questions.length }}</span>
            </div>

            <!-- Question -->
            <div style="margin-bottom:24px">
              <div :style="{ fontSize: '0.72rem', color: `rgba(${course?.colorRgb},0.8)`, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '8px' }">{{ t('quiz.question', qIdx + 1) }}</div>
              <h3 style="margin:0;font-size:1.1rem;font-weight:600;color:var(--text-1);line-height:1.5">{{ q.text }}</h3>
            </div>

            <!-- Options -->
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:22px">
              <button v-for="(opt, oi) in q.options" :key="oi" @click="select(oi)"
                :style="{
                  padding: '13px 16px', borderRadius: '12px', textAlign: 'left', cursor: submitted ? 'default' : 'pointer',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
                  fontSize: '0.875rem',
                  border: `1.5px solid ${submitted && q.correct === oi ? 'rgba(34,197,94,0.5)' : submitted && selected === oi && q.correct !== oi ? 'rgba(239,68,68,0.5)' : selected === oi ? `rgba(${course?.colorRgb},0.5)` : 'rgba(var(--rgb-border),0.07)'}`,
                  background: submitted && q.correct === oi ? 'rgba(34,197,94,0.08)' : submitted && selected === oi && q.correct !== oi ? 'rgba(239,68,68,0.08)' : selected === oi ? `rgba(${course?.colorRgb},0.1)` : 'rgba(var(--rgb-border),0.02)',
                  color: submitted && q.correct === oi ? '#86efac' : submitted && selected === oi && q.correct !== oi ? '#fca5a5' : selected === oi ? 'var(--text-1)' : 'rgba(var(--rgb-text),0.7)',
                }">
                <span>{{ opt }}</span>
                <span v-if="submitted && q.correct === oi" style="color:#22c55e">✓</span>
                <span v-else-if="submitted && selected === oi && q.correct !== oi" style="color:#ef4444">✗</span>
              </button>
            </div>

            <!-- Explanation -->
            <div v-if="submitted" style="margin-bottom:18px;padding:12px 16px;border-radius:12px;background:rgba(var(--rgb-border),0.03);border:1px solid rgba(var(--rgb-border),0.07);font-size:0.83rem;color:rgba(var(--rgb-text),0.6);line-height:1.6">
              <span style="font-weight:600;color:rgba(var(--rgb-text),0.8)">Spiegazione: </span>{{ q.explanation }}
            </div>

            <!-- Action -->
            <button v-if="!submitted" @click="confirm" :disabled="selected === undefined"
              :style="{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'background 0.2s', cursor: selected !== undefined ? 'pointer' : 'default', background: selected !== undefined ? '#6366f1' : 'rgba(99,102,241,0.2)', color: selected !== undefined ? '#fff' : 'rgba(var(--rgb-text),0.3)' }">
              Conferma risposta
            </button>
            <button v-else @click="next" :style="{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: `rgb(${course?.colorRgb})`, color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }">
              {{ qIdx < quiz.questions.length - 1 ? 'Prossima domanda →' : 'Vedi risultati →' }}
            </button>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'
import { useLearnStore } from '@/stores/learn'
import { courses, quizzes } from '@/data/learn'

const route  = useRoute()
const router = useRouter()
const learn  = useLearnStore()

const courseId   = computed(() => route.query.courseId || '')
const quiz       = computed(() => quizzes[route.params.id])
const course     = computed(() => courses.find(c => c.id === courseId.value))
const alreadyDone = computed(() => learn.isCompleted(route.params.id))

const qIdx      = ref(0)
const answers   = ref({})
const submitted = ref(false)
const finished  = ref(false)

const q         = computed(() => quiz.value?.questions[qIdx.value])
const selected  = computed(() => answers.value[qIdx.value])
const progressPct = computed(() => ((qIdx.value + (submitted.value ? 1 : 0)) / (quiz.value?.questions.length || 1)) * 100)

const resultScore = computed(() => quiz.value?.questions.filter((q, i) => answers.value[i] === q.correct).length || 0)
const resultPct   = computed(() => Math.round((resultScore.value / (quiz.value?.questions.length || 1)) * 100))
const resultEmoji = computed(() => resultScore.value === quiz.value?.questions.length ? '🏆' : resultPct.value >= 60 ? '🎯' : '💪')

function select(oi) {
  if (submitted.value) return
  answers.value = { ...answers.value, [qIdx.value]: oi }
}
function confirm() {
  if (selected.value === undefined) return
  submitted.value = true
}
async function next() {
  submitted.value = false
  if (qIdx.value < quiz.value.questions.length - 1) {
    qIdx.value++
  } else {
    finished.value = true
    await learn.completeItem(
      route.params.id, 'quiz', quiz.value.xp,
      resultScore.value, quiz.value.questions.length
    )
  }
}
</script>
