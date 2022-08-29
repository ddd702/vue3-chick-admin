import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import AppIcon from '@/components/AppIcon.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import router from './router';
import Utils from './utils';
import { useLayoutStore } from '@/stores/layout';
import { useLogStore, LogType } from '@/stores/log';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/app.scss';
import './styles/iconfont/iconfont.css';
(window as any).appUtils = Utils;
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
//注册全局组件
app.component('AppIcon', AppIcon);
app.mount('#app');
/**收集错误
 */
const logStore = useLogStore();
app.config.errorHandler = (err: any, _instance, info) => {
  console.error('vue err', err);
  // 处理错误，例如：报告给一个服务
  logStore.add({
    info: err.message || '未知错误',
    err,
    type: LogType.Err,
    url: location.href,
    title: info,
  });
};
// 设置一些页面布局的操作
/** 设置暗黑还是浅色模式
 */
const layoutStore = useLayoutStore();
const setThemeMode = () => {
  if (layoutStore.dark) {
    document.querySelector('html')?.classList.add('dark');
  } else {
    document.querySelector('html')?.classList.remove('dark');
  }
};
setThemeMode();
layoutStore.$subscribe((mutation) => {
  const events: any = mutation.events;
  if (events.key === 'dark') {
    setThemeMode();
  }
});
