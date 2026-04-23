<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Progressione' }]" />
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:860px;margin:0 auto">

          <!-- Stats globali -->
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:40px">
            <div v-for="stat in globalStats" :key="stat.label"
              style="padding:18px 20px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06)">
              <div style="font-size:1.8rem;font-weight:800;color:#e4e6f4;margin-bottom:4px">{{ stat.value }}</div>
              <div style="font-size:0.75rem;color:rgba(228,230,244,0.35);font-weight:500">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Progressione Corsi -->
          <h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">PROGRESSIONE CORSI</h2>

          <div v-if="activeCourseStats.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-bottom:40px">
            <div v-for="course in activeCourseStats" :key="course.id"
              style="padding:20px 16px 16px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;align-items:center;gap:8px">
              <VueApexCharts
                type="radialBar"
                height="140"
                :options="course.chartOptions"
                :series="[course.pct]"
              />
              <div style="font-size:0.82rem;font-weight:600;color:#e4e6f4;text-align:center;line-height:1.3">{{ course.name }}</div>
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.35)">{{ course.done }}/{{ course.total }} lezioni</div>
            </div>
          </div>

          <div v-else style="text-align:center;padding:48px;color:rgba(228,230,244,0.25);font-size:0.875rem;margin-bottom:40px;border-radius:14px;background:rgba(12,12,28,0.4);border:1px solid rgba(255,255,255,0.04)">
            Inizia un corso per vedere la tua progressione
          </div>

          <!-- Carriere -->
          <h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">PERCORSI DI CARRIERA</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:10px;margin-bottom:40px">
            <div v-for="career in careerStats" :key="career.id"
              style="padding:16px 20px;border-radius:14px;background:rgba(12,12,28,0.6);border:1px solid rgba(255,255,255,0.06)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:1.3rem">{{ career.emoji }}</span>
                  <span style="font-size:0.88rem;font-weight:600;color:#e4e6f4">{{ career.name }}</span>
                </div>
                <div v-if="career.unlocked"
                  style="font-size:0.68rem;font-weight:700;color:#86efac;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:3px 8px;border-radius:99px">
                  ✓ Sbloccato
                </div>
                <div v-else :style="{ fontSize:'0.75rem', fontWeight:700, color: career.pct > 0 ? '#a5b4fc' : 'rgba(228,230,244,0.3)' }">
                  {{ career.pct }}%
                </div>
              </div>
              <div style="height:5px;border-radius:99px;background:rgba(255,255,255,0.06);overflow:hidden;margin-bottom:6px">
                <div :style="{
                  height: '100%',
                  width: career.pct + '%',
                  background: career.unlocked ? '#22c55e' : '#6366f1',
                  borderRadius: '99px',
                  transition: 'width 0.6s ease',
                }" />
              </div>
              <div style="font-size:0.68rem;color:rgba(228,230,244,0.3)">{{ career.done }}/{{ career.total }} item completati</div>
            </div>
          </div>

          <!-- Badge -->
          <h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">BADGE</h2>

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:40px">
            <div v-for="badge in earnedBadges" :key="badge.id"
              :style="{
                padding: '18px 14px',
                borderRadius: '14px',
                background: 'rgba(12,12,28,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                textAlign: 'center',
                position: 'relative',
              }">
              <img v-if="badge.icon" :src="badge.icon" width="36" height="36"
                :style="{ filter: badge.earned ? 'none' : 'grayscale(1) brightness(0.4)', transition: 'filter 0.3s' }" />
              <span v-else :style="{ fontSize: '1.8rem', lineHeight: 1, opacity: badge.earned ? 1 : 0.25 }">{{ badge.emoji }}</span>
              <div :style="{ fontSize: '0.75rem', fontWeight: 600, color: badge.earned ? '#e4e6f4' : 'rgba(228,230,244,0.3)', lineHeight: 1.3 }">{{ badge.name }}</div>
              <div style="font-size:0.65rem;color:rgba(228,230,244,0.25);line-height:1.4">{{ badge.description }}</div>
              <div v-if="badge.earned"
                style="position:absolute;top:8px;right:10px;font-size:0.6rem;font-weight:700;color:#86efac">✓</div>
            </div>
          </div>

          <!-- Tempo di Studio -->
          <h2 style="margin:0 0 4px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">TEMPO DI STUDIO</h2>
          <div style="font-size:0.72rem;color:rgba(228,230,244,0.25);margin-bottom:16px">Ultimi 7 giorni · minuti</div>

          <div style="padding:20px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);margin-bottom:16px">
            <VueApexCharts
              type="bar"
              height="200"
              :options="studyChartOptions"
              :series="[{ name: 'Minuti', data: studyTimeMockup }]"
            />
          </div>

          <!-- Banner mockup -->
          <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);margin-bottom:40px">
            <span style="font-size:0.9rem">⚠️</span>
            <span style="font-size:0.78rem;color:rgba(251,191,36,0.7)">Dato simulato — il tracking reale del tempo di studio arriverà prossimamente</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader  from '@/components/AppHeader.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { courses } from '@/data/learn'
