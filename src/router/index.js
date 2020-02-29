import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

import store from '../store'

window.store = store

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: '首页',
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          component: () => import('@/views/home/index.vue'),
          name: '首页' + +new Date(),
          meta: {
            title: '首页',
            isMenu: true
          }
        }
      ]
    },
    {
      name: '认证',
      path: '/auth',
      component: Layout,
      children: [
        {
          path: 'login',
          component: () => import('@/views/login/index.vue'),
          meta: {
            title: '登录',
            isMenu: true
          },
        },
        {
          path: 'register',
          component: () => import('@/views/register/index.vue'),
          meta: {
            title: '注册',
            isMenu: true
          },
        },
      ]
    },
    {
      name: '社区',
      path: '/post',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/post/index.vue'),
          meta: {
            title: '社区',
            isMenu: true
          },
        }
      ]
    },
    {
      path: '/draft',
      redirect: '/draft/index',
      component: Layout,
      name: '草稿',
      meta: {
        title: '草稿',
        requiresAuth: true
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/draft/index.vue'),
          meta: {
            requiresAuth: true,
            isMenu: true
          }
        },
        {
          path: 'new',
          component: () => import('@/views/draft/new.vue'),
          meta: {
            requiresAuth: true,
            isMenu: false
          }
        },
      ]
    },
    {
      name: '通知',
      path: '/notification',
      redirect: '/notification/index',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/notification/index.vue'),
          meta: {
            requiresAuth: true,
            isMenu: true
          }
        }
      ]

    },

    {
      path: '/blog',
      component: Layout,
      children: [
        {
          path: ':blogId',
          component: () => import('@/views/blog/index.vue'),
        }
      ]

    },
    {
      path: '/edit/:blogId',
      component: () => import('@/views/edit/index.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/user/:userId',
      component: () => import('@/views/user/index.vue')
    },
    {
      path: '/my',
      component: () => import('@/views/my/index.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/archive',
      component: () => import('@/views/archive/index.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/recycle_bin',
      component: () => import('@/views/recycleBin/index.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
      hidden: true
    },
    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404', hidden: true}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
        next({
          path: '/auth/login',
          query: {redirect: to.fullPath}
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

