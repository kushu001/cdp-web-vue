import request from '@/utils/request'

/**
 * 数据字典列表查询
 * @param {*} query
 * @returns
 */
export function fetchList(query) {
  return request({
    url: '/api/v1/dict',
    method: 'get',
    params: query
  })
}

/**
 * 查询字典明细
 * @param {*} id
 * @returns
 */
export function get(id) {
  return request({
    url: `/api/v1/dict/${id}`,
    method: 'get'
  })
}

/**
 * 新增字典
 * @param {*} form
 * @returns
 */
export function add(data) {
  return request({
    url: '/api/v1/dict',
    method: 'post',
    data
  })
}

/**
 * 修改字典
 * @param {*} form
 * @returns
 */
export function update(id, data) {
  return request({
    url: `/api/v1/dict/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除字典
 * @param {*} id
 * @returns
 */
export function deleteById(id) {
  return request({
    url: `/api/v1/dict/${id}`,
    method: 'delete'
  })
}
