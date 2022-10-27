<template>
  <ck-water-mark :text="userStore.userName" v-if="waterMark" />
  <div class="ck-page">
    <header class="ck-page-header" v-if="$slots.header || header">
      <slot name="header"></slot>
    </header>
    <main class="ck-page-main">
      <slot>现在请开始编写你的页面吧</slot>
    </main>
    <footer class="ck-page-footer" v-if="$slots.footer || footer">
      <slot name="footer">
        <div class="t-footer">
          <p>Copyright©2022 Chick Admin</p>
          <p>Ver {{ version }}</p>
        </div>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';
import { layoutStoreInject, userStoreInject } from '@/contants';
import pkgJson from 'root/package.json';
import Utils from '@/utils';
export default defineComponent({
  setup() {
    return {
      version: pkgJson.version || '0.0.0',
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

<style lang="scss">
.ck-page {
  position: relative;
}
</style>
