import Vue from 'vue'
import Vuex from 'vuex'
import path from 'path'
Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
let modules = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})
console.log(modules)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
})
