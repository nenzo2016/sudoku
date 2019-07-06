import request from '../utils/request'

export function fetchGame(query) {
  return request({
    url: 'subject',
    method: 'get',
    params: query
  })
}