<template>
  <ck-page footer header>
    {{ msg }}
    <template #footer> footer </template>
  </ck-page>
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
