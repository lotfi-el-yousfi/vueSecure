
import RouteNotFound from '@/employee/views/RouteNotFound.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'



const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/employee/views/login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next({ name: 'dashboard' })
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/employee/views/home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/employee/views/dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/cardsDisplay',
    name: 'cardsDisplay',
    component: () => import('@/employee/views/cardsDisplay.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: RouteNotFound,
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({ name: 'login' })
  } else {
    next()
  }
})


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

