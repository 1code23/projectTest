import request from '@/utils/request'
//成员管理-api
export function creat(data) {
  return request({
    url: '/p/user/creat',
    method: 'POST',
    data
  })
}
export function del(params) {
  return request({
    url: '/p/user/del',
    method: 'DELETE',
    params
  })
}
export function update(data) {
  return request({
    url: '/p/user/update',
    method: 'PUT',
    data
  })
}
export function info(params) {
  return request({
    url: '/p/user/info',
    method: 'GET',
    params
  })
}
export function list(params) {
  return request({
    url: '/p/user/list',
    method: 'GET',
    params
  })
}
export function pwdReset(data) {
  return request({
    url: '/p/user/pwd/reset',
    method: 'POST',
    data
  })
}
