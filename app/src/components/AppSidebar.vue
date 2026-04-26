<template>
  <aside :style="{
    position: 'relative', zIndex: 10, width: open ? '220px' : '64px', flexShrink: 0,
    height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch',
    padding: '20px 10px 16px', background: 'var(--bg-sidebar)', backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(var(--rgb-border),0.06)', transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
    overflow: 'hidden',
  }">

    <!-- Logo -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;padding-left:2px;flex-shrink:0">
      <div style="width:36px;height:36px;min-width:36px;border-radius:8px;background:#6366f1;display:flex;align-items:center;justify-content:center">
        <svg viewBox="340 300 175 215" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M 356.50 506.04 C355.40,505.58 353.49,504.24 352.25,503.06 C348.20,499.21 349.15,495.76 360.93,471.51 C366.94,459.13 372.12,448.21 372.42,447.24 C372.82,445.98 372.16,445.12 370.10,444.20 C366.50,442.61 364.55,438.32 365.85,434.89 C367.35,430.94 369.85,429.55 375.67,429.40 C378.64,429.33 381.24,429.10 381.45,428.88 C381.66,428.67 384.96,421.98 388.79,414.00 C426.22,336.04 438.70,311.24 441.39,309.48 C444.96,307.14 451.47,308.01 454.73,311.27 C459.20,315.75 458.82,320.14 452.94,332.00 C442.12,353.82 406.00,428.43 406.00,428.95 C406.00,429.25 413.98,429.36 423.73,429.18 C433.49,429.01 442.94,429.14 444.74,429.48 C451.81,430.80 454.57,438.84 449.37,442.93 C446.86,444.90 445.50,445.00 422.06,445.00 L 397.38 445.00 L 385.94 468.69 C379.65,481.72 373.38,494.65 372.00,497.42 C368.23,505.03 362.16,508.41 356.50,506.04 Z M 474.97 463.71 C473.89,461.95 473.01,460.22 473.00,459.87 C473.00,459.25 467.84,448.24 454.29,420.00 C450.47,412.02 445.14,400.84 442.46,395.13 L 437.59 384.77 L 443.54 373.40 L 449.50 362.04 L 453.75 370.77 C456.09,375.57 461.00,385.80 464.66,393.50 C468.32,401.20 474.66,414.48 478.75,423.00 C488.13,442.56 499.00,465.74 499.00,466.17 C499.00,466.35 494.03,466.60 487.96,466.71 L 476.92 466.92 L 474.97 463.71 Z"/>
        </svg>
      </div>
      <span v-if="open" style="font-size:0.92rem;font-weight:600;color:var(--text-1);white-space:nowrap">Arabel Learn</span>
    </div>

    <!-- Collapse toggle -->
    <button @click="open = !open" :style="{
      position: 'absolute', top: '24px', right: '-14px', width: '28px', height: '28px',
      borderRadius: '50%', border: '1px solid rgba(var(--rgb-border),0.08)',
      background: 'var(--bg-sidebar)', backdropFilter: 'blur(8px)',
      cursor: 'pointer', color: 'rgba(var(--rgb-text),0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none', zIndex: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    }">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <!-- Nav -->
    <nav style="display:flex;flex-direction:column;gap:2px;flex:1;overflow:hidden">
      <template v-for="section in navSections" :key="section.label">
        <div v-if="open && section.label" style="font-size:0.6rem;font-weight:700;color:rgba(var(--rgb-text),0.22);letter-spacing:0.1em;padding:10px 10px 5px;white-space:nowrap">
          {{ section.label }}
        </div>
        <div v-else-if="!open && section.label" style="height:8px" />
        <SidebarBtn v-for="item in section.items" :key="item.name" :item="item" :open="open" :active="isActive(item.name)" @click="router.push({ name: item.name })" />
      </template>
    </nav>

    <!-- User trigger -->
    <div style="border-top:1px solid rgba(var(--rgb-border),0.06);padding-top:12px;flex-shrink:0">
      <button ref="triggerRef" @click="toggleMenu" :style="{
        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
        borderRadius: '10px', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left',
        background: menuOpen ? 'rgba(99,102,241,0.12)' : 'transparent',
        transition: 'background 0.2s',
      }"
      @mouseover="e => { if(!menuOpen) e.currentTarget.style.background='rgba(var(--rgb-border),0.04)' }"
      @mouseout="e => { if(!menuOpen) e.currentTarget.style.background = menuOpen ? 'rgba(99,102,241,0.12)' : 'transparent' }">
        <div style="width:28px;height:28px;min-width:28px;border-radius:50%;background:#6366f1;border:1.5px solid rgba(var(--rgb-border),0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.65rem;font-weight:700;flex-shrink:0">
          {{ initials }}
        </div>
        <div v-if="open" style="flex:1;min-width:0;overflow:hidden">
          <div style="font-size:0.78rem;font-weight:500;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ user?.name }}</div>
          <div style="font-size:0.68rem;color:rgba(var(--rgb-text),0.35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ user?.email }}</div>
        </div>
        <svg v-if="open" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          :style="{ flexShrink: 0, stroke: 'rgba(var(--rgb-text),0.3)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'none' }">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </div>
  </aside>

  <!-- Dropdown teleported to body — never clipped by sidebar -->
  <Teleport to="body">
    <div v-if="menuOpen" @click="menuOpen = false" style="position:fixed;inset:0;z-index:199" />
    <Transition name="user-menu">
      <div v-if="menuOpen" :style="{
        position: 'fixed', zIndex: 200,
        left: menuPos.left + 'px',
        bottom: menuPos.bottom + 'px',
        minWidth: '220px',
        background: 'var(--bg-dropdown)', border: '1px solid rgba(var(--rgb-border),0.1)',
        borderRadius: '14px', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)',
      }">
        <!-- User info -->
        <div style="padding:14px 16px 12px;border-bottom:1px solid rgba(var(--rgb-border),0.06)">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:32px;height:32px;min-width:32px;border-radius:50%;background:#6366f1;border:1.5px solid rgba(var(--rgb-border),0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.7rem;font-weight:700">
              {{ initials }}
            </div>
            <div style="overflow:hidden">
              <div style="font-size:0.82rem;font-weight:600;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ user?.name }}</div>
              <div style="font-size:0.7rem;color:rgba(var(--rgb-text),0.35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ user?.email }}</div>
            </div>
          </div>
        </div>

        <button @click="goSettings" class="menu-item">
          <span v-html="icons.settings" />
          Impostazioni
        </button>

        <div style="height:1px;background:rgba(var(--rgb-border),0.05);margin:0 10px" />

        <button @click="doLogout" class="menu-item menu-item--danger">
          <span v-html="icons.logout" />
          {{ t('nav.logout') }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLocale } from '@/composables/useLocale'

