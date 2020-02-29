// import blog from '@/api/blog'

const state = {
  blogs: [],
  total: 0,
  page: 1,
  pageCount: 0,
}

const getters = {
  blogs: state => state.blogs,
  total: state => state.total,
  page: state => state.page,
  pageCount: state=>state.pageCount
}


const mutations = {
  setBlogs(state, payload) {
    state.blogs = payload.blogs
  },

  setTotal(state, payload) {
    state.total = payload.total
  },

  setPage(state, payload) {
    state.page = payload.page
  },

  setPageCount(state, payload) {
    state.pageCount = payload.pageCount
  },
}

export default {
  state,
  getters,
  mutations,
}
