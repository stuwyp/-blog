import request from '@/utils/request'

const URL = {
  GET_LIST: '/api/blog',
  GET_BLOG_DETAIL: '/api/blog/:blogId',
  CREATE: '/api/blog',
  UPDATE: '/api/blog/:blogId',
  DELETE: '/api/blog/:blogId',
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

  getBlogDetail({blogId}) {
    return request(URL.GET_BLOG_DETAIL.replace(':blogId', blogId))
  },

  updateBlog({blogId, title, content, description}) {
    return request(URL.UPDATE.replace(':blogId', blogId), 'PUT', {title, content, description})
  },

  deleteBlog({blogId}) {
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
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
