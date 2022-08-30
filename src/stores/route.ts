/**
 * 路由缓存
 * */
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import type {
  RouteRecordNormalized,
  RouteLocationNormalized,
} from 'vue-router';
const maxLen = 20; //最多保留多少条历史路由
export type CacheType = {
  route: RouteLocationNormalized;
  time: string;
};
type StateType = {
  allRoutes: RouteRecordNormalized[] | [];
  currentRoute: RouteLocationNormalized | null;
  cache: Array<CacheType> | [];
};
export const useRouteStore = defineStore({
  id: 'route',
  state(): StateType {
    return {
      allRoutes: [],
      currentRoute: null,
      cache: [],
    };
  },
  getters: {
    cacheCount(state): number {
      return state.cache.length || 0;
    },
  },
  actions: {
    clearCache(): void {
      this.cache = [];
    },
    setAllRoutes(val: RouteRecordNormalized[]): void {
      this.allRoutes = val;
    },
    setCurrentRoute(val: RouteLocationNormalized): void {
      this.currentRoute = val;
    },
    addCache(route: RouteLocationNormalized): void {
      const item: CacheType = {
        route,
        time: dayjs().format('YYYY-M-D hh:mm:ss'),
      };
      if (this.cache.length >= maxLen) {
        this.cache.pop();
      }
      this.cache = [item].concat(this.cache);
    },
  },
});
