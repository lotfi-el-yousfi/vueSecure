import { useEmployee } from '@/domain/employees/store/employeeStore'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../domain/employees/pages/login.vue'),
  },
  {
    path: '/loginRxJS',
    name: 'loginRxJS',
    component: () => import('../domain/employees/auth/view/login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../domain/employees/pages/dashboard.vue'),
    meta: { requiresAuth: true },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const employeeStore = useEmployee()

  if (to.meta?.requiresAuth && !employeeStore.isAuthenticated) {
    console.log("no jwt not autherized");
    next({ name: 'login' })
  } else {

    next()
  }
})



// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
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
