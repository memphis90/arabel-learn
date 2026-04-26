<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Profilo' }]">
        <template #actions>
          <button @click="auth.logout().then(() => $router.push({ name: 'login' }))"
            style="padding:6px 14px;border-radius:8px;border:1px solid rgba(var(--rgb-border),0.08);background:transparent;color:rgba(var(--rgb-text),0.5);font-size:0.8rem;cursor:pointer;transition:all 0.2s"
            @mouseover="e => e.currentTarget.style.color='var(--text-1)'" @mouseout="e => e.currentTarget.style.color='rgba(var(--rgb-text),0.5)'">
            Esci
          </button>
        </template>
      </AppHeader>
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:1200px;margin:0 auto">

          <!-- Profile Header -->
          <div style="margin-bottom:28px;padding:22px;border-radius:18px;background:rgba(var(--rgb-surface),0.7);border:1px solid rgba(var(--rgb-border),0.07);display:flex;align-items:center;gap:18px">
            <div style="width:64px;height:64px;border-radius:50%;background:#6366f1;border:2px solid rgba(99,102,241,0.4);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;color:#fff;flex-shrink:0">
              {{ initials }}
            </div>
            <div style="flex:1">
              <div style="font-size:1.2rem;font-weight:700;color:var(--text-1);margin-bottom:2px">{{ user?.name }}</div>
              <div style="font-size:0.82rem;color:rgba(var(--rgb-text),0.38);margin-bottom:10px">{{ user?.email }}</div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <StreakFlame :count="stats.streak" />
                <LevelBadge :level="stats.level" />
                <div style="padding:5px 10px;border-radius:99px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);font-size:0.78rem;color:#86efac">
                  {{ learn.completed.length }} lezioni
                </div>
              </div>
            </div>
            <div style="text-align:center;flex-shrink:0">
              <div style="font-size:1.8rem;font-weight:800;color:#818cf8;letter-spacing:-0.03em">{{ stats.xp }}</div>
              <div style="font-size:0.7rem;color:rgba(var(--rgb-text),0.35);margin-top:1px">XP TOTALI</div>
            </div>
          </div>

          <!-- XP Progress -->
          <div style="margin-bottom:28px;padding:18px;border-radius:14px;background:rgba(var(--rgb-surface),0.7);border:1px solid rgba(var(--rgb-border),0.06)">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:0.8rem;font-weight:600;color:rgba(var(--rgb-text),0.65)">Livello {{ stats.level }} → {{ stats.level + 1 }}</span>
              <span style="font-size:0.75rem;color:#818cf8">{{ stats.xp }} / {{ stats.xpNextLevel }} XP</span>
            </div>
            <XPBar :current="stats.xp" :total="stats.xpNextLevel" :show-label="false" />
          </div>

          <!-- Stats Row -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px">
            <div style="padding:16px 20px;border-radius:14px;background:rgba(var(--rgb-surface),0.7);border:1px solid rgba(var(--rgb-border),0.06);display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:0.8rem;color:rgba(var(--rgb-text),0.45)">Corsi completati</span>
              <span style="font-size:1rem;font-weight:700;color:#22c55e">{{ activeCourses.filter(c => courseProgress(c).pct === 100).length }}/{{ activeCourses.length }}</span>
            </div>
            <div style="padding:16px 20px;border-radius:14px;background:rgba(var(--rgb-surface),0.7);border:1px solid rgba(var(--rgb-border),0.06);display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:0.8rem;color:rgba(var(--rgb-text),0.45)">Badge sbloccati</span>
              <span style="font-size:1rem;font-weight:700;color:#a78bfa">{{ earnedBadges.filter(b => b.earned).length }}/{{ earnedBadges.length }}</span>
            </div>
          </div>

          <!-- Progressione Corsi -->
          <div style="margin-bottom:36px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.75rem;font-weight:700;color:rgba(228,230,244,0.38);letter-spacing:0.1em">PROGRESSIONE CORSI</h2>
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.25)">{{ activeCourseStats.length }} attivi</div>
            </div>

            <div v-if="activeCourseStats.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
              <div v-for="course in activeCourseStats" :key="course.id"
                   @click="$router.push({ name: 'course', params: { id: course.id } })"
                   :style="{
                  padding: '24px 20px 20px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, rgba(${course.colorRgb},0.12), rgba(${course.colorRgb},0.04))`,
                  border: `1px solid rgba(${course.colorRgb},0.2)`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }"
                   @mouseover="e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.5)`; e.currentTarget.style.boxShadow=`0 20px 40px rgba(${course.colorRgb},0.15)` }"
                   @mouseout="e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor=`rgba(${course.colorRgb},0.2)`; e.currentTarget.style.boxShadow='none' }">
                <VueApexCharts
                    type="radialBar"
                    height="160"
                    :options="course.chartOptions"
                    :series="[course.pct]"
                />
                <div style="font-size:0.95rem;font-weight:600;color:#e4e6f4;text-align:center;line-height:1.3">{{ course.name }}</div>
                <div style="font-size:0.72rem;color:rgba(228,230,244,0.38)">{{ course.done }}/{{ course.total }} lezioni</div>
              </div>
            </div>

            <div v-else style="text-align:center;padding:64px 32px;color:rgba(228,230,244,0.25);font-size:0.875rem;border-radius:16px;background:rgba(12,12,28,0.4);border:1px dashed rgba(255,255,255,0.06)">
              <div style="font-size:2rem;margin-bottom:12px;opacity:0.3">📚</div>
              <div>Inizia un corso per vedere la tua progressione</div>
            </div>
          </div>

          <!-- Percorsi di Carriera (collapsable) -->
          <div style="margin-bottom:36px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.75rem;font-weight:700;color:rgba(228,230,244,0.38);letter-spacing:0.1em">PERCORSI DI CARRIERA</h2>
              <button @click="careersExpanded = !careersExpanded"
                      style="padding:5px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(228,230,244,0.35);font-size:0.7rem;cursor:pointer;transition:all 0.2s"
                      @mouseover="e => { e.currentTarget.style.color='#e4e6f4'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)' }"
                      @mouseout="e => { e.currentTarget.style.color='rgba(228,230,244,0.35)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }">
                {{ careersExpanded ? 'Riduci' : 'Espandi tutto' }}
              </button>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:12px">
              <div v-for="career in (careersExpanded ? careerStats : careerStats.slice(0, 6))" :key="career.id"
                   :style="{
                  padding: '18px 22px',
                  borderRadius: '14px',
                  background: career.unlocked ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))' : 'rgba(12,12,28,0.6)',
                  border: career.unlocked ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s',
                }"
                   @mouseover="e => career.unlocked && (e.currentTarget.style.boxShadow='0 8px 24px rgba(34,197,94,0.15)')"
                   @mouseout="e => e.currentTarget.style.boxShadow='none'">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <span style="font-size:1.5rem;line-height:1">{{ career.emoji }}</span>
                    <span style="font-size:0.92rem;font-weight:600;color:#e4e6f4">{{ career.name }}</span>
                  </div>
                  <div v-if="career.unlocked"
                       style="font-size:0.68rem;font-weight:700;color:#86efac;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.35);padding:4px 10px;border-radius:99px">
                    ✓ Sbloccato
                  </div>
                  <div v-else :style="{ fontSize: '0.8rem', fontWeight: 700, color: career.pct > 0 ? '#a5b4fc' : 'rgba(228,230,244,0.3)' }">
                    {{ career.pct }}%
                  </div>
                </div>
                <div style="height:6px;border-radius:99px;background:rgba(255,255,255,0.06);overflow:hidden;margin-bottom:8px">
                  <div :style="{
                    height: '100%',
                    width: career.pct + '%',
                    background: career.unlocked ? 'linear-gradient(90deg, #22c55e, #86efac)' : 'linear-gradient(90deg, #6366f1, #a5b4fc)',
                    borderRadius: '99px',
                    transition: 'width 0.6s ease',
                  }" />
                </div>
                <div style="font-size:0.7rem;color:rgba(228,230,244,0.32)">{{ career.done }}/{{ career.total }} item completati</div>
              </div>
            </div>
          </div>

          <!-- Badge -->
          <div style="margin-bottom:36px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.75rem;font-weight:700;color:rgba(228,230,244,0.38);letter-spacing:0.1em">BADGE SBLOCCATI</h2>
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.25)">{{ earnedBadges.filter(b => b.earned).length }}/{{ earnedBadges.length }}</div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px">
              <div v-for="badge in earnedBadges" :key="badge.id"
                   :style="{
                  padding: '20px 16px',
                  borderRadius: '16px',
                  background: badge.earned ? 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(168,85,247,0.04))' : 'rgba(12,12,28,0.4)',
                  border: badge.earned ? '1px solid rgba(168,85,247,0.25)' : '1px dashed rgba(255,255,255,0.04)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'all 0.3s',
                  cursor: badge.earned ? 'pointer' : 'default',
                }"
                   @mouseover="e => badge.earned && (e.currentTarget.style.transform='scale(1.05)', e.currentTarget.style.boxShadow='0 12px 32px rgba(168,85,247,0.2)')"
                   @mouseout="e => (e.currentTarget.style.transform='none', e.currentTarget.style.boxShadow='none')">
                <img v-if="badge.icon" :src="badge.icon" width="42" height="42"
                     :style="{ filter: badge.earned ? 'drop-shadow(0 4px 12px rgba(168,85,247,0.4))' : 'grayscale(1) brightness(0.3)', transition: 'filter 0.3s' }" />
                <span v-else :style="{ fontSize: '2.2rem', lineHeight: 1, opacity: badge.earned ? 1 : 0.2, transition: 'opacity 0.3s' }">{{ badge.emoji }}</span>
                <div :style="{ fontSize: '0.8rem', fontWeight: 600, color: badge.earned ? '#e4e6f4' : 'rgba(228,230,244,0.25)', lineHeight: 1.3 }">{{ t('badges.name.' + badge.id) }}</div>
                <div style="font-size:0.68rem;color:rgba(228,230,244,0.22);line-height:1.4">{{ t('badges.desc.' + badge.id) }}</div>
                <div v-if="badge.earned"
                     style="position:absolute;top:10px;right:12px;width:18px;height:18px;border-radius:50%;background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.5);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#86efac">✓</div>
              </div>
            </div>
          </div>

          <!-- Certificati -->
          <div style="margin-bottom:36px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 style="margin:0;font-size:0.75rem;font-weight:700;color:rgba(228,230,244,0.38);letter-spacing:0.1em">CERTIFICATI</h2>
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.25)">{{ earnedCerts.length }} ottenuti</div>
            </div>

            <!-- Earned -->
            <div v-if="earnedCerts.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:16px">
              <div v-for="cert in earnedCerts" :key="cert.courseId"
                :style="{
                  borderRadius:'16px', overflow:'hidden',
                  border:`1px solid rgba(${cert.colorRgb},0.25)`,
                  background:`linear-gradient(135deg,rgba(${cert.colorRgb},0.1),rgba(${cert.colorRgb},0.03))`,
                }">
                <div :style="{ height:'5px', background:`linear-gradient(90deg,rgb(${cert.colorRgb}),rgba(${cert.colorRgb},0.2))` }" />
                <div style="padding:18px 20px">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                    <div :style="{
                      width:'40px', height:'40px', borderRadius:'10px', flexShrink:0,
                      background:`rgba(${cert.colorRgb},0.15)`, border:`1px solid rgba(${cert.colorRgb},0.3)`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
                    }">🏆</div>
                    <div>
                      <div style="font-size:0.62rem;font-weight:700;color:rgba(228,230,244,0.35);letter-spacing:0.07em;margin-bottom:2px">COMPLETAMENTO</div>
                      <div style="font-size:0.92rem;font-weight:700;color:#e4e6f4">{{ cert.courseName }}</div>
                    </div>
                  </div>
                  <div style="font-size:0.75rem;color:rgba(228,230,244,0.4);margin-bottom:14px">
                    Completato il <strong style="color:rgba(228,230,244,0.65)">{{ cert.date }}</strong>
                  </div>
                  <button @click="downloadCert(cert)"
                    :style="{
                      display:'flex', alignItems:'center', gap:'6px',
                      width:'100%', padding:'8px 0', justifyContent:'center',
                      borderRadius:'8px', border:`1px solid rgba(${cert.colorRgb},0.35)`,
                      background:`rgba(${cert.colorRgb},0.1)`, color:`rgb(${cert.colorRgb})`,
                      fontSize:'0.78rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s',
                    }"
                    @mouseover="e => e.currentTarget.style.background=`rgba(${cert.colorRgb},0.2)`"
                    @mouseout="e => e.currentTarget.style.background=`rgba(${cert.colorRgb},0.1)`">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Scarica PDF
                  </button>
                </div>
              </div>
            </div>

            <!-- In progress -->
            <div v-if="inProgressCerts.length">
              <div style="font-size:0.65rem;font-weight:700;color:rgba(228,230,244,0.22);letter-spacing:0.1em;margin-bottom:10px">IN CORSO</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">
                <div v-for="cert in inProgressCerts" :key="cert.courseId"
                  style="border-radius:12px;border:1px solid rgba(255,255,255,0.06);background:rgba(12,12,28,0.5);padding:14px 16px">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                    <CourseIcon :course-id="cert.courseId" />
                    <div>
                      <div style="font-size:0.85rem;font-weight:600;color:rgba(228,230,244,0.65)">{{ cert.courseName }}</div>
                      <div style="font-size:0.7rem;color:rgba(228,230,244,0.28)">{{ cert.done }}/{{ cert.total }} lezioni</div>
                    </div>
                  </div>
                  <div style="height:3px;border-radius:99px;background:rgba(255,255,255,0.05);overflow:hidden">
                    <div :style="{ height:'100%', width:cert.pct+'%', background:`rgb(${cert.colorRgb})`, borderRadius:'99px', transition:'width 0.5s' }" />
                  </div>
                  <div :style="{ fontSize:'0.68rem', marginTop:'5px', color:`rgba(${cert.colorRgb},0.7)`, fontWeight:600 }">{{ cert.pct }}%</div>
                </div>
              </div>
            </div>

            <!-- Empty -->
            <div v-if="!earnedCerts.length && !inProgressCerts.length"
              style="text-align:center;padding:48px 0;color:rgba(228,230,244,0.2)">
              <div style="font-size:2rem;margin-bottom:10px">📜</div>
              <div style="font-size:0.85rem">Completa un corso per ottenere il tuo primo certificato</div>
            </div>
          </div>

          <!-- Tempo di Studio -->
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <h2 style="margin:0;font-size:0.75rem;font-weight:700;color:rgba(228,230,244,0.38);letter-spacing:0.1em">TEMPO DI STUDIO</h2>
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.25)">Ultimi 7 giorni</div>
            </div>
            <div style="font-size:0.7rem;color:rgba(228,230,244,0.22);margin-bottom:16px">Totale: {{ studyTimeMockup.reduce((a,b) => a+b, 0) }} minuti questa settimana</div>

            <div style="padding:24px;border-radius:16px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);margin-bottom:16px">
              <VueApexCharts
                  type="bar"
                  height="220"
                  :options="studyChartOptions"
                  :series="[{ name: 'Minuti', data: studyTimeMockup }]"
              />
            </div>

            <!-- Banner mockup -->
            <div style="display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2)">
              <span style="font-size:1.1rem;line-height:1">⚠️</span>
              <span style="font-size:0.78rem;color:rgba(251,191,36,0.75);line-height:1.5">Dato simulato — il tracking reale del tempo di studio arriverà prossimamente</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppSidebar  from '@/components/AppSidebar.vue'
