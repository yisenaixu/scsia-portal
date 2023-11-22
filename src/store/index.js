import { createStore } from "vuex";
import { getNews, getSlides } from "../api/router"
import { transformRoutesToNav } from "../utils/router";
import { getYMD } from "../utils/home";
const store = createStore({
   state: { 
    news_count: 5,
    routes: [],
    homeNaviIds: [],   //0: main 1-3: sub
    homeData: {}
  },
  getters: {
    navs(state) {
        return transformRoutesToNav(state.routes,{title:'首页',url:'/'});
    }
  },
  mutations: {
    update(state,payload) {
        state.routes = payload
        console.debug('payload',payload);
        sessionStorage.setItem('routes',JSON.stringify(state.routes))
    },
    updateHome(state, { key, value }) {
      state.homeData[key] = value;
    },
    setHomeNaviIds(state, payload) {
      console.debug('sett')
      state.homeNaviIds.push(payload)
    }
  },
  actions: {
    /**
     * @description 获取主页主题新闻 
     */
    fetchMainNews({ state, commit }) {
      getNews(state.homeNaviIds[0],state.news_count)
        .then(res => { 
          let newsList = res.rows.map(item => ({id:item.id, title:item.newsTitle, time:getYMD(item.newsTime), detail:item,}))
          commit('updateHome',{key: 'mainNews', value: newsList})
        });  
    },
    /**
     * @description 获取主页次要新闻
     */
    fetchSubNews({ state, commit }){
      for(let i=0; i< state.homeNaviIds.length; i++) {
        if(i !== 0 ) {
          getNews(state.homeNaviIds[i],state.news_count)
            .then(res => {
              let title = res.rows[0]?.naviName;
              let newsList = res.rows.map(item => ({id:item.id, title:item.newsTitle, detail:item}))
              commit('updateHome',{key: `subNews_${i}`, value: {title,news: newsList}})
            })
        }
      }
    },
    /**
     * @description 获取主页轮播图
     */
    fetchSlides({ state, commit }) {
      getSlides()
        .then(res => {
          let slides = res.rows.map( item => {
            return {
              url: item.slidUrl,
              src: item.slidPic,
              id: item.id
            }
          })
          commit('updateHome',{key: `slides`, value: slides})
      })
    }
  }
})

export default store;