/**
 * Learn data as ES module.
 * Source of truth: arabel-learn/data.js + extra-lessons.js (legacy scripts).
 * This file mirrors the same data with proper ES module exports for the Vue app.
 */

export const courses = [

  // ── FRONTEND ──────────────────────────────────────────────────────────────

  {
    id: 'html-css', name: 'HTML & CSS', tagline: 'Le fondamenta del web',
    color: '#f97316', colorRgb: '249,115,22', category: 'Frontend', comingSoon: true,
    levels: [],
  },
  {
    id: 'javascript', name: 'JavaScript', tagline: 'Il linguaggio del web',
    color: '#eab308', colorRgb: '234,179,8', category: 'Frontend', comingSoon: true,
    levels: [],
  },
  {
    id: 'typescript', name: 'TypeScript', tagline: 'Typed superset of JavaScript',
    color: '#3b82f6', colorRgb: '59,130,246', category: 'Frontend',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'ts-1-1', type: 'lesson', title: 'Tipi primitivi', xp: 10 },
        { id: 'ts-1-2', type: 'lesson', title: 'Interfacce e Type', xp: 10 },
        { id: 'ts-1-3', type: 'lesson', title: 'Generics', xp: 15 },
        { id: 'ts-1-q', type: 'quiz',   title: 'Quiz: TS Principiante', xp: 30 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'ts-2-1', type: 'lesson', title: 'Union & Intersection Types', xp: 15 },
        { id: 'ts-2-2', type: 'lesson', title: 'Utility Types', xp: 15 },
        { id: 'ts-2-3', type: 'lesson', title: 'Decorators', xp: 20 },
        { id: 'ts-2-q', type: 'quiz',   title: 'Quiz: TS Avanzato', xp: 40 },
      ]},
    ],
  },
  {
    id: 'vue-nuxt', name: 'Vue.js & Nuxt', tagline: 'Dal componente reattivo alla web app SSR',
    color: '#06b6d4', colorRgb: '6,182,212', category: 'Frontend',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'vue-1-1', type: 'lesson', title: 'Template e Reattività', xp: 10 },
        { id: 'vue-1-2', type: 'lesson', title: 'Composition API', xp: 10 },
        { id: 'vue-1-3', type: 'lesson', title: 'Componenti e Props', xp: 10 },
        { id: 'vue-1-4', type: 'lesson', title: 'Direttive e v-model', xp: 10 },
        { id: 'vue-1-q', type: 'quiz',   title: 'Quiz: Vue Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'vue-2-1', type: 'lesson', title: 'Pinia Store', xp: 15 },
        { id: 'vue-2-2', type: 'lesson', title: 'Vue Router', xp: 15 },
        { id: 'vue-2-3', type: 'lesson', title: 'Composables', xp: 15 },
        { id: 'vue-2-4', type: 'lesson', title: 'Watch, WatchEffect e Lifecycle', xp: 15 },
        { id: 'vue-2-q', type: 'quiz',   title: 'Quiz: Vue Intermedio', xp: 40 },
      ]},
      { name: 'Avanzato — Nuxt.js', tier: 'advanced', items: [
        { id: 'nuxt-3-1', type: 'lesson', title: 'SSR e File-based Routing', xp: 20 },
        { id: 'nuxt-3-2', type: 'lesson', title: 'Server Routes & API', xp: 20 },
        { id: 'nuxt-3-3', type: 'lesson', title: 'useFetch e useAsyncData', xp: 20 },
        { id: 'nuxt-3-4', type: 'lesson', title: 'SEO, Performance e Deploy', xp: 20 },
        { id: 'nuxt-3-q', type: 'quiz',   title: 'Quiz: Nuxt.js', xp: 50 },
      ]},
    ],
  },
  {
    id: 'react', name: 'React & Next.js', tagline: 'UI components e SSR con il meta-framework più diffuso',
    color: '#38bdf8', colorRgb: '56,189,248', category: 'Frontend', comingSoon: true,
    levels: [],
  },
  {
    id: 'svelte', name: 'Svelte', tagline: 'Framework compilato, zero runtime overhead',
    color: '#ff3e00', colorRgb: '255,62,0', category: 'Frontend', comingSoon: true,
    levels: [],
  },
  {
    id: 'tailwind', name: 'Tailwind CSS', tagline: 'Utility-first CSS framework',
    color: '#0ea5e9', colorRgb: '14,165,233', category: 'Frontend', comingSoon: true,
    levels: [],
  },

  // ── BACKEND ───────────────────────────────────────────────────────────────

  {
    id: 'nodejs', name: 'Node.js', tagline: 'Server-side JavaScript runtime',
    color: '#22c55e', colorRgb: '34,197,94', category: 'Backend',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'nodejs-1-1', type: 'lesson', title: "Cos'è Node.js?", xp: 10 },
        { id: 'nodejs-1-2', type: 'lesson', title: 'Il tuo primo server HTTP', xp: 10 },
        { id: 'nodejs-1-3', type: 'lesson', title: 'Moduli e require()', xp: 10 },
        { id: 'nodejs-1-q', type: 'quiz',   title: 'Quiz: Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'nodejs-2-1', type: 'lesson', title: 'Modulo fs — lettura e scrittura file', xp: 10 },
        { id: 'nodejs-2-2', type: 'lesson', title: 'Modulo http avanzato', xp: 10 },
        { id: 'nodejs-2-3', type: 'lesson', title: "path, os e variabili d'ambiente", xp: 10 },
        { id: 'nodejs-2-4', type: 'lesson', title: 'npm e gestione pacchetti', xp: 10 },
        { id: 'nodejs-2-q', type: 'quiz',   title: 'Quiz: Intermedio', xp: 30 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'nodejs-3-1', type: 'lesson', title: 'Callbacks & Promises', xp: 15 },
        { id: 'nodejs-3-2', type: 'lesson', title: 'async/await in Node', xp: 15 },
        { id: 'nodejs-3-3', type: 'lesson', title: 'Streams e Pipe', xp: 15 },
        { id: 'nodejs-3-4', type: 'lesson', title: 'Worker Threads e Cluster', xp: 20 },
        { id: 'nodejs-3-5', type: 'lesson', title: 'Debugging e Performance', xp: 20 },
        { id: 'nodejs-3-q', type: 'quiz',   title: 'Quiz: Avanzato', xp: 40 },
      ]},
    ],
  },
  {
    id: 'express', name: 'Express', tagline: 'Fast, unopinionated web framework',
    color: '#f59e0b', colorRgb: '245,158,11', category: 'Backend',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'express-1-1', type: 'lesson', title: 'Setup Express', xp: 10 },
        { id: 'express-1-2', type: 'lesson', title: 'Routes e metodi HTTP', xp: 10 },
        { id: 'express-1-3', type: 'lesson', title: 'Middleware', xp: 10 },
        { id: 'express-1-q', type: 'quiz',   title: 'Quiz: Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'express-2-1', type: 'lesson', title: 'Router modulare', xp: 15 },
        { id: 'express-2-2', type: 'lesson', title: 'Error handling', xp: 15 },
        { id: 'express-2-3', type: 'lesson', title: 'Auth con JWT', xp: 20 },
        { id: 'express-2-q', type: 'quiz',   title: 'Quiz: Intermedio', xp: 40 },
      ]},
    ],
  },
  {
    id: 'python', name: 'Python', tagline: 'Versatile, leggibile, potente',
    color: '#facc15', colorRgb: '250,204,21', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'fastapi', name: 'FastAPI', tagline: 'API moderne con Python e tipizzazione',
    color: '#10b981', colorRgb: '16,185,129', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'php', name: 'PHP', tagline: 'Il linguaggio del web server-side',
    color: '#8b5cf6', colorRgb: '139,92,246', category: 'Backend',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'php-1-1', type: 'lesson', title: 'Sintassi base PHP', xp: 10 },
        { id: 'php-1-2', type: 'lesson', title: 'Array e funzioni', xp: 10 },
        { id: 'php-1-3', type: 'lesson', title: 'Classi e OOP', xp: 10 },
        { id: 'php-1-q', type: 'quiz',   title: 'Quiz: PHP Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'php-2-1', type: 'lesson', title: 'Superglobali e form', xp: 15 },
        { id: 'php-2-2', type: 'lesson', title: 'PDO e MySQL', xp: 15 },
        { id: 'php-2-3', type: 'lesson', title: 'Sessioni e autenticazione', xp: 15 },
        { id: 'php-2-q', type: 'quiz',   title: 'Quiz: PHP Intermedio', xp: 40 },
      ]},
    ],
  },
  {
    id: 'laravel', name: 'Laravel', tagline: 'Il framework PHP elegante per artisans',
    color: '#ef4444', colorRgb: '239,68,68', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'livewire', name: 'Livewire', tagline: 'UI reattive full-stack senza JavaScript',
    color: '#fb923c', colorRgb: '251,146,60', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'filament', name: 'Filament', tagline: 'Admin panel e CRUD per Laravel',
    color: '#f43f5e', colorRgb: '244,63,94', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'go', name: 'Go', tagline: 'Velocità e semplicità per i sistemi moderni',
    color: '#06b6d4', colorRgb: '6,182,212', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'java', name: 'Java', tagline: 'Robusto, portabile, enterprise-ready',
    color: '#f97316', colorRgb: '249,115,22', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'csharp', name: 'C# / .NET', tagline: 'Il potere di Microsoft per app e API',
    color: '#a855f7', colorRgb: '168,85,247', category: 'Backend', comingSoon: true,
    levels: [],
  },
  {
    id: 'rails', name: 'Ruby on Rails', tagline: 'Convention over configuration',
    color: '#dc2626', colorRgb: '220,38,38', category: 'Backend', comingSoon: true,
    levels: [],
  },

  // ── DATABASE ──────────────────────────────────────────────────────────────

  {
    id: 'sql', name: 'SQL & MySQL', tagline: 'Interroga e gestisci dati relazionali',
    color: '#3b82f6', colorRgb: '59,130,246', category: 'Database',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'sql-1-1', type: 'lesson', title: 'SELECT e FROM', xp: 10 },
        { id: 'sql-1-2', type: 'lesson', title: 'WHERE e filtri', xp: 10 },
        { id: 'sql-1-3', type: 'lesson', title: 'ORDER BY e LIMIT', xp: 10 },
        { id: 'sql-1-q', type: 'quiz',   title: 'Quiz: SQL Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'sql-2-1', type: 'lesson', title: 'JOIN tra tabelle', xp: 15 },
        { id: 'sql-2-2', type: 'lesson', title: 'GROUP BY e aggregazioni', xp: 15 },
        { id: 'sql-2-3', type: 'lesson', title: 'Subquery', xp: 15 },
        { id: 'sql-2-q', type: 'quiz',   title: 'Quiz: SQL Intermedio', xp: 40 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'sql-3-1', type: 'lesson', title: 'Indici e performance', xp: 20 },
        { id: 'sql-3-2', type: 'lesson', title: 'Transazioni e ACID', xp: 20 },
        { id: 'sql-3-3', type: 'lesson', title: 'Views e Stored Procedures', xp: 20 },
        { id: 'sql-3-q', type: 'quiz',   title: 'Quiz: SQL Avanzato', xp: 50 },
      ]},
    ],
  },
  {
    id: 'postgresql', name: 'PostgreSQL', tagline: 'Il database relazionale open-source più avanzato',
    color: '#6366f1', colorRgb: '99,102,241', category: 'Database', comingSoon: true,
    levels: [],
  },
  {
    id: 'mongodb', name: 'MongoDB', tagline: 'Database document-oriented NoSQL',
    color: '#22c55e', colorRgb: '34,197,94', category: 'Database', comingSoon: true,
    levels: [],
  },
  {
    id: 'redis', name: 'Redis', tagline: 'In-memory data store ultra-veloce',
    color: '#ef4444', colorRgb: '239,68,68', category: 'Database',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'redis-1-1', type: 'lesson', title: "Cos'è Redis?", xp: 10 },
        { id: 'redis-1-2', type: 'lesson', title: 'Stringhe e comandi base', xp: 10 },
        { id: 'redis-1-3', type: 'lesson', title: 'Liste e Set', xp: 10 },
        { id: 'redis-1-q', type: 'quiz',   title: 'Quiz: Redis Principiante', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'redis-2-1', type: 'lesson', title: 'Hashes e Sorted Sets', xp: 15 },
        { id: 'redis-2-2', type: 'lesson', title: 'TTL e scadenza chiavi', xp: 15 },
        { id: 'redis-2-3', type: 'lesson', title: 'Pub/Sub e Streams', xp: 15 },
        { id: 'redis-2-q', type: 'quiz',   title: 'Quiz: Redis Intermedio', xp: 40 },
      ]},
    ],
  },

  // ── MOBILE ────────────────────────────────────────────────────────────────

  {
    id: 'flutter', name: 'Flutter', tagline: 'App native iOS e Android con Dart',
    color: '#38bdf8', colorRgb: '56,189,248', category: 'Mobile', comingSoon: true,
    levels: [],
  },
  {
    id: 'kotlin', name: 'Kotlin', tagline: 'Il linguaggio moderno per Android',
    color: '#a855f7', colorRgb: '168,85,247', category: 'Mobile', comingSoon: true,
    levels: [],
  },
  {
    id: 'swift', name: 'Swift', tagline: 'App native per iOS e macOS',
    color: '#f97316', colorRgb: '249,115,22', category: 'Mobile', comingSoon: true,
    levels: [],
  },

  // ── DEVOPS & TOOLS ────────────────────────────────────────────────────────

  {
    id: 'git', name: 'Git & GitHub', tagline: 'Versioning e collaborazione professionale',
    color: '#f59e0b', colorRgb: '245,158,11', category: 'DevOps & Tools',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'git-1-1', type: 'lesson', title: "Cos'è Git?", xp: 10 },
        { id: 'git-1-2', type: 'lesson', title: 'Add, Commit e Status', xp: 10 },
        { id: 'git-1-3', type: 'lesson', title: 'Branch e Merge', xp: 10 },
        { id: 'git-1-q', type: 'quiz',   title: 'Quiz: Git Base', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'git-2-1', type: 'lesson', title: 'Remote e GitHub', xp: 15 },
        { id: 'git-2-2', type: 'lesson', title: 'Pull Request e Code Review', xp: 15 },
        { id: 'git-2-3', type: 'lesson', title: 'Risoluzione conflitti', xp: 15 },
        { id: 'git-2-q', type: 'quiz',   title: 'Quiz: Git Intermedio', xp: 40 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'git-3-1', type: 'lesson', title: 'Rebase e storia avanzata', xp: 20 },
        { id: 'git-3-2', type: 'lesson', title: 'Git Flow e strategie di branching', xp: 20 },
        { id: 'git-3-3', type: 'lesson', title: 'Hook e automazione', xp: 20 },
        { id: 'git-3-q', type: 'quiz',   title: 'Quiz: Git Avanzato', xp: 50 },
      ]},
    ],
  },
  {
    id: 'docker', name: 'Docker', tagline: 'Containerizza e scala le tue applicazioni',
    color: '#0ea5e9', colorRgb: '14,165,233', category: 'DevOps & Tools', comingSoon: true,
    levels: [],
  },
  {
    id: 'cicd', name: 'CI/CD', tagline: 'Delivery automatizzata e integrazione continua',
    color: '#10b981', colorRgb: '16,185,129', category: 'DevOps & Tools',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'cicd-1-1', type: 'lesson', title: "Cos'è CI/CD?", xp: 10 },
        { id: 'cicd-1-2', type: 'lesson', title: 'GitHub Actions: primo workflow', xp: 10 },
        { id: 'cicd-1-3', type: 'lesson', title: 'Pipeline YAML e trigger', xp: 10 },
        { id: 'cicd-1-q', type: 'quiz',   title: 'Quiz: CI/CD Base', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'cicd-2-1', type: 'lesson', title: 'Test automatizzati nella pipeline', xp: 15 },
        { id: 'cicd-2-2', type: 'lesson', title: 'Docker in CI e build artefatti', xp: 15 },
        { id: 'cicd-2-3', type: 'lesson', title: 'Deploy automatico su server', xp: 15 },
        { id: 'cicd-2-q', type: 'quiz',   title: 'Quiz: CI/CD Intermedio', xp: 40 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'cicd-3-1', type: 'lesson', title: 'Ambienti multipli e strategie di deploy', xp: 20 },
        { id: 'cicd-3-2', type: 'lesson', title: 'Secrets, sicurezza e OIDC', xp: 20 },
        { id: 'cicd-3-3', type: 'lesson', title: 'Monitoring e rollback', xp: 20 },
        { id: 'cicd-3-q', type: 'quiz',   title: 'Quiz: CI/CD Avanzato', xp: 50 },
      ]},
    ],
  },
  {
    id: 'linux', name: 'Linux CLI', tagline: 'Padroneggia il terminale e i sistemi Unix',
    color: '#eab308', colorRgb: '234,179,8', category: 'DevOps & Tools',
    levels: [
      { name: 'Principiante', tier: 'beginner', items: [
        { id: 'linux-1-1', type: 'lesson', title: 'Navigare il filesystem', xp: 10 },
        { id: 'linux-1-2', type: 'lesson', title: 'File e directory', xp: 10 },
        { id: 'linux-1-3', type: 'lesson', title: 'Permessi e utenti', xp: 10 },
        { id: 'linux-1-q', type: 'quiz',   title: 'Quiz: Linux Base', xp: 30 },
      ]},
      { name: 'Intermedio', tier: 'intermediate', items: [
        { id: 'linux-2-1', type: 'lesson', title: 'Filtri, pipe e redirect', xp: 15 },
        { id: 'linux-2-2', type: 'lesson', title: 'Processi e job control', xp: 15 },
        { id: 'linux-2-3', type: 'lesson', title: 'Variabili e script Bash', xp: 15 },
        { id: 'linux-2-q', type: 'quiz',   title: 'Quiz: Linux Intermedio', xp: 40 },
      ]},
      { name: 'Avanzato', tier: 'advanced', items: [
        { id: 'linux-3-1', type: 'lesson', title: 'SSH e server remoti', xp: 20 },
        { id: 'linux-3-2', type: 'lesson', title: 'Cron, systemd e automazione', xp: 20 },
        { id: 'linux-3-3', type: 'lesson', title: 'Networking e diagnostica', xp: 20 },
        { id: 'linux-3-q', type: 'quiz',   title: 'Quiz: Linux Avanzato', xp: 50 },
      ]},
    ],
  },

  // ── TEORIA ────────────────────────────────────────────────────────────────

  {
    id: 'design-patterns', name: 'Design Patterns', tagline: 'Soluzioni collaudate ai problemi ricorrenti',
    color: '#8b5cf6', colorRgb: '139,92,246', category: 'Teoria', comingSoon: true,
    levels: [],
  },
  {
    id: 'clean-code', name: 'Clean Code & SOLID', tagline: 'Scrivi codice leggibile e manutenibile',
    color: '#06b6d4', colorRgb: '6,182,212', category: 'Teoria', comingSoon: true,
    levels: [],
  },
  {
    id: 'algoritmi', name: 'Algoritmi & Strutture Dati', tagline: 'Le basi del pensiero computazionale',
    color: '#ec4899', colorRgb: '236,72,153', category: 'Teoria', comingSoon: true,
    levels: [],
  },
]

