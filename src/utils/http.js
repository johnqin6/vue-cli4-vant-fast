// 请求方法封装
import axios from 'axios'
import vm from '../main'
import router from '../router'
// qs模块用来序列化post类型的数据
// import qs from 'qs'
import { baseApi } from '../../config'

// 全局默认配置
const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : baseApi,
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers.timestamp = Math.floor(new Date().getTime() / 1000)
    config.headers.Authorization = localStorage.getItem('token') || ''
    // 接口没返回时显示loading
    if (config.loading === true) {
      vm.$loading.hide()
      vm.$loading.show()
    }
    return config
  },
  error => {
    vm.$loading.hide()
    return Promise.error(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    vm.$loading.hide()
    handleError(error)
    return Promise.reject(error.response.data)
  }
)

function get(url, data) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: data
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  }) 
}

function post (url, data) {
  return new Promise((resolve, reject) => {
    http.post(url, data).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default { http, get, post }

const handleError = (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      /**
       * 401: 未登录
       * 未登录则跳转登录页面，并携带当前页面的路径
       * 在登陆成功后返回当前页面，这一步需要在登陆页操作
      */
      case 401:
        // router.replace({
        //   path: '/login',
        //   // query: { redirect: router.currentRout.fullPath }
        // })
        break
      /**
       * 403 token过期
       * 登录过期对用户进行提示
       * 清除本地token和清空vuex中token对象
       * 跳转登录页面
      */
      case 403:
        vm.$toast({
          msg: '登录过期，请重新登录',
          duration: 1500,
        })
        // 清除token
        // localStorage.removeItem('token')
        vm.$store.dispatch('user/removeToken')
        // 跳转登陆页面，并将要浏览的页面fullPath传过去, 登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       // redirect: router.currentRout.fullPath
        //     }
        //   })
        // }, 2000)
        break
      // 请求不存在
      case 404:
        vm.$toast({
          msg: '网络请求不存在',
          duration: 1500,
        })
        break
      // 其他错误，直接抛出错误提示
      default: 
        vm.$toast({
          msg: error.response.data.message,
          duration: 1500,
        })
    }
  } else {
    // 请求超时或者网络有问题
    if (error.message.includes('timeout')) {
      Message.error('请求超时！请检查网络是否正常')
    } else {
      Message.error('请求失败！请检查网络是否连接')
    }
  }
}
