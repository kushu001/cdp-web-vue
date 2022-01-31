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
  return request({
    url,
    method: 'post',
    params: data
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
    params: data
  })
}
