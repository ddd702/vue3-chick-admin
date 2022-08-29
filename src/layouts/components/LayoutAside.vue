<template>
  <div class="app-aside" :class="{ fold: !layoutStore.leftMenuOpen }">
    <div class="app-logo"></div>
    <el-menu
      default-active="2"
      class="app-aside-menu"
      :collapse="!layoutStore.leftMenuOpen"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <template v-for="(item, index) in layoutStore.asideMenu" :key="index">
        <el-sub-menu v-if="item.children" :index="'' + index">
          <!-- <app-icon class="icon-doc" /> -->
          <template #title>
            <app-icon class="icon-doc" />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :route="item2.path || ''"
              v-for="(item2, index2) in item.children"
              :index="index + '_' + index2"
              :key="index2"
            >
              <app-icon v-if="item2.icon" class="icon-doc" />
              <span>{{ item2.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :route="item.path || ''" :index="'' + index">
          <app-icon class="icon-doc" />
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { getDataByCode } from '@/apis/sys';
export default {
  setup() {
    const layoutStore = useLayoutStore();
    return {
      layoutStore,
    };
  },
  mounted(): void {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await getDataByCode({ code: 'clay-menu' });
      this.layoutStore.setAsideMenu(JSON.parse(res.data));
    },
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
    &-menu {
      width: 100%;
    }
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
