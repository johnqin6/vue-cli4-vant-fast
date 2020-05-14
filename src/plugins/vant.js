// 按需加载vant组件
import Vue from 'vue'
import {
  Button,
  Tab, 
  Tabs
} from 'vant'

const components = [
  Button,
  Tab, 
  Tabs
]

components.forEach(component => {
  Vue.use(component)
})
