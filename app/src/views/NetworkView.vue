<template>
  <div style="display:flex;height:100vh;background:var(--bg-base);overflow:hidden;position:relative">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[{ label: 'Network' }]" />

      <div style="flex:1;overflow-y:auto;padding:24px 32px">
        <div style="max-width:1100px;margin:0 auto">

          <!-- Mockup banner -->
          <div style="display:flex;align-items:center;gap:10px;padding:11px 16px;border-radius:10px;background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.18);margin-bottom:22px">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style="font-size:0.76rem;color:rgba(251,191,36,0.75)">Mockup — i dati utente reali arriveranno con il backend</span>
          </div>

          <!-- Search + filters -->
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
            <div style="position:relative;flex:1;min-width:200px">
              <svg style="position:absolute;left:11px;top:50%;transform:translateY(-50%);pointer-events:none" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="rgba(var(--rgb-text),0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input v-model="search" placeholder="Cerca nickname..." :style="{
                width:'100%', padding:'9px 12px 9px 34px', borderRadius:'10px',
                border:'1px solid rgba(var(--rgb-border),0.08)', background:'rgba(var(--rgb-border),0.04)',
                color:'var(--text-1)', fontSize:'0.84rem', outline:'none',
              }" />
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button v-for="tag in ALL_TAGS" :key="tag"
                @click="toggleTag(tag)"
                :style="{
                  padding:'6px 12px', borderRadius:'99px', border:'1px solid',
                  fontSize:'0.72rem', fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                  borderColor: activeTag === tag ? 'rgba(99,102,241,0.5)' : 'rgba(var(--rgb-border),0.1)',
                  background:  activeTag === tag ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color:       activeTag === tag ? '#a5b4fc' : 'rgba(var(--rgb-text),0.45)',
                }">{{ tag }}</button>
            </div>
          </div>

          <!-- Stats row -->
          <div style="display:flex;gap:16px;margin-bottom:24px">
            <div style="font-size:0.75rem;color:rgba(var(--rgb-text),0.35)">
              <span style="font-weight:700;color:var(--text-1)">{{ filtered.length }}</span> utenti nel network
            </div>
            <div style="font-size:0.75rem;color:rgba(var(--rgb-text),0.35)">
              <span style="font-weight:700;color:#86efac">{{ connected.size }}</span> connessioni
            </div>
          </div>

          <!-- Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">
            <div v-for="user in filtered" :key="user.id"
              @click="selected = selected?.id === user.id ? null : user"
              :style="{
                padding:'18px 18px 16px', borderRadius:'16px', cursor:'pointer',
                border:'1px solid',
                borderColor: selected?.id === user.id ? 'rgba(99,102,241,0.45)' : 'rgba(var(--rgb-border),0.07)',
                background: selected?.id === user.id ? 'rgba(99,102,241,0.08)' : 'rgba(var(--rgb-border),0.02)',
                transition:'all 0.2s',
                boxShadow: selected?.id === user.id ? '0 0 0 2px rgba(99,102,241,0.18)' : 'none',
              }"
              @mouseover="e => { if(selected?.id !== user.id) { e.currentTarget.style.borderColor='rgba(var(--rgb-border),0.14)'; e.currentTarget.style.background='rgba(var(--rgb-border),0.05)' }}"
              @mouseout="e => { if(selected?.id !== user.id) { e.currentTarget.style.borderColor='rgba(var(--rgb-border),0.07)'; e.currentTarget.style.background='rgba(var(--rgb-border),0.02)' }}">

              <!-- Avatar + nick -->
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
                <div :style="{
                  width:'40px', height:'40px', borderRadius:'50%', flexShrink:0,
                  background: `linear-gradient(135deg, ${user.color}, ${user.colorDark})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.8rem', fontWeight:700, color:'#fff',
                  boxShadow: `0 4px 12px ${user.color}40`,
                }">{{ user.initials }}</div>
                <div style="min-width:0">
                  <div style="font-size:0.88rem;font-weight:600;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ user.nick }}</div>
                  <div style="font-size:0.7rem;color:rgba(var(--rgb-text),0.3);margin-top:1px">{{ user.badges.length }} badge</div>
                </div>
                <div v-if="connected.has(user.id)" style="margin-left:auto;width:22px;height:22px;border-radius:50%;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>

              <!-- Top badges -->
              <div style="display:flex;gap:5px;margin-bottom:12px;flex-wrap:wrap">
                <div v-for="b in user.badges.slice(0,4)" :key="b.id"
                  :title="b.label"
                  style="width:26px;height:26px;border-radius:7px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);display:flex;align-items:center;justify-content:center">
                  <img v-if="b.icon" :src="b.icon" width="16" height="16" style="opacity:0.85" />
                  <span v-else style="font-size:0.78rem;line-height:1">{{ b.emoji }}</span>
                </div>
                <div v-if="user.badges.length > 4"
                  style="width:26px;height:26px;border-radius:7px;background:rgba(var(--rgb-border),0.06);border:1px solid rgba(var(--rgb-border),0.1);display:flex;align-items:center;justify-content:center;font-size:0.62rem;color:rgba(var(--rgb-text),0.35);font-weight:600">
                  +{{ user.badges.length - 4 }}
                </div>
              </div>

              <!-- Interests -->
              <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px">
                <span v-for="tag in user.tags" :key="tag"
                  style="font-size:0.62rem;padding:2px 8px;border-radius:99px;background:rgba(var(--rgb-border),0.06);border:1px solid rgba(var(--rgb-border),0.08);color:rgba(var(--rgb-text),0.45);font-weight:500">
                  {{ tag }}
                </span>
              </div>

              <!-- Connect button -->
              <button @click.stop="toggleConnect(user)"
                :style="{
                  width:'100%', padding:'7px 0', borderRadius:'8px', border:'1px solid',
                  fontSize:'0.76rem', fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                  borderColor: connected.has(user.id) ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.3)',
                  background:  connected.has(user.id) ? 'rgba(34,197,94,0.08)' : 'rgba(99,102,241,0.08)',
                  color:       connected.has(user.id) ? '#86efac' : '#a5b4fc',
                }">
                {{ connected.has(user.id) ? '✓ Connesso' : '+ Connetti' }}
              </button>
            </div>
          </div>

          <div v-if="filtered.length === 0" style="text-align:center;padding:80px 0;color:rgba(var(--rgb-text),0.22)">
            <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
            <div style="font-size:0.88rem">Nessun utente trovato</div>
          </div>

        </div>
      </div>
    </div>

    <!-- Side panel -->
    <Transition name="panel">
      <div v-if="selected" :style="{
        position:'fixed', right:0, top:0, bottom:0, width:'340px',
        background:'var(--bg-sidebar)', backdropFilter:'blur(24px)',
        borderLeft:'1px solid rgba(var(--rgb-border),0.08)',
        zIndex:50, display:'flex', flexDirection:'column',
        boxShadow:'-16px 0 48px rgba(0,0,0,0.4)',
        overflowY:'auto',
      }">
        <!-- Header -->
        <div style="padding:20px 20px 0;display:flex;align-items:center;gap:12px;flex-shrink:0">
          <div :style="{
            width:'52px', height:'52px', borderRadius:'50%', flexShrink:0,
            background:`linear-gradient(135deg,${selected.color},${selected.colorDark})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1rem', fontWeight:700, color:'#fff',
            boxShadow:`0 6px 20px ${selected.color}50`,
          }">{{ selected.initials }}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:1rem;font-weight:700;color:var(--text-1)">{{ selected.nick }}</div>
            <div style="font-size:0.72rem;color:rgba(var(--rgb-text),0.35);margin-top:2px">{{ selected.badges.length }} badge · {{ selected.tags.join(', ') }}</div>
          </div>
          <button @click="selected = null"
            style="width:28px;height:28px;border-radius:8px;border:1px solid rgba(var(--rgb-border),0.08);background:transparent;cursor:pointer;color:rgba(var(--rgb-text),0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Connect -->
        <div style="padding:16px 20px;flex-shrink:0">
          <button @click="toggleConnect(selected)"
            :style="{
              width:'100%', padding:'10px 0', borderRadius:'10px', border:'1px solid',
              fontSize:'0.82rem', fontWeight:600, cursor:'pointer', transition:'all 0.15s',
              borderColor: connected.has(selected.id) ? 'rgba(34,197,94,0.35)' : 'rgba(99,102,241,0.4)',
              background:  connected.has(selected.id) ? 'rgba(34,197,94,0.1)' : 'rgba(99,102,241,0.12)',
              color:       connected.has(selected.id) ? '#86efac' : '#a5b4fc',
            }">
            {{ connected.has(selected.id) ? '✓ Connesso' : '+ Connetti' }}
          </button>
        </div>

        <div style="height:1px;background:rgba(var(--rgb-border),0.06);flex-shrink:0" />

        <!-- Badges section -->
        <div style="padding:18px 20px;flex-shrink:0">
          <div style="font-size:0.65rem;font-weight:700;color:rgba(var(--rgb-text),0.28);letter-spacing:0.1em;margin-bottom:12px">BADGE</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
            <div v-for="b in selected.badges" :key="b.id"
              :title="b.label"
              style="aspect-ratio:1;border-radius:10px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.22);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;padding:4px">
              <img v-if="b.icon" :src="b.icon" width="20" height="20" style="opacity:0.85" />
              <span v-else style="font-size:1rem;line-height:1">{{ b.emoji }}</span>
              <span style="font-size:0.52rem;color:rgba(var(--rgb-text),0.35);text-align:center;line-height:1.2;padding:0 2px">{{ b.shortLabel }}</span>
            </div>
          </div>
        </div>

        <div style="height:1px;background:rgba(var(--rgb-border),0.06);flex-shrink:0" />

        <!-- Interessi -->
        <div style="padding:18px 20px;flex-shrink:0">
          <div style="font-size:0.65rem;font-weight:700;color:rgba(var(--rgb-text),0.28);letter-spacing:0.1em;margin-bottom:10px">INTERESSI</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <span v-for="tag in selected.tags" :key="tag"
              style="font-size:0.72rem;padding:4px 11px;border-radius:99px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);color:#a5b4fc;font-weight:500">
              {{ tag }}
            </span>
          </div>
        </div>

        <div style="height:1px;background:rgba(var(--rgb-border),0.06);flex-shrink:0" />

        <!-- LinkedIn -->
        <div style="padding:18px 20px;flex-shrink:0">
          <div style="font-size:0.65rem;font-weight:700;color:rgba(var(--rgb-text),0.28);letter-spacing:0.1em;margin-bottom:10px">LINKEDIN</div>
          <div v-if="selected.linkedin"
            style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:10px;background:rgba(10,102,194,0.1);border:1px solid rgba(10,102,194,0.25)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span style="font-size:0.82rem;color:rgba(var(--rgb-text),0.7);font-weight:500">{{ selected.linkedin }}</span>
          </div>
          <div v-else style="font-size:0.78rem;color:rgba(var(--rgb-text),0.25)">Non collegato</div>
        </div>

      </div>
    </Transition>

    <!-- Overlay when panel open -->
    <div v-if="selected" @click="selected = null"
      style="position:fixed;inset:0;z-index:49;background:rgba(0,0,0,0.25);backdrop-filter:blur(2px)" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'