export const badges = {
  // ── Attività ───────────────────────────────────────────────────────────────
  first_lesson:    { name: 'Prima Lezione',   icon: '🎯', desc: 'Hai completato la prima lezione',    color: '#6366f1', colorRgb: '99,102,241' },
  streak_3:        { name: 'Streak 3 giorni', icon: '🔥', desc: '3 giorni consecutivi di studio',     color: '#f59e0b', colorRgb: '245,158,11' },
  streak_7:        { name: 'On Fire!',         icon: '🔥', desc: '7 giorni consecutivi',               color: '#ef4444', colorRgb: '239,68,68'  },
  node_beginner:   { name: 'Node Rookie',      icon: '⬡',  desc: 'Livello base Node.js completato',   color: '#22c55e', colorRgb: '34,197,94'  },
  quiz_ace:        { name: 'Quiz Ace',          icon: '⚡', desc: 'Quiz con punteggio perfetto',        color: '#a855f7', colorRgb: '168,85,247' },

  // ── Carriera Frontend ──────────────────────────────────────────────────────
  junior_frontend: { name: 'Junior Frontend Dev', icon: '🎨', desc: 'Vue.js e TypeScript principiante completati', color: '#06b6d4', colorRgb: '6,182,212'   },
  mid_frontend:    { name: 'Frontend Developer',   icon: '⚡', desc: 'Vue.js, Nuxt e TypeScript tutti i livelli',  color: '#38bdf8', colorRgb: '56,189,248'  },

  // ── Carriera Backend ───────────────────────────────────────────────────────
  junior_backend:  { name: 'Junior Backend Dev',   icon: '⚙️', desc: 'Node.js, Express e SQL principiante',       color: '#22c55e', colorRgb: '34,197,94'   },
  mid_backend_js:  { name: 'Backend Developer',    icon: '🚀', desc: 'Node.js e Express completati',              color: '#10b981', colorRgb: '16,185,129'  },
  junior_php:      { name: 'Junior PHP Dev',       icon: '🐘', desc: 'PHP principiante completato',               color: '#8b5cf6', colorRgb: '139,92,246'  },
  mid_php:         { name: 'PHP Developer',        icon: '🛠️', desc: 'PHP e SQL intermedio completati',           color: '#a855f7', colorRgb: '168,85,247'  },

  // ── Carriera DevOps ────────────────────────────────────────────────────────
  devops_starter:  { name: 'DevOps Starter',       icon: '🔧', desc: 'Git e Linux principiante completati',       color: '#f59e0b', colorRgb: '245,158,11'  },
  devops_engineer: { name: 'DevOps Engineer',      icon: '🏗️', desc: 'Git, Linux e CI/CD completati',            color: '#eab308', colorRgb: '234,179,8'   },

  // ── Carriera Full Stack & Data ─────────────────────────────────────────────
  full_stack_js:   { name: 'Full Stack JS Dev',    icon: '🌐', desc: 'Frontend Vue + Backend Node completati',    color: '#6366f1', colorRgb: '99,102,241'  },
  sql_master:      { name: 'SQL Master',           icon: '🗄️', desc: 'SQL & MySQL tutti i livelli completati',   color: '#3b82f6', colorRgb: '59,130,246'  },
  data_engineer:   { name: 'Data Engineer',        icon: '📊', desc: 'SQL e Redis completati',                   color: '#ef4444', colorRgb: '239,68,68'   },
}

// ── Lessons ─────────────────────────────────────────────────────────────────

