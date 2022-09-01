import cookies from 'js-cookie';
import Storage from './storage';
import { AppEnum } from '@/contants';
export default {
  isDev: !!(import.meta.env.MODE === 'development'),
  cookies,
  sleep(num: number): Promise<unknown> {
    return new Promise((resolve: any) => {
      setTimeout(() => resolve(), num * 1000);
    });
  },
  storage: new Storage(),
  randStr(num = 8): string {
    function randomString(length: number, chars: string) {
      let result = '';
      for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    return randomString(
      num,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
  },
  setFullScreen(): boolean {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return false;
    } else {
      document.documentElement.requestFullscreen();
      return true;
    }
  },
  isDarkMode(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  },
  isMobile(): boolean {
    const w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return w <= 500;
  },
  setTitle(title: any = AppEnum.title): void {
    document.title = title;
  },
  notMac:
    navigator.userAgent.indexOf('Windows') > -1 ||
    navigator.userAgent.indexOf('Linux') > -1, // s是否是win系统
  goPage(val: string): void {
    console.warn('goPage');
  },
  goHome() {
    (window as any).CkRouter.push({ path: '/' });
  },
};
