/**
 * 用户信息
 * */
import { defineStore } from 'pinia';
import Utils from '@/utils';
import { CookieEnum } from '@/contants';
import { getUserConf } from '@/apis/sys';
const defaultState = {
  id: '-1',
  token: '',
  userName: 'ghost',
  avatar: 'https://cravatar.cn/avatar/',
};
type StateType = {
  id?: string | number;
  token?: string;
  userName: string;
  avatar: string;
};
export const useUserStore = defineStore({
  id: 'user',
  state(): StateType {
    let initialState = JSON.parse(JSON.stringify(defaultState));
    try {
      if (Utils.cookies.get(CookieEnum.userInfo)) {
        initialState = JSON.parse(
          Utils.cookies.get(CookieEnum.userInfo) || JSON.stringify(initialState)
        );
      }
    } catch (error) {}
    return Object.assign({}, initialState, {
      token: Utils.cookies.get(CookieEnum.token) || '',
    });
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    loginOut(
      cb = () => {
        return false;
      } //退出后的回调
    ) {
      this.setUser(defaultState);
      cb && cb();
    },
    async fetchUser(): Promise<any> {
      if (this.isLogin) {
        const res = await getUserConf();
        console.warn('fetchUser', res);
        this.setUser({
          id: res.id,
          userName: res.name,
          avatar: res.avatar,
        });
        return res;
      }
      return null;
    },
    setUser(val: StateType): void {
      const { userName = '', avatar = '', id = '-1' } = val;
      this.userName = userName;
      this.avatar = avatar;
      this.id = id;
      Utils.cookies.set(
        CookieEnum.userInfo,
        JSON.stringify({ userName, avatar, id })
      );
    },
    setToken(val: string | undefined): void {
      this.token = val || '';
      Utils.cookies.set(CookieEnum.token, val || '');
    },
  },
});
