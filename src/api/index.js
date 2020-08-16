import req from '../https'

// 登录
export function getLogin(accountNo, pwd) {
  return req.post('/apis/login', {
    accountNo,
    pwd
  })
}

// 获取成本列表
export function getCostList(current = 1, size = 10) {
  return req.get('/apis/cost', {
    params: {
      current,
      size
    }
  })
}

// 增加成本列表
export function getCostListAdd(data) {
  return req.post('/apis/cost', data)
}

// 更新成本列表
export function getCostListUpdate(data) {
  return req.put('/apis/cost', data)
}