import { createStore } from "vuex";
import router from "../router";
import { transformRoutesToNav } from "../utils/router";
const store = createStore({
   state: { 
    routes: [],
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
  },
})

export default store;