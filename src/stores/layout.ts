/**
 * 页面交互
 * */
import { defineStore } from 'pinia';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { StorageEnum, LangEnum } from '@/contants';
import { useRouteStore } from './route';
import i18n from '@/locale';
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
export type ThemeType = {
  name: string;
  title?: string;
  preview: string;
  darkPreview?: string;
};
export type LangType = {
  name: string;
  value: string;
};
type StateType = {
  langList: Array<LangType>;
  leftMenuOpen: boolean;
  fullScreen: boolean;
  dark: boolean;
  lang: string;
  asideMenuActive: string; // 活跃的菜单index
  asideMenu: Array<MenuItem>;
  pathLog: []; //路劲轨迹
  isMiniScreen: boolean;
  themeDialogShow: boolean;
  themes: Array<ThemeType>;
  themeActiveName: string;
};
const Themes: Array<ThemeType> = [
  //主题，name如果为空，就是默认主题，必须与styles/theme下的文件命名一样
  {
    name: '',
    preview: '',
  },
  {
    name: 'acg',
    title: '动漫',
    preview: 'https://cdn.zcxnb.cn/upload/hAqFDpfE69.jpg',
    darkPreview: 'https://cdn.zcxnb.cn/upload/hAqFDpfE69.jpg',
  },
  {
    name: 'yuanshen',
    title: '原神',
    preview:
      'https://cdn.zcxnb.cn/cloud/2022/07/04/LySZm5gH_thread_15588254_20220703101601_s_7023034_o_w_3400_h_2744_40845.jpg',
  },
];
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
    const defaultLang = Utils.storage.get(StorageEnum.lang) || 'zh-cn';
    i18n.global.locale = defaultLang;
    const isMiniScreen =
      (document as any).querySelector('html')?.offsetWidth <= 500;
    if (isMiniScreen) {
      (document as any).querySelector('html').classList.add('is-phone');
    }
    return {
      langList: [
        {
          name: '中文',
          value: LangEnum.zhCn,
        },
        {
          name: 'English',
          value: LangEnum.en,
        },
      ],
      lang: defaultLang,
      fullScreen: false,
      leftMenuOpen,
      asideMenuActive: '0',
      dark,
      isMiniScreen,
      asideMenu: [],
      pathLog: [],
      themes: Themes,
      themeDialogShow: false,
      themeActiveName: Utils.storage.get(StorageEnum.theme) || '',
    };
  },
  getters: {
    themeActiveIndex(state: StateType): number {
      return state.themes.findIndex(
        (theme) => theme.name === state.themeActiveName
      );
    },
    themeNames(state: StateType) {
      const tempArr: Array<string> = [];
      state.themes.map((theme) => {
        tempArr.push(theme.name);
      });
      return tempArr;
    },
    eleLang(state: StateType): any {
      if (state.lang === 'en') {
        return en;
      }
      return zhCn;
    },
  },
  actions: {
    setLang(value: LangEnum) {
      this.lang = value;
      Utils.storage.set(StorageEnum.lang, value);
      i18n.global.locale = value;
    },
    setTheme(name: string | undefined): void {
      if (name === undefined) {
        name = this.themeActiveName;
      }
      this.themeActiveName = name;
      Utils.storage.set(StorageEnum.theme, name);
      this.themeNames.map((className) => {
        if (name === className) {
          document
            .querySelector('html')
            ?.classList.add(`ck-theme-${className}`);
        } else {
          document
            .querySelector('html')
            ?.classList.remove(`ck-theme-${className}`);
        }
      });
    },
    openThemeDialog() {
      this.themeDialogShow = true;
    },
    closeThemeDialog() {
      this.themeDialogShow = false;
    },
    updateAsideMenuActive(): void {
      const route = useRouteStore().currentRoute;
      if (!route) {
        return;
      }
      // 根据路径更新active的index
      const { fullPath } = route;
      let outIndex = '';
      let tempArr: any = [];
      const findIndex = (item: any) => {
        tempArr.push(item);
        if (item.path === fullPath) {
          this.pathLog = tempArr;
          outIndex = item.hash;
          return;
        }
        item?.children?.forEach(findIndex);
      };
      this.asideMenu?.forEach((item) => {
        tempArr = [];
        findIndex(item);
      });
      this.asideMenuActive = outIndex;
      if (!outIndex) {
        this.pathLog = [];
      }
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
      this.updateDark();
    },
    updateDark(): void {
      if (this.dark) {
        document.querySelector('html')?.classList.add('dark');
      } else {
        document.querySelector('html')?.classList.remove('dark');
      }
    },
    initUi(): void {
      //更新ui显示
      this.updateDark();
      this.setTheme(undefined);
    },
  },
});
