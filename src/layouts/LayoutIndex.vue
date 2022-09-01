<template>
  <div class="ck-wrapper t-flex">
    <LayoutAside />
    <div class="ck-right" :class="{ fold: !layoutStore.leftMenuOpen }">
      <LayoutHeader />
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="routeStore.keepAlive">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>
<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import { useLayoutStore } from '@/stores/layout';
import { useRouteStore } from '@/stores/route';
export default defineComponent({
  components: {
    RouterView,
    LayoutHeader,
    LayoutAside,
  },
  setup() {
    const layoutStore = useLayoutStore();
    const routeStore = useRouteStore();
    return {
      layoutStore,
      routeStore,
    };
  },
});
</script>

<style lang="scss">
/* vue transition 动画*/
.fade-enter-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.ck {
  &-wrapper {
    min-height: 100%;
  }
  &-right {
    width: 100%;
    transition: padding 0.5s;
    padding-left: var(--ck-header-left-width);
    &.fold {
      padding-left: var(--ck-header-left-width-fold);
    }
  }
}
@media (max-width: 500px) {
  .ck {
    &-right {
      &.fold {
        padding-left: 0;
      }
    }
  }
}
</style>
