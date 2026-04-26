import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/login',    name: 'login',    component: () => import('@/views/LoginView.vue'),    meta: { guest: true } },
  { path: '/',         name: 'home',     component: () => import('@/views/DashboardView.vue'), meta: { auth: true } },
  { path: '/course/:id', name: 'course', component: () => import('@/views/CourseView.vue'),    meta: { auth: true } },
  { path: '/lesson/:id', name: 'lesson', component: () => import('@/views/LessonView.vue'),    meta: { auth: true } },
  { path: '/quiz/:id',   name: 'quiz',   component: () => import('@/views/QuizView.vue'),      meta: { auth: true } },
  { path: '/profile', redirect: '/progressione' },
  { path: '/courses',      name: 'courses',      component: () => import('@/views/CoursesView.vue'),      meta: { auth: true } },
  { path: '/network',       name: 'network',       component: () => import('@/views/NetworkView.vue'),       meta: { auth: true } },
  { path: '/progressione', name: 'progressione', component: () => import('@/views/ProgressionView.vue'), meta: { auth: true } },
  { path: '/impostazioni',  name: 'impostazioni',  component: () => import('@/views/SettingsView.vue'),      meta: { auth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.auth  && !auth.isAuthenticated) return { name: 'login' }
  if (to.meta.guest && auth.isAuthenticated)  return { name: 'home' }
})

export default router
