<template>
  <ck-page :waterMark="waterMark" class="water-mark-page">
    <ck-water-mark
      v-if="imageWaterMark"
      isImage
      :rotate="-5"
      text="https://cdn.zcxnb.cn/upload/Dttug5qVUf.png"
    />
    <div class="ck-code-cell">
      <pre lang="javascript" v-hl>{{ code }} </pre>
    </div>
    <el-switch
      v-model="waterMark"
      size="large"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      active-text="打开水印"
      inactive-text="去掉水印"
    />
    <div>
      <el-switch
        v-model="imageWaterMark"
        size="large"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="打开有图的水印"
        inactive-text="去掉有图的水印"
      />
    </div>
  </ck-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  meta: {
    path: '/watermark',
    title: '水印',
    enTitle: 'Water Mark',
    auth: false,
    cache: false,
  },
  name: 'watermark',
  setup() {
    return {
      imageWaterMark: ref(false),
      waterMark: ref(true),
      code: `
/**
<ck-page>内置了水印组件<ck-water-mark/>,可通过ck-page的waterMark属性控制
**/`,
    };
  },
});
</script>

<style></style>
