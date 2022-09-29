<template>
  <div class="ck-nav-history">
    <el-scrollbar view-class="t-flex">
      <!-- <div class="scrollbar-flex-content"> -->
      <el-tag
        v-for="(tag, index) in routeStore.cache"
        :key="tag.time"
        @close="deleteTag(index)"
        size="large"
        class="ck-nav-history-item"
        :closable="tag.route.path !== '/'"
        :disable-transitions="true"
        effect="dark"
        :type="
          routeStore.currentRoute?.fullPath === tag.route.fullPath
            ? 'primary'
            : 'info'
        "
      >
        <RouterLink :to="{ path: tag.route.fullPath }">{{
          getTitle(tag)
        }}</RouterLink>
      </el-tag>
      <!-- </div> -->
    </el-scrollbar>
    <div class="ck-nav-menu">
      <el-dropdown trigger="click">
        <ck-icon size="20" class="icon-more-a t-pointer" />
        <template #dropdown>
          <el-dropdown-item @click="handleMenu('home')">
            <ck-icon size="14" class="icon-home" /><span
              class="ck-nav-menu-text"
              >{{ $t('header.toHome') }}</span
            >
          </el-dropdown-item>
          <el-dropdown-item @click="handleMenu('close')">
            <ck-icon size="14" class="icon-close" /><span
              class="ck-nav-menu-text"
              >{{ $t('header.closeOther') }}</span
            >
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { routeStoreInject, layoutStoreInject, LangEnum } from '@/contants';
export default defineComponent({
  setup() {
    const routeStore: any = inject(routeStoreInject);
    const layoutStore: any = inject(layoutStoreInject);
    return {
      routeStore,
      layoutStore,
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    getTitle(tag: any) {
      if (this.layoutStore.lang === LangEnum.en) {
        return tag.route.meta.enTitle || tag.route.meta.title || 'unkown';
      }
      return tag.route.meta.title;
    },
    deleteTag(index: number) {
      if (this.routeStore.cache[index].route.path === '/') {
        //首页不能删除
        return;
      }
      const cacheCount = this.routeStore.cacheCount;
      if (
        this.routeStore.cache[index].route.path ===
        this.routeStore.currentRoute?.path
      ) {
        if (this.routeStore.cache.length >= 1) {
          const nextIndex = index == 0 ? index + 1 : index - 1;
          if (nextIndex >= cacheCount) {
            this.$router.replace({ path: '/' });
          } else {
            const path = this.routeStore.cache[nextIndex].route.path;
            this.$router.replace({ path });
          }
        }
      }
      this.routeStore.delCache(index);
    },
    handleMenu(type = 'home') {
      switch (type) {
        case 'home':
          this.$router.push({ path: '/' });
          break;
        case 'close':
          this.routeStore.closeOtherCache();
          break;
      }
    },
  },
});
</script>

<style lang="scss">
.ck-nav-history {
  color: #fff;
  @include flexCenter();
  justify-content: space-between;
  padding-bottom: 8px;
  padding-left: 10px;
  &-item {
    margin: 0 2px;
  }
  a {
    color: #fff;
  }
}
.ck-nav-menu {
  @include flexCenter();
  &-text {
    padding-left: 5px;
  }
}
</style>
