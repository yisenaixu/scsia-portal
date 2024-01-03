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
 * @param {number} id
 */
export function getAbout(id) {
  return request({
    url: `/portal/info/${id}`,
    method: 'get',
  })
}

/**
 * @description 根据新闻栏目id获取新闻栏目内容
 * @param {number} id
 * @param {number} pageSize
 * @param {number} current
 */
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

/**
 * @description 根据新闻id获取详情
 * @param {number} id 
 */
export function getSingleNews(id) {
  return request({
    url: `/portal/new/${id}`,
    method: 'get',
  })
}

/**
 * @description 根据文件栏目id获取文件栏目内容
 * @param {number} id 
 */
export function getFiles(id) {
  return request({
    url: `/portal/files`,
    method: 'get',
    params: {id},
  })
}
/**
 * @description 根据图片栏目id获取图片栏目内容
 * @param {number} id 
 */
export function getPictures(id) {
  return request({
    url: `/portal/pictures`,
    method: 'get',
    params: {id},
  })
}

/**
 * @description 获取轮播图栏目内容
 */
export function getSlides() {
  return request({
    url: `/portal/slides`,
    method: 'get'
  })
}
/**
 * @description 获取友情链接内容
 */
export function getLinks() {
  return request({
    url: `/portal/links`,
    method: 'get'
  })
}

/**
 * @description 通过新闻标题搜索新闻
 * @param {number} keyword
 */
export function search(keywords) {
  return request({
    url: `/portal/news/search?keywords=${keywords}`,
    method: 'get'
  })
}