<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Certificati' }]" />
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:860px;margin:0 auto">

          <!-- Earned -->
          <template v-if="earned.length">
            <h2 style="margin:0 0 18px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">OTTENUTI</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:48px">
              <div v-for="cert in earned" :key="cert.courseId"
                :style="{
                  borderRadius:'16px', overflow:'hidden',
                  border:`1px solid rgba(${cert.colorRgb},0.25)`,
                  background:`linear-gradient(135deg,rgba(${cert.colorRgb},0.1),rgba(${cert.colorRgb},0.03))`,
                }">
                <!-- Top band -->
                <div :style="{ height:'6px', background:`linear-gradient(90deg,rgb(${cert.colorRgb}),rgba(${cert.colorRgb},0.3))` }" />
                <div style="padding:20px 22px">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
                    <div :style="{
                      width:'44px', height:'44px', borderRadius:'12px', flexShrink:0,
                      background:`rgba(${cert.colorRgb},0.15)`, border:`1px solid rgba(${cert.colorRgb},0.3)`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem',
                    }">🏆</div>
                    <div>
                      <div style="font-size:0.68rem;font-weight:700;color:rgba(228,230,244,0.35);letter-spacing:0.07em;margin-bottom:2px">CERTIFICATO DI COMPLETAMENTO</div>
                      <div style="font-size:0.98rem;font-weight:700;color:#e4e6f4">{{ cert.courseName }}</div>
                    </div>
                  </div>
                  <div style="font-size:0.78rem;color:rgba(228,230,244,0.45);margin-bottom:16px">
                    Completato il <strong style="color:rgba(228,230,244,0.7)">{{ cert.date }}</strong>
                  </div>
                  <button @click="download(cert)"
                    :style="{
                      display:'flex', alignItems:'center', gap:'7px',
                      width:'100%', padding:'9px 0', justifyContent:'center',
                      borderRadius:'10px', border:`1px solid rgba(${cert.colorRgb},0.35)`,
                      background:`rgba(${cert.colorRgb},0.1)`, color:`rgb(${cert.colorRgb})`,
                      fontSize:'0.8rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s',
                    }"
                    @mouseover="e => e.currentTarget.style.background=`rgba(${cert.colorRgb},0.2)`"
                    @mouseout="e => e.currentTarget.style.background=`rgba(${cert.colorRgb},0.1)`">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Scarica PDF
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- In progress -->
          <h2 style="margin:0 0 18px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">IN CORSO</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px">
            <div v-for="cert in inProgress" :key="cert.courseId"
              style="border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(12,12,28,0.5);padding:18px 20px">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                <CourseIcon :course-id="cert.courseId" />
                <div>
                  <div style="font-size:0.88rem;font-weight:600;color:rgba(228,230,244,0.7)">{{ cert.courseName }}</div>
                  <div style="font-size:0.72rem;color:rgba(228,230,244,0.3)">{{ cert.done }}/{{ cert.total }} lezioni</div>
                </div>
              </div>
              <div style="height:4px;border-radius:99px;background:rgba(255,255,255,0.06);overflow:hidden">
                <div :style="{ height:'100%', width:cert.pct+'%', background:`rgb(${cert.colorRgb})`, borderRadius:'99px', transition:'width 0.5s' }" />
              </div>
              <div :style="{ fontSize:'0.7rem', marginTop:'6px', color:`rgba(${cert.colorRgb},0.7)`, fontWeight:600 }">{{ cert.pct }}% completato</div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!earned.length && !inProgress.length" style="text-align:center;padding:80px 0;color:rgba(228,230,244,0.25)">
            <div style="font-size:3rem;margin-bottom:12px">📜</div>
            <div style="font-size:0.9rem">Completa il tuo primo corso per ottenere un certificato</div>
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

const userName = computed(() => auth.user?.name || 'Studente')

function courseProgress(course) {
  const items = course.levels.flatMap(l => l.items.map(i => i.id))
  if (!items.length) return { done: 0, total: 0, pct: 0 }
  const done = items.filter(id => learn.isCompleted(id)).length
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
}

const activeCourses = computed(() => courses.filter(c => !c.comingSoon && c.levels.length))

const earned = computed(() =>
  activeCourses.value
    .filter(c => courseProgress(c).pct === 100)
    .map(c => ({
      courseId:   c.id,
      courseName: c.name,
      colorRgb:   c.colorRgb,
      date:       new Date().toLocaleDateString('it-IT', { day:'numeric', month:'long', year:'numeric' }),
    }))
)

const inProgress = computed(() =>
  activeCourses.value
    .filter(c => { const p = courseProgress(c); return p.done > 0 && p.pct < 100 })
    .map(c => ({ courseId: c.id, courseName: c.name, colorRgb: c.colorRgb, ...courseProgress(c) }))
)

function download(cert) {
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<title>Certificato — ${cert.courseName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 40px;
  }
  .cert {
    width: 794px; min-height: 560px;
    border: 2px solid rgb(${cert.colorRgb});
    border-radius: 20px; padding: 60px 72px;
    position: relative; overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  }
  .band { position:absolute; top:0; left:0; right:0; height:8px; background: linear-gradient(90deg, rgb(${cert.colorRgb}), rgba(${cert.colorRgb},0.3)); }
  .brand { font-size:13px; font-weight:700; letter-spacing:0.15em; color:rgba(${cert.colorRgb},0.8); margin-bottom:40px; }
  .label { font-size:12px; font-weight:600; letter-spacing:0.12em; color:#999; margin-bottom:12px; }
  .name  { font-size:42px; font-weight:900; color:#111; letter-spacing:-0.02em; margin-bottom:32px; border-bottom:2px solid rgb(${cert.colorRgb}); padding-bottom:24px; }
  .course-label { font-size:12px; font-weight:600; letter-spacing:0.1em; color:#999; margin-bottom:8px; }
  .course { font-size:26px; font-weight:700; color:#111; margin-bottom:40px; }
  .footer { display:flex; justify-content:space-between; align-items:flex-end; margin-top:40px; }
  .date { font-size:13px; color:#888; }
  .badge { width:60px; height:60px; border-radius:50%; background:rgba(${cert.colorRgb},0.12); border:2px solid rgba(${cert.colorRgb},0.4); display:flex; align-items:center; justify-content:center; font-size:28px; }
  @media print {
    body { padding:0; }
    .cert { box-shadow:none; border-radius:0; border-color:rgb(${cert.colorRgb}); }
  }
</style>
</head>
<body>
<div class="cert">
  <div class="band"></div>
  <div class="brand">ARABEL LEARN</div>
  <div class="label">CERTIFICATO DI COMPLETAMENTO</div>
  <div class="name">${userName.value}</div>
  <div class="course-label">HA COMPLETATO IL CORSO</div>
  <div class="course">${cert.courseName}</div>
  <div class="footer">
    <div class="date">Emesso il ${cert.date}<br><span style="color:#bbb;font-size:11px">learn.arabel.dev</span></div>
    <div class="badge">🏆</div>
  </div>
</div>
<script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`

  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
}
</script>
