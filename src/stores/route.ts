/**
 * 路由缓存
 * */
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import Utils from '@/utils';
import { StorageEnum } from '@/contants';
import type {
  RouteRecordNormalized,
  RouteLocationNormalized,
} from 'vue-router';
const maxLen = 20; //最多保留多少条历史路由
export type RouteMiniType = {
  fullPath: string;
  path: string;
  name?: any;
  params?: object;
  query?: object;
  meta?: any;
};
export type CacheType = {
  route: RouteMiniType;
  time: string;
};
type StateType = {
  allRoutes: RouteRecordNormalized[] | [];
  currentRoute: RouteLocationNormalized | null;
  cache: Array<CacheType>;
};
export const useRouteStore = defineStore({
  id: 'route',
  state(): StateType {
    const localCache = Utils.storage.get(StorageEnum.routeCache) || '[]';
    console.warn('localCache', JSON.parse(localCache));
    return {
      allRoutes: [],
      currentRoute: null,
      cache: JSON.parse(localCache),
    };
  },
  getters: {
    cacheCount(state): number {
      return state.cache.length || 0;
    },
    keepAlive(state): string[] {
      const out: any = [];
      state.allRoutes.map((item) => {
        if (item?.meta?.cache) {
          out.push(item.name);
        }
      });
      return out;
    },
    nowCacheIndex(state): number {
      return state.cache.findIndex(
        (n) => n.route.path === state?.currentRoute?.path
      );
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
    closeOtherCache(): void {
      //删除当前外的其他缓存路径
      const { nowCacheIndex } = this;
      this.cache = [this.cache[nowCacheIndex]];
    },
    delCache(index: number): void {
      this.cache.splice(index, 1);
      Utils.storage.set(StorageEnum.routeCache, this.cache);
    },
    addCache(routeArg: RouteLocationNormalized): void {
      const { fullPath, path, name, meta, params, query } = routeArg;
      const item: CacheType = {
        route: { fullPath, path, name, meta, params, query },
        time: dayjs().format('YYYY-M-D hh:mm:ss'),
      };
      if (!meta.title) {
        //注意，设置了meta.title的路由才记录
        return;
      }
      //查一次原数组是否有此路径，有的话不做操作
      const delIndex = this.cache.findIndex((n) => n.route.path === path);
      // delIndex >= 0 && this.cache.splice(delIndex, 1);
      if (delIndex >= 0) {
        return;
      }
      if (this.cache.length >= maxLen) {
        this.cache.shift();
      }
      this.cache.push(item);
      Utils.storage.set(StorageEnum.routeCache, this.cache);
    },
  },
});
