import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRoutes, setRoutes } from '../utils/router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
     title: '首页',
     keepAlive: true,
    }
  },   
  {
    path: '/newsDetail1/:id',
    name: 'newsDetail',
    component: () => import('../views/NewsDetail.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to,from)=> {
  console.log(from, 'from');
  console.log(to, 'to');
   
// 未获取路由则请求动态路由
if(router.options.routes.length === router.getRoutes().length) {
    let routes = await getRoutes();
    setRoutes(routes);
    console.log(333);
    return to.fullPath;
}
// 路由不存在返回404页面
  if(!router.hasRoute(to.name))
  return {name: '404'};

return true;
})

export default router
