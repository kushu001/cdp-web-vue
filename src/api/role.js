import request from '@/utils/request'

/**
 * 菜单授权
 * @returns
 */
export function authorizedMenus(roleId, data) {
  return request({
    url: `/api/v1/role/${roleId}/authorizedMenus`,
    method: 'post',
    data
  })
}

/**
 * 功能授权
 * @returns
 */
export function authorizedOperations(roleId, data) {
  return request({
    url: `/api/v1/role/${roleId}/authorizedOperations`,
    method: 'post',
    data
  })
}

/**
 * 获取菜单权限
 * @param {*} roleId
 * @returns
 */
export function menus(roleId) {
  return request({
    url: `/api/v1/role/${roleId}/menus`,
    method: 'get'
  })
}

/**
 * 获取菜单权限
 * @param {*} roleId
 * @returns
 */
export function operations(roleId) {
  return request({
    url: `/api/v1/role/${roleId}/operations`,
    method: 'get'
  })
}
