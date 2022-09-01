<template>
  <div class="home-page">
    {{ msg }}
  </div>
</template>

<script lang="ts">
export default {
  meta: {
    path: '/',
    title: '首页',
    cache: true,
  },
  name: 'home',
  setup() {
    return { msg: 'home' };
  },
};
</script>

<style></style>
