import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import other from './modules/other'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    other
  }
})
