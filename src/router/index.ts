import { createRouter, createWebHashHistory } from 'vue-router';
import LayoutIndex from '@/layout/LayoutIndex.vue';

async function setRouter() {
  const generateRoutes: any = [];
  //批量导入vue组件，懒人操作
  const Pages = import.meta.glob(['../pages/**/*-page.vue']);
  for (const path in Pages) {
    const res: any = await Pages[path]();
    const module = res.default;
    generateRoutes.push({
      path: module.meta.path,
      meta: { ...module.meta },
      name: module.name,
      component: Pages[path],
    });
  }
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'index',
        component: LayoutIndex,
        children: [
          {
            path: '/changePsw',
            name: 'changePsw',
            meta: {
              title: '修改密码',
              auth: true, //是否要登录访问，默认false
            },
            component: () => import('../views/AboutView.vue'),
          },
        ].concat(generateRoutes),
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          title: '登录',
          top: true,
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于',
          auth: true, //是否要登录访问，默认false
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/:w+',
        component: () => import('../views/NotFound.vue'),
      },
    ],
  });
  return router;
}
export default setRouter;
