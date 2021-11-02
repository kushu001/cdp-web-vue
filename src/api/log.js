import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/logs',
    method: 'get',
    params: query
  })
}