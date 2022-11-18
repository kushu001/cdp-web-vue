import request from '@/utils/request'

export function audit(id) {
  return request({
    url: `/api/v1/user/audit/${id}`,
    method: 'put'
  })
}
