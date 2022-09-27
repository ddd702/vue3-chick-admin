//该文件保存diy的vue指令
import Clipboard from 'clipboard';
import { ElMessage } from 'element-plus';
export default function (app: any): void {
  app.directive('copy', {
    /* ... */
    mounted(el: any, binding: any): void {
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
          text: () => binding.value,
        });
      });
    },
  });
}
