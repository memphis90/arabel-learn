# Dark/Light Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark/light mode toggle next to the language selector in `AppHeader`, with a CSS-variable-based theme system and readable (non-pastel) light colors.

**Architecture:** Define 7 CSS custom properties on `:root` (dark defaults) with `html.light` overrides. Components keep their inline-style pattern but reference `var(--token)` or `rgba(var(--rgb-token),X)` instead of hardcoded hex/rgba. A `useTheme` composable persists preference to `localStorage` and toggles the `light` class on `<html>`. A `ThemeToggle` button sits next to `LangToggle` in `AppHeader`.

**Tech Stack:** Vue 3 Composition API, CSS custom properties, localStorage

---

## Token Map

| Token | Dark | Light |
|---|---|---|
| `--bg-base` | `#05050f` | `#f1f2f8` |
| `--bg-sidebar` | `rgba(9,9,26,0.9)` | `rgba(246,247,252,0.97)` |
| `--bg-dropdown` | `rgba(12,10,32,0.98)` | `rgba(255,255,255,0.99)` |
| `--rgb-surface` | `12, 12, 28` | `255, 255, 255` |
| `--rgb-text` | `228, 230, 244` | `13, 15, 26` |
| `--rgb-border` | `255, 255, 255` | `0, 0, 0` |
| `--text-1` | `#e4e6f4` | `#0d0f1a` |

**Replacement rules** (apply in every component):
- `background:#05050f` or `background: #05050f` → `background:var(--bg-base)`
- `#e4e6f4` → `var(--text-1)`
- `rgba(228,230,244,X)` → `rgba(var(--rgb-text),X)` (keep the X)
- `rgba(255,255,255,X)` → `rgba(var(--rgb-border),X)` (keep the X) — **except** for truly white things like button text `color:#fff` or avatar bg `background:#fff`, which stay white
- `rgba(12,12,28,X)` → `rgba(var(--rgb-surface),X)` (keep the X)
- `rgba(12,10,32,X)` → `var(--bg-dropdown)` (dropdowns only, always used near opacity 0.98)
- `rgba(9,9,26,X)` → `var(--bg-sidebar)` (sidebar only)
- `background:rgba(255,255,255,0.04)` / `.05` etc in surface hover states → `rgba(var(--rgb-border),X)`
- Scrollbar: use `rgba(var(--rgb-border),0.1)` and `rgba(var(--rgb-border),0.18)`

**Do NOT replace:**
- `color:#fff` (white text on colored buttons stays white)
- `border:1.5px solid rgba(255,255,255,0.2)` on avatar rings → replace with `rgba(var(--rgb-border),0.2)` ✓
- Accent/brand colors: `#6366f1`, `#818cf8`, `#c4b5fd`, `#a5b4fc`, `#c084fc`, `#4ade80`, etc. → unchanged
- `fill="white"` on SVG logo → unchanged

---

### Task 1: CSS Variables in main.css + useTheme composable

**Files:**
- Modify: `app/src/assets/main.css`
- Create: `app/src/composables/useTheme.js`

- [ ] **Step 1: Update main.css with CSS variable tokens**

Replace the entire content of `app/src/assets/main.css`:

```css
*, *::before, *::after { box-sizing: border-box; }

:root {
  --bg-base: #05050f;
  --bg-sidebar: rgba(9,9,26,0.9);
  --bg-dropdown: rgba(12,10,32,0.98);
  --rgb-surface: 12, 12, 28;
  --rgb-text: 228, 230, 244;
  --rgb-border: 255, 255, 255;
  --text-1: #e4e6f4;
}

html.light {
  --bg-base: #f1f2f8;
  --bg-sidebar: rgba(246,247,252,0.97);
  --bg-dropdown: rgba(255,255,255,0.99);
  --rgb-surface: 255, 255, 255;
  --rgb-text: 13, 15, 26;
  --rgb-border: 0, 0, 0;
  --text-1: #0d0f1a;
}

html, body, #app {
  margin: 0; padding: 0; height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-base);
  color: var(--text-1);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(var(--rgb-border), 0.1); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(var(--rgb-border), 0.18); }

/* Syntax tokens */
.tok-kw      { color: #c792ea; }
.tok-str     { color: #c3e88d; }
.tok-comment { color: #546e7a; font-style: italic; }

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(99,102,241,0.4); }
  50%       { box-shadow: 0 0 18px rgba(99,102,241,0.7); }
}

button { font-family: inherit; }
a      { text-decoration: none; color: inherit; }
```

- [ ] **Step 2: Create useTheme.js composable**

