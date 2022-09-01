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
      <slot name="footer">default footer</slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
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

<style lang="scss">
.ck-page {
}
</style>
