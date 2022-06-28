import request from '@/utils/request'

/**
 * 授权
 * @returns
 */
export function authorized(roleId, data) {
  return request({
    url: `/api/v1/role/${roleId}/authorized`,
    method: 'post',
    data
  })
}

/**
 * 获取权限
 * @param {*} roleId
 * @returns
 */
export function permission(roleId) {
  return request({
    url: `/api/v1/role/${roleId}/permission`,
    method: 'get'
  })
}
