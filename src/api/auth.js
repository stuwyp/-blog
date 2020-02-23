import request from '@/utils/request'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth/info'
}

export default {
  register({username, password,email}) {
    // console.log(email)
    return request(URL.REGISTER, 'POST', {username, password, email})
  },

  login({username, password}) {
    return request(URL.LOGIN, 'POST', {username, password})
  },

  logout() {
    return request(URL.LOGOUT, 'POST')
  },

  getInfo() {
    return request(URL.GET_INFO, 'POST')
  }
}
