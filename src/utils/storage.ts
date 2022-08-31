import { StorageEnum } from '@/contants';
import { useUserStore } from '@/stores/user';
//根据用户分配不同的存储空间
export default class Storage {
  private global: any;
  readonly version: string = '1.0.0';
  private userId: string | number = '0';
  constructor() {
    this.global = {};
    if (!localStorage.getItem(StorageEnum.global)) {
      // 先初始化一个存储变量
      localStorage.setItem(StorageEnum.global, JSON.stringify({}));
    }
  }
  updateUserId(): void {
    this.userId = useUserStore().id || '0';
  }
  getLocalItem(): any {
    let storageItem = {};
    try {
      storageItem = JSON.parse(
        localStorage.getItem(StorageEnum.global) || '{}'
      );
    } catch (error) {}
    return storageItem;
  }
  get(key: string, storage = true) {
    this.updateUserId();
    let out = this.global[key];
    if (storage && !out) {
      //out 没值就去获取storage的
      const localData: any = this.getLocalItem();
      if (!localData[this.userId]) {
        return null;
      }
      out = localData[this.userId][key] || '';
    }
    return out || null;
  }
  set(key: string, val: any, storage = true) {
    console.warn('Storage set', key, val);
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    Object.defineProperty(this.global, key, {
      value: val,
      writable: true,
      configurable: true,
      enumerable: true,
    });
    if (storage) {
      this.updateUserId();
      const localData: any = this.getLocalItem();
      if (!localData[this.userId]) {
        localData[this.userId] = {};
      }
      localData[this.userId][key] = val;
      const saveVal = JSON.stringify(localData);
      localStorage.setItem(StorageEnum.global, saveVal);
    }
  }
  clearStorage() {
    this.updateUserId();
    const localData: any = this.getLocalItem();
    if (localData[this.userId]) {
      delete localData[this.userId];
    }
    const saveVal = JSON.stringify(localData);
    localStorage.setItem(StorageEnum.global, saveVal);
  }
}
