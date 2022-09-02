<template>
  <LayoutAside />
  <div class="ck-wrapper" key="" :class="{ fold: !layoutStore.leftMenuOpen }">
    <!-- <div class="ck-right" > -->
    <LayoutHeader />
    <div class="ck-container">
      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <KeepAlive :include="routeStore.keepAlive">
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent, computed } from 'vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutAside from './components/LayoutAside.vue';
import {
  layoutStoreInject,
  routeStoreInject,
  userStoreInject,
} from '@/contants';
import { useLayoutStore } from '@/stores/layout';
import { useRouteStore } from '@/stores/route';
import { useUserStore } from '@/stores/user';
export default defineComponent({
  components: {
    RouterView,
    LayoutHeader,
    LayoutAside,
  },
  setup() {
    const layoutStore = useLayoutStore();
    const routeStore = useRouteStore();
    const userStore = useUserStore();
    return {
      layoutStore,
      routeStore,
      userStore,
    };
  },
  provide() {
    return {
      [layoutStoreInject]: computed(() => this.layoutStore),
      [userStoreInject]: computed(() => this.userStore),
      [routeStoreInject]: computed(() => this.routeStore),
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
    width: 100%;
    min-height: 100%;
    transition: padding 0.5s;
    background-image: var(--ck-wrapper-bg-image, none);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    padding-left: var(--ck-header-left-width);
    &.fold {
      padding-left: var(--ck-header-left-width-fold);
    }
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--ck-page-bg-color);
      display: block;
      z-index: 0;
      content: '';
    }
  }
  &-container {
    min-height: calc(100% - 90px);
    position: relative;
    padding: 1vw;
    z-index: 1;
  }
}
@media (max-width: 500px) {
  .ck {
    &-wrapper {
      &.fold {
        padding-left: 0;
      }
    }
  }
}
</style>
