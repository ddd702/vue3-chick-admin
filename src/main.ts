import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import AppIcon from '@/components/AppIcon.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
//引入 nprogress
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 引入样式
import App from './App.vue';
import router from './router';
import Utils from './utils';
import { useLayoutStore } from '@/stores/layout';
import { useRouteStore } from '@/stores/route';
import { useLogStore, LogEnum } from '@/stores/log';
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
console.warn('router', router.getRoutes());
//注册全局组件
app.component('AppIcon', AppIcon);
app.mount('#app');

//app.use(createPinia()) 后才能初始化store
const layoutStore = useLayoutStore();
const logStore = useLogStore();
const routeStore = useRouteStore();
routeStore.setAllRoutes(router.getRoutes());
/**收集错误
 */
app.config.errorHandler = (err: any, _instance, info) => {
  console.error('vue err', err);
  // 处理错误，例如：报告给一个服务
  logStore.add({
    info: err.message || '未知错误',
    err,
    type: LogEnum.Err,
    url: location.href,
    title: info,
  });
};
window.addEventListener('error', (event) => {
  console.error('window error', event);
});
// 简单配置NProgress
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

// 进度条开始
router.beforeEach((to, from, next) => {
  logStore.add({
    info: `from:${from.fullPath}<br>to:${to.fullPath}`,
    type: LogEnum.Log,
    url: location.href,
    title: '路由切换',
  });
  routeStore.addCache(to);
  routeStore.setCurrentRoute(to);
  layoutStore.updateAsideMenuActive();
  NProgress.start();
  next();
});

// 进度条结束
router.afterEach(() => {
  NProgress.done();
});
// 设置一些页面布局的操作
/** 设置暗黑还是浅色模式
 */

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
