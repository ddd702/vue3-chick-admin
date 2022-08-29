/**
 * 页面交互
 * */
import { defineStore } from 'pinia';
import { Storage } from '@/constants';
import Utils from '@/utils';
type StateType = {
  leftMenuOpen: boolean;
  fullScreen: boolean;
  dark: boolean;
  asideMenu: any;
};

export const useLayoutStore = defineStore({
  id: 'layout',
  state(): StateType {
    let dark: boolean = Utils.isDarkMode();
    if (localStorage.getItem(Storage.dark)) {
      // 如果有数值
      dark = localStorage.getItem(Storage.dark) === '1';
    }
    let leftMenuOpen = !Utils.isMobile();
    if (localStorage.getItem(Storage.leftMenuOpen)) {
      // 如果有数值
      leftMenuOpen = localStorage.getItem(Storage.leftMenuOpen) === '1';
    }
    return {
      fullScreen: false,
      leftMenuOpen,
      dark,
      asideMenu: [],
    };
  },
  actions: {
    setAsideMenu(val: []): void {
      this.asideMenu = val;
    },
    switchFullScreen(val: boolean): void {
      this.fullScreen = val;
    },
    switchLeftMenu(): void {
      this.leftMenuOpen = !this.leftMenuOpen;
      localStorage.setItem(Storage.leftMenuOpen, this.leftMenuOpen ? '1' : '0');
    },
    switchDark(): void {
      this.dark = !this.dark;
      localStorage.setItem(Storage.dark, this.dark ? '1' : '0');
    },
  },
});