Create `app/src/composables/useTheme.js`:

```js
import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') !== 'light')

function applyTheme(dark) {
  document.documentElement.classList.toggle('light', !dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

applyTheme(isDark.value)

watch(isDark, applyTheme)

export function useTheme() {
  return {
    isDark,
    toggle() { isDark.value = !isDark.value },
  }
}
```

- [ ] **Step 3: Verify by checking localStorage and class toggle in browser console**

No commit yet — next task adds the UI.

---

### Task 2: ThemeToggle component + AppHeader wiring

**Files:**
- Create: `app/src/components/ThemeToggle.vue`
- Modify: `app/src/components/AppHeader.vue`

- [ ] **Step 1: Create ThemeToggle.vue**

```vue
<template>
  <button @click="toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" :style="{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
    border: '1px solid rgba(var(--rgb-border),0.08)',
    background: 'transparent', cursor: 'pointer',
    color: 'rgba(var(--rgb-text),0.5)', transition: 'background 0.15s, color 0.15s',
  }"
  @mouseover="e => { e.currentTarget.style.background='rgba(var(--rgb-border),0.05)'; e.currentTarget.style.color='var(--text-1)' }"
  @mouseout="e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(var(--rgb-text),0.5)' }">
    <!-- Sun (shown in dark mode) -->
    <svg v-if="isDark" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <!-- Moon (shown in light mode) -->
    <svg v-else viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
const { isDark, toggle } = useTheme()
</script>
```

- [ ] **Step 2: Update AppHeader.vue to include ThemeToggle**

Replace the full content of `app/src/components/AppHeader.vue`:

```vue
<template>
  <header style="display:flex;align-items:center;justify-content:space-between;padding:18px 32px;flex-shrink:0;border-bottom:1px solid rgba(var(--rgb-border),0.04)">
    <div style="display:flex;align-items:center;gap:8px;font-size:0.875rem">
      <template v-for="(b, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" style="color:rgba(var(--rgb-text),0.14)">/</span>
        <button v-if="b.onClick" @click="b.onClick()" style="background:none;border:none;cursor:pointer;padding:0;font-size:inherit;color:rgba(var(--rgb-text),0.32);transition:color 0.15s"
          @mouseover="e => e.target.style.color='var(--text-1)'" @mouseout="e => e.target.style.color='rgba(var(--rgb-text),0.32)'">
          {{ b.label }}
        </button>
        <span v-else style="color:var(--text-1);font-weight:400">{{ b.label }}</span>
      </template>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <slot name="actions" />
      <ThemeToggle />
      <LangToggle />
    </div>
  </header>
</template>

<script setup>
import LangToggle   from '@/components/LangToggle.vue'
import ThemeToggle  from '@/components/ThemeToggle.vue'
defineProps({
  breadcrumbs: { type: Array, default: () => [] },
})
</script>
```

- [ ] **Step 3: Commit**

```bash
git add app/src/assets/main.css app/src/composables/useTheme.js app/src/components/ThemeToggle.vue app/src/components/AppHeader.vue
git commit -m "feat: add dark/light theme system with CSS variables and ThemeToggle"
```

---

### Task 3: Update LangToggle.vue

**Files:**
- Modify: `app/src/components/LangToggle.vue`

- [ ] **Step 1: Apply token replacements to LangToggle.vue**

Replace the full content:

