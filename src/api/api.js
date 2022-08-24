import request from '@/utils/request'

/**
 * 通用查询
 * @param {*} query
 * @param {*} url
 * @returns
 */
export function fetchList(query, url) {
  return request({
    url,
    method: 'get',
    params: query
  })
}

/**
 * 通用新增
 * @param {*} data
 * @param {*} url
 * @returns
 */
export function add(data, url) {
  delete data.id
  return request({
    url,
    method: 'post',
    data
  })
}

/**
 * 通用新增
 * @param {*} data
 * @param {*} url
 * @returns
 */
export function update(data, url) {
  return request({
    url,
    method: 'put',
    data
  })
}

/**
 * 通用查询信息
 * @param {*} url
 * @returns
 */
export function get(url) {
  return request({
    url,
    method: 'get'
  })
}

/**
 * 通用删除操作
 * @param {*} url
 * @returns
 */
export function deleteById(url) {
  return request({
    url,
    method: 'delete'
  })
}

/**
 * 通用导出
 * @param {*} query
 * @param {*} url
 * @returns
 */
export function exportExcel(query, url) {
  return request({
    url,
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
