<template>
  <div class="app-wrapper t-flex">
    <LayoutAside />
    <div class="app-right" :class="{ fold: !layoutStore.leftMenuOpen }">
      <LayoutHeader />
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts">
import { RouterView } from 'vue-router';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import { useLayoutStore } from '@/stores/layout';
export default {
  components: {
    RouterView,
    LayoutHeader,
    LayoutAside,
  },
  setup() {
    const layoutStore = useLayoutStore();
    return {
      layoutStore,
    };
  },
};
</script>

<style lang="scss">
.app {
  &-wrapper {
    min-height: 100%;
  }
  &-right {
    transition: padding 0.5s;
    padding-left: var(--header-left-width);
    &.fold {
      padding-left: var(--header-left-width-fold);
    }
  }
}
@media (max-width: 500px) {
  .app {
    &-right {
      &.fold {
        padding-left: 0;
      }
    }
  }
}
</style>
