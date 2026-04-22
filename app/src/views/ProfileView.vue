<template>
  <div style="display:flex;height:100vh;background:#05050f;position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[{ label: 'Profilo' }]">
        <template #actions>
          <button @click="auth.logout().then(() => $router.push({ name: 'login' }))" style="padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(228,230,244,0.5);font-size:0.8rem;cursor:pointer;transition:all 0.2s"
            @mouseover="e => e.currentTarget.style.color='#e4e6f4'" @mouseout="e => e.currentTarget.style.color='rgba(228,230,244,0.5)'">
            Esci
          </button>
        </template>
      </AppHeader>
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:720px;margin:0 auto">

          <!-- Profile header -->
          <div style="margin-bottom:28px;padding:22px;border-radius:18px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:18px">
            <div style="width:64px;height:64px;border-radius:50%;background:#6366f1;border:2px solid rgba(99,102,241,0.4);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;color:#fff;flex-shrink:0">
              {{ initials }}
            </div>
            <div style="flex:1">
              <div style="font-size:1.2rem;font-weight:700;color:#e4e6f4;margin-bottom:2px">{{ user?.name }}</div>
              <div style="font-size:0.82rem;color:rgba(228,230,244,0.38);margin-bottom:10px">{{ user?.email }}</div>
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
              <div style="font-size:0.7rem;color:rgba(228,230,244,0.35);margin-top:1px">XP TOTALI</div>
            </div>
          </div>

          <!-- Stats row -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
            <div v-for="s in statCards" :key="s.label" style="padding:16px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);text-align:center">
              <div :style="{ fontSize: '1.3rem', fontWeight: 700, color: s.color, marginBottom: '4px' }">{{ s.value }}</div>
              <div style="font-size:0.72rem;color:rgba(228,230,244,0.38)">{{ s.label }}</div>
            </div>
          </div>

          <!-- XP Progress -->
          <div style="margin-bottom:24px;padding:18px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06)">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:0.8rem;font-weight:600;color:rgba(228,230,244,0.65)">Livello {{ stats.level }} → {{ stats.level + 1 }}</span>
              <span style="font-size:0.75rem;color:#818cf8">{{ stats.xp }} / {{ stats.xpNextLevel }} XP</span>
            </div>
            <XPBar :current="stats.xp" :total="stats.xpNextLevel" :show-label="false" />
          </div>

          <!-- Badges -->
          <div style="margin-bottom:24px" v-if="stats.badges?.length">
            <h3 style="margin:0 0 14px;font-size:0.75rem;font-weight:600;color:rgba(228,230,244,0.38);letter-spacing:0.08em">BADGE</h3>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <div v-for="id in stats.badges" :key="id" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.07)">
                <div :style="`width:36px;height:36px;border-radius:10px;background:rgba(${badgeData[id]?.colorRgb||'99,102,241'},0.12);border:1px solid rgba(${badgeData[id]?.colorRgb||'99,102,241'},0.25);display:flex;align-items:center;justify-content:center;font-size:1.1rem`">
                  {{ badgeData[id]?.icon || '🏅' }}
                </div>
                <div>
                  <div style="font-size:0.82rem;font-weight:600;color:#e4e6f4">{{ badgeData[id]?.name || id }}</div>
                  <div style="font-size:0.7rem;color:rgba(228,230,244,0.38)">{{ badgeData[id]?.desc || '' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Streak calendar -->
          <div>
            <h3 style="margin:0 0 14px;font-size:0.75rem;font-weight:600;color:rgba(228,230,244,0.38);letter-spacing:0.08em">ATTIVITÀ QUESTA SETTIMANA</h3>
            <div style="display:flex;gap:8px">
              <div v-for="(d, i) in weekDays" :key="i" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px">
                <div :style="{
                  width: '100%', paddingBottom: '100%', borderRadius: '8px', position: 'relative',
                  background: i < stats.streak && i < 7 ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i < stats.streak && i < 7 ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.06)'}`,
                }">
                  <span v-if="i < stats.streak && i < 7" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.8rem">✦</span>
                </div>
                <span style="font-size:0.65rem;color:rgba(228,230,244,0.3)">{{ d }}</span>
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
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'
import XPBar          from '@/components/XPBar.vue'
import StreakFlame    from '@/components/StreakFlame.vue'
import LevelBadge     from '@/components/LevelBadge.vue'
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'
import { badges as badgeData, courses } from '@/data/learn'

const auth  = useAuthStore()
const learn = useLearnStore()

const user  = computed(() => auth.user)
const stats = computed(() => auth.stats)

const initials = computed(() =>
  (user.value?.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
)

const totalLessons = courses.reduce((s, c) => s + c.levels.reduce((ls, l) => ls + l.items.length, 0), 0)
const weekDays     = ['L', 'M', 'M', 'G', 'V', 'S', 'D']

const statCards = computed(() => [
  { label: 'Streak attuale', value: `${stats.value.streak} 🔥`, color: '#f59e0b' },
  { label: 'Completate',     value: `${learn.completed.length}/${totalLessons}`, color: '#22c55e' },
  { label: 'Livello',        value: `LV ${stats.value.level}`, color: '#818cf8' },
])
</script>
