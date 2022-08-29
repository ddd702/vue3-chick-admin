<template>
  <div class="app-aside" :class="{ fold: !layoutStore.leftMenuOpen }">
    <div class="app-logo"></div>
    <div class="app-aside-inner">
      <el-menu
        class="app-aside-menu"
        :collapse="!layoutStore.leftMenuOpen"
        :router="true"
      >
        <template v-for="(item, index) in layoutStore.asideMenu" :key="index">
          <el-sub-menu v-if="item.children" :index="'' + index">
            <!-- <app-icon class="icon-doc" /> -->
            <template #title>
              <el-icon>
                <app-icon class="icon-doc" :class="setIcon(item)" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :route="{ path: item2.path || '' }"
                v-for="(item2, index2) in item.children"
                :index="index + '_' + index2"
                :key="index2"
              >
                <el-icon v-if="item2.icon">
                  <app-icon class="icon-doc" :class="setIcon(item2)" />
                </el-icon>
                <template #title>{{ item2.title }}</template>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item
            v-else
            :route="{ path: item.path || '' }"
            :index="'' + index"
          >
            <el-icon>
              <app-icon class="icon-doc" :class="setIcon(item)" />
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
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

export default defineComponent({
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
    setIcon(item: any): any {
      const outClass: any = {};
      outClass['icon-' + item.icon] = true;
      return outClass;
    },
  },
});
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
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    // border-right: 1px solid var(--aside-r-border-color,#ddd);
    z-index: 2;
    width: var(--header-left-width);
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
  &-aside-inner {
    height: calc(100% - var(--logo-height));
    overflow-y: auto;
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
    &-aside-inner {
      height: calc(100% - var(--logo-height-fold));
    }
  }
}
</style>
