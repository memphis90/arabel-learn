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
    color: '#8b5cf6', colorRgb: '139,92,246', category: 'Backend', comingSoon: true,
    levels: [],
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
    color: '#3b82f6', colorRgb: '59,130,246', category: 'Database', comingSoon: true,
    levels: [],
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
    color: '#ef4444', colorRgb: '239,68,68', category: 'Database', comingSoon: true,
    levels: [],
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
    color: '#f59e0b', colorRgb: '245,158,11', category: 'DevOps & Tools', comingSoon: true,
    levels: [],
  },
  {
    id: 'docker', name: 'Docker', tagline: 'Containerizza e scala le tue applicazioni',
    color: '#0ea5e9', colorRgb: '14,165,233', category: 'DevOps & Tools', comingSoon: true,
    levels: [],
  },
  {
    id: 'cicd', name: 'CI/CD', tagline: 'Delivery automatizzata e integrazione continua',
    color: '#10b981', colorRgb: '16,185,129', category: 'DevOps & Tools', comingSoon: true,
    levels: [],
  },
  {
    id: 'linux', name: 'Linux CLI', tagline: 'Padroneggia il terminale e i sistemi Unix',
    color: '#eab308', colorRgb: '234,179,8', category: 'DevOps & Tools', comingSoon: true,
    levels: [],
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
  first_lesson:  { name: 'Prima Lezione',   icon: '🎯', desc: 'Hai completato la prima lezione',      color: '#6366f1' },
  streak_3:      { name: 'Streak 3 giorni', icon: '🔥', desc: '3 giorni consecutivi di studio',       color: '#f59e0b' },
  streak_7:      { name: 'On Fire!',         icon: '🔥', desc: '7 giorni consecutivi',                  color: '#ef4444' },
  node_beginner: { name: 'Node Rookie',      icon: '⬡',  desc: 'Livello base Node.js completato',      color: '#22c55e' },
  quiz_ace:      { name: 'Quiz Ace',          icon: '⚡', desc: 'Quiz con punteggio perfetto',           color: '#a855f7' },
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
