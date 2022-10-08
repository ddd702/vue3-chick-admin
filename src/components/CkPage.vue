<template>
  <div class="ck-page">
    <ck-water-mark :text="userStore.userName" v-if="waterMark" />
    <header class="ck-page-header" v-if="$slots.header || header">
      <slot name="header"></slot>
    </header>
    <main class="ck-page-main">
      <slot />
    </main>
    <footer class="ck-page-footer" v-if="$slots.footer || footer">
      <slot name="footer">
        <div class="t-footer">Copyright©2022 Chick Admin</div>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { layoutStoreInject, userStoreInject } from '@/contants';
import Utils from '@/utils';
export default defineComponent({
  setup() {
    return {
      layoutStore: inject(layoutStoreInject) as any,
      userStore: inject(userStoreInject) as any,
    };
  },
  props: {
    waterMark: {
      //是否需要水印
      type: Boolean,
      default: false,
    },
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
  mounted() {
    if (this.$route?.meta?.auth) {
      if (!this.userStore.isLogin) {
        this.$notify({
          showClose: true,
          type: 'warning',
          message: '请先登录',
        });
        return Utils.goLogin();
      }
    }
  },
});
</script>

<style lang="scss"></style>
