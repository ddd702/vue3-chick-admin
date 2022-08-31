<template>
  <div class="app-nav-history">
    <el-scrollbar view-class="t-flex">
      <!-- <div class="scrollbar-flex-content"> -->
      <el-tag
        v-for="(tag, index) in routeStore.cache"
        :key="tag.time"
        @close="deleteTag(index)"
        :round="true"
        size="default"
        class="app-nav-history-item"
        closable
        :disable-transitions="true"
        effect="dark"
        :type="
          routeStore.currentRoute?.fullPath === tag.route.fullPath ? '' : 'info'
        "
      >
        <RouterLink :to="{ path: tag.route.fullPath }">{{
          tag.route.meta.title || '未知页面'
        }}</RouterLink>
      </el-tag>
      <!-- </div> -->
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouteStore } from '@/stores/route';
export default defineComponent({
  setup() {
    const routeStore = useRouteStore();
    return {
      routeStore,
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    deleteTag(index: number) {
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
  },
});
</script>

<style lang="scss">
.app-nav-history {
  color: #fff;
  padding-bottom: 5px;
  &-item {
    margin: 0 5px;
  }
  a {
    color: #fff;
  }
}
</style>
