import request from '@/utils/request'

export function resetPassword(data) {
  return request({
    url: `/api/v1/resetPassword`,
    method: 'post',
    data
  })
}
