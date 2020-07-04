import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import Add from '@/pages/Add'

import { getUser } from '@/firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home, meta: { needsAuth: true } },
    { path: '/auth', component: Auth },
    { path: '/add', component: Add, meta: { needsAuth: true } }
  ]
})

router.beforeEach(async (to, from, next) => {
  const needsAuth = to.matched.some(route => route.meta.needsAuth)
  const user = await getUser()

  if (needsAuth && !user) {
    next('/auth')
  } else if (to.path === '/auth' && user) {
    next('/')
  } else {
    next()
  }
})

export default router
