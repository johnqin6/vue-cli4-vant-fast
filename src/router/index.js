import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
console.log(router)
export default router