```vue
<template>
  <div style="position:relative;flex-shrink:0" ref="root">
    <button @click="open = !open" :style="{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 10px', border: '1px solid rgba(var(--rgb-border),0.08)',
      borderRadius: '8px', background: open ? 'rgba(99,102,241,0.12)' : 'transparent',
      cursor: 'pointer', color: 'rgba(var(--rgb-text),0.5)', transition: 'all 0.15s',
    }"
    @mouseover="e => { if(!open) e.currentTarget.style.background='rgba(var(--rgb-border),0.05)' }"
    @mouseout="e => { if(!open) e.currentTarget.style.background='transparent' }">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span style="font-size:0.72rem;font-weight:600;letter-spacing:0.04em">{{ lang.toUpperCase() }}</span>
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
        :style="{ transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <Transition name="lang-drop">
      <div v-if="open" style="position:absolute;top:calc(100% + 6px);right:0;min-width:140px;border-radius:10px;border:1px solid rgba(var(--rgb-border),0.09);background:var(--bg-dropdown);box-shadow:0 8px 24px rgba(0,0,0,0.5);backdrop-filter:blur(16px);overflow:hidden;z-index:300">
        <button v-for="opt in options" :key="opt.code"
          @click="pick(opt.code)"
          :style="{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '10px 14px', border: 'none',
            background: lang === opt.code ? 'rgba(99,102,241,0.14)' : 'transparent',
            color: lang === opt.code ? '#c4b5fd' : 'rgba(var(--rgb-text),0.6)',
            fontSize: '0.82rem', fontWeight: lang === opt.code ? 600 : 400,
            cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
          }"
          @mouseover="e => { if(lang !== opt.code) e.currentTarget.style.background='rgba(var(--rgb-border),0.05)' }"
          @mouseout="e => { if(lang !== opt.code) e.currentTarget.style.background='transparent' }">
          <span style="font-size:1.1rem">{{ opt.flag }}</span>
          <span>{{ opt.label }}</span>
          <svg v-if="lang === opt.code" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>

  <Teleport to="body">
    <div v-if="open" @click="open = false" style="position:fixed;inset:0;z-index:299" />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { lang, setLang } = useLocale()
const open = ref(false)
const root = ref(null)

const options = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
]

function pick(code) {
  setLang(code)
  open.value = false
}
</script>

<style scoped>
.lang-drop-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.lang-drop-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.lang-drop-enter-from   { opacity: 0; transform: translateY(-6px); }
.lang-drop-leave-to     { opacity: 0; transform: translateY(-6px); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add app/src/components/LangToggle.vue
git commit -m "feat: apply theme tokens to LangToggle"
```

---

### Task 4: Update AppSidebar.vue

**Files:**
- Modify: `app/src/components/AppSidebar.vue`

Apply token replacements throughout `app/src/components/AppSidebar.vue`. The specific substitutions:

- `background: 'rgba(9,9,26,0.9)'` → `background: 'var(--bg-sidebar)'`
- `borderRight: '1px solid rgba(255,255,255,0.06)'` → `borderRight: '1px solid rgba(var(--rgb-border),0.06)'`
- `border: '1px solid rgba(255,255,255,0.08)'` → `border: '1px solid rgba(var(--rgb-border),0.08)'`
- `background: 'rgba(9,9,26,0.95)'` → `background: 'var(--bg-sidebar)'`
- `color: 'rgba(228,230,244,0.4)'` → `color: 'rgba(var(--rgb-text),0.4)'`
- `color: 'rgba(228,230,244,0.22)'` → `color: 'rgba(var(--rgb-text),0.22)'`
- `color: props.active ? '#e4e6f4' : 'rgba(228,230,244,0.55)'` → `color: props.active ? 'var(--text-1)' : 'rgba(var(--rgb-text),0.55)'`
- `color: '#e4e6f4'` (username) → `color: 'var(--text-1)'`
- `color: 'rgba(228,230,244,0.35)'` (email) → `color: 'rgba(var(--rgb-text),0.35)'`
- `stroke="rgba(228,230,244,0.3)"` → `stroke="rgba(var(--rgb-text),0.3)"`  — but SVG attributes don't support CSS vars; use `style` attribute: `style="stroke:rgba(var(--rgb-text),0.3)"`
- `'border-top:1px solid rgba(255,255,255,0.06)'` → `'border-top:1px solid rgba(var(--rgb-border),0.06)'`
- Dropdown background `'rgba(12,10,32,0.98)'` → `'var(--bg-dropdown)'`
- Dropdown border `'rgba(255,255,255,0.1)'` → `'rgba(var(--rgb-border),0.1)'`
- Dropdown inner separator `'rgba(255,255,255,0.05)'` → `'rgba(var(--rgb-border),0.05)'`
- `@mouseover`/`@mouseout` `rgba(255,255,255,X)` hover states → `rgba(var(--rgb-border),X)`
- In `<style scoped>`:
  - `.menu-item { color: rgba(228,230,244,0.65) }` → `color: rgba(var(--rgb-text),0.65)`
  - `.menu-item:hover { color: #e4e6f4 }` → `color: var(--text-1)`

- [ ] **Step 1: Edit AppSidebar.vue**

Apply all the replacements described above to `app/src/components/AppSidebar.vue`.

For the chevron SVG in the user button (line 62-63), replace `stroke="rgba(228,230,244,0.3)"` with a style attribute:
```html
<svg ... :style="{ flexShrink: 0, stroke: 'rgba(var(--rgb-text),0.3)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'none' }">
```
(Remove the `stroke` attribute and move it into the `:style` binding.)