import AppHeader   from '@/components/AppHeader.vue'
import XPBar       from '@/components/XPBar.vue'
import StreakFlame from '@/components/StreakFlame.vue'
import LevelBadge  from '@/components/LevelBadge.vue'
import CourseIcon  from '@/components/CourseIcon.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { useLocale } from '@/composables/useLocale'
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
    emoji: '🎭️',
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
    emoji: '💾️',
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
  { id: 'first_lesson',    emoji: '🌱', icon: null              },
  { id: 'streak_3',        emoji: '🔥', icon: null              },
  { id: 'streak_7',        emoji: '⚡', icon: null              },
  { id: 'node_beginner',   emoji: null, icon: _di('nodejs')     },
  { id: 'quiz_ace',        emoji: '🏅', icon: null              },
  { id: 'junior_frontend', emoji: null, icon: _di('vuejs')      },
  { id: 'mid_frontend',    emoji: null, icon: _di('vuejs')      },
  { id: 'junior_backend',  emoji: null, icon: _di('nodejs')     },
  { id: 'mid_backend_js',  emoji: null, icon: _di('nodejs')     },
  { id: 'junior_php',      emoji: null, icon: _di('php')        },
  { id: 'mid_php',         emoji: null, icon: _di('php')        },
  { id: 'devops_starter',  emoji: null, icon: _di('git')        },
  { id: 'devops_engineer', emoji: null, icon: _di('git')        },
  { id: 'full_stack_js',   emoji: null, icon: _di('javascript') },
  { id: 'sql_master',      emoji: null, icon: _di('mysql')      },
  { id: 'data_engineer',   emoji: null, icon: _di('redis')      },
  { id: 'master',          emoji: '⭐', icon: null              },
]

