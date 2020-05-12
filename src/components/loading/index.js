import Vue from 'vue'
import Loading from './src/loading.vue'

const LoadingController  = Vue.extend(Loading)
let instance
const loading = {
  show (options) {
    options = options || {}
    instance = new LoadingController({
      data: options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    return instance.vm
  },
  hide() {
    if (instance) {
      instance.vm.loading = false
    }
  }
}

export default loading
