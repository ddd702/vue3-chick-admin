<template>
  <ck-page class="posts-page">
    {{ msg }}
  </ck-page>
</template>

<script lang="ts">
export default {
  meta: {
    path: '/posts',
    title: '文章列表',
    enTitle: 'Posts',
    auth: true,
    cache: true,
  },
  name: 'posts',
  setup() {
    return { msg: 'ddd' };
  },
};
</script>

<style></style>
