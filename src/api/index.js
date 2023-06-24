import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'helloWorld',
    method: 'get'
  })
}
