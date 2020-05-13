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

import './utils/fastClick'
// 引用工具函数
import utils from './utils/util'
Vue.use(utils)

import http from './utils/http'
import loading from './components/loading'
import toast from './components/toast'
import comfirm from './components/comfirm'

Vue.prototype.$http = http
Vue.prototype.$loading = loading
Vue.prototype.$toast = toast
Vue.prototype.$comfirm = comfirm

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
