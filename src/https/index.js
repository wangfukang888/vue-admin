import axios from 'axios'
import store from '../stores'
import qs from 'qs'
import router from '../router'
import {
  Message
} from 'element-ui'

const is_production = process.env.NODE_ENV == 'production'
export const OK = 1

axios.defaults.timeout = 10000

const _axios = axios.create({
  baseURl: '/'
})

_axios.interceptors.response.use(
  res => {
    const _data = res.data
    if (_data.code == OK) return _data
    Message(_data.msg || '服务器响应错误')
    if(_data.msg == 'Token已失效') {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  },
  err => {
    try {
      const err_code = err.response.status
      switch (err_code) {
        case 401:
          // 登录过期 ,2秒后跳转
          Message('登录失效')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
          break;
        case 500:
          Message('服务器访问失败,请刷新后重试')
          break;
      }
    } catch (err) {
      Message('服务器错误或响应超时,请刷新重试')
    }
  }
)

_axios.interceptors.request.use(
  config => {
    if (is_production) config.url = proxy_handle(config.url)
    config.headers['access-token'] = store.state.load.token
    // if (config.method == 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  }
)

// 生产环境代理处理
function proxy_handle(url) {
  const pathArr = url.split('/')
  pathArr.splice(1, 1)
  return '/lss/api/v1' + pathArr.join('/')
}

export default _axios