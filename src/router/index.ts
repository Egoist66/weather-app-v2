import { createRouter, createWebHistory } from 'vue-router'
import  routes  from './routes/routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${import.meta.env.VITE_APP_NAME} | ${to.meta.title}` 
  next()
})

export default router
