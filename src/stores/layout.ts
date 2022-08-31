/**
 * 页面交互
 * */
import { defineStore } from 'pinia';
import { StorageEnum } from '@/contants';
import { useRouteStore } from './route';
import Utils from '@/utils';
export type MenuItem = {
  hash?: string;
  id?: string | number;
  path?: string;
  title: string;
  enTitle?: string; // 英文标题
  icon?: string;
  children?: Array<MenuItem>;
};
type StateType = {
  leftMenuOpen: boolean;
  fullScreen: boolean;
  dark: boolean;
  asideMenuActive: string; // 活跃的菜单index
  asideMenu: Array<MenuItem>;
};

export const useLayoutStore = defineStore({
  id: 'layout',
  state(): StateType {
    let dark: boolean = Utils.isDarkMode();
    if (Utils.storage.get(StorageEnum.dark)) {
      // 如果有数值
      dark = Utils.storage.get(StorageEnum.dark) === '1';
    }
    let leftMenuOpen = !Utils.isMobile();
    if (Utils.storage.get(StorageEnum.leftMenuOpen)) {
      // 如果有数值
      leftMenuOpen = Utils.storage.get(StorageEnum.leftMenuOpen) === '1';
    }
    return {
      fullScreen: false,
      leftMenuOpen,
      asideMenuActive: '0',
      dark,
      asideMenu: [],
    };
  },
  actions: {
    updateAsideMenuActive(): void {
      const route = useRouteStore().currentRoute;
      if (!route) {
        return;
      }
      // 根据路径更新active的index
      const { fullPath } = route;
      let outIndex = '';
      const findIndex = (item: any, index: number) => {
        if (item.path === fullPath) {
          outIndex = item.hash;
          return;
        }
        item?.children?.map(findIndex);
      };
      this.asideMenu?.map(findIndex);
      this.asideMenuActive = outIndex;
    },
    setAsideMenu(val: Array<MenuItem>): void {
      function addIndex(item: MenuItem, index: number) {
        item.hash = Utils.randStr(5);
        item.children?.map(addIndex);
      }
      val.map(addIndex);
      this.asideMenu = val;
      this.updateAsideMenuActive();
    },
    switchFullScreen(val: boolean): void {
      this.fullScreen = val;
    },
    switchLeftMenu(): void {
      this.leftMenuOpen = !this.leftMenuOpen;
      Utils.storage.set(
        StorageEnum.leftMenuOpen,
        this.leftMenuOpen ? '1' : '0'
      );
    },
    switchDark(): void {
      this.dark = !this.dark;
      Utils.storage.set(StorageEnum.dark, this.dark ? '1' : '0');
    },
  },
});
