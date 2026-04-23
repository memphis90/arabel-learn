# ProgressionView — Charts & Visualizations

**Date:** 2026-04-23
**Scope:** Aggiunta grafici e sezioni alla view `/progressione` usando ApexCharts (vue3-apexcharts).

---

## 1. Dipendenze

Install `vue3-apexcharts` e `apexcharts`. Registrare globalmente in `main.js` oppure importare per-componente in `ProgressionView.vue`.

---

## 2. Sezioni (dall'alto in basso)

### 2.1 Stats globali _(già esistente, invariata)_

Grid con XP totali, streak giorni, lezioni completate, corsi completati.

### 2.2 Progressione Corsi

- **Componente:** `apexchart` type `radialBar`
- **Dati:** `activeCourseStats` (computed già esistente) — corsi con `done > 0`
- **Layout:** grid responsive `repeat(auto-fill, minmax(160px, 1fr))`, ogni cella contiene un donut + nome corso + label `done/total`
- **Colore:** `rgb(course.colorRgb)` per ogni anello
- **Config chart:** `hollow.size: 60%`, `dataLabels` mostra `%` al centro, niente legenda, niente toolbar
- **Empty state:** se nessun corso avviato → card con testo "Inizia un corso per vedere la progressione"

### 2.3 Carriere

11 percorsi definiti come costante `CAREER_PATHS` in `ProgressionView.vue`:

| ID | Nome | Emoji | Item richiesti |
|----|------|-------|----------------|
| `junior_frontend` | Frontend Junior | 🎨 | vue-1-1..4, vue-1-q, ts-1-1..3, ts-1-q |
| `mid_frontend` | Frontend Mid | 🖥️ | + vue-2-x, nuxt-3-x, ts-2-x |
| `junior_backend` | Backend JS Junior | ⚙️ | nodejs-1-x, express-1-x, sql-1-x |
| `mid_backend_js` | Backend JS Mid | 🔧 | + nodejs-2..3-x, express-2-x |
| `junior_php` | PHP Junior | 🐘 | php-1-x |
| `mid_php` | PHP Mid | 🐘 | + php-2-x, sql-2-x |
| `devops_starter` | DevOps Starter | 🚀 | git-1-x, linux-1-x |
| `devops_engineer` | DevOps Engineer | 🛠️ | + git-2..3-x, linux-2..3-x, cicd-1..3-x |
| `full_stack_js` | Full Stack JS | 🌐 | vue-1..2-x, nuxt-3-x, nodejs-1..2-x, express-1..2-x |
| `sql_master` | SQL Master | 🗄️ | sql-1..3-x |
| `data_engineer` | Data Engineer | 📊 | sql-1..3-x, redis-1..2-x |

- **Visualizzazione:** lista verticale, ogni riga ha emoji + nome + barra progress (altezza 6px, colore indigo `#6366f1`) + label `X/Y completati` + badge "✓ Sbloccato" se 100%
- **Tutte le carriere mostrate** anche a 0% (motivazionale)
- **Dati:** computed da `learn.completed` (array di item_id)

### 2.4 Badge

- **Layout:** grid `repeat(auto-fill, minmax(140px, 1fr))`
- **16 badge definiti** come costante `ALL_BADGES` con `id`, `emoji`, `name`, `description`
- **Stato earned:** `auth.stats.badges.includes(badge.id)`
- **Card earned:** sfondo con glow colorato (`rgba(99,102,241,0.12)`), emoji a piena opacità, nome in `--text-1`
- **Card locked:** sfondo grigio scuro, emoji e testo a `0.3` opacità, icona lucchetto sovrapposta
- **Empty state banner:** se `auth.stats.badges.length === 0` → banner sopra la grid: "Completa una lezione per ottenere il tuo primo badge 🏅"

### 2.5 Tempo di Studio _(mockup)_

- **Componente:** `apexchart` type `bar`
- **Dati:** 7 valori mockup (minuti, ultimi 7 giorni), generati con seed stabile basato sulla settimana corrente
- **Asse X:** nomi giorni (Lun–Dom)
- **Asse Y:** minuti (0–120)
- **Colore barre:** `#6366f1` con gradient
- **Tema:** dark, sfondo trasparente
- **Banner sotto chart:** "⚠️ Dato simulato — il tracking reale del tempo di studio arriverà prossimamente"
- **Commento nel codice:** `// TODO: real data needs session tracking (login/logout timestamps) from backend`

---

## 3. Architettura

Tutto in `ProgressionView.vue`. Nessun componente separato (i chart sono semplici e usa-e-getta). Le costanti `CAREER_PATHS` e `ALL_BADGES` sono definite nello stesso file nello `<script setup>`.

ApexCharts importato per-componente (no global registration) per non appesantire il bundle iniziale.

---

## 4. Tema / Stile

- Dark theme ApexCharts: `theme: { mode: 'dark' }`, `background: 'transparent'`
- Font: stesso del resto dell'app (system-ui)
- Colori coerenti con il design system esistente (`--bg-base`, `--text-1`, `rgba(var(--rgb-border)...)`)

---

## 5. Non incluso in scope

- Tracking reale tempo di studio (backend, login/logout timestamps)
- Chart interattivi con drill-down
- Filtri per periodo temporale
- Esportazione dati
