<template>
  <div style="display:flex;height:100vh;background:#05050f;overflow:hidden">
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

          <!-- Per corso -->
          <h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">CORSI ATTIVI</h2>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div v-for="course in activeCourseStats" :key="course.id"
              style="padding:16px 20px;border-radius:14px;background:rgba(12,12,28,0.6);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:16px">
              <CourseIcon :course-id="course.id" />
              <div style="flex:1;min-width:0">
                <div style="font-size:0.88rem;font-weight:600;color:#e4e6f4;margin-bottom:6px">{{ course.name }}</div>
                <div style="height:5px;border-radius:99px;background:rgba(255,255,255,0.07);overflow:hidden">
                  <div :style="{ height:'100%', width:course.pct+'%', background:`rgb(${course.colorRgb})`, borderRadius:'99px', transition:'width 0.5s' }" />
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div :style="{ fontSize:'1rem', fontWeight:700, color:`rgb(${course.colorRgb})` }">{{ course.pct }}%</div>
                <div style="font-size:0.68rem;color:rgba(228,230,244,0.3)">{{ course.done }}/{{ course.total }}</div>
              </div>
            </div>

            <div v-if="!activeCourseStats.length" style="text-align:center;padding:48px;color:rgba(228,230,244,0.25);font-size:0.875rem">
              Inizia un corso per vedere la tua progressione
            </div>
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
import CourseIcon from '@/components/CourseIcon.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { courses } from '@/data/learn'

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
    .map(c => ({ ...c, ...courseProgress(c) }))
    .filter(c => c.done > 0)
    .sort((a, b) => b.pct - a.pct)
)
</script>
