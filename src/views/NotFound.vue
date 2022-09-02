<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="ck-not-found">
    <el-image
      src="https://cdn.zcxnb.cn/cloud/2022/06/02/MwqjWu8O_404.png"
    ></el-image>
    <p style="margin: 20px 0; font-size: 20px">找不到对应的页面</p>
    <div>
      <RouterLink :to="{ path: '/' }">返回首页</RouterLink>
    </div>
  </div>
</template>

<style lang="scss">
.ck-not-found {
  width: 100%;
  text-align: center;
}
</style>