const auth  = useAuthStore()
const learn = useLearnStore()
const { t } = useLocale()
const user  = computed(() => auth.user)
const stats = computed(() => auth.stats)

const initials = computed(() =>
  (user.value?.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
)

const careersExpanded = ref(false)

function courseProgress(course) {
  const items = course.levels.flatMap(l => l.items.map(i => i.id))
  if (!items.length) return { done: 0, total: 0, pct: 0 }
  const done = items.filter(id => learn.isCompleted(id)).length
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
}

const activeCourses = computed(() => courses.filter(c => !c.comingSoon && c.levels.length))

const earnedCerts = computed(() =>
  activeCourses.value
    .filter(c => courseProgress(c).pct === 100)
    .map(c => ({
      courseId:   c.id,
      courseName: c.name,
      colorRgb:   c.colorRgb,
      date:       new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
    }))
)

const inProgressCerts = computed(() =>
  activeCourses.value
    .filter(c => { const p = courseProgress(c); return p.done > 0 && p.pct < 100 })
    .map(c => ({ courseId: c.id, courseName: c.name, colorRgb: c.colorRgb, ...courseProgress(c) }))
)

function downloadCert(cert) {
  const userName = auth.user?.name || 'Studente'
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<title>Certificato — ${cert.courseName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',sans-serif; background:#fff; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:40px; }
  .cert { width:794px; min-height:560px; border:2px solid rgb(${cert.colorRgb}); border-radius:20px; padding:60px 72px; position:relative; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.08); }
  .band { position:absolute; top:0; left:0; right:0; height:8px; background:linear-gradient(90deg,rgb(${cert.colorRgb}),rgba(${cert.colorRgb},0.3)); }
  .brand { font-size:13px; font-weight:700; letter-spacing:0.15em; color:rgba(${cert.colorRgb},0.8); margin-bottom:40px; }
  .label { font-size:12px; font-weight:600; letter-spacing:0.12em; color:#999; margin-bottom:12px; }
  .name  { font-size:42px; font-weight:900; color:#111; letter-spacing:-0.02em; margin-bottom:32px; border-bottom:2px solid rgb(${cert.colorRgb}); padding-bottom:24px; }
  .course-label { font-size:12px; font-weight:600; letter-spacing:0.1em; color:#999; margin-bottom:8px; }
  .course { font-size:26px; font-weight:700; color:#111; margin-bottom:40px; }
  .footer { display:flex; justify-content:space-between; align-items:flex-end; margin-top:40px; }
  .date { font-size:13px; color:#888; }
  .badge { width:60px; height:60px; border-radius:50%; background:rgba(${cert.colorRgb},0.12); border:2px solid rgba(${cert.colorRgb},0.4); display:flex; align-items:center; justify-content:center; font-size:28px; }
  @media print { body { padding:0; } .cert { box-shadow:none; border-radius:0; } }
</style>
</head>
<body>
<div class="cert">
  <div class="band"></div>
  <div class="brand">ARABEL LEARN</div>
  <div class="label">CERTIFICATO DI COMPLETAMENTO</div>
  <div class="name">${userName}</div>
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

const allCoursesComplete = computed(() =>
    activeCourses.value.length > 0 &&
    activeCourses.value.every(c => courseProgress(c).pct === 100)
)

const earnedBadges = computed(() => {
  const earned = new Set(auth.stats.badges || [])
  return ALL_BADGES.map(b => ({
    ...b,
    earned: b.id === 'master' ? allCoursesComplete.value : earned.has(b.id),
  }))
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