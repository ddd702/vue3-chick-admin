<template>
  <ck-page footer header>
    <h4 class="title">介绍</h4>
    <section
      style="padding: 20px 0; align-items: center"
      class="content t-flex"
    >
      <el-image
        style="width: 200px"
        src="https://cdn.zcxnb.cn/upload/nzlycJVlt6.png"
      ></el-image>
      <div style="padding-left: 10px">
        chick admin是一个简洁的，容易使用的,使用TypeScript基于Vue3 +
        Element-Plus + Vite 开发的中/后台管理系统模板🤖,希望大家喜欢
      </div>
    </section>
    <h4 class="title">特点</h4>
    <div class="space"></div>
    <ul class="list">
      <li>自动生成路由</li>
      <li>支持暗黑模式</li>
      <li>兼容移动端</li>
      <li>iconfont图标库</li>
      <li>多语言</li>
      <li>主题切换</li>
      <li>eslint+husy规范项目</li>
      <li>内置echart图表库</li>
      <li>内置wangeditor富文本编辑器</li>
    </ul>
    <div class="space"></div>
    <h4 class="title">版本</h4>
    <div style="padding: 20px 0 0 0">V{{ version }}</div>
    <a
      style="display: inline-block; padding: 10px 0 40px 0"
      href="https://github.com/ddd702/vue3-chick-admin"
      target="_blank"
    >
      Github
    </a>
    <h4 class="title">项目依赖</h4>
    <div class="dependencies">
      <el-tag
        round
        effect="dark"
        :type="randomType(index)"
        class="t-pointer"
        style="margin: 5px 2px"
        v-for="(item, key, index) in dependencies"
        :key="key"
      >
        <a
          style="color: #fff"
          target="_blank"
          :href="`https://www.npmjs.com/package/${key}`"
        >
          {{ key }}<span style="opacity: 0.7">({{ item }})</span>
        </a>
      </el-tag>
    </div>
    <h4 class="title">使用指南</h4>
    <div class="space"></div>
    <div>👈🏻请注意左侧菜单栏</div>
    <div class="space"></div>
    <h4 class="title">项目结构</h4>
    <div class="ck-code-cell">
      <pre v-hl>
  ├─.env ------------------------- // 默认环境变量
  ├─.env.development ------------- // development环境变量
  ├─.env.production -------------- // production正式环境变量
  ├─.eslintignore ---------------- // eslint忽略设置
  ├─.eslintrc.cjs ---------------- // eslint规则
  ├─.gitignore 
  ├─.husky ----------------------- // husky相关
  │ ├─commit-msg 
  │ └─pre-commit 
  ├─.huskyrc 
  ├─.lintstagedrc 
  ├─.vscode 
  │ └─extensions.json 
  ├─LICENSE 
  ├─README.md 
  ├─commitlint.config.js --------- // 提交规范
  ├─cypress 
  ├─cypress.config.ts 
  ├─index.html 
  ├─package.json 
  ├─public ----------------------- // 静态资源
  │ ├─favicon.ico 
  │ └─image 
  │   └─loading-spin.svg --------- // 进来页面的loading图标
  ├─src 
  │ ├─App.vue 
  │ ├─apis ----------------------- // 放请求后端接口的文件夹
  │ │ ├─sys.ts 
  │ │ └─test.ts 
  │ ├─components ----------------- // 内置组件
  │ │ ├─CkIcon.vue --------------- // 图标组件
  │ │ ├─CkPage.vue --------------- // 通用页面组件
  │ │ ├─CkWaterMark.vue ---------- // 水印
  │ │ ├─Login.vue 
  │ │ └─__tests__ 
  │ │   └─AppIcon.spec.ts 
  │ ├─contants ------------------- // 常量
  │ │ └─index.ts 
  │ ├─layout --------------------- // 布局相关
  │ │ ├─LayoutIndex.vue ---------- // 布局的父容器
  │ │ └─components 
  │ │   ├─AsideMenuItem.vue ------ // 菜单子项
  │ │   ├─LayoutAside.vue -------- // 左侧菜单栏
  │ │   ├─LayoutHeader.vue ------- // 顶部栏
  │ │   ├─LayoutHistory.vue ------ // 历史路由tab
  │ │   ├─LogDialog.vue ---------- // 系统bug日志的弹窗
  │ │   ├─ThemeDialog.vue -------- // 主题弹窗
  │ │   └─ThemeItem.vue ---------- // 主题子项
  │ ├─locale --------------------- // 语言包
  │ │ ├─index.ts 
  │ │ └─lang 
  │ │   ├─en.ts 
  │ │   └─zh-cn.ts 
  │ ├─main.ts 
  │ ├─pages ---------------------- // 该目录下的以-page.vue结尾的文件会自动生成路由
  │ │ ├─Directive 
  │ │ │ └─directive-page.vue 
  │ │ ├─Home 
  │ │ │ └─index-page.vue 
  │ │ ├─Icons 
  │ │ │ └─icons-page.vue 
  │ │ ├─Posts 
  │ │ │ ├─edit-page.vue 
  │ │ │ └─index-page.vue 
  │ │ └─WaterMark 
  │ │   └─water-mark-page.vue 
  │ ├─plugins -------------------- // 插件
  │ │ ├─axios.ts ----------------- // axios配置
  │ │ └─directives.ts ------------ // vue的自定义指令
  │ ├─router --------------------- // 路由配置
  │ │ └─index.ts 
  │ ├─stores --------------------- // 通过pinia控制的全局store
  │ │ ├─layout.ts ---------------- // 布局相关
  │ │ ├─log.ts ------------------- // 系统bug日志相关
  │ │ ├─route.ts ----------------- // 路由控制相关
  │ │ └─user.ts ------------------ // 用户相关
  │ ├─styles --------------------- // 样式
  │ │ ├─app.scss 
  │ │ ├─base.scss ---------------- // 基本样式
  │ │ ├─iconfont ----------------- // iconfont图标样式
  │ │ │ ├─demo.css 
  │ │ │ ├─demo_index.html 
  │ │ │ ├─iconfont.css 
  │ │ │ ├─iconfont.json 
  │ │ │ ├─iconfont.ttf 
  │ │ │ ├─iconfont.woff 
  │ │ │ └─iconfont.woff2 
  │ │ ├─mixins.scss 
  │ │ ├─theme -------------------- // 主题样式
  │ │ │ ├─acg.scss 
  │ │ │ └─yuanshen.scss 
  │ │ └─vars.scss 
  │ ├─utils ---------------------- // 工具类
  │ │ ├─index.ts 
  │ │ ├─req.ts ------------------- // 请求api相关
  │ │ └─storage.ts --------------- // 本地存储处理
  │ └─views ---------------------- // 一些必须的视图页面
  │   ├─AboutView.vue ------------ // 关于页面不太必要的，可删去
  │   ├─Login.vue ---------------- // 登录页面
  │   └─NotFound.vue ------------- // 404页面
  ├─tsconfig.app.json 
  ├─tsconfig.config.json 
  ├─tsconfig.json 
  ├─tsconfig.vitest.json 
  ├─types ------------------------ // ts的类型配置
  │ ├─env.d.ts ------------------- // env的类型
  │ ├─global.d.ts 
  │ └─window.d.ts 
  └─vite.config.ts --------------- // vite配置
      </pre>
    </div>

    <h4 class="title">echart示例</h4>
    <div class="ec-wrapper">
      <div id="ec-2" class="ec-demo"></div>
      <div id="ec-1" class="ec-demo"></div>
    </div>
  </ck-page>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { userStoreInject, layoutStoreInject } from '@/contants';
