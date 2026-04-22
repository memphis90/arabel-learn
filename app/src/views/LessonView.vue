<template>
  <div style="display:flex;height:100vh;background:#05050f;position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[
        { label: 'Corsi', onClick: () => $router.push({ name: 'home' }) },
        { label: course?.name || '', onClick: () => $router.push({ name: 'course', params: { id: courseId } }) },
        { label: lesson?.title || '' },
      ]" />
      <div v-if="lesson && course" style="flex:1;overflow-y:auto;padding:24px 32px">
        <div style="max-width:760px;margin:0 auto">

          <!-- Header -->
          <div style="margin-bottom:24px;display:flex;align-items:center;justify-content:space-between">
            <div>
              <div :style="{ fontSize: '0.72rem', color: `rgba(${course.colorRgb},0.8)`, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '4px' }">{{ course.name.toUpperCase() }}</div>
              <h2 style="margin:0;font-size:1.3rem;font-weight:700;color:#e4e6f4;letter-spacing:-0.02em">{{ lesson.title }}</h2>
            </div>
            <div :style="{ padding: '5px 12px', borderRadius: '99px', background: `rgba(${course.colorRgb},0.1)`, border: `1px solid rgba(${course.colorRgb},0.25)`, fontSize: '0.78rem', fontWeight: 600, color: `rgb(${course.colorRgb})` }">
              +{{ lesson.xp }} XP
            </div>
          </div>

          <!-- Blocks -->
          <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:28px">
            <template v-for="(block, i) in lesson.blocks" :key="i">
              <p v-if="block.type === 'text'" style="margin:0 0 4px;font-size:0.9rem;line-height:1.75;color:rgba(228,230,244,0.82)" v-html="renderMd(block.md)" />
              <div v-else-if="block.type === 'keypoints'" style="margin:4px 0;padding:14px 18px;border-radius:12px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15)">
                <div v-if="block.title" style="font-size:0.75rem;font-weight:700;color:rgba(99,102,241,0.8);letter-spacing:0.05em;margin-bottom:10px">{{ block.title.toUpperCase() }}</div>
                <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px">
                  <li v-for="(pt, pi) in block.points" :key="pi" style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(228,230,244,0.75);line-height:1.5">
                    <span :style="{ color: `rgb(${course.colorRgb})`, marginTop: '2px', flexShrink: 0 }">›</span>
                    <span v-html="renderMd(pt)" />
                  </li>
                </ul>
              </div>
              <CodeBlock v-else-if="block.type === 'code'" :code="block.code" :label="block.label" :lang="block.lang" />

              <!-- Warning block -->
              <div v-else-if="block.type === 'warning'" style="display:flex;gap:12px;padding:14px 16px;border-radius:12px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2)">
                <span style="font-size:1rem;flex-shrink:0;margin-top:1px">⚠️</span>
                <p style="margin:0;font-size:0.85rem;line-height:1.65;color:rgba(251,191,36,0.85)" v-html="renderMd(block.text)" />
              </div>

              <!-- Exercise block -->
              <div v-else-if="block.type === 'exercise'" style="border-radius:14px;border:1px solid rgba(168,85,247,0.2);overflow:hidden">
                <div style="padding:14px 18px;background:rgba(168,85,247,0.06)">
                  <div style="font-size:0.7rem;font-weight:700;color:rgba(168,85,247,0.8);letter-spacing:0.06em;margin-bottom:8px">⚡ ESERCIZIO</div>
                  <p style="margin:0 0 8px;font-size:0.875rem;line-height:1.6;color:rgba(228,230,244,0.85)" v-html="renderMd(block.prompt)" />
                  <p v-if="block.hint" style="margin:0;font-size:0.78rem;color:rgba(228,230,244,0.4);font-style:italic" v-html="'💡 ' + renderMd(block.hint)" />
                </div>
                <div style="border-top:1px solid rgba(168,85,247,0.12)">
                  <button @click="toggleSolution(i)" style="display:flex;align-items:center;gap:8px;width:100%;padding:10px 18px;border:none;background:transparent;color:rgba(168,85,247,0.6);font-size:0.78rem;font-weight:600;cursor:pointer;transition:background 0.2s"
                    @mouseover="e => e.currentTarget.style.background='rgba(168,85,247,0.06)'"
                    @mouseout="e => e.currentTarget.style.background='transparent'">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transition:'transform 0.2s', transform: shownSolutions[i] ? 'rotate(90deg)' : 'none' }"><polyline points="9 18 15 12 9 6"/></svg>
                    {{ shownSolutions[i] ? 'Nascondi soluzione' : 'Mostra soluzione' }}
                  </button>
                  <div v-if="shownSolutions[i]" style="padding:0 18px 16px">
                    <CodeBlock :code="block.solution" label="soluzione.js" lang="js" />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Try It -->
          <div v-if="lesson.tryIt" style="margin-bottom:28px">
            <TryItEditor :try-it="lesson.tryIt" />
          </div>

          <!-- Complete button -->
          <div style="display:flex;justify-content:center">
            <div v-if="done" style="display:flex;align-items:center;gap:10px;padding:12px 24px;border-radius:12px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2)">
              <span style="color:#22c55e;font-size:1rem">✓</span>
              <span style="font-size:0.9rem;font-weight:600;color:#86efac">Lezione completata!</span>
              <button @click="$router.push({ name: 'course', params: { id: courseId } })" style="margin-left:8px;padding:6px 14px;border-radius:8px;border:1px solid rgba(34,197,94,0.3);background:transparent;color:#86efac;font-size:0.8rem;cursor:pointer">
                Torna al corso ›
              </button>
            </div>
            <button v-else @click="complete" :style="{
              padding: '13px 32px', borderRadius: '12px', border: 'none',
              background: `linear-gradient(135deg, rgb(${course.colorRgb}), rgba(${course.colorRgb},0.8))`,
              color: '#fff', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 4px 20px rgba(${course.colorRgb},0.3)`, transition: 'transform 0.2s, box-shadow 0.2s',
            }"
            @mouseover="e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 28px rgba(${course.colorRgb},0.4)` }"
            @mouseout="e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 4px 20px rgba(${course.colorRgb},0.3)` }">
              ✓ Segna come completata · +{{ lesson.xp }} XP
            </button>
          </div>

          <!-- Prev / Next -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.05)">
            <button @click="prev ? navigateItem(prev) : $router.push({ name: 'course', params: { id: courseId } })"
              style="display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.07);background:transparent;color:rgba(228,230,244,0.5);font-size:0.82rem;cursor:pointer;transition:all 0.2s"
              @mouseover="e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#e4e6f4' }"
              @mouseout="e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(228,230,244,0.5)' }">
              ‹ {{ prev ? prev.title : 'Torna al corso' }}
            </button>
            <button v-if="next" @click="navigateItem(next)"
              :style="{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '10px', border: `1px solid rgba(${course.colorRgb},0.25)`, background: `rgba(${course.colorRgb},0.07)`, color: `rgb(${course.colorRgb})`, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }"
              @mouseover="e => e.currentTarget.style.background=`rgba(${course.colorRgb},0.15)`"
              @mouseout="e => e.currentTarget.style.background=`rgba(${course.colorRgb},0.07)`">
              {{ next.title }} {{ next.type === 'quiz' ? '📝' : '›' }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'
import CodeBlock      from '@/components/CodeBlock.vue'
import TryItEditor    from '@/components/TryItEditor.vue'
import { useLearnStore } from '@/stores/learn'
import { courses, lessons, quizzes as content, getAdjacentItems } from '@/data/learn'

const route  = useRoute()
const router = useRouter()
const learn  = useLearnStore()

const courseId = computed(() => route.query.courseId || route.params.id?.split('-').slice(0, 2).join('-'))
const lesson   = computed(() => lessons[route.params.id] ?? content[route.params.id])
const course   = computed(() => courses.find(c => c.id === courseId.value))
const done     = computed(() => learn.isCompleted(route.params.id))

const adjacent = computed(() => getAdjacentItems(courseId.value, route.params.id))
const prev     = computed(() => adjacent.value.prev)
const next     = computed(() => adjacent.value.next)

const shownSolutions = reactive({})
function toggleSolution(i) { shownSolutions[i] = !shownSolutions[i] }

function renderMd(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code style="font-family:monospace;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.2);color:#a5b4fc;padding:1px 5px;border-radius:4px;font-size:0.85em">$1</code>')
}

async function complete() {
  const courseItems  = course.value?.levels.flatMap(l => l.items.map(i => i.id)) || []
  const doneBefore   = courseItems.filter(id => learn.isCompleted(id)).length
  await learn.completeItem(route.params.id, 'lesson', lesson.value.xp)
  if (doneBefore === 0) learn.followCourse(courseId.value)
}

function navigateItem(item) {
  if (!done.value) complete()
  if (item.type === 'quiz') {
    router.push({ name: 'quiz', params: { id: item.id }, query: { courseId: courseId.value } })
  } else {
    router.push({ name: 'lesson', params: { id: item.id }, query: { courseId: courseId.value } })
  }
}
</script>
