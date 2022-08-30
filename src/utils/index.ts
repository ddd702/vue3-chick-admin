import cookies from 'js-cookie';
export default {
  isDev: !!(import.meta.env.MODE === 'development'),
  cookies,
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
  goPage(val: string): void {
    console.warn('goPage');
  },
};
