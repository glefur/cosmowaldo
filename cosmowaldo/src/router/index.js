import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/Game.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/admin/builder',
      name: 'SceneBuilder',
      component: () => import('../views/SceneBuilder.vue')
    }
  ]
})

export default router
