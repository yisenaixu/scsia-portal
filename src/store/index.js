import { createStore } from 'vuex'
import { getLinks, getNews, getSlides } from '../api/router'
import { getYMD } from '../utils/home'
const store = createStore({
  state: {
    news_count: 5,
    //顶部导航
    navs: [],
    //主页展示新闻栏目和id
    homeNewsNavis: [],
    // 主页新闻数据
    homeData: {
      mainNews: [],
      subNews_1: [],
      subNews_2: [],
      subNews_3: [],
    },
    // 整体搜索结果
    searchResult: [],
    //传给单栏目新闻的搜索结果
    searchList: JSON.parse(localStorage.getItem('list')),
  },
  mutations: {
    update(state, payload) {
      state.navs = payload
      sessionStorage.setItem('navs', JSON.stringify(state.navs))
    },
    updateHome(state, { key, value }) {
      state.homeData[key] = value
    },
    setHomeNaviIds(state, payload) {
      state.homeNewsNavis.push(payload)
    },
    setSearchResult(state, payload) {
      console.log('更新搜索结果')
      state.searchResult = payload
    },
    setSearchList(state, payload) {
      console.log('更新搜索列表')
      state.searchList = payload
      localStorage.setItem('list', JSON.stringify(payload))
    },
  },
  actions: {
    /**
     * @description 获取主页主题新闻
     */
    fetchMainNews({ state, commit }) {
      if (state.homeNewsNavis.length > 0) {
        getNews(state.homeNewsNavis[0]?.id, state.news_count).then(res => {
          let newsList = res.rows.map(item => ({
            id: item.id,
            title: item.newsTitle,
            time: getYMD(item.newsTime),
            detail: item,
            isTop: item.newsIsTop,
          }))
          commit('updateHome', {
            key: 'mainNews',
            title: state.homeNewsNavis[0].title,
            value: newsList,
          })
        })
      }
    },
    /**
     * @description 获取主页次要新闻
     */
    fetchSubNews({ state, commit }) {
      for (let i = 0; i < state.homeNewsNavis.length; i++) {
        if (i !== 0) {
          getNews(state.homeNewsNavis[i].id, state.news_count).then(res => {
            let newsList = res.rows.map(item => ({
              id: item.id,
              title: item.newsTitle,
              isTop: item.newsIsTop,
              picUrl: item.newsPic,
            }))
            commit('updateHome', {
              key: `subNews_${i}`,
              title: state.homeNewsNavis[i].title,
              value: newsList,
            })
          })
        }
      }
    },
    /**
     * @description 获取主页轮播图
     */
    fetchSlides({ commit }) {
      getSlides().then(res => {
        let slides = res.rows.map(item => {
          return {
            url: item.slidUrl,
            src: item.slidPic,
            title: item.slidTitle,
            id: item.id,
          }
        })
        commit('updateHome', { key: 'slides', value: slides })
      })
    },
    /**
     * @description 获取主页友情链接
     */
    fetchLinks({ commit }) {
      getLinks().then(res => {
        let links = []
        let result = res.rows.map(item => {
          return {
            url: item.linkUrl,
            src: item.linkPic,
            name: item.linkName,
            id: item.id,
          }
        })
        for (let i = 0; i < result.length; i += 4) {
          links.push(result.slice(i, i + 4))
        }
        commit('updateHome', { key: 'links', value: links })
      })
    },
  },
})

export default store
