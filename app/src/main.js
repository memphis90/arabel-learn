import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App    from './App.vue'
import router from './router'
import './assets/main.css'

const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// restore session before mounting
import { useAuthStore }  from '@/stores/auth'
import { useLearnStore } from '@/stores/learn'

const auth  = useAuthStore()
const learn = useLearnStore()

auth.init().then(() => {
  if (auth.isAuthenticated) learn.fetchProgress()
  app.mount('#app')
})
