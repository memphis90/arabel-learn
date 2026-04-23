# ProgressionView — Charts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere grafici ApexCharts alla ProgressionView: donut per corsi, progress bar per carriere, grid badge, bar chart mockup per tempo studio.

**Architecture:** Tutto in `ProgressionView.vue` — nessun componente separato. Costanti `CAREER_PATHS` e `ALL_BADGES` definite nello stesso file. ApexCharts importato per-componente. Dati calcolati in computed da `learn.completed` e `auth.stats.badges`.

**Tech Stack:** Vue 3 Composition API, vue3-apexcharts, apexcharts, Pinia stores esistenti.

---

## File Map

| File | Azione | Responsabilità |
|------|--------|----------------|
| `package.json` | Modify | Aggiungere `apexcharts` e `vue3-apexcharts` |
| `app/src/views/ProgressionView.vue` | Modify | Aggiungere tutte le sezioni grafici |

---

## Task 1: Installare ApexCharts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Installare le dipendenze**

```bash
npm install apexcharts vue3-apexcharts
```

- [ ] **Step 2: Verificare che siano in package.json**

Aprire `package.json` e confermare che esistano:
```json
"apexcharts": "^x.x.x",
"vue3-apexcharts": "^x.x.x"
```

- [ ] **Step 3: Avviare il dev server e verificare nessun errore**

```bash
npm run dev
```

Atteso: server parte senza errori.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add apexcharts and vue3-apexcharts"
```

---

## Task 2: Aggiungere costanti e computed al ProgressionView

**Files:**
- Modify: `app/src/views/ProgressionView.vue`

- [ ] **Step 1: Aggiungere import ApexCharts**

Nel `<script setup>` di `ProgressionView.vue`, dopo gli import esistenti aggiungere:

```js
import VueApexCharts from 'vue3-apexcharts'
```

- [ ] **Step 2: Aggiungere la costante CAREER_PATHS**

Nello `<script setup>`, dopo gli import:

```js
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
    emoji: '🖥️',
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
    emoji: '🗄️',
    items: ['sql-1-1','sql-1-2','sql-1-3','sql-1-q','sql-2-1','sql-2-2','sql-2-3','sql-2-q','sql-3-1','sql-3-2','sql-3-3','sql-3-q'],
  },
  {
    id: 'data_engineer',
    name: 'Data Engineer',
    emoji: '📊',
    items: ['sql-1-1','sql-1-2','sql-1-3','sql-1-q','sql-2-1','sql-2-2','sql-2-3','sql-2-q','sql-3-1','sql-3-2','sql-3-3','sql-3-q','redis-1-1','redis-1-2','redis-1-3','redis-1-q','redis-2-1','redis-2-2','redis-2-3','redis-2-q'],
  },
]
```

- [ ] **Step 3: Aggiungere la costante ALL_BADGES**

Nello `<script setup>`, dopo `CAREER_PATHS`:

```js
const ALL_BADGES = [
  { id: 'first_lesson',    emoji: '🌱', name: 'Prima Lezione',     description: 'Completa la tua prima lezione' },
  { id: 'streak_3',        emoji: '🔥', name: 'Streak 3 giorni',   description: '3 giorni consecutivi di studio' },
  { id: 'streak_7',        emoji: '⚡', name: 'Streak 7 giorni',   description: '7 giorni consecutivi di studio' },
  { id: 'node_beginner',   emoji: '🟢', name: 'Node Beginner',     description: 'Completa 5 lezioni Node.js' },
  { id: 'quiz_ace',        emoji: '🏅', name: 'Quiz Ace',          description: 'Tutte le risposte corrette in un quiz' },
  { id: 'junior_frontend', emoji: '🎨', name: 'Frontend Junior',   description: 'Completa il percorso Frontend Junior' },
  { id: 'mid_frontend',    emoji: '🖥️', name: 'Frontend Mid',      description: 'Completa il percorso Frontend Mid' },
  { id: 'junior_backend',  emoji: '⚙️', name: 'Backend JS Junior', description: 'Completa il percorso Backend JS Junior' },
  { id: 'mid_backend_js',  emoji: '🔧', name: 'Backend JS Mid',    description: 'Completa il percorso Backend JS Mid' },
  { id: 'junior_php',      emoji: '🐘', name: 'PHP Junior',        description: 'Completa il percorso PHP Junior' },
  { id: 'mid_php',         emoji: '🐘', name: 'PHP Mid',           description: 'Completa il percorso PHP Mid' },
  { id: 'devops_starter',  emoji: '🚀', name: 'DevOps Starter',    description: 'Completa il percorso DevOps Starter' },
  { id: 'devops_engineer', emoji: '🛠️', name: 'DevOps Engineer',   description: 'Completa il percorso DevOps Engineer' },
  { id: 'full_stack_js',   emoji: '🌐', name: 'Full Stack JS',     description: 'Completa il percorso Full Stack JS' },
  { id: 'sql_master',      emoji: '🗄️', name: 'SQL Master',        description: 'Completa tutti i livelli SQL' },
  { id: 'data_engineer',   emoji: '📊', name: 'Data Engineer',     description: 'Completa il percorso Data Engineer' },
]
```

- [ ] **Step 4: Aggiungere computed careerStats**

Nella sezione computed dello `<script setup>`, dopo `activeCourseStats`:

```js
const careerStats = computed(() =>
  CAREER_PATHS.map(career => {
    const done = career.items.filter(id => learn.isCompleted(id)).length
    const total = career.items.length
    const pct = Math.round((done / total) * 100)
    const unlocked = pct === 100
    return { ...career, done, total, pct, unlocked }
  })
)
```

- [ ] **Step 5: Aggiungere computed earnedBadges e studyTimeMockup**

```js
const earnedBadges = computed(() => {
  const earned = new Set(auth.stats.badges || [])
  return ALL_BADGES.map(b => ({ ...b, earned: earned.has(b.id) }))
})

