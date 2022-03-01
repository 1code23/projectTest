import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { handelEncryptedData } from './crypto'

// 当前环境是否为开发环境，一个开启或者关闭加密解密的开关
// process.env.NODE_ENV === 'development'
// 设置为 false 时则开启加密模式
const _NODE_ENV = process.env.NODE_ENV === 'development'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: false, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时时间
})

const codeMsg = {
  200: '请求成功',
  410: '登陆失败'
}

// request interceptor
service.interceptors.request.use(
  config => {
    // 非开发环境header配置
    if (!_NODE_ENV) {
      if (store.getters.token) {
        // 让每个请求携带token
        config.headers['Authorization'] = 'Bearer ' + getToken()
      }
      // 非开发环境请求参数需要加密
      const { url, params, data } = handelEncryptedData(config, 'encrypt')
      if (config.method == 'get' || config.method == 'delete') {
        config.url = url
        config.params = params
      } else {
        config.data = data
      }
    } else {
      // 开发环境跳过加密
      config.headers['c'] = '7191514'
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    // 非开发环境参数解密
    if (!_NODE_ENV) {
      res = handelEncryptedData(res, 'decrypt')
    }

    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const err = error.response.data
    Message({
      message: err.msg || err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
