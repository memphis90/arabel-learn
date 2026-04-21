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
