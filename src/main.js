import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()

import './assets/styles/reset.css'
import './assets/styles/common.css'
import './assets/iconfont/icon.css'
import './plugins/dom'
import './plugins/vant'

import './utils/fastClick'
// 引用工具函数
import utils from './utils/util'
import VueScroller from 'vue-scroller'

Vue.use(utils)
Vue.use(VueScroller)

import http from './utils/http'
import loading from './components/loading'
import toast from './components/toast'
import comfirm from './components/comfirm'



Vue.prototype.$loading = loading
Vue.prototype.$toast = toast
Vue.prototype.$comfirm = comfirm
Vue.prototype.$http = http

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const userInfo = localStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