export const lessons = {
  'nodejs-1-1': {
    title: "Cos'è Node.js?", xp: 10,
    blocks: [
      { type: 'text', md: '**Node.js** è un runtime JavaScript open-source costruito sul motore **V8** di Chrome. Ti permette di eseguire JavaScript lato server, al di fuori del browser — aprendo la strada al full-stack JS.' },
      { type: 'keypoints', title: 'Caratteristiche chiave', points: [
        'Event loop single-thread, non-blocking I/O',
        'Ecosistema NPM con oltre 2 milioni di pacchetti',
        'Stesso linguaggio su frontend e backend',
        'Ideale per API REST, real-time e microservizi',
      ]},
      { type: 'code', label: 'hello.js', lang: 'js', code: `// Il tuo primo programma Node.js\nconsole.log("Hello from Node.js!");\n\nconst os = require('os');\nconsole.log(\`Piattaforma: \${os.platform()}\`);\nconsole.log(\`Node version: \${process.version}\`);` },
      { type: 'text', md: 'Node.js usa il modulo globale **`process`** per accedere a informazioni sul runtime. Non è necessario installarlo — è sempre disponibile.' },
    ],
    tryIt: {
      desc: 'Aggiungi un messaggio personalizzato con il tuo nome:',
      code: `// Modifica questo programma!\nconsole.log("Ciao Mondo!");\n\n// Aggiungi qui:\n// console.log("Il mio nome è ...");`,
      output: `Ciao Mondo!\n// aggiungi il tuo output qui`,
    },
  },
  'nodejs-1-2': {
    title: 'Il tuo primo server HTTP', xp: 10,
    blocks: [
      { type: 'text', md: 'Con il modulo **`http`** built-in di Node.js puoi creare un server web con poche righe. Nessuna libreria esterna necessaria.' },
      { type: 'code', label: 'server.js', lang: 'js', code: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World!\\n');\n});\n\nserver.listen(3000, () => {\n  console.log('Server su http://localhost:3000');\n});` },
      { type: 'keypoints', title: 'Breakdown del codice', points: [
        '`http.createServer()` riceve ogni richiesta come callback',
        '`req` contiene URL, metodo, headers della richiesta',
        '`res.writeHead()` imposta status code e headers della risposta',
        '`server.listen(porta)` mette il server in ascolto',
      ]},
    ],
    tryIt: {
      desc: 'Modifica il server per rispondere con un JSON invece di testo:',
      code: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  // Cambia Content-Type in application/json\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World!\\n');\n});\n\nserver.listen(3000);`,
      output: `Server in ascolto su porta 3000`,
    },
  },
  'nodejs-1-3': {
    title: 'Moduli e require()', xp: 10,
    blocks: [
      { type: 'text', md: 'Node.js usa il sistema di moduli **CommonJS**. Ogni file è un modulo con il proprio scope. Usi `require()` per importare e `module.exports` per esportare.' },
      { type: 'code', label: 'math.js', lang: 'js', code: `// math.js — modulo da esportare\nfunction somma(a, b) { return a + b; }\nfunction moltiplica(a, b) { return a * b; }\n\nmodule.exports = { somma, moltiplica };` },
      { type: 'code', label: 'app.js', lang: 'js', code: `// app.js — importa il modulo\nconst { somma, moltiplica } = require('./math');\n\nconsole.log(somma(3, 4));        // 7\nconsole.log(moltiplica(3, 4));   // 12` },
      { type: 'text', md: 'Node.js include anche moduli **built-in** come `fs`, `http`, `path`, `os` che non richiedono installazione.' },
    ],
    tryIt: {
      desc: 'Crea un modulo che esporta una funzione saluta():',
      code: `// greet.js\nfunction saluta(nome) {\n  return \`Ciao, \${nome}!\`;\n}\n\nmodule.exports = { saluta };\n\n// app.js\nconst { saluta } = require('./greet');\nconsole.log(saluta('Marco'));`,
      output: `Ciao, Marco!`,
    },
  },
  'express-1-1': {
    title: 'Setup Express', xp: 10,
    blocks: [
      { type: 'text', md: '**Express** è il framework web più popolare per Node.js. Minimal, flessibile e con un enorme ecosistema di middleware.' },
      { type: 'code', label: 'app.js', lang: 'js', code: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Ciao da Express!' });\n});\n\napp.listen(3000, () => {\n  console.log('Server Express su porta 3000');\n});` },
    ],
    tryIt: {
      desc: 'Aggiungi una route /ping che risponde con { pong: true }:',
      code: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Hello!' });\n});\n\n// Aggiungi /ping qui\n\napp.listen(3000);`,
      output: 'GET / → { message: "Hello!" }',
    },
  },
  'vue-1-1': {
    title: 'Template e Reattività', xp: 10,
    blocks: [
      { type: 'text', md: '**Vue 3** usa un sistema di reattività basato su **Proxy**. Il template HTML è compilato in render functions ottimizzate. Con `<script setup>` la sintassi è minimale.' },
      { type: 'code', label: 'Counter.vue', lang: 'html', code: `<template>\n  <div>\n    <p>Contatore: {{ count }}</p>\n    <button @click="count++">Incrementa</button>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst count = ref(0)\n</script>` },
      { type: 'keypoints', title: 'Reattività in Vue 3', points: [
        '`ref()` crea un valore reattivo primitivo (.value)',
        '`reactive()` crea un oggetto reattivo',
        '`computed()` crea un valore derivato e cachato',
        'Il template aggiorna automaticamente al cambio di stato',
      ]},
    ],
    tryIt: {
      desc: 'Aggiungi un pulsante "Decrementa" al contatore:',
      code: `<script setup>\nimport { ref } from 'vue'\nconst count = ref(0)\n</script>\n\n<template>\n  <p>{{ count }}</p>\n  <button @click="count++">+</button>\n  <!-- aggiungi - qui -->\n</template>`,
      output: 'Contatore interattivo con +/-',
    },
  },
  // ── SQL ───────────────────────────────────────────────────────────────────
  'sql-1-1': {
    title: 'SELECT e FROM', xp: 10,
    blocks: [
      { type: 'text', md: '**SQL** (Structured Query Language) è il linguaggio standard per interagire con i database relazionali. La query più semplice usa `SELECT` per scegliere le colonne e `FROM` per indicare la tabella.' },
      { type: 'code', label: 'query.sql', lang: 'sql', code: `-- Seleziona tutte le colonne\nSELECT * FROM utenti;\n\n-- Seleziona colonne specifiche\nSELECT nome, email FROM utenti;\n\n-- Alias per colonne\nSELECT nome AS 'Nome Completo', email AS 'Indirizzo Email'\nFROM utenti;` },
      { type: 'keypoints', title: 'Da ricordare', points: [
        '`*` seleziona tutte le colonne — evitarlo in produzione per performance',
        'SQL non è case-sensitive, ma le keyword in maiuscolo sono convenzione',
        '`AS` assegna un alias temporaneo a una colonna',
        'Ogni istruzione termina con `;`',
      ]},
    ],
    tryIt: {
      desc: 'Seleziona solo nome e prezzo dalla tabella prodotti:',
      code: `-- Scrivi la query qui\nSELECT * FROM prodotti;`,
      output: `nome, prezzo\n------ ------\nLaptop  999.99\nMouse    29.99`,
    },
  },
  'sql-1-2': {
    title: 'WHERE e filtri', xp: 10,
    blocks: [
      { type: 'text', md: 'La clausola **`WHERE`** filtra le righe restituite dalla query. Puoi usare operatori di confronto, logici e pattern matching.' },
      { type: 'code', label: 'filtri.sql', lang: 'sql', code: `-- Confronto semplice\nSELECT * FROM prodotti WHERE prezzo > 100;\n\n-- Operatori logici\nSELECT * FROM utenti\nWHERE eta >= 18 AND attivo = 1;\n\n-- BETWEEN\nSELECT * FROM ordini\nWHERE data BETWEEN '2024-01-01' AND '2024-12-31';\n\n-- LIKE per pattern\nSELECT * FROM utenti WHERE email LIKE '%@gmail.com';\n\n-- IN per lista di valori\nSELECT * FROM prodotti WHERE categoria IN ('Tech', 'Audio');` },
      { type: 'keypoints', title: 'Operatori WHERE', points: [
        '`=`, `!=`, `<`, `>`, `<=`, `>=` per confronti',
        '`AND`, `OR`, `NOT` per condizioni multiple',
        '`LIKE` con `%` (qualsiasi stringa) e `_` (un carattere)',
        '`IS NULL` / `IS NOT NULL` per valori nulli',
      ]},
    ],
    tryIt: {
      desc: 'Trova tutti gli utenti con email Gmail e età superiore a 25:',
      code: `SELECT nome, email, eta\nFROM utenti\nWHERE -- completa qui`,
      output: `Marco  marco@gmail.com  28\nLucia  lucia@gmail.com  31`,
    },
  },
  'sql-1-3': {
    title: 'ORDER BY e LIMIT', xp: 10,
    blocks: [
      { type: 'text', md: '**`ORDER BY`** ordina i risultati per una o più colonne. **`LIMIT`** restringe il numero di righe restituite — fondamentale per la paginazione.' },
      { type: 'code', label: 'ordine.sql', lang: 'sql', code: `-- Ordine ascendente (default)\nSELECT * FROM prodotti ORDER BY prezzo;\n\n-- Ordine discendente\nSELECT * FROM prodotti ORDER BY prezzo DESC;\n\n-- Ordine multiplo\nSELECT * FROM utenti ORDER BY cognome ASC, nome ASC;\n\n-- Primi 10 risultati\nSELECT * FROM prodotti ORDER BY prezzo DESC LIMIT 10;\n\n-- Paginazione: LIMIT + OFFSET\nSELECT * FROM prodotti ORDER BY id LIMIT 10 OFFSET 20;` },
      { type: 'text', md: 'Con `LIMIT 10 OFFSET 20` ottieni la pagina 3 (righe 21–30). È il pattern base per la paginazione nelle API.' },
    ],
    tryIt: {
      desc: 'Ottieni i 5 prodotti più economici in ordine di prezzo:',
      code: `SELECT nome, prezzo FROM prodotti\n-- aggiungi ORDER BY e LIMIT`,
      output: `Penna   0.99\nMatita  1.29\nTazza   4.99\nMouse  29.99\nTastiera 49.99`,
    },
  },
  'sql-2-1': {
    title: 'JOIN tra tabelle', xp: 15,
    blocks: [
      { type: 'text', md: 'Il **`JOIN`** collega righe di tabelle diverse tramite una chiave comune. È il concetto centrale dei database relazionali.' },
      { type: 'code', label: 'join.sql', lang: 'sql', code: `-- INNER JOIN: solo righe con corrispondenza in entrambe le tabelle\nSELECT utenti.nome, ordini.totale, ordini.data\nFROM utenti\nINNER JOIN ordini ON utenti.id = ordini.utente_id;\n\n-- LEFT JOIN: tutte le righe della tabella sinistra\nSELECT utenti.nome, ordini.totale\nFROM utenti\nLEFT JOIN ordini ON utenti.id = ordini.utente_id;\n\n-- Alias di tabella per leggibilità\nSELECT u.nome, o.totale\nFROM utenti u\nLEFT JOIN ordini o ON u.id = o.utente_id\nWHERE o.totale > 100;` },
      { type: 'keypoints', title: 'Tipi di JOIN', points: [
        '`INNER JOIN`: solo righe con match in entrambe le tabelle',
        '`LEFT JOIN`: tutte le righe di sinistra + match di destra (NULL se assente)',
        '`RIGHT JOIN`: tutte le righe di destra + match di sinistra',
        '`FULL OUTER JOIN`: tutte le righe di entrambe le tabelle',
      ]},
    ],
    tryIt: {
      desc: 'Lista tutti gli utenti con il numero di ordini effettuati (inclusi quelli con 0 ordini):',
      code: `SELECT u.nome, COUNT(o.id) AS num_ordini\nFROM utenti u\n-- aggiungi il JOIN corretto\nGROUP BY u.id;`,
      output: `Marco  3\nLucia  1\nGianni 0`,
    },
  },
  'sql-2-2': {
    title: 'GROUP BY e aggregazioni', xp: 15,
    blocks: [
      { type: 'text', md: '**`GROUP BY`** raggruppa le righe con lo stesso valore in una colonna. Si usa con le **funzioni di aggregazione** per calcolare statistiche per gruppo.' },
      { type: 'code', label: 'aggregazioni.sql', lang: 'sql', code: `-- Conta righe per gruppo\nSELECT categoria, COUNT(*) AS totale\nFROM prodotti\nGROUP BY categoria;\n\n-- Somma e media\nSELECT utente_id,\n  COUNT(*) AS ordini,\n  SUM(totale) AS spesa_totale,\n  AVG(totale) AS spesa_media\nFROM ordini\nGROUP BY utente_id;\n\n-- HAVING filtra dopo il raggruppamento\nSELECT categoria, AVG(prezzo) AS prezzo_medio\nFROM prodotti\nGROUP BY categoria\nHAVING AVG(prezzo) > 50;` },
      { type: 'keypoints', title: 'Funzioni di aggregazione', points: [
        '`COUNT(*)` conta tutte le righe, `COUNT(col)` ignora i NULL',
        '`SUM()`, `AVG()`, `MIN()`, `MAX()` lavorano su valori numerici',
        '`HAVING` filtra i gruppi (come WHERE ma dopo GROUP BY)',
        'Le colonne nel SELECT devono essere in GROUP BY o aggregate',
      ]},
    ],
    tryIt: {
      desc: 'Trova le categorie con più di 5 prodotti e il loro prezzo medio:',
      code: `SELECT categoria, COUNT(*) AS num, AVG(prezzo) AS media\nFROM prodotti\nGROUP BY categoria\n-- aggiungi HAVING`,
      output: `Tech   12  249.99\nAudio   7   89.50`,
    },
  },
  'sql-2-3': {
    title: 'Subquery', xp: 15,
    blocks: [
      { type: 'text', md: 'Una **subquery** è una query dentro un\'altra query. Può comparire nel `WHERE`, nel `FROM` o nel `SELECT`. Utile per logiche complesse che un singolo JOIN non risolve.' },
      { type: 'code', label: 'subquery.sql', lang: 'sql', code: `-- Subquery in WHERE\nSELECT nome FROM prodotti\nWHERE prezzo > (SELECT AVG(prezzo) FROM prodotti);\n\n-- Subquery con IN\nSELECT nome FROM utenti\nWHERE id IN (\n  SELECT utente_id FROM ordini WHERE totale > 500\n);\n\n-- Subquery nel FROM (derived table)\nSELECT categoria, media\nFROM (\n  SELECT categoria, AVG(prezzo) AS media\n  FROM prodotti\n  GROUP BY categoria\n) AS stat\nWHERE media > 100;` },
      { type: 'text', md: 'Quando le subquery diventano complesse, considera le **CTE** (Common Table Expressions) con `WITH` — rendono il codice molto più leggibile.' },
    ],
    tryIt: {
      desc: "Trova gli utenti che hanno speso più della media di tutti gli ordini:",
      code: `SELECT u.nome, SUM(o.totale) AS spesa\nFROM utenti u\nJOIN ordini o ON u.id = o.utente_id\nGROUP BY u.id\nHAVING spesa > (-- subquery qui\n);`,
      output: `Marco  1250.00\nLucia   890.50`,
    },
  },
  'sql-3-1': {
    title: 'Indici e performance', xp: 20,
    blocks: [
      { type: 'text', md: 'Un **indice** è una struttura dati separata che accelera le ricerche su una colonna. Senza indici, MySQL scansiona ogni riga della tabella (full table scan).' },
      { type: 'code', label: 'indici.sql', lang: 'sql', code: `-- Crea un indice semplice\nCREATE INDEX idx_email ON utenti(email);\n\n-- Indice unico (garantisce unicità)\nCREATE UNIQUE INDEX idx_email_unique ON utenti(email);\n\n-- Indice composito\nCREATE INDEX idx_nome_cognome ON utenti(cognome, nome);\n\n-- Analizza la query con EXPLAIN\nEXPLAIN SELECT * FROM utenti WHERE email = 'test@test.com';\n\n-- Visualizza indici di una tabella\nSHOW INDEX FROM utenti;` },
      { type: 'keypoints', title: 'Regole degli indici', points: [
        'La chiave primaria (`PRIMARY KEY`) crea automaticamente un indice',
        "Aggiungi indici sulle colonne usate spesso in WHERE, JOIN, ORDER BY",
        'Gli indici rallentano INSERT/UPDATE/DELETE — non esagerare',
        'EXPLAIN mostra se MySQL usa un indice o fa full scan',
      ]},
    ],
    tryIt: {
      desc: 'Crea un indice composito per velocizzare ricerche su (categoria, prezzo):',
      code: `-- Crea l'indice\nCREATE INDEX -- completa\nON prodotti(-- colonne);\n\n-- Verifica\nSHOW INDEX FROM prodotti;`,
      output: `idx_cat_prezzo | categoria | prezzo`,
    },
  },
  'sql-3-2': {
    title: 'Transazioni e ACID', xp: 20,
    blocks: [
      { type: 'text', md: 'Una **transazione** raggruppa più operazioni SQL in un\'unità atomica: o vanno tutte a buon fine, o si annullano tutte. Le proprietà **ACID** garantiscono l\'integrità dei dati.' },
      { type: 'code', label: 'transazioni.sql', lang: 'sql', code: `START TRANSACTION;\n\n-- Trasferimento bancario\nUPDATE conti SET saldo = saldo - 100 WHERE id = 1;\nUPDATE conti SET saldo = saldo + 100 WHERE id = 2;\n\n-- Se tutto ok\nCOMMIT;\n\n-- In caso di errore, annulla tutto\nROLLBACK;\n\n-- Savepoint per rollback parziale\nSAVEPOINT prima_operazione;\n-- ... operazioni ...\nROLLBACK TO prima_operazione;` },
      { type: 'keypoints', title: 'Proprietà ACID', points: [
        '**Atomicità**: tutto o niente — non esistono stati intermedi',
        '**Consistenza**: il DB rimane in uno stato valido prima e dopo',
        '**Isolamento**: le transazioni concorrenti non si interferiscono',
        '**Durabilità**: dopo il COMMIT i dati sopravvivono anche a crash',
      ]},
    ],
    tryIt: {
      desc: 'Scrivi una transazione che crea un ordine e aggiorna lo stock:',
      code: `START TRANSACTION;\n\nINSERT INTO ordini (utente_id, totale) VALUES (1, 99.99);\nUPDATE prodotti SET stock = stock - 1 WHERE id = 5;\n\n-- Aggiungi COMMIT o ROLLBACK`,
      output: `Query OK, 1 row affected\nQuery OK, 1 row affected\nTransaction committed`,
    },
  },
  'sql-3-3': {
    title: 'Views e Stored Procedures', xp: 20,
    blocks: [
      { type: 'text', md: 'Una **VIEW** è una query salvata come tabella virtuale. Una **Stored Procedure** è un blocco di codice SQL riutilizzabile memorizzato nel database.' },
      { type: 'code', label: 'views.sql', lang: 'sql', code: `-- Crea una view\nCREATE VIEW ordini_dettagliati AS\nSELECT o.id, u.nome, o.totale, o.data\nFROM ordini o\nJOIN utenti u ON o.utente_id = u.id;\n\n-- Usa la view come una tabella normale\nSELECT * FROM ordini_dettagliati WHERE totale > 100;\n\n-- Stored Procedure\nDELIMITER //\nCREATE PROCEDURE GetOrdiniUtente(IN userId INT)\nBEGIN\n  SELECT * FROM ordini WHERE utente_id = userId ORDER BY data DESC;\nEND //\nDELIMITER ;\n\n-- Chiama la procedure\nCALL GetOrdiniUtente(1);` },
      { type: 'text', md: 'Le VIEW semplificano query complesse e possono agire come layer di sicurezza nascondendo colonne sensibili. Le Stored Procedure riducono il traffico rete spostando la logica nel DB.' },
    ],
    tryIt: {
      desc: 'Crea una view che mostra solo nome, email e data di registrazione degli utenti attivi:',
      code: `CREATE VIEW utenti_attivi AS\nSELECT -- scegli le colonne\nFROM utenti\nWHERE attivo = 1;\n\nSELECT * FROM utenti_attivi;`,
      output: `Marco  marco@test.com  2024-01-15\nLucia  lucia@test.com  2024-03-22`,
    },
  },

  // ── REDIS ─────────────────────────────────────────────────────────────────
  'redis-1-1': {
    title: "Cos'è Redis?", xp: 10,
    blocks: [
      { type: 'text', md: '**Redis** (Remote Dictionary Server) è un database **in-memory** open-source. Memorizza i dati in RAM, rendendolo estremamente veloce. Viene usato come cache, message broker e session store.' },
      { type: 'keypoints', title: 'Casi d\'uso principali', points: [
        '**Cache**: memorizza risultati costosi di query o API per riutilizzarli',
        '**Session store**: dati di sessione utente con scadenza automatica',
        '**Code (Queue)**: Pub/Sub e stream di messaggi tra servizi',
        '**Rate limiting**: conta richieste per IP con TTL automatico',
      ]},
      { type: 'code', label: 'redis-cli', lang: 'bash', code: `# Avvia Redis localmente\nredis-server\n\n# Apri la CLI\nredis-cli\n\n# Comandi base\nPING          # risponde PONG\nSET nome "Marco"\nGET nome      # "Marco"\nDEL nome\nEXISTS nome   # 0 (non esiste più)` },
      { type: 'text', md: 'Redis è **single-threaded** per le operazioni sui dati — questo lo rende prevedibile e privo di race condition per operazioni atomiche.' },
    ],
    tryIt: {
      desc: "Esegui un PING e imposta una chiave 'saluto' con il valore 'Ciao Redis!':",
      code: `PING\nSET saluto "Ciao Redis!"\nGET saluto`,
      output: `PONG\nOK\n"Ciao Redis!"`,
    },
  },
  'redis-1-2': {
    title: 'Stringhe e comandi base', xp: 10,
    blocks: [
      { type: 'text', md: 'Le **stringhe** sono il tipo di dato più semplice in Redis. Possono contenere testo, numeri o dati binari fino a 512 MB. Redis offre comandi atomici per incrementare/decrementare valori numerici.' },
      { type: 'code', label: 'stringhe.redis', lang: 'bash', code: `# SET e GET base\nSET utente:1:nome "Marco"\nGET utente:1:nome\n\n# SET con scadenza (TTL in secondi)\nSET token:abc123 "user:42" EX 3600\nTTL token:abc123    # secondi rimanenti\n\n# Incremento atomico (perfetto per contatori)\nSET visite 0\nINCR visite         # 1\nINCR visite         # 2\nINCRBY visite 10    # 12\n\n# SETNX — imposta solo se non esiste (lock distribuito)\nSETNX lock:risorsa "processo-1"\n\n# MSET / MGET — multiple chiavi in un colpo\nMSET a 1 b 2 c 3\nMGET a b c         # 1, 2, 3` },
      { type: 'keypoints', title: 'Convenzioni chiavi Redis', points: [
        'Usa i due punti come separatore: `utente:42:nome`',
        'Le chiavi sono case-sensitive',
        'Tieni le chiavi brevi — sono memorizzate in RAM',
        'Usa namespace per organizzare: `cache:prodotti:*`',
      ]},
    ],
    tryIt: {
      desc: 'Crea un contatore di login con scadenza di 1 ora e incrementalo 3 volte:',
      code: `SET login:contatore 0 EX 3600\nINCR login:contatore\nINCR login:contatore\nINCR login:contatore\nGET login:contatore`,
      output: `OK\n1\n2\n3\n"3"`,
    },
  },
  'redis-1-3': {
    title: 'Liste e Set', xp: 10,
    blocks: [
      { type: 'text', md: 'Redis supporta strutture dati avanzate. Le **Liste** sono sequenze ordinate di stringhe. I **Set** sono insiemi non ordinati di elementi unici.' },
      { type: 'code', label: 'liste-set.redis', lang: 'bash', code: `# LISTE — come code o stack\nLPUSH notifiche "messaggio1"  # inserisce a sinistra\nRPUSH notifiche "messaggio2"  # inserisce a destra\nLRANGE notifiche 0 -1          # tutti gli elementi\nLPOP notifiche                 # rimuove da sinistra (FIFO)\nLLEN notifiche                 # lunghezza lista\n\n# SET — elementi unici\nSADD tag:post:1 "php" "backend" "mysql"\nSADD tag:post:2 "mysql" "database" "sql"\nSMEMBERS tag:post:1            # tutti i membri\nSISMEMBER tag:post:1 "php"    # 1 se esiste\n\n# Operazioni tra set\nSINTER tag:post:1 tag:post:2   # intersezione: mysql\nSUNION tag:post:1 tag:post:2   # unione\nSDIFF tag:post:1 tag:post:2    # differenza` },
      { type: 'text', md: 'Le Liste sono ideali per **code di lavori** (job queues): i worker usano `BLPOP` per aspettare blocco finché arriva un elemento.' },
    ],
    tryIt: {
      desc: 'Crea una lista "da_fare" con 3 task e leggili in ordine FIFO:',
      code: `RPUSH da_fare "task1" "task2" "task3"\nLPOP da_fare\nLPOP da_fare\nLPOP da_fare`,
      output: `3\n"task1"\n"task2"\n"task3"`,
    },
  },
  'redis-2-1': {
    title: 'Hashes e Sorted Sets', xp: 15,
    blocks: [
      { type: 'text', md: 'Gli **Hash** memorizzano oggetti strutturati come coppie campo-valore. I **Sorted Set** sono set con uno score numerico per ogni elemento — perfetti per classifiche.' },
      { type: 'code', label: 'hash-zset.redis', lang: 'bash', code: `# HASH — oggetto strutturato\nHSET utente:42 nome "Marco" eta 28 email "m@test.com"\nHGET utente:42 nome          # "Marco"\nHGETALL utente:42            # tutti i campi\nHINCRBY utente:42 eta 1      # incrementa un campo\nHDEL utente:42 email         # elimina campo\n\n# SORTED SET — classifica con score\nZADD leaderboard 1500 "Marco"\nZADD leaderboard 2300 "Lucia"\nZADD leaderboard 1800 "Gianni"\n\nZRANGE leaderboard 0 -1 WITHSCORES   # ordine crescente\nZREVRANGE leaderboard 0 2 WITHSCORES # top 3\nZRANK leaderboard "Marco"             # posizione (0-based)\nZSCORE leaderboard "Lucia"            # score di Lucia` },
      { type: 'keypoints', title: 'Quando usarli', points: [
        'Hash: oggetti utente, sessioni, configurazioni',
        'Sorted Set: classifiche, leaderboard, timeline con timestamp',
        'ZINCRBY per aggiornare score atomicamente',
        'ZRANGEBYSCORE per range: es. "tutti con score tra 1000 e 2000"',
      ]},
    ],
    tryIt: {
      desc: 'Crea una leaderboard con 3 giocatori e ottieni il top 1:',
      code: `ZADD gioco 850 "Alice"\nZADD gioco 1200 "Bob"\nZADD gioco 950 "Carlo"\nZREVRANGE gioco 0 0 WITHSCORES`,
      output: `1) "Bob"\n2) "1200"`,
    },
  },
  'redis-2-2': {
    title: 'TTL e scadenza chiavi', xp: 15,
    blocks: [
      { type: 'text', md: 'Il **TTL** (Time To Live) è uno dei punti di forza di Redis. Puoi far scadere automaticamente qualsiasi chiave senza codice aggiuntivo — fondamentale per cache e sessioni.' },
      { type: 'code', label: 'ttl.redis', lang: 'bash', code: `# Imposta TTL al momento della creazione\nSET sessione:abc "user:42" EX 1800     # secondi\nSET banner "promo" PX 3600000          # millisecondi\n\n# Aggiungi TTL a una chiave esistente\nSET contatore 0\nEXPIRE contatore 60                    # scade in 60s\nEXPIREAT contatore 1735689600          # scade a Unix timestamp\n\n# Controlla TTL\nTTL sessione:abc    # secondi rimanenti (-1 = no TTL, -2 = non esiste)\nPTTL sessione:abc   # millisecondi rimanenti\n\n# Rimuovi TTL (rende la chiave permanente)\nPERSIST contatore\n\n# Pattern: cache con rinnovo automatico\nGET cache:prodotti\n# se non esiste → calcola → SET con EX 300` },
      { type: 'keypoints', title: 'Pattern comuni con TTL', points: [
        'Sessioni utente: `EX 1800` (30 minuti)',
        'Cache API: `EX 300` (5 minuti)',
        'Token password reset: `EX 900` (15 minuti)',
        'Rate limiting: `INCR` + `EXPIRE` (reset automatico ogni ora)',
      ]},
    ],
    tryIt: {
      desc: 'Crea un token di verifica email con scadenza 15 minuti e verifica il TTL:',
      code: `SET token:verifica:xyz "user:5" EX 900\nTTL token:verifica:xyz`,
      output: `OK\n899`,
    },
  },
  'redis-2-3': {
    title: 'Pub/Sub e Streams', xp: 15,
    blocks: [
      { type: 'text', md: '**Pub/Sub** permette a processi di pubblicare messaggi su un canale e ad altri di riceverli in tempo reale. Gli **Streams** (Redis 5+) sono log append-only persistenti, simili a Kafka.' },
      { type: 'code', label: 'pubsub.redis', lang: 'bash', code: `# SUBSCRIBER — ascolta un canale\nSUBSCRIBE notifiche\n# ... aspetta messaggi ...\n\n# PUBLISHER — invia un messaggio\nPUBLISH notifiche "Nuovo ordine: #1234"\n\n# Pattern subscribe (wildcard)\nPSUBSCRIBE notifiche:*    # notifiche:ordini, notifiche:utenti, ...\n\n# STREAMS — coda persistente\nXADD ordini * prodotto "Laptop" quantita 1 prezzo 999\nXADD ordini * prodotto "Mouse" quantita 2 prezzo 29\n\n# Leggi ultimi messaggi\nXRANGE ordini - +\n\n# Consumer group (più worker, distribuzione automatica)\nXGROUP CREATE ordini workers $ MKSTREAM\nXREADGROUP GROUP workers worker1 COUNT 1 STREAMS ordini >` },
      { type: 'text', md: 'A differenza di Pub/Sub, gli **Streams** persistono i messaggi e supportano consumer group — ogni messaggio viene consegnato a un solo worker nel gruppo.' },
    ],
    tryIt: {
      desc: 'Pubblica 2 messaggi sul canale "aggiornamenti" e conta i subscriber raggiunti:',
      code: `PUBLISH aggiornamenti "v1.2 rilasciata"\nPUBLISH aggiornamenti "manutenzione alle 23:00"`,
      output: `(integer) 1\n(integer) 1`,
    },
  },

  // ── PHP ───────────────────────────────────────────────────────────────────
  'php-1-1': {
    title: 'Sintassi base PHP', xp: 10,
    blocks: [
      { type: 'text', md: '**PHP** (PHP: Hypertext Preprocessor) è un linguaggio di scripting server-side. Il codice PHP viene eseguito sul server e genera HTML dinamico inviato al browser.' },
      { type: 'code', label: 'base.php', lang: 'php', code: `<?php\n// Variabili — precedute da $\n$nome = "Marco";\n$eta = 28;\n$attivo = true;\n$prezzo = 9.99;\n\n// Output\necho "Ciao, $nome!";          // Ciao, Marco!\necho 'Ciao, ' . $nome . '!';  // concatenazione con .\n\n// Condizioni\nif ($eta >= 18) {\n    echo "Maggiorenne";\n} elseif ($eta >= 13) {\n    echo "Adolescente";\n} else {\n    echo "Minorenne";\n}\n\n// Loop\nfor ($i = 0; $i < 5; $i++) {\n    echo $i . " ";\n}\n\nforeach ([1, 2, 3] as $num) {\n    echo $num;\n}` },
      { type: 'keypoints', title: 'Caratteristiche PHP', points: [
        'Il codice PHP va tra `<?php` e `?>`',
        'Le variabili iniziano sempre con `$`',
        'PHP è loosely typed — gestisce automaticamente i tipi',
        'La concatenazione usa il punto `.`, non il `+`',
      ]},
    ],
    tryIt: {
      desc: "Scrivi un'istruzione che stampa 'Buongiorno!' se l'ora è < 12, altrimenti 'Buonasera!':",
      code: `<?php\n$ora = 10;\n\n// Completa qui\nif ($ora < 12) {\n    // ...\n}`,
      output: `Buongiorno!`,
    },
  },
  'php-1-2': {
    title: 'Array e funzioni', xp: 10,
    blocks: [
      { type: 'text', md: 'In PHP gli **array** possono essere indicizzati (numerici) o associativi (chiave => valore). Le **funzioni** si definiscono con `function` e PHP offre centinaia di funzioni built-in.' },
      { type: 'code', label: 'array-funzioni.php', lang: 'php', code: `<?php\n// Array indicizzato\n$colori = ["rosso", "verde", "blu"];\necho $colori[0];  // rosso\n\n// Array associativo\n$utente = [\n    "nome"  => "Marco",\n    "email" => "marco@test.com",\n    "eta"   => 28,\n];\necho $utente["nome"];  // Marco\n\n// Funzioni array utili\ncount($colori);             // 3\narray_push($colori, "giallo");\narray_map(fn($c) => strtoupper($c), $colori);\narray_filter($colori, fn($c) => strlen($c) > 4);\n\n// Definire una funzione\nfunction saluta(string $nome, string $titolo = "Sig."): string {\n    return "Ciao, $titolo $nome!";\n}\n\necho saluta("Marco");           // Ciao, Sig. Marco!\necho saluta("Lucia", "Dott.");  // Ciao, Dott. Lucia!` },
      { type: 'keypoints', title: 'Funzioni built-in utili', points: [
        '`strlen()`, `strtolower()`, `strtoupper()`, `trim()`',
        '`count()`, `array_push()`, `array_merge()`, `in_array()`',
        '`implode()` / `explode()` per array ↔ stringa',
        'PHP 8+ supporta typed properties, union types e `match`',
      ]},
    ],
    tryIt: {
      desc: 'Crea una funzione che riceve un array di numeri e restituisce la somma:',
      code: `<?php\nfunction sommaArray(array $numeri): int|float {\n    // usa array_sum() o un loop\n}\n\n$totale = sommaArray([10, 20, 30, 5]);\necho $totale;  // 65`,
      output: `65`,
    },
  },
  'php-1-3': {
    title: 'Classi e OOP', xp: 10,
    blocks: [
      { type: 'text', md: 'PHP supporta la **programmazione orientata agli oggetti** con classi, ereditarietà, interfacce e traits. È il paradigma usato da Laravel, Symfony e la maggior parte dei framework moderni.' },
      { type: 'code', label: 'oop.php', lang: 'php', code: `<?php\nclass Prodotto {\n    public string $nome;\n    private float $prezzo;\n\n    public function __construct(string $nome, float $prezzo) {\n        $this->nome = $nome;\n        $this->prezzo = $prezzo;\n    }\n\n    public function getPrezzo(): float {\n        return $this->prezzo;\n    }\n\n    public function getPrezzoScontato(int $percentuale): float {\n        return $this->prezzo * (1 - $percentuale / 100);\n    }\n}\n\n// Ereditarietà\nclass ProdottoDigitale extends Prodotto {\n    public function __construct(string $nome, float $prezzo) {\n        parent::__construct($nome, $prezzo);\n    }\n\n    public function download(): string {\n        return "Download di {$this->nome} avviato";\n    }\n}\n\n$p = new Prodotto("Laptop", 999.99);\necho $p->getPrezzoScontato(10);  // 899.991` },
      { type: 'keypoints', title: 'Visibilità', points: [
        '`public`: accessibile da ovunque',
        '`private`: solo dalla classe stessa',
        '`protected`: dalla classe e le sue sottoclassi',
        '`static`: metodo/proprietà di classe, non di istanza',
      ]},
    ],
    tryIt: {
      desc: "Aggiungi un metodo statico `fromArray()` che crea un Prodotto da un array associativo:",
      code: `<?php\nclass Prodotto {\n    public function __construct(\n        public string $nome,\n        public float $prezzo\n    ) {}\n\n    public static function fromArray(array $data): self {\n        // ...\n    }\n}\n\n$p = Prodotto::fromArray(["nome" => "Mouse", "prezzo" => 29.99]);\necho $p->nome;`,
      output: `Mouse`,
    },
  },
  'php-2-1': {
    title: 'Superglobali e form', xp: 15,
    blocks: [
      { type: 'text', md: 'Le **superglobali** sono variabili predefinite sempre disponibili. `$_GET`, `$_POST`, `$_REQUEST` raccolgono i dati dai form HTML. È fondamentale validare e sanificare sempre i dati in input.' },
      { type: 'code', label: 'form.php', lang: 'php', code: `<?php\n// Gestione form POST\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    // Sanificazione input\n    $nome  = htmlspecialchars(trim($_POST['nome'] ?? ''));\n    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);\n\n    // Validazione\n    if (empty($nome)) {\n        $errori[] = "Il nome è obbligatorio";\n    }\n    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n        $errori[] = "Email non valida";\n    }\n\n    if (empty($errori)) {\n        // Processa i dati...\n        echo "Benvenuto, $nome!";\n    }\n}\n?>\n<form method="POST">\n    <input name="nome" value="<?= htmlspecialchars($nome ?? '') ?>">\n    <input name="email" type="email">\n    <button type="submit">Invia</button>\n</form>` },
      { type: 'keypoints', title: 'Superglobali principali', points: [
        '`$_GET`: parametri URL (?chiave=valore)',
        '`$_POST`: dati form method="post"',
        '`$_FILES`: file caricati con upload',
        '`$_SERVER`: info server (IP, metodo, URL...)',
        '`$_ENV`: variabili d\'ambiente',
      ]},
    ],
    tryIt: {
      desc: "Leggi il parametro 'q' dalla URL e visualizzalo sanificato:",
      code: `<?php\n// URL: /cerca?q=<script>alert('xss')</script>\n$query = htmlspecialchars($_GET['q'] ?? '');\necho "Risultati per: $query";`,
      output: `Risultati per: &lt;script&gt;alert('xss')&lt;/script&gt;`,
    },
  },
  'php-2-2': {
    title: 'PDO e MySQL', xp: 15,
    blocks: [
      { type: 'text', md: '**PDO** (PHP Data Objects) è l\'estensione moderna per connettersi ai database in PHP. Usa le **prepared statements** per prevenire SQL injection — mai concatenare input utente nelle query SQL.' },
      { type: 'code', label: 'pdo.php', lang: 'php', code: `<?php\n// Connessione al database\n$dsn = "mysql:host=localhost;dbname=myapp;charset=utf8mb4";\n$pdo = new PDO($dsn, "utente", "password", [\n    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n]);\n\n// SELECT con prepared statement\n$stmt = $pdo->prepare("SELECT * FROM utenti WHERE email = ?");\n$stmt->execute([$email]);\n$utente = $stmt->fetch();\n\n// INSERT\n$stmt = $pdo->prepare(\n    "INSERT INTO utenti (nome, email) VALUES (:nome, :email)"\n);\n$stmt->execute([':nome' => $nome, ':email' => $email]);\n$nuovoId = $pdo->lastInsertId();\n\n// UPDATE\n$pdo->prepare("UPDATE utenti SET nome = ? WHERE id = ?")\n    ->execute([$nuovoNome, $id]);\n\n// Tutti i risultati\n$utenti = $pdo->query("SELECT * FROM utenti")->fetchAll();` },
      { type: 'keypoints', title: 'Regole d\'oro con PDO', points: [
        'USA SEMPRE prepared statements con dati utente',
        '`?` o `:nome` sono placeholder — mai concatenare stringhe',
        '`FETCH_ASSOC` restituisce array associativi',
        'Wrappa la connessione in try/catch per gestire gli errori',
      ]},
    ],
    tryIt: {
      desc: 'Scrivi una query PDO che recupera tutti gli utenti con eta > 18:',
      code: `$stmt = $pdo->prepare("SELECT nome, email FROM utenti WHERE eta > ?");\n$stmt->execute([18]);\n$adulti = $stmt->fetchAll();\n\nforeach ($adulti as $u) {\n    echo $u['nome'] . PHP_EOL;\n}`,
      output: `Marco\nLucia\nGianni`,
    },
  },
  'php-2-3': {
    title: 'Sessioni e autenticazione', xp: 15,
    blocks: [
      { type: 'text', md: 'Le **sessioni** PHP memorizzano dati utente lato server tra richieste diverse. Il client riceve solo un ID di sessione (cookie). Sono la base del sistema di login tradizionale.' },
      { type: 'code', label: 'sessioni.php', lang: 'php', code: `<?php\nsession_start();  // deve essere chiamato prima di qualsiasi output\n\n// LOGIN\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $email = $_POST['email'];\n    $password = $_POST['password'];\n\n    // Cerca l'utente nel DB\n    $stmt = $pdo->prepare("SELECT * FROM utenti WHERE email = ?");\n    $stmt->execute([$email]);\n    $utente = $stmt->fetch();\n\n    // Verifica password (MAI memorizzare password in chiaro!)\n    if ($utente && password_verify($password, $utente['password_hash'])) {\n        $_SESSION['utente_id'] = $utente['id'];\n        $_SESSION['nome'] = $utente['nome'];\n        header('Location: /dashboard');\n        exit;\n    }\n}\n\n// PROTEGGERE UNA PAGINA\nif (!isset($_SESSION['utente_id'])) {\n    header('Location: /login');\n    exit;\n}\n\n// LOGOUT\nsession_destroy();\n\n// Registra un nuovo utente\n$hash = password_hash($password, PASSWORD_BCRYPT);` },
      { type: 'keypoints', title: 'Sicurezza sessioni', points: [
        '`password_hash()` + `password_verify()` — mai MD5 o SHA1!',
        '`session_regenerate_id(true)` dopo il login (previene session fixation)',
        'Usa HTTPS — i cookie di sessione viaggiano in chiaro su HTTP',
        '`HttpOnly` e `Secure` flags per proteggere i cookie di sessione',
      ]},
    ],
    tryIt: {
      desc: "Hash di una password e verifica che corrisponda:",
      code: `<?php\n$password = "MiaPassword123!";\n$hash = password_hash($password, PASSWORD_BCRYPT);\n\necho password_verify("MiaPassword123!", $hash) ? "OK" : "ERRORE";\necho password_verify("password_sbagliata", $hash) ? "OK" : "ERRORE";`,
      output: `OK\nERRORE`,
    },
  },

  'ts-1-1': {
    title: 'Tipi primitivi', xp: 10,
    blocks: [
      { type: 'text', md: '**TypeScript** aggiunge un sistema di tipi statico a JavaScript. Il compilatore `tsc` verifica i tipi a compile-time, riducendo i bug a runtime.' },
      { type: 'code', label: 'types.ts', lang: 'ts', code: `// Tipi primitivi\nlet nome: string = "Marco";\nlet eta: number = 28;\nlet attivo: boolean = true;\n\n// Array e Tuple\nlet numeri: number[] = [1, 2, 3];\nlet coppia: [string, number] = ["età", 28];\n\n// Union type\nlet id: string | number = "abc123";\nid = 42; // ✓ valido` },
      { type: 'text', md: 'TypeScript usa la **type inference** — spesso non devi annotare esplicitamente il tipo, il compilatore lo deduce dal valore assegnato.' },
    ],
    tryIt: {
      desc: 'Dichiara una funzione tipizzata che somma due numeri:',
      code: `// Completa la funzione\nfunction somma(a: number, b: number): number {\n  // ...\n}\n\nconsole.log(somma(3, 4)); // 7`,
      output: '7',
    },
  },
}

// ── Quizzes ─────────────────────────────────────────────────────────────────

export const quizzes = {
  // ── GIT ───────────────────────────────────────────────────────────────────
  'git-1-1': {
    title: "Cos'è Git?", xp: 10,
    blocks: [
      { type: 'text', md: '**Git** è un sistema di **version control distribuito** creato da Linus Torvalds nel 2005. Registra la storia completa del codice e permette a più sviluppatori di collaborare senza sovrascriversi.' },
      { type: 'keypoints', title: 'Concetti fondamentali', points: [
        '**Repository**: cartella dove Git traccia le modifiche (`.git/`)',
        '**Commit**: snapshot dello stato del progetto in un momento preciso',
        '**Branch**: linea di sviluppo parallela e indipendente',
        '**Distribuito**: ogni sviluppatore ha una copia completa della storia',
      ]},
      { type: 'code', label: 'terminale', lang: 'bash', code: `# Inizializza un nuovo repository\ngit init\n\n# Clona un repository esistente\ngit clone https://github.com/utente/progetto.git\n\n# Configura la tua identità (una volta sola)\ngit config --global user.name "Marco Rossi"\ngit config --global user.email "marco@esempio.com"\n\n# Verifica la configurazione\ngit config --list` },
      { type: 'text', md: 'La cartella nascosta **`.git/`** contiene tutta la storia del progetto. Non cancellarla mai — è il cuore del repository.' },
    ],
    tryIt: {
      desc: 'Inizializza un repository e configura il tuo nome:',
      code: `git init mio-progetto\ncd mio-progetto\ngit config user.name "Il Tuo Nome"\ngit status`,
      output: `Initialized empty Git repository in mio-progetto/.git/\nOn branch main\nNothing to commit`,
    },
  },
  'git-1-2': {
    title: 'Add, Commit e Status', xp: 10,
    blocks: [
      { type: 'text', md: 'Il flusso base di Git è: **modifica** i file → **stage** le modifiche con `git add` → **salva** lo snapshot con `git commit`. Ogni commit è un punto a cui puoi tornare.' },
      { type: 'code', label: 'flusso-base.sh', lang: 'bash', code: `# Vedi lo stato della working directory\ngit status\n\n# Stage di un file specifico\ngit add README.md\n\n# Stage di tutti i file modificati\ngit add .\n\n# Crea il commit con messaggio\ngit commit -m "feat: aggiungi homepage"\n\n# Stage + commit in un colpo (solo file già tracciati)\ngit commit -am "fix: correggi typo nel titolo"\n\n# Vedi la storia dei commit\ngit log\ngit log --oneline --graph   # versione compatta\n\n# Mostra le differenze\ngit diff            # unstaged changes\ngit diff --staged   # staged changes` },
      { type: 'keypoints', title: 'Buoni messaggi di commit', points: [
        'Usa il presente imperativo: "Add feature" non "Added feature"',
        'Prefissi utili: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`',
        'Prima riga: max 72 caratteri — il titolo',
        'Corpo opzionale separato da riga vuota per spiegare il "perché"',
      ]},
    ],
    tryIt: {
      desc: 'Crea un file, aggiungilo e fai il tuo primo commit:',
      code: `echo "# Mio Progetto" > README.md\ngit add README.md\ngit commit -m "docs: aggiungi README"\ngit log --oneline`,
      output: `a3f9b2c docs: aggiungi README`,
    },
  },
  'git-1-3': {
    title: 'Branch e Merge', xp: 10,
    blocks: [
      { type: 'text', md: 'I **branch** permettono di sviluppare feature in isolamento senza toccare il codice principale. Il **merge** riunisce le modifiche nel branch di destinazione.' },
      { type: 'code', label: 'branch.sh', lang: 'bash', code: `# Lista i branch (asterisco = branch corrente)\ngit branch\n\n# Crea un nuovo branch\ngit branch feature/login\n\n# Spostati sul branch\ngit checkout feature/login\n\n# Crea e spostati in un colpo (scorciatoia)\ngit checkout -b feature/login\n# oppure (Git 2.23+)\ngit switch -c feature/login\n\n# Lavora, aggiungi commit...\ngit add .\ngit commit -m "feat: implementa form di login"\n\n# Torna al branch principale e fa il merge\ngit switch main\ngit merge feature/login\n\n# Elimina il branch dopo il merge\ngit branch -d feature/login` },
      { type: 'text', md: 'Con `git merge` il branch `feature/login` si fonde in `main`. Se entrambi i branch hanno modifiche sulle stesse righe, Git segnala un **conflitto** da risolvere manualmente.' },
    ],
    tryIt: {
      desc: 'Crea un branch, aggiungi un commit e fai il merge in main:',
      code: `git switch -c feature/navbar\necho "nav" > navbar.html\ngit add . && git commit -m "feat: aggiungi navbar"\ngit switch main\ngit merge feature/navbar\ngit log --oneline --graph`,
      output: `*   Merge branch 'feature/navbar'\n|\\\n| * a1b2c3d feat: aggiungi navbar\n|/\n* 9f8e7d6 commit precedente`,
    },
  },
  'git-2-1': {
    title: 'Remote e GitHub', xp: 15,
    blocks: [
      { type: 'text', md: 'Un **remote** è la versione del repository ospitata su un server (GitHub, GitLab, Bitbucket). `push` invia i tuoi commit al remote, `pull` scarica e integra i commit del remote.' },
      { type: 'code', label: 'remote.sh', lang: 'bash', code: `# Aggiungi un remote\ngit remote add origin https://github.com/utente/repo.git\n\n# Lista i remote configurati\ngit remote -v\n\n# Invia il branch al remote (prima volta)\ngit push -u origin main\n\n# Push successivi\ngit push\n\n# Scarica e integra le modifiche remote\ngit pull\n\n# Scarica senza integrare (solo fetch)\ngit fetch origin\ngit log origin/main  # vedi cosa c'è sul remote\n\n# Invia un nuovo branch\ngit push -u origin feature/login\n\n# Clona in una cartella specifica\ngit clone https://github.com/utente/repo.git ./cartella` },
      { type: 'keypoints', title: 'Push e Pull', points: [
        '`-u origin main` imposta il tracking — dopo basta `git push`',
        '`git pull` = `git fetch` + `git merge` in un colpo',
        'Non fare mai `git push --force` su branch condivisi',
        '`origin` è il nome convenzionale del remote principale',
      ]},
    ],
    tryIt: {
      desc: 'Collega il tuo repo a GitHub e invia il primo push:',
      code: `git remote add origin https://github.com/tuonome/repo.git\ngit branch -M main\ngit push -u origin main`,
      output: `Branch 'main' set up to track remote branch 'main' from 'origin'\n * [new branch] main -> origin/main`,
    },
  },
  'git-2-2': {
    title: 'Pull Request e Code Review', xp: 15,
    blocks: [
      { type: 'text', md: 'Una **Pull Request** (PR) è una proposta di merge del tuo branch nel branch principale. È il cuore del workflow collaborativo su GitHub: permette code review, discussioni e CI automatica prima del merge.' },
      { type: 'code', label: 'pr-workflow.sh', lang: 'bash', code: `# 1. Crea il tuo branch di feature\ngit switch -c feature/aggiungi-auth\n\n# 2. Lavora e committa\ngit add .\ngit commit -m "feat: aggiungi autenticazione JWT"\n\n# 3. Invia il branch su GitHub\ngit push -u origin feature/aggiungi-auth\n\n# 4. Vai su GitHub → "Compare & pull request"\n# Scrivi: titolo chiaro + descrizione del "perché"\n# Assegna reviewer, label, milestone\n\n# 5. Richiedi revisione e gestisci i feedback\ngit add .\ngit commit -m "fix: applica suggerimenti reviewer"\ngit push\n\n# 6. Dopo l'approvazione → "Merge pull request" su GitHub\n# Poi pulisci\ngit switch main\ngit pull\ngit branch -d feature/aggiungi-auth` },
      { type: 'keypoints', title: 'PR best practices', points: [
        'Una PR = una feature o fix — tienile piccole e focalizzate',
        'Titolo in forma imperativa: "Add JWT auth" non "Added JWT auth"',
        'Aggiungi context nella descrizione: screenshot, link ticket, test da fare',
        'Usa i Draft PR per lavoro in corso che vuoi feedback precoce',
      ]},
    ],
    tryIt: {
      desc: 'Simula il workflow PR: crea branch, committa e prepara il push:',
      code: `git switch -c fix/typo-homepage\nsed -i 's/Benveuto/Benvenuto/' index.html\ngit add index.html\ngit commit -m "fix: correggi typo in homepage"\ngit push -u origin fix/typo-homepage`,
      output: `Branch 'fix/typo-homepage' set up to track remote\n * [new branch] fix/typo-homepage -> origin/fix/typo-homepage`,
    },
  },
  'git-2-3': {
    title: 'Risoluzione conflitti', xp: 15,
    blocks: [
      { type: 'text', md: 'Un **conflitto** accade quando due branch modificano le stesse righe dello stesso file. Git non può decidere autonomamente quale versione tenere — tocca a te.' },
      { type: 'code', label: 'conflitti.sh', lang: 'bash', code: `# Situazione: merge con conflitto\ngit merge feature/login\n# Auto-merging index.html\n# CONFLICT (content): Merge conflict in index.html\n\n# Git marca il file con i segni di conflitto:\n# <<<<<<< HEAD\n# <h1>Benvenuto</h1>    ← tua versione (main)\n# =======\n# <h1>Login</h1>         ← versione in arrivo (feature/login)\n# >>>>>>> feature/login\n\n# Soluzione: apri il file, scegli (o combina), poi:\ngit add index.html\ngit commit  # Git propone un messaggio di merge automatico\n\n# Abbortisci il merge se vuoi ricominciare\ngit merge --abort\n\n# Vedi quali file sono in conflitto\ngit status\n\n# Usa uno strumento visivo\ngit mergetool` },
      { type: 'keypoints', title: 'Come risolvere', points: [
        '`<<<<<<< HEAD` = tua versione corrente',
        '`=======` = separatore',
        '`>>>>>>> branch` = versione in arrivo',
        'Rimuovi tutti i marcatori e tieni il codice corretto',
        'I moderni IDE (VS Code) offrono UI per scegliere quale versione tenere',
      ]},
    ],
    tryIt: {
      desc: 'Riconosci i marcatori di conflitto e risolvi tenendo entrambe le righe:',
      code: `# File con conflitto:\n<<<<<<< HEAD\n<p>Paragrafo originale</p>\n=======\n<p>Paragrafo modificato</p>\n>>>>>>> feature/update\n\n# Risolto:\n<p>Paragrafo originale</p>\n<p>Paragrafo modificato</p>`,
      output: `Conflitto risolto — git add + git commit`,
    },
  },
  'git-3-1': {
    title: 'Rebase e storia avanzata', xp: 20,
    blocks: [
      { type: 'text', md: '**Rebase** riscrive la storia dei commit spostando il branch su un nuovo punto di partenza. Produce una storia lineare e pulita — alternativa al merge per integrare feature branch.' },
      { type: 'code', label: 'rebase.sh', lang: 'bash', code: `# Rebase di feature su main aggiornato\ngit switch feature/login\ngit rebase main\n# Git ri-applica i commit di feature uno per uno su main\n\n# Rebase interattivo — modifica la storia\ngit rebase -i HEAD~3   # ultimi 3 commit\n# Si apre l'editor con le opzioni:\n# pick a1b2c3 feat: primo commit\n# squash d4e5f6 wip: secondo commit   ← unisce al precedente\n# reword g7h8i9 fix: terzo commit     ← modifica il messaggio\n\n# Comandi utili per la storia\ngit log --oneline --graph --all  # vedi tutti i branch\ngit diff main...feature/login   # diff dal punto di divergenza\ngit cherry-pick a1b2c3d          # porta un commit specifico\ngit revert a1b2c3d               # crea commit che annulla` },
      { type: 'keypoints', title: 'Merge vs Rebase', points: [
        '`merge`: preserva la storia reale, crea un merge commit',
        '`rebase`: storia lineare e pulita, riscrive i commit',
        'Non fare rebase su branch condivisi con altri',
        '`squash` prima del merge mantiene `main` pulita',
      ]},
    ],
    tryIt: {
      desc: 'Usa rebase interattivo per unire gli ultimi 2 commit in uno solo:',
      code: `# Hai questi commit:\n# abc123 wip: lavoro intermedio\n# def456 feat: feature completata\n\ngit rebase -i HEAD~2\n# Nell'editor:\n# pick def456 feat: feature completata\n# squash abc123 wip: lavoro intermedio`,
      output: `Successfully rebased and updated refs/heads/feature`,
    },
  },
  'git-3-2': {
    title: 'Git Flow e strategie di branching', xp: 20,
    blocks: [
      { type: 'text', md: '**Git Flow** è una convenzione di branching per team. Definisce branch con ruoli precisi per feature, release e hotfix, garantendo un processo di release controllato.' },
      { type: 'code', label: 'gitflow.sh', lang: 'bash', code: `# Branch principali:\n# main       → codice in produzione (ogni commit è una release)\n# develop    → integrazione feature (staging)\n\n# Branch di supporto:\n# feature/*  → nuove funzionalità (da develop)\n# release/*  → preparazione release (da develop)\n# hotfix/*   → fix urgenti su main\n\n# Workflow feature:\ngit switch develop\ngit switch -c feature/pagamento\n# ... sviluppo ...\ngit switch develop\ngit merge --no-ff feature/pagamento  # --no-ff preserva il merge commit\ngit branch -d feature/pagamento\n\n# Workflow hotfix:\ngit switch main\ngit switch -c hotfix/fix-login\n# ... fix ...\ngit switch main && git merge --no-ff hotfix/fix-login\ngit tag -a v1.0.1 -m "Hotfix login"\ngit switch develop && git merge --no-ff hotfix/fix-login` },
      { type: 'keypoints', title: 'Strategie moderne', points: [
        '**Git Flow**: ideale per release con versioni numerate',
        '**GitHub Flow**: branch + PR su main — più semplice, CD-friendly',
        '**Trunk Based**: commit diretti su main + feature flag — massima velocità',
        'Scegli in base alla frequenza di release del team',
      ]},
    ],
    tryIt: {
      desc: "Simula il workflow GitHub Flow: branch, feature, PR pronto al merge:",
      code: `# Tutto da main, niente develop\ngit switch main && git pull\ngit switch -c feature/dark-mode\n# ... sviluppo ...\ngit push -u origin feature/dark-mode\n# Apri PR su GitHub → review → merge`,
      output: `PR ready: feature/dark-mode → main`,
    },
  },
  'git-3-3': {
    title: 'Hook e automazione', xp: 20,
    blocks: [
      { type: 'text', md: 'I **Git hook** sono script eseguiti automaticamente in risposta a eventi Git (commit, push, merge). Permettono di automatizzare lint, test, formattazione prima che il codice entri nel repository.' },
      { type: 'code', label: 'hooks.sh', lang: 'bash', code: `# Gli hook si trovano in .git/hooks/\nls .git/hooks/\n# pre-commit, pre-push, commit-msg, post-merge...\n\n# Hook pre-commit: esegue lint prima di ogni commit\n# .git/hooks/pre-commit (deve essere eseguibile)\n#!/bin/sh\nnpm run lint\nif [ $? -ne 0 ]; then\n  echo "❌ Lint fallito — commit annullato"\n  exit 1\nfi\n\n# Rendi eseguibile\nchmod +x .git/hooks/pre-commit\n\n# commit-msg: verifica formato messaggio\n#!/bin/sh\nMSG=$(cat "$1")\nif ! echo "$MSG" | grep -qE "^(feat|fix|docs|refactor|test):"; then\n  echo "❌ Messaggio non segue Conventional Commits"\n  exit 1\nfi\n\n# Strumenti per team (hook condivisi)\n# Husky: npm install --save-dev husky\n# npx husky init\n# echo "npm test" > .husky/pre-push` },
      { type: 'keypoints', title: 'Hook più utili', points: [
        '`pre-commit`: lint, format, test veloci — blocca commit sporchi',
        '`commit-msg`: valida il formato del messaggio (Conventional Commits)',
        '`pre-push`: esegue test completi prima del push',
        'Usa **Husky** per condividere gli hook nel team via `package.json`',
      ]},
    ],
    tryIt: {
      desc: 'Crea un hook pre-commit che blocca il commit se ci sono console.log nel codice:',
      code: `#!/bin/sh\nif git diff --staged | grep -q "console.log"; then\n  echo "❌ Rimuovi i console.log prima di committare!"\n  exit 1\nfi\nexit 0`,
      output: `❌ Rimuovi i console.log prima di committare!`,
    },
  },

  // ── LINUX CLI ─────────────────────────────────────────────────────────────
  'linux-1-1': {
    title: 'Navigare il filesystem', xp: 10,
    blocks: [
      { type: 'text', md: 'Il filesystem Linux è organizzato ad albero con radice in **`/`**. Tutto — file, dispositivi, processi — è rappresentato come file. Navigare il terminale è la skill base di qualsiasi sviluppatore backend.' },
      { type: 'code', label: 'navigazione.sh', lang: 'bash', code: `# Dove sei?\npwd                  # /home/marco\n\n# Cosa c'è qui?\nls                   # lista base\nls -la               # lista dettagliata con file nascosti\nls -lh               # dimensioni leggibili (KB, MB)\n\n# Spostati\ncd /var/log          # percorso assoluto\ncd ..                # su di un livello\ncd ~                 # home directory\ncd -                 # directory precedente\n\n# Esplora ad albero\ntree -L 2            # 2 livelli di profondità\nfind /etc -name "*.conf" -type f   # cerca file\n\n# Percorsi speciali\n.     # directory corrente\n..    # directory padre\n~     # home dell'utente corrente\n/     # radice del filesystem` },
      { type: 'keypoints', title: 'Directory importanti', points: [
        '`/etc` — file di configurazione del sistema',
        '`/var/log` — log di sistema e applicazioni',
        '`/home/utente` — file personali degli utenti',
        '`/usr/bin` — eseguibili dei programmi installati',
        '`/tmp` — file temporanei (svuotato al riavvio)',
      ]},
    ],
    tryIt: {
      desc: 'Naviga in /tmp, crea una cartella test e torna alla home:',
      code: `cd /tmp\nls -la\nmkdir test-cartella\ncd test-cartella\npwd\ncd ~\npwd`,
      output: `/tmp/test-cartella\n/home/marco`,
    },
  },
  'linux-1-2': {
    title: 'File e directory', xp: 10,
    blocks: [
      { type: 'text', md: 'Creare, copiare, spostare ed eliminare file e directory sono operazioni quotidiane. Il terminale è molto più veloce del file manager grafico per operazioni in massa.' },
      { type: 'code', label: 'file-ops.sh', lang: 'bash', code: `# Crea file\ntouch file.txt              # file vuoto\necho "contenuto" > file.txt  # sovrascrive\necho "altra riga" >> file.txt # appende\n\n# Leggi file\ncat file.txt               # intero file\nhead -n 20 file.txt        # prime 20 righe\ntail -n 20 file.txt        # ultime 20 righe\ntail -f /var/log/nginx/access.log  # live (segui il log)\nless file.txt              # paginato (q per uscire)\n\n# Directory\nmkdir -p progetti/web/frontend  # crea anche le intermedie\n\n# Copia\ncp file.txt backup.txt\ncp -r cartella/ backup/    # copia ricorsiva\n\n# Sposta / rinomina\nmv file.txt docs/file.txt\nmv vecchio.txt nuovo.txt\n\n# Elimina (ATTENZIONE: irreversibile!)\nrm file.txt\nrm -r cartella/            # ricorsivo\nrm -rf dist/ node_modules/ # forza, no conferma` },
      { type: 'text', md: '`rm -rf` è irreversibile — non c\'è cestino nel terminale. Verifica sempre il percorso prima di usarlo su directory importanti.' },
    ],
    tryIt: {
      desc: 'Crea un file di log, aggiungi 3 righe e visualizza solo le ultime 2:',
      code: `echo "2024-01-01 INFO: Start" > app.log\necho "2024-01-01 ERROR: Crash" >> app.log\necho "2024-01-01 INFO: Restart" >> app.log\ntail -n 2 app.log`,
      output: `2024-01-01 ERROR: Crash\n2024-01-01 INFO: Restart`,
    },
  },
  'linux-1-3': {
    title: 'Permessi e utenti', xp: 10,
    blocks: [
      { type: 'text', md: 'Linux è un sistema **multiutente**. Ogni file ha un proprietario e permessi separati per proprietario, gruppo e altri. Capire i permessi è fondamentale per la sicurezza dei server.' },
      { type: 'code', label: 'permessi.sh', lang: 'bash', code: `# Vedi permessi\nls -la\n# drwxr-xr-x  2 marco dev 4096 gen 15 10:30 cartella\n# -rw-r--r--  1 marco dev  256 gen 15 10:25 file.txt\n# └┬┘└─┬─┘└─┬─┘\n#  │   │    └── altri (o)\n#  │   └─────── gruppo (g)\n#  └─────────── proprietario (u)\n# r=leggi w=scrivi x=esegui\n\n# Cambia permessi (simbolico)\nchmod +x script.sh           # aggiunge esecuzione a tutti\nchmod 644 file.txt           # rw-r--r--\nchmod 755 script.sh          # rwxr-xr-x\nchmod -R 755 cartella/       # ricorsivo\n\n# Octal: r=4, w=2, x=1 (sommati per combinazioni)\n# 7=rwx, 6=rw-, 5=r-x, 4=r--\n\n# Cambia proprietario\nchown marco:dev file.txt     # utente:gruppo\nchown -R www-data /var/www   # server web\n\n# Esegui come admin\nsudo apt update\nsudo systemctl restart nginx` },
      { type: 'keypoints', title: 'Permessi comuni', points: [
        '`644` (rw-r--r--): file normali, leggibili da tutti',
        '`755` (rwxr-xr-x): script ed eseguibili',
        '`600` (rw-------): file sensibili (.env, chiavi SSH)',
        '`www-data`: utente del web server (Nginx/Apache)',
      ]},
    ],
    tryIt: {
      desc: 'Crea uno script, rendilo eseguibile e verifica i permessi:',
      code: `echo '#!/bin/bash\necho "Hello!"' > saluta.sh\nchmod +x saluta.sh\nls -la saluta.sh\n./saluta.sh`,
      output: `-rwxr-xr-x 1 marco marco 28 gen 15 saluta.sh\nHello!`,
    },
  },
  'linux-2-1': {
    title: 'Filtri, pipe e redirect', xp: 15,
    blocks: [
      { type: 'text', md: 'La **pipe** (`|`) collega l\'output di un comando all\'input del successivo. Il **redirect** (`>`, `>>`, `<`) redirige input/output verso file. Sono la filosofia Unix: piccoli programmi che si compongono.' },
      { type: 'code', label: 'pipe.sh', lang: 'bash', code: `# grep — cerca pattern\ngrep "ERROR" app.log\ngrep -i "error" app.log      # case-insensitive\ngrep -n "404" access.log     # mostra numero riga\ngrep -r "password" ./src/    # ricerca ricorsiva\n\n# pipe: concatena comandi\ncat access.log | grep "404" | wc -l   # conta gli errori 404\nls -la | grep "^d"                    # solo directory\nps aux | grep nginx                   # processi nginx\n\n# sort, uniq, wc\ncat log | sort | uniq -c | sort -rn   # frequenza occorrenze\nwc -l file.txt                        # conta righe\n\n# awk — processore di testo potente\nawk '{print $1}' access.log           # prima colonna\nawk -F: '{print $1}' /etc/passwd      # sep. personalizzato\n\n# sed — stream editor\nsed 's/vecchio/nuovo/g' file.txt      # replace\nsed '/pattern/d' file.txt             # elimina righe\n\n# Redirect\ncommand > output.txt     # sovrascrive\ncommand >> output.txt    # appende\ncommand 2> errori.txt    # redirect stderr\ncommand &> tutto.txt     # stdout + stderr` },
      { type: 'text', md: 'Combinare `grep`, `awk`, `sed` e `sort` permette di analizzare file di log enormi in pochi secondi — molto più veloce di qualsiasi script Python per operazioni semplici.' },
    ],
    tryIt: {
      desc: 'Conta quante volte "ERROR" appare nel log, ignorando maiuscole/minuscole:',
      code: `grep -i "error" app.log | wc -l`,
      output: `7`,
    },
  },
  'linux-2-2': {
    title: 'Processi e job control', xp: 15,
    blocks: [
      { type: 'text', md: 'Un **processo** è un programma in esecuzione. Linux permette di avviare processi in background, sospenderli, monitorarli e terminarli — fondamentale per gestire server e servizi.' },
      { type: 'code', label: 'processi.sh', lang: 'bash', code: `# Vedi i processi\nps aux                          # tutti i processi\nps aux | grep nginx\ntop                             # monitor interattivo\nhtop                            # versione migliorata\n\n# PID — Process ID\npidof nginx                     # PID di nginx\n\n# Termina processi\nkill 1234                       # SIGTERM (graceful)\nkill -9 1234                    # SIGKILL (immediato)\nkillall nginx                   # per nome\n\n# Background e foreground\nnpm run build &                 # avvia in background\njobs                            # lista job background\nfg %1                           # porta in foreground\nbg %1                           # manda in background\nCtrl+Z                          # sospende il processo corrente\n\n# nohup — sopravvive alla chiusura del terminale\nnohup node server.js &\n\n# Priorità (nice value: -20 alta → 19 bassa)\nnice -n 10 node script.js\nrenice -n 5 -p 1234` },
      { type: 'keypoints', title: 'Segnali importanti', points: [
        '`SIGTERM` (15): chiedi al processo di terminare — gestito dal programma',
        '`SIGKILL` (9): forza la terminazione immediata — non ignorabile',
        '`SIGHUP` (1): ricarica la configurazione (usato da Nginx, ecc.)',
        'Usa `kill -9` solo come ultima risorsa',
      ]},
    ],
    tryIt: {
      desc: 'Avvia un processo in background, visualizzalo e poi terminalo:',
      code: `sleep 60 &\njobs\nkill %1\njobs`,
      output: `[1] 1234\n[1]+  Running  sleep 60\n[1]+  Terminated  sleep 60`,
    },
  },
  'linux-2-3': {
    title: 'Variabili e script Bash', xp: 15,
    blocks: [
      { type: 'text', md: 'Bash è sia una shell interattiva che un linguaggio di scripting. Gli **script Bash** automatizzano operazioni ripetitive: deploy, backup, setup ambienti.' },
      { type: 'code', label: 'script.sh', lang: 'bash', code: `#!/bin/bash\n# La shebang line indica l'interprete da usare\n\n# Variabili\nNOME="Marco"\neta=28\necho "Ciao $NOME, hai $eta anni"\n\n# Variabili speciali\n$0    # nome dello script\n$1    # primo argomento\n$?    # exit code dell'ultimo comando\n$$    # PID dello script\n\n# Condizioni\nif [ $eta -ge 18 ]; then\n  echo "Maggiorenne"\nelif [ $eta -ge 13 ]; then\n  echo "Adolescente"\nelse\n  echo "Minorenne"\nfi\n\n# Loop\nfor file in *.log; do\n  echo "Processo: $file"\ndone\n\nfor i in {1..5}; do\n  echo "Iterazione $i"\ndone\n\n# Funzioni\nsaluta() {\n  local nome=$1      # variabile locale\n  echo "Ciao, $nome!"\n}\nsaluta "Lucia"\n\n# Verifica errori\nif ! cp file.txt backup/; then\n  echo "Errore durante la copia!" >&2\n  exit 1\nfi` },
      { type: 'text', md: 'Aggiungi sempre `set -euo pipefail` in testa agli script per farli fallire subito in caso di errore invece di continuare silenziosamente.' },
    ],
    tryIt: {
      desc: "Scrivi uno script che prende un nome come argomento e stampa 'Ciao, [nome]!':",
      code: `#!/bin/bash\nnome=${1:-"Mondo"}   # default "Mondo" se non passato\necho "Ciao, $nome!"\n\n# Esegui con:\n# bash saluta.sh Marco`,
      output: `Ciao, Marco!`,
    },
  },
  'linux-3-1': {
    title: 'SSH e server remoti', xp: 20,
    blocks: [
      { type: 'text', md: '**SSH** (Secure Shell) è il protocollo standard per connettersi in modo sicuro a server remoti. Usa crittografia asimmetrica — una coppia di chiavi pubblica/privata.' },
      { type: 'code', label: 'ssh.sh', lang: 'bash', code: `# Genera coppia di chiavi\nssh-keygen -t ed25519 -C "marco@esempio.com"\n# Crea: ~/.ssh/id_ed25519 (privata) e ~/.ssh/id_ed25519.pub (pubblica)\n\n# Copia la chiave pubblica sul server\nssh-copy-id utente@server.esempio.com\n# Oppure manualmente:\ncat ~/.ssh/id_ed25519.pub | ssh utente@server 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'\n\n# Connessione base\nssh utente@server.esempio.com\nssh -p 2222 utente@server.com      # porta personalizzata\nssh -i ~/.ssh/chiave utente@server  # chiave specifica\n\n# Copia file (SCP)\nscp file.txt utente@server:/var/www/\nscp -r cartella/ utente@server:/home/utente/\n\n# Sincronizzazione (rsync)\nrsync -avz --delete ./dist/ utente@server:/var/www/html/\n\n# ~/.ssh/config — alias per connessioni frequenti\n# Host myserver\n#   HostName 192.168.1.100\n#   User ubuntu\n#   IdentityFile ~/.ssh/myserver_key\nssh myserver   # usa la config sopra` },
      { type: 'keypoints', title: 'Sicurezza SSH', points: [
        'Non usare mai password per SSH su server pubblici — solo chiavi',
        'Disabilita il login root: `PermitRootLogin no` in `/etc/ssh/sshd_config`',
        'Cambia la porta default 22 per ridurre i bot scan',
        'Usa `~/.ssh/config` per gestire più server senza ricordare IP',
      ]},
    ],
    tryIt: {
      desc: 'Genera una coppia di chiavi ed25519 e visualizza la chiave pubblica:',
      code: `ssh-keygen -t ed25519 -C "test@esempio.com" -f ~/.ssh/test_key -N ""\ncat ~/.ssh/test_key.pub`,
      output: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... test@esempio.com`,
    },
  },
  'linux-3-2': {
    title: 'Cron, systemd e automazione', xp: 20,
    blocks: [
      { type: 'text', md: '**Cron** esegue comandi a orari programmati. **Systemd** gestisce i servizi del sistema — avvio, stop, riavvio automatico, log. Sono gli strumenti base per l\'automazione lato server.' },
      { type: 'code', label: 'cron-systemd.sh', lang: 'bash', code: `# CRON — task programmati\ncrontab -e    # modifica crontab utente\ncrontab -l    # lista crontab utente\n\n# Formato: minuto ora giorno mese giorno_settimana comando\n# *   *   *    *      *\n# 0   2   *    *      *  /backup.sh        # ogni notte alle 02:00\n# */5 *   *    *      *  /check.sh         # ogni 5 minuti\n# 0   9   *    *      1  /weekly.sh        # lunedì alle 9:00\n\n# SYSTEMD — gestione servizi\nsystemctl status nginx         # stato del servizio\nsystemctl start nginx          # avvia\nsystemctl stop nginx           # ferma\nsystemctl restart nginx        # riavvia\nsystemctl reload nginx         # ricarica config (graceful)\nsystemctl enable nginx         # avvia al boot\nsystemctl disable nginx        # non avviare al boot\n\n# Log dei servizi\njournalctl -u nginx            # log di nginx\njournalctl -u nginx -f         # log in tempo reale\njournalctl -u nginx --since "1 hour ago"\n\n# Crea un servizio systemd\n# /etc/systemd/system/myapp.service\n[Unit]\nDescription=La mia applicazione Node\n[Service]\nExecStart=/usr/bin/node /app/server.js\nRestart=always\n[Install]\nWantedBy=multi-user.target` },
      { type: 'text', md: 'Systemd `Restart=always` fa ripartire automaticamente l\'applicazione in caso di crash — molto meglio di un semplice `nohup node server.js &`.' },
    ],
    tryIt: {
      desc: 'Scrivi la riga cron per eseguire /backup.sh ogni domenica alle 3:00 di notte:',
      code: `# minuto  ora  giorno  mese  giorno_settimana  comando\n0       3    *       *     0                /backup.sh`,
      output: `Cron job attivo: domenica 03:00 → /backup.sh`,
    },
  },
  'linux-3-3': {
    title: 'Networking e diagnostica', xp: 20,
    blocks: [
      { type: 'text', md: 'Diagnosticare problemi di rete dal terminale è una skill fondamentale per chi gestisce server. I comandi di networking permettono di ispezionare connessioni, porte aperte e percorsi di rete.' },
      { type: 'code', label: 'networking.sh', lang: 'bash', code: `# Configurazione di rete\nip addr                     # indirizzi IP\nip route                    # tabella di routing\nhostname -I                 # IP del server\n\n# DNS\nnslookup esempio.com\ndig esempio.com\ndig esempio.com MX           # record email\n\n# Connettività\nping -c 4 google.com\ntraceroute google.com        # percorso pacchetti\ncurl -I https://esempio.com  # header HTTP risposta\ncurl -o /dev/null -s -w "%{http_code}" https://api.com  # solo status\n\n# Porte e connessioni\nnetstat -tlnp               # porte in ascolto + PID\nss -tlnp                    # alternativa moderna a netstat\nlsof -i :3000               # chi usa la porta 3000?\n\n# Firewall (UFW su Ubuntu)\nufw status\nufw allow 80/tcp\nufw allow 443/tcp\nufw deny 22/tcp\n\n# Trasferimento\nwget https://esempio.com/file.zip\ncurl -O https://esempio.com/file.zip\n\n# Diagnostica avanzata\ntcpdump -i eth0 port 80     # cattura traffico HTTP\nmtr google.com              # traceroute continuo` },
      { type: 'keypoints', title: 'Comandi essenziali', points: [
        '`curl -I` per controllare header e status code di una URL',
        '`ss -tlnp` per vedere quali servizi ascoltano su quali porte',
        '`lsof -i :porta` per trovare il processo che usa quella porta',
        '`dig` per diagnosticare problemi DNS in dettaglio',
      ]},
    ],
    tryIt: {
      desc: 'Verifica quali porte sono in ascolto sul sistema e filtra quelle TCP:',
      code: `ss -tlnp\n# oppure\nnetstat -tlnp 2>/dev/null | grep LISTEN`,
      output: `tcp  0.0.0.0:80    LISTEN  nginx\ntcp  0.0.0.0:443   LISTEN  nginx\ntcp  0.0.0.0:3306  LISTEN  mysqld`,
    },
  },

  // ── CI/CD ─────────────────────────────────────────────────────────────────
  'cicd-1-1': {
    title: "Cos'è CI/CD?", xp: 10,
    blocks: [
      { type: 'text', md: '**CI/CD** è una pratica DevOps che automatizza il processo di integrazione e rilascio del codice. CI = Continuous Integration, CD = Continuous Delivery/Deployment.' },
      { type: 'keypoints', title: 'CI vs CD', points: [
        '**CI (Continuous Integration)**: ogni push esegue build, test e analisi — rileva errori subito',
        '**Continuous Delivery**: il codice è sempre pronto al deploy — manuale o automatico',
        '**Continuous Deployment**: ogni commit che passa i test va automaticamente in produzione',
        'Obiettivo: eliminare il "works on my machine" e ridurre il rischio di ogni release',
      ]},
      { type: 'code', label: 'concetto.txt', lang: 'bash', code: `# Flusso CI/CD tipico:\n\n# 1. Developer fa push su GitHub\ngit push origin feature/login\n\n# 2. CI Pipeline si avvia automaticamente:\n#    → Installa dipendenze\n#    → Esegue lint e type check\n#    → Esegue test unitari e integrazione\n#    → Build dell'applicazione\n#    → Analisi sicurezza (SAST)\n\n# 3. Se tutto passa → CD\n#    → Build Docker image\n#    → Push su registry (Docker Hub, ECR...)\n#    → Deploy su staging\n#    → Test E2E su staging\n#    → (opzionale) Deploy su produzione` },
      { type: 'text', md: 'Senza CI/CD, il deploy è un evento raro e rischioso. Con CI/CD, è un evento quotidiano e sicuro — i team rilasciano anche 50+ volte al giorno.' },
    ],
    tryIt: {
      desc: 'Identifica le 3 fasi della pipeline: quale fase rileva bug precocemente?',
      code: `# Pipeline:\n# [Push] → [Build] → [Test] → [Deploy staging] → [Deploy prod]\n#\n# La fase più importante per rilevare bug è:\n# → Test (CI) — prima che raggiunga qualsiasi ambiente`,
      output: `CI: Test automatici\nCD: Deploy automatico`,
    },
  },
  'cicd-1-2': {
    title: 'GitHub Actions: primo workflow', xp: 10,
    blocks: [
      { type: 'text', md: '**GitHub Actions** è la piattaforma CI/CD integrata in GitHub. I workflow sono file YAML nella cartella `.github/workflows/`. Ogni push può avviare automaticamente build, test e deploy.' },
      { type: 'code', label: '.github/workflows/ci.yml', lang: 'yaml', code: `name: CI\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout codice\n        uses: actions/checkout@v4\n\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - name: Installa dipendenze\n        run: npm ci\n\n      - name: Lint\n        run: npm run lint\n\n      - name: Test\n        run: npm test\n\n      - name: Build\n        run: npm run build` },
      { type: 'keypoints', title: 'Anatomia del workflow', points: [
        '`on`: definisce i trigger (push, PR, schedule, manuale)',
        '`jobs`: gruppi di step eseguiti su una macchina virtuale',
        '`runs-on`: OS del runner (ubuntu-latest, windows-latest, macos-latest)',
        '`uses`: riusa action pubbliche dal GitHub Marketplace',
        '`run`: esegue comandi shell direttamente',
      ]},
    ],
    tryIt: {
      desc: 'Crea il file del workflow nella cartella corretta:',
      code: `mkdir -p .github/workflows\ncat > .github/workflows/ci.yml << 'EOF'\nname: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Pipeline avviata!"\nEOF`,
      output: `Workflow creato: .github/workflows/ci.yml`,
    },
  },
  'cicd-1-3': {
    title: 'Pipeline YAML e trigger', xp: 10,
    blocks: [
      { type: 'text', md: 'I **trigger** definiscono quando si avvia la pipeline. Puoi reagire a push, PR, tag, schedule o eventi manuali. La configurazione YAML permette un controllo fine su branch e percorsi.' },
      { type: 'code', label: 'triggers.yml', lang: 'yaml', code: `on:\n  # Push su branch specifici\n  push:\n    branches:\n      - main\n      - 'release/**'\n    paths:\n      - 'src/**'       # solo se cambia qualcosa in src/\n      - '!**.md'       # escludi i file markdown\n\n  # PR verso main\n  pull_request:\n    branches: [main]\n    types: [opened, synchronize, reopened]\n\n  # Schedule (cron syntax)\n  schedule:\n    - cron: '0 2 * * *'   # ogni notte alle 2:00 UTC\n\n  # Trigger manuale con parametri\n  workflow_dispatch:\n    inputs:\n      ambiente:\n        description: 'Ambiente di deploy'\n        required: true\n        default: 'staging'\n        type: choice\n        options: [staging, production]\n\n  # Trigger da altro workflow\n  workflow_call:\n    inputs:\n      versione:\n        type: string` },
      { type: 'text', md: 'Il filtro `paths` è potente: la pipeline per il backend non parte se cambi solo file del frontend, risparmiando minuti di esecuzione (e costi) ogni giorno.' },
    ],
    tryIt: {
      desc: 'Scrivi il trigger per avviare la pipeline solo su push a main e su PR:',
      code: `on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]`,
      output: `Trigger configurati: push su main + PR verso main`,
    },
  },
  'cicd-2-1': {
    title: 'Test automatizzati nella pipeline', xp: 15,
    blocks: [
      { type: 'text', md: 'Integrare i test nella pipeline garantisce che nessun codice rotto raggiunga il repository. GitHub Actions può eseguire test unitari, di integrazione e E2E con report automatici.' },
      { type: 'code', label: 'test-pipeline.yml', lang: 'yaml', code: `jobs:\n  test:\n    runs-on: ubuntu-latest\n\n    services:\n      mysql:\n        image: mysql:8\n        env:\n          MYSQL_DATABASE: testdb\n          MYSQL_ROOT_PASSWORD: root\n        ports:\n          - 3306:3306\n        options: --health-cmd="mysqladmin ping" --health-interval=10s\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - run: npm ci\n\n      - name: Test unitari\n        run: npm run test:unit\n\n      - name: Test integrazione (con DB)\n        run: npm run test:integration\n        env:\n          DB_HOST: 127.0.0.1\n          DB_PORT: 3306\n\n      - name: Coverage report\n        uses: codecov/codecov-action@v4\n        if: always()\n        with:\n          token: ${{ secrets.CODECOV_TOKEN }}` },
      { type: 'keypoints', title: 'Services in Actions', points: [
        '`services` avvia container Docker come dipendenze (DB, Redis, ecc.)',
        '`--health-cmd` aspetta che il servizio sia pronto prima di procedere',
        '`if: always()` esegue lo step anche se i precedenti falliscono',
        '`matrix` permette di testare su più versioni Node/Python/ecc. in parallelo',
      ]},
    ],
    tryIt: {
      desc: 'Aggiungi una matrix strategy per testare su Node 18 e Node 20:',
      code: `jobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node: [18, 20]\n    steps:\n      - uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node }}\n      - run: npm test`,
      output: `Jobs in parallelo: test (node 18) + test (node 20)`,
    },
  },
  'cicd-2-2': {
    title: 'Docker in CI e build artefatti', xp: 15,
    blocks: [
      { type: 'text', md: 'Costruire e pubblicare una **Docker image** nella pipeline garantisce che l\'ambiente di produzione sia identico a quello testato. GitHub Actions si integra nativamente con Docker Hub e GitHub Container Registry.' },
      { type: 'code', label: 'docker-build.yml', lang: 'yaml', code: `jobs:\n  build-and-push:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      packages: write\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Login a GitHub Container Registry\n        uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n\n      - name: Metadati immagine\n        id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ghcr.io/${{ github.repository }}\n          tags: |\n            type=sha,prefix=commit-\n            type=ref,event=branch\n            type=semver,pattern={{version}}\n\n      - name: Build e push\n        uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max` },
      { type: 'text', md: '`cache-from: type=gha` usa la cache di GitHub Actions per velocizzare il build Docker — gli strati non cambiati non vengono ricostruiti.' },
    ],
    tryIt: {
      desc: 'Crea un Dockerfile minimale per una app Node e aggiungilo al workflow:',
      code: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
      output: `Image: ghcr.io/utente/progetto:commit-abc1234`,
    },
  },
  'cicd-2-3': {
    title: 'Deploy automatico su server', xp: 15,
    blocks: [
      { type: 'text', md: 'Dopo il build e i test, la pipeline può fare deploy automaticamente sul server. GitHub Actions supporta SSH, FTP, API cloud provider e strumenti come Ansible e Kubernetes.' },
      { type: 'code', label: 'deploy.yml', lang: 'yaml', code: `jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    needs: [test, build]     # parte solo se test e build passano\n    if: github.ref == 'refs/heads/main'\n\n    steps:\n      - uses: actions/checkout@v4\n\n      # Deploy via SSH\n      - name: Deploy su server\n        uses: appleboy/ssh-action@v1\n        with:\n          host: ${{ secrets.SERVER_HOST }}\n          username: ${{ secrets.SERVER_USER }}\n          key: ${{ secrets.SSH_PRIVATE_KEY }}\n          script: |\n            cd /var/www/myapp\n            git pull origin main\n            npm ci --only=production\n            pm2 restart myapp\n\n      # Deploy Docker su server\n      - name: Pull e riavvia container\n        uses: appleboy/ssh-action@v1\n        with:\n          host: ${{ secrets.SERVER_HOST }}\n          username: deploy\n          key: ${{ secrets.SSH_PRIVATE_KEY }}\n          script: |\n            docker pull ghcr.io/utente/app:latest\n            docker stop myapp || true\n            docker run -d --name myapp -p 80:3000 ghcr.io/utente/app:latest` },
      { type: 'keypoints', title: 'Sicurezza nel deploy', points: [
        'Usa `needs: [test]` per non fare deploy se i test falliscono',
        '`if: github.ref == refs/heads/main` — deploy solo da main',
        'Crea un utente `deploy` con permessi minimi sul server',
        'Mai usare la chiave SSH del tuo utente personale nei secrets',
      ]},
    ],
    tryIt: {
      desc: "Aggiungi la condizione che fa partire il deploy solo da main e solo se il job 'test' è passato:",
      code: `jobs:\n  deploy:\n    needs: [test]\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "Deploy in corso..."`,
      output: `Deploy avviato solo da main dopo test OK`,
    },
  },
  'cicd-3-1': {
    title: 'Ambienti multipli e strategie di deploy', xp: 20,
    blocks: [
      { type: 'text', md: 'Un pipeline maturo gestisce più **ambienti**: development, staging, production. GitHub Environments aggiunge protezioni, approvazioni manuali e URL per ogni ambiente.' },
      { type: 'code', label: 'environments.yml', lang: 'yaml', code: `jobs:\n  deploy-staging:\n    runs-on: ubuntu-latest\n    environment: staging\n    steps:\n      - name: Deploy su staging\n        run: ./deploy.sh staging\n\n  deploy-production:\n    needs: deploy-staging\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://mioapp.com   # appare nella PR\n    steps:\n      - name: Deploy in produzione\n        run: ./deploy.sh production\n\n# Strategie di deploy:\n# Blue/Green: due ambienti identici, switch del traffico\n# Canary: percentuale crescente di traffico alla nuova versione\n# Rolling: sostituisce le istanze una alla volta\n# Feature flags: deploy silenzioso, abilita per utenti selezionati\n\n# GitHub Environments — configura su GitHub.com:\n# Settings → Environments → production\n# ✓ Required reviewers (approvazione manuale)\n# ✓ Wait timer (pausa prima del deploy)\n# ✓ Deployment branches (solo da main o tag)` },
      { type: 'text', md: '**Blue/Green deployment**: mantieni due ambienti identici. Quando la nuova versione è pronta in "Green", sposti il load balancer da "Blue" a "Green" — rollback istantaneo se qualcosa va storto.' },
    ],
    tryIt: {
      desc: 'Configura un job production che richiede approvazione manuale su GitHub Environments:',
      code: `environment:\n  name: production\n  url: https://mioapp.com\n# Su GitHub: Settings → Environments → production\n# → Aggiungi Required reviewers`,
      output: `Deploy in produzione in attesa di approvazione`,
    },
  },
  'cicd-3-2': {
    title: 'Secrets, sicurezza e OIDC', xp: 20,
    blocks: [
      { type: 'text', md: 'I **secrets** di GitHub Actions sono variabili cifrate accessibili solo ai workflow. **OIDC** (OpenID Connect) permette autenticazione con cloud provider senza secrets long-lived — è l\'approccio più sicuro.' },
      { type: 'code', label: 'secrets-oidc.yml', lang: 'yaml', code: `# Secrets tradizionali (meno sicuri, ma semplici)\n- name: Deploy\n  env:\n    API_KEY: ${{ secrets.API_KEY }}\n    DB_URL: ${{ secrets.DATABASE_URL }}\n  run: ./deploy.sh\n\n# OIDC con AWS (no credenziali long-lived!)\njobs:\n  deploy:\n    permissions:\n      id-token: write   # necessario per OIDC\n      contents: read\n\n    steps:\n      - name: Configure AWS credentials via OIDC\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123:role/GitHubDeploy\n          aws-region: eu-west-1\n          # Nessun AWS_ACCESS_KEY_ID richiesto!\n\n      - name: Deploy su ECS\n        run: aws ecs update-service ...\n\n# Livelli di secrets:\n# Repository secrets → solo per quel repo\n# Environment secrets → solo per quell'ambiente\n# Organization secrets → condivisi tra repo` },
      { type: 'keypoints', title: 'Best practice sicurezza', points: [
        'OIDC > secrets long-lived: token temporanei, nessuna rotazione manuale',
        'Scope minimi: usa `permissions` per limitare i token GitHub',
        'Non stampare mai secrets nei log (GitHub li maschera, ma evita)',
        'Dipendenze fissate: usa `actions/checkout@v4` non `@latest`',
      ]},
    ],
    tryIt: {
      desc: 'Aggiungi i permessi minimi per un workflow che fa solo checkout e build:',
      code: `permissions:\n  contents: read   # solo lettura del codice\n  # nessun altro permesso necessario per build`,
      output: `Permessi minimi applicati — principio del minimo privilegio`,
    },
  },
  'cicd-3-3': {
    title: 'Monitoring e rollback', xp: 20,
    blocks: [
      { type: 'text', md: 'Un sistema CI/CD maturo include **monitoring post-deploy** e una strategia di **rollback** rapido. Il deploy non finisce quando il container parte — finisce quando le metriche confermano che tutto funziona.' },
      { type: 'code', label: 'monitoring.yml', lang: 'yaml', code: `jobs:\n  deploy:\n    steps:\n      - name: Deploy nuova versione\n        run: ./deploy.sh v2.0.0\n\n      - name: Health check post-deploy\n        run: |\n          for i in {1..10}; do\n            STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.mioapp.com/health)\n            if [ "$STATUS" = "200" ]; then\n              echo "✅ App healthy"\n              exit 0\n            fi\n            echo "Attempt $i: status $STATUS — attendo..."\n            sleep 10\n          done\n          echo "❌ Health check fallito — avvio rollback"\n          exit 1\n\n      - name: Rollback automatico se health check fallisce\n        if: failure()\n        run: |\n          echo "🔄 Rollback a versione precedente..."\n          ./deploy.sh v1.9.0\n          # Notifica Slack\n          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \\\n            -d '{\"text\": \"⚠️ Rollback effettuato — controlla i log\"}'\n\n      - name: Notifica successo\n        if: success()\n        run: echo "🚀 Deploy v2.0.0 completato con successo"` },
      { type: 'keypoints', title: 'Strategie di rollback', points: [
        '**Immediato**: ripristina il deploy precedente (Docker tag, Git tag)',
        '**Feature flag**: disabilita la feature senza rideploy',
        '**Blue/Green**: switch del load balancer in < 1 secondo',
        'Monitora: error rate, latenza p95, business metrics — non solo uptime',
      ]},
    ],
    tryIt: {
      desc: 'Scrivi lo step che esegue il rollback solo se il deploy precedente è fallito:',
      code: `- name: Rollback\n  if: failure()\n  run: |\n    echo "Deploy fallito — rollback..."\n    ./deploy.sh ${{ env.PREVIOUS_VERSION }}`,
      output: `Rollback eseguito: v1.9.0 ripristinata`,
    },
  },

  // ── Git Quizzes ───────────────────────────────────────────────────────────
  'git-1-q': {
    title: 'Quiz: Git Base', xp: 30,
    questions: [
      { text: 'Quale comando inizializza un nuovo repository Git?', options: ['git start', 'git create', 'git init', 'git new'], correct: 2, explanation: 'git init crea la cartella .git/ e inizializza il repository.' },
      { text: 'Cosa fa git add?', options: ['Crea un commit', 'Aggiunge file alla staging area', 'Invia file al remote', 'Crea un branch'], correct: 1, explanation: 'git add sposta le modifiche nella staging area, pronte per il commit.' },
      { text: 'Come si vede la storia dei commit?', options: ['git history', 'git show', 'git log', 'git status'], correct: 2, explanation: 'git log mostra la storia dei commit del repository.' },
      { text: 'Quale comando crea e si sposta su un nuovo branch in un colpo solo?', options: ['git branch -new', 'git checkout -b', 'git switch --create', "Sia 'git checkout -b' che 'git switch -c'"], correct: 3, explanation: 'Entrambi funzionano: git checkout -b (classico) e git switch -c (moderno, Git 2.23+).' },
    ],
  },
  'git-2-q': {
    title: 'Quiz: Git Intermedio', xp: 40,
    questions: [
      { text: 'Cosa fa git push -u origin main?', options: ['Scarica da remote', 'Invia e imposta il tracking del branch remote', 'Crea il branch remote', 'Elimina il branch locale'], correct: 1, explanation: '-u (--set-upstream) imposta il tracking: i push successivi non richiedono origin main.' },
      { text: "Cos'è una Pull Request?", options: ['Una richiesta di scaricare codice', 'Una proposta di merge con possibilità di code review', 'Un tipo di commit', 'Un branch protetto'], correct: 1, explanation: 'Una PR è una proposta di integrare un branch con possibilità di review e discussione.' },
      { text: 'Come si abbortisce un merge in corso?', options: ['git merge --stop', 'git merge --cancel', 'git merge --abort', 'git reset merge'], correct: 2, explanation: 'git merge --abort annulla il merge e ripristina lo stato precedente.' },
      { text: 'Cosa indicano i marcatori <<<<<<< HEAD nel codice?', options: ['Un errore di sintassi', 'Un conflitto di merge', 'Un commento Git', 'Un branch temporaneo'], correct: 1, explanation: '<<<<<<< HEAD segna l\'inizio della versione locale in un conflitto di merge.' },
    ],
  },
  'git-3-q': {
    title: 'Quiz: Git Avanzato', xp: 50,
    questions: [
      { text: 'Qual è la differenza principale tra merge e rebase?', options: ['Nessuna differenza', 'Rebase crea storia lineare, merge preserva la storia reale', 'Merge è più veloce', 'Rebase funziona solo su main'], correct: 1, explanation: 'Rebase ri-applica i commit su un nuovo base commit, creando storia lineare senza merge commit.' },
      { text: "Cosa fa 'git rebase -i HEAD~3'?", options: ['Crea 3 branch', 'Apre editor per modificare gli ultimi 3 commit', 'Elimina 3 commit', 'Fa merge degli ultimi 3 commit'], correct: 1, explanation: '-i (interactive) permette di squash, reword, drop degli ultimi N commit.' },
      { text: 'In quale cartella si trovano i Git hook?', options: ['.github/hooks/', '.git/hooks/', 'hooks/', '.gitconfig/hooks/'], correct: 1, explanation: 'I hook sono script eseguibili nella cartella .git/hooks/ del repository.' },
      { text: 'Nel Git Flow, da quale branch si crea un feature branch?', options: ['main', 'release', 'develop', 'hotfix'], correct: 2, explanation: 'Nel Git Flow i feature branch partono da develop e vi tornano con merge.' },
    ],
  },

  // ── Linux Quizzes ─────────────────────────────────────────────────────────
  'linux-1-q': {
    title: 'Quiz: Linux Base', xp: 30,
    questions: [
      { text: "Quale comando mostra la directory corrente?", options: ['cd', 'ls', 'pwd', 'dir'], correct: 2, explanation: 'pwd (Print Working Directory) mostra il percorso assoluto della directory corrente.' },
      { text: 'Come si visualizzano i file nascosti con ls?', options: ['ls -h', 'ls -a', 'ls -n', 'ls --hidden'], correct: 1, explanation: 'ls -a (all) mostra anche i file che iniziano con punto, convenzionalmente nascosti.' },
      { text: 'Quale permesso numerico corrisponde a rw-r--r--?', options: ['755', '777', '644', '600'], correct: 2, explanation: '644 = proprietario rw (6), gruppo r (4), altri r (4).' },
      { text: "Cosa fa 'rm -rf cartella/'?", options: ['Rinomina la cartella', 'Elimina la cartella e tutto il contenuto senza conferma', 'Crea la cartella', 'Copia la cartella'], correct: 1, explanation: '-r (ricorsivo) + -f (force, no conferma) = eliminazione irreversibile.' },
    ],
  },
  'linux-2-q': {
    title: 'Quiz: Linux Intermedio', xp: 40,
    questions: [
      { text: "Cosa fa la pipe '|' in Bash?", options: ["Esegue comandi in parallelo", "Redirige l'output di un comando all'input del successivo", 'Separa comandi in sequenza', 'Esegue in background'], correct: 1, explanation: 'La pipe | collega stdout del primo comando a stdin del secondo.' },
      { text: 'Come si manda un processo in background?', options: ['bg &', 'Aggiungi & alla fine del comando', 'Ctrl+B', 'background comando'], correct: 1, explanation: 'Aggiungere & avvia il processo in background: `npm run build &`.' },
      { text: "Quale variabile contiene il codice di uscita dell'ultimo comando?", options: ['$EXIT', '$STATUS', '$?', '$CODE'], correct: 2, explanation: '$? contiene l\'exit code dell\'ultimo comando: 0 = successo, >0 = errore.' },
      { text: 'Cosa fa tail -f?', options: ['Mostra le ultime righe e si ferma', 'Mostra le ultime righe e continua in tempo reale', 'Segue i link simbolici', 'Mostra la prima riga'], correct: 1, explanation: 'tail -f (follow) è utile per monitorare log in tempo reale.' },
    ],
  },
  'linux-3-q': {
    title: 'Quiz: Linux Avanzato', xp: 50,
    questions: [
      { text: 'Quale tipo di chiave SSH è raccomandato oggi?', options: ['RSA 1024', 'DSA', 'ed25519', 'RSA 512'], correct: 2, explanation: 'ed25519 è più sicuro e veloce di RSA — usa curve ellittiche moderne.' },
      { text: 'Cosa fa systemctl enable nginx?', options: ['Avvia nginx ora', 'Avvia nginx al prossimo boot', 'Installa nginx', 'Mostra la configurazione'], correct: 1, explanation: 'enable aggiunge nginx ai servizi avviati automaticamente al boot del sistema.' },
      { text: 'Nel formato cron "0 3 * * 0", quando si esegue?', options: ['Ogni giorno alle 3:00', 'Ogni domenica alle 3:00', 'Ogni ore alle 0:03', 'Ogni lunedì alle 3:00'], correct: 1, explanation: 'minuto=0, ora=3, giorno=*, mese=*, giorno_settimana=0 (domenica).' },
      { text: 'Quale comando mostra le porte TCP in ascolto con il PID del processo?', options: ['netstat -a', 'ss -tlnp', 'lsof -tcp', 'ps -ports'], correct: 1, explanation: 'ss -tlnp: t=TCP, l=listening, n=numerico, p=mostra PID.' },
    ],
  },

  // ── CI/CD Quizzes ─────────────────────────────────────────────────────────
  'cicd-1-q': {
    title: 'Quiz: CI/CD Base', xp: 30,
    questions: [
      { text: "Cosa significa 'CI' in CI/CD?", options: ['Continuous Improvement', 'Continuous Integration', 'Code Inspection', 'Container Infrastructure'], correct: 1, explanation: 'CI = Continuous Integration: ogni push attiva automaticamente build e test.' },
      { text: 'In quale cartella si trovano i workflow di GitHub Actions?', options: ['.github/actions/', '.github/workflows/', 'workflows/', '.ci/'], correct: 1, explanation: 'I file YAML dei workflow vanno in .github/workflows/ nella radice del repository.' },
      { text: "Cosa fa 'runs-on: ubuntu-latest' in un workflow?", options: ['Specifica la versione di Node', 'Definisce il runner/OS della macchina virtuale', 'Installa Ubuntu nel container', 'Specifica la regione cloud'], correct: 1, explanation: 'runs-on definisce il sistema operativo del runner GitHub che eseguirà il job.' },
      { text: "Quale campo YAML definisce i trigger di un workflow?", options: ['triggers:', 'on:', 'when:', 'events:'], correct: 1, explanation: "Il campo 'on:' definisce gli eventi che attivano il workflow (push, PR, schedule...)." },
    ],
  },
  'cicd-2-q': {
    title: 'Quiz: CI/CD Intermedio', xp: 40,
    questions: [
      { text: "Cosa fa 'needs: [test]' in un job di deploy?", options: ['Installa le dipendenze', 'Fa partire il job solo dopo che test è passato', 'Copia gli artefatti da test', 'Importa variabili da test'], correct: 1, explanation: 'needs definisce le dipendenze tra job: deploy parte solo se test ha successo.' },
      { text: 'Quale cache in GitHub Actions velocizza il build Docker?', options: ['type=local', 'type=registry', 'type=gha', 'type=inline'], correct: 2, explanation: 'type=gha usa la cache di GitHub Actions, condivisa tra le run dello stesso workflow.' },
      { text: "Cos'è un 'service' in GitHub Actions?", options: ['Un job di supporto', 'Un container Docker avviato come dipendenza (es. DB)', 'Un segreto di tipo servizio', 'Un webhook esterno'], correct: 1, explanation: 'services avvia container (MySQL, Redis...) usati dai test come dipendenze.' },
      { text: "Cosa fa 'if: always()' su uno step?", options: ['Esegue solo se tutto è OK', 'Esegue sempre, anche se gli step precedenti falliscono', 'Esegue in parallelo', 'Salta lo step'], correct: 1, explanation: 'always() forza l\'esecuzione dello step indipendentemente dal risultato dei precedenti.' },
    ],
  },
  'cicd-3-q': {
    title: 'Quiz: CI/CD Avanzato', xp: 50,
    questions: [
      { text: 'Cos\'è OIDC nel contesto CI/CD?', options: ['Un protocollo di deploy', 'Autenticazione federata senza secrets long-lived', 'Un tipo di container', 'Un formato di log'], correct: 1, explanation: 'OIDC permette ai workflow di ottenere token temporanei dai cloud provider senza chiavi permanenti.' },
      { text: "Nel Blue/Green deployment, cosa accade al momento del 'go live'?", options: ["Si elimina l'ambiente vecchio", "Si sposta il traffico da Blue (vecchio) a Green (nuovo)", "Si duplica il database", "Si riavvia il server"], correct: 1, explanation: "Il switch del load balancer da Blue a Green è istantaneo — il rollback è altrettanto rapido." },
      { text: "Cosa fa 'if: failure()' in un job di rollback?", options: ["Esegue solo se il workflow è manuale", "Esegue solo se il job precedente è fallito", "Fa fallire il workflow", "Skippa il job"], correct: 1, explanation: "failure() esegue lo step/job solo quando un job precedente nella pipeline ha fallito." },
      { text: 'Quale approccio permette deploy senza rollback tradizionale?', options: ['Blue/Green', 'Feature flags', 'Rolling update', 'Tutti e tre'], correct: 3, explanation: 'Feature flags, Blue/Green e Rolling update sono tutti modi per controllare il rischio senza rollback classico.' },
    ],
  },

  // ── SQL Quizzes ──────────────────────────────────────────────────────────
  'sql-1-q': {
    title: 'Quiz: SQL Principiante', xp: 30,
    questions: [
      { text: 'Quale clausola filtra le righe in una query SQL?', options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'], correct: 2, explanation: 'WHERE filtra le righe prima del raggruppamento.' },
      { text: 'Come si selezionano tutte le colonne di una tabella?', options: ['SELECT ALL', 'SELECT *', 'SELECT FULL', 'GET *'], correct: 1, explanation: 'SELECT * restituisce tutte le colonne della tabella.' },
      { text: 'Quale keyword ordina i risultati in modo discendente?', options: ['ORDER ASC', 'SORT DESC', 'ORDER BY DESC', 'ORDER BY ... DESC'], correct: 3, explanation: 'Si usa ORDER BY colonna DESC per ordine decrescente.' },
      { text: 'Come si limita il numero di righe restituite?', options: ['TOP 10', 'LIMIT 10', 'FETCH 10', 'ROWNUM < 10'], correct: 1, explanation: 'LIMIT 10 è la sintassi MySQL/PostgreSQL per limitare i risultati.' },
    ],
  },
  'sql-2-q': {
    title: 'Quiz: SQL Intermedio', xp: 40,
    questions: [
      { text: 'Quale tipo di JOIN restituisce solo le righe con corrispondenza in entrambe le tabelle?', options: ['LEFT JOIN', 'FULL JOIN', 'INNER JOIN', 'CROSS JOIN'], correct: 2, explanation: 'INNER JOIN include solo le righe con match in entrambe le tabelle.' },
      { text: 'Quale funzione conta il numero di righe?', options: ['SUM()', 'TOTAL()', 'COUNT()', 'NUM()'], correct: 2, explanation: 'COUNT(*) conta tutte le righe, COUNT(col) ignora i NULL.' },
      { text: 'Cosa fa HAVING rispetto a WHERE?', options: ['È uguale a WHERE', 'Filtra dopo GROUP BY', 'Filtra prima di SELECT', 'Ordina i risultati'], correct: 1, explanation: 'HAVING filtra i gruppi creati da GROUP BY, WHERE filtra le righe prima.' },
      { text: 'Una subquery può comparire in:', options: ['Solo nel WHERE', 'Solo nel FROM', 'Solo nel SELECT', 'WHERE, FROM e SELECT'], correct: 3, explanation: 'Le subquery possono comparire in WHERE, FROM (derived table) e SELECT.' },
    ],
  },
  'sql-3-q': {
    title: 'Quiz: SQL Avanzato', xp: 50,
    questions: [
      { text: 'Cosa fa un indice su una colonna?', options: ['Aumenta la velocità di INSERT', 'Accelera le ricerche sulla colonna', 'Garantisce unicità', 'Cifra i dati'], correct: 1, explanation: 'Un indice accelera le query di ricerca (SELECT) sulla colonna indicizzata.' },
      { text: 'Quale comando annulla una transazione?', options: ['UNDO', 'ABORT', 'ROLLBACK', 'CANCEL'], correct: 2, explanation: 'ROLLBACK annulla tutte le operazioni della transazione corrente.' },
      { text: 'Cosa è una VIEW in SQL?', options: ['Una copia fisica dei dati', 'Una query salvata come tabella virtuale', 'Un tipo di indice', 'Un constraint'], correct: 1, explanation: 'Una VIEW è una query salvata che si comporta come una tabella virtuale.' },
      { text: 'La "A" di ACID sta per:', options: ['Availability', 'Atomicity', 'Authorization', 'Asynchronous'], correct: 1, explanation: 'ACID: Atomicity, Consistency, Isolation, Durability.' },
    ],
  },

  // ── Redis Quizzes ─────────────────────────────────────────────────────────
  'redis-1-q': {
    title: 'Quiz: Redis Principiante', xp: 30,
    questions: [
      { text: 'Come si definisce Redis?', options: ['Database relazionale', 'In-memory data store', 'File system distribuito', 'Motore di ricerca'], correct: 1, explanation: 'Redis è un in-memory data store: memorizza i dati in RAM per massima velocità.' },
      { text: 'Quale comando imposta un valore in Redis?', options: ['INSERT', 'PUT', 'SET', 'STORE'], correct: 2, explanation: 'SET chiave valore è il comando base per impostare una stringa in Redis.' },
      { text: 'Quale struttura dati Redis garantisce elementi unici?', options: ['List', 'Hash', 'Set', 'String'], correct: 2, explanation: 'Il Set di Redis non ammette duplicati — come un set matematico.' },
      { text: 'LPUSH inserisce un elemento in:', options: ['Fondo alla lista', "Testa della lista", 'Un set', 'Un hash'], correct: 1, explanation: 'LPUSH (Left PUSH) inserisce a sinistra (testa) della lista.' },
    ],
  },
  'redis-2-q': {
    title: 'Quiz: Redis Intermedio', xp: 40,
    questions: [
      { text: 'Cosa restituisce TTL su una chiave senza scadenza?', options: ['0', '-1', 'null', 'Infinity'], correct: 1, explanation: 'TTL restituisce -1 se la chiave esiste ma non ha TTL impostato, -2 se non esiste.' },
      { text: 'Quale struttura Redis è ideale per una classifica con punteggi?', options: ['List', 'Set', 'Sorted Set', 'Hash'], correct: 2, explanation: 'I Sorted Set associano uno score numerico a ogni membro, perfetti per leaderboard.' },
      { text: 'In Pub/Sub, cosa fa SUBSCRIBE?', options: ['Pubblica un messaggio', 'Si iscrive a un canale per ricevere messaggi', 'Crea un canale', 'Lista i canali attivi'], correct: 1, explanation: 'SUBSCRIBE canale mette il client in ascolto di quel canale.' },
      { text: 'HGETALL restituisce:', options: ['Solo le chiavi di un hash', 'Solo i valori di un hash', 'Tutti i campi e valori di un hash', 'Il numero di campi'], correct: 2, explanation: 'HGETALL chiave restituisce una lista alternata campo-valore per tutto l\'hash.' },
    ],
  },

  // ── PHP Quizzes ───────────────────────────────────────────────────────────
  'php-1-q': {
    title: 'Quiz: PHP Principiante', xp: 30,
    questions: [
      { text: 'Come inizia una variabile in PHP?', options: ['#', '@', '$', '&'], correct: 2, explanation: 'Tutte le variabili PHP iniziano con il simbolo $.' },
      { text: 'Quale operatore concatena stringhe in PHP?', options: ['+', '&', '.', '||'], correct: 2, explanation: 'Il punto . concatena stringhe in PHP, non il +.' },
      { text: 'Come si apre il tag PHP?', options: ['<php>', '<?', '<?php', '<%php'], correct: 2, explanation: '<?php apre il blocco di codice PHP.' },
      { text: 'Quale funzione conta gli elementi di un array?', options: ['size()', 'length()', 'count()', 'sizeof()'], correct: 2, explanation: 'count($array) restituisce il numero di elementi — sizeof() è un alias.' },
    ],
  },
  'php-2-q': {
    title: 'Quiz: PHP Intermedio', xp: 40,
    questions: [
      { text: 'Quale superglobale contiene i dati di un form POST?', options: ['$_GET', '$_POST', '$_FORM', '$_REQUEST'], correct: 1, explanation: '$_POST raccoglie i dati inviati con method="post".' },
      { text: 'Cosa sono le prepared statements in PDO?', options: ['Query salvate nel DB', 'Query con placeholder per prevenire SQL injection', 'Stored procedures', 'Query ottimizzate per velocità'], correct: 1, explanation: 'Le prepared statement separano il codice SQL dai dati, prevenendo SQL injection.' },
      { text: 'Quale funzione PHP verifica una password hashed?', options: ['md5_verify()', 'hash_check()', 'password_verify()', 'bcrypt_check()'], correct: 2, explanation: 'password_verify($password, $hash) è la funzione sicura per verificare le password.' },
      { text: 'Quale funzione va chiamata prima di usare $_SESSION?', options: ['session_init()', 'start_session()', 'session_start()', 'init_session()'], correct: 2, explanation: 'session_start() inizializza o riprende la sessione corrente.' },
    ],
  },

  'nodejs-1-q': {
    title: 'Quiz: Fondamentali Node.js', xp: 30,
    questions: [
      { text: 'Su quale motore JavaScript è costruito Node.js?', options: ['SpiderMonkey', 'JavaScriptCore', 'V8', 'Chakra'], correct: 2, explanation: 'Node.js usa il motore V8 di Google Chrome, lo stesso che gira nel browser.' },
      { text: 'Quale modello di I/O caratterizza Node.js?', options: ['Blocking sincrono', 'Non-blocking asincrono', 'Multi-threaded blocking', 'Batch processing'], correct: 1, explanation: "Node.js usa I/O non-blocking: può gestire migliaia di connessioni senza creare un thread per ciascuna." },
      { text: 'Come si importa un modulo in Node.js con CommonJS?', options: ["import x from 'x'", "include('x')", "require('x')", '#include <x>'], correct: 2, explanation: "require() è il sistema di moduli CommonJS di Node.js." },
      { text: 'Quale comando avvia il file app.js con Node.js?', options: ['run app.js', 'node app.js', 'npm app.js', 'exec app.js'], correct: 1, explanation: '`node <filename>` esegue un file JavaScript con il runtime Node.js.' },
    ],
  },
  'express-1-q': {
    title: 'Quiz: Express Base', xp: 30,
    questions: [
      { text: 'Come si installa Express?', options: ['npm install express', 'node install express', 'yarn add @express/core', 'npm get express'], correct: 0, explanation: 'npm install express aggiunge Express come dipendenza.' },
      { text: 'Come si definisce una route GET in Express?', options: ["app.route('GET', '/')", "app.get('/', fn)", "app.handle('get', '/')", "express.get('/')"], correct: 1, explanation: 'app.get(path, handler) registra una route GET.' },
      { text: 'Cosa fa next() in un middleware?', options: ['Termina la richiesta', 'Passa al middleware successivo', 'Reinvia al client', 'Salta tutti i middleware'], correct: 1, explanation: 'next() passa il controllo al prossimo middleware nella catena.' },
    ],
  },
  'vue-1-q': {
    title: 'Quiz: Vue.js Base', xp: 30,
    questions: [
      { text: 'Quale directive lega dinamicamente un attributo HTML?', options: ['v-on', 'v-bind', 'v-model', 'v-if'], correct: 1, explanation: "v-bind (shorthand :) lega dinamicamente un attributo a un'espressione." },
      { text: 'Quale composable Vue 3 crea una reference reattiva?', options: ['reactive()', 'ref()', 'computed()', 'watch()'], correct: 1, explanation: 'ref() crea un container reattivo con .value per valori primitivi.' },
      { text: 'Come si gestisce il click in Vue 3?', options: ["onclick='fn'", "@click='fn'", "v-listen:click='fn'", "bind:click='fn'"], correct: 1, explanation: "@click è la shorthand di v-on:click per ascoltare eventi DOM." },
    ],
  },
  'ts-1-q': {
    title: 'Quiz: TypeScript Base', xp: 30,
    questions: [
      { text: 'TypeScript è un superset di quale linguaggio?', options: ['Java', 'Python', 'JavaScript', 'C#'], correct: 2, explanation: 'TypeScript è un superset tipizzato di JavaScript.' },
      { text: 'Quale keyword definisce un tipo personalizzato?', options: ['type', 'interface', 'typedef', "Sia 'type' che 'interface'"], correct: 3, explanation: 'Sia type che interface possono definire tipi in TypeScript.' },
      { text: "Cosa distingue 'unknown' da 'any'?", options: ['Nulla', "'unknown' richiede type-checking prima dell'uso", "'any' è più sicuro", "'unknown' non esiste"], correct: 1, explanation: "unknown è la versione type-safe di any." },
    ],
  },
}

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getDailyChallenge() {
  const allQuizzes = Object.entries(quizzes)
  const dayIdx     = Math.floor(Date.now() / 86400000) % allQuizzes.length
  const [quizId, quiz] = allQuizzes[dayIdx]
  const courseId = (quizId.startsWith('nuxt') || quizId.startsWith('vue')) ? 'vue-nuxt'
    : quizId.startsWith('ts') ? 'typescript'
    : quizId.split('-')[0]
  const course   = courses.find(c => c.id === courseId) || courses[0]
  const question = quiz.questions[dayIdx % quiz.questions.length]
  return { quizId, courseId, course, question, xp: 20 }
}

export function getAdjacentItems(courseId, itemId) {
  const course = courses.find(c => c.id === courseId)
  if (!course) return { prev: null, next: null }
  const all = course.levels.flatMap(l => l.items)
  const idx = all.findIndex(i => i.id === itemId)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
