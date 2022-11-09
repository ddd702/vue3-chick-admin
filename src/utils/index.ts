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
  clone: function (obj: any) {
    //返回一个克隆的对象
    const newObj: any = {};
    for (const prop in obj) {
      newObj[prop] = obj[prop];
    }
    return newObj;
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
  goPage(path: string): void {
    // console.warn('goPage');
    window.CkRouter.push({ path });
  },
  goHome() {
    window.CkRouter.push({ path: '/' });
  },
  goLogin() {
    window.CkRouter.push({ path: '/login' });
  },
  dateFormat(
    timestamp: any = new Date().getTime(),
    format = 'yyyy-MM-dd hh:mm:ss'
  ): string {
    if (timestamp == 0) {
      return '/';
    }
    if (String(timestamp).length < 12) {
      timestamp = timestamp * 1000;
    }
    const date = new Date(parseInt(timestamp, 10)),
      o: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };

    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return format;
  },
  /**
   * 封装七牛云图片的操作(默认会压缩质量到80以及使用webp格式)
   *
   * 更多params参数请参考七牛云官方文档
   * https://developer.qiniu.com/dora/api/1270/the-advanced-treatment-of-images-imagemogr2#imagemogr2-thumbnail-spec
   */
  getQnImg(url = '', params: Array<string> = [''], keepParams = true): string {
    //七牛云
    if (!url) return '';
    let result = ['?imageMogr2', 'interlace', '1'];
    // 处理原始阿里云参数
    if (keepParams) {
      const origin = (url.match(/imageView2([\/\w,]+)/) || [])[1];
      if (origin) {
        result = result.concat(origin.substr(1).split('/'));
      }
    }
    // 处理调用者的参数
    result = result.concat(params);
    // 处理缺省的参数
    const temp = result.join('/');
    // 是否gif图片
    const isGif = /\.gif/.test(url);
    if (!/quality\//i.test(temp) && !isGif) {
      //没有设置质量, 那么默认给80, 但gif图片不设置, 不然就不动了
      result.push('quality');
      result.push('80');
    }
    // if(!/format/i.test(temp) && !isGif && isSupportWebp){
    //     //如果没有设置格式,同时支持webp格式, 那么用webp
    //     result.push('format')
    //     result.push('webp')
    // }
    return (
      url.replace(/\?.*/, '') + (result.length > 1 ? result.join('/') : '')
    );
  },
  getFilePrefix(filename = ''): string | undefined {
    return filename.split('.').pop();
  },
  getJScript(url: string, cb: any): void {
    console.warn('getJScript');
    // return
    cb = typeof cb === 'function' ? cb : void 0;
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script') as any;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        cb();
        script.onload = script.onreadystatechange = null;
      }
    };
    script.src = url;
    head.appendChild(script);
  },
  onRange(num: number, min: number, max: number): boolean {
    if (num < min || num > max) {
      return false;
    }
    return true;
  },
  byteConvert(bytes: number, j = 0): string {
    if (bytes < 1000 && !j) return bytes + 'B';
    const k = 1024; // 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    if (j) {
      i = j;
      return parseFloat((bytes / Math.pow(k, i)).toPrecision()).toFixed(2);
    } else {
      i = Math.floor(Math.log(bytes) / Math.log(k));
    }
    return (
      parseFloat((bytes / Math.pow(k, i)).toPrecision()).toFixed(2) +
      ' ' +
      sizes[i]
    );
  },
  toPath(path: string): void {
    window.CkRouter.push(path);
  },
};