import VueApexCharts from 'vue3-apexcharts'

const CAREER_PATHS = [
  {
    id: 'junior_frontend',
    name: 'Frontend Junior',
    emoji: '🎨',
    items: ['vue-1-1','vue-1-2','vue-1-3','vue-1-4','vue-1-q','ts-1-1','ts-1-2','ts-1-3','ts-1-q'],
  },
  {
    id: 'mid_frontend',
    name: 'Frontend Mid',
    emoji: '🖥️',
    items: ['vue-1-1','vue-1-2','vue-1-3','vue-1-4','vue-1-q','vue-2-1','vue-2-2','vue-2-3','vue-2-4','vue-2-q','nuxt-3-1','nuxt-3-2','nuxt-3-3','nuxt-3-4','nuxt-3-q','ts-1-1','ts-1-2','ts-1-3','ts-1-q','ts-2-1','ts-2-2','ts-2-3','ts-2-q'],
  },
  {
    id: 'junior_backend',
    name: 'Backend JS Junior',
    emoji: '⚙️',
    items: ['nodejs-1-1','nodejs-1-2','nodejs-1-3','nodejs-1-q','express-1-1','express-1-2','express-1-3','express-1-q','sql-1-1','sql-1-2','sql-1-3','sql-1-q'],
  },
  {
    id: 'mid_backend_js',
    name: 'Backend JS Mid',
    emoji: '🔧',
    items: ['nodejs-1-1','nodejs-1-2','nodejs-1-3','nodejs-1-q','nodejs-2-1','nodejs-2-2','nodejs-2-3','nodejs-2-4','nodejs-2-q','nodejs-3-1','nodejs-3-2','nodejs-3-3','nodejs-3-4','nodejs-3-5','nodejs-3-q','express-1-1','express-1-2','express-1-3','express-1-q','express-2-1','express-2-2','express-2-3','express-2-q'],
  },
  {
    id: 'junior_php',
    name: 'PHP Junior',
    emoji: '🐘',
    items: ['php-1-1','php-1-2','php-1-3','php-1-q'],
  },
  {
    id: 'mid_php',
    name: 'PHP Mid',
    emoji: '🐘',
    items: ['php-1-1','php-1-2','php-1-3','php-1-q','php-2-1','php-2-2','php-2-3','php-2-q','sql-2-1','sql-2-2','sql-2-3','sql-2-q'],
  },
  {
    id: 'devops_starter',
    name: 'DevOps Starter',
    emoji: '🚀',
    items: ['git-1-1','git-1-2','git-1-3','git-1-q','linux-1-1','linux-1-2','linux-1-3','linux-1-q'],
  },
  {
    id: 'devops_engineer',
    name: 'DevOps Engineer',
    emoji: '🛠️',
    items: ['git-1-1','git-1-2','git-1-3','git-1-q','git-2-1','git-2-2','git-2-3','git-2-q','git-3-1','git-3-2','git-3-3','git-3-q','linux-1-1','linux-1-2','linux-1-3','linux-1-q','linux-2-1','linux-2-2','linux-2-3','linux-2-q','linux-3-1','linux-3-2','linux-3-3','linux-3-q','cicd-1-1','cicd-1-2','cicd-1-3','cicd-1-q','cicd-2-1','cicd-2-2','cicd-2-3','cicd-2-q','cicd-3-1','cicd-3-2','cicd-3-3','cicd-3-q'],
  },
  {
    id: 'full_stack_js',
    name: 'Full Stack JS',
    emoji: '🌐',
    items: ['vue-1-1','vue-1-2','vue-1-3','vue-1-4','vue-1-q','vue-2-1','vue-2-2','vue-2-3','vue-2-4','vue-2-q','nuxt-3-1','nuxt-3-2','nuxt-3-3','nuxt-3-4','nuxt-3-q','nodejs-1-1','nodejs-1-2','nodejs-1-3','nodejs-1-q','nodejs-2-1','nodejs-2-2','nodejs-2-3','nodejs-2-4','nodejs-2-q','express-1-1','express-1-2','express-1-3','express-1-q','express-2-1','express-2-2','express-2-3','express-2-q'],
  },
  {
    id: 'sql_master',
    name: 'SQL Master',
    emoji: '🗄️',
    items: ['sql-1-1','sql-1-2','sql-1-3','sql-1-q','sql-2-1','sql-2-2','sql-2-3','sql-2-q','sql-3-1','sql-3-2','sql-3-3','sql-3-q'],
  },
  {
    id: 'data_engineer',
    name: 'Data Engineer',
    emoji: '📊',
    items: ['sql-1-1','sql-1-2','sql-1-3','sql-1-q','sql-2-1','sql-2-2','sql-2-3','sql-2-q','sql-3-1','sql-3-2','sql-3-3','sql-3-q','redis-1-1','redis-1-2','redis-1-3','redis-1-q','redis-2-1','redis-2-2','redis-2-3','redis-2-q'],
  },
]

