import request from '@/utils/request'

export function fetchList(query, url) {
  return request({
    url,
    method: 'get',
    params: query
  })
}
