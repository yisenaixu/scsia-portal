import { createStore } from "vuex";
import { getLinks, getNews, getSlides, } from "../api/router"
import { transformRoutesToNav } from "../utils/router";
import { getYMD } from "../utils/home";
const store = createStore({
   state: { 
    news_count: 5,
    navs: [],
    homeNaviIds: [],   //0: main 1-3: sub
    homeData: {},
    searchResult: [], // 整体搜索结果
    searchList: JSON.parse(localStorage.getItem('list')),  //传给单栏目新闻的搜索结果
  },
  mutations: {
    update(state,payload) {
        state.navs = payload
        console.debug('payload',payload);
        sessionStorage.setItem('navs',JSON.stringify(state.navs))
    },
    updateHome(state, { key, value }) {
      state.homeData[key] = value;
    },
    setHomeNaviIds(state, payload) {
      console.debug('sett')
      state.homeNaviIds.push(payload)
    },
    setSearchResult(state, payload) {
      console.log('更新搜索结果')
      state.searchResult = payload
    },
    setSearchList(state, payload) {
      console.log('更新搜索列表')
      state.searchList = payload
      localStorage.setItem('list',JSON.stringify(payload))
    }
  },
  actions: {
    /**
     * @description 获取主页主题新闻 
     */
    fetchMainNews({ state, commit }) {
      getNews(state.homeNaviIds[0],state.news_count)
        .then(res => { 
          let newsList = res.rows.map(item => ({id:item.id, title:item.newsTitle, time:getYMD(item.newsTime), detail:item,isTop:item.newsIsTop}))
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
              let newsList = res.rows.map(item => ({id:item.id, title:item.newsTitle, detail:item,isTop:item.newsIsTop}))
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
              title: item.slidTitle,
              id: item.id
            }
          })
          commit('updateHome',{key: `slides`, value: slides})
      })
    },
        /**
     * @description 获取主页友情链接
     */
        fetchLinks({ state, commit }) {
          getLinks()
            .then(res => {
              let links = []
              let result = res.rows
                .map( item => {
                   return {
                    url: item.linkUrl,
                    src: item.linkPic,
                    name: item.linkName,
                    id: item.id
                  }
                 })
              for(let i = 0 ; i < result.length; i+=4) {
                 links.push(result.slice(i,i+4));
              }
              commit('updateHome',{key: `links`, value: links})
          })
        }
  }
})

export default store;