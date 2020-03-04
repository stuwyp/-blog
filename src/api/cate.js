import request from '@/utils/request'

const URL = {
  GET_LIST: '/api/cate',
}

export default {
  getCates({limit = 10} = {limit: 10}) {
    return request(URL.GET_LIST, 'GET', {limit})
  }
}
