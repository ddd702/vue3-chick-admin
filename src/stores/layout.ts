/**
 * 页面交互
 * */
import { defineStore } from 'pinia';
import { Storage } from '@/constants';
type StateType = {
  leftMenuOpen: boolean;
  fullScreen: boolean;
  dark: boolean;
};
function isDarkMode(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
export const useLayoutStore = defineStore({
  id: 'layout',
  state(): StateType {
    let dark: boolean = isDarkMode();
    if (localStorage.getItem(Storage.dark)) {
      // 如果有数值
      dark = localStorage.getItem(Storage.dark) === '1';
    }
    return {
      fullScreen: false,
      leftMenuOpen: true,
      dark,
    };
  },
  actions: {
    switchFullScreen(val: boolean): void {
      this.fullScreen = val;
    },
    switchLeftMenu(): void {
      this.leftMenuOpen = !this.leftMenuOpen;
    },
    switchDark(): void {
      this.dark = !this.dark;
      localStorage.setItem(Storage.dark, this.dark ? '1' : '0');
    },
  },
});
