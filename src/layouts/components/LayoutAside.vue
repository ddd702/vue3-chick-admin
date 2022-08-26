<template>
  <div class="app-aside" :class="{ fold: !layoutStore.leftMenuOpen }">
    <div class="app-logo"></div>
    <el-menu
      default-active="2"
      class="app-aside-menu"
      :router="true"
      :collapse="!layoutStore.leftMenuOpen"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="2">
        <el-icon> <Document /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useLayoutStore } from '@/stores/layout';
export default {
  setup() {
    const layoutStore = useLayoutStore();
    return {
      layoutStore,
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string[]) {
      console.log('open', key, keyPath);
    },
    handleClose(key: string, keyPath: string[]) {
      console.log('close', key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.app {
  &-logo {
    background-image: var(--logo-bg, transparent);
    background-repeat: no-repeat;
    background-position: center;
    width: var(--logo-width);
    height: var(--logo-height);
    background-size: contain;
  }
  &-aside {
    --el-menu-bg-color: transparent;
    --el-menu-border-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 10px 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    // border-right: 1px solid var(--aside-r-border-color,#ddd);
    z-index: 2;
    width: var(--header-left-width);
    @include flexCenter();
    background-color: var(--aside-bg-color, #fff);
    flex-direction: column;
    transition: width 0.5s;
    &.fold {
      width: var(--header-left-width-fold);
      .app-logo {
        background-image: var(--logo-bg-fold, transparent);
        width: var(--logo-width-fold);
        height: var(--logo-height-fold);
      }
    }
  }
}
@media (max-width: 500px) {
  .app {
    &-aside {
      &.fold {
        width: 0;
        overflow-x: hidden;
      }
    }
  }
}
</style>
