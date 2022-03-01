import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    // url: '/login',
    method: 'post',
    data
  })
}
export function info(params) {
  return request({
    url: '/account/info',
    method: 'get',
    params
  })
}
export function pwd(data) {
  return request({
    url: '/account/pwd',
    method: 'put',
    data
  })
}
