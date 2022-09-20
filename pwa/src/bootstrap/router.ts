import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/holders/AppHolder.vue'),
    children: [
      {
        path: '', //Eigenlijk zal de / altijd hiernaar resolven
        component: () => import('../screens/Home.vue'),
      },

      {
        path: '/birds',
        component: () => import('../screens/birds/index.vue'),
      },
      {
        path: '/locations',
        component: () => import('../screens/locations/index.vue'),
      },
      {
        path: '/log',
        component: () => import('../screens/log/index.vue'),
      },
      {
        path: '/observations',
        component: () => import('../screens/observations/index.vue'),
      },
      {
        path: '/account',
        component: () => import('../screens/Account.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: () => import('../components/holders/AuthHolder.vue'),
    children: [
      {
        path: 'login', //Eigenlijk zal de / altijd hiernaar resolven
        component: () => import('../components/auth/Login.vue'),
      },

      {
        path: 'register',
        component: () => import('../components/auth/Register.vue'),
      },
      {
        path: 'forgot-password',
        component: () => import('../components/auth/ForgotPassword.vue'),
      },

    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
