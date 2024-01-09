import './assets/css/main.css'
import './assets/css/default.css'
import 'animate.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'virtual:svg-icons-register'
import { getRoutes, setRoutes } from './utils/router';

const app = createApp(App) 

app.use(router);
app.use(store);
app.mount('#app')
