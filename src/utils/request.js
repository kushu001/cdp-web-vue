import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200 && response.status !== 200) {
    if (res.code !== 200) {
      if (res.code === 500 || res.code === 405) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 403) {
        // to re-login
        // MessageBox.confirm('您已注销，可以取消以停留在此页面，或再次登录', '确认注销', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '系统错误，请联系管理员',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
