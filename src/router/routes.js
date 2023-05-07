import { useUserStore } from 'src/stores/user-store'

const routes = [
  {
    path: '/login',
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      !userStore.email ? next() : next('/')
    },
    component: () => import('pages/auth/LoginPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/profile', component: () => import('pages/account/AccountProfile.vue') }
    ]
  },
  {
    path: '/doctor',
    component: () => import('layouts/DoctorLayout.vue'),
    children: [
      { path: '', component: () => import('pages/doctor/IndexPage.vue') },
      { path: 'orders/new', component: () => import('pages/doctor/orders/NewOrder.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
