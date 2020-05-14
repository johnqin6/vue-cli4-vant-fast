import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'anthorize',
    component: () => import( '../views/anthorize.vue'),
    // redirect: '/home',
    meta: {
      title: '验证页',
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/Home.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue'),
    meta: {
      title: '提示',
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/apiDemo',
    name: 'apiDemo',
    component: () => import( '../views/Demo.vue'),
    meta: {
      title: '接口',
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '404',
      keepAlive: false,
      auth: false
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
