import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/app.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
//注册全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