For `<style scoped>` section, update `.menu-item`:
```css
.menu-item {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 11px 16px;
  border: none; background: transparent;
  color: rgba(var(--rgb-text),0.65); font-size: 0.83rem; font-weight: 500;
  cursor: pointer; text-align: left; transition: background 0.12s;
}
.menu-item:hover { background: rgba(var(--rgb-border),0.06); color: var(--text-1); }
.menu-item--danger { color: #f87171; }
.menu-item--danger:hover { background: rgba(248,113,113,0.08); color: #fca5a5; }
.menu-item :deep(svg) { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.75; }
```

- [ ] **Step 2: Commit**

```bash
git add app/src/components/AppSidebar.vue
git commit -m "feat: apply theme tokens to AppSidebar"
```

---

### Task 5: Update LoginView.vue

**Files:**
- Modify: `app/src/views/LoginView.vue`

- [ ] **Step 1: Apply token replacements to LoginView.vue**

Specific substitutions:

- `background:#05050f` (root div) → `background:var(--bg-base)`
- `background:rgba(12,12,28,0.8)` (card) → `background:rgba(var(--rgb-surface),0.8)`
- `border:1px solid rgba(255,255,255,0.08)` → `border:1px solid rgba(var(--rgb-border),0.08)`
- `color:#e4e6f4` (h1, google link) → `color:var(--text-1)`
- `color:rgba(228,230,244,0.4)` (subtitle) → `color:rgba(var(--rgb-text),0.4)`
- `color:rgba(228,230,244,0.45)` (inactive tab) → `color:rgba(var(--rgb-text),0.45)`
- `background:rgba(255,255,255,0.04)` (tabs bg, google btn, inputs) → `background:rgba(var(--rgb-border),0.04)`
- `background:rgba(255,255,255,0.08)` (google hover) → `background:rgba(var(--rgb-border),0.08)`
- `border:1px solid rgba(255,255,255,0.1)` (inputs, google) → `border:1px solid rgba(var(--rgb-border),0.1)`
- `color:rgba(228,230,244,0.3)` ("oppure") → `color:rgba(var(--rgb-text),0.3)`
- `background:rgba(255,255,255,0.07)` (divider lines) → `background:rgba(var(--rgb-border),0.07)`

For `inputStyle` object in `<script setup>`:
```js
const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '10px',
  border: '1px solid rgba(var(--rgb-border),0.1)', background: 'rgba(var(--rgb-border),0.04)',
  color: 'var(--text-1)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
}
```

- [ ] **Step 2: Commit**

```bash
git add app/src/views/LoginView.vue
git commit -m "feat: apply theme tokens to LoginView"
```

---

### Task 6: Update DashboardView.vue

**Files:**
- Modify: `app/src/views/DashboardView.vue`

- [ ] **Step 1: Apply token replacements to DashboardView.vue**

Apply the standard replacement rules from the Token Map at the top of this plan:
- `background:#05050f` (root wrapper) → `background:var(--bg-base)`
- All `rgba(228,230,244,X)` → `rgba(var(--rgb-text),X)`
- All `rgba(255,255,255,X)` used for borders/hover → `rgba(var(--rgb-border),X)`
- `rgba(12,12,28,0.7)` (cards, daily, leaderboard) → `rgba(var(--rgb-surface),0.7)`
- `rgba(12,12,28,0.7)` (inline `@mouseout` resets in course card) → `rgba(var(--rgb-border),0.07)` for border, `rgba(var(--rgb-surface),0.7)` for bg
- `#e4e6f4` → `var(--text-1)`

Specific items:
- Course card `@mouseout` border reset: `e.currentTarget.style.borderColor='rgba(var(--rgb-border),0.07)'`
- Leaderboard "see all" `@mouseover`/`@mouseout` color swaps: use `var(--text-1)` and `rgba(var(--rgb-border),X)`
- Progress bar track `rgba(255,255,255,0.07)` → `rgba(var(--rgb-border),0.07)`
- Progress bar track `rgba(255,255,255,0.08)` → `rgba(var(--rgb-border),0.08)`

- [ ] **Step 2: Commit**

```bash
git add app/src/views/DashboardView.vue
git commit -m "feat: apply theme tokens to DashboardView"
```

---

### Task 7: Update CoursesView.vue + remaining views

**Files:**
- Modify: `app/src/views/CoursesView.vue`
- Modify: `app/src/views/CourseView.vue`
- Modify: `app/src/views/LessonView.vue`
- Modify: `app/src/views/QuizView.vue`
- Modify: `app/src/views/LeaderboardView.vue`
- Modify: `app/src/views/FriendsView.vue`
- Modify: `app/src/views/ProfileView.vue`
- Modify: `app/src/views/ProgressionView.vue`
- Modify: `app/src/views/CertificatesView.vue`

