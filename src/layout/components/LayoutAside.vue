<template>
  <div class="ck-aside" :class="{ fold: !layoutStore.leftMenuOpen }">
    <ck-icon
      class="icon-fold phone-fold"
      size="20"
      v-if="layoutStore.leftMenuOpen"
      @click="layoutStore.switchLeftMenu"
    />
    <div class="ck-logo"></div>
    <div class="ck-aside-inner" v-loading="loading">
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
import { defineComponent, inject, ref } from 'vue';
import { layoutStoreInject } from '@/contants';
import { getDataByCode } from '@/apis/sys';
import AsideMenuItem from './AsideMenuItem.vue';
export default defineComponent({
  components: { AsideMenuItem },
  setup() {
    return {
      loading: ref(false),
      layoutStore: inject(layoutStoreInject) as any,
    };
  },
  mounted(): void {
    this.fetchData();
  },
  methods: {
    // toggleMenu() {
    //   this.layoutStore.switchLeftMenu();
    // },
    async fetchData() {
      this.loading = true;
      const res = await getDataByCode({ code: 'clay-menu' }).finally(() => {
        this.loading = false;
      });
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
    position: relative;
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
    z-index: 10;
    width: var(--ck-header-left-width);
    background-color: var(--ck-aside-bg-color, #fff);
    flex-direction: column;
    transition: width 0.5s;
    .phone-fold {
      display: none;
    }
    &-menu {
      width: 100%;
    }
    &-inner {
      width: 100%;
      overflow-x: hidden;
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
      .phone-fold {
        display: block;
        position: absolute;
        top: var(--ck-logo-height);
        transform: translateY(-100%);
        right: 10px;
      }
    }
    &-aside-inner {
      height: calc(100% - var(--ck-logo-height-fold));
    }
  }
}
</style>