const studyTimeMockup = computed(() => {
  // TODO: real data needs session tracking (login/logout timestamps) from backend
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  const seed = (n) => ((week * 31 + n * 17) % 91) + 10
  return [0, 1, 2, 3, 4, 5, 6].map(seed)
})
```

- [ ] **Step 6: Verificare nessun errore console**

Aprire `http://localhost:5174/progressione` nel browser. Nessun errore Vue/JS in console.

- [ ] **Step 7: Commit**

```bash
git add app/src/views/ProgressionView.vue
git commit -m "feat(progressione): add constants and computed for charts"
```

---

## Task 3: Sezione Progressione Corsi (donut radialBar)

**Files:**
- Modify: `app/src/views/ProgressionView.vue`

- [ ] **Step 1: Aggiungere funzione chartOptions per i donut**

Nello `<script setup>`:

```js
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
```

- [ ] **Step 2: Sostituire la sezione "Per corso" nel template**

Trovare il blocco `<!-- Per corso -->` e sostituirlo con:

```html
<!-- Progressione Corsi -->
<h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">PROGRESSIONE CORSI</h2>

<div v-if="activeCourseStats.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-bottom:40px">
  <div v-for="course in activeCourseStats" :key="course.id"
    style="padding:20px 16px 16px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;align-items:center;gap:8px">
    <VueApexCharts
      type="radialBar"
      height="140"
      :options="courseChartOptions(course.colorRgb)"
      :series="[course.pct]"
    />
    <div style="font-size:0.82rem;font-weight:600;color:#e4e6f4;text-align:center;line-height:1.3">{{ course.name }}</div>
    <div style="font-size:0.7rem;color:rgba(228,230,244,0.35)">{{ course.done }}/{{ course.total }} lezioni</div>
  </div>
</div>

<div v-else style="text-align:center;padding:48px;color:rgba(228,230,244,0.25);font-size:0.875rem;margin-bottom:40px;border-radius:14px;background:rgba(12,12,28,0.4);border:1px solid rgba(255,255,255,0.04)">
  Inizia un corso per vedere la tua progressione
</div>
```

