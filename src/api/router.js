import request from "../utils/request"
/**
 * @description 动态获得路由表
 */
export function getRouters() {
    return request({
      url: '/portal/navi',
      method: 'get',
    });
}
/**
 * @description 根据信息栏目id获取信息栏目内容
 * @param {Number} id
 */
export function getAbout(id) {
  return request({
    url: `/portal/info/${id}`,
    method: 'get',
  })
}
export function getNews(id, pageSize, current) {
  return request({
    url: `/portal/news/${id}`,
    method: 'get',
    params: {
      pageSize,
      current
    }
  })
}

export function getSingleNews(id) {
  return request({
    url: `/portal/new/${id}`,
    method: 'get',
  })
}

export function getFiles(id) {
  return request({
    url: `/portal/files`,
    method: 'get',
    params: {id},
  })
}
export function getPictures(id) {
  return request({
    url: `/portal/pictures`,
    method: 'get',
    params: {id},
  })
}

export function getSlides() {
  return request({
    url: `/portal/slides`,
    method: 'get'
  })
}