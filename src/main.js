import './assets/main.css'
import './assets/default.css'
import 'animate.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'virtual:svg-icons-register'
import { getRoutes, setRoutes } from './utils/router';

const app = createApp(App) 

if(router.options.routes.length === router.getRoutes().length) {
    let routes = [];
    console.debug(111);
    // if(sessionStorage.getItem('routes')) {
    //   routes = JSON.parse(sessionStorage.getItem('routes'));
    //   for(let i of routes) {
    //       router.addRoute(i);
    //       router.options.routes.push(i);
    //   }
    //   console.log(router.options.routes);
    //   console.debug(routes);
    //   store.commit('update',routes);
    //   console.log(222);
    // } else {
      routes = await getRoutes();
      setRoutes(routes);
      console.log(333);
//   }
  }

app.use(router);
app.use(store);
app.mount('#app')