- [ ] **Step 3: Aggiungere `VueApexCharts` al template (componente non globale)**

Verificare che `VueApexCharts` sia usabile nel template — con l'import per-componente di Task 2 funziona direttamente.

- [ ] **Step 4: Verificare visivamente**

Aprire `http://localhost:5174/progressione`. Donut chart visibili per ogni corso avviato, colori corretti, percentuale al centro.

- [ ] **Step 5: Commit**

```bash
git add app/src/views/ProgressionView.vue
git commit -m "feat(progressione): add course donut radialBar charts"
```

---

## Task 4: Sezione Carriere

**Files:**
- Modify: `app/src/views/ProgressionView.vue`

- [ ] **Step 1: Aggiungere sezione carriere nel template**

Dopo il blocco dei corsi (dopo il div con empty state), aggiungere:

```html
<!-- Carriere -->
<h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">PERCORSI DI CARRIERA</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:10px;margin-bottom:40px">
  <div v-for="career in careerStats" :key="career.id"
    style="padding:16px 20px;border-radius:14px;background:rgba(12,12,28,0.6);border:1px solid rgba(255,255,255,0.06)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:1.3rem">{{ career.emoji }}</span>
        <span style="font-size:0.88rem;font-weight:600;color:#e4e6f4">{{ career.name }}</span>
      </div>
      <div v-if="career.unlocked"
        style="font-size:0.68rem;font-weight:700;color:#86efac;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:3px 8px;border-radius:99px">
        ✓ Sbloccato
      </div>
      <div v-else :style="{ fontSize:'0.75rem', fontWeight:700, color: career.pct > 0 ? '#a5b4fc' : 'rgba(228,230,244,0.3)' }">
        {{ career.pct }}%
      </div>
    </div>
    <div style="height:5px;border-radius:99px;background:rgba(255,255,255,0.06);overflow:hidden;margin-bottom:6px">
      <div :style="{
        height: '100%',
        width: career.pct + '%',
        background: career.unlocked ? '#22c55e' : '#6366f1',
        borderRadius: '99px',
        transition: 'width 0.6s ease',
      }" />
    </div>
    <div style="font-size:0.68rem;color:rgba(228,230,244,0.3)">{{ career.done }}/{{ career.total }} item completati</div>
  </div>
</div>
```

- [ ] **Step 2: Verificare visivamente**

Aprire `http://localhost:5174/progressione`. 11 card carriere visibili, barre progress proporzionali, badge "Sbloccato" verde se 100%.

- [ ] **Step 3: Commit**

```bash
git add app/src/views/ProgressionView.vue
git commit -m "feat(progressione): add careers progress section"
```

---

## Task 5: Sezione Badge

**Files:**
- Modify: `app/src/views/ProgressionView.vue`

- [ ] **Step 1: Aggiungere sezione badge nel template**

Dopo la sezione carriere:

```html
<!-- Badge -->
<h2 style="margin:0 0 16px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">BADGE</h2>

<!-- Empty state banner (mostrato SOLO se nessun badge guadagnato) -->
<div v-if="!auth.stats.badges?.length"
  style="display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:14px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15);margin-bottom:16px">
  <span style="font-size:1.5rem">🏅</span>
  <div>
    <div style="font-size:0.88rem;font-weight:600;color:#e4e6f4;margin-bottom:2px">Nessun badge ancora</div>
    <div style="font-size:0.78rem;color:rgba(228,230,244,0.4)">Completa una lezione per ottenere il tuo primo badge</div>
  </div>
</div>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:40px">
  <div v-for="badge in earnedBadges" :key="badge.id"
    :style="{
      padding: '18px 14px',
      borderRadius: '14px',
      background: badge.earned ? 'rgba(99,102,241,0.1)' : 'rgba(12,12,28,0.5)',
      border: badge.earned ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.04)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      textAlign: 'center',
      opacity: badge.earned ? 1 : 0.4,
      transition: 'opacity 0.2s',
      position: 'relative',
    }">
    <span style="font-size:1.8rem;line-height:1">{{ badge.emoji }}</span>
    <div style="font-size:0.75rem;font-weight:600;color:#e4e6f4;line-height:1.3">{{ badge.name }}</div>
    <div style="font-size:0.65rem;color:rgba(228,230,244,0.4);line-height:1.4">{{ badge.description }}</div>
    <!-- Lucchetto sui badge non guadagnati -->
    <div v-if="!badge.earned"
      style="position:absolute;top:10px;right:10px;font-size:0.7rem;opacity:0.5">🔒</div>
    <!-- Glow sui badge guadagnati -->
    <div v-if="badge.earned"
      style="position:absolute;top:8px;right:8px;font-size:0.7rem">✓</div>
  </div>
</div>
```

