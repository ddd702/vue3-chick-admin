/// <reference types="vite/client" />
declare module 'nprogress';
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_HOST: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $message: any;
//   }
// }
