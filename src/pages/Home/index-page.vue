<template>
  <ck-page footer header>
    <div class="ec-demo"></div>
    <el-button @click="numAdd">++1</el-button>
    num:{{ num }}
    <!-- <template #footer> footer </template> -->
  </ck-page>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { userStoreInject, layoutStoreInject } from '@/contants';
import * as echarts from 'echarts';
let MyChart: any;
export default defineComponent({
  meta: {
    path: '/',
    title: '首页',
    cache: true,
  },
  name: 'home',
  setup() {
    return {
      layoutStore: inject(layoutStoreInject) as any,
      userStore: inject(userStoreInject) as any,
      num: ref(0),
    };
  },
  methods: {
    numAdd() {
      this.num++;
    },
    setChart() {
      MyChart = echarts.init(
        (document as any).querySelector('.ec-demo'),
        this.layoutStore.dark ? 'dark' : 'light'
      );
      // 绘制图表
      MyChart.setOption({
        backgroundColor: 'transparent',
        title: {
          text: 'ECharts 入门示例',
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
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
  async mounted() {
    MyChart = null;
    this.setChart();
  },
  unmounted() {
    MyChart.dispose();
  },
});
</script>

<style lang="scss">
.ec-demo {
  width: 300px;
  height: 300px;
}
</style>
