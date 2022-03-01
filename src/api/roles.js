import request from '@/utils/request'
//角色管理-api
export function creat(data) {
  return request({
    url: '/p/role/creat',
    method: 'POST',
    data
  })
}
export function del(params) {
  return request({
    url: '/p/role/del',
    method: 'DELETE',
    params
  })
}
export function update(data) {
  return request({
    url: '/p/role/update',
    method: 'PUT',
    data
  })
}
export function info(params) {
  return request({
    url: '/p/role/info',
    method: 'GET',
    params
  })
}
export function list(params) {
  return request({
    url: '/p/role/list',
    method: 'GET',
    params
  })
}
