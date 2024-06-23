// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

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
      component: () => import('../views/Game.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const player = localStorage.getItem('player');
    if (!player) {
      next({ name: 'Register' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
