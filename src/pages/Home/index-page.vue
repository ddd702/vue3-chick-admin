<template>
  <ck-page footer header>
    {{ msg }}
    <div class="ec-demo"></div>
    <template #footer> footer </template>
  </ck-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as echarts from 'echarts';
import { useLayoutStore } from '@/stores/layout';
export default defineComponent({
  meta: {
    path: '/',
    title: '首页',
    cache: true,
  },
  name: 'home',
  setup() {
    const layoutStore = useLayoutStore();
    return { msg: 'home', layoutStore };
  },
  mounted() {
    const isDark = this.layoutStore.dark;
    const myChart = echarts.init(
      (document as any).querySelector('.ec-demo'),
      isDark ? 'dark' : 'light'
    );
    // 绘制图表
    myChart.setOption({
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
});
</script>

<style lang="scss">
.ec-demo {
  width: 300px;
  height: 300px;
}
</style>
