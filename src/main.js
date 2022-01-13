import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css'; // css初始化
import './assets/styles/common.scss'; // 公共css
import store from './store'
import router from './router';
import i18n from './locales';
import App from './App.vue';
import 'virtual:svg-icons-register';
import './utils/websocket'

const app = createApp(App);
app.use(ElementPlus);
app.use(store)
app.use(router);
app.use(i18n);
app.mount('#app');
