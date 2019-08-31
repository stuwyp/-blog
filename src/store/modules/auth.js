import auth from '@/api/auth'

const state = {
  user: null,
  isLogin: false,
  token: ''
}

const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin,
  token: state => {
    if (state.token === '')
      state.token = window.localStorage.getItem('jwt_token');
    return state.token
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },

  setLogin(state, payload) {
    state.isLogin = payload.isLogin
  },

  setToken(state, payload) {
    window.localStorage.setItem('jwt_token', payload.token);
    state.token = payload.token
  }
}

const actions = {
  login({commit}, {username, password}) {
    return auth.login({username, password})
      .then(res => {
        // console.log("data ", res)
        commit('setUser', {user: res.data})
        commit('setLogin', {isLogin: true})
        commit('setToken', {token: res.token})
        // console.log("Set ", state.isLogin, state.user, state.token)
      })
  },

  async register({commit}, {username, password, email}) {
    await auth.register({username, password, email})
    return auth.login({username, password})
      .then(res => {
        // console.log("data ", res)
        commit('setUser', {user: res.data})
        commit('setLogin', {isLogin: true})
        commit('setToken', {token: res.token})
        // console.log("Set ", state.isLogin, state.user, state.token)
      })
  },

  logout({commit}) {
    commit('setUser', {user: null})
    commit('setLogin', {isLogin: false})
    commit('setToken', {token: ''})
  },

  async checkLogin({commit, state}) {
    // console.log("checking")
    if(state.isLogin) return true

    try {
      let res = await auth.getInfo()
      // console.log("auth res",res)
      commit('setLogin', {isLogin: res.isLogin})
      if (!res.isLogin) return false
      commit('setUser', {user: res.data})
      return true
    }
    catch (err) {
      console.log(err)
      return false
    }

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
