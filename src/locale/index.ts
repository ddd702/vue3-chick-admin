import { createI18n } from 'vue-i18n';

const messages = {
  zhCn: {
    message: {
      hello: '你好, 世界',
    },
  },
  en: {
    message: {
      hello: 'hello world',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
    },
  },
};
const i18n = createI18n({
  // legacy: false,
  // globalInjection: true,
  locale: 'en',
  fallbackLocale: 'zhCn', // set fallback locale
  messages,
});

export default i18n;
