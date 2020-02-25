import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'
window.store = store

Vue.use(Router)


const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/index/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/register/index.vue')
    },
    {
      path: '/blog/:blogId',
      component: () => import('@/views/blog/index.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/views/edit/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/views/create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/views/user/index.vue')
    },
    {
      path: '/my',
      component: () => import('@/views/my/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/notification',
      component: () => import('@/views/notification/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/archive',
      component: () => import('@/views/archive/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/draft',
      component: () => import('@/views/draft/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/recycle_bin',
      component: () => import('@/views/recycleBin/index.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

