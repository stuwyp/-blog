import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'
window.store = store

Vue.use(Router)


const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/login.vue')
    },
    {
      path: '/register',
      component: () => import('@/pages/register.vue')
    },
    {
      path: '/blog/:blogId',
      component: () => import('@/pages/blog.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/edit.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/create.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/user.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/my.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/notification',
      component: () => import('@/pages/notification.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/archive',
      component: () => import('@/pages/archive.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/draft',
      component: () => import('@/pages/draft.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/recycle_bin',
      component: () => import('@/pages/recycleBin.vue'),
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

