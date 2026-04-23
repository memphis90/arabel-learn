import { computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const TRANSLATIONS = {
  it: {
    nav: {
      dashboard:   'Dashboard',
      courses:     'Corsi',
      leaderboard: 'Classifiche',
      profile:     'Profilo',
      logout:      'Esci',
    },
    greeting: {
      morning:   'Buongiorno',
      afternoon: 'Buon pomeriggio',
      evening:   'Buonasera',
    },
    dashboard: {
      keep_learning:    ', continua a imparare',
      continue:         'CONTINUA',
      daily:            'SFIDA GIORNALIERA',
      start:            'Inizia ›',
      see_all:          'Vedi tutti →',
      your_courses:     'I TUOI CORSI',
      certifications:   'CERTIFICAZIONI',
      leaderboard_week: '🏆 CLASSIFICA QUESTA SETTIMANA',
      leaderboard_note: 'La classifica si aggiorna in tempo reale quando il backend è connesso',
      coming_soon:      '🚧 Prossimamente',
      you:              '(tu)',
      xp_bonus:         'XP bonus',
      lessons_done:     (done, total) => `${done} / ${total} lezioni completate`,
      total_progress:   (pct) => `${pct}% del percorso totale`,
      completed_of:     (done, total) => `${done} lezioni completate su ${total}`,
    },
    courses: {
      soon_badge:     'Prossimamente',
      filter_all:     'Tutti',
      filter_active:  'Disponibili',
      filter_soon:    'Prossimamente',
      no_results:     'Nessun corso trovato.',
    },
    cert: {
      completed: (pct) => `${pct}% completato`,
    },
    badges: {
      name: {
        first_lesson:    'Prima Lezione',
        streak_3:        'Streak 3 giorni',
        streak_7:        'Streak 7 giorni',
        node_beginner:   'Node Beginner',
        quiz_ace:        'Quiz Ace',
        junior_frontend: 'Frontend Junior',
        mid_frontend:    'Frontend Mid',
        junior_backend:  'Backend JS Junior',
        mid_backend_js:  'Backend JS Mid',
        junior_php:      'PHP Junior',
        mid_php:         'PHP Mid',
        devops_starter:  'DevOps Starter',
        devops_engineer: 'DevOps Engineer',
        full_stack_js:   'Full Stack JS',
        sql_master:      'SQL Master',
        data_engineer:   'Data Engineer',
        master:          'Full Stack',
      },
      desc: {
        first_lesson:    'Completa la tua prima lezione',
        streak_3:        '3 giorni consecutivi di studio',
        streak_7:        '7 giorni consecutivi di studio',
        node_beginner:   'Completa 5 lezioni Node.js',
        quiz_ace:        'Tutte le risposte corrette in un quiz',
        junior_frontend: 'Completa il percorso Frontend Junior',
        mid_frontend:    'Completa il percorso Frontend Mid',
        junior_backend:  'Completa il percorso Backend JS Junior',
        mid_backend_js:  'Completa il percorso Backend JS Mid',
        junior_php:      'Completa il percorso PHP Junior',
        mid_php:         'Completa il percorso PHP Mid',
        devops_starter:  'Completa il percorso DevOps Starter',
        devops_engineer: 'Completa il percorso DevOps Engineer',
        full_stack_js:   'Completa il percorso Full Stack JS',
        sql_master:      'Completa tutti i livelli SQL',
        data_engineer:   'Completa il percorso Data Engineer',
        master:          'Completa tutti i corsi disponibili',
      },
    },
  },
  en: {
    nav: {
      dashboard:   'Dashboard',
      courses:     'Courses',
      leaderboard: 'Leaderboard',
      profile:     'Profile',
      logout:      'Sign out',
    },
    greeting: {
      morning:   'Good morning',
      afternoon: 'Good afternoon',
      evening:   'Good evening',
    },
    dashboard: {
      keep_learning:    ', keep learning',
      continue:         'CONTINUE',
      daily:            'DAILY CHALLENGE',
      start:            'Start ›',
      see_all:          'View all →',
      your_courses:     'YOUR COURSES',
      certifications:   'CERTIFICATIONS',
      leaderboard_week: '🏆 THIS WEEK\'S LEADERBOARD',
      leaderboard_note: 'Leaderboard updates in real time once the backend is connected',
      coming_soon:      '🚧 Coming soon',
      you:              '(you)',
      xp_bonus:         'XP bonus',
      lessons_done:     (done, total) => `${done} / ${total} lessons completed`,
      total_progress:   (pct) => `${pct}% of total progress`,
      completed_of:     (done, total) => `${done} lessons completed out of ${total}`,
    },
    courses: {
      soon_badge:     'Coming soon',
      filter_all:     'All',
      filter_active:  'Available',
      filter_soon:    'Coming soon',
      no_results:     'No courses found.',
    },
    cert: {
      completed: (pct) => `${pct}% completed`,
    },
    badges: {
      name: {
        first_lesson:    'First Lesson',
        streak_3:        '3-Day Streak',
        streak_7:        '7-Day Streak',
        node_beginner:   'Node Beginner',
        quiz_ace:        'Quiz Ace',
        junior_frontend: 'Frontend Junior',
        mid_frontend:    'Frontend Mid',
        junior_backend:  'Backend JS Junior',
        mid_backend_js:  'Backend JS Mid',
        junior_php:      'PHP Junior',
        mid_php:         'PHP Mid',
        devops_starter:  'DevOps Starter',
        devops_engineer: 'DevOps Engineer',
        full_stack_js:   'Full Stack JS',
        sql_master:      'SQL Master',
        data_engineer:   'Data Engineer',
        master:          'Full Stack',
      },
      desc: {
        first_lesson:    'Complete your first lesson',
        streak_3:        '3 consecutive days of study',
        streak_7:        '7 consecutive days of study',
        node_beginner:   'Complete 5 Node.js lessons',
        quiz_ace:        'All correct answers in a quiz',
        junior_frontend: 'Complete the Frontend Junior path',
        mid_frontend:    'Complete the Frontend Mid path',
        junior_backend:  'Complete the Backend JS Junior path',
        mid_backend_js:  'Complete the Backend JS Mid path',
        junior_php:      'Complete the PHP Junior path',
        mid_php:         'Complete the PHP Mid path',
        devops_starter:  'Complete the DevOps Starter path',
        devops_engineer: 'Complete the DevOps Engineer path',
        full_stack_js:   'Complete the Full Stack JS path',
        sql_master:      'Complete all SQL levels',
        data_engineer:   'Complete the Data Engineer path',
        master:          'Complete all available courses',
      },
    },
  },
}

export function useLocale() {
  const store = useLocaleStore()
  const lang  = computed(() => store.lang)

  // t('nav.courses') → string
  // t('dashboard.lessons_done', 3, 10) → calls function with args
  function t(path, ...args) {
    const keys = path.split('.')
    let node = TRANSLATIONS[lang.value]
    for (const k of keys) {
      node = node?.[k]
      if (node === undefined) return path
    }
    return typeof node === 'function' ? node(...args) : node
  }

  return { lang, setLang: store.setLang, t }
}
