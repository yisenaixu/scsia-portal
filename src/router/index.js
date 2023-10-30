import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRoutes, transformRoutesToNav } from '../utils/router'
import store from '../store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})
router.beforeEach(async (to,from)=> {
  console.log(from, 'from');
  console.log(to, 'to');
  if(!router.hasRoute(to.name))
    return {name: '404'};
  return true;
})

export default router
