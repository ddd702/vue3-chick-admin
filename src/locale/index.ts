import { createI18n } from 'vue-i18n';
import zhCn from './lang/zh-cn';
import en from './lang/en';
const messages = {
  'zh-cn': zhCn,
  en,
};
const i18n = createI18n({
  locale: 'zh-cn',
  fallbackLocale: 'en', // set fallback locale
  messages,
});

export default i18n;
