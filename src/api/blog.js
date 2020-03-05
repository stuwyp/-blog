import request from '@/utils/request'

const URL = {
  GET_LIST: '/api/blog',
  GET_BLOG_DETAIL: '/api/blog/:uuid',
  CREATE: '/api/blog',
  UPDATE: '/api/blog/:uuid',
  DELETE: '/api/blog/:uuid',
  GET_USER_BLOGS: '/api/user/:userId/blogs',
  GET_USER_RECYCLE_BLOGS: '/api/user/:userId/recycle_blogs',
}

export default {
  getBlogs({page = 1, tag = []}) {
    return request(URL.GET_LIST, 'GET', {page, tag})
  },

  getBlogsByUserId({userId, tag = [], page = 1}) {
    return request(URL.GET_USER_BLOGS.replace(':userId', userId), 'GET', {page, tag})
  },

  getRecycleBlogsByUserId({userId, tag = [], page = 1}) {
    return request(URL.GET_USER_RECYCLE_BLOGS.replace(':userId', userId), 'GET', {page, tag})
  },

  getBlogDetail({uuid}) {
    return request(URL.GET_BLOG_DETAIL.replace(':uuid', uuid))
  },

  updateBlog({uuid, title, content, description, update_kind}) {
    return request(URL.UPDATE.replace(':uuid', uuid), 'PUT', {title, content, description, update_kind})
  },

  deleteBlog({uuid}) {
    return request(URL.DELETE.replace(':uuid', uuid), 'DELETE')
  },

  createBlog({title = '', content = '', description = '', user_id, tags, uuid, category_id, state}) {
    console.log(arguments)
    return request(URL.CREATE, 'POST', {
      title,
      content,
      description,
      user_id,
      tags: JSON.stringify(tags),
      uuid,
      category_id,
      state
    })
  }
}
