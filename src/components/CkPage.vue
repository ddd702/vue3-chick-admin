<template>
  <div class="ck-page">
    <header class="ck-page-header" v-if="$slots.header || header">
      <slot name="header"></slot>
    </header>
    <main class="ck-page-main">
      <slot />
      {{ footer }}
    </main>
    <footer class="ck-page-footer" v-if="$slots.footer || footer">
      <slot name="footer">default footer dark:{{ layoutStore.dark }}</slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { layoutStoreInject } from '@/contants';
export default defineComponent({
  setup() {
    return { layoutStore: inject(layoutStoreInject) as any };
  },
  props: {
    footer: {
      //自动填充默认底部
      type: Boolean,
      default: false,
    },
    header: {
      //自动填充默认顶部
      type: Boolean,
      default: false,
    },
  },
  name: 'ck-page',
});
</script>

<style lang="scss"></style>