import pkgJson from 'root/package.json';
import * as echarts from 'echarts';
let MyChartA: any;
let MyChartB: any;
export default defineComponent({
  meta: {
    path: '/',
    title: '首页',
    enTitle: 'Home',
    auth: false,
    cache: true,
  },
  name: 'home',
  setup() {
    return {
      layoutStore: inject(layoutStoreInject) as any,
      userStore: inject(userStoreInject) as any,
      dependencies: ref(pkgJson.dependencies || {}),
      version: ref(pkgJson.version || '0.0.0'),
    };
  },
  methods: {
    randomType(index: any): string {
      return ['danger', 'warning', 'info'][index % 3] || 'info';
    },
    setChartA() {
      MyChartA = echarts.init(
        (document as any).querySelector('#ec-1'),
        this.layoutStore.dark ? 'dark' : 'light',
        {
          renderer: 'svg',
        }
      );
      // 绘制图表
      MyChartA.setOption({
        backgroundColor: 'transparent',
        title: {
          text: '今日销量',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [105, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    setChartB() {
      MyChartB = echarts.init(
        (document as any).querySelector('#ec-2'),
        this.layoutStore.dark ? 'dark' : 'light',
        {
          renderer: 'svg',
        }
      );
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
            ],
          },
        ],
      };
      MyChartB.setOption(option);
    },
  },
  async mounted() {
    MyChartA = null;
    MyChartB = null;
    this.setChartA();
    this.setChartB();
  },
  unmounted() {
    MyChartA.dispose();
    MyChartB.dispose();
  },
});
</script>

<style lang="scss" scoped>
.space {
  padding: 10px 0;
}
.list li {
  line-height: 2;
}
.ec-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.ec-demo {
  width: 500px;
  height: 400px;
  margin: 15px;
}
.title {
  padding: 10px 0;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid rgba(210, 200, 200, 0.5);
}
.dependencies {
  padding: 20px 0;
}
</style>
