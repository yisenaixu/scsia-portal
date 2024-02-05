import { getRouters } from '../api/router'
import router from '../router'
import store from '../store'

/**
 * @description 转化后端动态路由为前端路由可用数据类型
 * @param {Object} routes
 * @returns
 */
export function tranformRoute(routes) {
  const typeToComponent = {
    1: 'About',
    2: 'News',
    3: 'File',
    4: 'Img',
  }
  const modules = import.meta.glob('../views/*.vue')

  let newRoutes = routes
    .filter(item => item.naviIsOut !== 1)
    .map(item => {
      console.debug(item)
      const { id, naviName, naviUrl, naviType, parentId, children } = item
      let transChildren = []
      if (children && children.length > 0) {
        transChildren = tranformRoute(children)
      }
      let newRoute = {
        id,
        //路由path
        path: parentId === 0 ? `/${naviUrl}` : naviUrl,
        // 路由name
        name: naviUrl,
        component:
          children && children.length > 0
            ? modules['../views/Content.vue']
            : modules[`../views/${typeToComponent[naviType]}.vue`],
        children: transChildren,
        meta: {
          // 栏目名
          title: naviName,
          parentId,
          id,
        },
        redirect: parentId === 0 ? `/${naviUrl}/${transChildren[0]?.path}` : '',
      }
      //新闻页面单独添加新闻详情页
      if (naviType === 2) {
        newRoute['children'].push({
          path: ':id',
          name: `${naviUrl}详情`, //约定的路由命名
          component: modules['../views/Newsdetail.vue'],
        })
        store.commit('setHomeNaviIds', { id: id, title: naviName })
      }
      // 图片页面添加详情页
      if (naviType === 4) {
        newRoute['children'].push({
          path: ':id',
          name: `${naviUrl}详情`, //约定的路由命名
          component: modules['../views/ImgDetail.vue'],
        })
      }
      return newRoute
    })
  return newRoutes
}

/**
 * @description 转化路由为导航组件属性
 * @param {*} routes
 * @returns
 */
export function transformRoutesToNav(routes, extraRoute) {
  let navs = []
  navs = routes
    ?.filter(item => item.naviIsShow !== 0)
    .map(item => {
      let nav = {
        title: item?.naviName,
        url: item.parentId === 0 ? `/${item.naviUrl}` : item.naviUrl,
        type: item.naviIsOut === 1 ? 'out' : 'in',
      }
      if (item.children && item.children.length > 0) {
        nav.children = transformRoutesToNav(item.children)
      }
      return nav
    })
  //添加默认nav
  if (extraRoute) navs.unshift(extraRoute)
  return navs
}

/**
 * @description 获得动态路由
 * @returns
 */
export async function getRoutes() {
  let res = await getRouters()
  let routerMap = tranformRoute(res.data)
  let navMap = transformRoutesToNav(res.data, { title: '首页', url: '/' })
  return {
    routerMap,
    navMap,
  }
}

export function setRoutes(routes) {
  const { routerMap, navMap } = routes
  for (let i of routerMap) {
    router.addRoute(i)
    router.options.routes.push(i)
  }
  store.commit('update', navMap)
}
