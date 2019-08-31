import Vue from 'vue'
import Router from 'vue-router'
/*
import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/template.vue'
import Blog from '@/pages/Blog/template.vue'
import Edit from '@/pages/Edit/template.vue'
import Create from '@/pages/Create/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'
import My from '@/pages/My/template.vue'
*/

import store from '../store'
window.store = store

Vue.use(Router)


const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/register',
      component: () => import('@/pages/Register/template.vue')
    },
    {
      path: '/blog/:blogId',
      component: () => import('@/pages/Blog/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/User/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/notification',
      component: () => import('@/pages/Notification/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/archive',
      component: () => import('@/pages/Archive/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/draft',
      component: () => import('@/pages/Draft/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/recycle_bin',
      component: () => import('@/pages/RecycleBin/template.vue'),
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

