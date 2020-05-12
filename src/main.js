import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './plugins/dom'
// 引用工具函数
import utils from './utils/util'
Vue.use(utils)

import http from './utils/http'

Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
