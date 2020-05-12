// 请求方法封装
import axios from 'axios'
import vm from '../main'
import { baseApi } from '../config'

// 全局默认配置
const http = axios.create({
  baseURL: baseApi,
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers.timestamp = Math.floor(new Date().getTime() / 1000)
    config.headers.token = sessionStorage.getItem('token') || ''
    // 接口没返回时显示loading
    if (config.loading === true) {

    }
    return config
  },
  error => {

    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  res => {

    return res
  },
  error => {

    return Promise.reject(error)
  }
)

function get(url, data, loading) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: data
    }).then(response => {
      resolve(response)
    }, error => {
      reject(error)
    }).catch(err => {
      reject(err)
    })
  }) 
}

function post (url, data, loading) {
  return new Promise((resolve, reject) => {
    http.get(url, data).then(response => {
      resolve(response.data)
    }, error => {
      reject(error)
    }).catch(err => {
      reject(err)
    })
  })
}

export default { http, get, post }
