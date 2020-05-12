import Vue from 'vue'
import Comfirm from './src/index.vue'

const ComfirmController = Vue.extend(Comfirm)

let instance
const confirm = function(options) {
  options = options || {}
  instance = new ComfirmController({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default confirm
