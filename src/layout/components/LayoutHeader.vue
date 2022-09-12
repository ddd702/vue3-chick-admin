<template>
  <header class="ck-header" :class="{ fold: !layoutStore.leftMenuOpen }">
    <div class="ck-header-t">
      <span class="t-pointer menu-toggle" @click="toggleMenu">
        <ck-icon
          class="icon-fold"
          :size="iconSize"
          v-if="layoutStore.leftMenuOpen"
        />
        <ck-icon class="icon-expand" :size="iconSize" v-else />
      </span>
      <el-breadcrumb v-if="!layoutStore.isMiniScreen" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{
          $t('header.home')
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in layoutStore.pathLog" :key="item">{{
          getPathTitle(item)
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <section class="ck-top-menu">
        <div class="top-icon-item">
          <el-tooltip :content="$t('header.delCache')" placement="bottom-end">
            <span>
              <el-popconfirm
                :title="$t('header.delCacheConfirm')"
                @confirm="clearStorage"
              >
                <template #reference>
                  <ck-icon class="t-pointer icon-clear" :size="iconSize" />
                </template>
              </el-popconfirm>
            </span>
          </el-tooltip>
        </div>
        <el-dropdown
          :hide-on-click="false"
          trigger="click"
          class="top-icon-item"
        >
          <ck-icon class="t-pointer icon-language" :size="iconSize" />
          <template #dropdown>
            <el-dropdown-item
              v-for="lang in layoutStore.langList"
              :key="lang.value"
              @click="setLang(lang.value)"
            >
              <el-button link>
                <ck-icon
                  style="margin-right: 5px"
                  class="icon-correct"
                  :class="{ 't-transparent': lang.value !== layoutStore.lang }"
                  :size="iconSize / 2"
                />
                {{ lang.name }}</el-button
              >
            </el-dropdown-item>
          </template>
        </el-dropdown>
        <div class="top-icon-item">
          <el-tooltip content="查看调试日志" placement="bottom-end">
            <el-badge
              :hidden="logStore.count <= 0"
              :value="logStore.count"
              style="display: flex; padding: 0"
            >
              <ck-icon
                class="t-pointer icon-debug"
                :size="iconSize"
                @click="openLogDialog"
              />
            </el-badge>
          </el-tooltip>
        </div>
        <div class="top-icon-item">
          <el-tooltip :content="$t('header.theme')" placement="bottom-end">
            <ck-icon
              class="t-pointer icon-skin"
              :size="iconSize"
              @click="openTheme"
            />
          </el-tooltip>
        </div>
        <div class="top-icon-item">
          <el-tooltip
            :content="layoutStore.dark ? '切换到浅色模式' : '切换到暗黑模式'"
            placement="bottom-end"
          >
            <ck-icon
              class="t-pointer"
              :class="{
                'icon-moon': layoutStore.dark,
                'icon-sun': !layoutStore.dark,
              }"
              :size="iconSize"
              @click="toggleDrak"
            />
          </el-tooltip>
        </div>
        <div class="top-icon-item">
          <el-tooltip
            :content="layoutStore.fullScreen ? '退出全屏' : '全屏'"
            placement="bottom-end"
          >
            <ck-icon
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
        <el-dropdown trigger="click" class="top-icon-item">
          <div class="user-cell t-pointer">
            <el-image class="ck-avatar" fit="contain" :src="userStore.avatar" />
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
    </div>
    <LayoutHistory v-if="routeStore.cache.length" />
    <LogDialog />
    <ThemeDialog />
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { RouterLink } from 'vue-router';
import {
  layoutStoreInject,
  userStoreInject,
  routeStoreInject,
  LangEnum,
} from '@/contants';
import LogDialog from './LogDialog.vue';
import LayoutHistory from './LayoutHistory.vue';
import ThemeDialog from './ThemeDialog.vue';
import { useLogStore } from '@/stores/log';
import Utils from '@/utils';

export default defineComponent({
  setup() {
    const layoutStore: any = inject(layoutStoreInject);
    const userStore: any = inject(userStoreInject);
    const logStore = useLogStore();
    const routeStore: any = inject(routeStoreInject);
    return {
      iconSize: ref(18),
      layoutStore,
      userStore,
      logStore,
      routeStore,
    };
  },
  components: {
    RouterLink,
    LayoutHistory,
    LogDialog,
    ThemeDialog,
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      const isFullScreen = !!document.fullscreenElement || false;
      this.layoutStore.switchFullScreen(isFullScreen);
    });
  },
  methods: {
    getPathTitle(item: any) {
      if (this.layoutStore.lang === LangEnum.en) {
        return item.enTitle || item.title;
      }
      return item.title;
    },
    setLang(value: LangEnum) {
      this.layoutStore.setLang(value);
    },
    openTheme() {
      //打开主题弹框
      this.layoutStore.openThemeDialog();
    },
    clearStorage() {
      Utils.storage.clearStorage();
      location.reload();
    },
    handleLoginOut() {
      this.$confirm('确认退出登录?', '确认', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.userStore.loginOut(() => location.reload());
      });
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
.ck {
  &-header {
    position: sticky;
    top: 0;
    z-index: 2;
    padding-right: 15px;
    background-color: var(--ck-header-bg-color, #fff);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 5px 0px;
    .menu-toggle {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  &-header-t {
    @include flexCenter();
    height: var(--ck-header-height, 70px);
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
    width: var(--ck-avatar-width, 40px);
    border-radius: 50%;
  }
}
.dark {
  .ck-header {
    --el-text-color-regular: #ddd;
  }
}
</style>
