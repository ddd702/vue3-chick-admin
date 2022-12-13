//该文件保存diy的vue指令
import Clipboard from 'clipboard';
import hl from 'highlight.js'; // 导入代码高亮文件
import 'highlight.js/styles/vs2015.css'; // 导入代码高亮样式
import { ElMessage } from 'element-plus';

export default function (app: any): void {
  app.directive('copy', {
    /* ... */
    updated(el: HTMLElement, binding: any): void {
      el.setAttribute('data-clipboard-text', binding.value);
    },
    mounted(el: HTMLElement, binding: any): void {
      el.setAttribute('data-clipboard-text', binding.value);
      let clipboard: any;
      el.addEventListener('click', () => {
        const successTip = el.getAttribute('copy-success-tip') || '复制成功';
        const failTip = el.getAttribute('copy-fail-tip') || '复制失败';
        clipboard.on('success', () => {
          ElMessage({
            message: successTip,
            type: 'success',
          });
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          ElMessage({
            message: failTip,
            type: 'error',
          });
          clipboard.destroy();
        });
      });
      //解决clipboard第一次点击不生效问题，那就在enter时实例化Clipboard
      el.addEventListener('mouseenter', () => {
        clipboard = new Clipboard(el, {
          text: () => el.getAttribute('data-clipboard-text'),
        });
      });
    },
  });
  app.directive('hl', {
    mounted(el: HTMLElement): void {
      // const blocks = el;
      const lang = el.getAttribute('lang') || 'html';
      hl.configure({
        languages: [lang],
      });
      hl.highlightElement(el);
    },
  });
}
