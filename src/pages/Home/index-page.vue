<template>
  <ck-page footer header>
    <h4 class="title">版本</h4>
    <div style="padding: 20px 0 0 0; font-size: 20px">V{{ version }}</div>
    <a
      style="display: inline-block; padding: 10px 0 40px 0; font-size: 20px"
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
    auth: true,
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
