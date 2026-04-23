<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[
        { label: 'Corsi', onClick: () => $router.push({ name: 'courses' }) },
        { label: course?.name || '' },
      ]" />

      <div v-if="course" style="flex:1;overflow-y:auto;padding:24px 32px">
        <div style="max-width:680px;margin:0 auto">

          <!-- Course header -->
          <div :style="{
            marginBottom:'28px', padding:'20px 22px', borderRadius:'16px',
            background:`linear-gradient(135deg,rgba(${course.colorRgb},0.14),rgba(${course.colorRgb},0.04))`,
            border:`1px solid rgba(${course.colorRgb},0.2)`,
          }">
            <div style="display:flex;align-items:center;gap:16px">
              <CourseIcon :course-id="course.id" />
              <div style="flex:1">
                <h2 style="margin:0 0 3px;font-size:1.2rem;font-weight:700;color:var(--text-1);letter-spacing:-0.01em">{{ course.name }}</h2>
                <p style="margin:0 0 10px;font-size:0.8rem;color:rgba(var(--rgb-text),0.45)">{{ course.tagline }}</p>
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="flex:1;height:5px;border-radius:99px;background:rgba(var(--rgb-border),0.07);overflow:hidden">
                    <div :style="{ height:'100%', width:progress.pct+'%', background:`rgb(${course.colorRgb})`, borderRadius:'99px', transition:'width 0.6s' }" />
                  </div>
                  <span :style="{ fontSize:'0.72rem', fontWeight:700, color:`rgb(${course.colorRgb})`, flexShrink:0 }">{{ progress.done }}/{{ progress.total }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Levels -->
          <div v-for="(level, li) in course.levels" :key="li" style="margin-bottom:28px">

            <!-- Level header -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
              <div :style="{
                width:'26px', height:'26px', borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.65rem', fontWeight:700,
                background: levelDone(level) ? `rgba(${course.colorRgb},0.2)` : 'rgba(var(--rgb-border),0.06)',
                border:`1.5px solid ${levelDone(level) ? `rgba(${course.colorRgb},0.6)` : 'rgba(var(--rgb-border),0.12)'}`,
                color: levelDone(level) ? `rgb(${course.colorRgb})` : 'rgba(var(--rgb-text),0.4)',
              }">{{ levelDone(level) ? '✓' : li + 1 }}</div>
              <span :style="{ fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.05em', color: levelDone(level) ? `rgb(${course.colorRgb})` : 'rgba(var(--rgb-text),0.5)' }">
                {{ level.name.toUpperCase() }}
              </span>
              <span v-if="level.tier" :style="{
                fontSize:'0.6rem', padding:'2px 7px', borderRadius:'99px', fontWeight:600,
                background: tierStyle(level.tier).bg, border:`1px solid ${tierStyle(level.tier).border}`, color: tierStyle(level.tier).color,
              }">{{ tierLabel(level.tier) }}</span>
              <span v-if="levelDone(level)" :style="{
                fontSize:'0.65rem', padding:'2px 8px', borderRadius:'99px',
                background:`rgba(${course.colorRgb},0.1)`, border:`1px solid rgba(${course.colorRgb},0.25)`, color:`rgb(${course.colorRgb})`,
              }">Completato</span>
            </div>

            <!-- Items -->
            <div style="position:relative;padding-left:28px">
              <!-- Vertical track -->
              <div style="position:absolute;left:12px;top:18px;bottom:18px;width:2px;border-radius:99px;overflow:hidden;background:rgba(var(--rgb-border),0.06)">
                <div :style="{
                  height: levelProgress(level) + '%',
                  background:`linear-gradient(to bottom, rgba(${course.colorRgb},0.8), rgba(${course.colorRgb},0.3))`,
                  transition:'height 0.6s',
                }" />
              </div>

              <div v-for="(item, ii) in level.items" :key="item.id"
                @click="navigate(item)"
                :style="{
                  position:'relative', marginBottom: ii < level.items.length - 1 ? '10px' : 0,
                  display:'flex', alignItems:'center', gap:'16px',
                  cursor: itemStatus(item.id) === 'locked' ? 'default' : 'pointer',
                  opacity: itemStatus(item.id) === 'locked' ? 0.4 : 1,
                  transition:'opacity 0.2s',
                }">

                <!-- Node -->
                <div :class="{ 'node-pulse': itemStatus(item.id) === 'current' }"
                  :style="{
                    width: item.type === 'quiz' ? '28px' : '26px',
                    height: item.type === 'quiz' ? '28px' : '26px',
                    borderRadius: item.type === 'quiz' ? '7px' : '50%',
                    flexShrink:0, position:'relative', zIndex:1,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize: item.type === 'quiz' ? '0.75rem' : '0.6rem',
                    fontWeight:700, transition:'transform 0.2s, box-shadow 0.2s',
                    transform: itemStatus(item.id) === 'current' ? 'scale(1.1)' : 'scale(1)',
                    background:
                      itemStatus(item.id) === 'done'    ? `rgb(${course.colorRgb})` :
                      itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.18)` :
                      'rgba(var(--rgb-border),0.05)',
                    border:`2.5px solid ${
                      itemStatus(item.id) === 'done'    ? `rgba(${course.colorRgb},0.9)` :
                      itemStatus(item.id) === 'current' ? `rgb(${course.colorRgb})` :
                      'rgba(var(--rgb-border),0.12)'
                    }`,
                    boxShadow:
                      itemStatus(item.id) === 'done'    ? `0 2px 12px rgba(${course.colorRgb},0.4)` :
                      itemStatus(item.id) === 'current' ? `0 0 0 5px rgba(${course.colorRgb},0.12), 0 2px 16px rgba(${course.colorRgb},0.3)` :
                      'none',
                    color:
                      itemStatus(item.id) === 'done'    ? '#fff' :
                      itemStatus(item.id) === 'current' ? `rgb(${course.colorRgb})` :
                      'rgba(var(--rgb-text),0.25)',
                  }">
                  <svg v-if="itemStatus(item.id) === 'done'" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span v-else-if="item.type === 'quiz'">?</span>
                </div>

                <!-- Card -->
                <div :style="{
                  flex:1, display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'11px 15px', borderRadius:'12px',
                  background: itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.07)` : 'rgba(var(--rgb-border),0.02)',
                  border:`1px solid ${itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.25)` : 'rgba(var(--rgb-border),0.05)'}`,
                  transition:'background 0.2s, border-color 0.2s',
                }"
                @mouseover="e => { if(itemStatus(item.id) !== 'locked') { e.currentTarget.style.background=`rgba(${course.colorRgb},0.1)`; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.3)` }}"
                @mouseout="e => { e.currentTarget.style.background = itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.07)` : 'rgba(var(--rgb-border),0.02)'; e.currentTarget.style.borderColor = itemStatus(item.id) === 'current' ? `rgba(${course.colorRgb},0.25)` : 'rgba(var(--rgb-border),0.05)' }">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span :style="{ fontSize:'0.84rem', fontWeight: itemStatus(item.id) === 'current' ? 600 : 400, color:'var(--text-1)' }">{{ item.title }}</span>
                    <span v-if="itemStatus(item.id) === 'current'" :style="{ fontSize:'0.6rem', padding:'1px 6px', borderRadius:'4px', background:`rgba(${course.colorRgb},0.15)`, border:`1px solid rgba(${course.colorRgb},0.3)`, color:`rgb(${course.colorRgb})`, fontWeight:700, letterSpacing:'0.04em' }">NEXT</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <span v-if="item.type === 'quiz'" style="font-size:0.62rem;padding:2px 7px;border-radius:4px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);color:#c084fc;font-weight:600">QUIZ</span>
                    <span :style="{ fontSize:'0.72rem', color: itemStatus(item.id) === 'done' ? `rgba(${course.colorRgb},0.7)` : 'rgba(var(--rgb-text),0.28)' }">+{{ item.xp }} XP</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Completion trophy -->
          <div v-if="progress.pct === 100" style="margin-top:8px;text-align:center;padding:22px;border-radius:16px;background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.2)">
            <div style="font-size:2.2rem;margin-bottom:6px">🏆</div>
            <div style="font-size:0.95rem;font-weight:700;color:#fbbf24;margin-bottom:3px">Corso completato!</div>
            <div style="font-size:0.78rem;color:rgba(var(--rgb-text),0.38)">Hai completato tutte le lezioni di {{ course.name }}</div>
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
import CourseIcon     from '@/components/CourseIcon.vue'
import { useLearnStore } from '@/stores/learn'
import { courses } from '@/data/learn'

