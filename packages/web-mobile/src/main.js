import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import 'nprogress/nprogress.css'
import Vant from 'vant';
import 'vant/lib/index.css';
const pinia = createPinia();
createApp(App).use(pinia).use(router).use(Vant).mount('#app')