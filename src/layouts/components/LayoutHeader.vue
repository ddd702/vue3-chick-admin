<template>
  <header class="app-header">
    <span class="t-pointer menu-toggle" @click="toggleMenu">
      <app-icon
        class="icon-fold"
        :size="iconSize"
        v-if="layoutStore.leftMenuOpen"
      />
      <app-icon class="icon-expand" :size="iconSize" v-else />
    </span>
    <section class="app-top-menu">
      <div class="top-icon-item">
        <el-tooltip content="查看调试日志" placement="bottom-end">
          <el-badge
            :hidden="logStore.count <= 0"
            :value="logStore.count"
            style="display: flex; padding: 0"
          >
            <app-icon
              class="t-pointer icon-debug"
              :size="iconSize"
              @click="openLogDialog"
            />
          </el-badge>
        </el-tooltip>
      </div>
      <div class="top-icon-item">
        <el-tooltip
          :content="layoutStore.fullScreen ? '退出全屏' : '全屏'"
          placement="bottom-end"
        >
          <app-icon
            class="t-pointer"
            :class="{
              'icon-zoomout': layoutStore.fullScreen,
              'icon-zoomin': !layoutStore.fullScreen,
            }"
            :size="iconSize"
            @click="toggleFullScreen"
          />
        </el-tooltip>
      </div>
      <div class="top-icon-item">
        <el-tooltip
          :content="layoutStore.dark ? '切换到浅色模式' : '切换到暗黑模式'"
          placement="bottom-end"
        >
          <app-icon
            class="t-pointer"
            :class="{
              'icon-sun': layoutStore.dark,
              'icon-moon': !layoutStore.dark,
            }"
            :size="iconSize"
            @click="toggleDrak"
          />
        </el-tooltip>
      </div>
      <el-dropdown trigger="click" class="top-icon-item">
        <div class="user-cell t-pointer">
          <el-image class="app-avatar" fit="contain" :src="userStore.avatar" />
          <span>{{ userStore.userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="userStore.isLogin">
              <el-dropdown-item>
                <RouterLink class="t-block" :to="{ path: '/changePsw' }">
                  修改密码
                </RouterLink>
              </el-dropdown-item>
              <el-dropdown-item @click="handleLoginOut">
                退出登录
              </el-dropdown-item>
            </template>
            <template v-else>
              <el-dropdown-item>
                <RouterLink class="t-block" :to="{ path: '/login' }">
                  登录/注册
                </RouterLink>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
          <el-dropdown-item>
            <RouterLink class="t-block" :to="{ path: '/about' }">
              关于
            </RouterLink>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </section>
    <LogDialog />
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import LogDialog from './LogDialog.vue';
import { useLayoutStore } from '@/stores/layout';
import { useUserStore } from '@/stores/user';
import { useLogStore } from '@/stores/log';
import { useRouteStore } from '@/stores/route';
import Utils from '@/utils';

export default defineComponent({
  setup() {
    const layoutStore = useLayoutStore();
    const userStore = useUserStore();
    const logStore = useLogStore();
    const routeStore = useRouteStore();
    return {
      iconSize: ref(20),
      layoutStore,
      userStore,
      logStore,
      routeStore,
    };
  },
  components: {
    RouterLink,
    LogDialog,
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      const isFullScreen = !!document.fullscreenElement || false;
      this.layoutStore.switchFullScreen(isFullScreen);
    });
  },
  methods: {
    handleLoginOut() {
      console.warn('handleLoginOut');
    },
    toggleMenu() {
      this.layoutStore.switchLeftMenu();
    },
    toggleDrak() {
      this.layoutStore.switchDark();
    },
    openLogDialog() {
      this.logStore.switchVisible();
    },
    toggleFullScreen() {
      Utils.setFullScreen();
    },
  },
});
</script>

<style lang="scss">
.app {
  &-header {
    position: sticky;
    top: 0;
    z-index: 1;
    padding-right: 2vw;
    background-color: var(--header-bg-color, #fff);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 5px 0px;
    @include flexCenter();
    height: var(--header-height, 70px);
    .menu-toggle {
      margin-left: 2vw;
    }
  }
  &-top-menu {
    justify-content: flex-end;
    flex: 1;
    @include flexCenter();
    .user-cell {
      @include flexCenter();
      > span {
        margin: 0 0 0 5px;
      }
    }
    .icon-unactive {
      transform: scale(0.7);
      opacity: 0.6;
    }
    .top-icon-item {
      margin-left: 15px;
      justify-content: center;
      text-align: center;
      @include flexCenter();
    }
  }
  &-avatar {
    width: var(--avatar-width, 40px);
    border-radius: 50%;
  }
}
.dark {
  .app-header {
    --el-text-color-regular: #ddd;
  }
}
</style>