const route  = useRoute()
const router = useRouter()
const learn  = useLearnStore()

const course   = computed(() => courses.find(c => c.id === route.params.id))
const allItems = computed(() => course.value?.levels.flatMap(l => l.items.map(i => i.id)) || [])

const progress = computed(() => {
  const done = allItems.value.filter(id => learn.isCompleted(id)).length
  return { done, total: allItems.value.length, pct: Math.round((done / (allItems.value.length || 1)) * 100) }
})

const nextItem = computed(() => allItems.value.find(id => !learn.isCompleted(id)))

function itemStatus(id) {
  if (learn.isCompleted(id)) return 'done'
  if (id === nextItem.value)  return 'current'
  const idx  = allItems.value.indexOf(id)
  const prev = allItems.value[idx - 1]
  if (!prev || learn.isCompleted(prev)) return 'current'
  return 'locked'
}

function levelDone(level) {
  return level.items.every(i => learn.isCompleted(i.id))
}

function levelProgress(level) {
  const done  = level.items.filter(i => learn.isCompleted(i.id)).length
  return Math.round((done / level.items.length) * 100)
}

const tierMap = {
  beginner:     { label: 'Principiante', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.25)',  color: '#4ade80' },
  intermediate: { label: 'Intermedio',   bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: '#fbbf24' },
  advanced:     { label: 'Avanzato',     bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)',  color: '#f87171' },
}
function tierStyle(tier) { return tierMap[tier] || { bg:'transparent', border:'transparent', color:'transparent' } }
function tierLabel(tier)  { return tierMap[tier]?.label || '' }

function navigate(item) {
  if (itemStatus(item.id) === 'locked') return
  if (item.type === 'quiz') {
    router.push({ name: 'quiz', params: { id: item.id }, query: { courseId: course.value.id } })
  } else {
    router.push({ name: 'lesson', params: { id: item.id }, query: { courseId: course.value.id } })
  }
}
</script>

<style scoped>
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0px rgba(99,102,241,0.5), 0 2px 16px rgba(99,102,241,0.3); }
  70%  { box-shadow: 0 0 0 8px rgba(99,102,241,0),   0 2px 16px rgba(99,102,241,0.3); }
  100% { box-shadow: 0 0 0 0px rgba(99,102,241,0),   0 2px 16px rgba(99,102,241,0.3); }
}
.node-pulse { animation: pulse-ring 2s ease-out infinite; }
</style>