- [ ] **Step 2: Verificare visivamente**

Aprire `http://localhost:5174/progressione`. Grid di 16 badge: quelli guadagnati colorati con ✓, quelli locked grigi con 🔒. Se nessun badge → banner sopra la grid.

- [ ] **Step 3: Commit**

```bash
git add app/src/views/ProgressionView.vue
git commit -m "feat(progressione): add badges grid section"
```

---

## Task 6: Sezione Tempo di Studio (mockup bar chart)

**Files:**
- Modify: `app/src/views/ProgressionView.vue`

- [ ] **Step 1: Aggiungere funzione studyChartOptions nello script**

```js
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
```

- [ ] **Step 2: Aggiungere sezione studio time nel template**

Dopo la sezione badge:

```html
<!-- Tempo di Studio -->
<h2 style="margin:0 0 4px;font-size:0.72rem;font-weight:700;color:rgba(228,230,244,0.32);letter-spacing:0.1em">TEMPO DI STUDIO</h2>
<div style="font-size:0.72rem;color:rgba(228,230,244,0.25);margin-bottom:16px">Ultimi 7 giorni · minuti</div>

<div style="padding:20px;border-radius:14px;background:rgba(12,12,28,0.7);border:1px solid rgba(255,255,255,0.06);margin-bottom:16px">
  <VueApexCharts
    type="bar"
    height="200"
    :options="studyChartOptions"
    :series="[{ name: 'Minuti', data: studyTimeMockup }]"
  />
</div>

<!-- Banner mockup -->
<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);margin-bottom:40px">
  <span style="font-size:0.9rem">⚠️</span>
  <span style="font-size:0.78rem;color:rgba(251,191,36,0.7)">Dato simulato — il tracking reale del tempo di studio arriverà prossimamente</span>
</div>
```

- [ ] **Step 3: Verificare visivamente**

Aprire `http://localhost:5174/progressione`. Bar chart visibile con 7 barre (Lun–Dom), valori mockup, gradient indigo, banner warning sotto.

- [ ] **Step 4: Verificare responsive**

Restringere la finestra del browser a ~768px. Le grid si adattano correttamente (auto-fill). Nessun overflow orizzontale.

- [ ] **Step 5: Commit finale**

```bash
git add app/src/views/ProgressionView.vue
git commit -m "feat(progressione): add study time mockup bar chart"
```

---

## Self-Review Checklist

- [x] Sezione corsi donut → Task 3 ✓
- [x] Sezione carriere progress → Task 4 ✓
- [x] Sezione badge grid con locked/unlocked → Task 5 ✓
- [x] Empty state badge → Task 5 ✓
- [x] Bar chart mockup studio time → Task 6 ✓
- [x] Banner "dato simulato" → Task 6 ✓
- [x] TODO comment nel codice → Task 2 Step 5 ✓
- [x] ApexCharts installato → Task 1 ✓
- [x] Nessun componente separato → tutto in ProgressionView.vue ✓
- [x] `VueApexCharts` usato come nome componente coerente in tutti i task ✓
- [x] `studyChartOptions` definito in Task 6 Step 1 prima di essere usato in Step 2 ✓
- [x] `courseChartOptions` definito come funzione in Task 3 Step 1 prima di essere usato in Step 2 ✓
