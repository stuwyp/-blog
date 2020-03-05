import request from '@/utils/request'

const URL = {
  GET_DRAFT_BY_UUID: '/api/draft/getDraft',
  GET_LIST: '/api/draft',
  GET_DRAFT_DETAIL: '/api/draft/:uuid',
  CREATE: '/api/draft',
  UPDATE: '/api/draft/:uuid',
  DELETE: '/api/draft/:uuid',
  GET_USER_DRAFTS: '/api/user/:userId/drafts',
  GET_USER_RECYCLE_DRAFTS: '/api/user/:userId/recycle_drafts',
}

export default {

  getDraftByUuid({uuid, user_id}) {
    return request(URL.GET_DRAFT_BY_UUID, 'POST', {
      user_id,
      uuid
    })
  },

  getDrafts({page = 1, tag = []}) {
    return request(URL.GET_LIST, 'GET', {page, tag})
  },

  getDraftsByUserId({userId, tag = [], page = 1}) {
    return request(URL.GET_USER_DRAFTS.replace(':userId', userId), 'GET', {page, tag})
  },

  getRecycleDraftsByUserId({userId, tag = [], page = 1}) {
    return request(URL.GET_USER_RECYCLE_DRAFTS.replace(':userId', userId), 'GET', {page, tag})
  },

  getDraftDetail({uuid}) {
    return request(URL.GET_DRAFT_DETAIL.replace(':uuid', uuid))
  },

  updateDraft({uuid, title, content, description, origin, category_id, tags, update_kind}) {
    return request(URL.UPDATE.replace(':uuid', uuid), 'PUT', {
      title,
      content,
      description,
      origin,
      category_id,
      tags: JSON.stringify(tags),
      state: 0,
      update_kind
    })
  },

  deleteDraft({uuid}) {
    return request(URL.DELETE.replace(':uuid', uuid), 'DELETE')
  },

  createDraft({title = '', content = '', description = '', user_id, uuid, tags = [], category_id = 8}) {
    // console.log(JSON.stringify(tags))
    return request(URL.CREATE, 'POST', {
      title,
      content,
      description,
      user_id,
      uuid,
      category_id,
      tags: JSON.stringify(tags),
      state: 0
    })

  }

}