- [ ] **Step 1: Update CoursesView.vue**

Apply the standard replacement rules:
- `background:#05050f` (root) → `background:var(--bg-base)`
- `rgba(228,230,244,X)` → `rgba(var(--rgb-text),X)` throughout
- `rgba(255,255,255,X)` borders/hover/progress-track → `rgba(var(--rgb-border),X)`
- `rgba(12,12,28,X)` → `rgba(var(--rgb-surface),X)` (course cards, coming-soon cards)
- `#e4e6f4` → `var(--text-1)`
- In `@mouseout` border reset: `e.currentTarget.style.borderColor='rgba(var(--rgb-border),0.07)'`

- [ ] **Step 2: Update remaining views (CourseView, LessonView, QuizView, LeaderboardView, FriendsView, ProfileView, ProgressionView, CertificatesView)**

For each file, apply the same 5 standard replacement rules:
1. `background:#05050f` → `background:var(--bg-base)`
2. `rgba(228,230,244,X)` → `rgba(var(--rgb-text),X)`
3. `rgba(255,255,255,X)` (borders/hover/tracks, not `color:#fff`) → `rgba(var(--rgb-border),X)`
4. `rgba(12,12,28,X)` and `rgba(12,10,32,X)` → `rgba(var(--rgb-surface),X)`
5. `#e4e6f4` → `var(--text-1)`

- [ ] **Step 3: Commit**

```bash
git add app/src/views/
git commit -m "feat: apply theme tokens to all views"
```

---

### Task 8: Update smaller components

**Files:**
- Modify: `app/src/components/XPBar.vue`
- Modify: `app/src/components/XPToast.vue`
- Modify: `app/src/components/LevelBadge.vue`
- Modify: `app/src/components/StreakFlame.vue`
- Modify: `app/src/components/CodeBlock.vue`
- Modify: `app/src/components/TryItEditor.vue`
- Modify: `app/src/components/StarBackground.vue`

- [ ] **Step 1: Update XPBar.vue**

Two replacements:
- `color:rgba(228,230,244,0.5)` → `color:rgba(var(--rgb-text),0.5)`
- `background:rgba(255,255,255,0.08)` (track) → `background:rgba(var(--rgb-border),0.08)`

- [ ] **Step 2: Update XPToast.vue, LevelBadge.vue, StreakFlame.vue, CodeBlock.vue, TryItEditor.vue**

Apply standard replacement rules to each file. These components likely use `rgba(228,230,244,X)`, `rgba(255,255,255,X)` and `#e4e6f4` in their styles.

- [ ] **Step 3: Update StarBackground.vue**

The star background is built for dark mode. In light mode it should be hidden or show very subtle dots. Add:

After reading the component, add a theme-aware conditional. If it renders a `<canvas>` or CSS stars, wrap it with `v-if="isDark"` or reduce opacity in light mode:

```vue
<script setup>
import { useTheme } from '@/composables/useTheme'
const { isDark } = useTheme()
</script>
```

Then on the root element add `:style="{ opacity: isDark ? 1 : 0 }"` or `v-if="isDark"` so stars don't show on a light background.

- [ ] **Step 4: Commit**

```bash
git add app/src/components/
git commit -m "feat: apply theme tokens to small components"
```

---

### Task 9: Manual verification

- [ ] **Step 1: Start dev server**

```bash
cd /Users/alessiocotroneo/Desktop/Projects/ulitity/learn/app && npm run dev
```

- [ ] **Step 2: Verify dark mode (default)**

Open `http://localhost:5173` in browser. Confirm:
- Page background is near-black `#05050f`
- All text, borders, and surfaces look identical to pre-change

- [ ] **Step 3: Toggle to light mode**

Click the sun/moon icon next to the language selector. Confirm:
- Background switches to `#f1f2f8`
- Text is near-black `#0d0f1a`, readable, not pastel
- Sidebar becomes light `rgba(246,247,252,0.97)`
- Dropdowns (LangToggle, user menu) are white/near-white
- Buttons, borders, and cards are clearly visible
- Accent colors (indigo, purple, green) remain unchanged

- [ ] **Step 4: Verify persistence**

Reload page — light mode should be remembered (localStorage).

- [ ] **Step 5: Check all routes**

Navigate through Dashboard, Courses, Login — confirm no dark hardcoded colors leak through in light mode.

- [ ] **Step 6: Final commit if any hotfixes applied**

```bash
git add -p
git commit -m "fix: theme token cleanup after manual verification"
```
