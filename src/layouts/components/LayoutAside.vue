<template>
  <div class="ck-aside" :class="{ fold: !layoutStore.leftMenuOpen }">
    <div class="ck-logo"></div>
    <div class="ck-aside-inner">
      <el-menu
        class="ck-aside-menu"
        :collapse="!layoutStore.leftMenuOpen"
        :router="true"
        :default-active="layoutStore.asideMenuActive"
      >
        <AsideMenuItem :menus="layoutStore.asideMenu" />
      </el-menu>
      <el-empty
        :image-size="layoutStore.leftMenuOpen ? 100 : 50"
        v-if="layoutStore.asideMenu.length === 0"
        description="无菜单"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from '@/stores/layout';
import { getDataByCode } from '@/apis/sys';
import AsideMenuItem from './AsideMenuItem.vue';
export default defineComponent({
  components: { AsideMenuItem },
  setup(): any {
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
  },
});
</script>

<style lang="scss">
.el-menu--collapse {
  width: 100% !important;
}
.ck {
  &-logo {
    background-image: var(--ck-logo-bg, transparent);
    background-repeat: no-repeat;
    background-position: center;
    width: var(--ck-logo-width);
    height: var(--ck-logo-height);
    background-size: contain;
    margin: 0 auto;
  }
  &-aside {
    --el-menu-bg-color: transparent;
    --el-menu-border-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 10px 0;
    overflow-y: auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 2;
    width: var(--ck-header-left-width);
    background-color: var(--ck-aside-bg-color, #fff);
    flex-direction: column;
    transition: width 0.5s;
    &-menu {
      width: 100%;
    }
    &.fold {
      width: var(--ck-header-left-width-fold);
      .ck-logo {
        background-image: var(--ck-logo-bg-fold, transparent);
        width: var(--ck-logo-width-fold);
        height: var(--ck-logo-height-fold);
      }
    }
  }
  &-aside-inner {
    height: calc(100% - var(--ck-logo-height));
    overflow-y: auto;
  }
}
@media (max-width: 500px) {
  .ck {
    &-aside {
      &.fold {
        width: 0;
        overflow-x: hidden;
      }
    }
    &-aside-inner {
      height: calc(100% - var(--ck-logo-height-fold));
    }
  }
}
</style>
