/**
 * 系统错误收集
 * */
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
const maxLen = 20; //最多多少条
export enum LogEnum {
  Log = 'log',
  Warn = 'warn',
  Err = 'error',
}
type ItemType = {
  time?: string; //记录的时间
  type: LogEnum; // 类型
  url?: string;
  info: string;
  err?: unknown;
  title: string;
  moreInfo?: string;
};
type StateType = {
  visible: boolean;
  list: Array<ItemType>;
};
export const useLogStore = defineStore({
  id: 'log',
  state(): StateType {
    return {
      visible: false,
      list: [],
    };
  },
  getters: {
    count(state): number {
      return state.list.length || 0;
    },
  },
  actions: {
    clear(): void {
      this.list = [];
    },
    switchVisible(): void {
      this.visible = !this.visible;
    },
    add(item: ItemType): void {
      item.time = dayjs().format('YYYY-M-D HH:mm:ss');
      if (!item.url) {
        item.url = location.href;
      }
      if (this.list.length >= maxLen) {
        this.list.pop();
      }
      this.list = [item].concat(this.list);
    },
  },
});
