import { getRouters } from '../api/router';
import router from '../router';
import store from '../store';

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
        4: 'Img'
    }
    const modules = import.meta.glob('../views/*.vue');    

    let newRoutes = routes.map(item => {
        console.log(item);
        const {id, naviName, naviUrl, naviType, parentId, children} = item;
        console.log(typeToComponent[naviType]);
        let newRoute = {
            id,
            path: parentId === 0 ? `/${naviUrl}` : naviUrl,
            name: naviName,
            component: children && children.length > 0 ? modules[`../views/Content.vue`] :modules[`../views/${typeToComponent[naviType]}.vue`],
            children: children && children.length > 0 ? tranformRoute(children) : [],
            meta: {
                title: naviName,
                parentId,
                id,
            },
            redirect: parentId === 0 ? `/${naviUrl}/${tranformRoute(children)[0].path}` : ''
        }
        //新闻页面单独添加新闻详情页
        if(naviType === 2) {
            console.log('add detail')
            newRoute['children'].push({
                path: ':id',
                name: `${naviName}详情`,   //约定的路由命名
                component: modules[`../views/Newsdetail.vue`]
            })
        }
        console.log(newRoute);
        return newRoute;
    })

    return newRoutes;
}

/**
 * @description 获得动态路由
 * @returns 
 */
export async function getRoutes() {
    let res = await getRouters()
    console.log(res);
    let routerMap = tranformRoute(res.data);
    console.log(routerMap);
    console.debug('routermap',routerMap);
    console.debug(router.options.routes);
    console.log(router.getRoutes());
    return routerMap;
}

export function setRoutes(routes) {
    for(let i of routes) {
        console.log('1',i);
        router.addRoute(i);
        router.options.routes.push(i);
      }
      store.commit('update',routes);
}


/**
 * @description 转化路由参数为nav组件需要使用属性
 * @param {*} routes 
 * @returns 
 */
export function transformRoutesToNav(routes,extraRoute) {
  let navs = [];
  navs = routes?.map(item => {
      let nav = {title: item?.meta?.title,
                 url: item?.path};
      if(item.children && item.children.length > 0) {
        nav.children = transformRoutesToNav(item.children);
      }
      return nav;
  }) 
  //添加默认nav
  if(extraRoute)
    navs.unshift(extraRoute);
  console.debug("navs",navs);
  return navs;
}
