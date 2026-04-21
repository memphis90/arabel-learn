<template>
  <div style="display:flex;height:100vh;background:#05050f;position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[
        { label: 'Corsi', onClick: () => $router.push({ name: 'home' }) },
        { label: course?.name || '' },
      ]" />
      <div v-if="course" style="flex:1;overflow-y:auto;padding:24px 32px">
        <div style="max-width:680px;margin:0 auto">

          <!-- Course header -->
          <div :style="{ marginBottom: '28px', padding: '20px 22px', borderRadius: '16px', background: `linear-gradient(135deg, rgba(${course.colorRgb},0.14), rgba(${course.colorRgb},0.04))`, border: `1px solid rgba(${course.colorRgb},0.2)` }">
            <div style="display:flex;align-items:center;gap:16px">
              <CourseIcon :course-id="course.id" size="52" />
              <div style="flex:1">
                <h2 style="margin:0 0 3px;font-size:1.2rem;font-weight:700;color:#e4e6f4;letter-spacing:-0.01em">{{ course.name }}</h2>
                <p style="margin:0;font-size:0.8rem;color:rgba(228,230,244,0.45)">{{ course.tagline }}</p>
                <div style="margin-top:10px">
                  <XPBar :current="progress.done" :total="progress.total" :color="`rgb(${course.colorRgb})`" :show-label="false" />
                  <div :style="{ fontSize: '0.7rem', color: `rgba(${course.colorRgb},0.8)`, marginTop: '4px' }">{{ progress.done }} / {{ progress.total }} completate</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Levels & items -->
          <div v-for="(level, li) in course.levels" :key="li" style="margin-bottom:24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div :style="{
                width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700,
                background: levelDone(level) ? `rgba(${course.colorRgb},0.2)` : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${levelDone(level) ? `rgba(${course.colorRgb},0.6)` : 'rgba(255,255,255,0.12)'}`,
                color: levelDone(level) ? `rgb(${course.colorRgb})` : 'rgba(228,230,244,0.4)',
              }">{{ levelDone(level) ? '✓' : li + 1 }}</div>
              <span :style="{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', color: levelDone(level) ? `rgb(${course.colorRgb})` : 'rgba(228,230,244,0.5)' }">{{ level.name.toUpperCase() }}</span>
              <span v-if="level.tier" :style="{ fontSize: '0.6rem', padding: '2px 7px', borderRadius: '99px', background: tierStyle(level.tier).bg, border: `1px solid ${tierStyle(level.tier).border}`, color: tierStyle(level.tier).color, fontWeight: 600 }">{{ tierLabel(level.tier) }}</span>
              <span v-if="levelDone(level)" :style="{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '99px', background: `rgba(${course.colorRgb},0.1)`, border: `1px solid rgba(${course.colorRgb},0.25)`, color: `rgb(${course.colorRgb})` }">Completato</span>
            </div>

            <div style="position:relative;padding-left:24px">
              <div style="position:absolute;left:10px;top:16px;bottom:16px;width:1.5px;background:rgba(255,255,255,0.06);border-radius:99px" />

              <div v-for="(item, ii) in level.items" :key="item.id"
                @click="navigate(item)"
                :style="{
                  position: 'relative', marginBottom: ii < level.items.length - 1 ? '8px' : 0,
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 14px 11px 0',
                  cursor: itemStatus(item.id) === 'locked' ? 'default' : 'pointer',
                  opacity: itemStatus(item.id) === 'locked' ? 0.45 : 1,
                }">
                <!-- Node -->
                <div :style="{
                  width: '20px', height: '20px', borderRadius: item.type === 'quiz' ? '5px' : '50%', flexShrink: 0,
                  background: itemStatus(item.id) === 'done' ? `rgb(${course.colorRgb})` : itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.2)` : 'rgba(255,255,255,0.06)',
                  border: itemStatus(item.id) === 'done' ? 'none' : `2px solid ${itemStatus(item.id) === 'current' ? `rgb(${course.colorRgb})` : 'rgba(255,255,255,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem',
                  boxShadow: itemStatus(item.id) === 'current' ? `0 0 12px rgba(${course.colorRgb},0.5)` : 'none',
                  color: itemStatus(item.id) === 'done' ? '#fff' : itemStatus(item.id) === 'current' ? `rgb(${course.colorRgb})` : 'rgba(228,230,244,0.3)',
                }">{{ itemStatus(item.id) === 'done' ? '✓' : item.type === 'quiz' ? '?' : '' }}</div>

                <!-- Content -->
                <div :style="{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: '12px',
                  background: itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.07)` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.25)` : 'rgba(255,255,255,0.05)'}`,
                  transition: 'background 0.2s, border-color 0.2s',
                }"
                @mouseover="e => { if(itemStatus(item.id) !== 'locked') { e.currentTarget.style.background=`rgba(${course.colorRgb},0.1)`; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.3)` }}"
                @mouseout="e => { e.currentTarget.style.background = itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.07)` : 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.25)` : 'rgba(255,255,255,0.05)' }">
                  <div style="display:flex;align-items:center;gap:10px">
                    <span :style="{ fontSize: '0.82rem', fontWeight: itemStatus(item.id) === 'current' ? 600 : 400, color: itemStatus(item.id) === 'locked' ? 'rgba(228,230,244,0.3)' : '#e4e6f4' }">{{ item.title }}</span>
                    <span v-if="itemStatus(item.id) === 'current'" :style="{ fontSize: '0.62rem', padding: '2px 7px', borderRadius: '99px', background: `rgba(${course.colorRgb},0.15)`, border: `1px solid rgba(${course.colorRgb},0.3)`, color: `rgb(${course.colorRgb})`, fontWeight: 600 }">PROSSIMO</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <span v-if="item.type === 'quiz'" style="font-size:0.65rem;padding:2px 7px;border-radius:4px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);color:#c084fc">QUIZ</span>
                    <span style="font-size:0.72rem;color:rgba(228,230,244,0.3);white-space:nowrap">+{{ item.xp }} XP</span>
                    <span v-if="itemStatus(item.id) !== 'locked' && itemStatus(item.id) !== 'done'" style="font-size:0.75rem;color:rgba(228,230,244,0.25)">›</span>
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'
import XPBar          from '@/components/XPBar.vue'
import CourseIcon     from '@/components/CourseIcon.vue'
import { useLearnStore } from '@/stores/learn'
import { courses } from '@/data/learn'

