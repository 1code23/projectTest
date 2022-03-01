import request from '@/utils/request'
//菜单管理-api
export function creat(data) {
  return request({
    url: '/p/menu/creat',
    method: 'POST',
    data
  })
}
export function del(params) {
  return request({
    url: '/p/menu/del',
    method: 'DELETE',
    params
  })
}
export function update(data) {
  return request({
    url: '/p/menu/update',
    method: 'PUT',
    data
  })
}
export function info(params) {
  return request({
    url: '/p/menu/info',
    method: 'GET',
    params
  })
}
export function getMenuList(params) {
  return request({
    url: '/p/menu/list',
    method: 'GET',
    params
  })
}
