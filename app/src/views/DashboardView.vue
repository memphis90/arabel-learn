<template>
  <div style="display:flex;height:100vh;background:#05050f;overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Dashboard' }]" />
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:900px;margin:0 auto">

          <!-- Hero -->
          <div style="margin-bottom:32px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
              <div>
                <div style="font-size:0.8rem;color:rgba(228,230,244,0.38);margin-bottom:4px">✦ {{ greeting }}</div>
                <h1 style="margin:0 0 6px;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;letter-spacing:-0.03em;color:#e4e6f4">
                  {{ firstName }}{{ t('dashboard.keep_learning') }}
                </h1>
                <p style="margin:0;font-size:0.875rem;color:rgba(228,230,244,0.42)">
                  {{ t('dashboard.completed_of', completedCount, totalLessons) }} — {{ t('dashboard.total_progress', pctTotal) }}
                </p>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <StreakFlame :count="stats.streak" />
                <LevelBadge :level="stats.level" />
              </div>
            </div>
            <div style="margin-top:16px">
              <XPBar :current="stats.xp" :total="stats.xpNextLevel" />
            </div>
          </div>

          <!-- Continue card -->
          <div v-if="inProgress" @click="$router.push({ name: 'course', params: { id: inProgress.id } })"
            :style="{
              marginBottom: '28px', padding: '18px 22px', borderRadius: '16px',
              background: `linear-gradient(135deg, rgba(${inProgress.colorRgb},0.12), rgba(${inProgress.colorRgb},0.05))`,
              border: `1px solid rgba(${inProgress.colorRgb},0.3)`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }"
            @mouseover="e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(${inProgress.colorRgb},0.15)` }"
            @mouseout="e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }">
            <div style="display:flex;align-items:center;gap:14px">
              <CourseIcon :course-id="inProgress.id" />
              <div>
                <div :style="{ fontSize: '0.7rem', color: `rgba(${inProgress.colorRgb},0.8)`, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '3px' }">{{ t('dashboard.continue') }}</div>
                <div style="font-size:1rem;font-weight:600;color:#e4e6f4">{{ inProgress.name }}</div>
                <div style="font-size:0.78rem;color:rgba(228,230,244,0.45);margin-top:2px">{{ t('dashboard.lessons_done', courseProgress(inProgress).done, courseProgress(inProgress).total) }}</div>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div :style="{ fontSize: '1.4rem', fontWeight: 700, color: `rgb(${inProgress.colorRgb})` }">{{ courseProgress(inProgress).pct }}%</div>
              <div style="width:80px;height:4px;border-radius:99px;background:rgba(255,255,255,0.08);overflow:hidden;margin-top:4px">
                <div :style="{ height: '100%', width: courseProgress(inProgress).pct + '%', background: `rgb(${inProgress.colorRgb})`, borderRadius: '99px' }" />
              </div>
            </div>
          </div>

          <!-- Daily Challenge -->
          <div style="margin-bottom:28px;padding:16px 20px;border-radius:16px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:16px">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">⚡</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:0.7rem;font-weight:700;color:rgba(168,85,247,0.9);letter-spacing:0.06em;margin-bottom:3px">{{ t('dashboard.daily') }}</div>
              <div style="font-size:0.875rem;color:#e4e6f4;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ daily.question.text }}</div>
              <div style="font-size:0.72rem;color:rgba(228,230,244,0.38);margin-top:2px">{{ daily.course.name }} · +{{ daily.xp }} {{ t('dashboard.xp_bonus') }}</div>
            </div>
            <button @click="$router.push({ name: 'quiz', params: { id: daily.quizId }, query: { courseId: daily.courseId } })"
              style="flex-shrink:0;padding:8px 16px;border-radius:10px;border:1px solid rgba(168,85,247,0.3);background:rgba(168,85,247,0.1);color:#c084fc;font-size:0.8rem;font-weight:600;cursor:pointer;transition:background 0.2s"
              @mouseover="e => e.currentTarget.style.background='rgba(168,85,247,0.2)'"
              @mouseout="e => e.currentTarget.style.background='rgba(168,85,247,0.1)'">
              {{ t('dashboard.start') }}
            </button>
          </div>

          <!-- Courses grid (top 4, priority to in-progress) -->
          <div style="margin-bottom:28px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.78rem;font-weight:600;color:rgba(228,230,244,0.38);letter-spacing:0.08em">{{ t('dashboard.your_courses') }}</h2>
              <button @click="$router.push({ name: 'courses' })"
                style="padding:5px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(228,230,244,0.45);font-size:0.75rem;cursor:pointer;transition:all 0.2s"
                @mouseover="e => { e.currentTarget.style.color='#e4e6f4'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }"
                @mouseout="e => { e.currentTarget.style.color='rgba(228,230,244,0.45)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }">
                {{ t('dashboard.see_all') }}
              </button>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px">
              <div v-for="course in visibleCourses" :key="course.id"
                @click="$router.push({ name: 'course', params: { id: course.id } })"
                style="border-radius:16px;border:1px solid rgba(255,255,255,0.07);background:rgba(12,12,28,0.7);cursor:pointer;transition:transform 0.2s,border-color 0.2s,box-shadow 0.2s;overflow:hidden"
                @mouseover="e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.45)`; e.currentTarget.style.boxShadow=`0 16px 40px rgba(${course.colorRgb},0.12)` }"
                @mouseout="e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow='none' }">
                <div :style="{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, rgba(${course.colorRgb},0.18), rgba(${course.colorRgb},0.06))`, position: 'relative' }">
                  <CourseIcon :course-id="course.id" />
                  <div v-if="courseProgress(course).pct === 100" style="position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:#4ade80">✓</div>
                </div>
                <div style="padding:12px 14px 14px">
                  <div style="font-size:0.88rem;font-weight:600;color:#e4e6f4;margin-bottom:2px">{{ course.name }}</div>
                  <div style="font-size:0.72rem;color:rgba(228,230,244,0.38);margin-bottom:8px">{{ course.tagline }}</div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:0.68rem;color:rgba(228,230,244,0.35)">{{ courseProgress(course).done }}/{{ courseProgress(course).total }}</span>
                    <span :style="{ fontSize: '0.68rem', fontWeight: 600, color: `rgb(${course.colorRgb})` }">{{ courseProgress(course).pct }}%</span>
                  </div>
                  <div style="height:3px;border-radius:99px;background:rgba(255,255,255,0.07);overflow:hidden">
                    <div :style="{ height: '100%', width: courseProgress(course).pct + '%', background: `rgb(${course.colorRgb})`, borderRadius: '99px' }" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div style="margin-bottom:28px;padding:20px 24px;border-radius:16px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.07)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.78rem;font-weight:600;color:rgba(228,230,244,0.38);letter-spacing:0.08em">{{ t('dashboard.certifications') }}</h2>
              <div style="font-size:0.68rem;padding:3px 9px;border-radius:99px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.18);color:rgba(129,140,248,0.6)">{{ t('dashboard.coming_soon') }}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px">
              <div v-for="cert in certifications" :key="cert.id"
                style="padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);opacity:0.55;position:relative;overflow:hidden">
                <div :style="{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, rgba(${cert.colorRgb},0.6), rgba(${cert.colorRgb},0.1))` }" />
                <div style="font-size:1.4rem;margin-bottom:8px">{{ cert.icon }}</div>
                <div style="font-size:0.82rem;font-weight:600;color:rgba(228,230,244,0.5);margin-bottom:3px">{{ cert.name }}</div>
                <div style="font-size:0.7rem;color:rgba(228,230,244,0.28)">{{ cert.desc }}</div>
                <div style="margin-top:8px;height:3px;border-radius:99px;background:rgba(255,255,255,0.05)">
                  <div :style="{ height:'100%', width: cert.pct + '%', background:`rgba(${cert.colorRgb},0.4)`, borderRadius:'99px' }" />
                </div>
                <div style="font-size:0.65rem;color:rgba(228,230,244,0.25);margin-top:4px">{{ cert.pct }}% completato</div>
              </div>
            </div>
          </div>

          <!-- Leaderboard preview -->
          <div style="padding:20px 24px;border-radius:16px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.07)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.78rem;font-weight:600;color:rgba(228,230,244,0.38);letter-spacing:0.08em">{{ t('dashboard.leaderboard_week') }}</h2>
              <button @click="$router.push({ name: 'leaderboard' })"
                style="padding:5px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(228,230,244,0.45);font-size:0.75rem;cursor:pointer;transition:all 0.2s"
                @mouseover="e => { e.currentTarget.style.color='#e4e6f4'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }"
                @mouseout="e => { e.currentTarget.style.color='rgba(228,230,244,0.45)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }">
                {{ t('dashboard.see_all') }}
              </button>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px">
              <div v-for="(entry, i) in leaderboard" :key="i"
                :style="{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
                  borderRadius: '10px',
                  background: entry.isMe ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${entry.isMe ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.05)'}`,
                }">
                <!-- Rank -->
                <div :style="{
                  width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i === 0 ? 'rgba(251,191,36,0.15)' : i === 1 ? 'rgba(148,163,184,0.12)' : i === 2 ? 'rgba(180,120,80,0.12)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${i === 0 ? 'rgba(251,191,36,0.4)' : i === 1 ? 'rgba(148,163,184,0.3)' : i === 2 ? 'rgba(180,120,80,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  fontSize: i < 3 ? '0.8rem' : '0.65rem', fontWeight: 700,
                  color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#b47850' : 'rgba(228,230,244,0.35)',
                }">{{ i < 3 ? ['🥇','🥈','🥉'][i] : i + 1 }}</div>
                <!-- Avatar -->
                <div :style="{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: entry.isMe ? '#6366f1' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                }">{{ entry.initials }}</div>
                <!-- Name -->
                <div style="flex:1;min-width:0">
                  <div :style="{ fontSize: '0.83rem', fontWeight: entry.isMe ? 600 : 400, color: entry.isMe ? '#e4e6f4' : 'rgba(228,230,244,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">
                    {{ entry.name }}{{ entry.isMe ? ' ' + t('dashboard.you') : '' }}
                  </div>
                </div>
                <!-- XP -->
                <div style="text-align:right;flex-shrink:0">
                  <div style="font-size:0.82rem;font-weight:700;color:#818cf8">{{ entry.xp.toLocaleString() }}</div>
                  <div style="font-size:0.65rem;color:rgba(228,230,244,0.3)">XP</div>
                </div>
              </div>
            </div>
            <div style="margin-top:12px;padding:10px;border-radius:8px;background:rgba(99,102,241,0.04);border:1px dashed rgba(99,102,241,0.15);text-align:center">
              <span style="font-size:0.75rem;color:rgba(228,230,244,0.3)">{{ t('dashboard.leaderboard_note') }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppSidebar  from '@/components/AppSidebar.vue'
import AppHeader   from '@/components/AppHeader.vue'
import XPBar       from '@/components/XPBar.vue'
import StreakFlame from '@/components/StreakFlame.vue'
import LevelBadge  from '@/components/LevelBadge.vue'
import CourseIcon  from '@/components/CourseIcon.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { useLocale }     from '@/composables/useLocale'
import { courses, getDailyChallenge } from '@/data/learn'

const auth       = useAuthStore()
const learn      = useLearnStore()
const { t }      = useLocale()

const stats     = computed(() => auth.stats)
const user      = computed(() => auth.user)
const firstName = computed(() => (user.value?.name || '').split(' ')[0] || 'Ciao')

const hour     = new Date().getHours()
const greeting = computed(() =>
  hour < 12 ? t('greeting.morning') : hour < 18 ? t('greeting.afternoon') : t('greeting.evening')
)
const daily    = getDailyChallenge()

const totalLessons   = courses.reduce((s, c) => s + c.levels.reduce((ls, l) => ls + l.items.length, 0), 0)
const completedCount = computed(() => learn.completed.length)
const pctTotal       = computed(() => Math.round((completedCount.value / totalLessons) * 100))

function courseProgress(course) {
  const items = course.levels.flatMap(l => l.items.map(i => i.id))
  const done  = items.filter(id => learn.isCompleted(id)).length
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
}

const inProgress = computed(() =>
  courses.find(c => { const p = courseProgress(c); return p.done > 0 && p.done < p.total })
)

// Top 4 courses: in-progress first, then not-started, then completed
const visibleCourses = computed(() => {
  const sorted = [...courses].sort((a, b) => {
    const pa = courseProgress(a), pb = courseProgress(b)
    const tierA = pa.done > 0 && pa.pct < 100 ? 0 : pa.pct === 0 ? 1 : 2
    const tierB = pb.done > 0 && pb.pct < 100 ? 0 : pb.pct === 0 ? 1 : 2
    return tierA - tierB
  })
  return sorted.slice(0, 4)
})

// Certifications (placeholder — driven by course completion)
const certifications = computed(() => [
  { id: 'nodejs-cert',  name: 'Node.js Developer',   desc: 'Tutti i livelli Node.js',   icon: '⬡',  colorRgb: '34,197,94',  pct: Math.min(100, Math.round((courseProgress(courses.find(c=>c.id==='nodejs')||courses[0]).pct))) },
  { id: 'express-cert', name: 'Express Engineer',    desc: 'Tutti i livelli Express',   icon: '⚡', colorRgb: '245,158,11', pct: Math.min(100, Math.round((courseProgress(courses.find(c=>c.id==='express')||courses[0]).pct))) },
  { id: 'vue-cert',     name: 'Vue.js & Nuxt Dev',   desc: 'Vue + Nuxt completati',     icon: '◈',  colorRgb: '6,182,212',  pct: Math.min(100, Math.round((courseProgress(courses.find(c=>c.id==='vue-nuxt')||courses[0]).pct))) },
  { id: 'ts-cert',      name: 'TypeScript Pro',      desc: 'Tutti i livelli TypeScript',icon: '▲',  colorRgb: '59,130,246', pct: Math.min(100, Math.round((courseProgress(courses.find(c=>c.id==='typescript')||courses[0]).pct))) },
])

// Leaderboard preview (mock until backend is live)
const meInitials = computed(() =>
  (user.value?.name || 'IO').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
)
const leaderboard = computed(() => [
  { name: 'Marco B.',     initials: 'MB', xp: 1840, isMe: false },
  { name: 'Sara L.',      initials: 'SL', xp: 1520, isMe: false },
  { name: 'Luca T.',      initials: 'LT', xp: 1310, isMe: false },
  { name: user.value?.name || 'Tu', initials: meInitials.value, xp: stats.value.xp, isMe: true },
  { name: 'Anna R.',      initials: 'AR', xp: Math.max(0, stats.value.xp - 40), isMe: false },
].sort((a, b) => b.xp - a.xp).slice(0, 5))
</script>