const route  = useRoute()
const router = useRouter()
const auth   = useAuthStore()
const { t }  = useLocale()

const open      = ref(false)
const menuOpen  = ref(false)
const triggerRef = ref(null)
const menuPos   = ref({ left: 10, bottom: 80 })
const user      = computed(() => auth.user)

const initials = computed(() =>
  (user.value?.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
)

const icons = {
  settings: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  logout:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
}

const navSections = computed(() => [
  {
    label: 'APPRENDI',
    items: [
      { name: 'home',        label: t('nav.dashboard'),   icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>' },
      { name: 'courses',     label: t('nav.courses'),     icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
      { name: 'progressione',label: 'Progressione',       icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    ],
  },
  {
    label: 'COMUNITÀ',
    items: [
      { name: 'network', label: 'Network', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' },
    ],
  },
])

function isActive(name) {
  if (name === 'courses') return ['courses', 'course', 'lesson', 'quiz'].includes(route.name)
  return route.name === name
}

// keep navItems alias for any leftover template references
const navItems = computed(() => navSections.value.flatMap(s => s.items))

function toggleMenu() {
  if (!menuOpen.value) {
    const rect = triggerRef.value?.getBoundingClientRect()
    if (rect) {
      menuPos.value = {
        left:   rect.left,
        bottom: window.innerHeight - rect.top + 8,
      }
    }
  }
  menuOpen.value = !menuOpen.value
}

function goSettings() {
  menuOpen.value = false
  router.push({ name: 'impostazioni' })
}

async function doLogout() {
  menuOpen.value = false
  await auth.logout()
  router.push({ name: 'login' })
}

const SidebarBtn = defineComponent({
  props: ['item', 'open', 'active'],
  emits: ['click'],
  setup(props, { emit }) {
    return () => h('button', {
      onClick: () => emit('click'),
      style: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px',
        border: 'none', borderRadius: '10px', cursor: 'pointer', whiteSpace: 'nowrap',
        overflow: 'hidden', width: '100%', textAlign: 'left',
        background: props.active ? 'rgba(99,102,241,0.16)' : 'transparent',
        color: props.active ? 'var(--text-1)' : 'rgba(var(--rgb-text),0.55)',
        transition: 'background 0.2s, color 0.2s',
      },
    }, [
      h('span', {
        style: { flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', color: props.active ? '#818cf8' : 'inherit' },
        innerHTML: props.item.icon,
      }),
      props.open ? h('span', { style: { fontSize: '0.875rem', fontWeight: props.active ? 500 : 400 } }, props.item.label) : null,
    ])
  },
})
</script>

<style scoped>
.menu-item {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 11px 16px;
  border: none; background: transparent;
  color: rgba(var(--rgb-text), 0.65); font-size: 0.83rem; font-weight: 500;
  cursor: pointer; text-align: left; transition: background 0.12s;
}
.menu-item:hover { background: rgba(var(--rgb-border), 0.06); color: var(--text-1); }
.menu-item--danger { color: #f87171; }
.menu-item--danger:hover { background: rgba(248,113,113,0.08); color: #fca5a5; }
.menu-item :deep(svg) { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.75; }

.user-menu-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.user-menu-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.user-menu-enter-from   { opacity: 0; transform: translateY(8px); }
.user-menu-leave-to     { opacity: 0; transform: translateY(8px); }
</style>
