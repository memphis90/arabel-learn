<template>
  <div style="display:flex;height:100vh;background:#05050f;overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: t('nav.courses') }]" />
      <div style="flex:1;overflow-y:auto;padding:24px 32px">
        <div style="max-width:1080px;margin:0 auto">

          <!-- Filters -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;align-items:center">

            <!-- Category filters -->
            <div style="display:flex;flex-wrap:wrap;gap:6px;flex:1">
              <button
                v-for="f in categoryFilters" :key="f"
                @click="activeCategory = f"
                :style="{
                  padding: '6px 14px', borderRadius: '99px', border: '1px solid',
                  fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                  borderColor: activeCategory === f ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)',
                  background:  activeCategory === f ? 'rgba(99,102,241,0.16)' : 'transparent',
                  color:       activeCategory === f ? '#a5b4fc' : 'rgba(228,230,244,0.45)',
                }"
              >{{ f === 'all' ? t('courses.filter_all') : f }}</button>
            </div>

            <!-- Availability toggle -->
            <div style="display:flex;border-radius:8px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;flex-shrink:0">
              <button
                v-for="opt in availFilters" :key="opt.value"
                @click="activeAvail = opt.value"
                :style="{
                  padding: '6px 12px', border: 'none', cursor: 'pointer',
                  fontSize: '0.75rem', fontWeight: 500, transition: 'all 0.15s',
                  background: activeAvail === opt.value ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color:      activeAvail === opt.value ? '#a5b4fc' : 'rgba(228,230,244,0.35)',
                }"
              >{{ opt.label }}</button>
            </div>

          </div>

          <!-- Results -->
          <template v-if="filteredCategories.length">
            <div v-for="cat in filteredCategories" :key="cat.name" style="margin-bottom:40px">
              <h2 style="margin:0 0 14px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em;text-transform:uppercase">
                {{ cat.name }}
                <span style="margin-left:6px;font-weight:400;opacity:0.6">({{ cat.active.length + cat.soon.length }})</span>
              </h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">

                <!-- corso attivo -->
                <div v-for="course in cat.active" :key="course.id"
                  @click="$router.push({ name: 'course', params: { id: course.id } })"
                  style="border-radius:16px;border:1px solid rgba(255,255,255,0.07);background:rgba(12,12,28,0.7);cursor:pointer;transition:transform 0.2s,border-color 0.2s,box-shadow 0.2s;overflow:hidden"
                  @mouseover="e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.45)`; e.currentTarget.style.boxShadow=`0 16px 40px rgba(${course.colorRgb},0.12)` }"
                  @mouseout="e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow='none' }">
                  <div :style="{ height:'76px', display:'flex', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg,rgba(${course.colorRgb},0.18),rgba(${course.colorRgb},0.06))`, position:'relative' }">
                    <CourseIcon :course-id="course.id" />
                    <div v-if="progress(course).pct === 100" style="position:absolute;top:8px;right:8px;width:18px;height:18px;border-radius:50%;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#4ade80">✓</div>
                  </div>
                  <div style="padding:11px 13px 13px">
                    <div style="font-size:0.88rem;font-weight:600;color:#e4e6f4;margin-bottom:2px">{{ course.name }}</div>
                    <div style="font-size:0.71rem;color:rgba(228,230,244,0.36);margin-bottom:9px;line-height:1.35">{{ course.tagline }}</div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                      <span style="font-size:0.67rem;color:rgba(228,230,244,0.32)">{{ progress(course).done }}/{{ progress(course).total }}</span>
                      <span :style="{ fontSize:'0.67rem', fontWeight:600, color:`rgb(${course.colorRgb})` }">{{ progress(course).pct }}%</span>
                    </div>
                    <div style="height:3px;border-radius:99px;background:rgba(255,255,255,0.07);overflow:hidden">
                      <div :style="{ height:'100%', width:progress(course).pct+'%', background:`rgb(${course.colorRgb})`, borderRadius:'99px', transition:'width 0.4s' }" />
                    </div>
                  </div>
                </div>

                <!-- corso coming soon -->
                <div v-for="course in cat.soon" :key="course.id"
                  style="border-radius:16px;border:1px solid rgba(255,255,255,0.04);background:rgba(12,12,28,0.3);overflow:hidden;cursor:default">
                  <div :style="{ height:'76px', display:'flex', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg,rgba(${course.colorRgb},0.06),rgba(${course.colorRgb},0.02))` }">
                    <CourseIcon :course-id="course.id" style="opacity:0.35" />
                  </div>
                  <div style="padding:11px 13px 13px">
                    <div style="font-size:0.88rem;font-weight:600;color:rgba(228,230,244,0.38);margin-bottom:2px">{{ course.name }}</div>
                    <div style="font-size:0.71rem;color:rgba(228,230,244,0.2);margin-bottom:9px;line-height:1.35">{{ course.tagline }}</div>
                    <div style="display:inline-flex;align-items:center;padding:2px 8px;border-radius:99px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);font-size:0.66rem;color:rgba(129,140,248,0.5);font-weight:500;letter-spacing:0.02em">
                      {{ t('courses.soon_badge') }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </template>

          <!-- Empty state -->
          <div v-else style="text-align:center;padding:60px 0;color:rgba(228,230,244,0.25);font-size:0.875rem">
            {{ t('courses.no_results') }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader  from '@/components/AppHeader.vue'
import CourseIcon from '@/components/CourseIcon.vue'
import { useLearnStore } from '@/stores/learn'
import { useLocale }     from '@/composables/useLocale'
import { courses } from '@/data/learn'

const learn    = useLearnStore()
const { t }    = useLocale()

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Mobile', 'DevOps & Tools', 'Teoria']

const activeCategory = ref('all')
const activeAvail    = ref('all')

const categoryFilters = computed(() => ['all', ...CATEGORY_ORDER])

const availFilters = computed(() => [
  { value: 'all',    label: t('courses.filter_all') },
  { value: 'active', label: t('courses.filter_active') },
  { value: 'soon',   label: t('courses.filter_soon') },
])

function progress(course) {
  const items = course.levels.flatMap(l => l.items.map(i => i.id))
  if (!items.length) return { done: 0, total: 0, pct: 0 }
  const done = items.filter(id => learn.isCompleted(id)).length
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
}

const filteredCategories = computed(() => {
  return CATEGORY_ORDER.map(name => {
    if (activeCategory.value !== 'all' && activeCategory.value !== name) return null

    const allInCat = courses.filter(c => c.category === name)
    let active = allInCat.filter(c => !c.comingSoon)
    let soon   = allInCat.filter(c =>  c.comingSoon)

    if (activeAvail.value === 'active') soon   = []
    if (activeAvail.value === 'soon')   active = []

    if (!active.length && !soon.length) return null
    return { name, active, soon }
  }).filter(Boolean)
})
</script>
