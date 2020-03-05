import axios from 'axios'
// import {Message} from 'element-ui'
import store from "../store"
import Qs from 'qs'

axios.defaults.baseURL = 'http://localhost:9000'
// axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

const service = axios.create({
  timeout: 20000, // 请求超时时间
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return Qs.stringify(data)
  }]
})


// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // console.log(config.headers)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // if (!response.data.value && response.data.data.message === 'token invalid') {
    //   // 刷新token
    //   store.dispatch('refresh').then(response => {
    //     sessionStorage.setItem('access_token', response.data)
    //   }).catch(error => {
    //     throw new Error('token刷新' + error)
    //   })
    // }
    return res
    // if (res.code >= 30000) {
    //   Message({
    //     message: res.msg,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm(
    //       '你已被登出，可以取消继续留在该页面，或者重新登录',
    //       '确定登出',
    //       {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       // if (this.$router.currentRoute.name === '') {
    //       //   this.$router.replace({
    //       //     name: 'login',
    //       //     query: { redirect: this.$router.currentRoute.fullPath }
    //       //   })
    //       // }
    //       store.dispatch('logout').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // }
    // else {
    //   return res
    // }
  },
  error => {
    // let errorMap = {
    //   400: '请求错误(400)',
    //   401: '未授权，请重新登录(401)',
    //   403: '拒绝访问(403)',
    //   404: '请求出错(404)',
    //   408: '请求超时(408)',
    //   500: '服务器错误(500)',
    //   501: '服务未实现(501)',
    //   502: '网络错误(502)',
    //   503: '服务不可用(503)',
    //   504: '网络超时(504)',
    //   505: 'HTTP版本不受支持(505)',
    // }
    return Promise.reject(error);
  }
)

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    }
    else {
      option.data = data
    }
    service(option)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