const route  = useRoute()
const router = useRouter()
const learn  = useLearnStore()

const course  = computed(() => courses.find(c => c.id === route.params.id))
const allItems = computed(() => course.value?.levels.flatMap(l => l.items.map(i => i.id)) || [])

const progress = computed(() => {
  const done = allItems.value.filter(id => learn.isCompleted(id)).length
  return { done, total: allItems.value.length, pct: Math.round((done / (allItems.value.length || 1)) * 100) }
})

const nextItem = computed(() => allItems.value.find(id => !learn.isCompleted(id)))

function itemStatus(id) {
  if (learn.isCompleted(id)) return 'done'
  if (id === nextItem.value) return 'current'
  const idx = allItems.value.indexOf(id)
  const prev = allItems.value[idx - 1]
  if (!prev || learn.isCompleted(prev)) return 'current'
  return 'locked'
}

const tierMap = {
  beginner:     { label: 'Principiante', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   color: '#4ade80' },
  intermediate: { label: 'Intermedio',   bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  color: '#fbbf24' },
  advanced:     { label: 'Avanzato',     bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   color: '#f87171' },
}
function tierStyle(tier) { return tierMap[tier] || { bg: 'transparent', border: 'transparent', color: 'transparent' } }
function tierLabel(tier) { return tierMap[tier]?.label || '' }

function levelDone(level) {
  return level.items.every(i => learn.isCompleted(i.id))
}

function navigate(item) {
  if (itemStatus(item.id) === 'locked') return
  if (item.type === 'quiz') {
    router.push({ name: 'quiz', params: { id: item.id }, query: { courseId: course.value.id } })
  } else {
    router.push({ name: 'lesson', params: { id: item.id }, query: { courseId: course.value.id } })
  }
}
</script>