const search     = ref('')
const activeTag  = ref(null)
const selected   = ref(null)
const connected  = ref(new Set())

const _di = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`

const BADGE_META = {
  first_lesson:    { label: 'Prima lezione', shortLabel: '1a lez.',  emoji: '🌱', icon: null },
  streak_3:        { label: 'Streak 3 giorni', shortLabel: '3d',      emoji: '🔥', icon: null },
  streak_7:        { label: 'Streak 7 giorni', shortLabel: '7d',      emoji: '⚡', icon: null },
  quiz_ace:        { label: 'Quiz perfetto',   shortLabel: 'Quiz',    emoji: '🏅', icon: null },
  junior_frontend: { label: 'Frontend Junior', shortLabel: 'FE Jr',   emoji: null, icon: _di('vuejs') },
  mid_frontend:    { label: 'Frontend Mid',    shortLabel: 'FE Mid',  emoji: null, icon: _di('vuejs') },
  junior_backend:  { label: 'Backend Junior',  shortLabel: 'BE Jr',   emoji: null, icon: _di('nodejs') },
  mid_backend_js:  { label: 'Backend Mid',     shortLabel: 'BE Mid',  emoji: null, icon: _di('nodejs') },
  junior_php:      { label: 'PHP Junior',      shortLabel: 'PHP Jr',  emoji: null, icon: _di('php') },
  devops_starter:  { label: 'DevOps Starter',  shortLabel: 'DevOps',  emoji: null, icon: _di('git') },
  devops_engineer: { label: 'DevOps Engineer', shortLabel: 'DevEng',  emoji: null, icon: _di('git') },
  full_stack_js:   { label: 'Full Stack JS',   shortLabel: 'FS JS',   emoji: null, icon: _di('javascript') },
  sql_master:      { label: 'SQL Master',      shortLabel: 'SQL',     emoji: null, icon: _di('mysql') },
  data_engineer:   { label: 'Data Engineer',   shortLabel: 'Data',    emoji: null, icon: _di('redis') },
  master:          { label: 'Master',          shortLabel: 'Master',  emoji: '⭐', icon: null },
}

function badge(id) { return { id, ...BADGE_META[id] } }

const COLORS = [
  ['#6366f1','#4f46e5'], ['#06b6d4','#0891b2'], ['#8b5cf6','#7c3aed'],
  ['#10b981','#059669'], ['#f59e0b','#d97706'], ['#ec4899','#db2777'],
  ['#3b82f6','#2563eb'], ['#ef4444','#dc2626'], ['#14b8a6','#0d9488'],
  ['#a855f7','#9333ea'], ['#f97316','#ea580c'], ['#22c55e','#16a34a'],
]

const RAW_USERS = [
  { id:1,  nick:'fr4nco_dev',    tags:['Frontend','Vue.js','TypeScript'],    badges:['first_lesson','junior_frontend','streak_3'],                linkedin:'franco-gdev' },
  { id:2,  nick:'nullpointer99', tags:['Backend','Node.js','SQL'],           badges:['first_lesson','junior_backend','streak_7','quiz_ace'],        linkedin:null },
  { id:3,  nick:'bytewitch',     tags:['DevOps','Linux','CI/CD'],            badges:['first_lesson','devops_starter','streak_3'],                   linkedin:'bytewitch' },
  { id:4,  nick:'codex_maximus', tags:['Full Stack','Vue.js','Node.js'],     badges:['first_lesson','junior_frontend','junior_backend','full_stack_js','streak_7'], linkedin:null },
  { id:5,  nick:'ph4ntom_sql',   tags:['SQL','Data','Backend'],              badges:['first_lesson','sql_master','streak_3','quiz_ace'],            linkedin:'phantom-sql' },
  { id:6,  nick:'elisa.codes',   tags:['Frontend','React','TypeScript'],     badges:['first_lesson','junior_frontend','streak_7'],                  linkedin:'elisa-codes' },
  { id:7,  nick:'devops_bro',    tags:['DevOps','Docker','CI/CD'],           badges:['first_lesson','devops_starter','devops_engineer','streak_7'], linkedin:null },
  { id:8,  nick:'gio_lambda',    tags:['Backend','PHP','SQL'],               badges:['first_lesson','junior_php','junior_backend'],                 linkedin:'giovanni-l' },
  { id:9,  nick:'datadriven_lu', tags:['Data','SQL','Backend'],              badges:['first_lesson','sql_master','data_engineer','streak_3'],       linkedin:'luca-datadriven' },
  { id:10, nick:'vuemaster3000', tags:['Frontend','Vue.js','Nuxt'],          badges:['first_lesson','junior_frontend','mid_frontend','streak_7'],   linkedin:null },
  { id:11, nick:'backendpirate', tags:['Backend','Node.js','Express'],       badges:['first_lesson','junior_backend','mid_backend_js'],             linkedin:'be-pirate' },
  { id:12, nick:'sara_script',   tags:['Frontend','JavaScript','CSS'],       badges:['first_lesson','streak_3'],                                    linkedin:'sara-script' },
  { id:13, nick:'phplegend',     tags:['PHP','SQL','Backend'],               badges:['first_lesson','junior_php','quiz_ace'],                       linkedin:null },
  { id:14, nick:'terminal_nerd', tags:['DevOps','Linux','Git'],              badges:['first_lesson','devops_starter','streak_7'],                   linkedin:'terminalnerd' },
  { id:15, nick:'fullstack_fx',  tags:['Full Stack','Vue.js','Node.js'],     badges:['first_lesson','junior_frontend','junior_backend','full_stack_js','master'], linkedin:'fx-fullstack' },
  { id:16, nick:'ts_wizard',     tags:['TypeScript','Frontend','Patterns'],  badges:['first_lesson','streak_3','quiz_ace'],                         linkedin:null },
  { id:17, nick:'redis_queen',   tags:['Data','Redis','SQL'],                badges:['first_lesson','sql_master','data_engineer'],                  linkedin:'redis-queen' },
  { id:18, nick:'mattia_node',   tags:['Backend','Node.js','MongoDB'],       badges:['first_lesson','junior_backend','streak_3'],                   linkedin:'mattia-node' },
]

const MOCK_USERS = RAW_USERS.map((u, i) => {
  const [color, colorDark] = COLORS[i % COLORS.length]
  const initials = u.nick.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || '??'
  return {
    ...u,
    color, colorDark, initials,
    badges: u.badges.map(badge),
  }
})

const ALL_TAGS = ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'SQL', 'Data']

function toggleTag(tag) {
  activeTag.value = activeTag.value === tag ? null : tag
}

function toggleConnect(user) {
  const s = new Set(connected.value)
  s.has(user.id) ? s.delete(user.id) : s.add(user.id)
  connected.value = s
}

const filtered = computed(() => {
  let list = MOCK_USERS
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(u => u.nick.toLowerCase().includes(q))
  }
  if (activeTag.value) {
    list = list.filter(u => u.tags.includes(activeTag.value))
  }
  return list
})
</script>

<style scoped>
.panel-enter-active { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease; }
.panel-leave-active { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), opacity 0.15s ease; }
.panel-enter-from   { transform: translateX(100%); opacity: 0; }
.panel-leave-to     { transform: translateX(100%); opacity: 0; }

input::placeholder { color: rgba(var(--rgb-text), 0.3); }
input:focus { border-color: rgba(99,102,241,0.35) !important; outline: none; }
</style>