const _di = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`
const ALL_BADGES = [
  { id: 'first_lesson',    emoji: '🌱', icon: null,                    name: 'Prima Lezione',     description: 'Completa la tua prima lezione' },
  { id: 'streak_3',        emoji: '🔥', icon: null,                    name: 'Streak 3 giorni',   description: '3 giorni consecutivi di studio' },
  { id: 'streak_7',        emoji: '⚡', icon: null,                    name: 'Streak 7 giorni',   description: '7 giorni consecutivi di studio' },
  { id: 'node_beginner',   emoji: null, icon: _di('nodejs'),           name: 'Node Beginner',     description: 'Completa 5 lezioni Node.js' },
  { id: 'quiz_ace',        emoji: '🏅', icon: null,                    name: 'Quiz Ace',          description: 'Tutte le risposte corrette in un quiz' },
  { id: 'junior_frontend', emoji: null, icon: _di('vuejs'),            name: 'Frontend Junior',   description: 'Completa il percorso Frontend Junior' },
  { id: 'mid_frontend',    emoji: null, icon: _di('vuejs'),            name: 'Frontend Mid',      description: 'Completa il percorso Frontend Mid' },
  { id: 'junior_backend',  emoji: null, icon: _di('nodejs'),           name: 'Backend JS Junior', description: 'Completa il percorso Backend JS Junior' },
  { id: 'mid_backend_js',  emoji: null, icon: _di('nodejs'),           name: 'Backend JS Mid',    description: 'Completa il percorso Backend JS Mid' },
  { id: 'junior_php',      emoji: null, icon: _di('php'),              name: 'PHP Junior',        description: 'Completa il percorso PHP Junior' },
  { id: 'mid_php',         emoji: null, icon: _di('php'),              name: 'PHP Mid',           description: 'Completa il percorso PHP Mid' },
  { id: 'devops_starter',  emoji: null, icon: _di('git'),              name: 'DevOps Starter',    description: 'Completa il percorso DevOps Starter' },
  { id: 'devops_engineer', emoji: null, icon: _di('git'),              name: 'DevOps Engineer',   description: 'Completa il percorso DevOps Engineer' },
  { id: 'full_stack_js',   emoji: null, icon: _di('javascript'),       name: 'Full Stack JS',     description: 'Completa il percorso Full Stack JS' },
  { id: 'sql_master',      emoji: null, icon: _di('mysql'),            name: 'SQL Master',        description: 'Completa tutti i livelli SQL' },
  { id: 'data_engineer',   emoji: null, icon: _di('redis'),            name: 'Data Engineer',     description: 'Completa il percorso Data Engineer' },
]

const auth  = useAuthStore()
const learn = useLearnStore()
const stats = computed(() => auth.stats)

function courseProgress(course) {
  const items = course.levels.flatMap(l => l.items.map(i => i.id))
  if (!items.length) return { done: 0, total: 0, pct: 0 }
  const done = items.filter(id => learn.isCompleted(id)).length
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
}

const activeCourses = computed(() => courses.filter(c => !c.comingSoon && c.levels.length))

const globalStats = computed(() => [
  { label: 'XP totali',           value: stats.value.xp },
  { label: 'Streak giorni',        value: stats.value.streak },
  { label: 'Lezioni completate',   value: learn.completed.length },
  { label: 'Corsi completati',     value: activeCourses.value.filter(c => courseProgress(c).pct === 100).length },
])

const activeCourseStats = computed(() =>
  activeCourses.value
    .map(c => ({ ...c, ...courseProgress(c), chartOptions: courseChartOptions(c.colorRgb) }))
    .filter(c => c.done > 0)
    .sort((a, b) => b.pct - a.pct)
)

function courseChartOptions(colorRgb) {
  return {
    chart: { type: 'radialBar', background: 'transparent', sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: '62%' },
        track: { background: 'rgba(255,255,255,0.05)', strokeWidth: '100%' },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '1.1rem', fontWeight: 700,
            color: '#e4e6f4', offsetY: 6,
            formatter: (v) => `${Math.round(v)}%`,
          },
        },
      },
    },
    fill: { colors: [`rgb(${colorRgb})`] },
    stroke: { lineCap: 'round' },
    theme: { mode: 'dark' },
  }
}

const careerStats = computed(() =>
  CAREER_PATHS.map(career => {
    const done = career.items.filter(id => learn.isCompleted(id)).length
    const total = career.items.length
    const pct = Math.round((done / total) * 100)
    const unlocked = pct === 100
    return { ...career, done, total, pct, unlocked }
  })
)

const earnedBadges = computed(() => {
  const earned = new Set(auth.stats.badges || [])
  return ALL_BADGES.map(b => ({ ...b, earned: earned.has(b.id) }))
})

// TODO: real data needs session tracking (login/logout timestamps) from backend
const _studyWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
const _studySeed = (n) => ((_studyWeek * 31 + n * 17) % 91) + 10
const studyTimeMockup = [0, 1, 2, 3, 4, 5, 6].map(_studySeed)

const studyChartOptions = {
  chart: {
    type: 'bar',
    background: 'transparent',
    toolbar: { show: false },
    fontFamily: 'inherit',
  },
  plotOptions: {
    bar: { borderRadius: 6, columnWidth: '52%' },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    labels: { style: { colors: 'rgba(228,230,244,0.35)', fontSize: '0.75rem' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: 'rgba(228,230,244,0.35)', fontSize: '0.75rem' },
      formatter: (v) => `${v}m`,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark', type: 'vertical',
      gradientToColors: ['#818cf8'], stops: [0, 100],
    },
  },
  colors: ['#6366f1'],
  theme: { mode: 'dark' },
  grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
  tooltip: {
    theme: 'dark',
    y: { formatter: (v) => `${v} min` },
  },
}
</script>
