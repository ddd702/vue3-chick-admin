export const enum StorageEnum { //本地存储的变量名字
  global = 'ck-sys',
  dark = 'ck-dark',
  routeCache = 'ck-route-cache',
  leftMenuOpen = 'ck-left-menu-open',
  theme = 'ck-theme',
}
export const enum CookieEnum {
  userInfo = 'ck-user',
  token = 'ck-token',
}
export const enum AppEnum { //系统
  title = 'Chick Admin',
}
export const layoutStoreInject = Symbol();
export const userStoreInject = Symbol();
export const routeStoreInject = Symbol();
